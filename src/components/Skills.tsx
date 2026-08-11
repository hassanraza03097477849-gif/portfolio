export default function Skills({ data = [] }: { data?: any[] }) {
  const defaultSkills = [
    { name: "LARAVEL", icon: "fa-brands fa-laravel" },
    { name: "VUE.JS", icon: "fa-brands fa-vuejs" },
    { name: "REACT", icon: "fa-brands fa-react" },
    { name: "PYTHON", icon: "fa-brands fa-python" },
    { name: "NEXT.JS", icon: "fa-solid fa-n" },
    { name: "FLUTTER", icon: "fa-solid fa-mobile-screen" },
    { name: "MYSQL", icon: "fa-solid fa-database" },
    { name: "TAILWIND", icon: "fa-solid fa-wind" },
    { name: "MONGODB", icon: "fa-solid fa-leaf" },
    { name: "REDIS", icon: "fa-solid fa-layer-group" },
    { name: "GIT", icon: "fa-brands fa-git-alt" },
    { name: "FIREBASE", icon: "fa-solid fa-fire" },
    { name: "DOCKER", icon: "fa-brands fa-docker" },
    { name: "FIGMA", icon: "fa-brands fa-figma" }
  ];

  const skills = (data && data.length > 0 && typeof data[0] === 'object') ? data : defaultSkills;

  return (
    <section
      id="expertise"
      className="py-10 bg-gray-50 dark:bg-[#111] border-b border-gray-200 dark:border-zinc-900 relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-8">
        <div className="flex items-center gap-4 mb-4 reveal">
          <span className="w-8 h-px bg-black dark:bg-white transition-colors"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            02 — Technologies
          </span>
        </div>
      </div>

      {/* Edge-to-Edge Ultra Dense Typographic Wall */}
      <div className="w-full relative z-10 flex flex-wrap justify-center items-center gap-x-3 gap-y-0 reveal delay-1 leading-[0.85] overflow-hidden" style={{ padding: "0 2vw" }}>
        {skills.map((skill: any, index: number) => (
          <div 
            key={index} 
            className="group cursor-crosshair flex items-center"
          >
            <i className={`${skill.icon} text-[4rem] md:text-[6rem] lg:text-[8rem] text-transparent group-hover:text-black dark:group-hover:text-white transition-all duration-300 w-0 group-hover:w-auto mr-0 group-hover:mr-4 opacity-0 group-hover:opacity-100`}></i>
            <span className="text-[4rem] md:text-[6rem] lg:text-[9rem] font-black tracking-tighter text-gray-200 dark:text-zinc-800/80 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 uppercase m-0 p-0">
              {skill.name}
            </span>
            <span className="text-[4rem] md:text-[6rem] lg:text-[9rem] font-black tracking-tighter text-gray-200 dark:text-zinc-800/30 mx-2 md:mx-4 group-hover:opacity-0 transition-opacity duration-300 m-0 p-0">
              ·
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
