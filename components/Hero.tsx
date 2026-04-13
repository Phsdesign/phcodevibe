"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const entranceVariants = {
  hidden: (isMobile?: boolean) => ({ 
    opacity: 0, 
    y: isMobile ? 10 : 30, 
    filter: isMobile ? "none" : "blur(10px)" 
  }),
  visible: ({ custom, isMobile }: { custom: number; isMobile?: boolean }) => ({
    opacity: 1,
    y: 0,
    filter: "none",
    transition: {
      delay: isMobile ? custom * 0.5 : custom,
      duration: isMobile ? 0.6 : 1.2,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
};

const cardHoverVariants = {
  initial: { 
    backgroundColor: "rgba(0, 0, 0, 0.05)", 
    color: "var(--text-primary)"
  },
  hover: { 
    backgroundColor: "var(--text-primary)", 
    color: "var(--bg)",
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const textHoverVariants = {
  initial: { color: "var(--text-primary)" },
  hover: { color: "var(--bg)" }
};

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
    <section id="hero" className="hero-section" style={{ position: "relative", overflow: "visible", minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", background: "var(--bg)", transition: "background 0.5s ease" }}>
      {/* Background Video Implementation - LOCAL HIGH-FIDELITY SOURCE (186MB Crystal Clear) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        key="hero-video-v6-local-hiqh"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          filter: isMobile 
            ? "invert(var(--invert-value)) contrast(1.2) brightness(1) saturate(0.1)" // Sharper & Less fog on mobile
            : "invert(var(--invert-value)) contrast(1.1) brightness(1.05) saturate(0.2)", // Sophisticated B&W+
          transition: "filter 0.5s ease"
        }}
      >
        <source src="/hero-concept-optimized.mp4" type="video/mp4" />
      </video>
      
      {/* FILM GRAIN OVERLAY (Subtler on mobile to avoid 'noise fog') */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: isMobile ? 0.02 : 0.05,
        background: "url('https://res.cloudinary.com/did7m7xtb/image/upload/v1672674485/noise_t6o8y7.png')",
        backgroundRepeat: "repeat",
        mixBlendMode: "overlay"
      }} />

      {/* Overlay - Radial Depth (Disabled on Mobile to remove 'fog' effect) */}
      {!isMobile && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, transparent 0%, var(--bg) 95%)",
          opacity: 1,
          zIndex: 2,
          pointerEvents: "none",
          transition: "all 0.5s ease"
        }} />
      )}

      {/* Content */}
      <div className="container hero-reveal-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* STATUS BADGE */}
        <motion.div 
          custom={{ custom: 3.6, isMobile }}
          initial="hidden"
          animate="visible"
          variants={entranceVariants}
          className="orbai-badge hidden md:inline-flex" 
          style={{ marginBottom: "2rem", background: "var(--bg-secondary)", color: "var(--text-primary)", borderColor: "var(--border-color)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--text-primary)" }}>
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/>
          </svg>
          <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>Design & Experiências High-End</span>
        </motion.div>

        {/* HERO TITLE */}
        <h1 className="hero-title" style={{ color: "var(--text-primary)" }}>
          <motion.span 
            custom={{ custom: 3.8, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
            className="block" style={{ color: "var(--text-primary)" }}
          >
            Design de Elite.
          </motion.span>
          <motion.span 
            custom={{ custom: 3.9, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
            className="block" style={{ color: "var(--text-primary)" }}
          >
            Marcas
          </motion.span>
          <motion.span 
            custom={{ custom: 4.0, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
            className="block" style={{ color: "var(--text-primary)" }}
          >
            <span key={wordIndex} className="inline-block animate-word-rotate hero-rotating-word" style={{ color: "var(--text-primary)" }}>
              {ROTATING_WORDS[wordIndex]}
            </span>
          </motion.span>
        </h1>

        <motion.p 
          custom={{ custom: 4.2, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
          className="hero-subtitle" style={{ color: "var(--text-primary)", opacity: 0.7 }}
        >
          Criamos identidades digitais de alto luxo e tecnologia para marcas que buscam o topo do mercado.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          custom={{ custom: 4.4, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
          className="hero-ctas"
        >
          <Link href="#portfolio" className="hero-cta-primary" aria-label="Ver portfólio de projetos" style={{ background: "var(--text-primary)", color: "var(--bg)" }}>
            Ver Projetos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
          <a href="https://wa.me/5549991031743" target="_blank" rel="noopener noreferrer" className="hero-cta-secondary" aria-label="Falar conosco no WhatsApp" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>
            Ver Serviços
          </a>
        </motion.div>

        {/* Bento preview stats */}
        <div className="hero-stats-grid" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <motion.div 
            custom={{ custom: 4.6, isMobile }} initial="hidden" animate="visible" whileHover="hover"
            variants={entranceVariants}
          >
            <motion.div
              variants={cardHoverVariants}
              initial="initial"
              className="neu-card hero-stat-tall" 
              style={{ minHeight: "160px", flex: "1 1 200px", maxWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid var(--border-color)", cursor: "pointer" }}
            >
              <p ref={projectsCounter.elementRef} className="hero-stat-number" style={{ color: "inherit" }}>{projectsCounter.count}+</p>
              <p className="hero-stat-label" style={{ color: "inherit", opacity: 0.6 }}>Projetos Lançados</p>
            </motion.div>
          </motion.div>

          <motion.div 
            custom={{ custom: 4.7, isMobile }} initial="hidden" animate="visible" whileHover="hover"
            variants={entranceVariants}
          >
            <motion.div
              variants={cardHoverVariants}
              initial="initial"
              className="neu-card hero-stat-dark" 
              style={{ minHeight: "160px", flex: "1 1 200px", maxWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid var(--border-color)", cursor: "pointer" }}
            >
              <p ref={satisfactionCounter.elementRef} className="hero-stat-number" style={{ color: "inherit" }}>{satisfactionCounter.count}%</p>
              <p className="hero-stat-label" style={{ color: "inherit", opacity: 0.6 }}>Satisfação</p>
            </motion.div>
          </motion.div>

          <motion.div 
            custom={{ custom: 4.8, isMobile }} initial="hidden" animate="visible" whileHover="hover"
            variants={entranceVariants}
          >
            <motion.div
              variants={cardHoverVariants}
              initial="initial"
              className="neu-card hero-stat-light" 
              style={{ minHeight: "160px", flex: "1 1 200px", maxWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid var(--border-color)", cursor: "pointer" }}
            >
              <p ref={autoralCounter.elementRef} className="hero-stat-number" style={{ color: "inherit" }}>{autoralCounter.count}%</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                <p className="hero-stat-label" style={{ color: "inherit", opacity: 0.6 }}>Design Autoral</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* SECTION CONNECTOR - Mouse Scroll Indicator */}
      <div style={{
        position: "absolute",
        bottom: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 110,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none"
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 5 }}
          style={{
            width: "28px",
            height: "46px",
            borderRadius: "16px",
            border: "2px solid var(--text-primary)",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)"
          }}
        >
          {/* Moving Wheel */}
          <motion.div
            animate={{ 
              y: [6, 20, 6],
              opacity: [1, 0.2, 1],
              height: [8, 12, 8]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              width: "4px",
              background: "var(--text-primary)",
              borderRadius: "2px",
              marginTop: "6px"
            }}
          />
        </motion.div>
      </div>

    </section>
  );
}
