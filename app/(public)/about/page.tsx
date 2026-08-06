import React from 'react';
import { adminDb } from '@/lib/firebase/admin';
import { HomeContent } from '@/lib/types';
import { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await adminDb.collection('siteContent').doc('about').get();
    if (doc.exists) {
      const data = doc.data() as HomeContent;
      return {
        title: data.seo?.metaTitle || 'About',
        description: data.seo?.metaDescription || 'About me',
      };
    }
  } catch (e) {
    console.error(e);
  }
  return { title: 'About' };
}

export default async function AboutPage() {
  let content: HomeContent | null = null;
  try {
    const doc = await adminDb.collection('siteContent').doc('about').get();
    if (doc.exists) {
      content = doc.data() as HomeContent;
    }
  } catch (e) {
    console.error('Error fetching about content', e);
  }

  if (!content) {
    return <div className="p-8 text-center">Loading or no content...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          {content.hero?.heading || 'About Me.'}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-10 whitespace-pre-wrap">
          {content.hero?.subheading}
        </p>
      </section>

      {/* Intro */}
      {(content.intro?.heading || content.intro?.body) && (
        <section className="py-20 px-4 md:px-8 bg-gray-50 w-full">
          <div className="max-w-4xl mx-auto">
            {content.intro?.heading && (
              <h2 className="text-3xl font-bold mb-6">{content.intro.heading}</h2>
            )}
            {content.intro?.body && (
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content.intro.body}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
