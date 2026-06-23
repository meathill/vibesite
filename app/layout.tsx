import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const interHeading = Inter({
  variable: '--font-heading',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'VibeSite · AI 生成网页一键上线',
    template: '%s | VibeSite',
  },
  description:
    '你用 AI 生成了一个网页，却不知道怎么上线？把文件交给我们，10 分钟内获得一个真实可访问的链接。',
  openGraph: {
    title: 'VibeSite · AI 生成网页一键上线',
    description:
      '你用 AI 生成了一个网页，却不知道怎么上线？把文件交给我们，10 分钟内获得一个真实可访问的链接。',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.variable} ${interHeading.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
