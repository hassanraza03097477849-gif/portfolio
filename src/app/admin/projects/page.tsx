"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import toast from "react-hot-toast";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "projects", id));
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete project");
      }
    }
  };

  if (loading) return <div className="p-8">Loading projects...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-end mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Projects Manager
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Manage your portfolio case studies, categories, and technical stack details.
          </p>
        </div>
        <Link
          href="/admin/projects/edit"
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> New Project
        </Link>
      </div>

      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <div className="col-span-5">Project Details</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2">Year</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-zinc-800">
            {projects.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">No projects found. Add one above!</div>
            ) : projects.map((project) => (
              <div key={project.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-16 h-12 bg-gray-200 dark:bg-zinc-800 relative overflow-hidden flex-shrink-0 border border-gray-200 dark:border-zinc-800">
                    {project.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Img</div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{project.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{project.shortDescription}</div>
                  </div>
                </div>
                
                <div className="col-span-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 dark:border-zinc-800 px-2 py-1 bg-white dark:bg-black">
                    {project.category}
                  </span>
                </div>

                <div className="col-span-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {project.year}
                </div>

                <div className="col-span-2 flex justify-end gap-2">
                  <Link
                    href={`/admin/projects/edit?id=${project.id}`}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    <i className="fa-solid fa-pen text-[10px]"></i>
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500 dark:hover:text-white transition-colors text-red-500"
                  >
                    <i className="fa-solid fa-trash text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
