"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfileClient({ cvData }: { cvData: any }) {
  useEffect(() => {
    // Reveal Animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".reveal,.reveal-left,.reveal-scale")
      .forEach((el) => revealObserver.observe(el));
      
    return () => revealObserver.disconnect();
  }, []);

  const { name, title, email, phone, location, summary, experience, education } = cvData;

  const displayExperience = experience || [];
  const displayEducation = education || [
    {
      title: "Software Development Diploma",
      institution: "Aptech Learning Center",
      description: "Comprehensive, hands-on training in modern software engineering principles, full-stack web development, and database architecture.",
      icon: "fa-solid fa-laptop-code"
    },
    {
      title: "Pre-Engineering",
      institution: "Higher Secondary Education",
      description: "Rigorous academic focus on advanced mathematics and physics, fostering the analytical logic required for complex systems engineering.",
      icon: "fa-solid fa-square-root-variable"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Breadcrumb */}
          <div className="mb-12 reveal">
            <Link 
              href="/#about" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors anim-link"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-20 reveal delay-1 border-b border-gray-200 dark:border-zinc-900 pb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-black dark:bg-white transition-colors"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Curriculum Vitae
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter mb-6 leading-[1.1]">
              {name || "Hassan Raza"}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400 mb-6">
              {title || "Full Stack Developer"}
            </h2>

            {/* Contact Details in Profile Section */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 text-sm font-semibold text-gray-500 dark:text-gray-400">
              {email && (
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope"></i>
                  <a href={`mailto:${email}`} className="hover:text-black dark:hover:text-white transition-colors">{email}</a>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-phone"></i>
                  <a href={`tel:${phone}`} className="hover:text-black dark:hover:text-white transition-colors">{phone}</a>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{location}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="/api/cv/generate" target="_blank" className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-3">
                Download Resume <i className="fa-solid fa-download"></i>
              </a>
              {email && (
                <a href={`mailto:${email}`} className="border border-black dark:border-white text-black dark:text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-3">
                  Contact Me <i className="fa-solid fa-paper-plane"></i>
                </a>
              )}
            </div>
          </div>

          {/* Extended Bio */}
          {summary && (
            <section className="mb-20 reveal delay-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white mb-6 border-l-2 border-black dark:border-white pl-4">
                Executive Summary
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-light leading-relaxed whitespace-pre-wrap">
                {summary.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {/* Professional Experience */}
          {displayExperience.length > 0 && (
            <section className="mb-20 reveal delay-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white mb-8 border-l-2 border-black dark:border-white pl-4">
                Professional Experience
              </h3>
              
              <div className="space-y-12">
                {displayExperience.map((role: any, idx: number) => (
                  <div key={idx} className="relative pl-8 border-l border-gray-200 dark:border-zinc-800">
                    <div className={`absolute w-3 h-3 rounded-full -left-[6.5px] top-1.5 ${idx === 0 ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-zinc-700'}`}></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h4 className="text-2xl font-bold text-black dark:text-white tracking-tight">{role.role}</h4>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-100 dark:bg-zinc-900 px-3 py-1 rounded-sm w-fit mt-2 md:mt-0">
                        {role.dates}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{role.company}</div>
                    
                    {role.description && (
                      <div className="text-gray-600 dark:text-gray-400 space-y-2 font-light leading-relaxed mb-6 whitespace-pre-wrap">
                        {role.description.split('\n').map((line: string, i: number) => {
                          if (line.trim().startsWith('-')) {
                            return <li key={i} className="list-inside list-disc">{line.replace('-', '').trim()}</li>
                          }
                          return <p key={i} className="mb-2">{line}</p>
                        })}
                      </div>
                    )}

                    {role.tags && role.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {role.tags.map((tech: string) => (
                          <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white border border-gray-200 dark:border-zinc-800 px-3 py-1.5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Credentials */}
          {displayEducation.length > 0 && (
            <section className="mb-20 reveal delay-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white mb-8 border-l-2 border-black dark:border-white pl-4">
                Education & Credentials
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {displayEducation.map((edu: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 dark:bg-[#111] p-8 border border-gray-200 dark:border-zinc-800">
                    <i className={`${edu.icon || "fa-solid fa-graduation-cap"} text-3xl mb-4 text-black dark:text-white`}></i>
                    <h4 className="text-xl font-black text-black dark:text-white mb-2">{edu.title}</h4>
                    <div className="text-sm font-semibold text-gray-500 mb-4">{edu.institution}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
