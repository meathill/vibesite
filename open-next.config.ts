import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';
import d1TagCache from '@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache';

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
  tagCache: d1TagCache,
  // https://github.com/meathill/vibesite/issues/4
  // Next 16.3 + OpenNext cache interception 会引发 _rsc 预取循环，打爆 Worker 请求数。
  // 保持关闭，直到上游修复（opennextjs-cloudflare#1348）。
  enableCacheInterception: false,
});
