import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('合并冲突的 tailwind 类', () => {
    expect(cn('px-4 py-2', 'px-8')).toBe('py-2 px-8');
  });

  it('支持条件类名', () => {
    expect(cn('flex', false && 'hidden', 'text-sm')).toBe('flex text-sm');
  });
});
