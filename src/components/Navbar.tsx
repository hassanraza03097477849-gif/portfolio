"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { href: "/", label: "About" },
    { href: "/projects", label: "Work" },
    { href: "/profile", label: "CV" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-zinc-900 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center transition-transform duration-500">
            <span className="text-white dark:text-black font-black text-sm leading-none">
              HR
            </span>
          </div>
          <span className="font-black tracking-widest uppercase text-sm text-black dark:text-white">
            Hassan Raza
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors anim-link hover:text-black dark:hover:text-white ${
                  isActive(link.href)
                    ? "text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors outline-none"
              aria-label="Toggle Dark Mode"
            >
              {!isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link
              href="/contact"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Hire Me
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white outline-none"
          >
            {!isDark ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link
            href="/contact"
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest"
          >
            Contact
          </Link>
        </div>

      </div>
    </nav>
  );
}
