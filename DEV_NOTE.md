# DEV_NOTE · 架构决策与踩坑沉淀

> 只记录“为什么”，不记录“做了什么”。新人 3 个月后能看懂取舍。

## 1. _rsc 预取风暴（issue #4）

- 现象：Next 16.3 + OpenNext cache interception 开启后，`_rsc` 预取循环打爆 Worker 请求数。
- 决策：`open-next.config.ts` 保持 `enableCacheInterception: false`，直到上游 `opennextjs-cloudflare#1348` 修复。
- 后果：`tagCache/incrementalCache/queue` 绑定仍保留在 `wrangler.jsonc`，但实际不拦截。不要因“没用到”而删除绑定（issue #2 名实不符即源于此）。

## 2. workerd 条件导出漏拷

- 现象：`better-auth / @better-auth/core` 含 workerd 条件导出（`pure.index.mjs`），OpenNext 按 workerd condition 打包，但 Next NFT 按 node condition 追踪，漏拷后线上崩。
- 决策：`next.config.ts` 用 `serverExternalPackages: ['better-auth', '@better-auth/core']` 整包重拷。
- 参考：https://opennext.js.org/cloudflare/howtos/workerd

## 3. 缓存绑定“留而不用”（issue #2）

- `wrangler.jsonc` 保留 `NEXT_TAG_CACHE_D1 / NEXT_INC_CACHE_R2_BUCKET / WORKER_SELF_REFERENCE`，`open-next.config.ts` 仍配置三者。
- 原因：关闭的只是拦截开关，绑定本身是未来重开的前置，且 `R2` 单桶复用（上传文件与增量缓存同一桶 `vibesite`）。
- 约定：改动缓存前先读本节，勿误删。

## 4. D1 迁移对齐 Better-Auth

- `migrations/0001_auth → 0002_submissions → 0003_align_better_auth`：0003 为 Better-Auth 1.6.23 重建 4 表 + 唯一约束。
- 测试 `tests/migrations/auth-schema.test.ts` 用 `node:sqlite` 跑 0001+0003，与 `getMigrations(auth.options)` 做零漂移断言。升级 Better-Auth 后必须先跑该测试。

## 5. R2 单桶合并

- 早期文档写双桶（uploads/deployed），`0e200f4` 已合并为单桶 `vibesite`。路径 `submissions/{id}/{safeName}`，文件名清洗见 `generateR2Key`。

## 6. 管理员认证：ADMIN_PASSWORD → 邮箱 OTP

- 旧 `ADMIN_PASSWORD` 已废弃。现用 Better-Auth 邮箱 OTP，`ADMIN_EMAIL` 在 `vars`（非 secret）。`TELEGRAM_CHAT_ID` 同样在 `vars`。

## 7. 唯一来源（Single Source of Truth）

- 校验：`lib/validation.ts`（zod `submissionTextSchema` + `FILE_CONSTRAINTS`），前后端共用。`intent` 必须过白名单。
- 错误：`lib/api-response.ts`（`apiError/apiOk`，`{error, code}`）。
- 请求：`lib/fetcher.ts`（`fetchJson`，自动抛服务端 error 文案）。
- 标签：`lib/status-labels.ts`（`STATUS_*` + `INTENT_LABELS` + `TELEGRAM_STATUS_LABELS`）。Telegram emoji 仅展示层映射。
- 时间：`lib/format.ts`（`formatDateTime`，非法输入返回 `—`）。

## 8. 图标双库冻结

- 营销页用 `@phosphor-icons/react`，`components/ui` 用 `lucide-react`（17 文件深度绑定，shadcn 模板）。
- 2026-09 维护决定：**不动依赖**，只把手写内联 SVG 对勾换成 `CheckIcon/MinusIcon`。统一到任一库需单独立项（含视觉回归）。

## 9. Logo path 重复是有意的

- `components/brand-mark.tsx` 与 `app/opengraph-image.tsx` 含同一 logo path。`next/og ImageResponse` 不能引 client 组件，故未抽组件。如需改 logo，两处同步。

## 10. 已知松弛（下次收紧）

- `biome.json` 对 `components/ui/**` 关闭 3 条 a11y 规则；`noNonNullAssertion: off`。
- `tsconfig` `include **/*` 会扫到 `.open-next/.wrangler/coverage`，靠 `skipLibCheck` 硬扛。
- `wrangler compatibility_date 2026-06-20` 滞后；`observability.enabled: false` 线上盲区（_rsc 风暴后更应开，需评估费用）。
