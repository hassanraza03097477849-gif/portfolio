"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [unreadLeads, setUnreadLeads] = useState<number>(0);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Projects Count
        const projectsSnap = await getDocs(collection(db, "projects"));
        setProjectsCount(projectsSnap.size);

        // Fetch Unread Leads Count (assuming status field exists)
        const unreadQ = query(collection(db, "leads"), where("status", "==", "unread"));
        const unreadSnap = await getDocs(unreadQ);
        setUnreadLeads(unreadSnap.size);

        // Fetch Recent Leads
        const recentQ = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(3));
        const recentSnap = await getDocs(recentQ);
        const leadsData = recentSnap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Unknown",
            role: data.subject || "No Subject",
            time: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : "Just now"
          };
        });
        setRecentLeads(leadsData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateCV = () => {
    window.open("/api/cv/generate", "_blank");
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
          System Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
          Real-time metrics and administration controls for your portfolio.
        </p>
      </div>

      {/* Massive Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8 hover:border-black dark:hover:border-white transition-colors group">
          <div className="flex justify-between items-start mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live Projects</span>
            <i className="fa-solid fa-briefcase text-gray-300 dark:text-zinc-700 group-hover:text-black dark:group-hover:text-white transition-colors"></i>
          </div>
          <div className="text-6xl font-black tracking-tighter">{projectsCount}</div>
          <div className="text-xs font-semibold text-gray-400 mt-2">Active portfolio items</div>
        </div>

        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8 hover:border-black dark:hover:border-white transition-colors group">
          <div className="flex justify-between items-start mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Unread Leads</span>
            {unreadLeads > 0 && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
          </div>
          <div className="text-6xl font-black tracking-tighter">{unreadLeads}</div>
          <div className="text-xs font-semibold text-gray-400 mt-2">{unreadLeads > 0 ? "Requires immediate attention" : "All caught up"}</div>
        </div>

        <div className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white p-8">
          <div className="flex justify-between items-start mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">System Status</span>
            <i className="fa-solid fa-bolt text-white dark:text-black"></i>
          </div>
          <div className="text-6xl font-black tracking-tighter text-[#0D7961]">OK</div>
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-2">All services operational</div>
        </div>
      </div>

      {/* Recent Activity Mock */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest mb-6">Recent Inquiries</h2>
          <div className="space-y-4">
            {recentLeads.length > 0 ? recentLeads.map((lead, i) => (
              <Link href={`/admin/leads`} key={i}>
                <div className="p-4 mb-4 bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 flex justify-between items-center group cursor-pointer hover:border-black dark:hover:border-white transition-colors">
                  <div>
                    <div className="text-sm font-bold">{lead.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{lead.role}</div>
                  </div>
                  <div className="text-xs text-gray-400 font-semibold">{lead.time}</div>
                </div>
              </Link>
            )) : (
              <div className="text-sm text-gray-500">No recent inquiries found.</div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-widest mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/projects" className="h-32 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group">
              <i className="fa-solid fa-plus text-xl text-gray-400 group-hover:text-white dark:group-hover:text-black"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">New Project</span>
            </Link>
            <button onClick={handleGenerateCV} className="h-32 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group">
              <i className="fa-solid fa-file-pdf text-xl text-gray-400 group-hover:text-white dark:group-hover:text-black"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">Preview CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
