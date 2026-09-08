# VibeSite · AI 生成网页一键上线

你用 AI 生成了一个网页，却不知道怎么上线？把文件交给我们，10 分钟内获得一个真实可访问的链接。

## 技术栈

- **框架**: Next.js (App Router) + OpenNext
- **部署**: Cloudflare Workers
- **样式**: Tailwind CSS v4 + Coss UI
- **数据库**: Cloudflare D1
- **存储**: Cloudflare R2
- **通知**: Telegram Bot API
- **验证码**: Cloudflare Turnstile
- **校验**: zod（前后端共享 `lib/validation.ts`）

## 开发环境

### 前置条件

- Node.js >= 24
- pnpm
- Cloudflare 账户（用于 D1、R2、Turnstile）

### 安装

```bash
pnpm install
```

### 环境变量

本地开发使用 `.dev.vars`（被 git 忽略，**没有 `.dev.vars.example`，按下表手工创建**）：

```bash
BETTER_AUTH_SECRET=your-auth-secret
ADMIN_EMAIL=you@example.com
TELEGRAM_BOT_TOKEN=your-bot-token
TURNSTILE_SECRET_KEY=your-turnstile-secret
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

说明：`TELEGRAM_CHAT_ID` 已从 secret 移到 `wrangler.jsonc` 的 `vars`；旧 `ADMIN_PASSWORD` 已废弃，管理后台改用邮箱 OTP 登录（Better-Auth）。

### Cloudflare 资源创建

```bash
# 创建 D1 数据库
wrangler d1 create vibesite-db
# 将返回的 database_id 填入 wrangler.jsonc

# 创建 R2 存储桶（单个桶，同时承载上传文件与 OpenNext 增量缓存）
wrangler r2 bucket create vibesite

# 应用数据库迁移（含 auth 表 + submissions 表）
pnpm run db:migrate

# 设置 Secrets
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TURNSTILE_SECRET_KEY
```

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:4000（注意：端口是 **4000**，不是 3000）。

### 常用命令

```bash
pnpm dev               # 启动开发服务器（turbopack，:4000）
pnpm run build         # 构建
pnpm run format        # 格式化代码（biome）
pnpm run lint          # lint
pnpm run typecheck     # 类型检查
pnpm test              # 运行测试（vitest run）
pnpm run test:watch    # 监听模式
pnpm run deploy        # 部署到 Cloudflare
pnpm run cf-typegen    # 生成 Cloudflare 类型
pnpm run db:migrate    # 应用 D1 迁移（--remote）
pnpm run db:migrate:create  # 新建迁移文件
```

## 部署

```bash
# 部署到 Cloudflare Workers
pnpm run deploy

# 生成 Cloudflare 类型
pnpm run cf-typegen
```

线上地址由 `wrangler.jsonc` 的 `BETTER_AUTH_URL` 决定（当前 `https://vibe.meathill.com`）。

## 本地部署脚本

运维人员使用此脚本一键部署用户提交的网站：

```bash
# 使用本地 zip 文件
pnpm run deploy:script -- --id=abc123 --file=./project.zip --api=https://vibe.meathill.com --admin-pwd=xxx

# 从 R2 下载文件
pnpm run deploy:script -- --id=abc123 --r2-key=submissions/abc123/project.zip --api=https://vibe.meathill.com --admin-pwd=xxx
```

## 项目结构

```
├── app/                    # Next.js App Router 页面和 API
│   ├── api/                # API 路由（submissions / admin / auth）
│   ├── _sections/          # 首页拆分出的数据与区块组件
│   ├── admin/              # 管理后台（含 hooks/use-admin-submissions）
│   ├── submit/             # 提交表单
│   ├── success/            # 提交成功
│   ├── status/[id]/        # 进度查询
│   └── expired/            # 过期页面
├── components/             # brand-mark / seo + ui/（shadcn/Base-UI 模板，勿随意重构）
├── lib/                    # 工具库
│   ├── validation.ts       # zod 共享校验 + 文件约束（前后端共用）
│   ├── api-response.ts     # apiError/apiOk 统一错误格式
│   ├── fetcher.ts          # 前端 fetchJson 封装
│   ├── status-labels.ts    # 状态/意图标签唯一来源
│   └── format.ts           # formatDateTime（zh-CN + 非法兜底）
├── hooks/                  # use-media-query / use-admin-submissions
├── store/                  # Zustand（submission 表单）
├── scripts/                # 本地部署脚本 deploy.ts
├── migrations/             # D1 迁移（0001_auth/0002_submissions/0003_align）
├── tests/                  # vitest（16 文件，59 用例）
├── middleware.ts           # /submit/* 鉴权跳转
└── open-next.config.ts     # R2 缓存/D1 tagCache/queue（拦截已关闭，见 DEV_NOTE）
```

## API 文档

### 公开接口

- `POST /api/submissions` — 创建提交（multipart/form-data）
- `GET /api/submissions?id=xxx` — 查询提交状态

### 管理接口（需 OTP 管理员登录）

- `POST /api/admin/auth` — 登录
- `DELETE /api/admin/auth` — 登出
- `GET /api/admin/submissions?page=1&limit=20&status=pending` — 获取列表
- `POST /api/admin/submissions/:id/result` — 更新结果

错误格式统一为 `{ "error": "中文文案", "code": "INVALID_PARAMS" }`（见 `lib/api-response.ts`）。

## 常规文档

- `DEV_NOTE.md` — 架构决策与踩坑沉淀
- `TESTING.md` — 测试指南
- `DEPLOYMENT.md` — 部署运维指南
- `WIP.md` / `TODO.md` — 临时计划（用完即清）

## License

Private
