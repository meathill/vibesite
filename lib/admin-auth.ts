import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 60 * 60 * 1000; // 1 小时

export async function verifyAdminPassword(
  password: string,
  envPassword: string,
): Promise<boolean> {
  return password === envPassword;
}

export async function createAdminSession(): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION;
  const token = `${expiresAt}`;
  return token;
}

export async function setAdminCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

export async function removeAdminCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  const expiresAt = Number.parseInt(token, 10);
  if (Number.isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  return true;
}

export function isAdminAuthenticatedFromRequest(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));

  if (!match?.[1]) {
    return false;
  }

  const expiresAt = Number.parseInt(match[1], 10);
  if (Number.isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  return true;
}
