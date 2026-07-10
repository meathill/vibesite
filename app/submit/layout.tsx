import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '提交网站',
  description: '上传你的 AI 生成网站文件，10 分钟内获得可访问链接。支持 zip 格式，最大 50MB。',
  alternates: { canonical: 'https://vibe.meathill.com/submit' },
  openGraph: {
    title: '提交网站 | VibeSite',
    description: '上传你的 AI 生成网站文件，10 分钟内获得可访问链接。',
  },
};

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
