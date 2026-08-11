export default function Services() {
  const capabilities = [
    {
      num: "01",
      title: "ERP & Systems Architecture",
      desc: "End-to-end development of comprehensive Enterprise Resource Planning systems — complex financial accounting integrations, automated workflows, custom billing engines, and multi-module business platforms.",
      tags: ["Laravel", "MySQL", "Vue.js"]
    },
    {
      num: "02",
      title: "High-Density Dashboards",
      desc: "Designing and building punchy, one-screen digital environments. Maximising data visibility while maintaining a sleek, intuitive UI that eliminates scroll fatigue — every pixel earns its place.",
      tags: ["React", "Figma", "Tailwind"]
    },
    {
      num: "03",
      title: "Complex Database Logic",
      desc: "Structuring scalable database logic using advanced joins, indexes, and optimised queries. Fast, reliable data retrieval for massive datasets, valuations, and intelligence reports.",
      tags: ["MySQL", "MongoDB", "REST APIs"]
    }
  ];

  return (
    <section
      id="capabilities"
      className="py-20 bg-gray-50 dark:bg-[#111] border-b border-gray-200 dark:border-zinc-900 relative transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16 reveal">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-black dark:bg-white transition-colors"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                03 — Value
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter mb-4 transition-colors leading-[1.1]">
              Value
              <br />
              <span className="text-gray-400 dark:text-gray-600">Proposition.</span>
            </h2>
          </div>
          
          <div className="lg:w-2/3 text-xl md:text-2xl font-medium text-black dark:text-white leading-snug">
            Deep technical experience delivering high-impact, scalable solutions. I do not just write code; I engineer business leverage.
          </div>
        </div>

        {/* 3-Column Grid Layout with Watermarks */}
        <div className="grid lg:grid-cols-3 gap-6 reveal delay-1">
          {capabilities.map((cap, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 md:p-10 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-end min-h-[450px]"
            >
              {/* Massive Number Watermark */}
              <div className="absolute -top-10 -right-6 text-[15rem] font-black text-gray-50 dark:text-zinc-950/30 group-hover:text-gray-100 dark:group-hover:text-zinc-800 transition-colors duration-500 select-none pointer-events-none leading-none z-0">
                {cap.num}
              </div>
              
              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white mb-4 tracking-tight leading-[1.1]">
                  {cap.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 h-24">
                  {cap.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white border border-gray-200 dark:border-zinc-700 px-3 py-1.5 bg-white dark:bg-zinc-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Top accent line that slides in on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
