import { type NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/cloudflare';
import { createNewSubmission, FileTooLargeError, InvalidFileTypeError } from '@/lib/submissions';
import { verifyTurnstileToken } from '@/lib/turnstile';

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

    // 基础校验
    if (!projectName?.trim()) {
      return NextResponse.json({ error: '请填写项目名称' }, { status: 400 });
    }

    if (!contact?.trim()) {
      return NextResponse.json({ error: '请填写联系方式' }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: '请上传文件' }, { status: 400 });
    }

    // Turnstile 验证
    if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const isValid = await verifyTurnstileToken(
        env.TURNSTILE_SECRET_KEY,
        turnstileToken,
        request.headers.get('cf-connecting-ip') ?? undefined,
      );

      if (!isValid) {
        return NextResponse.json({ error: '人机验证失败，请重试' }, { status: 400 });
      }
    }

    const submission = await createNewSubmission(env, {
      projectName: projectName.trim(),
      contact: contact.trim(),
      description: description?.trim() || undefined,
      intent: intent || undefined,
      file,
    });

    return NextResponse.json({
      id: submission.id,
      status: submission.status,
    });
  } catch (error) {
    if (error instanceof FileTooLargeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof InvalidFileTypeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error('创建提交失败:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少提交 ID' }, { status: 400 });
    }

    const env = await getEnv();
    const { getSubmissionStatus } = await import('@/lib/submissions');
    const submission = await getSubmissionStatus(env.DB, id);

    return NextResponse.json({
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
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    console.error('查询提交状态失败:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
