'use client';

import { ChatCircleDotsIcon, CheckIcon, SpinnerGapIcon } from '@phosphor-icons/react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';

const FEEDBACK_API = 'https://feedback.roudan.io/api/feedbacks';
const APP_ID = 'x-downloader';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type FeedbackDict = {
  ariaLabel: string;
  title: string;
  description: string;
  contentLabel: string;
  contentPlaceholder: string;
  contactLabel: string;
  submitError: string;
  submitted: string;
  submit: string;
};

function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screen: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    url: location.origin + location.pathname,
  };
}

export function FeedbackButton({ dict }: { dict: FeedbackDict }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const content = (formData.get('content') as string).trim();
    if (!content) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(FEEDBACK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: APP_ID,
          content,
          contact: (formData.get('contact') as string)?.trim() || undefined,
          deviceInfo: getDeviceInfo(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setStatus('success');
      timerRef.current = setTimeout(() => {
        setOpen(false);
        setStatus('idle');
      }, 1500);
    } catch {
      setStatus('error');
      setErrorMessage(dict.submitError);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setStatus('idle');
      setErrorMessage('');
    }
  }

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed right-4 bottom-4 z-40 size-12 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 sm:size-10"
        onClick={() => setOpen(true)}
        aria-label={dict.ariaLabel}
      >
        <ChatCircleDotsIcon className="size-6 opacity-100! sm:size-5" />
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogPopup className="max-w-md">
          <DialogHeader>
            <DialogTitle>{dict.title}</DialogTitle>
            <DialogDescription>{dict.description}</DialogDescription>
          </DialogHeader>

          <DialogPanel>
            <form id="feedback-form" className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="feedback-content" className="text-sm font-medium">
                  {dict.contentLabel} <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="feedback-content"
                  name="content"
                  required
                  rows={4}
                  placeholder={dict.contentPlaceholder}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-base shadow-xs/5 outline-none ring-ring/24 transition-shadow placeholder:text-muted-foreground/72 focus-visible:border-ring focus-visible:ring-[3px] sm:text-sm dark:bg-input/32"
                  disabled={status === 'submitting' || status === 'success'}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="feedback-contact" className="text-sm font-medium">
                  {dict.contactLabel}
                </label>
                <Input
                  id="feedback-contact"
                  name="contact"
                  type="email"
                  placeholder="your@email.com"
                  disabled={status === 'submitting' || status === 'success'}
                />
              </div>
              {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
            </form>
          </DialogPanel>

          <DialogFooter variant="bare">
            {status === 'success' ? (
              <Button variant="default" disabled>
                <CheckIcon className="opacity-100!" />
                {dict.submitted}
              </Button>
            ) : (
              <Button type="submit" form="feedback-form" disabled={status === 'submitting'}>
                {status === 'submitting' && (
                  <SpinnerGapIcon className="animate-spin opacity-100!" />
                )}
                {dict.submit}
              </Button>
            )}
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </>
  );
}
