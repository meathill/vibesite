import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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

export const metadata: Metadata = {
  title: 'VibeSite - AI 生成网页一键上线 | 免费部署托管',
  description:
    '用 AI 生成了网页不知道怎么部署？上传 zip 文件，10 分钟获得可访问链接。支持 Cursor、Bolt、Lovable、v0 生成的项目。免费预览，无需注册。',
  alternates: { canonical: 'https://vibesite.dev' },
};

const AI_TOOLS = [
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
    name: '基础托管',
    price: '99',
    unit: '元/年',
    desc: '长期稳定的在线方案',
    features: [
      '长期稳定的可访问链接',
      '全球 CDN 加速',
      'HTTPS 证书',
      '不限访问次数',
      '邮件技术支持',
    ],
    cta: '联系我们',
    highlighted: false,
  },
  {
    name: '全自持托管',
    price: '299',
    unit: '元/年',
    desc: '绑定自己的域名',
    features: [
      '绑定自己的域名',
      'HTTPS 证书',
      '长期稳定托管',
      '全球 CDN 加速',
      '优先技术支持',
    ],
    cta: '联系我们',
    highlighted: true,
  },
  {
    name: '人工服务',
    price: '999',
    unit: '元/年',
    desc: '专业人工部署与优化',
    features: [
      '专业人工部署',
      '代码优化建议',
      '性能调优',
      'HTTPS 证书',
      '一对一支持',
    ],
    cta: '联系我们',
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
      '免费预览链接会在 72 小时后自动过期。如果你需要长期使用，可以选择我们的付费托管方案，最低 99 元/年。',
  },
  {
    question: '能绑定自己的域名吗？',
    answer:
      '可以。选择「全自持托管」方案（299 元/年），我们帮你配置域名解析和 HTTPS 证书。',
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
      <header className="sticky top-0 z-30 border-b border-[--color-rule] bg-[--color-cream]/88 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-4 px-6">
          <a
            href="/"
            className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-[--color-ink] no-underline"
          >
            VibeSite
          </a>
          <nav className="hidden items-center gap-1 text-sm text-[--color-ink-soft] md:flex">
            <a
              href="#how-it-works"
              className="rounded px-2.5 py-1.5 no-underline transition-colors hover:bg-[--color-fluff] hover:text-[--color-ink]"
            >
              怎么用
            </a>
            <a
              href="#pricing"
              className="rounded px-2.5 py-1.5 no-underline transition-colors hover:bg-[--color-fluff] hover:text-[--color-ink]"
            >
              定价
            </a>
            <a
              href="#faq"
              className="rounded px-2.5 py-1.5 no-underline transition-colors hover:bg-[--color-fluff] hover:text-[--color-ink]"
            >
              FAQ
            </a>
          </nav>
          <a href="/submit" className="btn-press px-3 py-1.5 text-sm">
            立即上线
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[--color-rule]">
        <div className="bg-sun absolute inset-0 pointer-events-none" aria-hidden />
        <div className="bg-grid absolute inset-0 opacity-50 pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-[1100px] px-6 py-16 md:py-28">
          <span className="eyebrow-badge mb-6 inline-flex">
            免费预览 · 无需注册 · 全球 CDN
          </span>
          <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-[--color-ink]">
            AI 写好了网页
            <br />
            <span className="highlight">我们帮你上线</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[--color-ink-soft]">
            上传 zip 文件，10 分钟拿到一个真实可访问的链接。
            不需要懂 Cloudflare，不需要命令行，不需要 GitHub。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/submit" className="btn-press btn-press-lg">
              立即上传
            </a>
            <a
              href="#how-it-works"
              className="btn-press btn-press-ink btn-press-lg"
            >
              了解流程
            </a>
          </div>
          <p className="mt-8 max-w-md border-t-2 border-dashed border-[--color-rule-strong] pt-4 text-sm leading-relaxed text-[--color-mute]">
            目前优先支持 Cursor、Bolt、Lovable、v0 等 AI 工具生成的静态网页。
          </p>
        </div>
      </section>

      {/* 工具兼容条 */}
      <section className="border-b border-[--color-rule] bg-[--color-paper] px-6 py-8">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-4 text-sm text-[--color-mute]">
            支持所有主流 AI 工具生成的网页
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {AI_TOOLS.map((tool) => (
              <span key={tool} className="feat-tag">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 怎么用 */}
      <section
        id="how-it-works"
        className="border-b border-[--color-rule] px-6 py-16 md:py-20"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14">
            <div>
              <p className="eyebrow">— 怎么开始</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-[--color-ink]">
                三步完成<span className="highlight">上线</span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[--color-ink-soft]">
                不需要懂技术，不需要注册任何平台。
                把文件交给我们，剩下的事情我们搞定。
              </p>
            </div>
            <ol className="flex flex-col gap-3">
              {[
                {
                  title: '打包成 zip',
                  desc: '把你 AI 生成的网站文件打包成 .zip 压缩包。',
                },
                {
                  title: '上传到 VibeSite',
                  desc: '填写联系方式，拖拽上传文件。就是这么简单。',
                },
                {
                  title: '拿到链接',
                  desc: '10 分钟内收到一个可访问的链接，分享给任何人。',
                },
              ].map((item, i) => (
                <li
                  key={item.title}
                  className="group grid grid-cols-[auto_1fr] items-center gap-4 rounded-[--radius-lg] border-2 border-[--color-rule-strong] bg-[--color-cream] p-3.5 transition-all hover:border-[--color-corgi] hover:bg-[--color-fluff] hover:translate-x-1"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[--color-yellow] font-[family-name:var(--font-mono)] text-sm font-extrabold text-[--color-ink] shadow-[0_2px_0_0_var(--color-yellow-deep)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed text-[--color-ink-soft]">
                    <b className="text-[--color-ink]">{item.title}</b>
                    <span className="mx-2 text-[--color-rule-strong]">·</span>
                    {item.desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 为什么选择 VibeSite */}
      <section className="border-b border-[--color-rule] bg-[--color-paper] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="eyebrow">— 为什么选择我们</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-[--color-ink]">
            专为<span className="highlight">非技术用户</span>设计
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[--color-ink-soft]">
            你不需要成为程序员，也能让自己的网页上线。
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {WHY_POINTS.map((item) => (
              <article
                key={item.title}
                className="card-press flex flex-col gap-3 p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[--color-yellow] shadow-[0_2px_0_0_var(--color-yellow-deep)]">
                  <item.icon className="size-5 text-[--color-ink]" />
                </div>
                <h3 className="text-lg font-extrabold text-[--color-ink]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[--color-ink-soft]">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 使用场景 */}
      <section className="border-b border-[--color-rule] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="eyebrow">— 适合谁用</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-[--color-ink]">
            不管你是谁，<span className="highlight">只要有一个网页想上线</span>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PERSONAS.map((item) => (
              <div
                key={item.title}
                className="card-press flex gap-4 p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[--color-yellow] shadow-[0_2px_0_0_var(--color-yellow-deep)]">
                  <item.icon className="size-5 text-[--color-ink]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[--color-ink]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[--color-ink-soft]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 定价 */}
      <section
        id="pricing"
        className="border-b border-[--color-rule] bg-[--color-paper] px-6 py-16 md:py-20"
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="eyebrow text-center">— 定价</p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-[--color-ink]">
            选择适合你的<span className="highlight">方案</span>
          </h2>
          <p className="mt-4 text-center text-sm text-[--color-ink-soft]">
            先免费预览，满意了再升级。所有方案均包含 HTTPS。
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`card-press flex flex-col p-6 ${
                  plan.highlighted
                    ? 'border-[--color-yellow-deep] bg-[--color-fluff] shadow-[0_5px_0_0_var(--color-yellow-deep)]'
                    : ''
                }`}
              >
                <h3 className="text-lg font-extrabold text-[--color-ink]">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[--color-ink]">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[--color-mute]">{plan.unit}</span>
                </div>
                <p className="mt-1 text-xs text-[--color-mute]">{plan.desc}</p>
                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[--color-ink-soft]"
                    >
                      <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-[--color-success]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/submit"
                  className={`btn-press mt-6 w-full justify-center ${
                    plan.highlighted ? '' : 'btn-press-ink'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-[--color-rule] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[7fr_5fr]">
            <div>
              <p className="eyebrow">— 常见问题</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-[--color-ink]">
                想问的<span className="highlight">大概率</span>在这里
              </h2>
              <div className="mt-8">
                <Accordion multiple={false}>
                  {FAQS.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger>
                        <span className="flex items-start gap-4 text-left">
                          <span className="inline-flex h-[26px] items-center rounded bg-[--color-fluff] px-2 font-[family-name:var(--font-mono)] text-xs font-bold text-[--color-yellow-deep]">
                            Q{String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-base font-bold text-[--color-ink]">
                            {faq.question}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-[52px] text-sm leading-relaxed text-[--color-ink-soft]">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <aside className="flex flex-col gap-4">
              <div className="card-press relative overflow-hidden bg-[--color-fluff] p-6 shadow-[0_5px_0_0_var(--color-yellow-deep)]">
                <p className="eyebrow">— 免费预览</p>
                <h3 className="mt-3 text-xl font-extrabold text-[--color-ink]">
                  先试试，不花钱
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[--color-ink-soft]">
                  上传你的网站文件，10 分钟内拿到一个可以分享的链接。
                  满意了再考虑付费方案。
                </p>
                <a href="/submit" className="btn-press mt-5 inline-flex">
                  立即尝试
                </a>
              </div>
              <div className="card-press flex items-center justify-between gap-4 bg-[--color-cream] p-5">
                <div>
                  <p className="eyebrow">— 定价</p>
                  <p className="mt-1.5 text-base font-extrabold text-[--color-ink]">
                    查看价格方案
                  </p>
                  <p className="mt-0.5 text-xs text-[--color-ink-soft]">
                    99 / 299 / 999 元/年
                  </p>
                </div>
                <a
                  href="#pricing"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[--color-yellow] text-[--color-ink] no-underline shadow-[0_2px_0_0_var(--color-yellow-deep)]"
                >
                  →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 最终 CTA */}
      <section className="bg-[--color-ink] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold leading-[1.1] text-[--color-cream]">
            准备好上线了吗？
          </h2>
          <p className="mt-4 text-[--color-rule]">
            上传你的网站，10 分钟后就能分享给全世界。
          </p>
          <a href="/submit" className="btn-press btn-press-lg mt-8 inline-flex">
            立即上传
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[--color-paper]">
        <div className="mx-auto max-w-[1100px] px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[5fr_7fr]">
            <div>
              <a
                href="/"
                className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[--color-ink] no-underline"
              >
                VibeSite
              </a>
              <p className="mt-3.5 max-w-[360px] text-sm leading-relaxed text-[--color-ink-soft]">
                AI 生成网页一键上线服务。上传 zip 文件，10 分钟获得可访问链接。
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="mb-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[--color-ink]">
                  产品
                </h4>
                <ul className="flex flex-col gap-2">
                  <li>
                    <a href="/submit" className="text-[--color-ink-soft] no-underline hover:text-[--color-ink]">
                      提交网站
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="text-[--color-ink-soft] no-underline hover:text-[--color-ink]">
                      定价
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-[--color-ink-soft] no-underline hover:text-[--color-ink]">
                      常见问题
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[--color-ink]">
                  公司
                </h4>
                <ul className="flex flex-col gap-2">
                  <li>
                    <a href="#" className="text-[--color-ink-soft] no-underline hover:text-[--color-ink]">
                      关于
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[--color-ink-soft] no-underline hover:text-[--color-ink]">
                      联系
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[--color-ink]">
                  法律
                </h4>
                <ul className="flex flex-col gap-2">
                  <li>
                    <a href="#" className="text-[--color-ink-soft] no-underline hover:text-[--color-ink]">
                      服务条款
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[--color-ink-soft] no-underline hover:text-[--color-ink]">
                      隐私政策
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[--color-rule] pt-5 font-[family-name:var(--font-mono)] text-xs tracking-wider text-[--color-mute] sm:flex-row">
            <span>© {new Date().getFullYear()} Meathill LLC · 保留所有权利</span>
            <span>Made with 🐾 in 中国</span>
          </div>
        </div>
      </footer>

      {/* FAQ 结构化数据 */}
      <FaqJsonLd faqs={FAQS} />
    </main>
  );
}
