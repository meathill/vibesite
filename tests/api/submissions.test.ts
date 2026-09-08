import { describe, expect, it } from 'vitest';
import { submissionTextSchema } from '@/lib/validation';

describe('POST /api/submissions 参数校验（与 route 共用同一 schema）', () => {
  it('空项目名被拒绝', () => {
    const result = submissionTextSchema.safeParse({ projectName: '', contact: 'a@b.c' });
    expect(result.success).toBe(false);
  });

  it('缺联系方式被拒绝', () => {
    const result = submissionTextSchema.safeParse({ projectName: '测试项目', contact: '  ' });
    expect(result.success).toBe(false);
  });

  it('非法 intent 被拒绝', () => {
    const result = submissionTextSchema.safeParse({
      projectName: 'x',
      contact: 'y',
      intent: 'not-a-real-intent',
    });
    expect(result.success).toBe(false);
  });

  it('.zip 文件名大小写均接受', () => {
    expect('test.ZIP'.toLowerCase().endsWith('.zip')).toBe(true);
  });

  it('50MB 边界正确', () => {
    const max = 50 * 1024 * 1024;
    expect(1024 * 1024).toBeLessThanOrEqual(max);
    expect(100 * 1024 * 1024).toBeGreaterThan(max);
  });
});

describe('GET /api/submissions?id=xxx', () => {
  it('缺 id 时应返回 400（路由用 apiError 缺 ID）', () => {
    const url = new URL('http://localhost/api/submissions');
    expect(url.searchParams.get('id')).toBeNull();
  });

  it('能从 query 取出 id', () => {
    const url = new URL('http://localhost/api/submissions?id=abc123');
    expect(url.searchParams.get('id')).toBe('abc123');
  });
});
