"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Animate progress bar 0 → 100 over ~1.6s
    const duration = 1600;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve: fast at start, slows near 100
      const pct = Math.min(100, Math.round((1 - Math.pow(1 - step / steps, 3)) * 100));
      setProgress(pct);

      if (step >= steps) {
        clearInterval(timer);
        // Pause briefly at 100% then slide out
        setTimeout(() => {
          setLeaving(true);
          // After slide-out animation, unmount completely
          setTimeout(() => setHidden(true), 700);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Logo mark */}
      <div
        className="mb-12 transition-all duration-700"
        style={{ opacity: leaving ? 0 : 1 }}
      >
        <div className="w-16 h-16 bg-white flex items-center justify-center mb-6 mx-auto">
          <span className="text-black font-black text-xl tracking-tighter leading-none">
            HR
          </span>
        </div>
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em] text-center">
          Hassan Raza
        </p>
      </div>

      {/* Progress bar container */}
      <div className="w-48 h-px bg-white/10 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-white transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-4 text-white/20 text-[10px] font-bold uppercase tracking-widest tabular-nums">
        {progress.toString().padStart(3, "0")}
      </p>
    </div>
  );
}
