'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { TaskTable } from './task-table';
import { DashboardDownloadForm } from './dashboard-download-form';
import { UpgradeDialog } from './upgrade-dialog';
import { useSession } from '../lib/auth-client';
import { usePlan } from '../lib/use-plan';
import { CrownIcon, SpinnerGapIcon, GearIcon } from '@phosphor-icons/react';
import { langPrefix, type Lang } from '../lib/i18n';
import { isUpgradeRequired } from '../lib/upgrade-codes';
import type { DownloadTask, DownloadResponse } from '../types/download';

type DashboardDict = {
  title: string;
  subtitle: string;
  empty: string;
  plan: string;
  free: string;
  pro: string;
  refresh: string;
  delete: string;
  deleting: string;
  confirmDelete: string;
  getFile: string;
  loginRequired: string;
  upgrade: string;
  manage: string;
  canceling: string;
  signIn: string;
  retry: string;
  retrying: string;
  remainingToday: string;
  unlimited: string;
  quotaExhausted: string;
  upgradeDesc: string;
  upgradeNow: string;
};

type FormDict = {
  urlPlaceholder: string;
  paste: string;
  download: string;
  downloading: string;
};

type PricingDict = {
  proPrice: string;
  proPeriod: string;
  proYearlyPrice: string;
  proYearlyPeriod: string;
  proYearlySave: string;
};

type UsageData = {
  used: number;
  limit: number;
  remaining: number;
};

type TableLabels = {
  id: string;
  sourceUrl: string;
  status: string;
  createdAt: string;
  actions: string;
};

type DashboardViewProps = {
  lang: Lang;
  dict: DashboardDict;
  formDict: FormDict;
  errorDict: Record<string, string>;
  pricingDict: PricingDict;
  tableLabels: TableLabels;
  statusLabels: Record<string, string>;
};

export function DashboardView({
  lang,
  dict,
  formDict,
  errorDict,
  pricingDict,
  tableLabels,
  statusLabels,
}: DashboardViewProps) {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();
  const { isPro, subscription } = usePlan();

  const [tasks, setTasks] = useState<DownloadTask[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [isRetryingId, setIsRetryingId] = useState<number | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  async function fetchData(): Promise<void> {
    setIsLoadingTasks(true);
    try {
      const [tasksResult, usageResult] = await Promise.allSettled([
        fetch('/api/downloads?limit=50').then((r) => r.json() as Promise<{ ok: boolean; items?: DownloadTask[] }>),
        fetch('/api/user/usage').then(
          (r) => r.json() as Promise<{ ok: boolean; used: number; limit: number; remaining: number }>,
        ),
      ]);

      if (tasksResult.status === 'fulfilled' && tasksResult.value.ok && Array.isArray(tasksResult.value.items)) {
        setTasks(tasksResult.value.items);
      }
      if (usageResult.status === 'fulfilled' && usageResult.value.ok) {
        const { used, limit, remaining } = usageResult.value;
        setUsage({ used, limit, remaining });
      }
    } finally {
      setIsLoadingTasks(false);
    }
  }

  async function handleDelete(taskId: number): Promise<void> {
    if (!confirm(dict.confirmDelete)) return;

    setIsDeletingId(taskId);
    try {
      await fetch(`/api/downloads/${taskId}`, { method: 'DELETE' });
    } finally {
      setIsDeletingId(null);
      await fetchData();
    }
  }

  async function handleRetry(task: DownloadTask): Promise<void> {
    setIsRetryingId(task.id);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: task.video_url }),
      });
      const data = (await response.json()) as DownloadResponse;

      if (isUpgradeRequired(data.code)) {
        setShowUpgrade(true);
        return;
      }

      if (data.ok && data.download?.id) {
        router.push(`${langPrefix(lang)}/downloads/${data.download.id}`);
      } else {
        await fetchData();
      }
    } finally {
      setIsRetryingId(null);
    }
  }

  useEffect(() => {
    if (!isSessionPending && !session) {
      router.push(`${langPrefix(lang)}/login`);
      return;
    }
    if (session) {
      void fetchData();
    }
  }, [session, isSessionPending]);

  if (isSessionPending) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex justify-center">
          <SpinnerGapIcon className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Card className="mx-auto max-w-md border-border/40 bg-card/50 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <p className="mb-6 text-muted-foreground">{dict.loginRequired}</p>
            <Button render={<Link href={`${langPrefix(lang)}/login`} />}>{dict.signIn}</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
      {/* Plan Info */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CrownIcon className={isPro ? 'text-amber-500' : 'text-primary'} size={24} />
          <div>
            <p className="text-sm text-muted-foreground">{dict.plan}</p>
            <div className="flex items-center gap-2">
              <Badge variant={isPro ? 'default' : 'secondary'}>{isPro ? dict.pro : dict.free}</Badge>
              {isPro && subscription?.cancelAtPeriodEnd && (
                <span className="text-xs text-muted-foreground">{dict.canceling}</span>
              )}
            </div>
            {usage && (
              <p className="mt-1 text-xs text-muted-foreground">
                {usage.limit === -1 ? dict.unlimited : `${usage.remaining}/${usage.limit} ${dict.remainingToday}`}
              </p>
            )}
          </div>
        </div>
        {isPro ? (
          <Button variant="outline" onClick={handleManageSubscription}>
            <GearIcon size={14} className="mr-2" />
            {dict.manage}
          </Button>
        ) : (
          <Button variant="outline" render={<Link href={`${langPrefix(lang)}/pricing`} />}>
            {dict.upgrade}
          </Button>
        )}
      </div>

      {/* Download Form */}
      <DashboardDownloadForm
        dict={{ ...formDict, errors: errorDict }}
        onSuccess={() => void fetchData()}
        onUpgradeRequired={() => setShowUpgrade(true)}
      />

      {/* Download History */}
      <TaskTable
        lang={lang}
        isPro={isPro}
        tasks={tasks}
        isLoading={isLoadingTasks}
        isDeletingId={isDeletingId}
        isRetryingId={isRetryingId}
        onRefresh={() => void fetchData()}
        onDelete={(id) => void handleDelete(id)}
        onRetry={(task) => void handleRetry(task)}
        labels={{
          title: dict.title,
          subtitle: dict.subtitle,
          refresh: dict.refresh,
          empty: dict.empty,
          getFile: dict.getFile,
          delete: dict.delete,
          deleting: dict.deleting,
          retry: dict.retry,
          retrying: dict.retrying,
        }}
        tableLabels={tableLabels}
        statusLabels={statusLabels}
      />

      {/* Upgrade Dialog */}
      <UpgradeDialog
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        dict={{
          quotaExhausted: dict.quotaExhausted,
          upgradeDesc: dict.upgradeDesc,
          upgradeNow: dict.upgradeNow,
          monthly: pricingDict.proPeriod,
          yearly: pricingDict.proYearlyPeriod,
          yearlySave: pricingDict.proYearlySave,
          proPrice: pricingDict.proPrice,
          proPeriod: pricingDict.proPeriod,
          proYearlyPrice: pricingDict.proYearlyPrice,
          proYearlyPeriod: pricingDict.proYearlyPeriod,
        }}
      />
    </main>
  );
}

async function handleManageSubscription(): Promise<void> {
  try {
    const response = await fetch('/api/stripe/portal', { method: 'POST' });
    const data = (await response.json()) as { ok: boolean; url?: string; message?: string };
    if (data.ok && data.url) {
      window.location.href = data.url;
    }
  } catch {
    // Portal request failed
  }
}
