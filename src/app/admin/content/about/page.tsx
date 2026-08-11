"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import toast from "react-hot-toast";

interface Metric {
  shortLabel: string;
  icon: string;
  value: string;
  label: string;
}

export default function AboutContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [data, setData] = useState({
    headline: "Engineered\nfor Scale.",
    description: "I am a Full Stack Developer based in Karachi, specialising in building complex, data-driven web applications and highly secure ERP systems.\n\nMy foundation stems from a Diploma in Software Development from Aptech, heavily augmented by a Pre-Engineering background. This unique intersection hardwires mathematical precision and analytical logic into everything I build.",
    metrics: [
      { shortLabel: "Exp", icon: "fa-solid fa-code-branch", value: "3", label: "Years Professional" },
      { shortLabel: "Builds", icon: "fa-solid fa-layer-group", value: "20", label: "Production Projects" },
      { shortLabel: "Stack", icon: "fa-solid fa-microchip", value: "8", label: "Core Technologies" },
      { shortLabel: "Drive", icon: "fa-solid fa-bolt", value: "100%", label: "Commitment Level" }
    ] as Metric[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "siteContent", "about");
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
      await setDoc(doc(db, "siteContent", "about"), data);
      toast.success("About content saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save About content.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof typeof data, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMetric = (idx: number, field: keyof Metric, value: string) => {
    const newMetrics = [...data.metrics];
    newMetrics[idx] = { ...newMetrics[idx], [field]: value };
    updateField("metrics", newMetrics);
  };

  const removeMetric = (idx: number) => {
    updateField("metrics", data.metrics.filter((_, i) => i !== idx));
  };

  const addMetric = () => {
    updateField("metrics", [...data.metrics, { shortLabel: "New", icon: "fa-solid fa-star", value: "0", label: "New Metric" }]);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            About Section
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Manage the headline, bio, and visual metrics for the landing page.
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
        {/* Main Content */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Headline & Description
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Headline (supports line breaks)</label>
              <textarea 
                rows={3}
                value={data.headline} 
                onChange={(e) => updateField("headline", e.target.value)} 
                className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-2xl font-black tracking-tighter focus:outline-none focus:border-black dark:focus:border-white resize-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Bio Description (supports line breaks)</label>
              <textarea 
                rows={8}
                value={data.description} 
                onChange={(e) => updateField("description", e.target.value)} 
                className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white resize-none" 
              />
            </div>
          </div>
        </section>

        {/* Metrics Manager */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-l-2 border-black dark:border-white pl-4">
              Metrics
            </h3>
            <button onClick={addMetric} className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-800 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              <i className="fa-solid fa-plus mr-2"></i> Add Metric
            </button>
          </div>
          
          <div className="space-y-4">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 border border-gray-200 dark:border-zinc-800 p-4 bg-gray-50 dark:bg-[#0a0a0a]">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Short Label</label>
                    <input type="text" value={metric.shortLabel} onChange={(e) => updateMetric(idx, "shortLabel", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Value</label>
                    <input type="text" value={metric.value} onChange={(e) => updateMetric(idx, "value", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black font-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Label</label>
                    <input type="text" value={metric.label} onChange={(e) => updateMetric(idx, "label", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Icon Class</label>
                    <div className="flex items-center gap-2">
                      <i className={`${metric.icon} w-6 text-center text-gray-500`}></i>
                      <input type="text" value={metric.icon} onChange={(e) => updateMetric(idx, "icon", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black" />
                    </div>
                  </div>
                </div>
                <div className="flex items-end">
                  <button onClick={() => removeMetric(idx)} className="w-full md:w-10 h-[38px] flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-red-500">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
