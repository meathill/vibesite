import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardContent className="flex flex-col items-center gap-6 pt-8">
          <CheckCircleIcon className="size-16 text-success" />
          <h1 className="text-2xl font-bold">提交成功！</h1>
          <div className="space-y-2 text-muted-foreground">
            <p>我们已经收到你的网站文件。</p>
            <p>通常会在 10 分钟内完成部署，请耐心等待。</p>
          </div>

          {id && (
            <div className="w-full rounded-lg bg-muted p-3">
              <p className="text-xs text-muted-foreground">提交 ID</p>
              <p className="font-mono text-sm">{id}</p>
            </div>
          )}

          <div className="flex w-full gap-3">
            {id && (
              <Button className="flex-1" render={<a href={`/status/${id}`} />}>
                查看进度
              </Button>
            )}
            <Button className="flex-1" variant="outline" render={<a href="/" />}>
              返回首页
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
