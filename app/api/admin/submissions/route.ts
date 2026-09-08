import type { NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin';
import { apiError, apiOk } from '@/lib/api-response';
import { getEnv } from '@/lib/cloudflare';
import { getSubmissions } from '@/lib/db';

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return apiError('未授权', 401, 'UNAUTHORIZED');
  }

  try {
    const env = await getEnv();
    const { searchParams } = request.nextUrl;

    const page = Number.parseInt(searchParams.get('page') ?? '1', 10);
    const limit = Number.parseInt(searchParams.get('limit') ?? '20', 10);
    const status = searchParams.get('status') ?? undefined;

    const result = await getSubmissions(env.DB, {
      page,
      limit,
      status: status as 'pending' | 'processing' | 'deployed' | 'failed' | 'expired' | undefined,
    });

    return apiOk(result);
  } catch (error) {
    console.error('获取提交列表失败:', error);
    return apiError('服务器内部错误', 500, 'INTERNAL_ERROR');
  }
}
