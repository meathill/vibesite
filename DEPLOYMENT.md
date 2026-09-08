# DEPLOYMENT · 部署运维指南

## 目标环境

Cloudflare Workers（OpenNext），D1（`vibesite`）+ R2（`vibesite` 单桶）+ Turnstile + Telegram Bot。

## 首次上线

```bash
pnpm install
wrangler d1 create vibesite-db        # 回填 database_id 到 wrangler.jsonc
wrangler r2 bucket create vibesite
pnpm run db:migrate                   # 默认 --remote
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TURNSTILE_SECRET_KEY
pnpm run deploy
```

## secrets vs vars（别放错）

- **secrets**：`BETTER_AUTH_SECRET / TELEGRAM_BOT_TOKEN / TURNSTILE_SECRET_KEY`。
- **vars**（`wrangler.jsonc` 明文）：`ADMIN_EMAIL / BETTER_AUTH_URL / NEXT_PUBLIC_TURNSTILE_SITE_KEY / NEXT_PUBLIC_GA_ID / TELEGRAM_CHAT_ID`。

## 日常发布

```bash
pnpm run format && pnpm run typecheck && pnpm test
pnpm run deploy
```

维护轮按单 squashed commit 发布，回滚即 `git revert <维护commit>`。

## 本地代部署（Concierge 流程）

```bash
pnpm run deploy:script -- --id=<submission_id> --file=./project.zip --api=https://vibe.meathill.com --admin-pwd=xxx
pnpm run deploy:script -- --id=<submission_id> --r2-key=submissions/<id>/source.zip --api=https://vibe.meathill.com --admin-pwd=xxx
```

脚本只做下载/调度/回写；**用户代码不在本机裸构建**（PRD §13.2 要求 Docker 内构建，目前仍是已知缺口，见下）。

## 已知风险

- `compatibility_date 2026-06-20` 滞后近 3 个月，升级前先在预览环境验证。
- `observability.enabled: false`：线上无日志排障，_rsc 风暴类问题只能靠复现。打开前评估费用。
- PRD §13.2 的 Docker 隔离构建**未实现**：不可信用户 zip 不要在运维机直接 `pnpm install && build`。
- 上传限制（10MB/50MB/防穿透）全靠 route handler 自律，配置层无兜底。
