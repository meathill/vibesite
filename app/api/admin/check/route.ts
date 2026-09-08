import { getCloudflareContext } from '@opennextjs/cloudflare';
import { headers } from 'next/headers';
import { apiError, apiOk } from '@/lib/api-response';
import { getAuth } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await getAuth();
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.email) {
      return apiError('未授权', 401, 'UNAUTHORIZED');
    }

    const { env } = await getCloudflareContext({ async: true });

    if (session.user.email !== env.ADMIN_EMAIL) {
      return apiError('禁止访问', 403, 'FORBIDDEN');
    }

    return apiOk({ isAdmin: true });
  } catch {
    return apiError('服务器内部错误', 500, 'INTERNAL_ERROR');
  }
}
