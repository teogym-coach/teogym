import type { Metadata } from 'next';
import { site } from './content';

export const GOOGLE_SITE_VERIFICATION = 'dykqPkb45TM-_sOvKMBpKhMR1dGlTKMbRSzAcbSa9x0';
export const BING_SITE_VERIFICATION = 'E8A9918482E1CA0F06BB325DAB1C7D36';

// TODO: 네이버 서치어드바이저(https://searchadvisor.naver.com)에 사이트를 등록하면
// "HTML 태그" 방식의 naver-site-verification 값이 발급됩니다.
// 발급받은 값을 아래에 넣으면 모든 페이지에 자동 적용됩니다. 임의 값을 넣지 마세요.
export const NAVER_SITE_VERIFICATION = '';

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
