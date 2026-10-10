"use client";

import { useState, useEffect, useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

/* ─── SLIDER DATA ─── */
const SLIDES = [
  {
    index: "01",
    tags: ["DESEJO", "AUTORIDADE", "LUXO"],
    title: "Design que Gera Lucro",
    desc: "9 anos criando experiências que transformam meros visitantes em clientes apaixonados. Não fazemos apenas o 'bonito', criamos identidades que impõe respeito."
  },
  {
    index: "02",
    tags: ["ESTRATÉGIA", "CONVERSÃO", "ELITE"],
    title: "Venda Mais Caro",
    desc: "Posicionamos sua marca no topo. Quando o seu site transparece excelência, a barreira do preço desaparece."
  },
  {
    index: "03",
    tags: ["EXCLUSIVO", "ÚNICO", "IMBATÍVEL"],
    title: "Sua Marca Absolute",
    desc: "Crie um ecossistema digital onde cada pixel é planejado para prender a atenção."
  }
];

const eliteStyles = `
.ph-pillar {
  position: relative;
  border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}
.ph-pillar:hover {
  border-color: rgba(60,100,180,0.45);
  box-shadow: 0 24px 60px -24px rgba(40,80,160,0.4);
}
.ph-pillar-spot {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(30,90,140,0.22), transparent 65%);
}
.ph-phil-aura {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(60px);
  opacity: 0.5;
  animation: ph-aura-drift 14s ease-in-out infinite;
}
.ph-phil-aura.a { background: rgba(30,60,130,0.35); width: 340px; height: 340px; top: -120px; left: -80px; }
.ph-phil-aura.b { background: rgba(20,100,130,0.25); width: 300px; height: 300px; bottom: -110px; right: -60px; animation-delay: -6s; }
@keyframes ph-aura-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, 30px) scale(1.12); }
}
.ph-phil-sweep {
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(160,200,255,0.9), transparent);
  animation: ph-sweep-x 3.6s ease-in-out infinite;
}
@keyframes ph-sweep-x {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(420%); }
}
.ph-pillar-float { animation: ph-pillar-bob 6s ease-in-out infinite; }
@keyframes ph-pillar-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.ph-dot-pulse { position: relative; display: inline-block; }
.ph-dot-pulse::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(30,120,160,0.7);
  animation: ph-pulse-dot 2.2s ease-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .ph-phil-aura, .ph-phil-sweep, .ph-pillar-float, .ph-dot-pulse::after { animation: none !important; }
}
.ph-pillar:hover .ph-pillar-spot { opacity: 1; }
.ph-cta::after {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
  transform: skewX(-20deg);
  animation: ph-cta-shine 3.2s ease-in-out infinite;
}
@keyframes ph-cta-shine {
  0%, 60% { left: -75%; }
  100% { left: 125%; }
}
.ph-elite-card {
  position: relative;
  height: 100%;
  border-radius: 28px;
  padding: 1px;
  background: linear-gradient(120deg, var(--accent-a), rgba(255,255,255,0.05) 40%, var(--accent-b), rgba(255,255,255,0.05) 80%, var(--accent-a));
  background-size: 300% 300%;
  animation: ph-border-flow 8s ease infinite;
  transition: box-shadow 0.6s ease;
}
.ph-elite-card:hover { box-shadow: 0 30px 80px -20px var(--accent-a); }
.ph-elite-inner {
  position: relative;
  height: 100%;
  border-radius: 27px;
  padding: 2.5rem;
  overflow: hidden;
  background: linear-gradient(160deg, rgba(20,24,34,0.92), rgba(8,10,16,0.96));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-sizing: border-box;
  transform-style: preserve-3d;
}
.ph-elite-spot {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--accent-a), transparent 60%);
  mix-blend-mode: screen;
}
.ph-elite-card:hover .ph-elite-spot { opacity: 0.22; }
.ph-elite-shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  transform: translateX(-120%) skewX(-20deg);
}
.ph-elite-card:hover .ph-elite-shine { animation: ph-shine 1.2s ease; }
.ph-elite-orb {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-a), rgba(255,255,255,0.04));
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 0 30px -4px var(--accent-a);
  animation: ph-float 5s ease-in-out infinite;
}
.ph-elite-index {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: var(--accent-b);
  font-variant-numeric: tabular-nums;
}
.ph-elite-tag {
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.8);
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
  transition: all 0.35s ease;
}
.ph-elite-card:hover .ph-elite-tag { border-color: var(--accent-a); color: #fff; }
.ph-elite-bar {
  height: 2px;
  width: 100%;
  margin-top: 2rem;
  border-radius: 2px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
}
.ph-elite-bar span {
  display: block;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
  transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.ph-elite-card:hover .ph-elite-bar span { width: 100%; }
@keyframes ph-border-flow { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes ph-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes ph-shine { to { transform: translateX(260%) skewX(-20deg); } }
@keyframes ph-pulse-dot { 0%,100% { transform: scale(1); opacity: .6; } 50% { transform: scale(1.8); opacity: 0; } }
.ph-elite-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--accent-a); }
.ph-elite-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--accent-a);
  animation: ph-pulse-dot 2s ease-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .ph-elite-card, .ph-elite-orb, .ph-elite-dot::after, .ph-elite-card:hover .ph-elite-shine { animation: none !important; }
}
`;

type EliteCardProps = {
  index: string;
  icon: ReactNode;
  title: string;
  desc: string;
  tags: string[];
  accentA: string;
  accentB: string;
  delay?: number;
};

function EliteCard({ index, icon, title, desc, tags, accentA, accentB, delay = 0 }: EliteCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 120, damping: 14 });
  const sy = useSpring(py, { stiffness: 120, damping: 14 });
  const rotateY = useTransform(sx, [0, 1], [-7, 7]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    el.style.setProperty("--mx", `${x * rect.width}px`);
    el.style.setProperty("--my", `${y * rect.height}px`);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{ perspective: 1200, height: "100%" }}
    >
      <motion.div
        ref={ref}
        className="ph-elite-card"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={
          {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            cursor: "pointer",
            "--accent-a": accentA,
            "--accent-b": accentB,
            transitionDelay: `${delay}s`,
          } as CSSProperties
        }
      >
        <div className="ph-elite-inner">
          <div className="ph-elite-spot" />
          <div className="ph-elite-shine" />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div className="ph-elite-orb">{icon}</div>
            <span className="ph-elite-index">{index}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.9rem" }}>
            <span className="ph-elite-dot" />
            <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}>DESTAQUE</span>
          </div>

          <h3 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, margin: "0 0 1rem", letterSpacing: "-0.01em" }}>
            {title}
          </h3>

          <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>
            {desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {tags.map((tag) => (
              <span key={tag} className="ph-elite-tag">{tag}</span>
            ))}
          </div>

          <div className="ph-elite-bar">
            <span />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const infographicStyles = `
.ph-info {
  position: relative;
  background: #0a0a0a;
  border-radius: 32px;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  box-sizing: border-box;
}
.ph-info-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  pointer-events: none;
}
.ph-info-track {
  position: absolute;
  top: 58px;
  left: 12%;
  right: 12%;
  height: 2px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  overflow: hidden;
}
.ph-info-track span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #7aa2ff, #a8c8ff, #ffffff);
  box-shadow: 0 0 16px rgba(160,180,255,0.6);
}
.ph-info-step { position: relative; display: flex; flex-direction: column; align-items: flex-start; }
.ph-info-ring {
  position: relative;
  width: 116px;
  height: 116px;
  margin-bottom: 1.6rem;
}
.ph-info-ring svg { position: absolute; inset: 0; transform: rotate(-90deg); }
.ph-info-ring .bg { stroke: rgba(255,255,255,0.08); }
.ph-info-ring .fg {
  stroke: url(#ph-grad);
  stroke-linecap: round;
}
.ph-info-ring .core {
  position: absolute;
  inset: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), rgba(10,10,10,0.9));
  border: 1px solid rgba(255,255,255,0.1);
  font-size: 1.6rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
}
.ph-info-card {
  position: relative;
  width: 100%;
  padding: 1.6rem 1.6rem 1.8rem;
  border-radius: 20px;
  background: linear-gradient(170deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)), var(--bg);
  border: 1px solid rgba(255,255,255,0.07);
  transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, background 0.4s ease;
  box-sizing: border-box;
}
.ph-info-step:hover .ph-info-card {
  transform: translateY(-6px);
  border-color: rgba(160,180,255,0.35);
  background: linear-gradient(170deg, rgba(122,162,255,0.10), rgba(255,255,255,0.01)), var(--bg);
}
.ph-info-pill {
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: #a8c8ff;
  padding: 5px 10px;
  border-radius: 100px;
  background: rgba(122,162,255,0.10);
  border: 1px solid rgba(122,162,255,0.25);
  margin-bottom: 0.9rem;
}
.ph-info-meter { display: flex; gap: 4px; margin-top: 1.2rem; }
.ph-info-meter i {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.1);
  transition: background 0.4s ease;
}
.ph-info-step:hover .ph-info-meter i.on { background: linear-gradient(90deg, #2f6fd6, #7aa2ff); }
.ph-info-pulse {
  position: absolute;
  top: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 12px #fff;
  animation: ph-info-travel 4s linear infinite;
  pointer-events: none;
}
@keyframes ph-info-travel {
  0% { left: 12%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 88%; opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ph-info-pulse { animation: none; display: none; }
}
`;

const PROCESS_STEPS = [
  {
    code: "01",
    pct: 33,
    title: "IMERSÃO",
    pill: "DIAGNÓSTICO",
    desc: "Analisamos seu mercado para encontrar a brecha onde sua marca pode dominar.",
    meter: 1
  },
  {
    code: "02",
    pct: 66,
    title: "ARQUITETURA",
    pill: "CONSTRUÇÃO",
    desc: "Construímos a estética de elite e a estrutura técnica que seus clientes amam.",
    meter: 2
  },
  {
    code: "03",
    pct: 100,
    title: "DOMÍNIO",
    pill: "LANÇAMENTO",
    desc: "Lançamos sua nova presença digital configurada para converter e escalar.",
    meter: 3
  }
];

type ProcessStepProps = {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  progress: MotionValue<number>;
  R: number;
  C: number;
};

function ProcessStep({ step, index, progress, R, C }: ProcessStepProps) {
  const start = 0.56 + index * 0.06;
  const y = useTransform(progress, [start, start + 0.16], [90, 0]);
  const rotateX = useTransform(progress, [start, start + 0.16], [28, 0]);
  const scale = useTransform(progress, [start, start + 0.16], [0.88, 1]);
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const dashOffset = useTransform(progress, [start + 0.02, start + 0.22], [C, C * (1 - step.pct / 100)]);

  return (
    <motion.div className="ph-info-step" style={{ y, rotateX, scale, opacity, transformPerspective: 900 }}>
      <div className="ph-info-ring">
        <svg viewBox="0 0 116 116">
          <circle className="bg" cx="58" cy="58" r={R} strokeWidth="4" fill="none" />
          <motion.circle
            className="fg"
            cx="58"
            cy="58"
            r={R}
            strokeWidth="4"
            fill="none"
            strokeDasharray={C}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        <div className="core">{step.code}</div>
      </div>

      <div className="ph-info-card">
        <span className="ph-info-pill">{step.pill}</span>
        <h4 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", margin: "0 0 0.7rem", letterSpacing: "-0.01em" }}>{step.title}</h4>
        <p style={{ fontSize: "0.98rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
        <div className="ph-info-meter">
          {[1, 2, 3].map((n) => (
            <i key={n} className={n <= step.meter ? "on" : ""} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProcessInfographic({ isMobile, progress }: { isMobile: boolean; progress: MotionValue<number> }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  const trackScale = useTransform(progress, [0.52, 0.78], [0, 1]);
  const gridY = useTransform(progress, [0, 1], [-60, 60]);

  return (
    <div
      className="ph-info"
      style={{ padding: isMobile ? "2.5rem 1.5rem" : "4rem 3.5rem" }}
    >
      <motion.div className="ph-info-grid" style={{ y: gridY }} />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="ph-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7aa2ff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? "2rem" : "3.5rem", position: "relative" }}>
        <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.25em", color: "rgba(255,255,255,0.45)" }}>METODOLOGIA PH</span>
        <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.25em", color: "rgba(255,255,255,0.45)" }}>3 FASES · 100%</span>
      </div>

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "2.5rem" : "2rem" }}>
        {!isMobile && (
          <div className="ph-info-track">
            <motion.span style={{ display: "block", height: "100%", transformOrigin: "left", scaleX: trackScale }} />
          </div>
        )}
        {!isMobile && (
          <motion.div
            className="ph-info-pulse"
            style={{ top: "57px" }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 2 } } }}
          />
        )}

        {PROCESS_STEPS.map((step, i) => (
          <ProcessStep key={step.code} step={step} index={i} progress={progress} R={R} C={C} />
        ))}
      </div>
    </div>
  );
}

function DiamondIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M9 3l3 6 3-6M12 9v12" opacity="0.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function AnimatedQuote({ text, isMobile, ready }: { text: string; isMobile: boolean; ready: boolean }) {
  const words = text.split(" ");

  return (
    <motion.blockquote
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.09 }}
      style={{ fontSize: isMobile ? "1.4rem" : "2.5rem", fontWeight: "400", fontStyle: "italic", margin: "2rem auto", color: "#ffffff", maxWidth: "800px", lineHeight: "1.4", textShadow: "0 2px 14px rgba(0, 0, 0, 0.5)" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.blockquote>
  );
}

type Pillar = { n: string; t: string; d: string };

function PhilosophyPillar({ p, i, isMobile, ready }: { p: Pillar; i: number; isMobile: boolean; ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 16 });
  const sy = useSpring(py, { stiffness: 150, damping: 16 });
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const rotateX = useTransform(sy, [0, 1], [8, -8]);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    el.style.setProperty("--mx", `${x * rect.width}px`);
    el.style.setProperty("--my", `${y * rect.height}px`);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: 25, filter: "blur(10px)" }}
      animate={ready ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : { opacity: 0, y: 70, rotateX: 25, filter: "blur(10px)" }}
      transition={{ delay: 0.25 + i * 0.18, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <motion.div
        ref={ref}
        className="ph-pillar"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", padding: isMobile ? "1.25rem" : "1.5rem" } as CSSProperties}
      >
        <div className="ph-pillar-spot" />
        <div style={{ position: "relative", transform: "translateZ(30px)" }}>
          <div className="ph-pillar-float" style={{ animationDelay: `${i * -2}s` }}>
            <div style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", color: "#4a72b8", marginBottom: "0.8rem" }}>{p.n}</div>
            <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.5rem" }}>{p.t}</div>
            <div style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(255,255,255,0.62)" }}>{p.d}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturesAI() {
  const [currentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYProgress = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackY = useMotionValue(0);
  const [pinH, setPinH] = useState<number | null>(null);
  const [pinDone, setPinDone] = useState(false);
  const [philoIn, setPhiloIn] = useState(false);
  const philoRef = useRef<HTMLElement>(null);
  const philoReady = philoIn && pinDone;
  const headY = useTransform(scrollYProgress, [0, 0.16], [90, 0]);
  const headScale = useTransform(scrollYProgress, [0, 0.16], [0.82, 1]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.08], [0.3, 1]);
  const leftX = useTransform(scrollYProgress, [0.04, 0.32], [-260, 0]);
  const leftRot = useTransform(scrollYProgress, [0.04, 0.32], [-24, 0]);
  const leftScale = useTransform(scrollYProgress, [0.04, 0.32], [0.88, 1]);
  const leftOp = useTransform(scrollYProgress, [0.04, 0.16], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0.14, 0.42], [260, 0]);
  const rightRot = useTransform(scrollYProgress, [0.14, 0.42], [24, 0]);
  const rightScale = useTransform(scrollYProgress, [0.14, 0.42], [0.88, 1]);
  const rightOp = useTransform(scrollYProgress, [0.14, 0.26], [0, 1]);
  const infoOp = useTransform(scrollYProgress, [0.42, 0.5], [0, 1]);
  const infoY = useTransform(scrollYProgress, [0.42, 0.5], [60, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const vh = window.innerHeight;
      const travel = Math.max(0, track.offsetHeight - vh + 40);
      setPinH(vh + travel + vh * 0.4);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isMobile]);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      const track = trackRef.current;
      if (!el) return;
      if (isMobile || !track) {
        scrollYProgress.set(1);
        trackY.set(0);
        setPinDone(true);
        return;
      }
      const vh = window.innerHeight;
      const range = el.offsetHeight - vh;
      const top = el.getBoundingClientRect().top;
      const p = range <= 0 ? 1 : Math.min(1, Math.max(0, -top / range));
      const travel = Math.max(0, track.offsetHeight - vh + 40);
      scrollYProgress.set(p);
      trackY.set(-travel * p);
      if (p >= 0.98) setPinDone(true);
    };
    update();
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, [isMobile, pinH, scrollYProgress, trackY]);

  useEffect(() => {
    const el = philoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPhiloIn(true);
          io.disconnect();
        }
      },
      { rootMargin: "-80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
    <section ref={sectionRef} id="features" style={{ 
      position: "relative", 
      zIndex: 2,
      background: "transparent", 
      height: isMobile ? "auto" : pinH ? `${pinH}px` : "320vh",
      width: "100%" 
    }}>
      <style dangerouslySetInnerHTML={{ __html: eliteStyles + infographicStyles }} />
      <div style={{ position: isMobile ? "relative" : "sticky", top: 0, height: isMobile ? "auto" : "100vh", display: "flex", alignItems: "flex-start", overflow: "hidden" }}>
      <motion.div ref={trackRef} style={{ y: trackY, position: "relative", zIndex: 2, width: "100%", maxWidth: "1440px", margin: "0 auto", padding: isMobile ? "3rem 20px" : "12vh 20px 4vh" }}>
        
        {/* CENA 1: HEADER + CARDS */}
        <div>
        {/* HEADER */}
        <motion.div 
          style={{ textAlign: "center", marginBottom: "4rem", y: headY, scale: headScale, opacity: headOpacity }}
        >
          <div style={{ 
            display: "inline-block", 
            background: "rgba(255, 255, 255, 0.12)", 
            color: "#ffffff", 
            border: "1px solid rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "8px 20px", 
            borderRadius: "100px", 
            fontSize: "10px", 
            fontWeight: "800", 
            marginBottom: "1.5rem",
            letterSpacing: "0.15em",
            transition: "all 0.4s ease" 
          }}>
            ESTRATEGISTA DE MARCAS & CRESCIMENTO DIGITAL
          </div>
          <h2 style={{ fontSize: isMobile ? "2.5rem" : "5rem", fontWeight: "900", color: "#ffffff", lineHeight: "1.1", margin: 0, textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)" }}>
            Domine o seu Mercado.
          </h2>
        </motion.div>

        {/* CARDS PRINCIPAIS */}
        <motion.div 
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px", marginBottom: "40px" }}
        >
          <motion.div style={{ x: leftX, rotateY: leftRot, scale: leftScale, opacity: leftOp, transformPerspective: 1200 }}>
          <EliteCard
            index={SLIDES[currentSlide].index}
            icon={<DiamondIcon />}
            title={SLIDES[currentSlide].title}
            desc={SLIDES[currentSlide].desc}
            tags={SLIDES[currentSlide].tags}
            accentA="rgba(120, 160, 255, 0.55)"
            accentB="#a8c8ff"
          />
          </motion.div>

          <motion.div style={{ x: rightX, rotateY: rightRot, scale: rightScale, opacity: rightOp, transformPerspective: 1200 }}>
          <EliteCard
            index="02"
            icon={<ShieldIcon />}
            title="Estrutura Indestrutível"
            desc="Sites rápidos e seguros. Sua marca preparada para vender 24h por dia no Google."
            tags={["VELOCIDADE", "SEGURANÇA", "SEO"]}
            accentA="rgba(120, 200, 255, 0.55)"
            accentB="#a8c8ff"
            delay={0.1}
          />
          </motion.div>
        </motion.div>

        </div>

        {/* CENA 2: PROCESSO — INFOGRÁFICO */}
        <motion.div style={{ marginTop: isMobile ? "2rem" : "6rem", opacity: infoOp, y: infoY }}>
          <ProcessInfographic isMobile={isMobile} progress={scrollYProgress} />
        </motion.div>

      </motion.div>
      </div>
    </section>
    <section ref={philoRef} style={{ position: "relative", zIndex: 2, width: "100%", padding: isMobile ? "2rem 20px 4rem" : "1rem 20px 6rem", display: "flex", alignItems: "flex-start", justifyContent: "center", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", width: isMobile ? "320px" : "720px", height: isMobile ? "320px" : "720px", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(120, 160, 255, 0.18), transparent 65%)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={philoReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", width: "100%", maxWidth: "1000px", padding: isMobile ? "2.5rem 1.5rem" : "4rem 4.5rem", borderRadius: "32px", background: "linear-gradient(160deg, rgba(20,24,34,0.82), rgba(8,10,16,0.9))", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 40px 100px -30px rgba(0,0,0,0.7)", textAlign: "center", overflow: "hidden" }}
      >

        <div aria-hidden="true" className="ph-phil-aura a" />
        <div aria-hidden="true" className="ph-phil-aura b" />
        <div aria-hidden="true" style={{ position: "absolute", top: "-30px", left: "24px", fontSize: isMobile ? "9rem" : "14rem", lineHeight: 1, fontFamily: "Georgia, serif", color: "rgba(120, 160, 255, 0.08)", userSelect: "none", pointerEvents: "none" }}>&ldquo;</div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: philoReady ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 16px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", marginBottom: "1.5rem" }}
        >
          <span className="ph-dot-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#2a8fb8", boxShadow: "0 0 8px rgba(42,143,184,0.6)" }} />
          <span style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.3em", color: "rgba(255, 255, 255, 0.8)" }}>NOSSA FILOSOFIA</span>
        </motion.div>

        <AnimatedQuote text={`"Um site bonito atrai o olhar, mas um site estratégico atrai o dinheiro."`} isMobile={isMobile} ready={philoReady} />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: philoReady ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "120px", height: "1px", margin: "1.5rem auto 2.5rem", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)", transformOrigin: "center" }}
        />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "16px", marginBottom: "3rem", textAlign: "left" }}>
          {[
            { n: "01", t: "Estratégia", d: "Cada decisão visual parte de um objetivo de negócio, não de tendência." },
            { n: "02", t: "Autoridade", d: "Identidade e estrutura que fazem sua marca ser levada a sério no primeiro olhar." },
            { n: "03", t: "Conversão", d: "Jornada pensada para transformar visitante em cliente, com medição real." },
          ].map((p, i) => (
            <PhilosophyPillar key={p.n} p={p} i={i} isMobile={isMobile} ready={philoReady} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={philoReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1e3f80, #17607a)", color: "#e6eeff", fontWeight: 900, fontSize: "14px" }}>PH</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff" }}>Pedro Henrique Silva</div>
              <div style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.6)" }}>Fundador @ PH Code Labs</div>
            </div>
          </div>
          <a href="#contato" className="ph-cta" style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "100px", background: "linear-gradient(135deg, #1e3f80, #17607a)", color: "#e6eeff", fontSize: "13px", fontWeight: 800, textDecoration: "none", boxShadow: "0 10px 30px -12px rgba(30,63,128,0.6)" }}>
            Fale com a gente
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
    </>
  );
}
