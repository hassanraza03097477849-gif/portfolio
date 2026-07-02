<template>
<section id="expertise" class="py-24 bg-gray-50 dark:bg-[#111] border-b border-gray-200 dark:border-zinc-900 relative overflow-hidden transition-colors">
    <div class="absolute inset-0 pointer-events-none">
        <div style="position:absolute;top:5%;left:50%;width:1px;height:90%;background:linear-gradient(to bottom,transparent,rgba(128,128,128,.1),transparent);"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
            <div class="reveal">
                <span class="text-xs font-bold uppercase tracking-widest text-gray-400">02 — Technologies</span>
                <h2 class="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mt-4 transition-colors">The Stack</h2>
            </div>
            <p class="text-gray-500 dark:text-gray-400 max-w-xs text-sm mt-4 md:mt-0 reveal delay-2 transition-colors">Battle-tested tools across the entire development pipeline.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div v-for="(skill, index) in skills" :key="index" :class="`skill-tag group bg-white dark:bg-zinc-900 p-8 flex flex-col items-center justify-center gap-2 reveal delay-${(index % 4) + 1} transition-colors`">
                <i :class="`${skill.icon} text-[#0D7961] group-hover:text-white transition-colors duration-300 text-3xl mb-2`"></i>
                <span class="font-black text-base tracking-tight text-black dark:text-white group-hover:text-white transition-colors duration-300">{{ skill.name }}</span>
                <span class="text-xs text-gray-400 uppercase tracking-widest group-hover:text-gray-300 transition-colors duration-300">{{ skill.category }}</span>
            </div>
        </div>

        <div class="mt-16 grid md:grid-cols-2 gap-x-16 gap-y-8 reveal delay-2">
            <div v-for="(stat, index) in stats" :key="index">
                <div class="flex justify-between text-sm font-bold mb-2 transition-colors"><span class="text-black dark:text-white">{{ stat.name }}</span><span class="text-gray-400">{{ stat.percentage }}%</span></div>
                <div class="h-1 bg-gray-200 dark:bg-zinc-800 overflow-hidden transition-colors"><div class="h-full bg-black dark:bg-white bar-fill transition-colors" :data-width="stat.percentage"></div></div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
const skills = [
    { name: 'Laravel', category: 'Backend', icon: 'fa-brands fa-laravel' },
    { name: 'Vue.js', category: 'Frontend', icon: 'fa-brands fa-vuejs' },
    { name: 'React', category: 'Frontend', icon: 'fa-brands fa-react' },
    { name: 'Flutter', category: 'Mobile', icon: 'fa-solid fa-mobile-screen-button' },
    { name: 'MySQL', category: 'Database', icon: 'fa-solid fa-database' },
    { name: 'MongoDB', category: 'Database', icon: 'fa-solid fa-leaf' },
    { name: 'Figma', category: 'Design', icon: 'fa-brands fa-figma' },
    { name: 'Python', category: 'Backend', icon: 'fa-brands fa-python' }
];

const stats = [
    { name: 'Laravel / PHP', percentage: 95 },
    { name: 'Vue.js / React', percentage: 85 },
    { name: 'MySQL / MongoDB', percentage: 90 },
    { name: 'Flutter', percentage: 70 }
];
</script>
