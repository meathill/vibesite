import { createSubmission, getSubmission, updateSubmission } from '@/lib/db';
import { generateR2Key, uploadToR2 } from '@/lib/r2';
import { sendNewSubmissionNotification, sendStatusUpdateNotification } from '@/lib/telegram';
import type { Submission, SubmissionStatus } from '@/types';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface CloudflareBindings {
  DB: D1Database;
  R2: R2Bucket;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

interface CreateNewSubmissionInput {
  projectName: string;
  contact: string;
  description?: string;
  intent?: string;
  file: File;
}

export async function createNewSubmission(
  env: CloudflareBindings,
  input: CreateNewSubmissionInput,
): Promise<Submission> {
  // 校验文件大小
  if (input.file.size > MAX_FILE_SIZE) {
    throw new FileTooLargeError();
  }

  // 校验文件类型
  if (!input.file.name.endsWith('.zip')) {
    throw new InvalidFileTypeError();
  }

  // 先插入 D1 获取 ID
  const result = await createSubmission(env.DB, {
    project_name: input.projectName,
    contact: input.contact,
    description: input.description,
    intent: input.intent,
  });

  // D1 返回的 meta.last_row_id 不适用于 TEXT 主键
  // 需要查询刚创建的记录
  // 使用 project_name + contact + created_at 来定位最近的记录
  const submission = await env.DB.prepare(
    'SELECT * FROM submissions WHERE project_name = ?1 AND contact = ?2 ORDER BY created_at DESC LIMIT 1',
  )
    .bind(input.projectName, input.contact)
    .first<Submission>();

  if (!submission) {
    throw new Error('创建提交记录失败');
  }

  // 上传文件到 R2
  const r2Key = generateR2Key(submission.id, input.file.name);
  const arrayBuffer = await input.file.arrayBuffer();

  await uploadToR2({
    bucket: env.R2,
    key: r2Key,
    data: arrayBuffer,
    contentType: 'application/zip',
    size: input.file.size,
  });

  // 更新 R2 key
  await updateSubmission(env.DB, submission.id, {});
  // 直接用 SQL 更新 source_r2_key
  await env.DB.prepare('UPDATE submissions SET source_r2_key = ?1 WHERE id = ?2')
    .bind(r2Key, submission.id)
    .run();

  // 发送 Telegram 通知
  const updatedSubmission: Submission = {
    ...submission,
    source_r2_key: r2Key,
  };

  try {
    await sendNewSubmissionNotification(
      env.TELEGRAM_BOT_TOKEN,
      env.TELEGRAM_CHAT_ID,
      updatedSubmission,
    );
  } catch (error) {
    // Telegram 通知失败不影响提交流程
    console.error('Telegram 通知发送失败:', error);
  }

  return updatedSubmission;
}

export async function getSubmissionStatus(db: D1Database, id: string): Promise<Submission> {
  const submission = await getSubmission(db, id);
  if (!submission) {
    throw new SubmissionNotFoundError(id);
  }
  return submission;
}

export async function updateSubmissionResult(
  env: CloudflareBindings,
  id: string,
  result: {
    status: SubmissionStatus;
    temporary_url?: string;
    permanent_url?: string;
    error_message?: string;
    admin_note?: string;
  },
): Promise<Submission> {
  const submission = await getSubmission(env.DB, id);
  if (!submission) {
    throw new SubmissionNotFoundError(id);
  }

  await updateSubmission(env.DB, id, result);

  const updated: Submission = {
    ...submission,
    ...result,
    updated_at: new Date().toISOString(),
  };

  // 发送 Telegram 状态更新通知
  try {
    await sendStatusUpdateNotification(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID, updated);
  } catch (error) {
    console.error('Telegram 通知发送失败:', error);
  }

  return updated;
}

// 自定义错误类
export class FileTooLargeError extends Error {
  constructor() {
    super('文件大小超过 50MB 限制');
    this.name = 'FileTooLargeError';
  }
}

export class InvalidFileTypeError extends Error {
  constructor() {
    super('仅支持 .zip 文件');
    this.name = 'InvalidFileTypeError';
  }
}

export class SubmissionNotFoundError extends Error {
  constructor(id: string) {
    super(`提交记录不存在: ${id}`);
    this.name = 'SubmissionNotFoundError';
  }
}
