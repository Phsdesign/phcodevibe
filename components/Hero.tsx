"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // If mobile, set count to target immediately and skip animation
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!isVisible) return;
    // Animation skip double-check for resize
    if (window.innerWidth < 768) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * target));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return { count, elementRef };
}

export function Hero() {
  const projectsCounter = useCounter(120, 2500);
  const satisfactionCounter = useCounter(99, 2500);
  const autoralCounter = useCounter(100, 2500);

  const ROTATING_WORDS = ["Imbatíveis.", "Lendárias.", "Absolutas.", "Únicas."];
  const [wordIndex, setWordIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [ROTATING_WORDS.length]);

  return (
    <section id="hero" className="hero-section" style={{ position: "relative", overflow: isMobile ? "visible" : "hidden", minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", background: "var(--bg)" }}>
      {/* Background Video Implementation - Only on Desktop */}
      {isDesktop && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
              willChange: "transform",
              transform: "translate3d(0,0,0)",
              filter: "var(--hero-video-filter)", // Dinâmico via CSS vars
            }}
          >
            <source src="/bg-hero-v2.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          {/* Overlay Branco para clarear ainda mais */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "var(--glass)",
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.5
          }} />
        </>
      )}

      {/* Content */}
      <div className="container hero-reveal-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* STATUS BADGE */}
        <div className="hero-reveal orbai-badge hidden md:inline-flex" style={{ marginBottom: "2rem", background: "var(--bg-secondary)", color: "var(--text-primary)", borderColor: "var(--border-color)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--text-primary)" }}>
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/>
          </svg>
          <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>Design & Experiências High-End</span>
        </div>

        {/* HERO TITLE */}
        <h1 className="hero-title" style={{ color: "var(--text-primary)" }}>
          <span className="block hero-reveal" style={{ color: "var(--text-primary)" }}>Design de Elite.</span>
          <span className="block hero-reveal" style={{ animationDelay: "100ms", color: "var(--text-primary)" }}>
            Marcas
          </span>
          <span className="block hero-reveal" style={{ animationDelay: "200ms", color: "var(--text-primary)" }}>
            <span key={wordIndex} className="inline-block animate-word-rotate hero-rotating-word" style={{ color: "var(--text-primary)" }}>
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        <p className="hero-reveal hero-subtitle" style={{ animationDelay: "200ms", color: "var(--text-primary)", opacity: 0.7 }}>
          Criamos identidades digitais de alto luxo e tecnologia para marcas que buscam o topo do mercado.
        </p>

        {/* CTAs */}
        <div className="hero-reveal hero-ctas" style={{ animationDelay: "400ms" }}>
          <Link href="#portfolio" className="hero-cta-primary" aria-label="Ver portfólio de projetos" style={{ background: "var(--text-primary)", color: "var(--bg)" }}>
            Ver Projetos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
          <a href="https://wa.me/5549991031743" target="_blank" rel="noopener noreferrer" className="hero-cta-secondary" aria-label="Falar conosco no WhatsApp" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>
            Ver Serviços
          </a>
        </div>

        {/* Bento preview stats */}
        <div className="hero-stats-grid" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div className="neu-card hero-reveal hero-stat-tall" style={{ minHeight: "160px", flex: "1 1 200px", maxWidth: "280px", animationDelay: "500ms", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <p ref={projectsCounter.elementRef} className="hero-stat-number" style={{ color: "var(--text-primary)" }}>{projectsCounter.count}+</p>
            <p className="hero-stat-label" style={{ color: "var(--text-primary)", opacity: 0.6 }}>Projetos Lançados</p>
          </div>
          <div className="neu-card hero-reveal hero-stat-dark" style={{ minHeight: "160px", flex: "1 1 200px", maxWidth: "280px", animationDelay: "600ms", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <p ref={satisfactionCounter.elementRef} className="hero-stat-number" style={{ color: "var(--text-primary)" }}>{satisfactionCounter.count}%</p>
            <p className="hero-stat-label" style={{ color: "var(--text-primary)", opacity: 0.6 }}>Satisfação</p>
          </div>
          <div className="neu-card hero-reveal hero-stat-light" style={{ minHeight: "160px", flex: "1 1 200px", maxWidth: "280px", animationDelay: "700ms", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <p ref={autoralCounter.elementRef} className="hero-stat-number" style={{ color: "var(--text-primary)" }}>{autoralCounter.count}%</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--text-primary)", display: "inline-block" }} />
              <p className="hero-stat-label" style={{ color: "var(--text-primary)", opacity: 0.6 }}>Design Autoral</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
