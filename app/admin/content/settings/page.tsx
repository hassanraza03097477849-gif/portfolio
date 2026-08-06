'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@/lib/types';
import { getDocument, setDocument } from '@/lib/firebase/firestore';

const defaultSettings: SiteSettings = {
  siteName: '',
  tagline: '',
  logoUrl: '',
  faviconUrl: '',
  ownerName: '',
  ownerTitle: '',
  email: '',
  phone: '',
  location: '',
  socialLinks: {},
  themeColor: '#000000',
  defaultOgImage: '',
  analyticsId: '',
  gscVerification: ''
};

export default function SettingsEditor() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument<SiteSettings>('siteSettings', 'main');
      if (data) setSettings(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await setDocument('siteSettings', 'main', settings);
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/' }) // Simplification, would revalidate all paths ideally
    });
    setSaving(false);
    alert('Settings saved successfully');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Global Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage global site settings, contact info, and base SEO configuration.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Identity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Name</label>
              <input type="text" value={settings.siteName || ''} onChange={(e) => setSettings({...settings, siteName: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tagline</label>
              <input type="text" value={settings.tagline || ''} onChange={(e) => setSettings({...settings, tagline: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Owner Name</label>
              <input type="text" value={settings.ownerName || ''} onChange={(e) => setSettings({...settings, ownerName: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Owner Title</label>
              <input type="text" value={settings.ownerTitle || ''} onChange={(e) => setSettings({...settings, ownerTitle: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Contact Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={settings.email || ''} onChange={(e) => setSettings({...settings, email: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" value={settings.phone || ''} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 focus:ring-black focus:border-black rounded-md sm:text-sm" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
