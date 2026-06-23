# PRD：AI 网站一键上线服务 / Concierge MVP

## 1. 产品定位

本产品面向使用 AI 写出网页、但不懂部署、不熟悉 Cloudflare、不会命令行、不会绑定域名的普通用户，提供一个轻量的“帮我把 AI 网站上线”的服务。

第一阶段不做完整自动化平台，而是做 **Concierge MVP**：

> 用户提交网站文件 → 系统通知我 → 我本地运行部署脚本 → 生成预览链接 → 发给用户 → 引导购买正式网站服务。

产品不是卖“Cloudflare 临时站”，而是卖：

> 我帮你把 AI 做出来的网站，变成别人真的能打开的链接。

---

## 2. 核心假设

### 2.1 用户假设

现在越来越多普通用户可以用 AI 生成网页，但他们不会完成最后一步上线。

他们可能会卡在：

* 不知道如何部署
* 不知道 Cloudflare / Vercel / Netlify 是什么
* 不会用 GitHub
* 不会用命令行
* 不理解 build、dist、域名、DNS、HTTPS
* 不知道怎么把本地网页分享给朋友、客户或同事

### 2.2 需求假设

用户真正需要的不是一个复杂托管平台，而是：

* 上传网页文件
* 获得一个可以访问的链接
* 发给别人看
* 满意后长期保留
* 需要时有人帮他处理域名、表单、移动端、SEO、收款入口等细节

### 2.3 商业假设

免费预览链接可以作为转化入口。

付费点包括：

* 长期保留网站
* 平台子域名
* 绑定自定义域名
* 修改网页
* 加联系表单
* 加统计
* 加 SEO
* 加微信 / 支付宝收款入口
* 代处理部署和域名配置

---

## 3. MVP 目标

第一版目标非常明确：

> 验证是否有人愿意提交 AI 生成的网站，并愿意为“正式上线”付费。

### 3.1 产品目标

* 用户可以提交网站文件。
* 我可以及时收到 Telegram 通知。
* 我可以用本地脚本完成 Cloudflare 临时部署。
* 用户可以拿到一个可分享的预览链接。
* 用户可以表达是否需要长期网站。
* 我可以人工跟进高意向用户。

### 3.2 不追求的目标

第一版不追求：

* 全自动部署
* 多租户托管平台
* 自动构建队列
* Cloudflare Containers
* Workflows
* Workers for Platforms
* 自动付费转正式站
* 用户后台复杂管理
* GitHub 导入
* 自定义域名自动化
* AI 自动修复代码

---

## 4. 产品形态

### 4.1 首页

首页主要负责解释价值和引导提交。

核心标题：

> AI 帮你写好了网页？我帮你上线。

副标题：

> 上传你的网页文件，获得一个可以分享给别人访问的预览链接。满意后，可以继续转成长期网站或绑定自己的域名。

核心按钮：

* 上传网站
* 看看支持哪些网站
* 我想要长期网站

首页需要说明：

* 适合 AI 生成的静态网页
* 可以生成临时预览链接
* 普通用户不需要理解 Cloudflare
* 不需要命令行
* 不需要 GitHub
* 可以进一步购买长期上线服务

### 4.2 提交表单页

字段：

* 网站名称
* 联系方式

  * 邮箱
  * 微信
  * Telegram
  * 任意一种即可
* 上传网站 zip
* 网站用途
* 用户意图

  * 只是想临时看看
  * 想长期保留
  * 想绑定自己的域名
  * 想找人帮我改好再上线
* 备注

上传限制：

* 只接受 `.zip`
* 首版最大 10MB
* 后续可按实际情况调整

### 4.3 提交成功页

提交成功后显示：

> 已收到你的网站文件。
> 我会先帮你生成一个可以访问的预览链接。
> 处理完成后，会通过你留下的联系方式发给你。

同时展示：

* 提交编号
* 网站名称
* 当前状态：已提交
* 说明：目前处于人工测试阶段，可能不会实时处理

### 4.4 预览结果页

部署成功后，用户可以看到：

* 网站名称
* 预览链接
* 预览链接有效期说明
* 转长期网站入口
* 联系我修改网站入口

文案：

> 这是一个临时预览链接，适合发给朋友、客户或同事确认效果。
> 如果你希望长期保留这个网站，可以转为正式网站。

