'use client';

import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';

// 动态导入客户端组件，避免预渲染问题
const AdminPageContent = dynamic(() => import('./admin-page'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-8" />
    </div>
  ),
});

export default function AdminPage() {
  return <AdminPageContent />;
}
