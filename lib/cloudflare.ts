import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function getEnv() {
  const { env } = await getCloudflareContext({ async: true });
  return env;
}

export function getEnvSync() {
  const { env } = getCloudflareContext();
  return env;
}
