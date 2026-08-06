'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { getCollection, deleteDocument, setDocument } from '@/lib/firebase/firestore';
import { orderBy } from 'firebase/firestore';
import Link from 'next/link';

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getCollection<Project>('projects', [orderBy('order', 'asc')]);
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      await deleteDocument('projects', id);
      loadProjects();
    }
  };

  const toggleStatus = async (p: Project) => {
    const newStatus = p.status === 'draft' ? 'published' : 'draft';
    await setDocument('projects', p.id!, { status: newStatus });
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/projects' })
    });
    loadProjects();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all portfolio projects.</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/projects/categories" className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 font-medium text-sm">
            Manage Categories
          </Link>
          <Link href="/admin/projects/new" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 font-medium text-sm">
            Add New Project
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded bg-cover bg-center" style={{ backgroundImage: p.coverImageUrl ? `url(${p.coverImageUrl})` : 'none' }}></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{p.title}</div>
                      <div className="text-sm text-gray-500">{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => toggleStatus(p)} className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {p.status}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link href={`/admin/projects/${p.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  <button onClick={() => handleDelete(p.id!)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No projects found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
