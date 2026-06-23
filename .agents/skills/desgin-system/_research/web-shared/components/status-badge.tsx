import { cn } from '../lib/utils';
import { Badge } from './ui/badge';

const VARIANT_MAP: Record<
  string,
  { variant: 'warning' | 'info' | 'success' | 'destructive' | 'outline'; extra?: string }
> = {
  queued: { variant: 'warning' },
  running: { variant: 'info', extra: 'animate-pulse' },
  done: { variant: 'success' },
  failed: { variant: 'destructive' },
};

type StatusLabels = Record<string, string>;

export function StatusBadge({
  value,
  stage,
  labels,
  className,
}: {
  value: string;
  stage?: string | null;
  labels: StatusLabels;
  className?: string;
}) {
  const config = VARIANT_MAP[value];
  if (!config) {
    return (
      <Badge variant="outline" className={cn('rounded-full px-2.5 py-0.5', className)}>
        {value}
      </Badge>
    );
  }

  const label =
    value === 'running' && stage && labels[stage] ? labels[stage] : labels[value] || value;

  return (
    <Badge
      variant={config.variant}
      className={cn('rounded-full px-2.5 py-0.5', config.extra, className)}
    >
      {label}
    </Badge>
  );
}
