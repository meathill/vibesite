'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';

// 动态导入客户端 layout，避免预渲染问题
const AdminLayoutClient = dynamic(() => import('./admin-layout-client'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-8" />
    </div>
  ),
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
