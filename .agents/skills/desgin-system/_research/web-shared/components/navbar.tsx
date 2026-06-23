import type { Icon } from '@phosphor-icons/react';
import {
  CaretDownIcon,
  GlobeIcon,
  InstagramLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { SITES } from 'x-downloader-shared/sites';
import { type Lang, SUPPORTED_LANGS, langPrefix } from '../lib/i18n';
import { NavbarUserStatus } from './navbar-user-status';

const SITE_ICONS: Record<string, { icon: Icon; color: string }> = {
  'https://xvideodownloader.org': { icon: XLogoIcon, color: '#14171A' },
  'https://youtubedownloader.win': { icon: YoutubeLogoIcon, color: '#FF0000' },
  'https://instagramvideodownload.net': { icon: InstagramLogoIcon, color: '#E1306C' },
};

const langLabels: Record<Lang, string> = {
  en: 'English',
  zh: '中文',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  th: 'ไทย',
};

const langShortLabels: Record<Lang, string> = {
  en: 'EN',
  zh: '中文',
  de: 'DE',
  fr: 'FR',
  es: 'ES',
  pt: 'PT',
  th: 'ไทย',
};

type NavDict = {
  useCases: string;
  pricing: string;
  dashboard: string;
  signIn: string;
  signUp: string;
  signOut: string;
  extension: string;
};

type NavbarProps = {
  lang: Lang;
  dict: NavDict;
  siteName: string;
  siteUrl: string;
  logoAlt?: string;
};

export function Navbar({ lang, dict, siteName, siteUrl, logoAlt = 'Logo' }: NavbarProps) {
  const otherSites = SITES.filter((s) => s.url !== siteUrl);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href={langPrefix(lang) || '/'} className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt={logoAlt}
              width={36}
              height={36}
              className="rounded-xl shadow-lg"
            />
            <span className="text-lg font-bold tracking-tight">{siteName}</span>
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            <Link
              href={`${langPrefix(lang)}/use-cases`}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {dict.useCases}
            </Link>
            <Link
              href={`${langPrefix(lang)}/pricing`}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {dict.pricing}
            </Link>
            <Link
              href={`${langPrefix(lang)}/extension`}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {dict.extension}
            </Link>
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                Social Video Downloader
                <CaretDownIcon size={12} className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-1 min-w-48 rounded-xl border border-border/40 bg-background p-1 shadow-lg">
                {SITES.map((site) => {
                  const siteIcon = SITE_ICONS[site.url];
                  const IconComponent = siteIcon?.icon;
                  const isCurrent = site.url === siteUrl;
                  return isCurrent ? (
                    <span
                      key={site.url}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-primary bg-primary/10"
                    >
                      {IconComponent && (
                        <IconComponent size={16} weight="fill" style={{ color: siteIcon.color }} />
                      )}
                      {site.shortName}
                    </span>
                  ) : (
                    <a
                      key={site.url}
                      href={site.url}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {IconComponent && (
                        <IconComponent size={16} weight="fill" style={{ color: siteIcon.color }} />
                      )}
                      {site.shortName}
                    </a>
                  );
                })}
              </div>
            </details>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language dropdown */}
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-border/40 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
              <GlobeIcon size={14} />
              {langShortLabels[lang]}
            </summary>
            <div className="absolute right-0 top-full z-50 mt-1 min-w-32 rounded-xl border border-border/40 bg-background p-1 shadow-lg">
              {SUPPORTED_LANGS.map((l) => (
                <Link
                  key={l}
                  href={langPrefix(l) || '/'}
                  className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    lang === l
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {langLabels[l]}
                </Link>
              ))}
            </div>
          </details>

          <NavbarUserStatus lang={lang} dict={dict} />
        </div>
      </div>
    </nav>
  );
}
