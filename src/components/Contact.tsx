"use client";

import { useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState("Send Message →");

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    inquiry_type: "Full-Time Opportunity",
    message: "",
    _subject: "New Job Opportunity / Inquiry via Portfolio",
    _template: "box",
  });

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBtnText("Sending...");

    try {
      await addDoc(collection(db, "leads"), {
        ...form,
        createdAt: serverTimestamp(),
        status: "new",
      });
      
      setFormSubmitted(true);
    } catch (err) {
      setBtnText("Error! Try Again.");
      setTimeout(() => {
        setBtnText("Send Message →");
        setLoading(false);
      }, 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-[#0a0a0a] relative transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column - Details */}
        <div className="reveal delay-1 sticky top-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#111] transition-colors">
              <i className="fa-solid fa-at text-black dark:text-white mb-4 text-xl"></i>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                Email
              </span>
              <a
                href="mailto:hassanraza03097477849@gmail.com"
                className="text-sm font-bold text-black dark:text-white hover:text-gray-500 transition-colors break-all"
              >
                hassanraza03097477849<br/>@gmail.com
              </a>
            </div>

            <div className="p-6 border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#111] transition-colors">
              <i className="fa-solid fa-location-dot text-black dark:text-white mb-4 text-xl"></i>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                Location
              </span>
              <span className="text-sm font-bold text-black dark:text-white transition-colors block">
                Karachi, Pakistan
                <span className="block text-gray-400 font-normal mt-1">(Open to Relocation)</span>
              </span>
            </div>

            <div className="p-6 border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#111] transition-colors">
              <i className="fa-solid fa-phone text-black dark:text-white mb-4 text-xl"></i>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                Phone
              </span>
              <span className="text-sm font-bold text-black dark:text-white transition-colors">
                0309-7477849
              </span>
            </div>

            <div className="p-6 border border-black dark:border-white bg-black dark:bg-white transition-colors group">
              <i className="fa-solid fa-file-lines text-white dark:text-black mb-4 text-xl transition-colors"></i>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                Resume
              </span>
              <a
                href="/api/cv/generate"
                target="_blank"
                className="text-sm font-black text-white dark:text-black flex items-center gap-2 group-hover:gap-4 transition-all"
              >
                Download CV <i className="fa-solid fa-arrow-down"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="reveal delay-3">
          <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 p-8 lg:p-12 transition-colors">
            {!formSubmitted ? (
              <form onSubmit={submitForm} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      required
                      className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-zinc-800 text-black dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      required
                      className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-zinc-800 text-black dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                      Company Name
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      type="text"
                      className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-zinc-800 text-black dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                      Role / Position
                    </label>
                    <input
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      type="text"
                      className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-zinc-800 text-black dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="e.g. Senior Frontend Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="inquiry_type"
                    value={form.inquiry_type}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-zinc-800 text-black dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  >
                    <option value="Full-Time Opportunity">Full-Time Opportunity</option>
                    <option value="Freelance / Contract">Freelance / Contract</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                    Message Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-zinc-800 text-black dark:text-white px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-gray-400 dark:placeholder-gray-600 resize-none"
                    placeholder="Tell me about the role, tech stack, or opportunity..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {btnText}
                </button>
              </form>
            ) : (
              <div className="text-center py-16">
                <i className="fa-solid fa-circle-check text-5xl text-black dark:text-white mb-6"></i>
                <h3 className="text-3xl font-black text-black dark:text-white tracking-tighter mb-4">
                  Transmission Sent.
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Thank you for reaching out. I have received your message and will process it shortly.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
