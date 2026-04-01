"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!isVisible) return;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [ROTATING_WORDS.length]);

  return (
    <section id="hero" className="hero-section" style={{ position: "relative", overflow: "hidden", minHeight: "100vh", width: "100%", display: "flex", alignItems: "center" }}>
      {/* Background Video Implementation */}
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
        }}
      >
        <source src="/bg-hero.webm" type="video/webm" />
        <source src="/bg-hero.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Content */}
      <div className="container hero-reveal-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Status Badge */}
        <div className="animate-on-scroll orbai-badge hidden md:inline-flex" style={{ marginBottom: "2rem" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/>
          </svg>
          <span>Design & Experiências High-End</span>
        </div>

        {/* HERO TITLE */}
        <h1 className="hero-title">
          <span className="block animate-fade-slide">Design de Elite.</span>
          <span className="block animate-fade-slide" style={{ animationDelay: "100ms" }}>
            Marcas
          </span>
          <span className="block animate-fade-slide" style={{ animationDelay: "200ms" }}>
            <span key={wordIndex} className="inline-block animate-word-rotate hero-rotating-word">
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        <p className="animate-on-scroll hero-subtitle" data-delay="200">
          Criamos identidades digitais de alto luxo e tecnologia para marcas que buscam o topo do mercado.
        </p>

        {/* CTAs */}
        <div className="animate-on-scroll hero-ctas" data-delay="400">
          <Link href="#portfolio" className="hero-cta-primary" aria-label="Ver portfólio de projetos">
            Ver Projetos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
          <a href="https://wa.me/5549991031743" target="_blank" rel="noopener noreferrer" className="hero-cta-secondary" aria-label="Falar conosco no WhatsApp">
            Ver Serviços
          </a>
        </div>

        {/* Bento preview stats */}
        <div className="hero-stats-grid" style={{ marginBottom: "2rem" }}>
          <div className="neu-card animate-fade-slide-1 hero-stat-tall" style={{ minHeight: "140px" }}>
            <p ref={projectsCounter.elementRef} className="hero-stat-number">{projectsCounter.count}+</p>
            <p className="hero-stat-label">Projetos Lançados</p>
          </div>
          <div className="neu-card animate-fade-slide-2 hero-stat-dark" style={{ minHeight: "100px" }}>
            <p ref={satisfactionCounter.elementRef} className="hero-stat-number" style={{ color: "#fff" }}>{satisfactionCounter.count}%</p>
            <p className="hero-stat-label" style={{ color: "rgba(255,255,255,0.6)" }}>Satisfação</p>
          </div>
          <div className="neu-card animate-fade-slide-3 hero-stat-light" style={{ minHeight: "100px" }}>
            <p ref={autoralCounter.elementRef} className="hero-stat-number" style={{ textAlign: "center" }}>{autoralCounter.count}%</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#000", display: "inline-block" }} />
              <p className="hero-stat-label" style={{ textAlign: "center" }}>Design Autoral</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
