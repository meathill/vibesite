import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendTelegramMessage, sendNewSubmissionNotification } from '@/lib/telegram';
import type { Submission } from '@/types';

const mockSubmission: Submission = {
  id: 'abc123',
  project_name: '测试项目',
  contact: 'test@example.com',
  description: '这是一个测试',
  intent: 'preview',
  status: 'pending',
  source_r2_key: null,
  temporary_url: null,
  permanent_url: null,
  error_message: null,
  admin_note: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('telegram', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('sendTelegramMessage', () => {
    it('should send message successfully', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ ok: true }),
      });
      vi.stubGlobal('fetch', mockFetch);

      await sendTelegramMessage('test-token', '12345', 'Hello');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.telegram.org/bottest-token/sendMessage',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });

    it('should throw on API error', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Bad Request'),
      });
      vi.stubGlobal('fetch', mockFetch);

      await expect(sendTelegramMessage('test-token', '12345', 'Hello')).rejects.toThrow(
        'Telegram API error: 400 Bad Request',
      );
    });
  });

  describe('sendNewSubmissionNotification', () => {
    it('should format notification correctly', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ ok: true }),
      });
      vi.stubGlobal('fetch', mockFetch);

      await sendNewSubmissionNotification('test-token', '12345', mockSubmission);

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.text).toContain('新提交');
      expect(body.text).toContain('测试项目');
      expect(body.text).toContain('test@example.com');
      expect(body.text).toContain('仅预览');
      expect(body.text).toContain('abc123');
    });
  });
});
