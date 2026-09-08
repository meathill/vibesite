# TESTING · 测试指南

## 运行

```bash
pnpm test          # vitest run，全量（16 文件，59 用例）
pnpm run test:watch # 监听模式
```

覆盖统计只含 `lib/**` 与 `app/api/**`（见 `vitest.config.ts`）。`components/hooks/store` 不在覆盖目标内（多为模板透传，ROI 低）。

## 覆盖要求（优先级）

1. **工具与纯逻辑 100%**：`lib/validation/format/status-labels/fetcher/api-response/utils/r2`。
2. **API 路由 100% 意图**：参数校验走 zod schema 测试（不硬调 handler 也算覆盖意图）；`auth` 路由有真实 handler 测试。
3. **核心编排必须 mock 边界**：`lib/submissions`（D1/R2/Telegram）、`lib/db`（D1 stub）。
4. **UI 只保关键**：`seo/json-ld` 防回归；其余 shadcn 透传不补。

## Mock 范式（抄现成）

- **D1 stub**：抄 `tests/api/auth.test.ts`（`prepare/bind/all/batch` + `queries` 录制）。
- **fetch stub**：`vi.stubGlobal('fetch', vi.fn()...)`，断言 body 文案（抄 `tests/lib/telegram.test.ts`）。
- **模块 mock**：`vi.mock('@/lib/db')` + `vi.hoisted`（抄 `tests/lib/submissions.test.ts`）。注意 `beforeEach` 用 `mockReset` 清 once 队列，`mockClear` 不够。

## 新增测试放哪

- `tests/lib/<模块>.test.ts` — 纯函数与编排。
- `tests/api/<路由>.test.ts` — 校验 schema 与白名单（与路由 import 同一份常量，防漂移）。
- `tests/migrations/` — 升级 Better-Auth 后必跑 drift 测试。
- `tests/seo/` — 文案/结构防回归。

## 反模式

- 不测框架内部；不用类型系统已保证的东西凑数。
- 不深 mock 到只验证 mock 接线。
- 旧占位测试（只测 `''.trim()`）已在 2026-09 维护中转正，勿回退。
