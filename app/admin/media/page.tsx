'use client';

import React, { useState, useEffect } from 'react';
import { listAllFiles, deleteFile } from '@/lib/firebase/storage';

interface MediaFile {
  name: string;
  fullPath: string;
  url: string;
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    setLoading(true);
    try {
      // Load from the two main folders we created
      const projectFiles = await listAllFiles('projects');
      setFiles([...projectFiles]);
    } catch (e) {
      console.error('Error loading media', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleDelete = async (fullPath: string) => {
    if (confirm('Are you sure you want to permanently delete this file? This could break links on your live site.')) {
      await deleteFile(fullPath);
      loadFiles();
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  if (loading) return <div>Loading Media Library...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <p className="text-sm text-gray-500 mt-1">Manage images and assets uploaded to Firebase Storage.</p>
      </div>

      {files.length === 0 ? (
        <div className="bg-white p-8 text-center border border-gray-200 rounded-lg text-gray-500">
          No media files found in the 'projects' directory.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {files.map(f => (
            <div key={f.fullPath} className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm">
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative group">
                <img src={f.url} alt={f.name} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-2">
                  <button onClick={() => handleCopy(f.url)} className="bg-white text-black p-2 rounded text-xs font-bold hover:bg-gray-200">Copy URL</button>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 flex justify-between items-center bg-gray-50">
                <p className="text-xs text-gray-700 truncate mr-2" title={f.name}>{f.name}</p>
                <button onClick={() => handleDelete(f.fullPath)} className="text-red-500 hover:text-red-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
