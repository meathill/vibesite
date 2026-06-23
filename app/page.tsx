import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircleIcon,
  ClockIcon,
  CodeIcon,
  FileZipIcon,
  GlobeIcon,
  RocketIcon,
  UploadIcon,
  XCircleIcon,
} from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VibeSite · AI 生成网页一键上线',
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-4 py-20 text-center md:py-32">
        <Badge variant="secondary" className="px-3 py-1">
          MVP · 快速验证
        </Badge>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
          AI 生成的网页，一键上线
        </h1>
        <p className="max-w-lg text-lg text-muted-foreground">
          你用 AI 生成了一个网页，却不知道怎么上线？把文件交给我们，10
          分钟内获得一个真实可访问的链接。
        </p>
        <div className="flex gap-3">
          <Button size="lg" render={<a href="/submit" />}>
            立即提交
          </Button>
          <Button size="lg" variant="outline" render={<a href="#how-it-works" />}>
            了解流程
          </Button>
        </div>
      </section>

      {/* 支持的项目类型 */}
      <section className="bg-muted/40 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold">支持的项目类型</h2>
          <p className="mb-8 text-center text-muted-foreground">
            我们目前支持以下类型的前端项目
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <FileZipIcon className="mb-2 size-8 text-success" />
                <CardTitle>AI 生成的网页</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  使用 Cursor、Bolt、Lovable、v0 等 AI 工具生成的纯 HTML/CSS/JS
                  项目，直接打包上传即可。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CodeIcon className="mb-2 size-8 text-success" />
                <CardTitle>Vite 项目</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  使用 Vite 构建的前端项目，包括 Vue、Svelte、Lit 等框架，我们会自动检测并构建。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GlobeIcon className="mb-2 size-8 text-success" />
                <CardTitle>React SPA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  使用 Create React App 或类似工具创建的 React 单页应用。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 不支持的项目类型 */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold">不支持的项目类型</h2>
          <p className="mb-8 text-center text-muted-foreground">
            以下类型的项目需要完整的服务器环境，暂时无法支持
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { name: 'Next.js SSR', desc: '需要 Node.js 服务器运行时' },
              { name: '后端服务', desc: 'Express、Koa、Fastify 等服务端框架' },
              { name: '数据库', desc: '任何需要数据库连接的项目' },
              { name: 'Docker', desc: '需要容器化部署的项目' },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                <XCircleIcon className="size-5 shrink-0 text-destructive" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section id="how-it-works" className="bg-muted/40 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold">三步完成上线</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: UploadIcon,
                step: '1',
                title: '上传文件',
                desc: '把你的 AI 生成网页打包成 .zip 文件，填写联系方式后上传。',
              },
              {
                icon: ClockIcon,
                step: '2',
                title: '等待部署',
                desc: '我们帮你部署到全球 CDN，通常 10 分钟内完成。',
              },
              {
                icon: CheckCircleIcon,
                step: '3',
                title: '获得链接',
                desc: '拿到一个真实可访问的链接，分享给任何人。',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 重要限制 */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold">重要限制</h2>
          <ul className="space-y-3">
            {[
              '每个项目大小限制为 50MB',
              '仅支持 .zip 格式',
              '预览链接有效期 72 小时',
              '不提供自定义域名',
              '不提供后端服务支持',
              '不提供 SLA 保证',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          ⚠️ 免责声明：本服务为 MVP 阶段产品，不保证 SLA。我们仅提供托管服务，不拥有您网站的任何内容版权。
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} VibeSite
        </p>
      </footer>
    </main>
  );
}
