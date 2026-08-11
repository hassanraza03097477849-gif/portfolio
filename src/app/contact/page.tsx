import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Hassan Raza",
  description: "Get in touch with Hassan Raza for full-time opportunities, freelance projects, or collaborations.",
  openGraph: {
    title: "Contact | Hassan Raza",
    description: "Hire Hassan Raza — Full Stack Developer based in Karachi, Pakistan. Open to full-time and freelance opportunities.",
    url: "https://hassanraza.online/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors">
        {/* Page Hero */}
        <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto border-b border-gray-200 dark:border-zinc-900">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-black dark:bg-white transition-colors"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Contact
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter leading-none transition-colors">
            Let&apos;s work<br />
            <span className="text-gray-300 dark:text-zinc-700">together.</span>
          </h1>
          <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg max-w-xl leading-relaxed">
            I am actively seeking full-time opportunities with forward-thinking technical teams. Whether you are hiring for a specific role or looking to collaborate, I would love to connect.
          </p>
        </div>

        {/* Contact Form + Info */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
