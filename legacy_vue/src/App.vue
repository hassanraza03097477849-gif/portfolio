<template>
  <div :class="{ dark: isDark }" class="transition-colors duration-300 min-h-screen grid-bg relative">
    <div id="cursor" :class="{ hovered: isHovered }" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>
    
    <!-- Background Shapes -->
    <div class="shape shape-circle" style="top:-180px;right:-180px;"></div>
    <div class="shape shape-circle" style="bottom:-150px;left:-150px;width:350px;height:350px;animation-delay:4s;"></div>
    <div class="shape shape-square" style="top:30vh;left:5vw;animation-delay:2s;"></div>
    <div class="shape shape-square" style="bottom:20vh;right:8vw;width:120px;height:120px;animation-delay:6s;animation-duration:16s;"></div>
    <div class="shape shape-ring" style="top:60vh;left:60vw;animation-delay:1s;"></div>
    <div class="shape shape-triangle" style="top:15vh;right:20vw;animation-delay:3s;"></div>
    <div class="shape shape-plus" style="top:45vh;right:12vw;" id="pl1"></div>
    <div class="shape shape-plus" style="top:80vh;left:15vw;animation-delay:3s;" id="pl2"></div>
    <div class="shape shape-dot" style="top:22vh;left:25vw;animation-delay:.5s;"></div>
    <div class="shape shape-dot" style="top:55vh;right:30vw;animation-delay:1.5s;"></div>
    <div class="shape shape-dot" style="top:75vh;left:45vw;animation-delay:2.5s;"></div>
    <div class="shape shape-dot" style="top:38vh;right:18vw;animation-delay:3.5s;"></div>
    <div class="shape shape-line" style="top:25vh;left:15vw;animation-delay:1s;"></div>
    <div class="shape shape-line" style="top:60vh;right:22vw;animation-delay:2s;"></div>

    <Navbar @toggle-theme="toggleTheme" :isDark="isDark" />
    <Hero />
    <Marquee />
    <About />
    <Skills />
    <Services />
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Marquee from './components/Marquee.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Services from './components/Services.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

const isDark = ref(false);
const cursorX = ref(0);
const cursorY = ref(0);
const isHovered = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const handleMouseMove = (e) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
};

const handleMouseOver = (e) => {
  if (e.target.closest('a, button, .skill-tag, .cap-card')) {
    isHovered.value = true;
  }
};

const handleMouseOut = (e) => {
  if (e.target.closest('a, button, .skill-tag, .cap-card')) {
    isHovered.value = false;
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  window.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);

  setTimeout(() => {
    // Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el => revealObserver.observe(el));

    // Counter Animations
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseInt(el.dataset.target);
                const dur = 1600;
                const start = performance.now();
                const tick = (now) => {
                    const p = Math.min((now - start) / dur, 1);
                    const ease = 1 - Math.pow(1 - p, 4);
                    el.textContent = Math.floor(ease * target);
                    if (p < 1) requestAnimationFrame(tick);
                    else el.textContent = target;
                };
                requestAnimationFrame(tick);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: .5 });
    document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

    // Progress Bars
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const bar = e.target;
                setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: .3 });
    document.querySelectorAll('.bar-fill').forEach(el => barObserver.observe(el));
  }, 100);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseover', handleMouseOver);
  document.removeEventListener('mouseout', handleMouseOut);
});
</script>