### 4.5 过期页

如果用户打开过期链接或旧预览页，显示：

> 这个预览网站可能已经过期。
> 如果你想重新上线或长期保留，可以提交申请。

按钮：

* 重新提交
* 转正式网站
* 联系我处理

---

## 5. MVP 用户流程

### 5.1 提交流程

```text
用户访问首页
  ↓
点击上传网站
  ↓
填写表单
  ↓
上传 zip
  ↓
系统保存文件到 R2
  ↓
系统保存提交记录到 D1
  ↓
系统发送 Telegram 通知
  ↓
用户看到提交成功页
```

### 5.2 人工部署流程

```text
我收到 Telegram 通知
  ↓
复制部署命令
  ↓
本地运行脚本
  ↓
脚本从 R2 下载 zip
  ↓
脚本解压并检查项目
  ↓
脚本构建网站
  ↓
脚本调用 wrangler deploy --temporary
  ↓
脚本获得预览链接
  ↓
脚本回写 D1
  ↓
脚本发送 Telegram 成功通知
  ↓
我把链接发给用户
```

### 5.3 失败处理流程

```text
本地脚本部署失败
  ↓
脚本记录错误
  ↓
脚本回写 D1
  ↓
脚本发送 Telegram 失败通知
  ↓
我判断问题：
    - 用户文件不完整
    - 不是静态网站
    - 缺少 build script
    - 构建失败
    - 项目太复杂
  ↓
我联系用户：
    - 让用户重新导出
    - 或提供付费整理服务
```

---

## 6. 支持范围

### 6.1 MVP 支持

首版支持：

* 纯 HTML / CSS / JS
* 单页静态网站
* Vite 静态项目
* React SPA
* 常见 AI 生成的前端页面

### 6.2 MVP 暂不支持

首版不支持：

* Next.js 用户项目
* SSR 网站
* 后端 API
* 数据库
* 登录系统
* Python / PHP / Java / Go 后端
* Docker 项目
* 需要环境变量的项目
* 需要长期运行服务的项目
* 复杂全栈应用

### 6.3 面向用户的话术

不要说：

> 不支持你的项目。

更好的说法：

> 目前这个服务优先支持静态网页。如果你的网站包含后端、数据库或复杂功能，我可以帮你判断能否改成适合上线的版本。

---

## 7. 商业模式

### 7.1 免费预览

价格：

* 免费

包含：

* 生成一个临时预览链接
* 适合分享给别人看
* 链接可能会过期
* 不保证长期保留

目的：

* 降低用户提交门槛
* 验证真实需求
* 获取潜在付费线索

### 7.2 长期保留

建议价格：

* ¥29 / 年起
* 或 ¥5 / 月起

包含：

* 使用平台子域名
* 长期保留网站
* 简单重新部署
* 基础访问统计，后续版本支持

示例：

```text
your-site.upsite.app
```

### 7.3 绑定自定义域名

建议价格：

* ¥99 / 年起
* 或一次性 ¥199 起

包含：

* 帮助绑定用户自己的域名
* 配置 DNS
* 配置 HTTPS
* 检查访问是否正常

### 7.4 人工服务包

建议价格：

* ¥299：基础上线服务
* ¥599：修改完善后上线
* ¥999：商业落地页服务包

可包含：

* 修复移动端
* 修改文案
* 替换图片
* 添加联系表单
* 添加微信 / 支付宝收款二维码
* 添加访问统计
* 设置 SEO title / description
* 绑定域名
* 提供简单维护

---

## 8. 技术架构

### 8.1 技术原则

第一版遵循：

* 极轻量
* Cloudflare-first
* 人工兜底
* 不做复杂自动化
* 不执行长期后台任务
* 不提前建设平台能力
* 先验证用户需求和付费意愿

### 8.2 技术栈

Web：

