import React from 'react';

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">New Leads</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Published Projects</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">CV Last Generated</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">Never</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">SEO Checklist Score</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">N/A</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-4">
          <a href="/admin/projects/new" className="text-blue-600 hover:underline">Add New Project &rarr;</a>
          <a href="/admin/cv" className="text-blue-600 hover:underline">Update CV Data &rarr;</a>
          <a href="/admin/content/home" className="text-blue-600 hover:underline">Edit Home Page &rarr;</a>
          <a href="/admin/content/about" className="text-blue-600 hover:underline">Edit About Page &rarr;</a>
          <a href="/admin/settings" className="text-blue-600 hover:underline">Site Settings &rarr;</a>
        </div>
      </div>
    </div>
  );
}
