'use client';

import React, { useEffect, useState } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import { getDocument } from '@/lib/firebase/firestore';
import { Project } from '@/lib/types';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const p = await getDocument<Project>('projects', id as string);
      if (p) setProject({ ...p, id: id as string });
      setLoading(false);
    }
    fetch();
  }, [id]);

  if (loading) return <div>Loading project...</div>;
  if (!project) return <div>Project not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
        <p className="text-sm text-gray-500 mt-1">Update portfolio piece details.</p>
      </div>
      <ProjectForm initialData={project} />
    </div>
  );
}
