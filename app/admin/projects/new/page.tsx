import React from 'react';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">New Project</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new portfolio piece.</p>
      </div>
      <ProjectForm />
    </div>
  );
}
