import type { NextRequest } from 'next/server';
import { apiError, apiOk } from '@/lib/api-response';
import { getEnv } from '@/lib/cloudflare';
import { createNewSubmission, FileTooLargeError, InvalidFileTypeError } from '@/lib/submissions';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { submissionTextSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const env = await getEnv();

    const formData = await request.formData();
    const projectName = formData.get('projectName') as string;
    const contact = formData.get('contact') as string;
    const description = formData.get('description') as string | null;
    const intent = formData.get('intent') as string | null;
    const file = formData.get('file') as File;
    const turnstileToken = formData.get('turnstileToken') as string;

    // 基础校验（前后端共享同一 zod schema）
    const parsed = submissionTextSchema.safeParse({
      projectName,
      contact,
      description: description ?? undefined,
      intent: intent ?? undefined,
    });
    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message ?? '参数错误', 400, 'INVALID_PARAMS');
    }

    if (!file) {
      return apiError('请上传文件', 400, 'MISSING_FILE');
    }

    // Turnstile 验证
    if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const isValid = await verifyTurnstileToken(
        env.TURNSTILE_SECRET_KEY,
        turnstileToken,
        request.headers.get('cf-connecting-ip') ?? undefined,
      );

      if (!isValid) {
        return apiError('人机验证失败，请重试', 400, 'TURNSTILE_FAILED');
      }
    }

    const submission = await createNewSubmission(env, {
      projectName: parsed.data.projectName,
      contact: parsed.data.contact,
      description: parsed.data.description || undefined,
      intent: parsed.data.intent,
      file,
    });

    return apiOk({
      id: submission.id,
      status: submission.status,
    });
  } catch (error) {
    if (error instanceof FileTooLargeError) {
      return apiError(error.message, 400, 'FILE_TOO_LARGE');
    }

    if (error instanceof InvalidFileTypeError) {
      return apiError(error.message, 400, 'INVALID_FILE_TYPE');
    }

    console.error('创建提交失败:', error);
    return apiError('服务器内部错误', 500, 'INTERNAL_ERROR');
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return apiError('缺少提交 ID', 400, 'MISSING_ID');
    }

    const env = await getEnv();
    const { getSubmissionStatus } = await import('@/lib/submissions');
    const submission = await getSubmissionStatus(env.DB, id);

    return apiOk({
      id: submission.id,
      project_name: submission.project_name,
      status: submission.status,
      temporary_url: submission.temporary_url,
      permanent_url: submission.permanent_url,
      error_message: submission.error_message,
      created_at: submission.created_at,
      updated_at: submission.updated_at,
    });
  } catch (error) {
    const { SubmissionNotFoundError } = await import('@/lib/submissions');
    if (error instanceof SubmissionNotFoundError) {
      return apiError(error.message, 404, 'NOT_FOUND');
    }

    console.error('查询提交状态失败:', error);
    return apiError('服务器内部错误', 500, 'INTERNAL_ERROR');
  }
}
