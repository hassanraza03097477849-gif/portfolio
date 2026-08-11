export default function Footer() {
  return (
    <footer className="bg-black dark:bg-[#050505] text-white py-12 border-t border-gray-900 dark:border-zinc-900 relative overflow-hidden transition-colors">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white dark:bg-zinc-800 flex items-center justify-center transition-colors">
            <span className="text-black dark:text-white font-black text-xs transition-colors">
              HR
            </span>
          </div>
          <span className="font-black tracking-widest uppercase text-sm">
            Hassan Raza
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest transition-colors">
          Karachi, Pakistan
        </p>
        <p className="text-gray-700 dark:text-gray-500 text-xs transition-colors">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
