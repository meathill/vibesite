import { getEnv } from '@/lib/cloudflare';
import { getSubmissions } from '@/lib/db';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const env = await getEnv();
    const { searchParams } = new URL(request.url);

    const page = Number.parseInt(searchParams.get('page') ?? '1', 10);
    const limit = Number.parseInt(searchParams.get('limit') ?? '20', 10);
    const status = searchParams.get('status') ?? undefined;

    const result = await getSubmissions(env.DB, {
      page,
      limit,
      status: status as 'pending' | 'processing' | 'deployed' | 'failed' | 'expired' | undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('获取提交列表失败:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
