import { MetadataRoute } from 'next';
import { adminDb } from '@/lib/firebase/admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-71fe0.web.app';
  
  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  try {
    // Dynamic project routes
    const pSnap = await adminDb.collection('projects').where('status', '==', 'published').get();
    const cSnap = await adminDb.collection('categories').get();
    
    // Create a lookup for category slugs
    const categoryMap = new Map();
    cSnap.docs.forEach(doc => categoryMap.set(doc.id, doc.data().slug));

    pSnap.docs.forEach(doc => {
      const p = doc.data();
      const catSlug = categoryMap.get(p.categoryId) || 'misc';
      routes.push({
        url: `${baseUrl}/projects/${catSlug}/${p.slug}`,
        lastModified: new Date(p.updatedAt || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  } catch (e) {
    console.error('Sitemap generation error:', e);
  }

  return routes;
}
