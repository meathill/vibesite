import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const queries: Array<{ sql: string; parameters: unknown[] }> = [];
  const emailSend = vi.fn().mockResolvedValue({ messageId: 'test-message-id' });

  function createStatement(sql: string, parameters: unknown[] = []) {
    return {
      bind(...values: unknown[]) {
        return createStatement(sql, values);
      },
      async all() {
        queries.push({ sql, parameters });
        const isRead = /^\s*(select|pragma)/i.test(sql);

        return {
          success: true,
          results: isRead ? [] : [{}],
          meta: {
            changes: isRead ? 0 : 1,
            last_row_id: isRead ? 0 : 1,
          },
        };
      },
    };
  }

  const database = {
    prepare(sql: string) {
      return createStatement(sql);
    },
    async batch(statements: Array<ReturnType<typeof createStatement>>) {
      return Promise.all(statements.map((statement) => statement.all()));
    },
    async exec() {
      return { count: 0, duration: 0 };
    },
  };
  const getCloudflareContext = vi.fn(async () => ({
    env: {
      BETTER_AUTH_SECRET: 'bR8$xQ2!mN7@vK4#pL9^sF6&cD3*wH5Z',
      BETTER_AUTH_URL: 'https://vibe.meathill.com',
      DB: database,
      EMAIL: { send: emailSend },
    },
  }));

  return { emailSend, getCloudflareContext, queries };
});

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: mocks.getCloudflareContext,
}));

import { POST } from '@/app/api/auth/[...all]/route';

function createOTPRequest(email: string): Request {
  return new Request('https://vibe.meathill.com/api/auth/email-otp/send-verification-otp', {
    method: 'POST',
    headers: {
      'cf-connecting-ip': '203.0.113.1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, type: 'sign-in' }),
  });
}

describe('POST /api/auth/email-otp/send-verification-otp', () => {
  beforeEach(() => {
    mocks.queries.length = 0;
    mocks.emailSend.mockClear();
    mocks.getCloudflareContext.mockClear();
  });

  it('initializes Better Auth with D1 and sends an OTP', async () => {
    const response = await POST(createOTPRequest('user@example.com'));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(mocks.emailSend).toHaveBeenCalledOnce();
    expect(mocks.emailSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        subject: 'VibeSite 登录验证码',
      }),
    );
    expect(mocks.queries.some(({ sql }) => /insert into ["`]verification["`]/i.test(sql))).toBe(
      true,
    );
  });

  it('creates auth from the current Cloudflare context for every request', async () => {
    await POST(createOTPRequest('first@example.com'));
    await POST(createOTPRequest('second@example.com'));

    expect(mocks.getCloudflareContext).toHaveBeenCalledTimes(2);
  });
});
