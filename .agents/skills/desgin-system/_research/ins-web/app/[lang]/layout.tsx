import {
  DEFAULT_LANG,
  type Lang,
  SUPPORTED_LANGS,
  getDictionary,
  isValidLang,
  langPrefix,
} from '@/lib/i18n';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}
import { GoogleAnalytics } from '@next/third-parties/google';
import { FeedbackButton } from 'x-downloader-web-shared/components/feedback-button';
import { Footer } from 'x-downloader-web-shared/components/footer';
import { GoogleOneTap } from 'x-downloader-web-shared/components/google-one-tap';
import { Navbar } from 'x-downloader-web-shared/components/navbar';

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = await getDictionary(lang);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://instagramvideodownload.net';

  return {
    title: dict.site.title,
    description: dict.site.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: langPrefix(lang) || '/',
      languages: {
        en: '/',
        zh: '/zh',
        de: '/de',
        fr: '/fr',
        es: '/es',
        pt: '/pt',
        th: '/th',
      },
    },
    openGraph: {
      title: dict.site.title,
      description: dict.site.description,
      url: `${baseUrl}${langPrefix(lang) || '/'}`,
      siteName: dict.site.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.site.title,
      description: dict.site.description,
    },
    keywords:
      {
        en: 'instagram downloader,download instagram video,instagram reels downloader,save instagram video,instagram video saver online',
        zh: 'Instagram视频下载,Instagram下载器,Instagram Reels下载,下载Instagram视频,在线Instagram下载',
        de: 'instagram downloader,instagram video herunterladen,instagram reels downloader,instagram video speichern,instagram downloader online',
        fr: 'instagram downloader,télécharger vidéo instagram,instagram reels downloader,sauvegarder vidéo instagram,instagram downloader en ligne',
        es: 'instagram downloader,descargar video instagram,instagram reels downloader,guardar video instagram,instagram downloader online',
        pt: 'instagram downloader,baixar vídeo instagram,instagram reels downloader,salvar vídeo instagram,instagram downloader online',
        th: 'instagram downloader,ดาวน์โหลดวิดีโอ instagram,instagram reels downloader,บันทึกวิดีโอ instagram,instagram downloader ออนไลน์',
      }[lang] ||
      'instagram downloader,download instagram video,instagram reels downloader,save instagram video,instagram video saver online',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = await getDictionary(lang);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "${lang}"`,
        }}
      />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.9_0.1_280)_0%,transparent_50%)] opacity-40" />
        <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <Navbar
          lang={lang}
          dict={dict.nav}
          siteName="Instagram Downloader"
          siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://instagramvideodownload.net'}
          logoAlt="ID Logo"
        />
        {children}
        <Footer
          lang={lang}
          dict={dict.footer}
          navDict={dict.nav}
          siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://instagramvideodownload.net'}
        />
        <GoogleOneTap />
        <FeedbackButton dict={dict.feedback} />
      </div>
      <GoogleAnalytics gaId="G-JMX0R5HL7N" />
    </>
  );
}
