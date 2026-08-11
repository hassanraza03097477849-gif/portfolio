<template>
<div class="border-y border-gray-200 dark:border-zinc-900 bg-black dark:bg-[#050505] py-4 overflow-hidden relative z-10 transition-colors">
    <div class="marquee-track">
        <div class="flex items-center gap-12 pr-12 select-none">
            <span v-for="(item, index) in items" :key="index" class="flex items-center gap-12">
                <span class="text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">{{ item }}</span>
                <span class="text-gray-600 dark:text-gray-700 text-lg">✦</span>
            </span>
        </div>
    </div>
</div>
</template>

<script setup>
const baseItems = [
    "Full Stack Development",
    "ERP Architecture",
    "Database Engineering",
    "Laravel · Vue · React · Flutter",
    "High-Density Dashboards",
    "Available for Hire"
];
// Duplicate for seamless scroll
const items = [...baseItems, ...baseItems, ...baseItems];
</script>
