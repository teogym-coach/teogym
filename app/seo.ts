import type { Metadata } from 'next';
import { site } from './content';

export const GOOGLE_SITE_VERIFICATION = 'dykqPkb45TM-_sOvKMBpKhMR1dGlTKMbRSzAcbSa9x0';
export const BING_SITE_VERIFICATION = 'E8A9918482E1CA0F06BB325DAB1C7D36';

export const NAVER_SITE_VERIFICATION = '3176213ef9af725cf2f0c73eb3ed9d3ef8fbe2d1';

export function makeMetadata(meta: { title: string; description: string; path: string }): Metadata {
  const url = new URL(meta.path, site.url).toString();
  const otherVerification: Record<string, string> = { 'msvalidate.01': BING_SITE_VERIFICATION };
  if (NAVER_SITE_VERIFICATION) otherVerification['naver-site-verification'] = NAVER_SITE_VERIFICATION;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
      other: otherVerification,
    },
    keywords: site.keywords,
    // geo.position/ICBM 메타태그는 좌표가 부정확해 제거함. 정확한 좌표 확인 후 복원할 것.
    other: {
      'geo.region': 'KR-28',
      'geo.placename': '인천광역시 서구 청라동',
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: site.name,
      locale: 'ko_KR',
      type: 'website',
      images: [site.openGraphImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [site.openGraphImage.url],
    },
  };
}
