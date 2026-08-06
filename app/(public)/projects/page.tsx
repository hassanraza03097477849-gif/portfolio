import React from 'react';
import { adminDb } from '@/lib/firebase/admin';
import { Project, Category } from '@/lib/types';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata = {
  title: 'Work - Portfolio',
  description: 'View my latest projects and case studies.',
};

export default async function ProjectsIndex() {
  let projects: Project[] = [];
  let categories: Category[] = [];

  try {
    const pSnap = await adminDb.collection('projects').where('status', '==', 'published').orderBy('order', 'asc').get();
    projects = pSnap.docs.map(d => ({ id: d.id, ...d.data() } as Project));

    const cSnap = await adminDb.collection('categories').orderBy('order', 'asc').get();
    categories = cSnap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 md:px-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Selected Work</h1>
        
        {/* Category Filter */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <Link href="/projects" className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium whitespace-nowrap">
            All
          </Link>
          {categories.map(c => (
            <Link key={c.id} href={`/projects/${c.slug}`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(p => {
          const categorySlug = categories.find(c => c.id === p.categoryId)?.slug || 'misc';
          return (
            <Link href={`/projects/${categorySlug}/${p.slug}`} key={p.id} className="group block space-y-4">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-lg relative">
                {p.coverImageUrl ? (
                  <img src={p.coverImageUrl} alt={p.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{p.categoryName}</p>
                <h3 className="text-xl font-bold text-gray-900 group-hover:underline">{p.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{p.summary}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {projects.length === 0 && <p className="text-gray-500">No projects published yet.</p>}
    </div>
  );
}
