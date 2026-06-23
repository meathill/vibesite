import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClockIcon } from '@phosphor-icons/react/dist/ssr';

const PLANS = [
  {
    name: '基础托管',
    price: '29 元/年',
    features: ['长期稳定的预览链接', '全球 CDN 加速', '不限访问次数'],
    recommended: false,
  },
  {
    name: '自定义域名',
    price: '99 元/年',
    features: ['绑定自己的域名', 'HTTPS 证书', '长期稳定的预览链接'],
    recommended: true,
  },
  {
    name: '人工服务',
    price: '299-999 元',
    features: ['专业人工部署', '代码优化建议', '性能调优', '一对一支持'],
    recommended: false,
  },
];

export default function ExpiredPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <ClockIcon className="size-16 text-muted-foreground" />
        <h1 className="text-3xl font-bold">链接已过期</h1>
        <p className="max-w-md text-muted-foreground">
          该预览链接已超过 72 小时有效期。如需继续使用，可以选择我们的付费服务获得长期稳定的托管。
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.recommended ? 'border-primary shadow-md' : ''}`}
          >
            {plan.recommended && (
              <Badge className="absolute -top-2 right-4">推荐</Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-2xl font-bold">{plan.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="size-1.5 rounded-full bg-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Button size="lg" render={<a href="/submit" />}>
          重新提交
        </Button>
        <Button size="lg" variant="outline" render={<a href="/" />}>
          返回首页
        </Button>
      </div>
    </main>
  );
}
