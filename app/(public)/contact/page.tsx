'use client';

import React, { useState, useEffect } from 'react';

// Normally you'd fetch ContactContent from Firestore server-side, 
// but since this is a client component for the form, we can either pass props from a server component
// or just fetch it on the client. For a contact form page, doing a simple client fetch is fine for the static text,
// or better yet, split the form into a client component.
// For simplicity in this structure, we'll keep it as a client component and fetch the CMS content on mount.
import { getDocument } from '@/lib/firebase/firestore';
import { ContactContent } from '@/lib/types';

export default function ContactPage() {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', projectType: '', budgetRange: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function load() {
      const data = await getDocument<ContactContent>('siteContent', 'contact');
      if (data) setContent(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact_page' })
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', projectType: '', budgetRange: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info (CMS Driven) */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {content?.contactDetails?.heading || "Let's build something."}
          </h1>
          <p className="text-lg text-gray-600 whitespace-pre-wrap">
            {content?.contactDetails?.body || "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions."}
          </p>
          {content?.contactDetails?.address && (
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Location</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{content.contactDetails.address}</p>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-2xl">
          {status === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-gray-600">Thanks for reaching out. I'll get back to you within 24-48 hours.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-sm font-medium text-black border-b border-black pb-1 hover:text-gray-600">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-gray-300 rounded-md p-3 focus:ring-black focus:border-black" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border-gray-300 rounded-md p-3 focus:ring-black focus:border-black" placeholder="jane@example.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Project Type</label>
                  <select value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})} className="w-full border-gray-300 rounded-md p-3 focus:ring-black focus:border-black text-gray-700 bg-white">
                    <option value="">Select...</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Web App Development">Web App Development</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Budget Range</label>
                  <select value={formData.budgetRange} onChange={e => setFormData({...formData, budgetRange: e.target.value})} className="w-full border-gray-300 rounded-md p-3 focus:ring-black focus:border-black text-gray-700 bg-white">
                    <option value="">Select...</option>
                    <option value="< $5k">&lt; $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k+">$10k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Message *</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full border-gray-300 rounded-md p-3 focus:ring-black focus:border-black" placeholder="Tell me about your project..."></textarea>
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm">Something went wrong sending your message. Please try again.</p>
              )}

              <button type="submit" disabled={status === 'submitting'} className="w-full bg-black text-white rounded-md py-4 font-bold hover:bg-gray-800 disabled:opacity-70 transition-colors">
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
