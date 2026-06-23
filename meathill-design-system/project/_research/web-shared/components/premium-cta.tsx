import Link from 'next/link';
import { SparkleIcon } from '@phosphor-icons/react/ssr';
import { langPrefix, type Lang } from '../lib/i18n';

type PremiumCtaProps = {
  lang: Lang;
  title: string;
  subtitle: string;
  cta: string;
};

export function PremiumCta({ lang, title, subtitle, cta }: PremiumCtaProps) {
  return (
    <section className="mb-14">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-12 text-center ring-1 ring-primary/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <SparkleIcon className="mx-auto mb-4 text-primary" size={32} />
        <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">{subtitle}</p>
        <Link
          href={`${langPrefix(lang)}/pricing`}
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
