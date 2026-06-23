import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, isValidLang, getDictionary, DEFAULT_LANG, langPrefix, type Lang } from '@/lib/i18n';

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}
import { GoogleAnalytics } from '@next/third-parties/google';
import { Navbar } from 'x-downloader-web-shared/components/navbar';
import { Footer } from 'x-downloader-web-shared/components/footer';
import { GoogleOneTap } from 'x-downloader-web-shared/components/google-one-tap';
import { FeedbackButton } from 'x-downloader-web-shared/components/feedback-button';

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Lang = isValidLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = await getDictionary(lang);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://youtubedownloader.win';

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
        en: 'youtube video downloader,download youtube video,youtube to mp4,save youtube video,youtube downloader online',
        zh: 'YouTube视频下载,YouTube视频下载器,YouTube转MP4,下载YouTube视频,在线YouTube下载',
        de: 'youtube video downloader,youtube video herunterladen,youtube zu mp4,youtube downloader online,youtube videos speichern',
        fr: 'youtube video downloader,télécharger vidéo youtube,youtube en mp4,youtube downloader en ligne,sauvegarder vidéo youtube',
        es: 'youtube video downloader,descargar video youtube,youtube a mp4,youtube downloader online,guardar video youtube',
        pt: 'youtube video downloader,baixar vídeo youtube,youtube para mp4,youtube downloader online,salvar vídeo youtube',
        th: 'youtube video downloader,ดาวน์โหลดวิดีโอ youtube,youtube เป็น mp4,youtube downloader ออนไลน์,บันทึกวิดีโอ youtube',
      }[lang] ||
      'youtube video downloader,download youtube video,youtube to mp4,save youtube video,youtube downloader online',
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
          siteName="YouTube Video Downloader"
          siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://youtubedownloader.win'}
          logoAlt="YD Logo"
        />
        {children}
        <Footer
          lang={lang}
          dict={dict.footer}
          navDict={dict.nav}
          siteUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://youtubedownloader.win'}
        />
        <GoogleOneTap />
        <FeedbackButton dict={dict.feedback} />
      </div>
      <GoogleAnalytics gaId="G-9NG12V2G3C" />
    </>
  );
}
