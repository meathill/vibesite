import type { NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin';
import { apiError, apiOk } from '@/lib/api-response';
import { getEnv } from '@/lib/cloudflare';
import { SubmissionNotFoundError, updateSubmissionResult } from '@/lib/submissions';
import { SUBMISSION_STATUSES } from '@/types';

interface ResultBody {
  status: (typeof SUBMISSION_STATUSES)[number];
  temporary_url?: string;
  permanent_url?: string;
  error_message?: string;
  admin_note?: string;
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return apiError('未授权', 401, 'UNAUTHORIZED');
  }

  try {
    const env = await getEnv();
    const { id } = await params;
    const body = (await request.json()) as ResultBody;

    if (!body.status) {
      return apiError('请提供状态', 400, 'MISSING_STATUS');
    }

    if (!(SUBMISSION_STATUSES as readonly string[]).includes(body.status)) {
      return apiError('无效的状态值', 400, 'INVALID_STATUS');
    }

    const submission = await updateSubmissionResult(env, id, body);

    return apiOk({
      id: submission.id,
      status: submission.status,
      temporary_url: submission.temporary_url,
      permanent_url: submission.permanent_url,
    });
  } catch (error) {
    if (error instanceof SubmissionNotFoundError) {
      return apiError(error.message, 404, 'NOT_FOUND');
    }

    console.error('更新提交结果失败:', error);
    return apiError('服务器内部错误', 500, 'INTERNAL_ERROR');
  }
}
