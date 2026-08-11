"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import toast from "react-hot-toast";

export default function StackContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [data, setData] = useState({
    items: [
      { name: "NEXT.JS", icon: "fa-solid fa-n" },
      { name: "TYPESCRIPT", icon: "fa-brands fa-js" },
      { name: "TAILWIND CSS", icon: "fa-solid fa-wind" },
      { name: "REACT", icon: "fa-brands fa-react" }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "siteContent", "stack");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dbData = docSnap.data();
          // Backward compatibility check for old array of strings
          if (dbData.items && dbData.items.length > 0 && typeof dbData.items[0] === 'string') {
            setData({
              items: dbData.items.map((item: string) => ({ name: item, icon: "fa-solid fa-code" }))
            });
          } else {
            setData(dbData as any);
          }
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
      await setDoc(doc(db, "siteContent", "stack"), data);
      toast.success("Stack items saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save data.");
    } finally {
      setSaving(false);
    }
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { name: "NEW TECHNOLOGY", icon: "fa-solid fa-code" }]
    }));
  };

  const removeItem = (index: number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: 'name' | 'icon', value: string) => {
    setData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Tech Stack
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Manage your technologies (used in Marquee and Skills wall). Use FontAwesome classes for icons (e.g., fa-brands fa-react).
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

      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black uppercase tracking-widest border-l-2 border-black dark:border-white pl-4">
            Stack Array
          </h3>
          <button 
            onClick={addItem}
            className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-800 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Technology
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.items.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2 bg-gray-50 dark:bg-[#0a0a0a] p-4 border border-gray-200 dark:border-zinc-800 relative group">
              <button 
                onClick={() => removeItem(idx)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-red-500 bg-white dark:bg-black opacity-0 group-hover:opacity-100"
              >
                <i className="fa-solid fa-trash text-[10px]"></i>
              </button>
              
              <div className="flex items-center gap-4 mb-2">
                <i className={`${item.icon} text-3xl text-gray-400`} />
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Preview</div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black dark:focus:border-white" 
                    value={item.name} 
                    onChange={(e) => updateItem(idx, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">FontAwesome Class</label>
                  <input 
                    type="text" 
                    placeholder="fa-brands fa-react"
                    className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-4 py-2 text-xs font-mono focus:outline-none focus:border-black dark:focus:border-white" 
                    value={item.icon} 
                    onChange={(e) => updateItem(idx, 'icon', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
