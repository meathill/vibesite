import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PRICING_PLANS } from './landing-data';

export function LandingPricing() {
  return (
    <section id="pricing" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">选择适合你的方案</h2>
        <p className="mb-12 text-center text-muted-foreground">先免费预览，满意了再升级</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'relative flex flex-col',
                plan.highlighted && 'border-primary shadow-md',
              )}
            >
              {plan.highlighted && <Badge className="absolute -top-2.5 right-4">推荐</Badge>}
              <CardHeader>
                <CardTitle className="text-base">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.unit && <span className="text-sm text-muted-foreground">{plan.unit}</span>}
                </div>
                <p className="text-xs text-muted-foreground">{plan.desc}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <ul className="flex-1 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn('w-full', plan.highlighted && 'bg-brand-gradient shadow-primary')}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  render={<Link href={plan.ctaHref} prefetch={false} />}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
