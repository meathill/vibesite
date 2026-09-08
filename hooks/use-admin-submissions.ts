'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchJson } from '@/lib/fetcher';
import type { Submission, SubmissionStatus } from '@/types';

export function useAdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const [resultStatus, setResultStatus] = useState<SubmissionStatus>('deployed');
  const [temporaryUrl, setTemporaryUrl] = useState('');
  const [permanentUrl, setPermanentUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    setListError(null);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (statusFilter) params.set('status', statusFilter);
      const data = await fetchJson<{ submissions: Submission[]; total: number }>(
        `/api/admin/submissions?${params}`,
      );
      setSubmissions(data.submissions);
      setTotal(data.total);
    } catch (error) {
      setListError(error instanceof Error ? error.message : '获取失败');
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  function selectSubmission(submission: Submission) {
    setSelectedSubmission(submission);
    setResultStatus(submission.status);
    setTemporaryUrl(submission.temporary_url ?? '');
    setPermanentUrl(submission.permanent_url ?? '');
    setErrorMessage(submission.error_message ?? '');
    setAdminNote(submission.admin_note ?? '');
    setUpdateError(null);
  }

  function clearSelection() {
    setSelectedSubmission(null);
  }

  async function updateResult(): Promise<boolean> {
    if (!selectedSubmission) return false;
    setIsUpdating(true);
    setUpdateError(null);
    try {
      await fetchJson(`/api/admin/submissions/${selectedSubmission.id}/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: resultStatus,
          temporary_url: temporaryUrl || undefined,
          permanent_url: permanentUrl || undefined,
          error_message: errorMessage || undefined,
          admin_note: adminNote || undefined,
        }),
      });
      setSelectedSubmission(null);
      await fetchSubmissions();
      return true;
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : '更新失败');
      return false;
    } finally {
      setIsUpdating(false);
    }
  }

  return {
    submissions,
    total,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    isLoading,
    listError,
    selectedSubmission,
    selectSubmission,
    clearSelection,
    resultStatus,
    setResultStatus,
    temporaryUrl,
    setTemporaryUrl,
    permanentUrl,
    setPermanentUrl,
    errorMessage,
    setErrorMessage,
    adminNote,
    setAdminNote,
    isUpdating,
    updateError,
    updateResult,
    refresh: fetchSubmissions,
  };
}
