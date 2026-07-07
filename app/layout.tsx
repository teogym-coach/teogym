import type { Metadata } from 'next';
import './globals.css';
import { Footer, JsonLd } from './components';
import { pageMeta, site } from './content';
import { makeMetadata } from './seo';
import { SiteHeader } from './ui';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...makeMetadata(pageMeta.home),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'SportsActivityLocation'],
  '@id': `${site.url}/#localbusiness`,
  name: site.name,
  alternateName: ['테오짐', 'TEOGYM PT Cheongna'],
  description: site.description,
  url: site.url,
  telephone: site.telephone,
  image: new URL(site.openGraphImage.url, site.url).toString(),
  priceRange: '상담 후 안내',
  areaServed: [site.region, '인천 서구 청라', '인천광역시 서구'],
  knowsAbout: ['PT샵', '퍼스널트레이닝', '헬스장', '체형교정 PT', '다이어트 PT', '벌크업 PT', '운동기록 관리'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '청라커낼로 280 청라골든프라자 5층 505호',
    addressLocality: '서구',
    addressRegion: '인천광역시',
    addressCountry: 'KR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.links.place,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: site.hours.weekday.open,
      closes: site.hours.weekday.close,
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: site.hours.saturday.open,
      closes: site.hours.saturday.close,
    },
    // 일요일 휴무 (opens = closes = 00:00 은 schema.org의 '휴무' 표기 규약)
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '00:00',
      closes: '00:00',
    },
  ],
  sameAs: [site.links.place, site.links.blog, site.links.instagram, site.links.youtube],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.telephone,
    contactType: 'customer service',
    areaServed: 'KR',
    availableLanguage: ['ko'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko">
    <head>
      <link rel="stylesheet" href="/fonts/pretendard/pretendardvariable-dynamic-subset.css" />
    </head>
    <body>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      {children}
      <Footer />
    </body>
  </html>;
}
