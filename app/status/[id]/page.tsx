'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import type { SubmissionStatus } from '@/types';
import {
  CheckCircleIcon,
  ClockIcon,
  WarningCircleIcon,
  XCircleIcon,
} from '@phosphor-icons/react/dist/ssr';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface SubmissionStatusData {
  id: string;
  project_name: string;
  status: SubmissionStatus;
  temporary_url: string | null;
  permanent_url: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG: Record<SubmissionStatus, { label: string; color: string; progress: number }> =
  {
    pending: { label: '待处理', color: 'bg-warning text-warning-foreground', progress: 10 },
    processing: { label: '部署中', color: 'bg-info text-info-foreground', progress: 50 },
    deployed: { label: '已上线', color: 'bg-success text-success-foreground', progress: 100 },
    failed: {
      label: '部署失败',
      color: 'bg-destructive text-destructive-foreground',
      progress: 100,
    },
    expired: { label: '已过期', color: 'bg-muted text-muted-foreground', progress: 100 },
  };

export default function StatusPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<SubmissionStatusData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/submissions?id=${id}`);
      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error ?? '查询失败');
      }
      const result = (await response.json()) as SubmissionStatusData;
      setData(result);
      setError(null);

      // 如果是终态，停止轮询
      if (['deployed', 'failed', 'expired'].includes(result.status)) {
        return true; // 表示停止
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : '查询失败');
      return false;
    }
  }, [id]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let stopped = false;

    const startPolling = async () => {
      setIsLoading(true);
      const shouldStop = await fetchStatus();
      setIsLoading(false);

      if (shouldStop || stopped) return;

      intervalId = setInterval(async () => {
        const shouldStop = await fetchStatus();
        if (shouldStop) {
          clearInterval(intervalId);
        }
      }, 5000);
    };

    startPolling();

    return () => {
      stopped = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchStatus]);

  if (isLoading && !data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </main>
    );
  }

  if (error && !data) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="flex flex-col items-center gap-4 pt-8">
            <XCircleIcon className="size-12 text-destructive" />
            <p className="text-muted-foreground">{error}</p>
            <Button variant="outline" render={<a href="/" />}>
              返回首页
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!data) return null;

  const config = STATUS_CONFIG[data.status];

  function StatusIcon({ className }: { className?: string }) {
    switch (data?.status) {
      case 'pending':
        return <ClockIcon className={className} />;
      case 'processing':
        return <Spinner className={className} />;
      case 'deployed':
        return <CheckCircleIcon className={className} />;
      case 'failed':
        return <XCircleIcon className={className} />;
      case 'expired':
        return <WarningCircleIcon className={className} />;
      default:
        return <ClockIcon className={className} />;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <StatusIcon
            className={`mx-auto size-12 ${
              data.status === 'deployed'
                ? 'text-success'
                : data.status === 'failed'
                  ? 'text-destructive'
                  : 'text-primary'
            }`}
          />
          <CardTitle className="text-2xl">部署进度</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">项目名称</p>
            <p className="font-medium">{data.project_name}</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">状态</span>
              <Badge className={config.color}>{config.label}</Badge>
            </div>
            <Progress value={config.progress} />
          </div>

          {data.temporary_url && (
            <div className="rounded-lg bg-success/10 p-4">
              <p className="mb-2 text-sm font-medium text-success">🎉 部署成功！</p>
              <a
                href={data.temporary_url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sm text-primary underline"
              >
                {data.temporary_url}
              </a>
            </div>
          )}

          {data.permanent_url && (
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-1 text-sm font-medium">永久链接</p>
              <a
                href={data.permanent_url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sm text-primary underline"
              >
                {data.permanent_url}
              </a>
            </div>
          )}

          {data.error_message && (
            <div className="rounded-lg bg-destructive/10 p-4">
              <p className="mb-1 text-sm font-medium text-destructive">错误信息</p>
              <p className="text-sm text-destructive/80">{data.error_message}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" render={<a href="/" />}>
              返回首页
            </Button>
            <Button className="flex-1" render={<a href="/submit" />}>
              重新提交
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
