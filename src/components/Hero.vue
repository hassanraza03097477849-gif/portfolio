<template>
<section class="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <div class="inline-flex items-center gap-2 mb-8 px-3 py-1 border border-gray-300 dark:border-zinc-700 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 transition-colors"
                     style="animation:fadeIn 1s .1s both">
                    <span class="w-2 h-2 bg-green-500 rounded-full" style="animation:pulseDot 2s infinite"></span>
                    Available for full-time opportunities
                </div>

                <h1 class="font-black text-black dark:text-white tracking-tighter leading-none mb-6 transition-colors"
                    style="font-size:clamp(3.5rem,10vw,8rem);">
                    <span class="hero-line"><span>HASSAN</span></span>
                    <span class="hero-line glitch" data-text="RAZA"><span>RAZA</span></span>
                </h1>

                <p class="text-gray-500 dark:text-gray-400 text-lg max-w-md leading-relaxed mb-10 transition-colors"
                   style="animation:fadeInUp .9s .8s both">
                    Detail-oriented Full Stack Developer with robust experience engineering ERP systems and high-performance web applications from Karachi.
                </p>

                <div class="flex flex-wrap gap-4" style="animation:fadeInUp .9s 1s both">
                    <a href="#capabilities"
                       class="bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 inline-block">
                        View Value Add
                    </a>
                    <a href="#contact"
                       class="border-2 border-black dark:border-white text-black dark:text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-1 inline-block">
                        Hire Me
                    </a>
                </div>

                <div class="flex items-center gap-3 mt-16" style="animation:fadeInUp .9s 1.2s both">
                    <div class="scroll-line"></div>
                    <span class="text-xs text-gray-400 uppercase tracking-widest">Scroll to explore</span>
                </div>
            </div>

            <div class="relative flex items-center justify-center h-80 lg:h-[500px] orbit-wrap"
                 style="animation:fadeIn 1.2s 1s both">
                <div class="relative w-56 h-72 lg:w-72 lg:h-96 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-2xl z-10 transition-colors">
                    <img src="/2.png" alt="Hassan Raza"
                         class="object-cover w-full h-full grayscale contrast-125 hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-75" />
                    <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black dark:border-white pointer-events-none transition-colors"></div>
                    <div class="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black dark:border-white pointer-events-none transition-colors"></div>
                    <div class="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black dark:border-white pointer-events-none transition-colors"></div>
                    <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black dark:border-white pointer-events-none transition-colors"></div>
                </div>
                <div class="orbit-ring" style="width:320px;height:320px;">
                    <div class="orbit-dot"></div>
                </div>
                <div class="orbit-ring reverse" style="width:440px;height:440px;">
                    <div class="orbit-dot" style="background:#9ca3af;width:6px;height:6px;top:-3px;"></div>
                </div>
                <div class="orbit-ring" style="width:560px;height:560px;border-style:dotted;animation-duration:35s;">
                    <div class="orbit-dot" style="background:#d1d5db;width:4px;height:4px;top:-2px;"></div>
                </div>
                <div class="absolute font-bold text-xs uppercase tracking-widest bg-white dark:bg-zinc-900 dark:text-white border border-gray-200 dark:border-zinc-800 px-3 py-1 shadow-md transition-colors" style="top:10%;right:5%;animation:floatDot 5s 0s ease-in-out infinite;">Laravel</div>
                <div class="absolute font-bold text-xs uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-3 py-1 shadow-md transition-colors" style="bottom:18%;left:2%;animation:floatDot 5s 1s ease-in-out infinite;">Vue.js</div>
                <div class="absolute font-bold text-xs uppercase tracking-widest bg-white dark:bg-zinc-900 dark:text-white border border-gray-200 dark:border-zinc-800 px-3 py-1 shadow-md transition-colors" style="bottom:5%;right:15%;animation:floatDot 5s 2s ease-in-out infinite;">MySQL</div>
                <div class="absolute font-bold text-xs uppercase tracking-widest bg-white dark:bg-zinc-900 dark:text-white border border-gray-200 dark:border-zinc-800 px-3 py-1 shadow-md transition-colors" style="top:25%;left:0%;animation:floatDot 5s 1.5s ease-in-out infinite;">React</div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
</script>
