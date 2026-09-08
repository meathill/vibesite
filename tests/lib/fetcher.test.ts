import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchJson } from '@/lib/fetcher';

describe('fetchJson', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('2xx 时返回解析后的 JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve({ id: 'a' }) }),
    );
    await expect(fetchJson<{ id: string }>('/api/x')).resolves.toEqual({ id: 'a' });
  });

  it('非 2xx 时抛出服务端 error 文案', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: '请填写项目名称' }),
      }),
    );
    await expect(fetchJson('/api/x')).rejects.toThrow('请填写项目名称');
  });

  it('空 body 时回退为状态码文案', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('no json')),
      }),
    );
    await expect(fetchJson('/api/x')).rejects.toThrow('500');
  });
});
