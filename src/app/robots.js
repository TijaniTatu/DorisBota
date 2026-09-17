import { SITE_URL } from '@/data/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/diagnostic/results/', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
