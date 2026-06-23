export const SUBMISSION_STATUSES = [
  'pending',
  'processing',
  'deployed',
  'failed',
  'expired',
] as const;

export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export const INTENT_OPTIONS = [
  { value: 'preview', label: '仅预览' },
  { value: 'hosting', label: '长期托管' },
  { value: 'custom_domain', label: '绑定自己的域名' },
  { value: 'human_service', label: '需要人工服务' },
] as const;

export type Intent = (typeof INTENT_OPTIONS)[number]['value'];

export interface Submission {
  id: string;
  project_name: string;
  contact: string;
  description: string | null;
  intent: Intent | null;
  status: SubmissionStatus;
  source_r2_key: string | null;
  temporary_url: string | null;
  permanent_url: string | null;
  error_message: string | null;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  error: string;
  code?: string;
}

export interface SubmissionResult {
  status: SubmissionStatus;
  temporary_url?: string;
  permanent_url?: string;
  error_message?: string;
  admin_note?: string;
}

export interface AdminSubmissionUpdate {
  status: SubmissionStatus;
  temporary_url?: string;
  permanent_url?: string;
  error_message?: string;
  admin_note?: string;
}
