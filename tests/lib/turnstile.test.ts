import { beforeEach, describe, expect, it, vi } from 'vitest';
import { verifyTurnstileToken } from '@/lib/turnstile';

describe('verifyTurnstileToken', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('success=true 时返回 true', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ success: true }) }),
    );
    await expect(verifyTurnstileToken('secret', 'token')).resolves.toBe(true);
  });

  it('success=false 时返回 false，并透传 remoteip', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue({ json: () => Promise.resolve({ success: false }) });
    vi.stubGlobal('fetch', mockFetch);
    await expect(verifyTurnstileToken('secret', 'token', '203.0.113.1')).resolves.toBe(false);
    expect(String(mockFetch.mock.calls[0][1]?.body)).toContain('remoteip');
  });
});
