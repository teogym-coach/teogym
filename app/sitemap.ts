export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { pageMeta, site } from './content';

// 빌드 시점 기준으로 갱신됩니다 (정적 export이므로 배포할 때마다 새 값이 기록됨).
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageMeta).map(({ path }) => ({
    url: new URL(path, site.url).toString(),
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
