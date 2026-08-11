export default function ValueContentManager() {
  const cards = [
    {
      title: "System Architecture",
      icon: "fa-solid fa-network-wired",
      desc: "Designing highly available, fault-tolerant infrastructure capable of handling enterprise-scale traffic.",
      tags: ["Microservices", "System Design", "Cloud Native"]
    },
    {
      title: "Frontend Engineering",
      icon: "fa-solid fa-code",
      desc: "Crafting pixel-perfect, brutalist interfaces using modern React ecosystems for maximum performance.",
      tags: ["React", "Next.js", "Performance"]
    },
    {
      title: "Backend Infrastructure",
      icon: "fa-solid fa-server",
      desc: "Building secure, optimized REST APIs and database schemas that power complex web applications.",
      tags: ["Node.js", "SQL", "Security"]
    }
  ];

  return (
    <div className="max-w-6xl pb-20">
      <div className="mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Capabilities
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Manage your core value propositions and skill pillars.
          </p>
        </div>
        <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2">
          Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest border-l-2 border-black dark:border-white pl-4">
                Capability Card {index + 1}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Card Title</label>
                  <input type="text" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white font-bold" defaultValue={card.title} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">FontAwesome Icon Class</label>
                  <div className="flex gap-2">
                    <input type="text" className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" defaultValue={card.icon} />
                    <div className="w-12 flex items-center justify-center border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900">
                      <i className={`${card.icon} text-lg`}></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Description</label>
                  <textarea rows={3} className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white resize-none" defaultValue={card.desc} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Tags (Comma Separated)</label>
                  <input type="text" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" defaultValue={card.tags.join(", ")} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
