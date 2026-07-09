'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkAdmin = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/check');
      if (response.ok) {
        setIsAdmin(true);
      } else {
        // 不是 admin，重定向到首页
        router.push('/');
      }
    } catch {
      router.push('/');
    } finally {
      setIsChecking(false);
    }
  }, [router]);

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      // 未登录，重定向到登录页面
      router.push('/login?callbackUrl=/admin');
      return;
    }

    // 检查是否是 admin
    checkAdmin();
  }, [session, isPending, router, checkAdmin]);

  const handleLogout = useCallback(async () => {
    await authClient.signOut();
    router.push('/');
  }, [router]);

  if (isPending || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-lg font-semibold">VibeSite 管理后台</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session?.user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              退出
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
