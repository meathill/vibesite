import { isValidLang, getDictionary, DEFAULT_LANG, langPrefix, type Lang } from '@/lib/i18n';
import { PLAN_LIMITS } from '@/lib/plan';
import { PricingCards } from 'x-downloader-web-shared/components/pricing-cards';
import { SITES } from 'x-downloader-shared/sites';

const MB = 1024 * 1024;
const GB = 1024 * MB;

function formatBytes(bytes: number): string {
  if (bytes >= GB) return `${(bytes / GB).toFixed(0)}GB`;
  return `${Math.round(bytes / MB)}MB`;
}

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ interval?: string }>;
};

export default async function PricingPage({ params, searchParams }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = await getDictionary(lang);
  const t = dict.pricing;
  const f = t.features;

  const { interval: rawInterval } = await searchParams;
  const interval = rawInterval === 'yearly' ? 'yearly' : 'monthly';

  const free = PLAN_LIMITS.free;
  const pro = PLAN_LIMITS.pro;

  // 注：storage quota / 文件保留期目前都未实现（maxStorageBytes 在代码里没有
  // 任何消费方做强制检查；expires_at 列也无人写入），因此不在 features 里画饼。
  // 后续若真正实现 retention，再加 "File retention" 行回来。
  const features = [
    { name: f.downloads, free: String(free.dailyDownloads), pro: String(pro.dailyDownloads) },
    { name: f.quality, free: f.qualityFree, pro: f.qualityPro },
    { name: f.fileSize, free: formatBytes(free.maxFileSizeBytes), pro: formatBytes(pro.maxFileSizeBytes) },
    { name: f.customFilename, free: free.allowCustomFilename, pro: pro.allowCustomFilename },
    { name: f.batchDownload, free: false, pro: true },
    { name: f.adFree, free: false, pro: true },
    { name: f.onlinePlayback, free: false, pro: true },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{t.title}</h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">{t.subtitle}</p>
        <p className="mt-3 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
          <span>One subscription works across all our tools:</span>
          {SITES.map((site, i) => (
            <span key={site.url}>
              <a href={site.url} className="font-medium underline underline-offset-2 hover:text-primary/80">
                {site.shortName}
              </a>
              {i < SITES.length - 1 && ','}
            </span>
          ))}
        </p>
      </div>

      <PricingCards
        initialInterval={interval}
        features={features}
        loginHref={`${langPrefix(lang)}/login`}
        texts={{
          free: t.free,
          freePrice: t.freePrice,
          freePeriod: t.freePeriod,
          pro: t.pro,
          proPrice: t.proPrice,
          proPeriod: t.proPeriod,
          proYearlyPrice: t.proYearlyPrice,
          proYearlyPeriod: t.proYearlyPeriod,
          proYearlySave: t.proYearlySave,
          getStarted: t.getStarted,
          upgrade: t.upgrade,
          yes: f.yes,
          no: f.no,
        }}
        loginDict={dict.login}
      />
    </main>
  );
}
