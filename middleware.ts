import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 保护 /submit 路由
  if (pathname.startsWith('/submit')) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      // 未登录，重定向到登录页面，并记录原始目标
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/submit/:path*'],
};
