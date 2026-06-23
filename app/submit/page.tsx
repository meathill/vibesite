'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useSubmissionFormStore } from '@/store/submission';
import {
  CloudArrowUpIcon,
  FileArchiveIcon,
  TrashIcon,
} from '@phosphor-icons/react/dist/ssr';

const INTENT_OPTIONS = [
  { value: 'preview', label: '仅预览' },
  { value: 'hosting', label: '长期托管' },
  { value: 'custom_domain', label: '绑定自己的域名' },
  { value: 'human_service', label: '需要人工服务' },
];

export default function SubmitPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {
    projectName,
    contact,
    description,
    intent,
    file,
    isSubmitting,
    error,
    setProjectName,
    setContact,
    setDescription,
    setIntent,
    setFile,
    setIsSubmitting,
    setError,
  } = useSubmissionFormStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        if (!droppedFile.name.endsWith('.zip')) {
          setError('仅支持 .zip 文件');
          return;
        }
        if (droppedFile.size > 50 * 1024 * 1024) {
          setError('文件大小不能超过 50MB');
          return;
        }
        setFile(droppedFile);
        setError(null);
      }
    },
    [setError, setFile],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        if (!selectedFile.name.endsWith('.zip')) {
          setError('仅支持 .zip 文件');
          return;
        }
        if (selectedFile.size > 50 * 1024 * 1024) {
          setError('文件大小不能超过 50MB');
          return;
        }
        setFile(selectedFile);
        setError(null);
      }
    },
    [setError, setFile],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!projectName.trim()) {
        setError('请填写项目名称');
        return;
      }
      if (!contact.trim()) {
        setError('请填写联系方式');
        return;
      }
      if (!file) {
        setError('请上传 .zip 文件');
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('projectName', projectName.trim());
        formData.append('contact', contact.trim());
        if (description.trim()) {
          formData.append('description', description.trim());
        }
        if (intent) {
          formData.append('intent', intent);
        }
        formData.append('file', file);

        const response = await fetch('/api/submissions', {
          method: 'POST',
          body: formData,
        });

        const data = (await response.json()) as { id?: string; error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? '提交失败');
        }

        router.push(`/success?id=${data.id}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : '提交失败，请重试');
      } finally {
        setIsSubmitting(false);
      }
    },
    [projectName, contact, description, intent, file, router, setError, setIsSubmitting],
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">提交你的网站</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* 项目名称 */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="projectName">项目名称 *</Label>
              <Input
                id="projectName"
                placeholder="例如：我的第一个网站"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* 联系方式 */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="contact">联系方式 *</Label>
              <Input
                id="contact"
                placeholder="邮箱、微信或 Telegram"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* 用途意图 */}
            <div className="flex flex-col gap-2">
              <Label>用途意图</Label>
              <RadioGroup value={intent} onValueChange={setIntent} disabled={isSubmitting}>
                {INTENT_OPTIONS.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* 项目描述 */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">项目描述（可选）</Label>
              <Textarea
                id="description"
                placeholder="简单描述你的项目..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            {/* 文件上传 */}
            <div className="flex flex-col gap-2">
              <Label>上传文件 *</Label>
              {file ? (
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <FileArchiveIcon className="size-8 text-primary" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setFile(null)}
                    disabled={isSubmitting}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      fileInputRef.current?.click();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <CloudArrowUpIcon className="size-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    拖拽 .zip 文件到这里，或点击选择
                  </p>
                  <p className="text-xs text-muted-foreground">最大 50MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                className="hidden"
                onChange={handleFileSelect}
                disabled={isSubmitting}
              />
            </div>

            {/* 错误信息 */}
            {error && (
              <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* 提交按钮 */}
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner className="size-4" />
                  提交中...
                </>
              ) : (
                '提交'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
