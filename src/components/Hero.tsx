export default function Hero({ data }: { data?: any }) {
  const line1 = data?.line1 || "HASSAN";
  const line2 = data?.line2 || "RAZA";
  const tagline = data?.tagline || "Detail-oriented Full Stack Developer...";
  const ctaText = data?.ctaText || "View Value Add";
  const availabilityText = data?.availabilityText || "Available for full-time opportunities";
  const floatingTags: string[] = data?.floatingTags || ["Laravel", "Vue.js", "MySQL", "React"];

  const tagPositions = [
    { top: "10%", right: "5%", animation: "floatDot 5s 0s ease-in-out infinite", dark: false },
    { bottom: "18%", left: "2%", animation: "floatDot 5s 1s ease-in-out infinite", dark: true },
    { bottom: "5%", right: "15%", animation: "floatDot 5s 2s ease-in-out infinite", dark: false },
    { top: "25%", left: "0%", animation: "floatDot 5s 1.5s ease-in-out infinite", dark: false },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 mb-8 px-3 py-1 border border-gray-300 dark:border-zinc-700 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 transition-colors"
              style={{ animation: "fadeIn 1s .1s both" }}
            >
              <span
                className="w-2 h-2 bg-green-500 rounded-full"
                style={{ animation: "pulseDot 2s infinite" }}
              ></span>
              {availabilityText}
            </div>

            <h1
              className="font-black text-black dark:text-white tracking-tighter leading-none mb-6 transition-colors"
              style={{ fontSize: "clamp(3.5rem,10vw,8rem)" }}
            >
              <span className="hero-line">
                <span>{line1}</span>
              </span>
              <span className="hero-line glitch" data-text={line2}>
                <span>{line2}</span>
              </span>
            </h1>

            <p
              className="text-gray-500 dark:text-gray-400 text-lg max-w-md leading-relaxed mb-10 transition-colors"
              style={{ animation: "fadeInUp .9s .8s both" }}
            >
              {tagline}
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "fadeInUp .9s 1s both" }}
            >
              <a
                href="/projects"
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 inline-block"
              >
                {ctaText}
              </a>
              <a
                href="/contact"
                className="border-2 border-black dark:border-white text-black dark:text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-1 inline-block"
              >
                Hire Me
              </a>
              <a
                href="/api/cv/generate"
                target="_blank"
                download
                className="border-2 border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-gray-400 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Download CV <i className="fa-solid fa-arrow-down"></i>
              </a>
            </div>

            <div
              className="flex items-center gap-3 mt-16"
              style={{ animation: "fadeInUp .9s 1.2s both" }}
            >
              <div className="scroll-line"></div>
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                Scroll to explore
              </span>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center h-80 lg:h-[500px] orbit-wrap"
            style={{ animation: "fadeIn 1.2s 1s both" }}
          >
            <div className="relative w-64 h-80 lg:w-96 lg:h-[32rem] bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-2xl z-10 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/21.webp"
                alt="Hassan Raza"
                className="object-cover w-full h-full grayscale contrast-125 hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-75"
              />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black dark:border-white pointer-events-none transition-colors"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black dark:border-white pointer-events-none transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black dark:border-white pointer-events-none transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black dark:border-white pointer-events-none transition-colors"></div>
            </div>
            <div
              className="orbit-ring"
              style={{ width: "320px", height: "320px" }}
            >
              <div className="orbit-dot"></div>
            </div>
            <div
              className="orbit-ring reverse"
              style={{ width: "440px", height: "440px" }}
            >
              <div
                className="orbit-dot"
                style={{
                  background: "#9ca3af",
                  width: "6px",
                  height: "6px",
                  top: "-3px",
                }}
              ></div>
            </div>
            <div
              className="orbit-ring"
              style={{
                width: "560px",
                height: "560px",
                borderStyle: "dotted",
                animationDuration: "35s",
              }}
            >
              <div
                className="orbit-dot"
                style={{
                  background: "#d1d5db",
                  width: "4px",
                  height: "4px",
                  top: "-2px",
                }}
              ></div>
            </div>

            {/* Dynamic floating tech tags */}
            {floatingTags.slice(0, 4).map((tag, i) => {
              const pos = tagPositions[i] || tagPositions[0];
              const isDark = pos.dark;
              return (
                <div
                  key={i}
                  className={`absolute font-bold text-xs uppercase tracking-widest px-3 py-1 shadow-md transition-colors ${
                    isDark
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-white dark:bg-zinc-900 dark:text-white border border-gray-200 dark:border-zinc-800"
                  }`}
                  style={{ ...pos, animation: pos.animation } as React.CSSProperties}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
