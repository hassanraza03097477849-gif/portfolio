"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomeClient({ heroData, projectsData, aboutData, cvData, stackData }: { heroData: any; projectsData: any; aboutData?: any; cvData?: any; stackData?: any }) {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, .skill-tag, .cap-card")) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, .skill-tag, .cap-card")) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Reveal Animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".reveal,.reveal-left,.reveal-scale")
      .forEach((el) => revealObserver.observe(el));

    // Counter Animations
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const target = parseInt(el.dataset.target || "0");
            const dur = 1600;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1);
              const ease = 1 - Math.pow(1 - p, 4);
              el.textContent = Math.floor(ease * target).toString();
              if (p < 1) requestAnimationFrame(tick);
              else el.textContent = target.toString();
            };
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    document
      .querySelectorAll("[data-target]")
      .forEach((el) => counterObserver.observe(el));

    // Progress Bars
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const bar = e.target as HTMLElement;
            setTimeout(() => {
              bar.style.width = bar.dataset.width + "%";
            }, 200);
            barObserver.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );
    document
      .querySelectorAll(".bar-fill")
      .forEach((el) => barObserver.observe(el));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        id="cursor"
        className={isHovered ? "hovered" : ""}
        style={{ left: `${cursorX}px`, top: `${cursorY}px` }}
      ></div>

      {/* Background Shapes */}
      <div
        className="shape shape-circle"
        style={{ top: "-180px", right: "-180px" }}
      ></div>
      <div
        className="shape shape-circle"
        style={{
          bottom: "-150px",
          left: "-150px",
          width: "350px",
          height: "350px",
          animationDelay: "4s",
        }}
      ></div>
      <div
        className="shape shape-square"
        style={{ top: "30vh", left: "5vw", animationDelay: "2s" }}
      ></div>
      <div
        className="shape shape-square"
        style={{
          bottom: "20vh",
          right: "8vw",
          width: "120px",
          height: "120px",
          animationDelay: "6s",
          animationDuration: "16s",
        }}
      ></div>
      <div
        className="shape shape-ring"
        style={{ top: "60vh", left: "60vw", animationDelay: "1s" }}
      ></div>
      <div
        className="shape shape-triangle"
        style={{ top: "15vh", right: "20vw", animationDelay: "3s" }}
      ></div>
      <div
        className="shape shape-plus"
        style={{ top: "45vh", right: "12vw" }}
        id="pl1"
      ></div>
      <div
        className="shape shape-plus"
        style={{ top: "80vh", left: "15vw", animationDelay: "3s" }}
        id="pl2"
      ></div>
      <div
        className="shape shape-dot"
        style={{ top: "22vh", left: "25vw", animationDelay: ".5s" }}
      ></div>
      <div
        className="shape shape-dot"
        style={{ top: "55vh", right: "30vw", animationDelay: "1.5s" }}
      ></div>
      <div
        className="shape shape-dot"
        style={{ top: "75vh", left: "45vw", animationDelay: "2.5s" }}
      ></div>
      <div
        className="shape shape-dot"
        style={{ top: "38vh", right: "18vw", animationDelay: "3.5s" }}
      ></div>
      <div
        className="shape shape-line"
        style={{ top: "25vh", left: "15vw", animationDelay: "1s" }}
      ></div>
      <div
        className="shape shape-line"
        style={{ top: "60vh", right: "22vw", animationDelay: "2s" }}
      ></div>

      <Navbar />
      <Hero data={{ ...heroData, cvUrl: cvData?.cvUrl }} />
      <Marquee data={stackData?.items || heroData.marqueeItems} />
      <About aboutData={aboutData} cvData={cvData} />
      <Skills data={stackData?.items} />
      <Services />
      <Projects data={projectsData} featuredOnly={true} />
      <Contact />
      <Footer />
    </>
  );
}
