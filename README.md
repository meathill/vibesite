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

复制 `.dev.vars.example` 为 `.dev.vars` 并填入真实值：

```bash
ADMIN_PASSWORD=your-admin-password
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
TURNSTILE_SECRET_KEY=your-turnstile-secret
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

### Cloudflare 资源创建

```bash
# 创建 D1 数据库
wrangler d1 create vibesite-db
# 将返回的 database_id 填入 wrangler.jsonc

# 创建 R2 存储桶
wrangler r2 bucket create vibesite-uploads
wrangler r2 bucket create vibesite-deployed

# 初始化数据库
pnpm run db:init

# 插入测试数据（可选）
pnpm run db:seed

# 设置 Secrets
wrangler secret put ADMIN_PASSWORD
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
wrangler secret put TURNSTILE_SECRET_KEY
```

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:3000

### 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm run build    # 构建
pnpm run format   # 格式化代码
pnpm run typecheck # 类型检查
pnpm test         # 运行测试
pnpm run preview  # 本地预览 Cloudflare Workers 版本
pnpm run deploy   # 部署到 Cloudflare
```

## 部署

```bash
# 部署到 Cloudflare Workers
pnpm run deploy

# 生成 Cloudflare 类型
pnpm run cf-typegen
```

## 本地部署脚本

运维人员使用此脚本一键部署用户提交的网站：

```bash
# 使用本地 zip 文件
pnpm run deploy:script -- --id=abc123 --file=./project.zip --api=https://vibesite.pages.dev --admin-pwd=xxx

# 从 R2 下载文件
pnpm run deploy:script -- --id=abc123 --r2-key=submissions/abc123/project.zip --api=https://vibesite.pages.dev --admin-pwd=xxx
```

## 项目结构

```
├── app/                    # Next.js App Router 页面和 API
│   ├── api/                # API 路由
│   ├── admin/              # 管理后台
│   ├── submit/             # 提交表单
│   ├── success/            # 提交成功
│   ├── status/[id]/        # 进度查询
│   └── expired/            # 过期页面
├── components/ui/          # Coss UI 组件
├── lib/                    # 工具库（DB/R2/Telegram/Auth）
├── store/                  # Zustand 状态管理
├── scripts/                # 本地脚本
├── db/                     # D1 Schema 和种子数据
└── tests/                  # 测试
```

## API 文档

### 公开接口

- `POST /api/submissions` — 创建提交（multipart/form-data）
- `GET /api/submissions?id=xxx` — 查询提交状态

### 管理接口（需认证）

- `POST /api/admin/auth` — 登录
- `DELETE /api/admin/auth` — 登出
- `GET /api/admin/submissions?page=1&limit=20&status=pending` — 获取列表
- `POST /api/admin/submissions/:id/result` — 更新结果

## License

Private
