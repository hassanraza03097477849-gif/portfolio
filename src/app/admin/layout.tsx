"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Moon, Sun, LayoutDashboard, Briefcase, Mail, User, 
  Settings, LogOut, Type, Layers, FileText, Component,
  Menu, X, ChevronLeft, ChevronRight, Search, Bell
} from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      return () => observer.disconnect();
    }
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  const menuItems = [
    { name: "Overview", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Projects", path: "/admin/projects", icon: <Briefcase size={18} /> },
    { name: "Leads Inbox", path: "/admin/leads", icon: <Mail size={18} /> },
    { name: "CV / Profile", path: "/admin/profile", icon: <User size={18} /> },
  ];

  const contentItems = [
    { name: "Theme", path: "/admin/content/theme", icon: <Settings size={18} /> },
    { name: "Hero", path: "/admin/content/hero", icon: <Type size={18} /> },
    { name: "About", path: "/admin/content/about", icon: <FileText size={18} /> },
    { name: "Stack", path: "/admin/content/stack", icon: <Layers size={18} /> },
    { name: "Capabilities", path: "/admin/content/value", icon: <Component size={18} /> },
    { name: "Contact Settings", path: "/admin/content/contact", icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex text-black dark:text-white transition-colors overflow-hidden">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'dark:bg-[#111] dark:text-white dark:border dark:border-zinc-800 rounded-md text-xs font-bold uppercase tracking-widest shadow-xl',
          style: {
            borderRadius: '0px',
            background: '#fff',
            color: '#000',
            border: '1px solid #e5e7eb',
          },
          success: {
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
          },
        }} 
      />

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-[#0f0f0f] border-r border-gray-200 dark:border-zinc-900 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-zinc-900 flex-shrink-0">
          <Link href="/admin" className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white dark:text-black font-black text-xs leading-none">
                HR
              </span>
            </div>
            {!isCollapsed && (
              <span className="font-black tracking-widest uppercase text-xs whitespace-nowrap">
                CMS Panel
              </span>
            )}
          </Link>
          {/* Mobile Close Button */}
          <button 
            className="lg:hidden text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden scrollbar-thin">
          <div className="mb-8">
            {!isCollapsed && (
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-6 whitespace-nowrap">Core Data</div>
            )}
            <div className="space-y-1 px-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/admin");
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                      isActive 
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-md" 
                        : "text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800/50"
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div>
            {!isCollapsed && (
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-6 whitespace-nowrap">Landing Page</div>
            )}
            <div className="space-y-1 px-2">
              {contentItems.map((item) => {
                const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/admin");
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                      isActive 
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-md" 
                        : "text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800/50"
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className={`p-4 border-t border-gray-200 dark:border-zinc-900 flex flex-col gap-2 ${isCollapsed ? 'items-center' : ''}`}>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
            title={isCollapsed ? "Logout" : undefined}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 ${isCollapsed ? 'justify-center w-full' : 'w-full'}`}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`
        flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out w-full
        ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
      `}>
        
        {/* Topbar */}
        <header className="h-16 sticky top-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-gray-200 dark:border-zinc-900 z-30 flex items-center justify-between px-4 md:px-8 transition-colors shadow-sm">
          
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-gray-500 hover:text-black dark:hover:text-white transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Desktop Sidebar Collapse Toggle */}
            <button 
              className="hidden lg:flex text-gray-500 hover:text-black dark:hover:text-white transition-colors p-2 bg-gray-100 dark:bg-zinc-900 rounded-md border border-gray-200 dark:border-zinc-800"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Breadcrumb Mock */}
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span>System</span>
              <span className="text-gray-300 dark:text-zinc-700">/</span>
              <span className="text-black dark:text-white">
                {pathname === "/admin" ? "Overview" : pathname.replace('/admin/', '').replace('/', ' / ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Search Mock (Massive Dashboard feel) */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-3 py-1.5 rounded-md w-64 text-gray-400 focus-within:border-black dark:focus-within:border-white focus-within:text-black dark:focus-within:text-white transition-colors">
              <Search size={14} />
              <input type="text" placeholder="Search commands..." className="bg-transparent text-xs outline-none w-full placeholder:text-gray-400 font-medium" />
              <div className="text-[10px] font-bold bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-1.5 rounded text-gray-400">⌘K</div>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors relative p-2 hidden sm:block">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#0a0a0a]"></span>
              </button>
              
              <button
                onClick={toggleTheme}
                className="text-gray-400 hover:text-black dark:hover:text-white transition-colors outline-none p-2"
                aria-label="Toggle Dark Mode"
              >
                {!isDark ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>

            <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-gray-200 dark:border-zinc-800">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-bold uppercase tracking-widest leading-tight">Hassan Raza</div>
                <div className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Superadmin</div>
              </div>
              <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center rounded-md shadow-sm">
                <User size={16} className="text-white dark:text-black" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
