"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import Link from "next/link";
import toast from "react-hot-toast";

function ProjectEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    title: "",
    category: "",
    year: new Date().getFullYear().toString(),
    shortDescription: "",
    detailedDescription: "",
    features: [] as string[],
    tech: [] as string[],
    link: "",
    github: "",
    image: "",
    isFeatured: false
  });

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const docRef = doc(db, "projects", projectId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData(docSnap.data() as any);
          } else {
            toast.error("Project not found!");
            router.push("/admin/projects");
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [projectId, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const id = projectId || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      if (!id) throw new Error("Title is required to generate an ID");
      
      const docRef = doc(db, "projects", id);
      await setDoc(docRef, { ...data, id });
      
      toast.success("Project saved successfully!");
      router.push("/admin/projects");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            {projectId ? "Edit Project" : "New Project"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Fill in the details for your case study.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/projects" className="border border-gray-200 dark:border-zinc-800 px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </Link>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Core Info */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Core Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Project Title</label>
              <input type="text" required value={data.title} onChange={e => updateField("title", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Category (e.g. Full Stack)</label>
              <input type="text" required value={data.category} onChange={e => updateField("category", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Year</label>
              <input type="text" required value={data.year} onChange={e => updateField("year", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Image URL</label>
              <input type="text" value={data.image} onChange={e => updateField("image", e.target.value)} placeholder="/project_image.jpg" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
          </div>
        </section>

        {/* Descriptions */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Descriptions
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Short Description (for cards)</label>
              <textarea required rows={2} value={data.shortDescription} onChange={e => updateField("shortDescription", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Detailed Description (for case study page)</label>
              <textarea required rows={6} value={data.detailedDescription} onChange={e => updateField("detailedDescription", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white resize-none" />
            </div>
          </div>
        </section>

        {/* Tags & Links */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Tags & Links
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Tech Stack (comma separated)</label>
              <input type="text" value={data.tech.join(", ")} onChange={e => updateField("tech", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Features (comma separated)</label>
              <input type="text" value={data.features.join(", ")} onChange={e => updateField("features", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live URL</label>
              <input type="text" value={data.link} onChange={e => updateField("link", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">GitHub URL</label>
              <input type="text" value={data.github} onChange={e => updateField("github", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 flex items-center gap-4">
            <input 
              type="checkbox" 
              id="isFeatured"
              checked={data.isFeatured}
              onChange={e => updateField("isFeatured", e.target.checked)}
              className="w-4 h-4 accent-black dark:accent-white"
            />
            <label htmlFor="isFeatured" className="text-sm font-bold cursor-pointer select-none">
              Feature this project on the homepage (Max 4 recommended)
            </label>
          </div>
        </section>

      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ProjectEditor />
    </Suspense>
  );
}
