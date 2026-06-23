'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  ClockCounterClockwiseIcon,
  TerminalIcon,
  LightningIcon,
  ArrowCounterClockwiseIcon,
} from '@phosphor-icons/react';
import { StatusBadge } from './status-badge';
import { langPrefix, type Lang } from '../lib/i18n';
import { getDownloadHref } from '../lib/download-helpers';
import type { DownloadTask } from '../types/download';

type TaskTableProps = {
  lang: string;
  isPro: boolean;
  tasks: DownloadTask[];
  isLoading: boolean;
  isDeletingId: number | null;
  isRetryingId: number | null;
  onRefresh: () => void;
  onDelete: (id: number) => void;
  onRetry: (task: DownloadTask) => void;
  labels: {
    title: string;
    subtitle: string;
    refresh: string;
    empty: string;
    getFile: string;
    delete: string;
    deleting: string;
    retry: string;
    retrying: string;
  };
  tableLabels: {
    id: string;
    sourceUrl: string;
    status: string;
    createdAt: string;
    actions: string;
  };
  statusLabels: Record<string, string>;
};

function formatTimestamp(value: number | null, lang: string): string {
  if (!value) return '-';
  return new Date(value).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TaskTable({
  lang,
  isPro,
  tasks,
  isLoading,
  isDeletingId,
  isRetryingId,
  onRefresh,
  onDelete,
  onRetry,
  labels,
  tableLabels,
  statusLabels,
}: TaskTableProps) {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-50 bg-[radial-gradient(circle_at_100%_100%,oklch(0.5_0.2_300)_0%,transparent_40%)] opacity-10" />

      <div className="mb-8 flex items-end justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <ClockCounterClockwiseIcon className="text-muted-foreground" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{labels.title}</h2>
            <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
          </div>
        </div>
        <Button variant="outline" onClick={onRefresh} disabled={isLoading} className="gap-2">
          <LightningIcon size={14} className={isLoading ? 'animate-spin' : ''} />
          {labels.refresh}
        </Button>
      </div>

      <Card className="overflow-hidden border-border/40 bg-card/30 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-border/20">
              <TableHead className="w-[80px]">{tableLabels.id}</TableHead>
              <TableHead>{tableLabels.sourceUrl}</TableHead>
              <TableHead>{tableLabels.status}</TableHead>
              <TableHead>{tableLabels.createdAt}</TableHead>
              <TableHead className="text-right">{tableLabels.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                    <TerminalIcon size={48} />
                    <span className="text-sm">{labels.empty}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} className="group border-border/10 hover:bg-muted/20 transition-colors">
                  <TableCell className="font-mono text-xs opacity-50 underline decoration-primary/20 decoration-2 underline-offset-4">
                    #{task.id}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    <Link
                      href={`${langPrefix(lang as Lang)}/downloads/${task.id}`}
                      className="text-sm hover:text-primary hover:underline transition-all"
                    >
                      {task.video_url}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusBadge value={task.video_status} stage={task.video_stage} labels={statusLabels} />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatTimestamp(task.created_at, lang)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {task.video_status === 'done' && (
                        <Button
                          variant="secondary"
                          size="xs"
                          render={
                            isPro ? (
                              <a href={getDownloadHref(true, task.id, lang as Lang)} />
                            ) : (
                              <Link href={getDownloadHref(false, task.id, lang as Lang)} />
                            )
                          }
                        >
                          {labels.getFile}
                        </Button>
                      )}
                      {task.video_status === 'failed' && (
                        <Button
                          variant="secondary"
                          size="xs"
                          disabled={isRetryingId === task.id}
                          onClick={() => onRetry(task)}
                        >
                          <ArrowCounterClockwiseIcon size={14} className="mr-1" />
                          {isRetryingId === task.id ? labels.retrying : labels.retry}
                        </Button>
                      )}
                      <Button
                        variant="destructive-outline"
                        size="xs"
                        disabled={isDeletingId === task.id || task.video_status === 'running'}
                        onClick={() => onDelete(task.id)}
                      >
                        {isDeletingId === task.id ? labels.deleting : labels.delete}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
