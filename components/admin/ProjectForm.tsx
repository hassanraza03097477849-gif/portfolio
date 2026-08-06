'use client';

import React, { useState, useEffect } from 'react';
import { Project, Category } from '@/lib/types';
import { addDocument, setDocument, getCollection } from '@/lib/firebase/firestore';
import { uploadFile } from '@/lib/firebase/storage';
import { useRouter } from 'next/navigation';

interface ProjectFormProps {
  initialData?: Project;
}

const defaultProject: Project = {
  title: '', slug: '', categoryId: '', categoryName: '', summary: '', description: '',
  coverImageUrl: '', gallery: [], tags: [], technologies: [], featured: false,
  status: 'draft', order: 0, seo: { metaTitle: '', metaDescription: '', ogImage: '' },
  createdAt: Date.now(), updatedAt: Date.now()
};

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [project, setProject] = useState<Project>(initialData || defaultProject);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const cats = await getCollection<Category>('categories');
      setCategories(cats);
    }
    load();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const path = `projects/${Date.now()}_${file.name}`;
    const url = await uploadFile(path, file);
    setProject({ ...project, coverImageUrl: url });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Auto-fill category name for denormalization
    const cat = categories.find(c => c.id === project.categoryId);
    const finalProject = {
      ...project,
      categoryName: cat ? cat.name : '',
      updatedAt: Date.now()
    };

    if (project.id) {
      await setDocument('projects', project.id, finalProject);
    } else {
      await addDocument('projects', finalProject);
    }

    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/projects' })
    });

    setSaving(false);
    router.push('/admin/projects');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
        <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Basic Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input required type="text" value={project.title} onChange={e => setProject({...project, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input required type="text" value={project.slug} onChange={e => setProject({...project, slug: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select required value={project.categoryId} onChange={e => setProject({...project, categoryId: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm">
              <option value="">Select Category...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select required value={project.status} onChange={e => setProject({...project, status: e.target.value as 'draft'|'published'})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Summary (Card text)</label>
            <textarea required value={project.summary} onChange={e => setProject({...project, summary: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm" rows={2}></textarea>
          </div>
        </div>
      </div>

      {/* Media & Content */}
      <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg space-y-4">
        <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Media & Content</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <div className="mt-1 flex items-center space-x-4">
            {project.coverImageUrl && <img src={project.coverImageUrl} alt="Cover" className="h-20 w-32 object-cover rounded border" />}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description (Markdown)</label>
          <textarea required value={project.description} onChange={e => setProject({...project, description: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm font-mono" rows={8}></textarea>
        </div>
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <button type="button" onClick={() => router.push('/admin/projects')} className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50">Cancel</button>
        <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}
