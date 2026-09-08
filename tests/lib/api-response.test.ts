import { describe, expect, it } from 'vitest';
import { apiError, apiOk } from '@/lib/api-response';

describe('api-response', () => {
  it('apiError 返回统一 {error,code} 与状态码', async () => {
    const response = apiError('请填写项目名称', 400, 'INVALID_PARAMS');
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: '请填写项目名称',
      code: 'INVALID_PARAMS',
    });
  });

  it('apiError 无 code 时只含 error', async () => {
    const response = apiError('服务器内部错误', 500);
    await expect(response.json()).resolves.toEqual({ error: '服务器内部错误' });
  });

  it('apiOk 透传数据', async () => {
    const response = apiOk({ id: 'abc', status: 'pending' });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ id: 'abc', status: 'pending' });
  });
});
