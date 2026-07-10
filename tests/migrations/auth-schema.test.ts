import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { betterAuth } from 'better-auth';
import { getMigrations } from 'better-auth/db/migration';
import { emailOTP } from 'better-auth/plugins';
import { describe, expect, it } from 'vitest';

interface TableColumn {
  name: string;
  notnull: number;
  pk: number;
  type: string;
}

interface SQLiteStatement {
  all<Result = Record<string, unknown>>(...values: unknown[]): Result[];
  run(...values: unknown[]): unknown;
}

interface SQLiteDatabase {
  close(): void;
  exec(sql: string): void;
  prepare(sql: string): SQLiteStatement;
}

interface SQLiteModule {
  DatabaseSync: new (filename: string) => SQLiteDatabase;
}

const { DatabaseSync } = createRequire(import.meta.url)('node:sqlite') as SQLiteModule;

function readMigration(filename: string): string {
  return readFileSync(resolve(process.cwd(), 'migrations', filename), 'utf8');
}

function expectTableSchema(
  database: SQLiteDatabase,
  table: string,
  expected: Record<string, { isPrimary?: boolean; isRequired?: boolean; type: string }>,
): void {
  const columns = database.prepare(`PRAGMA table_info("${table}")`).all<TableColumn>();

  expect(columns.map(({ name }) => name)).toEqual(Object.keys(expected));
  for (const [name, definition] of Object.entries(expected)) {
    const column = columns.find((item) => item.name === name);
    expect(column, `${table}.${name} should exist`).toBeDefined();
    expect(column?.type, `${table}.${name} type`).toBe(definition.type);
    expect(column?.notnull, `${table}.${name} NOT NULL`).toBe(definition.isRequired ? 1 : 0);
    expect(column?.pk, `${table}.${name} primary key`).toBe(definition.isPrimary ? 1 : 0);
  }
}

describe('Better Auth schema migrations', () => {
  it('matches Better Auth 1.6.23 and enforces unique session tokens', async () => {
    const database = new DatabaseSync(':memory:');

    try {
      database.exec(readMigration('0001_create_auth_tables.sql'));
      database.exec(readMigration('0003_align_better_auth_schema.sql'));

      const auth = betterAuth({
        baseURL: 'http://localhost:4000',
        secret: 'bR8$xQ2!mN7@vK4#pL9^sF6&cD3*wH5Z',
        database,
        emailAndPassword: { enabled: false },
        plugins: [emailOTP({ sendVerificationOTP: async () => undefined })],
      });
      const { toBeAdded, toBeCreated } = await getMigrations(auth.options);

      expect(toBeCreated).toEqual([]);
      expect(toBeAdded).toEqual([]);

      expectTableSchema(database, 'user', {
        id: { type: 'TEXT', isPrimary: true },
        name: { type: 'TEXT', isRequired: true },
        email: { type: 'TEXT', isRequired: true },
        emailVerified: { type: 'INTEGER', isRequired: true },
        image: { type: 'TEXT' },
        createdAt: { type: 'INTEGER', isRequired: true },
        updatedAt: { type: 'INTEGER', isRequired: true },
      });
      expectTableSchema(database, 'session', {
        id: { type: 'TEXT', isPrimary: true },
        expiresAt: { type: 'INTEGER', isRequired: true },
        token: { type: 'TEXT', isRequired: true },
        createdAt: { type: 'INTEGER', isRequired: true },
        updatedAt: { type: 'INTEGER', isRequired: true },
        ipAddress: { type: 'TEXT' },
        userAgent: { type: 'TEXT' },
        userId: { type: 'TEXT', isRequired: true },
      });
      expectTableSchema(database, 'account', {
        id: { type: 'TEXT', isPrimary: true },
        accountId: { type: 'TEXT', isRequired: true },
        providerId: { type: 'TEXT', isRequired: true },
        userId: { type: 'TEXT', isRequired: true },
        accessToken: { type: 'TEXT' },
        refreshToken: { type: 'TEXT' },
        idToken: { type: 'TEXT' },
        accessTokenExpiresAt: { type: 'INTEGER' },
        refreshTokenExpiresAt: { type: 'INTEGER' },
        scope: { type: 'TEXT' },
        password: { type: 'TEXT' },
        createdAt: { type: 'INTEGER', isRequired: true },
        updatedAt: { type: 'INTEGER', isRequired: true },
      });
      expectTableSchema(database, 'verification', {
        id: { type: 'TEXT', isPrimary: true },
        identifier: { type: 'TEXT', isRequired: true },
        value: { type: 'TEXT', isRequired: true },
        expiresAt: { type: 'INTEGER', isRequired: true },
        createdAt: { type: 'INTEGER', isRequired: true },
        updatedAt: { type: 'INTEGER', isRequired: true },
      });

      const insertUser = database.prepare(
        'INSERT INTO "user" (id, name, email, emailVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      );
      insertUser.run('user-1', 'Test User', 'user@example.com', 1, Date.now(), Date.now());
      expect(() =>
        insertUser.run('user-2', 'Other User', 'user@example.com', 1, Date.now(), Date.now()),
      ).toThrow(/unique/i);

      const insertSession = database.prepare(
        'INSERT INTO "session" (id, expiresAt, token, createdAt, updatedAt, userId) VALUES (?, ?, ?, ?, ?, ?)',
      );
      insertSession.run(
        'session-1',
        Date.now() + 60_000,
        'unique-token',
        Date.now(),
        Date.now(),
        'user-1',
      );

      expect(() =>
        insertSession.run(
          'session-2',
          Date.now() + 60_000,
          'unique-token',
          Date.now(),
          Date.now(),
          'user-1',
        ),
      ).toThrow(/unique/i);
    } finally {
      database.close();
    }
  });
});
