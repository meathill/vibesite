'use client';

import type { FormEvent } from 'react';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Link from 'next/link';
import {
  DownloadSimpleIcon,
  ClipboardIcon,
  XIcon,
  SpinnerGapIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';
import { langPrefix, type Lang } from '../lib/i18n';
import type { DownloadResponse, DownloadStatus } from '../types/download';
import { isUpgradeRequired, isContactRequired, isExtensionSuggested } from '../lib/upgrade-codes';
import { ResolutionPicker } from './resolution-picker';
import type { PlatformType } from '../lib/resolution-config';

const DownloadProOptions = lazy(() =>
  import('./download-pro-options').then((m) => ({ default: m.DownloadProOptions })),
);
const VideoPreviewDialog = lazy(() =>
  import('./video-preview-dialog').then((m) => ({ default: m.VideoPreviewDialog })),
);

type FormDict = {
  urlPlaceholder: string;
  paste: string;
  download: string;
  downloading: string;
  upgradeToPro: string;
  contactUs: string;
  tryExtension?: string;
  stages: Record<string, string>;
  errors?: Record<string, string>;
};

// error_code → dict.errors key（与 download-detail.tsx 保持一致）
const ERROR_CODE_TO_DICT_KEY: Record<string, string> = {
  VIDEO_NOT_FOUND: 'videoNotFound',
  NETWORK_ERROR: 'networkError',
  PRIVATE_TWEET: 'privateTweet',
  GEO_BLOCKED: 'geoBlocked',
  FORMAT_NOT_AVAILABLE: 'formatUnavailable',
  UNSUPPORTED_URL: 'unsupportedUrl',
  COOKIE_DECRYPT_FAILED: 'cookieDecryptFailed',
  LOGIN_REQUIRED: 'loginRequired',
  EXTRACTOR_BROKEN: 'extractorBroken',
};

function resolveTaskError(dict: FormDict, errorCode: string | null | undefined): string {
  if (errorCode) {
    const key = ERROR_CODE_TO_DICT_KEY[errorCode];
    if (key && dict.errors?.[key]) return dict.errors[key];
    const direct = dict.errors?.[errorCode];
    if (direct) return direct;
  }
  return dict.errors?.default ?? 'Download failed.';
}

type DownloadFormProps = {
  lang: string;
  dict: FormDict;
  supportedLinks: string;
  platform: PlatformType;
};

export function DownloadForm({ lang, dict, supportedLinks, platform }: DownloadFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [message, setMessage] = useState('');
  const [errorCode, setErrorCode] = useState<string | undefined>();
  const [polling, setPolling] = useState(false);
  const [pollingStage, setPollingStage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewDownloadId, setPreviewDownloadId] = useState<number | null>(null);
  const [downloadResult, setDownloadResult] = useState<'polling' | 'done' | 'failed'>('polling');
  const [previewError, setPreviewError] = useState<string | null>(null);
  const showPreviewRef = useRef(false);
  const proOptionsRef = useRef<{ filename?: string; format?: string }>({});
  const resolutionRef = useRef<string>('');
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    setPolling(false);
  }, []);

  useEffect(() => {
    return stopPolling;
  }, [stopPolling]);

  // 从 URL 查询参数读取初始值（扩展 HD 按钮跳转）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    if (urlParam) {
      setUrl(urlParam);
    }
  }, []);

  async function handlePaste(): Promise<void> {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      // Clipboard API not available or denied
    }
  }

  function handleClear(): void {
    setUrl('');
    setMessage('');
    setStatus('idle');
  }

  function handlePreviewOpenChange(open: boolean): void {
    showPreviewRef.current = open;
    setShowPreview(open);
    if (!open && downloadResult === 'done' && previewDownloadId) {
      router.push(`${langPrefix(lang as Lang)}/downloads/${previewDownloadId}`);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    setErrorCode(undefined);

    const { filename, format: proFormat } = proOptionsRef.current;
    const format = proFormat || resolutionRef.current || undefined;

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          ...(filename ? { filename } : {}),
          ...(format ? { format } : {}),
        }),
      });

      const data = (await response.json()) as DownloadResponse;

      if (data.ok && data.download?.id) {
        const detailPath = `${langPrefix(lang as Lang)}/downloads/${data.download.id}`;

        if (data.cached) {
          router.push(detailPath);
          return;
        }

        setStatus('loading');
        setMessage('');
        setPolling(true);
        setPollingStage(data.video?.status === 'running' ? 'downloading' : null);

        // YouTube: 打开视频预览 dialog
        if (platform === 'youtube') {
          setDownloadResult('polling');
          setPreviewError(null);
          setPreviewDownloadId(data.download.id);
          setShowPreview(true);
          showPreviewRef.current = true;
        }

        pollingRef.current = setInterval(async () => {
          try {
            const res = await fetch(`/api/downloads/${data.download!.id}`);
            const poll = (await res.json()) as {
              ok: boolean;
              task?: { status: string; stage?: string | null; error_code?: string | null };
            };
            if (!poll.ok || !poll.task) return;

            setPollingStage(poll.task.stage ?? null);

            if (poll.task.status === 'done') {
              stopPolling();
              if (showPreviewRef.current) {
                // dialog 开着 → 在 dialog 中显示成功
                setDownloadResult('done');
              } else {
                // dialog 已关闭或非 YouTube → 自动跳转
                router.push(detailPath);
              }
            } else if (poll.task.status === 'failed') {
              stopPolling();
              setStatus('error');
              const failMessage = resolveTaskError(dict, poll.task.error_code);
              setMessage(failMessage);
              setErrorCode(poll.task.error_code ?? undefined);
              setPollingStage(null);
              if (showPreviewRef.current) {
                setDownloadResult('failed');
                setPreviewError(failMessage);
              }
            }
          } catch {
            // 轮询出错时静默处理，等待下次轮询
          }
        }, 3000);
      } else {
        setStatus(data.ok ? 'success' : 'error');
        const translatedMessage = data.code && dict.errors?.[data.code];
        setMessage(translatedMessage || data.message || '');
        setErrorCode(data.code);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Request failed');
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
        <div className="relative flex-1">
          <Input
            type="url"
            placeholder={dict.urlPlaceholder}
            className="h-10 items-center rounded-xl border-border/40 bg-background/60 pl-5 pr-20 text-base shadow-lg backdrop-blur-sm focus:ring-2 focus:ring-primary/30"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            {url ? (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg p-2 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Clear"
              >
                <XIcon size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                <ClipboardIcon size={14} />
                {dict.paste}
              </button>
            )}
          </div>
        </div>
        <Button
          type="submit"
          size="xl"
          className="h-14 min-w-[160px] rounded-xl bg-primary text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <SpinnerGapIcon size={18} className="animate-spin" />
              {dict.downloading}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <DownloadSimpleIcon size={18} />
              {dict.download}
            </span>
          )}
        </Button>
      </form>

      <ResolutionPicker
        platform={platform}
        onChange={(fmt) => {
          resolutionRef.current = fmt;
        }}
      />

      <Suspense>
        <DownloadProOptions
          onOptionsChange={(options) => {
            proOptionsRef.current = options;
          }}
        />
      </Suspense>

      <p className="mt-3 text-center text-xs text-muted-foreground/60">{supportedLinks}</p>

      {polling && !showPreview && (
        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          <div className="flex items-center gap-2">
            <SpinnerGapIcon size={16} className="shrink-0 animate-spin" />
            {(pollingStage && dict.stages[pollingStage]) || dict.stages.default}
          </div>
        </div>
      )}

      {!polling && message && (
        <div
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            status === 'error'
              ? 'border-destructive/20 bg-destructive/5 text-destructive'
              : 'border-primary/20 bg-primary/5 text-primary'
          }`}
        >
          <div className="flex items-center gap-2">
            {status === 'error' ? (
              <WarningCircleIcon size={16} className="shrink-0" />
            ) : (
              <CheckCircleIcon size={16} className="shrink-0" />
            )}
            {message}
          </div>
          {isUpgradeRequired(errorCode) && (
            <div className="mt-2 flex items-center gap-3 pl-6">
              <Link
                href={`${langPrefix(lang as Lang)}/pricing`}
                className="inline-flex items-center rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {dict.upgradeToPro}
              </Link>
            </div>
          )}
          {isContactRequired(errorCode) && (
            <div className="mt-2 flex items-center gap-3 pl-6">
              <a
                href="mailto:support@xvideodownloader.org"
                className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted/80"
              >
                {dict.contactUs}
              </a>
            </div>
          )}
          {isExtensionSuggested(errorCode) && dict.tryExtension && (
            <div className="mt-2 flex items-center gap-3 pl-6">
              <Link
                href={`${langPrefix(lang as Lang)}/extension`}
                className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
              >
                {dict.tryExtension}
              </Link>
            </div>
          )}
        </div>
      )}

      <Suspense>
        <VideoPreviewDialog
          open={showPreview}
          onOpenChange={handlePreviewOpenChange}
          videoUrl={url}
          pollingStage={pollingStage}
          stageLabels={dict.stages}
          downloadId={previewDownloadId}
          downloadStatus={downloadResult}
          lang={lang}
          errorMessage={previewError ?? undefined}
        />
      </Suspense>
    </div>
  );
}
