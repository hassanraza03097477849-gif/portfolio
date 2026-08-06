'use client';

import React, { useState, useEffect } from 'react';
import { Category } from '@/lib/types';
import { getCollection, addDocument, setDocument, deleteDocument } from '@/lib/firebase/firestore';
import { orderBy } from 'firebase/firestore';

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '' });

  const loadCategories = async () => {
    setLoading(true);
    const data = await getCollection<Category>('categories', [orderBy('order', 'asc')]);
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const catData: Category = {
      ...newCat,
      order: categories.length
    };
    await addDocument('categories', catData);
    setNewCat({ name: '', slug: '', description: '' });
    loadCategories();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this category?')) {
      await deleteDocument('categories', id);
      loadCategories();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-sm text-gray-500 mt-1">Manage project categories.</p>
      </div>

      <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Add Category</h2>
        <form onSubmit={handleAdd} className="flex space-x-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input required type="text" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input required type="text" value={newCat.slug} onChange={e => setNewCat({...newCat, slug: e.target.value})} className="mt-1 block w-full border border-gray-300 p-2 rounded-md sm:text-sm" />
          </div>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 h-[38px]">
            Add
          </button>
        </form>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cat.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(cat.id!)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">No categories found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
