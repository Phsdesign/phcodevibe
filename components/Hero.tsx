"use client";

import Link from "next/link";
import { memo, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { usePauseOffscreenAnimations } from "@/hooks/usePauseOffscreenAnimations";

const AntigravityBackground = dynamic(
  () => import("@/components/AntigravityBackground").then((m) => m.AntigravityBackground),
  { ssr: false }
);

const entranceVariants = {
  hidden: ({ isMobile }: { isMobile?: boolean } = {}) => ({ 
    opacity: 0, 
    y: isMobile ? 14 : 22, 
  }),
  visible: ({ delay, isMobile }: { delay: number; isMobile?: boolean }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: isMobile ? 0.65 : 0.85,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
};

const ROTATING_WORDS = ["Imbatíveis.", "Lendárias.", "Absolutas.", "Únicas."];

const stack = [
  { name: "Next.js", label: "Site rápido que aparece bem no Google", fx: "hz-fx-sweep" },
  { name: "TypeScript", label: "Menos erros e mais segurança no produto", fx: "hz-fx-orbit" },
  { name: "Three.js", label: "Efeitos 3D que dão vida ao site", fx: "hz-fx-tilt" },
];

// Folha isolada: o setInterval de 2.5s agora re-renderiza só esta palavra,
// e não a Hero inteira (dezenas de motion components + <style> grande).
const RotatingWord = memo(function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      key={wordIndex}
      className="inline-block animate-word-rotate hero-rotating-word"
      style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
    >
      {ROTATING_WORDS[wordIndex]}
    </span>
  );
});

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const base = isMobile ? 1.55 : 0.08;
  const sectionRef = useRef<HTMLElement>(null);
  const cellFrame = useRef(0);
  usePauseOffscreenAnimations(sectionRef);
  const cellPointer = useRef<{ el: HTMLDivElement | null; x: number; y: number }>({ el: null, x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(cellFrame.current);
    };
  }, []);

  // Escreve as CSS vars no máximo 1x por frame (mousemove pode passar de 60Hz e
  // cada leitura de rect após escrita forçava recálculo de estilo síncrono).
  const handleCellMove = (e: MouseEvent<HTMLDivElement>) => {
    const p = cellPointer.current;
    p.el = e.currentTarget;
    p.x = e.clientX;
    p.y = e.clientY;
    if (cellFrame.current) return;
    cellFrame.current = requestAnimationFrame(() => {
      cellFrame.current = 0;
      const el = p.el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${p.x - r.left}px`);
      el.style.setProperty("--my", `${p.y - r.top}px`);
      el.style.setProperty("--tx", `${((p.x - r.left) / r.width) * 2 - 1}`);
      el.style.setProperty("--ty", `${((p.y - r.top) / r.height) * 2 - 1}`);
    });
  };

  return (
    <section ref={sectionRef} id="hero" className="hero-section" style={{ position: "relative", overflow: "hidden", minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", background: "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)", transition: "background 0.5s ease" }}>
      {/* Google Antigravity Style Interactive Background (Apenas na versão black) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: base + 0.15 }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <AntigravityBackground />
      </motion.div>

      {/* Content */}
      <div className="container hero-reveal-container" style={{ textAlign: "center", position: "relative", zIndex: 3 }}>
        {/* STATUS BADGE */}
        <motion.div 
          custom={{ delay: base + 0.48, isMobile }}
          initial="hidden"
          animate="visible"
          variants={entranceVariants}
          className="orbai-badge hero-enter hidden md:inline-flex" 
          style={{ marginBottom: "2rem" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/>
          </svg>
          <span style={{ fontWeight: 700 }}>Design &amp; Experiências High-End</span>
        </motion.div>

        {/* HERO TITLE */}
        <h1 className="hero-title" style={{ color: "#ffffff" }}>
          <motion.span 
            custom={{ delay: base + 0.62, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
            className="block hero-enter" style={{ color: "#ffffff" }}
          >
            Design de Elite.
          </motion.span>
          <motion.span 
            custom={{ delay: base + 0.74, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
            className="block hero-enter" style={{ color: "#ffffff" }}
          >
            Marcas
          </motion.span>
          <motion.span 
            custom={{ delay: base + 0.86, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
            className="block hero-enter" style={{ color: "#ffffff" }}
          >
            <RotatingWord />
          </motion.span>
        </h1>

        <motion.p 
          custom={{ delay: base + 1.02, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
          className="hero-subtitle hero-enter"
          style={{ color: "#ffffff" }}
        >
          Criamos identidades digitais de alto luxo e tecnologia para marcas que buscam o topo do mercado.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          custom={{ delay: base + 1.18, isMobile }} initial="hidden" animate="visible" variants={entranceVariants}
          className="hero-ctas hero-enter"
        >
          <Link href="#portfolio" className="hero-cta-primary" aria-label="Ver portfólio de projetos">
            Ver Projetos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
          <a href="https://wa.me/5549991031743" target="_blank" rel="noopener noreferrer" className="hero-cta-secondary" aria-label="Falar conosco no WhatsApp">
            Ver Serviços
          </a>
        </motion.div>

        {/* Painel de métricas */}
        <motion.div
          custom={{ delay: base + 1.34, isMobile }} initial="hidden" animate="visible"
          variants={entranceVariants} className="hero-enter hz-panel-wrap"
        >
          <style>{`
            .hz-panel-wrap {
              width: 100%;
              max-width: 960px;
              margin: clamp(3rem, 7vh, 4.5rem) auto 2.5rem;
            }
            .hz-panel {
              position: relative;
              isolation: isolate;
              overflow: hidden;
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              border-radius: 28px;
              background: linear-gradient(170deg, rgba(255,255,255,0.075), rgba(255,255,255,0.015));
              border: 1px solid rgba(255,255,255,0.1);
              backdrop-filter: blur(18px);
              -webkit-backdrop-filter: blur(18px);
              box-shadow: 0 40px 90px -40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.07);
            }
            .hz-panel::before {
              content: "";
              position: absolute;
              top: -1px;
              left: 0;
              right: 0;
              height: 1px;
              z-index: 2;
              background: linear-gradient(90deg, transparent, #22d3ee 50%, transparent);
              background-size: 200% 100%;
              animation: hzEdge 4s linear infinite;
            }
            .hz-panel::after {
              content: "";
              position: absolute;
              top: 0;
              left: -40%;
              width: 30%;
              height: 100%;
              z-index: 0;
              pointer-events: none;
              background: linear-gradient(90deg, transparent, rgba(34,211,238,0.08), transparent);
              transform: skewX(-18deg);
              animation: hzSweep 8s ease-in-out infinite;
            }
            .hz-cell {
              position: relative;
              z-index: 1;
              padding: 34px 26px 30px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 14px;
              transition: background 0.5s ease;
            }
            .hz-cell + .hz-cell { border-left: 1px solid rgba(255,255,255,0.08); }
            .hz-cell::before {
              content: "";
              position: absolute;
              inset: 0;
              z-index: -1;
              opacity: 0;
              background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.14), transparent 70%);
              transition: opacity 0.4s ease;
            }
            @media (hover: hover) {
              .hz-cell:hover::before { opacity: 1; }
            }
            .hz-cell.is-hl {
              background: linear-gradient(180deg, rgba(34,211,238,0.1), rgba(99,102,241,0.08));
            }
            .hz-cell { overflow: hidden; }
            .hz-cell > .hz-num, .hz-cell > .hz-label { position: relative; z-index: 1; }
            .hz-num {
              font-family: var(--font-display);
              font-size: clamp(1.9rem, 3.6vw, 2.8rem);
              font-weight: 800;
              letter-spacing: -0.03em;
              line-height: 0.95;
              color: #ffffff;
              margin: 0;
              font-variant-numeric: tabular-nums;
              transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), text-shadow 0.5s ease;
            }
            .hz-cell.is-hl .hz-num {
              background: linear-gradient(120deg, #ffffff 0%, #67e8f9 60%, #818cf8 100%);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            }
            @media (hover: hover) {
              .hz-cell:hover .hz-num { transform: translateY(-3px); text-shadow: 0 0 28px rgba(34,211,238,0.35); }
            }
            .hz-label {
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.78);
              margin: 0;
            }
            .hz-fx-sweep::after {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              left: -60%;
              width: 45%;
              z-index: 0;
              pointer-events: none;
              background: linear-gradient(100deg, transparent, rgba(255,255,255,0.22), transparent);
              transform: skewX(-20deg);
            }
            @media (hover: hover) {
              .hz-fx-sweep:hover::after { left: 130%; transition: left 1s cubic-bezier(0.16,1,0.3,1); }
            }
            @media (hover: hover) {
              .hz-fx-sweep:hover .hz-num { letter-spacing: 0.04em; animation: hzGlitch 0.7s steps(4) 1; }
            }
            @media (hover: hover) {
              .hz-fx-sweep:hover .hz-label { color: #ffffff; letter-spacing: 0.26em; transition: letter-spacing 0.6s ease, color 0.4s ease; }
            }
            .hz-fx-orbit::after {
              content: "";
              position: absolute;
              inset: -50%;
              z-index: 0;
              pointer-events: none;
              border-radius: 50%;
              background: conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(103,232,249,0.35) 340deg, rgba(129,140,248,0.6) 360deg);
              opacity: 0;
              transition: opacity 0.6s ease;
            }
            @media (hover: hover) {
              .hz-fx-orbit:hover::after { opacity: 0.55; animation: hzBeam 3s linear infinite; }
            }
            .hz-rings {
              position: absolute;
              inset: 0;
              z-index: 0;
              pointer-events: none;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .hz-rings i {
              position: absolute;
              width: 120px;
              height: 120px;
              border-radius: 50%;
              border: 1px solid rgba(103,232,249,0.7);
              box-shadow: 0 0 18px rgba(103,232,249,0.35);
              opacity: 0;
            }
            @media (hover: hover) {
              .hz-fx-orbit:hover .hz-rings i { animation: hzRing 2.4s cubic-bezier(0.16,1,0.3,1) infinite; }
            }
            @media (hover: hover) {
              .hz-fx-orbit:hover .hz-rings i:nth-child(2) { animation-delay: 0.8s; }
            }
            @media (hover: hover) {
              .hz-fx-orbit:hover .hz-rings i:nth-child(3) { animation-delay: 1.6s; }
            }
            .hz-cell.hz-fx-orbit.is-hl .hz-num { background: none; -webkit-background-clip: border-box; background-clip: border-box; color: #ffffff; }
            .hz-num { white-space: nowrap; }
            .hz-ltr { display: inline-block; }
            @media (hover: hover) {
              .hz-fx-orbit:hover .hz-ltr { animation: hzWave 1.8s ease-in-out infinite; animation-delay: calc(var(--i) * 0.08s); }
            }
            @media (hover: hover) {
              .hz-fx-orbit:hover .hz-label { color: #67e8f9; letter-spacing: 0.26em; transition: letter-spacing 0.6s ease, color 0.4s ease; }
            }
            .hz-fx-tilt {
              transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.5s ease;
              transform-style: preserve-3d;
            }
            .hz-fx-tilt::after {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 0;
              pointer-events: none;
              opacity: 0;
              background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%);
              transform: translateX(calc(var(--tx, 0) * 40px));
              transition: opacity 0.4s ease;
            }
            @media (hover: hover) {
              .hz-fx-tilt:hover::after { opacity: 1; }
            }
            @media (hover: hover) {
              .hz-fx-tilt:hover .hz-num {
                transform: translateZ(40px);
                text-shadow: 0 22px 30px rgba(0,0,0,0.55), 0 0 26px rgba(34,211,238,0.45);
                transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), text-shadow 0.45s ease;
              }
            }
            @media (hover: hover) {
              .hz-fx-tilt:hover .hz-label { transform: translateZ(24px); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
            }
            .hz-cube-stage {
              position: absolute;
              inset: 0;
              z-index: 0;
              pointer-events: none;
              perspective: 420px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .hz-cube {
              position: relative;
              width: 110px;
              height: 110px;
              transform-style: preserve-3d;
              opacity: 0;
              transition: opacity 0.6s ease;
            }
            .hz-cube i {
              position: absolute;
              inset: 0;
              border: 1px solid rgba(103,232,249,0.6);
              border-radius: 50%;
              box-shadow: 0 0 14px rgba(103,232,249,0.35), inset 0 0 12px rgba(129,140,248,0.25);
            }
            .hz-cube i:nth-child(1) { transform: rotateX(90deg); }
            .hz-cube i:nth-child(2) { transform: rotateY(90deg); border-color: rgba(129,140,248,0.7); }
            .hz-cube i:nth-child(3) { transform: rotateX(45deg) rotateY(45deg); border-style: dashed; }
            @media (hover: hover) {
              .hz-fx-tilt:hover .hz-cube { opacity: 1; animation: hzCubeSpin 5s linear infinite; }
            }
            @keyframes hzCubeSpin {
              from { transform: rotateX(0deg) rotateY(0deg); }
              to { transform: rotateX(360deg) rotateY(360deg); }
            }
            @media (hover: hover) {
              .hz-fx-tilt:hover {
                transform: perspective(700px) rotateX(calc(var(--ty, 0) * -12deg)) rotateY(calc(var(--tx, 0) * 12deg)) scale(1.02);
              }
            }
            @keyframes hzBeam { to { transform: rotate(360deg); } }
            @keyframes hzRing {
              0% { transform: scale(0.4); opacity: 0; }
              15% { opacity: 1; }
              100% { transform: scale(3.4); opacity: 0; }
            }
            @keyframes hzWave {
              0%, 100% { transform: translateY(0); color: #ffffff; text-shadow: none; }
              30% { transform: translateY(-9px); color: #67e8f9; text-shadow: 0 0 20px rgba(103,232,249,0.9); }
              60% { transform: translateY(0); color: #c4b5fd; }
            }
            @keyframes hzGlitch {
              0% { transform: translate(0); text-shadow: none; }
              20% { transform: translate(-3px, 1px); text-shadow: 3px 0 #22d3ee, -3px 0 #f472b6; }
              40% { transform: translate(2px, -1px); text-shadow: -2px 0 #22d3ee, 2px 0 #f472b6; }
              60% { transform: translate(-1px, 0); text-shadow: 1px 0 #22d3ee, -1px 0 #f472b6; }
              100% { transform: translate(0); text-shadow: none; }
            }
            @keyframes hzEdge { to { background-position: -200% 0; } }
            /* Botão "Explorar": o giro e os anéis eram animados em JS pelo framer-motion
               (rotate/scale independentes não vão para o compositor), recalculando estilo
               a cada frame. Mesmas curvas em CSS: linear 6s; easeOut do framer =
               cubic-bezier(0, 0, 0.58, 1). */
            .hero-cue-spin { animation: heroCueSpin 6s linear infinite; }
            @keyframes heroCueSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .hero-cue-ping { animation: heroCuePing 2.4s cubic-bezier(0, 0, 0.58, 1) infinite both; }
            @keyframes heroCuePing {
              from { transform: scale(1); opacity: 0.5; }
              to { transform: scale(2.4); opacity: 0; }
            }
            /* Deslocamento via transform (compositor) em vez de left (layout+paint).
               160% do pai / 30% de largura = 533.333% da própria largura: trajeto idêntico. */
            @keyframes hzSweep {
              0%, 55% { transform: translateX(0) skewX(-18deg); }
              100% { transform: translateX(533.333%) skewX(-18deg); }
            }
            @media (max-width: 720px) {
              .hz-panel { grid-template-columns: 1fr; }
              .hz-cell { padding: 26px 22px; }
              .hz-cell + .hz-cell { border-left: none; border-top: 1px solid rgba(255,255,255,0.08); }
              .hz-num { font-size: clamp(2.6rem, 12vw, 3.2rem); }
            }
            @media (prefers-reduced-motion: reduce) {
              .hz-panel::before, .hz-panel::after { animation: none; }
            }
          `}</style>

          <div className="hz-panel">
            {stack.map((s, i) => (
              <div
                key={s.name}
                className={`hz-cell ${s.fx} ${i === 1 ? "is-hl" : ""}`}
                onMouseMove={handleCellMove}
              >
                {s.fx === "hz-fx-orbit" && (
                  <div className="hz-rings" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
                {s.fx === "hz-fx-tilt" && (
                  <div className="hz-cube-stage" aria-hidden="true">
                    <div className="hz-cube">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                )}
                <p className="hz-num">
                  {s.fx === "hz-fx-orbit"
                    ? s.name.split("").map((ch, k) => (
                        <span key={k} className="hz-ltr" style={{ "--i": k } as CSSProperties}>
                          {ch}
                        </span>
                      ))
                    : s.name}
                </p>
                <p className="hz-label">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#features"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Explorar o site"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: base + 1.55, ease: [0.16, 1, 0.3, 1] }}
        className="hero-scroll-cue"
        style={{
          position: "absolute",
          bottom: "clamp(1rem, 3.5vh, 2.25rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 110,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          color: "rgba(255,255,255,0.9)",
          textDecoration: "none",
          pointerEvents: "auto",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <span
          style={{
            position: "relative",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, rgba(0,229,255,0) 0deg, rgba(0,229,255,0.9) 120deg, rgba(129,140,248,0.9) 240deg, rgba(0,229,255,0) 360deg)",
            padding: "1px",
            boxShadow: "0 0 24px rgba(0,229,255,0.25)",
          }}
        >
          <span
            className="hero-cue-spin"
            style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "inherit", pointerEvents: "none" }}
          />
          <span
            style={{
              position: "absolute",
              inset: "1px",
              borderRadius: "50%",
              background: "linear-gradient(160deg, rgba(20,28,44,0.85), rgba(6,10,18,0.92))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.svg
                key={i}
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ opacity: [0.15, 1, 0.15] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                <path d="M1 1.5L7 6.5L13 1.5" />
              </motion.svg>
            ))}
          </span>
          {[0, 1].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              className="hero-cue-ping"
              style={{
                animationDelay: `${i * 1.2}s`,
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px solid rgba(0,229,255,0.6)",
                pointerEvents: "none",
              }}
            />
          ))}
        </span>
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            textShadow: "0 1px 8px rgba(0,0,0,0.6)",
          }}
        >
          Explorar
        </span>
      </motion.a>

    </section>
  );
}
