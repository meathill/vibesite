import { isAdmin } from '@/lib/admin';
import { getEnv } from '@/lib/cloudflare';
import { SubmissionNotFoundError, updateSubmissionResult } from '@/lib/submissions';
import type { SubmissionStatus } from '@/types';
import { type NextRequest, NextResponse } from 'next/server';

interface ResultBody {
  status: SubmissionStatus;
  temporary_url?: string;
  permanent_url?: string;
  error_message?: string;
  admin_note?: string;
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const env = await getEnv();
    const { id } = await params;
    const body = (await request.json()) as ResultBody;

    if (!body.status) {
      return NextResponse.json({ error: '请提供状态' }, { status: 400 });
    }

    const validStatuses: SubmissionStatus[] = [
      'pending',
      'processing',
      'deployed',
      'failed',
      'expired',
    ];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: '无效的状态值' }, { status: 400 });
    }

    const submission = await updateSubmissionResult(env, id, body);

    return NextResponse.json({
      id: submission.id,
      status: submission.status,
      temporary_url: submission.temporary_url,
      permanent_url: submission.permanent_url,
    });
  } catch (error) {
    if (error instanceof SubmissionNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    console.error('更新提交结果失败:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