* Next.js
* OpenNext
* Cloudflare Workers
* Tailwind CSS
* [Coss ui](https://coss.com/ui)
* Zustand
* https://phosphoricons.com

Cloudflare：

* Workers：运行 Next.js / OpenNext
* R2：保存用户上传的 zip
* D1：保存提交记录
* Turnstile：防止垃圾提交
* Telegram Bot：通知我有新提交

本地：

* Node.js
* TypeScript
* pnpm
* Wrangler

暂不使用：

* Queues
* Workflows
* Containers
* Durable Objects
* Workers for Platforms

---

## 9. 系统模块

### 9.1 Web App

职责：

* 展示首页
* 展示提交表单
* 接收 zip 上传
* 创建提交记录
* 发送 Telegram 通知
* 展示提交成功页
* 展示预览状态页
* 提供简单 admin 页面，可选

### 9.2 R2

保存用户上传文件。

路径设计：

```text
uploads/{submission_id}/source.zip
```

后续可以增加：

```text
artifacts/{submission_id}/build.zip
logs/{submission_id}/build.log
screenshots/{submission_id}/preview.png
```

但 MVP 阶段只需要保存 source zip。

### 9.3 D1

保存提交记录、状态、预览链接和错误信息。

MVP 阶段可以只用一张表。

### 9.4 Telegram 通知

当用户提交后，系统向我的 Telegram 发送消息。

通知内容包括：

* 提交编号
* 网站名称
* 联系方式
* 用户意图
* 网站说明
* R2 文件路径
* 推荐执行命令

示例：

```text
🚀 新的网站上线请求

项目：coffee-shop
联系方式：user@example.com
意图：想长期保留
说明：咖啡店介绍页

提交 ID：sub_abc123
R2 文件：uploads/sub_abc123/source.zip

本地执行：
pnpm deploy sub_abc123
```

### 9.5 本地部署脚本

脚本命令：

```bash
pnpm deploy sub_abc123
```

职责：

* 读取 submission 信息
* 下载 R2 zip
* 解压
* 检查项目类型
* 构建项目
* 调用 Cloudflare 临时部署
* 解析部署结果
* 回写 D1
* 发送 Telegram 成功或失败通知

---

## 10. 数据库设计

### 10.1 submissions 表

```sql
CREATE TABLE submissions (
  id TEXT PRIMARY KEY,
  project_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  description TEXT,
  intent TEXT NOT NULL DEFAULT 'preview',
  status TEXT NOT NULL DEFAULT 'submitted',
  source_r2_key TEXT NOT NULL,
  temporary_url TEXT,
  permanent_url TEXT,
  error_message TEXT,
  admin_note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### 10.2 intent 枚举

```text
preview          只是临时预览
permanent        想长期保留
custom_domain    想绑定自己的域名
service          想找人帮我改好再上线
```

### 10.3 status 枚举

```text
submitted    已提交
processing   处理中
deployed     已生成预览链接
failed       部署失败
converted    已转正式网站
closed       已关闭
```

---

## 11. API 设计

### 11.1 创建提交

```http
POST /api/submissions
```

功能：

* 接收表单信息
* 接收 zip 文件
* 上传到 R2
* 写入 D1
* 发送 Telegram 通知

返回：

```json
{
  "id": "sub_abc123",
  "status": "submitted"
}
```

### 11.2 查询提交状态

```http
GET /api/submissions/:id
```

返回：

```json
{
  "id": "sub_abc123",
  "projectName": "coffee-shop",
  "status": "deployed",
  "temporaryUrl": "https://xxx.workers.dev"
}
```

### 11.3 脚本回写结果

```http
POST /api/admin/submissions/:id/result
```

请求：

```json
{
  "status": "deployed",
  "temporaryUrl": "https://xxx.workers.dev"
}
```

失败时：

```json
{
  "status": "failed",
  "errorMessage": "No index.html or build output found"
}
```

安全：

* 使用 `ADMIN_TOKEN`
* 仅本地脚本调用
* 不暴露给普通用户

---

## 12. 本地脚本设计

### 12.1 命令

```bash
pnpm deploy sub_abc123
```

可选参数：

```bash
pnpm deploy sub_abc123 --type static
pnpm deploy sub_abc123 --type vite
pnpm deploy sub_abc123 --skip-install
pnpm deploy sub_abc123 --dry-run
```

### 12.2 执行步骤

```text
1. 从 D1 或 Admin API 读取 submission
2. 下载 R2 zip 到本地 tmp 目录
3. 安全解压
4. 检查文件结构
5. 判断项目类型
6. 构建项目
7. 找到输出目录
8. 创建 Cloudflare 临时部署
9. 解析 temporary URL
10. 回写结果
11. 发送 Telegram 通知
12. 清理临时目录
```

### 12.3 项目识别规则

纯静态：

```text
存在 index.html
不存在 package.json
```

Vite：

```text
存在 package.json
依赖包含 vite
scripts 中存在 build
```

React SPA：

```text
存在 package.json
依赖包含 react
scripts 中存在 build
输出目录通常为 dist 或 build
```

### 12.4 构建策略

纯静态：

```bash
无需构建
直接部署当前目录
```

Vite / React：

```bash
pnpm install
pnpm build
```

输出目录优先级：

```text
dist
build
out
public
```

---

## 13. 安全策略

### 13.1 上传限制

* zip 最大 10MB
* 解压后最大 50MB
* 单文件最大 5MB
* 文件数量最大 1000
* 禁止路径穿越
* 禁止符号链接
* 禁止隐藏可执行文件

### 13.2 构建安全

用户代码不可信，所以不要直接在本机裸跑。

最低建议：

* 本地脚本只负责下载和调度
* 构建过程放进 Docker
* Docker 中不放 Cloudflare token
* 构建完成后，由宿主机调用 wrangler 部署

推荐模式：

```text
本地脚本
  ↓
下载 zip
  ↓
Docker 内构建
  ↓
输出 dist
  ↓
宿主机调用 wrangler deploy
```

### 13.3 免费层风控

* 表单加 Turnstile
* 限制 IP 提交频率
* 限制每天提交次数
* 上传前检查文件类型
* 提交后人工判断
* 明显垃圾内容直接关闭

---

## 14. Telegram 通知设计

### 14.1 新提交通知

```text
🚀 新的网站上线请求

项目：{{project_name}}
联系方式：{{contact}}
意图：{{intent}}
说明：{{description}}

提交 ID：{{submission_id}}
R2 文件：{{source_r2_key}}

执行：
pnpm deploy {{submission_id}}
```

### 14.2 部署成功通知

```text
✅ 部署成功

项目：{{project_name}}
提交 ID：{{submission_id}}

预览链接：
{{temporary_url}}

用户联系方式：
{{contact}}

建议回复：
你的网站预览已经生成：{{temporary_url}}
这是一个临时预览链接。如果你希望长期保留，我可以帮你转成正式网站或绑定自己的域名。
```

### 14.3 部署失败通知

```text
❌ 部署失败

项目：{{project_name}}
提交 ID：{{submission_id}}

失败原因：
{{error_message}}

用户联系方式：
{{contact}}

建议回复：
我看了一下，你上传的网站暂时没有成功部署。可能是文件结构或构建方式有问题。你可以重新导出完整网站文件夹，或者我可以帮你整理成可上线版本。
```

---

## 15. 页面文案草案

### 15.1 首页 Hero

标题：

> AI 写好了网页？我帮你上线。

副标题：

> 上传你的网页文件，获得一个可以分享给别人访问的预览链接。
> 不需要懂 Cloudflare，不需要命令行，不需要 GitHub。

CTA：

> 上传我的网站

辅助说明：

> 目前优先支持 HTML / CSS / JS / React / Vite 静态网页。

### 15.2 表单页说明

> 请上传 AI 生成的网站 zip 文件。
> 如果不确定文件是否正确，也可以先提交，我会帮你判断能否上线。

### 15.3 提交成功页

> 已收到你的网站文件。
> 我会先帮你生成一个临时预览链接。处理完成后，会通过你留下的联系方式发给你。

### 15.4 转正式站文案

> 临时预览适合快速确认效果。
> 如果你希望这个网站长期保留、绑定自己的域名，或者改成可以正式使用的网站，可以继续购买上线服务。

---

## 16. 后台管理

MVP 阶段后台可以非常简单。

### 16.1 必须有

* 查看所有 submissions
* 查看联系方式
* 查看 R2 文件路径
* 查看状态
* 手动更新状态
* 手动填写 temporary_url
* 手动填写 error_message

### 16.2 可以后置

* 用户系统
* 订单系统
* 访问统计
* 自动邮件通知
* 自动域名绑定
* 复杂部署日志
* 权限管理

---

## 17. 第一版开发任务

### 17.1 Web 端

* 初始化 Next.js + OpenNext
* 部署到 Cloudflare Workers
* 创建首页
* 创建提交表单页
* 创建提交成功页
* 创建状态页
* 接入 Turnstile
* 实现 zip 上传到 R2
* 实现 D1 submissions 表
* 实现 Telegram 通知

### 17.2 Admin

* 创建简单 admin submissions 列表
* 创建 submission 详情页
* 支持手动更新状态
* 支持手动填写预览链接
* 支持查看联系方式

### 17.3 本地脚本

* 创建 `deploy.ts`
* 支持 `pnpm deploy <submission_id>`
* 从 API 获取 submission
* 从 R2 下载 zip
* 安全解压
* 识别静态 / Vite / React 项目
* Docker 内构建
* 调用 wrangler 临时部署
* 回写部署结果
* 发送 Telegram 通知

---

## 18. 验收标准

### 18.1 用户侧

* 用户可以打开首页。
* 用户可以提交网站 zip。
* 用户提交后可以看到成功页。
* 用户留下的联系方式可以被保存。
* 用户提交后我能收到 Telegram 通知。

### 18.2 管理侧

* 我可以在后台看到提交记录。
* 我可以复制 submission ID。
* 我可以本地运行部署脚本。
* 我可以将结果回写到系统。
* 我可以看到成功或失败状态。

### 18.3 部署侧

* 纯静态网站可以成功部署。
* Vite 项目可以成功部署。
* React SPA 可以成功部署。
* 部署成功后可以获得预览 URL。
* 部署失败后可以记录错误原因。

### 18.4 商业侧

* 能统计每天有多少提交。
* 能统计多少人选择“想长期保留”。
* 能统计多少人选择“想绑定域名”。
* 能统计多少人选择“想找人帮我改好再上线”。
* 能手动跟进高意向用户。

---

## 19. 成功指标

第一阶段重点看这些指标：

* 首页访问 → 表单打开率
* 表单打开 → 提交率
* 提交成功数量
* 有效 zip 比例
* 成功部署比例
* 用户回复率
* 用户是否愿意分享预览链接
* 用户是否询问长期保留
* 用户是否愿意付费
* 最常见的部署失败原因

不重要的指标：

* 自动化程度
* 平台完整度
* 构建速度
* 用户后台复杂度
* 域名系统完整度

---

## 20. 关键决策

### 20.1 为什么先不做自动化 sidecar？

因为现在最需要验证的不是技术可行性，而是用户需求和付费意愿。

人工兜底可以更快发现：

* 用户实际会上传什么
* AI 生成的网站质量如何
* 常见文件结构是什么
* 用户真正想买什么
* 哪些问题值得自动化

### 20.2 为什么使用 Telegram 通知？

因为它可以让第一版极快上线。

相比后台任务系统，Telegram 更适合早期：

* 开发成本低
* 响应及时
* 方便手动处理
* 方便复制命令
* 方便记录成功/失败

### 20.3 为什么本地跑脚本？

因为第一版提交量不会很大。

本地脚本的好处：

* 开发最快
* 调试方便
* 不需要维护 runner
* 不需要处理复杂任务队列
* 遇到奇怪项目可以人工判断
* 有利于积累自动化规则

---

## 21. 后续演进路线

### Phase 1：人工 MVP

当前版本。

特征：

* 用户提交
* Telegram 通知
* 本地脚本部署
* 人工联系用户

目标：

* 验证需求
* 验证用户上传质量
* 验证付费意愿

### Phase 2：半自动部署

当提交量变多后：

* 增加部署队列
* 增加自动状态轮询
* 增加自动邮件通知
* 增加部署日志
* 增加自动重新部署
* 增加简单付费转正

### Phase 3：自动化平台

当付费转化成立后：

* 使用 Cloudflare Queues
* 使用 Workflows
* 使用 Containers
* 自动构建
* 自动部署
* 自动清理
* 支持正式站托管

### Phase 4：网站上线服务平台

进一步扩展：

* 自定义域名
* AI 修复构建错误
* AI 优化文案
* AI 生成 SEO
* 表单系统
* 访问统计
* 用户后台
* 模板市场
* 人工服务包

---

## 22. 第一版一句话总结

第一版只做一件事：

> 让不会部署的普通用户，把 AI 生成的网站文件提交给我；我用脚本帮他生成一个可以访问的预览链接，再验证他是否愿意为长期上线付费。

这不是完整托管平台，而是一个轻量的上线服务入口。
