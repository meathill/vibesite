/**
 * JSON-LD 结构化数据组件
 * 用于向搜索引擎提供语义化数据
 */

import { brandCatalog, getOrganizationJsonLd } from 'meathill-brand';

const SITE_URL = 'https://vibe.meathill.com';

const SITE_NAME = 'VibeSite';
const SITE_DESCRIPTION = 'AI 生成网页一键上线服务。上传 zip 文件，10 分钟获得可访问链接。';
const HOMEPAGE_TITLE = 'VibeSite - AI 生成网页一键上线 | 免费部署托管';
const HOMEPAGE_DESCRIPTION =
  '用 AI 生成了网页不知道怎么部署？上传 zip 文件，10 分钟获得可访问链接。支持 Cursor、Bolt、Lovable、v0 生成的项目。免费预览，无需注册。';

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'zh-CN',
    publisher: { '@id': brandCatalog.organization.id },
  };
}

export function WebsiteJsonLd() {
  const data = getWebsiteJsonLd();

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD 结构化数据
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getWebPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    inLanguage: 'zh-CN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': brandCatalog.organization.id },
  };
}

export function WebPageJsonLd() {
  const data = getWebPageJsonLd();

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD 结构化数据
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = getOrganizationJsonLd();

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD 结构化数据
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD 结构化数据
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD 结构化数据
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
