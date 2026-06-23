import { DEFAULT_LANG, type Lang, SUPPORTED_LANGS, getDictionary, isValidLang } from '@/lib/i18n';
import { PLAN_LIMITS } from '@/lib/plan';
import { AiAgentSection } from 'x-downloader-web-shared/components/ai-agent-section';
import { DownloadForm } from 'x-downloader-web-shared/components/download-form';
import { FaqSection } from 'x-downloader-web-shared/components/faq-section';
import { LazyAdSlot } from 'x-downloader-web-shared/components/lazy-ad-slot';
import { PremiumCta } from 'x-downloader-web-shared/components/premium-cta';
import { fillTemplate, formatBytes } from 'x-downloader-web-shared/lib/utils';

export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}
import {
  ClipboardIcon,
  CopyIcon,
  DeviceMobileIcon,
  DownloadSimpleIcon,
  LightningIcon,
  LockIcon,
  RobotIcon,
  ShieldIcon,
  SparkleIcon,
  UserMinusIcon,
} from '@phosphor-icons/react/ssr';

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = await getDictionary(lang);

  // FAQ 里涉及 free/pro 限额的数字从 PLAN_LIMITS 渲染，避免字典写死过时的数字。
  // 所有 a 字段都跑 fillTemplate（无占位符的字符串无副作用），保护性兜底——
  // 部分语言（如 de.json）q/a 编号与 en 不对齐，限额描述可能落在 a10 而非 a8。
  const planVars = {
    dailyFree: PLAN_LIMITS.free.dailyDownloads,
    dailyPro: PLAN_LIMITS.pro.dailyDownloads,
    sizeFree: formatBytes(PLAN_LIMITS.free.maxFileSizeBytes),
    sizePro: formatBytes(PLAN_LIMITS.pro.maxFileSizeBytes),
  };
  const faqItems = [
    { question: dict.faq.q1, answer: fillTemplate(dict.faq.a1, planVars) },
    { question: dict.faq.q2, answer: fillTemplate(dict.faq.a2, planVars) },
    { question: dict.faq.q3, answer: fillTemplate(dict.faq.a3, planVars) },
    { question: dict.faq.q4, answer: fillTemplate(dict.faq.a4, planVars) },
    { question: dict.faq.q5, answer: fillTemplate(dict.faq.a5, planVars) },
    { question: dict.faq.q6, answer: fillTemplate(dict.faq.a6, planVars) },
    { question: dict.faq.q7, answer: fillTemplate(dict.faq.a7, planVars) },
    { question: dict.faq.q8, answer: fillTemplate(dict.faq.a8, planVars) },
    { question: dict.faq.q9, answer: fillTemplate(dict.faq.a9, planVars) },
    { question: dict.faq.q10, answer: fillTemplate(dict.faq.a10, planVars) },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'YouTube Video Downloader',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://youtubedownloader.win',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '12450',
      bestRating: '5',
    },
    description: dict.site.description,
  };

  const steps = [
    {
      icon: <CopyIcon className="text-primary" size={24} />,
      step: '1',
      title: dict.steps.step1Title,
      desc: dict.steps.step1Desc,
    },
    {
      icon: <ClipboardIcon className="text-primary" size={24} />,
      step: '2',
      title: dict.steps.step2Title,
      desc: dict.steps.step2Desc,
    },
    {
      icon: <DownloadSimpleIcon className="text-primary" size={24} />,
      step: '3',
      title: dict.steps.step3Title,
      desc: dict.steps.step3Desc,
    },
  ];

  const features = [
    {
      icon: <SparkleIcon className="text-amber-500" size={22} />,
      title: dict.features.hdTitle,
      desc: dict.features.hdDesc,
    },
    {
      icon: <LightningIcon className="text-blue-500" size={22} />,
      title: dict.features.fastTitle,
      desc: dict.features.fastDesc,
    },
    {
      icon: <ShieldIcon className="text-emerald-500" size={22} />,
      title: dict.features.noWatermarkTitle,
      desc: dict.features.noWatermarkDesc,
    },
    {
      icon: <DeviceMobileIcon className="text-violet-500" size={22} />,
      title: dict.features.allDevicesTitle,
      desc: dict.features.allDevicesDesc,
    },
    {
      icon: <UserMinusIcon className="text-rose-500" size={22} />,
      title: dict.features.noSignupTitle,
      desc: dict.features.noSignupDesc,
    },
    {
      icon: <LockIcon className="text-teal-500" size={22} />,
      title: dict.features.safeTitle,
      desc: dict.features.safeDesc,
    },
  ];

  const stats = [
    { label: dict.stats.downloads, value: dict.stats.downloadsValue },
    { label: dict.stats.quality, value: dict.stats.qualityValue },
    { label: dict.stats.price, value: dict.stats.priceValue },
    {
      label: dict.stats.rating,
      value: dict.stats.ratingValue,
      icon: <RobotIcon size={14} weight="fill" className="text-blue-500" />,
    },
  ];

  return (
    <main>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center sm:pt-24">
        <h1 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {dict.hero.title}
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground leading-relaxed">
          {dict.hero.subtitle}
        </p>

        {/* Download Form */}
        <DownloadForm
          lang={lang}
          dict={{
            ...dict.form,
            tryExtension: dict.download.tryExtension,
            errors: { ...dict.errors, ...dict.download.errors },
          }}
          supportedLinks={dict.hero.supportedLinks}
          platform="youtube"
        />
      </section>

      {/* Stats / Trust Bar */}
      <section className="border-y border-border/20 bg-muted/20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 py-6 sm:grid-cols-4 sm:gap-6 sm:py-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 whitespace-nowrap text-lg font-bold sm:text-2xl">
                {stat.icon}
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">{dict.steps.title}</h2>
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                {item.icon}
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad: after how-to */}
      <div className="mx-auto flex max-w-5xl justify-center px-6 pb-8">
        <LazyAdSlot slot="home-after-howto" format="leaderboard" />
      </div>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 pb-14">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
          {dict.features.title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/30 bg-card/30 p-6 transition-all hover:bg-card/50 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-background shadow-sm">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-base font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Agent Ready */}
      <AiAgentSection dict={dict.aiAgent} />

      {/* Premium CTA */}
      <div className="mx-auto max-w-5xl px-6">
        <PremiumCta
          lang={lang}
          title={dict.premium.title}
          subtitle={dict.premium.subtitle}
          cta={dict.premium.cta}
        />
      </div>

      {/* Ad: before FAQ */}
      <div className="mx-auto flex max-w-5xl justify-center px-6 pb-8">
        <LazyAdSlot slot="home-before-faq" format="leaderboard" />
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-5xl px-6">
        <FaqSection title={dict.faq.title} items={faqItems} />
      </div>
    </main>
  );
}
