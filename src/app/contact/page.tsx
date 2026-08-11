"use client";

import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) setIsHovered(true);
    };
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) setIsHovered(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen text-black dark:text-white transition-colors">
      <div
        id="cursor"
        className={isHovered ? "hovered" : ""}
        style={{ left: `${cursorX}px`, top: `${cursorY}px` }}
      ></div>
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
