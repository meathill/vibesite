import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '链接已过期',
  description: '该预览链接已超过有效期。选择付费方案获得长期稳定的托管服务。',
  alternates: { canonical: 'https://vibe.meathill.com/expired' },
};

export default function ExpiredLayout({ children }: { children: React.ReactNode }) {
  return children;
}
