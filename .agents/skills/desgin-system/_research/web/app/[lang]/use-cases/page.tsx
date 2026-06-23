import { DEFAULT_LANG, type Lang, SUPPORTED_LANGS, getDictionary, isValidLang } from '@/lib/i18n';
import {
  ArchiveBoxIcon,
  NewspaperIcon,
  RobotIcon,
  ShareNetworkIcon,
  TrendUpIcon,
} from '@phosphor-icons/react/ssr';

export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function UseCasesPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = await getDictionary(lang);
  const t = dict.useCases;

  const cases = [
    {
      icon: <TrendUpIcon className="text-rose-500" size={24} />,
      title: t.viralTitle,
      desc: t.viralDesc,
    },
    {
      icon: <ArchiveBoxIcon className="text-amber-500" size={24} />,
      title: t.archiveTitle,
      desc: t.archiveDesc,
    },
    {
      icon: <ShareNetworkIcon className="text-blue-500" size={24} />,
      title: t.repurposeTitle,
      desc: t.repurposeDesc,
    },
    {
      icon: <NewspaperIcon className="text-emerald-500" size={24} />,
      title: t.researchTitle,
      desc: t.researchDesc,
    },
    {
      icon: <RobotIcon className="text-violet-500" size={24} />,
      title: t.aiAgentTitle,
      desc: t.aiAgentDesc,
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">{t.title}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/30 bg-card/30 p-6 transition-all hover:bg-card/50 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm">
              {item.icon}
            </div>
            <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
