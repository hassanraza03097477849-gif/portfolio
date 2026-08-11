"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ProjectsClient({ projectsData }: { projectsData: any[] }) {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, .skill-tag, .cap-card")) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, .skill-tag, .cap-card")) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen text-black dark:text-white transition-colors">
      <div
        id="cursor"
        className={isHovered ? "hovered" : ""}
        style={{ left: `${cursorX}px`, top: `${cursorY}px` }}
      ></div>

      <Navbar />
      
      <main className="pt-40 pb-32 max-w-7xl mx-auto px-6">
        <div className="mb-24 reveal">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            All Work.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            A comprehensive archive of applications, systems, and interfaces engineered for scale, performance, and exceptional user experiences.
          </p>
        </div>

        <div className="space-y-32">
          {projectsData.map((project, index) => (
            <div key={project.id} className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center reveal delay-1">
              
              {/* Image Side */}
              <div className={`lg:col-span-7 relative group overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[16/10] w-full relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                </div>
              </div>

              {/* Content Side */}
              <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700"></span>
                  <span className="text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400">
                    {project.year}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">
                  {project.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  {project.detailedDescription}
                </p>
                
                <div className="mb-10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-4">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <i className="fa-solid fa-check text-black dark:text-white mt-1 text-[10px]"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs border border-gray-200 dark:border-zinc-800 px-3 py-1.5 font-bold uppercase tracking-wider text-black dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Live Demo <i className="fa-solid fa-arrow-right"></i>
                  </a>
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-3 border border-black dark:border-white text-black dark:text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <i className="fa-brands fa-github text-lg"></i> Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Contact />
      <Footer />
    </div>
  );
}
