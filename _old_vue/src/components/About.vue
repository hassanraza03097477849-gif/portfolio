<template>
<section id="about" class="py-32 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-zinc-900 relative overflow-hidden transition-colors">
    <div class="absolute -top-20 -right-20 w-64 h-64 border border-gray-100 dark:border-zinc-800 rotate-12 transition-colors" style="animation:rotateSq 30s linear infinite;"></div>
    <div class="absolute -bottom-12 -left-12 w-48 h-48 border border-gray-100 dark:border-zinc-800 transition-colors" style="animation:rotateSq 20s linear infinite reverse;"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="grid md:grid-cols-12 gap-16 items-start">
            <div class="md:col-span-5 reveal">
                <span class="text-xs font-bold uppercase tracking-widest text-gray-400">01 — Profile</span>
                <h2 class="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mt-4 mb-6 transition-colors">About<br>Me</h2>
                <div class="w-16 h-1 bg-black dark:bg-white transition-colors"></div>

                <div class="grid grid-cols-2 gap-6 mt-12">
                    <div class="border border-gray-200 dark:border-zinc-800 p-6 transition-colors">
                        <div class="stat-num text-4xl font-black text-black dark:text-white transition-colors" data-target="3">0</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1 font-bold">Years Exp.</div>
                    </div>
                    <div class="border border-gray-200 dark:border-zinc-800 p-6 transition-colors">
                        <div class="stat-num text-4xl font-black text-black dark:text-white transition-colors" data-target="20">0</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1 font-bold">Projects</div>
                    </div>
                    <div class="border border-gray-200 dark:border-zinc-800 p-6 transition-colors">
                        <div class="stat-num text-4xl font-black text-black dark:text-white transition-colors" data-target="8">0</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1 font-bold">Tech Stack</div>
                    </div>
                    <div class="border border-gray-200 dark:border-zinc-800 p-6 transition-colors">
                        <div class="stat-num text-4xl font-black text-black dark:text-white transition-colors" data-target="100">0</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1 font-bold">% Committed</div>
                    </div>
                </div>
            </div>

            <div class="md:col-span-7 space-y-6 text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed reveal delay-2 transition-colors">
                <p>
                    I am a Full Stack Developer based in <strong class="text-black dark:text-white font-semibold transition-colors">Karachi, Pakistan</strong>, specialising in building complex, data-driven web applications and comprehensive ERP systems. My foundation: a Diploma in Software Development from Aptech, combined with a Pre-Engineering background that hardwires analytical thinking into everything I build.
                </p>
                <p>
                    My core focus sits at the intersection of <strong class="text-black dark:text-white font-semibold transition-colors">backend architecture</strong>, sophisticated database logic, and translating heavy data loads into clean, punchy, one-screen digital environments. I write code that is as scalable and robust behind the scenes as it is intuitive and sleek on the front end.
                </p>
                <p>
                    I am currently seeking a full-time role where I can contribute to a highly technical team. I've delivered vehicle valuation platforms, large-scale ERP systems, and high-density admin dashboards — always engineered with performance and maintainability as first-class priorities.
                </p>

                <div class="mt-12 space-y-8 border-t border-gray-100 dark:border-zinc-800 pt-10 transition-colors">
                    <div class="flex gap-5 items-start">
                        <div class="flex flex-col items-center">
                            <div class="tl-dot"></div>
                            <div class="w-px flex-1 bg-gray-200 dark:bg-zinc-800 mt-2 min-h-[3rem] transition-colors"></div>
                        </div>
                        <div>
                            <span class="text-xs text-gray-400 font-bold uppercase tracking-widest">Jan 2025 – May 2026</span>
                            <p class="font-bold text-black dark:text-white text-base mt-1 transition-colors">Full Stack Developer — Raddium Technology</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">Developed and maintained core modules for enterprise ERP systems, built secure RESTful APIs using Laravel, implemented OAuth, and engineered backend logic utilizing advanced MySQL joins.</p>
                        </div>
                    </div>
                    <div class="flex gap-5 items-start">
                        <div class="flex flex-col items-center">
                            <div class="tl-dot" style="animation-delay:.3s;"></div>
                            <div class="w-px flex-1 bg-gray-200 dark:bg-zinc-800 mt-2 min-h-[3rem] transition-colors"></div>
                        </div>
                        <div>
                            <span class="text-xs text-gray-400 font-bold uppercase tracking-widest">2024 – 2025</span>
                            <p class="font-bold text-black dark:text-white text-base mt-1 transition-colors">Receptionist — Al-Azhar School</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">Managed front-desk operations, visitor handling, and highly detailed student administrative records.</p>
                        </div>
                    </div>
                    <div class="flex gap-5 items-start">
                        <div class="flex flex-col items-center">
                            <div class="tl-dot" style="animation-delay:.6s;"></div>
                        </div>
                        <div>
                            <span class="text-xs text-gray-400 font-bold uppercase tracking-widest">2023 – 2024</span>
                            <p class="font-bold text-black dark:text-white text-base mt-1 transition-colors">Billing &amp; Inventory Operator — Nafey Traders</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">Operated POS systems for billing execution and proactive inventory stock level management.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
</script>
