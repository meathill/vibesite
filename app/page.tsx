import {
  CheckCircleIcon,
  FileZipIcon,
  GlobeIcon,
  UploadIcon,
} from '@phosphor-icons/react/dist/ssr';
import { BrandFooter, BrandHeader } from 'meathill-brand-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqJsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AI_TOOLS, FAQS, PERSONAS, WHY_POINTS } from './_sections/landing-data';
import { LandingFaq } from './_sections/landing-faq';
import { LandingPricing } from './_sections/landing-pricing';

export const metadata: Metadata = {
  title: 'VibeSite - AI 生成网页一键上线 | 免费部署托管',
  description:
    '用 AI 生成了网页不知道怎么部署？上传 zip 文件，10 分钟获得可访问链接。支持 Cursor、Bolt、Lovable、v0 生成的项目。免费预览，无需注册。',
  alternates: { canonical: 'https://vibe.meathill.com' },
};

const HOW_STEPS = [
  {
    icon: FileZipIcon,
    step: '1',
    title: '打包成 zip',
    desc: '把你 AI 生成的网站文件打包成 .zip 压缩包。',
  },
  {
    icon: UploadIcon,
    step: '2',
    title: '上传到 VibeSite',
    desc: '填写联系方式，拖拽上传文件。就是这么简单。',
  },
  {
    icon: GlobeIcon,
    step: '3',
    title: '拿到链接',
    desc: '10 分钟内收到一个可访问的链接，分享给任何人。',
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <BrandHeader
        currentSiteId="vibesite"
        locale="zh"
        productName="VibeSite"
        productUrl="https://vibe.meathill.com"
        actions={
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              <a
                href="#how-it-works"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                怎么用
              </a>
              <a
                href="#pricing"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                定价
              </a>
              <a
                href="#faq"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ
              </a>
            </nav>
            <Button
              size="default"
              className="bg-brand-gradient shadow-primary"
              render={<Link href="/submit" />}
            >
              立即上线
            </Button>
          </div>
        }
      />

      <section className="flex flex-col items-center justify-center gap-6 px-4 pb-8 pt-16 text-center md:pb-12 md:pt-24">
        <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          AI 写好了网页
          <br />
          我们帮你上线
        </h1>
        <p className="max-w-lg text-base text-muted-foreground md:text-lg">
          上传 zip 文件，10 分钟拿到一个真实可访问的链接。
          <br className="hidden md:block" />
          免费预览，无需注册，全球 CDN 加速。
        </p>
        <div className="flex gap-4">
          <Button
            size="xl"
            className="bg-brand-gradient shadow-primary-lg"
            render={<Link href="/submit" />}
          >
            立即上传
          </Button>
          <Button size="xl" variant="outline" render={<a href="#how-it-works" />}>
            了解更多
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircleIcon className="size-3.5 text-success" />
            免费预览
          </span>
          <span className="flex items-center gap-1">
            <CheckCircleIcon className="size-3.5 text-success" />
            无需注册
          </span>
          <span className="flex items-center gap-1">
            <CheckCircleIcon className="size-3.5 text-success" />
            全球 CDN
          </span>
        </div>
      </section>

      <section className="border-y bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm text-muted-foreground">支持所有主流 AI 工具生成的网页</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {AI_TOOLS.map((tool) => (
              <Badge key={tool} variant="secondary" className="px-4 py-1.5 text-sm">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">三步完成上线</h2>
          <p className="mb-12 text-center text-muted-foreground">
            不需要懂技术，不需要注册任何平台
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_STEPS.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <item.icon className="size-7" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-success text-xs font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">为什么选择 VibeSite</h2>
          <p className="mb-12 text-center text-muted-foreground">专为不熟悉技术部署的用户设计</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {WHY_POINTS.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">适合谁用</h2>
          <p className="mb-12 text-center text-muted-foreground">
            不管你是谁，只要有一个网页想上线，我们就能帮你
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PERSONAS.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border p-5 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <LandingPricing />

      <Separator />

      <LandingFaq />

      <section className="bg-primary/75 px-4 py-16 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">准备好上线了吗？</h2>
          <p className="mb-8 text-primary-foreground/80">
            上传你的网站，10 分钟后就能分享给全世界。
          </p>
          <Button size="xl" variant="secondary" render={<Link href="/submit" prefetch={false} />}>
            立即上传
          </Button>
        </div>
      </section>

      <BrandFooter
        currentSiteId="vibesite"
        description="上传 zip 文件，10 分钟获得可访问链接。免费预览，无需注册。"
        locale="zh"
      >
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground">
            怎么用
          </a>
          <a href="#pricing" className="hover:text-foreground">
            定价
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
        </nav>
      </BrandFooter>

      <FaqJsonLd faqs={FAQS} />
    </main>
  );
}
