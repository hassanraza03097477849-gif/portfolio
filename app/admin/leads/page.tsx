'use client';

import React, { useState, useEffect } from 'react';
import { Lead } from '@/lib/types';
import { getCollection, setDocument, deleteDocument } from '@/lib/firebase/firestore';
import { orderBy, where } from 'firebase/firestore';

export default function LeadsInbox() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const loadLeads = async () => {
    setLoading(true);
    const constraints: any[] = [orderBy('createdAt', 'desc')];
    if (filter !== 'all') {
      constraints.push(where('status', '==', filter));
    }
    const data = await getCollection<Lead>('leads', constraints);
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, [filter]);

  const updateStatus = async (leadId: string, status: Lead['status']) => {
    await setDocument('leads', leadId, { status });
    loadLeads();
  };

  const markRead = async (leadId: string, read: boolean) => {
    await setDocument('leads', leadId, { read });
    loadLeads();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this lead forever?')) {
      await deleteDocument('leads', id);
      loadLeads();
    }
  };

  if (loading) return <div>Loading inbox...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Inbox</h1>
          <p className="text-sm text-gray-500 mt-1">Manage contact inquiries and client requests.</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-300 rounded-md p-2 text-sm focus:ring-black focus:border-black">
          <option value="all">All Leads</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No leads found in this view.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {leads.map(lead => (
              <li key={lead.id} className={`p-6 ${lead.read ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className={`h-2 w-2 rounded-full ${lead.read ? 'bg-transparent' : 'bg-blue-600'}`}></span>
                      <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
                      <span className="text-sm text-gray-500">{new Date(lead.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="pl-5 text-sm text-gray-600 space-x-4">
                      <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">{lead.email}</a>
                      {lead.phone && <span>{lead.phone}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select 
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id!, e.target.value as Lead['status'])}
                      className={`text-xs font-semibold rounded-full px-3 py-1 border-0 ring-1 ring-inset focus:ring-2 focus:ring-black ${
                        lead.status === 'new' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                        lead.status === 'contacted' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                        lead.status === 'qualified' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                        'bg-gray-50 text-gray-600 ring-gray-500/20'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button onClick={() => markRead(lead.id!, !lead.read)} className="text-xs font-medium text-gray-500 hover:text-black">
                      {lead.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button onClick={() => handleDelete(lead.id!)} className="text-xs font-medium text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-4 pl-5">
                  <div className="bg-white border border-gray-200 rounded-md p-4 text-sm text-gray-700 whitespace-pre-wrap">
                    {lead.message}
                  </div>
                  {(lead.projectType || lead.budgetRange) && (
                    <div className="mt-3 flex space-x-4 text-xs font-medium text-gray-500">
                      {lead.projectType && <span>Type: {lead.projectType}</span>}
                      {lead.budgetRange && <span>Budget: {lead.budgetRange}</span>}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
