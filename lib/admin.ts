import { getCloudflareContext } from '@opennextjs/cloudflare';
import { headers } from 'next/headers';
import { getAuth } from './auth';

/**
 * 检查当前用户是否是 admin
 * 只有 ADMIN_EMAIL 环境变量指定的邮箱才是 admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const auth = await getAuth();
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.email) {
      return false;
    }

    const { env } = await getCloudflareContext({ async: true });
    return session.user.email === env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}
