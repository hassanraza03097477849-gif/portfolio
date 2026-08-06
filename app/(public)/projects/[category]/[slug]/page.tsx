import React from 'react';
import { adminDb } from '@/lib/firebase/admin';
import { Project } from '@/lib/types';
import Link from 'next/link';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { category: string, slug: string } }) {
  try {
    const snap = await adminDb.collection('projects').where('slug', '==', params.slug).limit(1).get();
    if (!snap.empty) {
      const p = snap.docs[0].data() as Project;
      return { title: p.seo?.metaTitle || p.title, description: p.seo?.metaDescription || p.summary };
    }
  } catch (e) {}
  return { title: 'Project Not Found' };
}

export default async function ProjectDetailPage({ params }: { params: { category: string, slug: string } }) {
  let project: Project | null = null;
  try {
    const snap = await adminDb.collection('projects').where('slug', '==', params.slug).limit(1).get();
    if (!snap.empty) {
      project = { id: snap.docs[0].id, ...snap.docs[0].data() } as Project;
    }
  } catch (e) {
    console.error(e);
  }

  if (!project) return <div className="p-8 text-center text-xl">Project not found.</div>;

  return (
    <article className="max-w-4xl mx-auto py-16 px-4 md:px-8 space-y-12">
      <div className="space-y-6 text-center">
        <Link href={`/projects/${params.category}`} className="text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-black transition-colors">
          &larr; Back to {project.categoryName}
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{project.title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{project.summary}</p>
      </div>

      {project.coverImageUrl && (
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100">
          <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
        <div className="md:col-span-1 space-y-6">
          {project.client && (
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Client</h3>
              <p className="text-gray-600">{project.client}</p>
            </div>
          )}
          {project.projectDate && (
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Date</h3>
              <p className="text-gray-600">{project.projectDate}</p>
            </div>
          )}
          {project.technologies?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Stack</h3>
              <p className="text-gray-600">{project.technologies.join(', ')}</p>
            </div>
          )}
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sm font-bold border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
              View Live Project &nearr;
            </a>
          )}
        </div>
        
        <div className="md:col-span-3 prose prose-lg prose-gray max-w-none">
          {/* Note: since this is markdown we'd ideally use a parser like react-markdown, 
              but for the sake of simplicity without extra dependencies we are just dumping it. */}
          <div className="whitespace-pre-wrap">{project.description}</div>
        </div>
      </div>
    </article>
  );
}
