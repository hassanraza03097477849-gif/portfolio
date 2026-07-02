<template>
<section id="contact" class="py-32 bg-gray-50 dark:bg-[#111] relative overflow-hidden transition-colors">
    <div style="position:absolute;bottom:0;right:0;width:400px;height:400px;border-radius:50%;border:1px solid var(--grid-line);animation:pulseRing 8s ease-in-out infinite;transform-origin:bottom right;"></div>
    <div style="position:absolute;top:10%;left:-100px;width:250px;height:250px;border:1px solid var(--grid-line);animation:rotateSq 25s linear infinite;"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16">
        <div class="reveal delay-1">
            <span class="text-xs font-bold uppercase tracking-widest text-gray-400">04 — Contact</span>
            <h2 class="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter mt-4 mb-8 transition-colors">Let's work<br>together.</h2>
            <p class="text-gray-500 dark:text-gray-400 mb-12 max-w-md text-lg font-light leading-relaxed transition-colors">
                Currently open for full-time job opportunities. Feel free to reach out to discuss how I can contribute to your next project.
            </p>

            <div class="space-y-6">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-black dark:bg-white flex items-center justify-center text-white dark:text-black transition-colors">
                        <i class="fa-solid fa-at text-xl"></i>
                    </div>
                    <div>
                        <span class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Email</span>
                        <a href="mailto:hassanraza03097477849@gmail.com" class="text-base font-semibold text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors anim-link">hassanraza03097477849@gmail.com</a>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-gray-200 dark:bg-zinc-800 flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-location-dot text-black dark:text-white text-xl transition-colors"></i>
                    </div>
                    <div>
                        <span class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Location</span>
                        <span class="text-base font-semibold text-black dark:text-white transition-colors">Karachi, Pakistan</span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-gray-200 dark:bg-zinc-800 flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-file-lines text-black dark:text-white text-xl transition-colors"></i>
                    </div>
                    <div>
                        <span class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Resume</span>
                        <a href="/2132.pdf" download class="text-base font-semibold text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors anim-link">Download CV</a>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-gray-200 dark:bg-zinc-800 flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-phone text-black dark:text-white text-xl transition-colors"></i>
                    </div>
                    <div>
                        <span class="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">Phone</span>
                        <span class="text-base font-semibold text-black dark:text-white transition-colors">0309-7477849</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="reveal delay-3">
            <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm p-8 lg:p-10 transition-colors" id="form-container">
                <form v-if="!formSubmitted" @submit.prevent="submitForm" class="w-full">
                    <div class="grid grid-cols-2 gap-6 mb-8">
                        <div class="space-y-2">
                            <label class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Name</label>
                            <input v-model="form.name" type="text" required class="form-input placeholder-gray-400 dark:placeholder-gray-600" placeholder="John Doe">
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Email</label>
                            <input v-model="form.email" type="email" required class="form-input placeholder-gray-400 dark:placeholder-gray-600" placeholder="john@example.com">
                        </div>
                    </div>
                    
                    <div class="space-y-2 mb-8">
                        <label class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Inquiry type</label>
                        <select v-model="form.inquiry_type" required class="form-input">
                            <option value="Full-Time Opportunity" class="dark:bg-zinc-900">Full-Time Opportunity</option>
                            <option value="Freelance / Contract" class="dark:bg-zinc-900">Freelance / Contract</option>
                            <option value="Consulting" class="dark:bg-zinc-900">Consulting</option>
                            <option value="Other" class="dark:bg-zinc-900">Other</option>
                        </select>
                    </div>
                    
                    <div class="space-y-2 mb-8">
                        <label class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Message</label>
                        <textarea v-model="form.message" rows="4" required class="form-input resize-none placeholder-gray-400 dark:placeholder-gray-600" placeholder="Tell me about your project or opportunity..."></textarea>
                    </div>
                    
                    <button type="submit" :disabled="loading" class="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors relative overflow-hidden group border-none cursor-pointer">
                        <span class="relative z-10 mix-blend-difference text-white">{{ btnText }}</span>
                        <div class="absolute inset-0 bg-gray-800 dark:bg-gray-300 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                    </button>
                </form>

                <div v-else class="text-center py-12 reveal visible">
                    <i class="fa-solid fa-circle-check text-5xl text-[#0D7961] mb-6"></i>
                    <h3 class="text-3xl font-black text-black dark:text-white tracking-tighter mb-4">Message Sent!</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                        Thank you for reaching out. I've received your message and will respond to you shortly.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formSubmitted = ref(false);
const loading = ref(false);
const btnText = ref('Send Message →');

const form = reactive({
    name: '',
    email: '',
    inquiry_type: 'Full-Time Opportunity',
    message: '',
    _subject: 'New Inquiry via Portfolio',
    _template: 'box'
});

const submitForm = async () => {
    loading.value = true;
    btnText.value = 'Sending...';

    try {
        const response = await fetch("https://formsubmit.co/ajax/hassanraza03097477849@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(form)
        });
        
        if (response.ok) {
            formSubmitted.value = true;
        } else {
            throw new Error('Error sending message');
        }
    } catch (error) {
        btnText.value = 'Error! Try Again.';
        setTimeout(() => {
            btnText.value = 'Send Message →';
            loading.value = false;
        }, 3000);
    }
};
</script>
