<template>
<nav class="fixed w-full border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-lg z-50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-black dark:bg-white flex items-center justify-center transition-colors">
                <span class="text-white dark:text-black font-black text-xs transition-colors">HR</span>
            </div>
            <span class="font-black tracking-widest uppercase text-sm dark:text-white transition-colors">Hassan Raza</span>
        </div>
        <div class="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
            <a href="#about" :class="navClass('#about')" @click="active = '#about'" class="hover:text-black dark:hover:text-white transition-colors anim-link">About</a>
            <a href="#expertise" :class="navClass('#expertise')" @click="active = '#expertise'" class="hover:text-black dark:hover:text-white transition-colors anim-link">Stack</a>
            <a href="#capabilities" :class="navClass('#capabilities')" @click="active = '#capabilities'" class="hover:text-black dark:hover:text-white transition-colors anim-link">Services</a>
            
            <button @click="$emit('toggle-theme')" class="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors outline-none" aria-label="Toggle Dark Mode">
                <i v-if="!isDark" class="fa-solid fa-moon text-lg"></i>
                <i v-else class="fa-solid fa-sun text-lg"></i>
            </button>

            <a href="#contact" class="bg-black dark:bg-white text-white dark:text-black px-5 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">Contact</a>
        </div>
        <div class="flex items-center gap-4 md:hidden">
            <button @click="$emit('toggle-theme')" class="text-gray-500 dark:text-gray-400 outline-none">
                <i v-if="!isDark" class="fa-solid fa-moon text-lg"></i>
                <i v-else class="fa-solid fa-sun text-lg"></i>
            </button>
            <a href="#contact" class="text-xs font-bold uppercase tracking-widest text-black dark:text-white border border-black dark:border-white px-3 py-2 transition-colors">Contact</a>
        </div>
    </div>
</nav>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    isDark: Boolean
});

const active = ref('');
const navClass = (path) => {
    return active.value === path ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400';
};
</script>
