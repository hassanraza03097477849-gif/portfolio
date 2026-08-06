import React from 'react';
import { adminDb } from '@/lib/firebase/admin';
import { SiteSettings } from '@/lib/types';
import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await adminDb.collection('siteSettings').doc('main').get();
    if (doc.exists) {
      const settings = doc.data() as SiteSettings;
      return {
        title: {
          template: `%s | ${settings.siteName || 'Portfolio'}`,
          default: settings.siteName || 'Portfolio',
        },
        description: settings.tagline || 'Professional Portfolio',
        openGraph: {
          title: settings.siteName || 'Portfolio',
          description: settings.tagline || 'Professional Portfolio',
          url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hassanraza.online',
          siteName: settings.siteName || 'Portfolio',
          images: [
            {
              url: settings.defaultOgImage || '',
              width: 1200,
              height: 630,
            },
          ],
          locale: 'en_US',
          type: 'website',
        },
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
      };
    }
  } catch (e) {
    console.error(e);
  }
  return {
    title: 'Portfolio',
    description: 'Professional Portfolio',
  };
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let settings: SiteSettings | null = null;
  try {
    const doc = await adminDb.collection('siteSettings').doc('main').get();
    if (doc.exists) {
      settings = doc.data() as SiteSettings;
    }
  } catch (e) {
    console.error('Error fetching site settings', e);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings?.ownerName || settings?.siteName || 'Portfolio Owner',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-71fe0.web.app',
    sameAs: [
      settings?.socialLinks?.github,
      settings?.socialLinks?.linkedin,
    ].filter(Boolean),
    jobTitle: 'Professional',
  };

  return (
    <>
      <head>
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <div className="min-h-screen bg-white text-black flex flex-col font-sans">
        <header className="py-6 px-4 md:px-8 flex justify-between items-center border-b border-gray-100">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {settings?.siteName || 'Portfolio'}
          </Link>
          <nav className="space-x-6 text-sm font-medium">
            <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
            <Link href="/projects" className="hover:text-gray-600 transition-colors">Work</Link>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
            <a href="/api/cv/download" target="_blank" rel="noreferrer" className="hover:text-gray-600 transition-colors font-bold">Resume</a>
          </nav>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="py-12 px-4 md:px-8 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {settings?.ownerName || 'Portfolio'}. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            {settings?.socialLinks?.github && <a href={settings.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-black">GitHub</a>}
            {settings?.socialLinks?.linkedin && <a href={settings.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-black">LinkedIn</a>}
          </div>
        </footer>
      </div>
    </>
  );
}
