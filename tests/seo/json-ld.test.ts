import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getWebPageJsonLd, getWebsiteJsonLd } from '@/components/seo/json-ld';

const ROOT = resolve(__dirname, '../..');
const SEO_COMPONENT = readFileSync(resolve(ROOT, 'components/seo/json-ld.tsx'), 'utf-8');
const LAYOUT = readFileSync(resolve(ROOT, 'app/layout.tsx'), 'utf-8');

// Issue #3：没有真实评价时不得声明 SoftwareApplication，更不得伪造评分。
describe('首页 JSON-LD（issue #3）', () => {
  it('源码中不再声明 SoftwareApplication', () => {
    expect(SEO_COMPONENT).not.toContain('SoftwareApplication');
    expect(SEO_COMPONENT).not.toContain('SoftwareAppJsonLd');
    expect(SEO_COMPONENT).not.toContain('aggregateRating');
  });

  it('layout 不再注入 SoftwareApp，改为 WebSite + WebPage', () => {
    expect(LAYOUT).not.toContain('SoftwareAppJsonLd');
    expect(LAYOUT).not.toContain('SoftwareApplication');
    expect(LAYOUT).toContain('WebsiteJsonLd');
    expect(LAYOUT).toContain('WebPageJsonLd');
  });

  it('WebSite 标注有效且不指向不存在的站内搜索', () => {
    const data = getWebsiteJsonLd();
    expect(data['@type']).toBe('WebSite');
    expect(data.url).toBe('https://vibe.meathill.com');
    expect(data.name).toContain('VibeSite');
    // 站内 /search 并不存在，之前指向它的 SearchAction 会导致富结果无效
    expect(JSON.stringify(data)).not.toContain('/search');
    expect(data).not.toHaveProperty('potentialAction');
    // WebSite 不应携带评分/价格字段
    expect(data).not.toHaveProperty('aggregateRating');
    expect(data).not.toHaveProperty('review');
    expect(data).not.toHaveProperty('offers');
  });

  it('WebPage 标注与可见内容一致且无评分/价格字段', () => {
    const website = getWebsiteJsonLd();
    const data = getWebPageJsonLd();
    expect(data['@type']).toBe('WebPage');
    expect(data.url).toBe('https://vibe.meathill.com');
    expect(data.name).toContain('VibeSite');
    expect(data.description).toContain('上传 zip');
    expect(data.isPartOf).toEqual({ '@id': website['@id'] });
    // WebPage 富结果不需要 rating/review；没有真实评价时不得伪造
    expect(data).not.toHaveProperty('aggregateRating');
    expect(data).not.toHaveProperty('review');
    expect(data).not.toHaveProperty('offers');
  });
});
