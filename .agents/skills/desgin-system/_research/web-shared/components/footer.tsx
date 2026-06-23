import { InstagramLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { SITES } from 'x-downloader-shared/sites';
import { type Lang, langPrefix } from '../lib/i18n';

type FooterDict = {
  tagline: string;
  terms: string;
  privacy: string;
  contact: string;
  copyright: string;
};

type Props = {
  lang: Lang;
  dict: FooterDict;
  navDict: { pricing: string };
  siteUrl: string;
};

const SITE_ICONS: Record<string, { icon: typeof XLogo; color: string }> = {
  'https://xvideodownloader.org': { icon: XLogo, color: '#14171A' },
  'https://youtubedownloader.win': { icon: YoutubeLogo, color: '#FF0000' },
  'https://instagramvideodownload.net': { icon: InstagramLogo, color: '#E1306C' },
};

export function Footer({ lang, dict, navDict, siteUrl }: Props) {
  const otherSites = SITES.filter((s) => s.url !== siteUrl);

  return (
    <footer className="mx-auto max-w-5xl border-t border-border/20 px-6 py-12">
      {/* Cross-site links */}
      {otherSites.length > 0 && (
        <div className="mb-8 text-center">
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground/80">
            All Useful Downloaders You Need
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {otherSites.map((site) => {
              const siteIcon = SITE_ICONS[site.url];
              const IconComponent = siteIcon?.icon;
              return (
                <a
                  key={site.url}
                  href={site.url}
                  className="flex items-center gap-2 rounded-lg border border-border/30 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {IconComponent && (
                    <IconComponent size={18} weight="fill" style={{ color: siteIcon.color }} />
                  )}
                  {site.name}
                </a>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground/60">
        <p>{dict.tagline}</p>
        <div className="flex items-center gap-4">
          <Link
            href={`${langPrefix(lang)}/pricing`}
            className="hover:text-foreground transition-colors"
          >
            {navDict.pricing}
          </Link>
          <span>&middot;</span>
          <Link
            href={`${langPrefix(lang)}/terms`}
            className="hover:text-foreground transition-colors"
          >
            {dict.terms}
          </Link>
          <span>&middot;</span>
          <Link
            href={`${langPrefix(lang)}/privacy`}
            className="hover:text-foreground transition-colors"
          >
            {dict.privacy}
          </Link>
          <span>&middot;</span>
          <Link
            href={`${langPrefix(lang)}/contact`}
            className="hover:text-foreground transition-colors"
          >
            {dict.contact}
          </Link>
        </div>
        <p className="text-xs">
          {dict.copyright} Meathill LLC v{process.env.NEXT_PUBLIC_APP_VERSION}
        </p>
      </div>
    </footer>
  );
}
