import { MetadataRoute } from 'next';
import { getAdminDb } from '@/lib/firebase/admin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: 'https://hassanraza.portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];

  try {
    const projectsSnapshot = await getAdminDb().collection("projects").get();
    projectsSnapshot.docs.forEach((doc) => {
      sitemapData.push({
        url: `https://hassanraza.portfolio/projects/${doc.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error("Sitemap error:", error);
  }

  return sitemapData;
}
