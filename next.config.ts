import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 仅允许通过 /api/submissions 上传的文件大小限制由 route handler 处理
  // 此处设置 Next.js 服务器端请求体大小限制
  //
  // better-auth / @better-auth/core 含 workerd 条件导出（instrumentation/pure.index.mjs）。
  // OpenNext 在 bundling 时使用 workerd condition，但 Next NFT 只按 node condition 追踪文件，
  // 会漏掉 pure.index.mjs。把它们列入 serverExternalPackages 后，OpenNext 会整包重拷。
  // 参见：https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: ['better-auth', '@better-auth/core'],
};

export default nextConfig;

initOpenNextCloudflareForDev();
