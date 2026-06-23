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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xvideodownloader.org';

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
        en: 'x video downloader,download x video,twitter video downloader,download twitter video,x to mp4',
        zh: 'X视频下载,X视频下载器,推特视频下载,Twitter视频下载器,下载推特视频',
        de: 'x video downloader,x video herunterladen,twitter video downloader,twitter video herunterladen,x zu mp4',
        fr: 'x video downloader,télécharger vidéo x,twitter video downloader,télécharger vidéo twitter,x en mp4',
        es: 'x video downloader,descargar video x,twitter video downloader,descargar video twitter,x a mp4',
        pt: 'x video downloader,baixar vídeo x,twitter video downloader,baixar vídeo twitter,x para mp4',
        th: 'x video downloader,ดาวน์โหลดวิดีโอ x,twitter video downloader,ดาวน์โหลดวิดีโอ twitter,x เป็น mp4',
      }[lang] ||
      'x video downloader,download x video,twitter video downloader,download twitter video,x to mp4',
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
          siteName="X Video Downloader"
          siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://xvideodownloader.org'}
          logoAlt="XD Logo"
        />
        {children}
        <Footer
          lang={lang}
          dict={dict.footer}
          navDict={dict.nav}
          siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://xvideodownloader.org'}
        />
        <GoogleOneTap />
        <FeedbackButton dict={dict.feedback} />
      </div>
      <GoogleAnalytics gaId="G-N6EFZE0KNS" />
    </>
  );
}
