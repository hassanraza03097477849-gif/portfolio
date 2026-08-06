<template>
<footer class="bg-black dark:bg-[#050505] text-white py-12 border-t border-gray-900 dark:border-zinc-900 relative overflow-hidden transition-colors">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px);background-size:40px 40px;"></div>
    <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white dark:bg-zinc-800 flex items-center justify-center transition-colors">
                <span class="text-black dark:text-white font-black text-xs transition-colors">HR</span>
            </div>
            <span class="font-black tracking-widest uppercase text-sm">Hassan Raza</span>
        </div>
        <p class="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest transition-colors">Karachi, Pakistan</p>
        <p class="text-gray-700 dark:text-gray-500 text-xs transition-colors">&copy; {{ new Date().getFullYear() }} All rights reserved.</p>
    </div>
</footer>
</template>

<script setup>
</script>
