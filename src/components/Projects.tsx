import Link from "next/link";

export default function Projects({
  limit = 4,
  hideMoreBtn = false,
  featuredOnly = false,
  data = [],
}: {
  limit?: number;
  hideMoreBtn?: boolean;
  featuredOnly?: boolean;
  data?: any[];
}) {
  let projects = data;
  if (featuredOnly) {
    projects = projects.filter(p => p.isFeatured);
  }
  projects = projects.slice(0, limit);

  return (
    <section
      id="projects"
      className="py-20 bg-gray-50 dark:bg-[#111] border-b border-gray-200 dark:border-zinc-900 relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16 reveal">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-black dark:bg-white transition-colors"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                04 — Work
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter mb-4 transition-colors leading-[1.1]">
              Selected
              <br />
              <span className="text-gray-400 dark:text-gray-600">Projects.</span>
            </h2>
          </div>
          
          <div className="lg:w-2/3 text-xl md:text-2xl font-medium text-black dark:text-white leading-snug">
            A showcase of systems, interfaces, and platforms engineered for performance, scale, and extreme reliability. 
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-6 reveal delay-1">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between`}
              style={{ minHeight: "450px" }}
            >
              {/* Massive Number Watermark */}
              <div className="absolute -top-10 -right-6 text-[15rem] font-black text-gray-50 dark:text-zinc-950/30 group-hover:text-gray-100 dark:group-hover:text-zinc-800 transition-colors duration-500 select-none pointer-events-none leading-none z-0">
                0{index + 1}
              </div>

              {/* Image Overlay */}
              <div className="absolute inset-0 z-10 bg-black dark:bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>

              <div className="relative z-20 mt-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-300 mb-4 block transition-colors duration-500">
                  {project.category}
                </span>
                <h3 className="text-3xl font-black text-black dark:text-white group-hover:text-white mb-4 tracking-tight leading-[1.1] transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 group-hover:text-gray-300 mb-8 transition-colors duration-500">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white group-hover:text-white border border-gray-200 dark:border-zinc-700 group-hover:border-white/30 px-3 py-1.5 transition-colors duration-500 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm group-hover:bg-black/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black dark:text-white group-hover:text-white transition-colors duration-500 hover:gap-4"
                >
                  View Case Study <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        {!hideMoreBtn && data.length > limit && (
          <div className="mt-16 reveal delay-2">
            <Link
              href="/projects"
              className="block w-full text-center border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-black dark:hover:bg-white text-black dark:text-white hover:text-white dark:hover:text-black py-8 text-sm font-black uppercase tracking-widest transition-all duration-300"
            >
              View Full Archive ({data.length} Projects)
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
