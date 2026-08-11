"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import toast from "react-hot-toast";

export default function HeroContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    line1: "Architecting",
    line2: "Digital",
    line3: "Systems.",
    tagline: "Full Stack Engineer based in Karachi, PK.",
    ctaText: "View Case Studies",
    availabilityText: "Available for full-time opportunities",
    marqueeItems: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Node.js"],
    floatingTags: ["Laravel", "Vue.js", "MySQL", "React"],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "siteContent", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as typeof data);
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
      await setDoc(doc(db, "siteContent", "hero"), data);
      toast.success("Hero content saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save hero content.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof typeof data, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMarqueeItem = (idx: number, value: string) => {
    const newItems = [...data.marqueeItems];
    newItems[idx] = value;
    updateField("marqueeItems", newItems);
  };

  const removeMarqueeItem = (idx: number) => {
    updateField("marqueeItems", data.marqueeItems.filter((_, i) => i !== idx));
  };

  const addMarqueeItem = () => {
    updateField("marqueeItems", [...data.marqueeItems, "New Tech"]);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Hero Section
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Manage the primary landing view, typography, and marquees.
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
        {/* Main Headlines */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Massive Typography
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Line 1</label>
              <input type="text" value={data.line1} onChange={(e) => updateField("line1", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-2xl font-black tracking-tighter focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Line 2</label>
              <input type="text" value={data.line2} onChange={(e) => updateField("line2", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-2xl font-black tracking-tighter focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Line 3</label>
              <input type="text" value={data.line3} onChange={(e) => updateField("line3", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-2xl font-black tracking-tighter focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
          </div>
        </section>

        {/* Sub-headline */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Sub-Headline & Description
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Availability Badge Text</label>
              <input type="text" value={data.availabilityText} onChange={(e) => updateField("availabilityText", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Tagline / Location</label>
              <input type="text" value={data.tagline} onChange={(e) => updateField("tagline", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Call to Action Button Text</label>
              <input type="text" value={data.ctaText} onChange={(e) => updateField("ctaText", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
            </div>
          </div>
        </section>

        {/* Floating Tags (up to 4, shown around the photo) */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest border-l-2 border-black dark:border-white pl-4">
                Floating Tech Tags
              </h3>
              <p className="text-[10px] text-gray-400 mt-1 pl-4">Up to 4 tags floating around the profile photo.</p>
            </div>
            <button
              onClick={() => updateField("floatingTags", [...(data.floatingTags || []), "New Tag"])}
              disabled={(data.floatingTags || []).length >= 4}
              className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-800 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-40"
            >
              + Add Tag
            </button>
          </div>
          <div className="space-y-3">
            {(data.floatingTags || []).map((tag: string, idx: number) => (
              <div key={idx} className="flex gap-4">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => {
                    const next = [...(data.floatingTags || [])];
                    next[idx] = e.target.value;
                    updateField("floatingTags", next);
                  }}
                  className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white"
                />
                <button
                  onClick={() => updateField("floatingTags", (data.floatingTags || []).filter((_: any, i: number) => i !== idx))}
                  className="w-12 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-red-500"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Marquee Elements */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-l-2 border-black dark:border-white pl-4">
              Marquee Items
            </h3>
            <button onClick={addMarqueeItem} className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-800 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              <i className="fa-solid fa-plus mr-2"></i> Add Item
            </button>
          </div>
          <div className="space-y-3">
            {data.marqueeItems.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <input type="text" value={item} onChange={(e) => updateMarqueeItem(idx, e.target.value)} className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                <button onClick={() => removeMarqueeItem(idx)} className="w-12 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-red-500">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
