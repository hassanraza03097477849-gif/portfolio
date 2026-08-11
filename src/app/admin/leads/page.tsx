"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
      if (!selectedLead && leadsData.length > 0) {
        setSelectedLead(leadsData[0]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = async (leadId: string) => {
    try {
      await updateDoc(doc(db, "leads", leadId), { status: "read" });
    } catch (error) {
      console.error("Error marking lead as read:", error);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteDoc(doc(db, "leads", leadId));
        if (selectedLead?.id === leadId) setSelectedLead(null);
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading leads...</div>;

  return (
    <div className="max-w-7xl h-[calc(100vh-10rem)] flex flex-col">
      <div className="mb-8 flex-shrink-0">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
          Leads Inbox
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
          Manage contact form submissions and job inquiries.
        </p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Pane - List */}
        <div className="w-1/3 flex flex-col bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] text-[10px] font-bold uppercase tracking-widest text-gray-500 flex justify-between items-center flex-shrink-0">
            <span>Inbox ({leads.length})</span>
            <i className="fa-solid fa-filter"></i>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-zinc-800">
            {leads.length === 0 && <div className="p-6 text-sm text-gray-500">No leads found.</div>}
            {leads.map((lead) => (
              <div 
                key={lead.id} 
                onClick={() => {
                  setSelectedLead(lead);
                  if (lead.status === "new") markAsRead(lead.id);
                }}
                className={`p-6 cursor-pointer transition-colors ${
                  selectedLead?.id === lead.id 
                    ? "bg-black text-white dark:bg-white dark:text-black border-l-4 border-black dark:border-white" 
                    : "hover:bg-gray-50 dark:hover:bg-zinc-900 border-l-4 border-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`font-bold ${selectedLead?.id === lead.id ? "text-white dark:text-black" : "text-black dark:text-white"}`}>
                    {lead.name}
                  </div>
                  {lead.status === "new" && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <div className={`text-xs mb-3 ${selectedLead?.id === lead.id ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"}`}>
                  {lead.company || "N/A"} • {lead.role || "N/A"}
                </div>
                <div className={`text-sm truncate ${selectedLead?.id === lead.id ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-400"}`}>
                  {lead.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane - Detail */}
        {selectedLead ? (
          <div className="w-2/3 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center flex-shrink-0">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{selectedLead.inquiry_type}</div>
                <h2 className="text-2xl font-black tracking-tight">{selectedLead.name}</h2>
              </div>
              <div className="flex gap-2">
                <a 
                  href={`mailto:${selectedLead.email}`}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  <i className="fa-solid fa-reply"></i>
                </a>
                <button onClick={() => handleDelete(selectedLead.id)} className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-red-500">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>

            <div className="p-8 flex-1">
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</div>
                  <div className="text-sm font-semibold">{selectedLead.email}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Company / Organization</div>
                  <div className="text-sm font-semibold">{selectedLead.company || "N/A"}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Role / Position</div>
                  <div className="text-sm font-semibold">{selectedLead.role || "N/A"}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Date Received</div>
                  <div className="text-sm font-semibold">
                    {selectedLead.createdAt?.toDate ? selectedLead.createdAt.toDate().toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Message Details</div>
                <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-2/3 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500">
            Select a lead to view details
          </div>
        )}
      </div>
    </div>
  );
}
