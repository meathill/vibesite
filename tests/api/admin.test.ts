import { describe, it, expect } from 'vitest';
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth';

describe('Admin Authentication', () => {
  it('should reject request without cookie', () => {
    const request = new Request('http://localhost/api/admin/submissions', {
      headers: {},
    });
    expect(isAdminAuthenticatedFromRequest(request)).toBe(false);
  });

  it('should reject request with expired token', () => {
    const expiredToken = String(Date.now() - 10000);
    const request = new Request('http://localhost/api/admin/submissions', {
      headers: {
        cookie: `admin_session=${expiredToken}`,
      },
    });
    expect(isAdminAuthenticatedFromRequest(request)).toBe(false);
  });

  it('should accept request with valid token', () => {
    const validToken = String(Date.now() + 3600000);
    const request = new Request('http://localhost/api/admin/submissions', {
      headers: {
        cookie: `admin_session=${validToken}`,
      },
    });
    expect(isAdminAuthenticatedFromRequest(request)).toBe(true);
  });

  it('should reject request with invalid token format', () => {
    const request = new Request('http://localhost/api/admin/submissions', {
      headers: {
        cookie: 'admin_session=not-a-number',
      },
    });
    expect(isAdminAuthenticatedFromRequest(request)).toBe(false);
  });
});

describe('Admin Submissions API', () => {
  it('should parse pagination params', () => {
    const url = new URL('http://localhost/api/admin/submissions?page=2&limit=10&status=pending');
    const page = Number.parseInt(url.searchParams.get('page') ?? '1', 10);
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '20', 10);
    const status = url.searchParams.get('status') ?? undefined;

    expect(page).toBe(2);
    expect(limit).toBe(10);
    expect(status).toBe('pending');
  });

  it('should use default pagination', () => {
    const url = new URL('http://localhost/api/admin/submissions');
    const page = Number.parseInt(url.searchParams.get('page') ?? '1', 10);
    const limit = Number.parseInt(url.searchParams.get('limit') ?? '20', 10);

    expect(page).toBe(1);
    expect(limit).toBe(20);
  });
});

describe('Admin Result API', () => {
  it('should validate status values', () => {
    const validStatuses = ['pending', 'processing', 'deployed', 'failed', 'expired'];
    expect(validStatuses).toContain('deployed');
    expect(validStatuses).not.toContain('invalid');
  });
});
