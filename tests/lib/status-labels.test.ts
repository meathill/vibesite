import { describe, expect, it } from 'vitest';
import {
  INTENT_LABELS,
  STATUS_COLORS,
  STATUS_CONFIG,
  STATUS_LABELS,
  TELEGRAM_STATUS_LABELS,
} from '@/lib/status-labels';
import { INTENT_OPTIONS, SUBMISSION_STATUSES } from '@/types';

describe('status-labels', () => {
  it('覆盖全部 SubmissionStatus', () => {
    for (const status of SUBMISSION_STATUSES) {
      expect(STATUS_LABELS[status]).toBeTruthy();
      expect(STATUS_COLORS[status]).toBeTruthy();
      expect(STATUS_CONFIG[status].label).toBe(STATUS_LABELS[status]);
      expect(STATUS_CONFIG[status].color).toBe(STATUS_COLORS[status]);
      expect(TELEGRAM_STATUS_LABELS[status]).toBeTruthy();
    }
  });

  it('意图标签与 INTENT_OPTIONS 一致', () => {
    for (const option of INTENT_OPTIONS) {
      expect(INTENT_LABELS[option.value]).toBe(option.label);
    }
  });
});
