import React from 'react';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-bold text-xl">Portfolio CMS</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="/admin" className="block px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-900">Overview</a>
          <a href="/admin/content/home" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Home Page</a>
          <a href="/admin/content/about" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">About Page</a>
          <a href="/admin/projects" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Projects</a>
          <a href="/admin/leads" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Leads</a>
          <a href="/admin/cv" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">CV Engine</a>
          <a href="/admin/media" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Media Library</a>
          <a href="/admin/settings" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Sign Out</button>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
