import { site, type Faq } from './content';

// 페이지별 구조화 데이터 생성 헬퍼.
// 렌더링은 components.tsx의 JsonLd 컴포넌트가 담당합니다.

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function faqSchema(faqs: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function serviceSchema(service: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: new URL(service.path, site.url).toString(),
    serviceType: service.name,
    areaServed: [site.region, '인천 서구 청라', '인천광역시 서구'],
    provider: { '@id': `${site.url}/#localbusiness` },
  };
}
