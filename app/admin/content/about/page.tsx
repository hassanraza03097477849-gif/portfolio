'use client';

import React, { useState, useEffect } from 'react';
import { HomeContent } from '@/lib/types';
import { getDocument, setDocument } from '@/lib/firebase/firestore';

const defaultContent: HomeContent = {
  hero: { heading: '', subheading: '', ctaText: '', ctaLink: '', backgroundImageUrl: '' },
  intro: { heading: '', body: '' },
  servicesTeaser: { heading: '', items: [] },
  seo: { metaTitle: '', metaDescription: '', ogImage: '' }
};

export default function AboutContentEditor() {
  const [content, setContent] = useState<HomeContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument<HomeContent>('siteContent', 'about');
      if (data) setContent(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await setDocument('siteContent', 'about', content);
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/about' })
    });
    setSaving(false);
    alert('Saved and revalidated successfully');
  };

  if (loading) return <div>Loading About Page Editor...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Edit About Page</h1>
        <p className="text-sm text-gray-500 mt-1">Manage the content and SEO tags for the public about page.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* HERO SECTION */}
        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Heading</label>
              <input type="text" value={content.hero?.heading || ''} onChange={(e) => setContent({...content, hero: {...content.hero, heading: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subheading / Bio</label>
              <textarea value={content.hero?.subheading || ''} onChange={(e) => setContent({...content, hero: {...content.hero, subheading: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" rows={6}></textarea>
            </div>
          </div>
        </div>

        {/* INTRO SECTION */}
        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Additional Section (Optional)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Heading</label>
              <input type="text" value={content.intro?.heading || ''} onChange={(e) => setContent({...content, intro: {...content.intro, heading: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Body</label>
              <textarea value={content.intro?.body || ''} onChange={(e) => setContent({...content, intro: {...content.intro, body: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" rows={4}></textarea>
            </div>
          </div>
        </div>

        {/* SEO SECTION */}
        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">SEO Fields</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Title</label>
              <input type="text" value={content.seo?.metaTitle || ''} onChange={(e) => setContent({...content, seo: {...content.seo, metaTitle: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description</label>
              <textarea value={content.seo?.metaDescription || ''} onChange={(e) => setContent({...content, seo: {...content.seo, metaDescription: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" rows={2}></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
