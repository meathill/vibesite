import { describe, expect, it } from 'vitest';
import { formatDateTime } from '@/lib/format';

describe('formatDateTime', () => {
  it('格式化合法 ISO 时间为中文日期', () => {
    const formatted = formatDateTime('2026-09-01T10:00:00.000Z');
    expect(formatted).not.toBe('—');
    expect(formatted).toContain('2026');
  });

  it('非法输入兜底为 — 而不是 Invalid Date', () => {
    expect(formatDateTime('not-a-date')).toBe('—');
    expect(formatDateTime('')).toBe('—');
  });
});
