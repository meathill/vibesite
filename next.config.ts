import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 仅允许通过 /api/submissions 上传的文件大小限制由 route handler 处理
  // 此处设置 Next.js 服务器端请求体大小限制
  serverExternalPackages: ['better-auth'],
};

export default nextConfig;

initOpenNextCloudflareForDev();
