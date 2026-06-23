import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircleIcon, RocketIcon, UploadIcon } from '@phosphor-icons/react/dist/ssr';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">AI 生成的网页，一键上线</h1>
        <p className="max-w-md text-muted-foreground">
          你用 AI 生成了一个网页，却不知道怎么上线？把文件交给我们，10
          分钟内获得一个真实可访问的链接。
        </p>
        <Button size="lg" render={<a href="/submit" />}>
          立即提交
        </Button>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <UploadIcon className="mb-2 size-8 text-primary" />
            <CardTitle>上传文件</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              把你的 AI 生成网页打包成 .zip 文件，拖拽上传即可。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <RocketIcon className="mb-2 size-8 text-primary" />
            <CardTitle>等待部署</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              我们会帮你部署到全球 CDN，通常 10 分钟内完成。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CheckCircleIcon className="mb-2 size-8 text-primary" />
            <CardTitle>获得链接</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              拿到一个真实可访问的链接，分享给任何人。
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
