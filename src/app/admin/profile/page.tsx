"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import toast from "react-hot-toast";

interface Experience {
  role: string;
  company: string;
  dates: string;
  description: string;
  tags: string[];
}

interface Education {
  title: string;
  institution: string;
  description: string;
  icon: string;
}

export default function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [data, setData] = useState({
    selectedTemplate: "minimal",
    name: "Hassan Raza",
    title: "Full Stack Developer",
    email: "hassanraza03097477849@gmail.com",
    phone: "0309-7477849",
    location: "Karachi, Pakistan",
    avatarUrl: "",
    summary: "I am a highly driven Full Stack Developer...",
    experience: [
      {
        role: "Full Stack Developer",
        company: "Raddium Technology",
        dates: "Jan 2025 - May 2026",
        description: "Engineered mission-critical backend architecture...",
        tags: ["Laravel", "MySQL", "REST API"]
      }
    ] as Experience[],
    education: [
      {
        title: "Software Development Diploma",
        institution: "Aptech Learning Center",
        description: "Comprehensive, hands-on training...",
        icon: "fa-solid fa-laptop-code"
      }
    ] as Education[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "cv", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dbData = docSnap.data();
          const mappedExperience = dbData.experience && dbData.experience.length > 0 ? dbData.experience.map((exp: any) => ({
            role: exp.role || "",
            company: exp.company || "",
            dates: exp.dates || exp.year || "",
            description: exp.description || "",
            tags: exp.tags || []
          })) : [{
            role: "Full Stack Developer",
            company: "Raddium Technology",
            dates: "Jan 2025 - May 2026",
            description: "Engineered mission-critical backend architecture...",
            tags: ["Laravel", "MySQL", "REST API"]
          }];

          const mappedEducation = dbData.education && dbData.education.length > 0 ? dbData.education.map((edu: any) => ({
            title: edu.title || "",
            institution: edu.institution || "",
            description: edu.description || "",
            icon: edu.icon || "fa-solid fa-graduation-cap"
          })) : [{
            title: "Software Development Diploma",
            institution: "Aptech Learning Center",
            description: "Comprehensive training...",
            icon: "fa-solid fa-laptop-code"
          }];

          setData({ ...data, ...dbData, experience: mappedExperience, education: mappedEducation });
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
      await setDoc(doc(db, "cv", "main"), data);
      toast.success("Profile and CV data saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save data.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof typeof data, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (idx: number, field: keyof Experience, value: any) => {
    const newExp = [...data.experience];
    newExp[idx] = { ...newExp[idx], [field]: value };
    updateField("experience", newExp);
  };

  const removeExperience = (idx: number) => {
    updateField("experience", data.experience.filter((_, i) => i !== idx));
  };

  const addExperience = () => {
    updateField("experience", [
      ...data.experience,
      { role: "New Role", company: "Company", dates: "YYYY - YYYY", description: "Role description...", tags: [] }
    ]);
  };

  const updateEducation = (idx: number, field: keyof Education, value: any) => {
    const newEdu = [...data.education];
    newEdu[idx] = { ...newEdu[idx], [field]: value };
    updateField("education", newEdu);
  };

  const removeEducation = (idx: number) => {
    updateField("education", data.education.filter((_, i) => i !== idx));
  };

  const addEducation = () => {
    updateField("education", [
      ...data.education,
      { title: "New Degree / Credential", institution: "Institution Name", description: "Details...", icon: "fa-solid fa-graduation-cap" }
    ]);
  };

  // Note: Firebase Storage implementation would go here. 
  // Currently skipping actual file upload until Storage rules are initialized in console.
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      toast.error("Storage is not yet initialized. Please enable Firebase Storage in the console first.");
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            CV & Profile Manager
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Update your core identity, resume data, and timeline.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              const dummyExp = [
                {
                  role: "Full Stack Developer",
                  company: "Raddium Technology",
                  dates: "Jan 2025 - May 2026",
                  description: "- Engineered mission-critical backend architecture...\n- Designed and deployed secure RESTful APIs...\n- Implemented comprehensive OAuth 2.0...",
                  tags: ["Laravel", "MySQL", "REST API", "OAuth"]
                },
                {
                  role: "Receptionist / Admin",
                  company: "Al-Azhar School",
                  dates: "2024 - 2025",
                  description: "Managed fast-paced front-desk operations...",
                  tags: ["Admin", "Data Entry"]
                }
              ];
              setData({ ...data, experience: dummyExp });
              toast.success("Dummy data populated! Click Save Data to write to database.");
            }}
            className="border border-black dark:border-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors hidden md:block"
          >
            Load Dummy Data
          </button>
          <button 
            onClick={() => window.open("/api/cv/generate", "_blank")}
            className="border border-black dark:border-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Preview CV
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Data"}
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {/* Profile Image & Core Identity */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            CV Template Selection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { id: 'minimal', name: 'Minimal', desc: 'Clean, black & white, generous whitespace.' },
              { id: 'modern', name: 'Modern', desc: 'Sidebar layout with contrasting columns.' },
              { id: 'classic', name: 'Classic', desc: 'Traditional serif-style format.' }
            ].map(tpl => (
              <div 
                key={tpl.id}
                onClick={() => updateField('selectedTemplate', tpl.id)}
                className={`p-6 border-2 cursor-pointer transition-colors ${data.selectedTemplate === tpl.id ? 'border-black dark:border-white bg-gray-50 dark:bg-zinc-900' : 'border-gray-200 dark:border-zinc-800 hover:border-gray-400'}`}
              >
                <div className="font-bold uppercase tracking-widest text-sm mb-2">{tpl.name}</div>
                <div className="text-xs text-gray-500">{tpl.desc}</div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Identity & Avatar
          </h3>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Upload Dropzone */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Profile Image</label>
              <div className="flex-1 min-h-[240px] border-2 border-dashed border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-[#0a0a0a] hover:border-black dark:hover:border-white transition-colors flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden">
                {data.avatarUrl ? (
                  <img src={data.avatarUrl} alt="Avatar" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors mb-4"></i>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">Upload Avatar</div>
                    <div className="text-[10px] text-gray-400 mt-2">Requires Storage Setup</div>
                  </>
                )}
                <input type="file" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
              </div>
            </div>

            {/* Core Inputs */}
            <div className="w-full md:w-2/3 flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                  <input type="text" value={data.name} onChange={e => updateField("name", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Professional Title</label>
                  <input type="text" value={data.title} onChange={e => updateField("title", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</label>
                  <input type="email" value={data.email} onChange={e => updateField("email", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone</label>
                  <input type="text" value={data.phone} onChange={e => updateField("phone", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Location</label>
                <input type="text" value={data.location} onChange={e => updateField("location", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Executive Summary
          </h3>
          <div className="space-y-2">
            <textarea rows={6} value={data.summary} onChange={e => updateField("summary", e.target.value)} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white resize-none" />
          </div>
        </section>

        {/* Timeline Manager */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-l-2 border-black dark:border-white pl-4">
              Career Timeline
            </h3>
            <button onClick={addExperience} className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-800 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              <i className="fa-solid fa-plus mr-2"></i> Add Role
            </button>
          </div>

          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-zinc-800 p-6 bg-gray-50 dark:bg-[#0a0a0a]">
                <div className="flex justify-between items-start mb-4">
                  <div className="grid md:grid-cols-2 gap-4 w-full mr-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Role Title</label>
                      <input type="text" value={exp.role} onChange={e => updateExperience(idx, "role", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Company</label>
                      <input type="text" value={exp.company} onChange={e => updateExperience(idx, "company", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                    </div>
                  </div>
                  <button onClick={() => removeExperience(idx)} className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-red-500 mt-6">
                    <i className="fa-solid fa-trash text-[10px]"></i>
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Dates</label>
                  <input type="text" value={exp.dates} onChange={e => updateExperience(idx, "dates", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
                <div className="space-y-2 mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Responsibilities (Bullet Points / Description)</label>
                  <textarea rows={4} value={exp.description} onChange={e => updateExperience(idx, "description", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Tags (Comma separated)</label>
                  <input 
                    type="text" 
                    value={(exp.tags || []).join(", ")} 
                    onChange={e => updateExperience(idx, "tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} 
                    className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Manager */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest border-l-2 border-black dark:border-white pl-4">
              Education & Credentials
            </h3>
            <button onClick={addEducation} className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-zinc-800 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              <i className="fa-solid fa-plus mr-2"></i> Add Credential
            </button>
          </div>

          <div className="space-y-6">
            {data.education.map((edu, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-zinc-800 p-6 bg-gray-50 dark:bg-[#0a0a0a]">
                <div className="flex justify-between items-start mb-4">
                  <div className="grid md:grid-cols-2 gap-4 w-full mr-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Degree / Title</label>
                      <input type="text" value={edu.title} onChange={e => updateEducation(idx, "title", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Institution</label>
                      <input type="text" value={edu.institution} onChange={e => updateEducation(idx, "institution", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                    </div>
                  </div>
                  <button onClick={() => removeEducation(idx)} className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors text-red-500 mt-6">
                    <i className="fa-solid fa-trash text-[10px]"></i>
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">FontAwesome Icon Class (e.g. fa-solid fa-graduation-cap)</label>
                  <input type="text" value={edu.icon} onChange={e => updateEducation(idx, "icon", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Description</label>
                  <textarea rows={3} value={edu.description} onChange={e => updateEducation(idx, "description", e.target.value)} className="w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white resize-none" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
