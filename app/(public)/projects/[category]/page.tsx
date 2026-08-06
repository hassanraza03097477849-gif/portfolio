import React from 'react';
import { adminDb } from '@/lib/firebase/admin';
import { Project, Category } from '@/lib/types';
import Link from 'next/link';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { category: string } }) {
  return { title: `${params.category} - Portfolio` };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  let projects: Project[] = [];
  let categories: Category[] = [];
  let currentCat: Category | null = null;

  try {
    const cSnap = await adminDb.collection('categories').orderBy('order', 'asc').get();
    categories = cSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Category));
    currentCat = categories.find(c => c.slug === params.category) || null;

    if (currentCat) {
      const pSnap = await adminDb.collection('projects')
        .where('status', '==', 'published')
        .where('categoryId', '==', currentCat.id)
        .orderBy('order', 'asc')
        .get();
      projects = pSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Project));
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 md:px-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {currentCat ? currentCat.name : 'Unknown Category'}
        </h1>
        
        {/* Category Filter */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <Link href="/projects" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            All
          </Link>
          {categories.map(c => (
            <Link key={c.id} href={`/projects/${c.slug}`} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${c.slug === params.category ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(p => (
          <Link href={`/projects/${params.category}/${p.slug}`} key={p.id} className="group block space-y-4">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-lg relative">
              {p.coverImageUrl && <img src={p.coverImageUrl} alt={p.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{p.categoryName}</p>
              <h3 className="text-xl font-bold text-gray-900 group-hover:underline">{p.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">{p.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      {projects.length === 0 && <p className="text-gray-500">No projects in this category yet.</p>}
    </div>
  );
}
