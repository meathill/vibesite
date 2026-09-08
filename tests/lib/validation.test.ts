import { describe, expect, it } from 'vitest';
import {
  FILE_CONSTRAINTS,
  isFileTooLarge,
  isZipFile,
  submissionTextSchema,
  validateSubmissionFile,
} from '@/lib/validation';

describe('validation', () => {
  describe('isZipFile', () => {
    it('接受 .zip 后缀（大小写不敏感）', () => {
      expect(isZipFile('site.zip')).toBe(true);
      expect(isZipFile('SITE.ZIP')).toBe(true);
    });

    it('拒绝非 zip 文件', () => {
      expect(isZipFile('site.txt')).toBe(false);
      expect(isZipFile('site.zip.exe')).toBe(false);
    });
  });

  describe('isFileTooLarge', () => {
    it('50MB 以内通过，超过拒绝', () => {
      expect(isFileTooLarge(FILE_CONSTRAINTS.MAX_FILE_SIZE)).toBe(false);
      expect(isFileTooLarge(FILE_CONSTRAINTS.MAX_FILE_SIZE + 1)).toBe(true);
    });
  });

  describe('validateSubmissionFile', () => {
    it('合法文件返回 null', () => {
      expect(validateSubmissionFile({ name: 'a.zip', size: 1024 })).toBeNull();
    });

    it('类型错误优先于大小错误', () => {
      expect(validateSubmissionFile({ name: 'a.txt', size: 1024 })).toBe('仅支持 .zip 文件');
    });

    it('超大文件返回中文提示', () => {
      const message = validateSubmissionFile({ name: 'a.zip', size: 100 * 1024 * 1024 });
      expect(message).toContain('50MB');
    });
  });

  describe('submissionTextSchema', () => {
    it('自动 trim 并接受合法输入', () => {
      const parsed = submissionTextSchema.parse({
        projectName: '  我的站  ',
        contact: ' me@example.com ',
        intent: 'preview',
      });
      expect(parsed.projectName).toBe('我的站');
      expect(parsed.contact).toBe('me@example.com');
    });

    it('空项目名/联系方式报错', () => {
      expect(() => submissionTextSchema.parse({ projectName: '   ', contact: 'a@b.c' })).toThrow(
        '请填写项目名称',
      );
      expect(() => submissionTextSchema.parse({ projectName: 'x', contact: '   ' })).toThrow(
        '请填写联系方式',
      );
    });

    it('非法 intent 被拒绝', () => {
      const result = submissionTextSchema.safeParse({
        projectName: 'x',
        contact: 'y',
        intent: 'hack-the-planet',
      });
      expect(result.success).toBe(false);
    });
  });
});
