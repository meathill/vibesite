import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getSubmission, getSubmissions } from '@/lib/db';
import type { Submission } from '@/types';

function createRow(overrides: Partial<Submission> = {}): Submission {
  return {
    id: 'sub_1',
    project_name: 'demo',
    contact: 'me@example.com',
    description: null,
    intent: 'preview',
    status: 'pending',
    source_r2_key: null,
    temporary_url: null,
    permanent_url: null,
    error_message: null,
    admin_note: null,
    created_at: '2026-09-01T00:00:00.000Z',
    updated_at: '2026-09-01T00:00:00.000Z',
    ...overrides,
  };
}

function createDbStub(rows: Submission[] = []) {
  const calls: Array<{ sql: string; values: unknown[] }> = [];
  const db = {
    prepare(sql: string) {
      return {
        bind(...values: unknown[]) {
          calls.push({ sql, values });
          return {
            async first<T>(): Promise<T | null> {
              if (/where id =\s*\?1/i.test(sql)) {
                const found = rows.find((row) => row.id === values[0]);
                return (found ?? null) as T | null;
              }
              return null;
            },
            async run() {
              return { success: true };
            },
            async all() {
              return { success: true, results: [] };
            },
          };
        },
        async first<T>(): Promise<T | null> {
          calls.push({ sql, values: [] });
          return null;
        },
      };
    },
    async batch(statements: Array<{ all: () => Promise<{ results: unknown[] }> }>) {
      void statements;
      return [{ results: [{ total: rows.length }] }, { results: rows }];
    },
  };
  return { calls, db: db as unknown as D1Database };
}

describe('lib/db', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('getSubmission 按 id 查询并在缺失时返回 null', async () => {
    const { calls, db } = createDbStub([createRow({ id: 'abc' })]);
    await expect(getSubmission(db, 'abc')).resolves.toMatchObject({ id: 'abc' });
    await expect(getSubmission(db, 'missing')).resolves.toBeNull();
    expect(calls[0]?.sql).toContain('WHERE id = ?1');
  });

  it('getSubmissions 无 status 时 LIMIT/OFFSET 占位为 ?1/?2', async () => {
    const { calls, db } = createDbStub([createRow()]);
    const result = await getSubmissions(db, { page: 2, limit: 10 });
    expect(result.total).toBe(1);
    expect(result.submissions).toHaveLength(1);
    const listSql = calls.map((call) => call.sql).join(' ');
    expect(listSql).toContain('LIMIT ?1 OFFSET ?2');
  });

  it('getSubmissions 有 status 时占位为 ?2/?3 且透传过滤值', async () => {
    const { calls, db } = createDbStub([]);
    await getSubmissions(db, { page: 1, limit: 20, status: 'pending' });
    const listCall = calls.find((call) => call.sql.includes('ORDER BY created_at'));
    expect(listCall?.sql).toContain('LIMIT ?2 OFFSET ?3');
    expect(listCall?.values[0]).toBe('pending');
  });
});
