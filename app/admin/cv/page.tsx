'use client';

import React, { useState, useEffect } from 'react';
import { CVData } from '@/lib/types';
import { getDocument, setDocument } from '@/lib/firebase/firestore';

const defaultCV: CVData = {
  personalInfo: { fullName: '', title: '', summary: '', email: '', phone: '', location: '', photoUrl: '', website: '', linkedin: '' },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  meta: { pdfUrl: '', lastGeneratedAt: '', version: 0 }
};

export default function CVEditor() {
  const [data, setData] = useState<CVData>(defaultCV);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function loadData() {
      const doc = await getDocument<CVData>('cv', 'main');
      if (doc) setData(doc);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    await setDocument('cv', 'main', data);
    setSaving(false);
  };

  const handleGenerate = async () => {
    // Save first just in case
    await handleSave();
    
    setGenerating(true);
    try {
      const res = await fetch('/api/cv/generate', { method: 'POST' });
      const result = await res.json();
      if (result.success) {
        setData({ ...data, meta: { ...data.meta, pdfUrl: result.url, lastGeneratedAt: new Date().toISOString() }});
        alert('PDF generated successfully!');
      } else {
        alert('Failed to generate PDF');
      }
    } catch (e) {
      alert('Error generating PDF');
    }
    setGenerating(false);
  };

  if (loading) return <div>Loading CV Engine...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CV Engine</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your structured resume data and generate standard PDFs.</p>
        </div>
        <div className="space-x-4">
          {data.meta.pdfUrl && (
            <a href={data.meta.pdfUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
              View Current PDF
            </a>
          )}
          <button onClick={handleGenerate} disabled={generating} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 text-sm font-medium">
            {generating ? 'Generating...' : 'Generate PDF'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Personal Info */}
        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Personal Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" value={data.personalInfo.fullName} onChange={(e) => setData({...data, personalInfo: {...data.personalInfo, fullName: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" value={data.personalInfo.title} onChange={(e) => setData({...data, personalInfo: {...data.personalInfo, title: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Summary</label>
              <textarea value={data.personalInfo.summary} onChange={(e) => setData({...data, personalInfo: {...data.personalInfo, summary: e.target.value}})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm" rows={3}></textarea>
            </div>
          </div>
        </div>

        {/* Experience - simplified for brevity, ideally broken out into a subcomponent */}
        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <h2 className="text-lg font-semibold">Experience</h2>
            <button type="button" onClick={() => setData({...data, experience: [...data.experience, { id: Date.now().toString(), company: '', role: '', location: '', startDate: '', endDate: '', current: false, bullets: [''] }]})} className="text-sm text-blue-600 font-medium">Add Role</button>
          </div>
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded-md space-y-4 relative">
              <button type="button" onClick={() => { const exps = [...data.experience]; exps.splice(index, 1); setData({...data, experience: exps}); }} className="absolute top-4 right-4 text-xs text-red-600">Remove</button>
              <div className="grid grid-cols-2 gap-4 pr-12">
                <input type="text" placeholder="Company" value={exp.company} onChange={(e) => { const exps = [...data.experience]; exps[index].company = e.target.value; setData({...data, experience: exps}); }} className="border border-gray-300 p-2 rounded-md sm:text-sm" />
                <input type="text" placeholder="Role" value={exp.role} onChange={(e) => { const exps = [...data.experience]; exps[index].role = e.target.value; setData({...data, experience: exps}); }} className="border border-gray-300 p-2 rounded-md sm:text-sm" />
                <input type="text" placeholder="Start Date (e.g. Jan 2020)" value={exp.startDate} onChange={(e) => { const exps = [...data.experience]; exps[index].startDate = e.target.value; setData({...data, experience: exps}); }} className="border border-gray-300 p-2 rounded-md sm:text-sm" />
                <input type="text" placeholder="End Date (e.g. Present)" value={exp.endDate} onChange={(e) => { const exps = [...data.experience]; exps[index].endDate = e.target.value; setData({...data, experience: exps}); }} className="border border-gray-300 p-2 rounded-md sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bullets (one per line)</label>
                <textarea value={exp.bullets.join('\n')} onChange={(e) => { const exps = [...data.experience]; exps[index].bullets = e.target.value.split('\n'); setData({...data, experience: exps}); }} className="w-full border border-gray-300 p-2 rounded-md sm:text-sm" rows={4}></textarea>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <h2 className="text-lg font-semibold">Education</h2>
            <button type="button" onClick={() => setData({...data, education: [...data.education, { id: Date.now().toString(), school: '', degree: '', field: '', startDate: '', endDate: '' }]})} className="text-sm text-blue-600 font-medium">Add Education</button>
          </div>
          {data.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border border-gray-200 rounded-md grid grid-cols-2 gap-4 relative pr-12">
              <button type="button" onClick={() => { const edus = [...data.education]; edus.splice(index, 1); setData({...data, education: edus}); }} className="absolute top-4 right-4 text-xs text-red-600">Remove</button>
              <input type="text" placeholder="School" value={edu.school} onChange={(e) => { const edus = [...data.education]; edus[index].school = e.target.value; setData({...data, education: edus}); }} className="border border-gray-300 p-2 rounded-md sm:text-sm" />
              <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => { const edus = [...data.education]; edus[index].degree = e.target.value; setData({...data, education: edus}); }} className="border border-gray-300 p-2 rounded-md sm:text-sm" />
              <input type="text" placeholder="Start Date" value={edu.startDate} onChange={(e) => { const edus = [...data.education]; edus[index].startDate = e.target.value; setData({...data, education: edus}); }} className="border border-gray-300 p-2 rounded-md sm:text-sm" />
              <input type="text" placeholder="End Date" value={edu.endDate} onChange={(e) => { const edus = [...data.education]; edus[index].endDate = e.target.value; setData({...data, education: edus}); }} className="border border-gray-300 p-2 rounded-md sm:text-sm" />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 disabled:opacity-50 shadow-sm font-medium">
            {saving ? 'Saving Data...' : 'Save CV Data'}
          </button>
        </div>
      </form>
    </div>
  );
}
