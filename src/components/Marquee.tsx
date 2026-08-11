export default function Marquee({ data }: { data?: any[] }) {
  const baseItems = data || [
    "Full Stack Development",
    "ERP Architecture",
    "Database Engineering",
    "Laravel · Vue · React · Flutter",
    "High-Density Dashboards",
    "Available for Hire",
  ];
  // Duplicate for seamless scroll
  const items = [...baseItems, ...baseItems, ...baseItems];

  return (
    <div className="border-y border-gray-200 dark:border-zinc-900 bg-black dark:bg-[#050505] py-4 overflow-hidden relative z-10 transition-colors">
      <div className="marquee-track">
        <div className="flex items-center gap-12 pr-12 select-none">
          {items.map((item, index) => {
            const label = typeof item === 'string' ? item : (item as any)?.name;
            return (
              <span key={index} className="flex items-center gap-12">
                <span className="text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  {label}
                </span>
                <span className="text-gray-600 dark:text-gray-700 text-lg">
                  ✦
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
