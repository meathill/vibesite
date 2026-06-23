import {
  createAdminSession,
  removeAdminCookie,
  setAdminCookie,
  verifyAdminPassword,
} from '@/lib/admin-auth';
import { getEnv } from '@/lib/cloudflare';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const env = await getEnv();
    const { password } = (await request.json()) as { password: string };

    if (!password) {
      return NextResponse.json({ error: '请输入密码' }, { status: 400 });
    }

    const isValid = await verifyAdminPassword(password, env.ADMIN_PASSWORD);
    if (!isValid) {
      return NextResponse.json({ error: '密码错误' }, { status: 401 });
    }

    const token = await createAdminSession();
    await setAdminCookie(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin 认证失败:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await removeAdminCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin 登出失败:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
