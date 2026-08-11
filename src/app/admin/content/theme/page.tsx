"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import toast from "react-hot-toast";

export default function ThemeContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    fontFamily: "'levenimmt', 'Levenim MT', 'Levenim', sans-serif",
    light: {
      bgBase: "#f5f5f5",
      textBase: "#0a0a0a"
    },
    dark: {
      bgBase: "#0a0a0a",
      textBase: "#f5f5f5"
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "siteSettings", "theme");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData({ ...data, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "siteSettings", "theme"), data);
      toast.success("Theme settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save theme settings.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof typeof data, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateColor = (mode: "light" | "dark", key: "bgBase" | "textBase", value: string) => {
    setData((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [key]: value
      }
    }));
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Theme Configuration
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Manage your site's global typography and color palette.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-12">
        {/* Typography */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Typography
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CSS Font Family Stack</label>
              <input 
                type="text" 
                value={data.fontFamily} 
                onChange={(e) => updateField("fontFamily", e.target.value)} 
                className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" 
                placeholder="'Inter', sans-serif" 
              />
              <p className="text-[10px] text-gray-400 mt-2">Example: <code>'Inter', sans-serif</code> or <code>'levenimmt', 'Levenim MT', sans-serif</code>.</p>
            </div>
          </div>
        </section>

        {/* Color Palette (Light Mode) */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Light Mode Palette
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Background Color</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="color" 
                  value={data.light.bgBase} 
                  onChange={(e) => updateColor("light", "bgBase", e.target.value)} 
                  className="w-12 h-12 bg-transparent border-0 p-0 cursor-pointer" 
                />
                <input 
                  type="text" 
                  value={data.light.bgBase} 
                  onChange={(e) => updateColor("light", "bgBase", e.target.value)} 
                  className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white uppercase" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Text & Primary Accent</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="color" 
                  value={data.light.textBase} 
                  onChange={(e) => updateColor("light", "textBase", e.target.value)} 
                  className="w-12 h-12 bg-transparent border-0 p-0 cursor-pointer" 
                />
                <input 
                  type="text" 
                  value={data.light.textBase} 
                  onChange={(e) => updateColor("light", "textBase", e.target.value)} 
                  className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white uppercase" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette (Dark Mode) */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Dark Mode Palette
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Background Color</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="color" 
                  value={data.dark.bgBase} 
                  onChange={(e) => updateColor("dark", "bgBase", e.target.value)} 
                  className="w-12 h-12 bg-transparent border-0 p-0 cursor-pointer" 
                />
                <input 
                  type="text" 
                  value={data.dark.bgBase} 
                  onChange={(e) => updateColor("dark", "bgBase", e.target.value)} 
                  className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white uppercase" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Text & Primary Accent</label>
              <div className="flex gap-4 items-center">
                <input 
                  type="color" 
                  value={data.dark.textBase} 
                  onChange={(e) => updateColor("dark", "textBase", e.target.value)} 
                  className="w-12 h-12 bg-transparent border-0 p-0 cursor-pointer" 
                />
                <input 
                  type="text" 
                  value={data.dark.textBase} 
                  onChange={(e) => updateColor("dark", "textBase", e.target.value)} 
                  className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white uppercase" 
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
