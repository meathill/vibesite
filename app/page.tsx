import {
  CheckCircleIcon,
  CodeIcon,
  FileZipIcon,
  GlobeIcon,
  GraduationCapIcon,
  LightningIcon,
  RocketIcon,
  ShieldCheckIcon,
  UploadIcon,
  UserIcon,
} from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/seo/json-ld';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'VibeSite - AI 生成网页一键上线 | 免费部署托管',
  description:
    '用 AI 生成了网页不知道怎么部署？上传 zip 文件，10 分钟获得可访问链接。支持 Cursor、Bolt、Lovable、v0 生成的项目。免费预览，无需注册。',
  alternates: { canonical: 'https://vibe.meathill.com' },
};

const AI_TOOLS = [
  '豆包',
  'DeepSeek',
  'Cursor',
  'Bolt',
  'Lovable',
  'v0',
  'ChatGPT',
  'Claude',
  'Windsurf',
  'Replit',
];

const WHY_POINTS = [
  {
    icon: CodeIcon,
    title: '不需要懂命令行',
    desc: '告别 npm install、git push、CI/CD 配置。上传 zip 就行。',
  },
  {
    icon: GlobeIcon,
    title: '不需要注册托管平台',
    desc: '不用折腾 Cloudflare、Vercel、Netlify 的账号和配置。',
  },
  {
    icon: LightningIcon,
    title: '10 分钟内部署完成',
    desc: '全球 CDN 分发，任何设备、任何网络都能访问。',
  },
  {
    icon: ShieldCheckIcon,
    title: '免费预览，零风险',
    desc: '先看效果，满意了再考虑长期托管。不花一分钱。',
  },
];

const PERSONAS = [
  {
    icon: RocketIcon,
    title: 'AI 工具用户',
    desc: '用 Cursor、Bolt、Lovable、v0 生成了网页，想让别人也能看到。',
  },
  {
    icon: UserIcon,
    title: '小商家',
    desc: '想要一个简单的在线展示页面，但不想花几千块找人做。',
  },
  {
    icon: GraduationCapIcon,
    title: '学生',
    desc: '课程作业或个人项目需要一个可访问的链接来提交。',
  },
  {
    icon: FileZipIcon,
    title: '自由职业者',
    desc: '需要快速给客户展示作品集或项目原型。',
  },
];

const PRICING_PLANS = [
  {
    name: '免费预览',
    price: '0',
    unit: '',
    desc: '72 小时内免费访问',
    features: ['全球 CDN 部署', '可分享的预览链接', '72 小时有效期'],
    cta: '立即尝试',
    ctaHref: '/submit',
    highlighted: false,
  },
  {
    name: '基础',
    price: '188',
    unit: '元/年',
    desc: '快速上线，省心省力',
    features: ['HTTPS 证书', '独立二级域名', '全球 CDN 加速', '不限访问次数', '邮件技术支持'],
    cta: '立即开始',
    ctaHref: '/submit',
    highlighted: false,
  },
  {
    name: '全自持',
    price: '988',
    unit: '元/年',
    desc: '完全掌控你的网站',
    features: ['HTTPS 证书', '自定义域名', '完全自主管理', '优先技术支持', '后端数据库支持'],
    cta: '立即开始',
    ctaHref: '/submit',
    highlighted: true,
  },
  {
    name: '人工服务',
    price: '联系我',
    unit: '',
    desc: '专业人工部署与优化',
    features: [
      'HTTPS 证书',
      '专业全栈开发',
      '代码优化建议',
      '一对一支持',
      '除合法合规外无任何限制',
    ],
    cta: '联系我们',
    ctaHref: '/submit',
    highlighted: false,
  },
];

const FAQS = [
  {
    question: '支持什么格式的文件？',
    answer:
      '支持 .zip 格式的压缩包。包内应该是网站的源代码或构建产物。支持纯 HTML/CSS/JS、Vite 项目和 React SPA。',
  },
  {
    question: '文件大小有限制吗？',
    answer: '单个文件最大支持 50MB。如果你的项目超过了，可以尝试压缩图片等静态资源。',
  },
  {
    question: '预览链接 72 小时后怎么办？',
    answer:
      '免费预览链接会在 72 小时后自动过期。如果你需要长期使用，可以选择我们的付费托管方案，最低 188 元/年。',
  },
  {
    question: '能绑定自己的域名吗？',
    answer: '可以。选择「自定义域名」方案（988 元/年），我们帮你配置域名解析和 HTTPS 证书。',
  },
  {
    question: '我的代码安全吗？',
    answer:
      '我们仅将你的文件用于部署，不会查看、修改或分享你的代码。预览链接过期后，源文件会从我们的服务器上删除。',
  },
  {
    question: '不支持哪些类型的项目？',
    answer:
      '目前不支持需要后端服务的项目（如 Next.js SSR、Express、数据库连接），也不支持需要 Docker 容器化部署的项目。我们专注于纯前端静态网站的部署。',
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2 font-bold">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs">
              V
            </div>
            VibeSite
          </a>
          <div className="hidden items-center gap-6 md:flex">
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
          </div>
          <Button
            size="default"
            className="bg-brand-gradient shadow-primary"
            render={<a href="/submit" />}
          >
            立即上线
          </Button>
        </div>
      </nav>

      {/* Hero */}
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
            render={<a href="/submit" />}
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

      {/* 工具兼容条 */}
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

      {/* 怎么用 */}
      <section id="how-it-works" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">三步完成上线</h2>
          <p className="mb-12 text-center text-muted-foreground">
            不需要懂技术，不需要注册任何平台
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
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
            ].map((item) => (
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

      {/* 为什么选择 VibeSite */}
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

      {/* 使用场景 */}
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

      {/* 定价 */}
      <section id="pricing" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">选择适合你的方案</h2>
          <p className="mb-12 text-center text-muted-foreground">先免费预览，满意了再升级</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.highlighted ? 'border-primary shadow-md' : ''
                }`}
              >
                {plan.highlighted && <Badge className="absolute -top-2.5 right-4">推荐</Badge>}
                <CardHeader>
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.unit && (
                      <span className="text-sm text-muted-foreground">{plan.unit}</span>
                    )}
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
                    className={`w-full ${plan.highlighted ? 'bg-brand-gradient shadow-primary' : ''}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    render={<a href={plan.ctaHref} />}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* FAQ */}
      <section id="faq" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">常见问题</h2>
          <p className="mb-8 text-center text-muted-foreground">有疑问？看看下面能不能找到答案</p>
          <Accordion multiple={false}>
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 最终 CTA */}
      <section className="bg-primary/75 px-4 py-16 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">准备好上线了吗？</h2>
          <p className="mb-8 text-primary-foreground/80">
            上传你的网站，10 分钟后就能分享给全世界。
          </p>
          <Button size="xl" variant="secondary" render={<a href="/submit" />}>
            立即上传
          </Button>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className="flex size-5 items-center justify-center rounded bg-primary text-[10px] text-primary-foreground">
              V
            </div>
            VibeSite
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground">
              怎么用
            </a>
            <a href="#pricing" className="hover:text-foreground">
              定价
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Meathill LLC. All rights reserved. v1.0.0
          </p>
        </div>
      </footer>

      {/* FAQ 结构化数据 */}
      <FaqJsonLd faqs={FAQS} />
    </main>
  );
}
