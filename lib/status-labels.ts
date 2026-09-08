import { INTENT_OPTIONS, type SubmissionStatus } from '@/types';

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  pending: '待处理',
  processing: '部署中',
  deployed: '已上线',
  failed: '部署失败',
  expired: '已过期',
};

export const STATUS_COLORS: Record<SubmissionStatus, string> = {
  pending: 'bg-warning text-warning-foreground',
  processing: 'bg-info text-info-foreground',
  deployed: 'bg-success text-success-foreground',
  failed: 'bg-destructive text-destructive-foreground',
  expired: 'bg-muted text-muted-foreground',
};

export const STATUS_PROGRESS: Record<SubmissionStatus, number> = {
  pending: 10,
  processing: 50,
  deployed: 100,
  failed: 100,
  expired: 100,
};

export const STATUS_CONFIG: Record<
  SubmissionStatus,
  { label: string; color: string; progress: number }
> = {
  pending: { label: STATUS_LABELS.pending, color: STATUS_COLORS.pending, progress: 10 },
  processing: { label: STATUS_LABELS.processing, color: STATUS_COLORS.processing, progress: 50 },
  deployed: { label: STATUS_LABELS.deployed, color: STATUS_COLORS.deployed, progress: 100 },
  failed: { label: STATUS_LABELS.failed, color: STATUS_COLORS.failed, progress: 100 },
  expired: { label: STATUS_LABELS.expired, color: STATUS_COLORS.expired, progress: 100 },
};

export const INTENT_LABELS: Record<string, string> = Object.fromEntries(
  INTENT_OPTIONS.map((option) => [option.value, option.label]),
);

export const TELEGRAM_STATUS_LABELS: Record<string, string> = {
  pending: '⏳ 待处理',
  processing: '🔧 部署中',
  deployed: '✅ 已上线',
  failed: '❌ 部署失败',
  expired: '⏰ 已过期',
};
