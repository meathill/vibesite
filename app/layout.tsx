import type { Metadata } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans, Sora } from 'next/font/google';
import Script from 'next/script';
import { OrganizationJsonLd, SoftwareAppJsonLd, WebsiteJsonLd } from '@/components/seo/json-ld';
import './globals.css';

const sora = Sora({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const SITE_URL = 'https://vibesite.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'VibeSite - AI 生成网页一键上线 | 免费部署托管',
    template: '%s | VibeSite',
  },
  description:
    '用 AI 生成了网页不知道怎么部署？上传 zip 文件，10 分钟获得可访问链接。支持 Cursor、Bolt、Lovable、v0 生成的项目。免费预览，无需注册。',
  keywords: [
    'AI网站部署',
    'AI网页上线',
    '网站托管',
    '静态网站部署',
    'Cursor部署',
    'Bolt部署',
    'v0部署',
    'Lovable部署',
    'AI生成网页',
    '免费网站托管',
    '一键部署',
    '网页上线',
  ],
  openGraph: {
    title: 'VibeSite - AI 生成网页一键上线',
    description: '上传 zip，10 分钟拿到可访问链接。免费预览，无需注册。',
    url: SITE_URL,
    siteName: 'VibeSite',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VibeSite - AI 生成网页一键上线',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeSite - AI 生成网页一键上线',
    description: '上传 zip，10 分钟拿到可访问链接。免费预览，无需注册。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

// GA Measurement ID — 部署时通过环境变量注入
// 本地开发时留空则不加载 GA
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <WebsiteJsonLd />
        <SoftwareAppJsonLd />
        <OrganizationJsonLd />
      </head>
      <body
        className={`${sora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
