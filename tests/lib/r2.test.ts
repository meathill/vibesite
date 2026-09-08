import { describe, expect, it, vi } from 'vitest';
import { deleteFromR2, generateR2Key, getFromR2, uploadToR2 } from '@/lib/r2';

describe('r2', () => {
  describe('generateR2Key', () => {
    it('should generate correct key format', () => {
      const key = generateR2Key('abc123', 'my-project.zip');
      expect(key).toBe('submissions/abc123/my-project.zip');
    });

    it('should sanitize unsafe characters in filename', () => {
      const key = generateR2Key('abc123', 'my project (1).zip');
      expect(key).toBe('submissions/abc123/my_project__1_.zip');
    });

    it('should preserve dots and hyphens', () => {
      const key = generateR2Key('abc123', 'my-project.v2.zip');
      expect(key).toBe('submissions/abc123/my-project.v2.zip');
    });

    it('中文与路径穿越字符被清洗', () => {
      expect(generateR2Key('abc123', '../敏感 文件.zip')).toBe('submissions/abc123/..______.zip');
    });
  });

  describe('bucket 透传', () => {
    it('uploadToR2 透传 contentType 与 size 元数据', async () => {
      const put = vi.fn().mockResolvedValue({ key: 'k' });
      await uploadToR2({
        bucket: { put } as unknown as R2Bucket,
        key: 'k',
        data: new ArrayBuffer(4),
        contentType: 'application/zip',
        size: 4,
      });
      expect(put).toHaveBeenCalledOnce();
      expect(put.mock.calls[0][2]).toMatchObject({
        httpMetadata: { contentType: 'application/zip' },
        customMetadata: { size: '4' },
      });
    });

    it('get/delete 直接透传 bucket', async () => {
      const get = vi.fn().mockResolvedValue(null);
      const del = vi.fn().mockResolvedValue(undefined);
      await expect(getFromR2({ get } as unknown as R2Bucket, 'k')).resolves.toBeNull();
      await deleteFromR2({ delete: del } as unknown as R2Bucket, 'k');
      expect(del).toHaveBeenCalledWith('k');
    });
  });
});
