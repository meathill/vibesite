import { z } from 'zod';
import { INTENT_OPTIONS, SUBMISSION_STATUSES } from '@/types';

export const FILE_CONSTRAINTS = {
  MAX_FILE_SIZE: 50 * 1024 * 1024,
  MAX_FILE_SIZE_LABEL: '50MB',
  ACCEPTED_EXTENSION: '.zip',
} as const;

export function isZipFile(filename: string): boolean {
  return filename.toLowerCase().endsWith(FILE_CONSTRAINTS.ACCEPTED_EXTENSION);
}

export function isFileTooLarge(size: number): boolean {
  return size > FILE_CONSTRAINTS.MAX_FILE_SIZE;
}

export function validateSubmissionFile(file: { name: string; size: number }): string | null {
  if (!isZipFile(file.name)) return '仅支持 .zip 文件';
  if (isFileTooLarge(file.size)) return `文件大小不能超过 ${FILE_CONSTRAINTS.MAX_FILE_SIZE_LABEL}`;
  return null;
}

const intentValues = INTENT_OPTIONS.map((option) => option.value);

export const submissionTextSchema = z.object({
  projectName: z.string().trim().min(1, '请填写项目名称'),
  contact: z.string().trim().min(1, '请填写联系方式'),
  description: z.string().trim().optional(),
  intent: z.enum(intentValues as [string, ...string[]]).optional(),
});

export type SubmissionTextInput = z.infer<typeof submissionTextSchema>;

export function validateSubmissionText(input: unknown): SubmissionTextInput {
  return submissionTextSchema.parse(input);
}

export const submissionStatusSchema = z.enum(SUBMISSION_STATUSES);
