import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  createSubmission: vi.fn(),
  getSubmission: vi.fn(),
  updateSubmission: vi.fn(),
  generateR2Key: vi.fn(() => 'submissions/sub_1/site.zip'),
  uploadToR2: vi.fn(),
  sendNewSubmissionNotification: vi.fn(),
  sendStatusUpdateNotification: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  createSubmission: mocks.createSubmission,
  getSubmission: mocks.getSubmission,
  updateSubmission: mocks.updateSubmission,
}));

vi.mock('@/lib/r2', () => ({
  generateR2Key: mocks.generateR2Key,
  uploadToR2: mocks.uploadToR2,
}));

vi.mock('@/lib/telegram', () => ({
  sendNewSubmissionNotification: mocks.sendNewSubmissionNotification,
  sendStatusUpdateNotification: mocks.sendStatusUpdateNotification,
}));

import {
  createNewSubmission,
  FileTooLargeError,
  getSubmissionStatus,
  InvalidFileTypeError,
  SubmissionNotFoundError,
  updateSubmissionResult,
} from '@/lib/submissions';

function createFile(name: string, size: number): File {
  const file = new File(['x'.repeat(Math.min(size, 16))], name, { type: 'application/zip' });
  Object.defineProperty(file, 'size', { value: size });
  vi.spyOn(file, 'arrayBuffer').mockResolvedValue(new ArrayBuffer(8));
  return file;
}

function createEnv() {
  return {
    DB: {} as D1Database,
    R2: {} as R2Bucket,
    TELEGRAM_BOT_TOKEN: 'token',
    TELEGRAM_CHAT_ID: 'chat',
  };
}

describe('lib/submissions', () => {
  beforeEach(() => {
    for (const mock of Object.values(mocks)) mock.mockReset();
    mocks.generateR2Key.mockReturnValue('submissions/sub_1/site.zip');
  });

  it('超大文件直接拒绝，不碰 D1/R2', async () => {
    await expect(
      createNewSubmission(createEnv(), {
        projectName: 'demo',
        contact: 'me@example.com',
        file: createFile('site.zip', 100 * 1024 * 1024),
      }),
    ).rejects.toBeInstanceOf(FileTooLargeError);
    expect(mocks.createSubmission).not.toHaveBeenCalled();
  });

  it('非 zip 文件直接拒绝', async () => {
    await expect(
      createNewSubmission(createEnv(), {
        projectName: 'demo',
        contact: 'me@example.com',
        file: createFile('site.txt', 1024),
      }),
    ).rejects.toBeInstanceOf(InvalidFileTypeError);
  });

  it('创建成功：上传 R2、回填 key、Telegram 失败也不影响主流程', async () => {
    const row = { id: 'sub_1', status: 'pending' };
    const db = {
      prepare: vi.fn(() => ({
        bind: vi.fn(() => ({
          first: vi.fn().mockResolvedValue(row),
          run: vi.fn().mockResolvedValue({ success: true }),
        })),
      })),
    };
    mocks.sendNewSubmissionNotification.mockRejectedValueOnce(new Error('tg down'));

    const result = await createNewSubmission(
      { ...createEnv(), DB: db as unknown as D1Database },
      {
        projectName: 'demo',
        contact: 'me@example.com',
        file: createFile('site.zip', 1024),
      },
    );

    expect(result.source_r2_key).toBe('submissions/sub_1/site.zip');
    expect(mocks.uploadToR2).toHaveBeenCalledOnce();
  });

  it('getSubmissionStatus 缺失时抛 SubmissionNotFoundError', async () => {
    mocks.getSubmission.mockResolvedValueOnce(null);
    await expect(getSubmissionStatus({} as D1Database, 'missing')).rejects.toBeInstanceOf(
      SubmissionNotFoundError,
    );
  });

  it('updateSubmissionResult 更新后发送状态通知', async () => {
    mocks.getSubmission.mockResolvedValueOnce({ id: 'sub_1', status: 'pending' });
    const result = await updateSubmissionResult(createEnv(), 'sub_1', { status: 'deployed' });
    expect(result.status).toBe('deployed');
    expect(mocks.sendStatusUpdateNotification).toHaveBeenCalledOnce();
  });
});
