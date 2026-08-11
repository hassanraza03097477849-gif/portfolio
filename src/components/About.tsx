export default function About({ aboutData, cvData }: { aboutData?: any; cvData?: any }) {
  // Safe defaults if data is missing
  const headline = aboutData?.headline || "Engineered\nfor Scale.";
  const description = aboutData?.description || "I am a Full Stack Developer based in Karachi...";
  const metrics = aboutData?.metrics || [
    { shortLabel: "Exp", icon: "fa-solid fa-code-branch", value: "3", label: "Years Professional" },
    { shortLabel: "Builds", icon: "fa-solid fa-layer-group", value: "20", label: "Production Projects" },
    { shortLabel: "Stack", icon: "fa-solid fa-microchip", value: "8", label: "Core Technologies" },
    { shortLabel: "Drive", icon: "fa-solid fa-bolt", value: "100%", label: "Commitment Level" }
  ];

  const experience = cvData?.experience || [
    {
      role: "Full Stack Developer",
      company: "Raddium Technology",
      dates: "Jan 2025 – May 2026",
      description: "Engineered mission-critical modules for enterprise ERP systems.",
      tags: ["Laravel", "MySQL", "REST API", "OAuth"]
    },
    {
      role: "Receptionist / Admin",
      company: "Al-Azhar School",
      dates: "2024 – 2025",
      description: "Managed fast-paced front-desk operations and student records.",
      tags: []
    },
    {
      role: "Billing Operator",
      company: "Nafey Traders",
      dates: "2023 – 2024",
      description: "Operated high-throughput POS systems and inventory management.",
      tags: []
    }
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-zinc-900 relative overflow-hidden transition-colors"
    >
      {/* Background Graphic Accents */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 border-[1px] border-gray-200 dark:border-zinc-800 rotate-12 transition-colors opacity-40 pointer-events-none"
        style={{ animation: "rotateSq 40s linear infinite" }}
      ></div>
      <div
        className="absolute bottom-10 -left-10 w-32 h-32 border-[1px] border-gray-200 dark:border-zinc-800 transition-colors opacity-40 pointer-events-none"
        style={{ animation: "rotateSq 20s linear infinite reverse" }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header & Bio */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16 reveal">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-black dark:bg-white transition-colors"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                01 — Profile
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter mb-4 transition-colors leading-[1.1] whitespace-pre-wrap">
              {headline.split('\n').map((line: string, i: number, arr: any[]) => (
                <span key={i}>
                  {i === arr.length - 1 ? <span className="text-gray-400 dark:text-gray-600">{line}</span> : line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          
          <div className="lg:w-2/3 prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-light leading-relaxed whitespace-pre-wrap">
            {description.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i} className={i === 0 ? "text-xl md:text-2xl font-medium text-black dark:text-white leading-snug mb-4" : "mb-4"}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(metrics.length, 4)} gap-4 mb-20 reveal delay-1`}>
          {metrics.map((metric: any, idx: number) => {
            const isDarkBlock = metric.shortLabel.toLowerCase() === 'drive' || metric.value.includes('%');
            return (
              <div key={idx} className={`group relative p-6 border transition-all duration-300 ${isDarkBlock ? 'bg-black dark:bg-white border-black dark:border-white hover:bg-gray-900 dark:hover:bg-gray-100' : 'bg-gray-50 dark:bg-[#111] border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white'}`}>
                <div className="flex justify-between items-start mb-2">
                  <i className={`${metric.icon} ${isDarkBlock ? 'text-white dark:text-black' : 'text-gray-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white'} transition-colors`}></i>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkBlock ? 'text-gray-400 dark:text-gray-500' : 'text-gray-400'}`}>{metric.shortLabel}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className={`stat-num text-4xl lg:text-5xl font-black transition-colors tracking-tighter ${isDarkBlock ? 'text-white dark:text-black' : 'text-black dark:text-white'}`} data-target={parseInt(metric.value) || 0}>0</div>
                  {metric.value.includes('%') && <span className={`text-xl font-black ${isDarkBlock ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>%</span>}
                  {metric.value.includes('+') && <span className={`text-xl font-black ${isDarkBlock ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>+</span>}
                </div>
                <div className={`text-xs font-semibold mt-1 ${isDarkBlock ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400'}`}>{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Timeline - Compact Grid Layout */}
        {experience.length > 0 && (
          <div className="border-t border-gray-200 dark:border-zinc-800 pt-16 reveal delay-2 relative">
            <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white mb-8">
              Career Timeline
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {experience.slice(0, 3).map((exp: any, idx: number) => (
                <div key={idx} className="bg-gray-50 dark:bg-[#111] p-6 border border-gray-200 dark:border-zinc-800 hover:-translate-y-1 transition-transform duration-300">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-black dark:text-white bg-gray-200 dark:bg-zinc-800 px-2 py-1 mb-3">
                    {exp.dates}
                  </span>
                  <h4 className="text-lg font-black text-black dark:text-white tracking-tight mb-1">
                    {exp.role}
                  </h4>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
                    {exp.company}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {exp.tags.map((tag: string) => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 dark:border-zinc-700 px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-16 reveal delay-3">
              <a
                href="/profile"
                className="block w-full text-center border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-black dark:hover:bg-white text-black dark:text-white hover:text-white dark:hover:text-black py-8 text-sm font-black uppercase tracking-widest transition-all duration-300"
              >
                View Full Profile Details
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
