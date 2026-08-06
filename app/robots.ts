import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-71fe0.web.app';

  return {
    rules: {
      // Allow all crawlers (including GPTBot, ClaudeBot, CCBot, Googlebot) to scrape the public site
      userAgent: '*',
      allow: '/',
      // Protect internal admin routes
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
