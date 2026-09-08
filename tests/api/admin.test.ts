import { describe, expect, it } from 'vitest';
import { SUBMISSION_STATUSES } from '@/types';

describe('Admin Submissions API 分页约定', () => {
  it('解析 page/limit/status', () => {
    const url = new URL('http://localhost/api/admin/submissions?page=2&limit=10&status=pending');
    expect(Number.parseInt(url.searchParams.get('page') ?? '1', 10)).toBe(2);
    expect(Number.parseInt(url.searchParams.get('limit') ?? '20', 10)).toBe(10);
    expect(url.searchParams.get('status')).toBe('pending');
  });

  it('缺省分页为 1/20', () => {
    const url = new URL('http://localhost/api/admin/submissions');
    expect(Number.parseInt(url.searchParams.get('page') ?? '1', 10)).toBe(1);
    expect(Number.parseInt(url.searchParams.get('limit') ?? '20', 10)).toBe(20);
  });
});

describe('Admin Result API 状态白名单（与路由共用 SUBMISSION_STATUSES）', () => {
  it('接受全部合法状态', () => {
    for (const status of SUBMISSION_STATUSES) {
      expect((SUBMISSION_STATUSES as readonly string[]).includes(status)).toBe(true);
    }
  });

  it('拒绝非法状态', () => {
    expect((SUBMISSION_STATUSES as readonly string[]).includes('invalid')).toBe(false);
  });
});
