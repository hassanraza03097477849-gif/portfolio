import React from 'react';
import { adminDb } from '@/lib/firebase/admin';
import { HomeContent } from '@/lib/types';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await adminDb.collection('siteContent').doc('home').get();
    if (doc.exists) {
      const data = doc.data() as HomeContent;
      return {
        title: data.seo?.metaTitle || 'Home',
        description: data.seo?.metaDescription || '',
      };
    }
  } catch (e) {
    console.error(e);
  }
  return { title: 'Home' };
}

export default async function HomePage() {
  let content: HomeContent | null = null;
  try {
    const doc = await adminDb.collection('siteContent').doc('home').get();
    if (doc.exists) {
      content = doc.data() as HomeContent;
    }
  } catch (e) {
    console.error('Error fetching home content', e);
  }

  if (!content) {
    return <div className="p-8 text-center">Loading or no content...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          {content.hero?.heading || 'Welcome.'}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-10">
          {content.hero?.subheading}
        </p>
        {content.hero?.ctaText && (
          <Link href={content.hero.ctaLink || '/projects'} className="inline-block bg-black text-white px-8 py-4 text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors">
            {content.hero.ctaText}
          </Link>
        )}
      </section>

      {/* Intro */}
      {(content.intro?.heading || content.intro?.body) && (
        <section className="py-20 px-4 md:px-8 bg-gray-50 w-full">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{content.intro.heading}</h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
              {content.intro.body}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
