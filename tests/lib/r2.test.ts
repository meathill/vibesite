import { describe, it, expect } from 'vitest';
import { generateR2Key } from '@/lib/r2';

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
  });
});
