"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePauseOffscreenAnimations } from "@/hooks/usePauseOffscreenAnimations";

const OFFER_GLYPHS = "01アイウエオカキクケコ<>/+*#HPX";
const OFFER_LOOP_MS = 9000;

function OfferCodeRide() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Pt = { x: number; y: number; nx: number; ny: number };
    type Spark = { x: number; y: number; vx: number; vy: number; life: number; glyph: string };

    let w = 0;
    let h = 0;
    let pts: Pt[] = [];
    const sparks: Spark[] = [];
    const RADIUS = 35;
    const BEAM_FRAC = 0.28;
    const BEAM_BUCKETS = 12;

    const buildPath = () => {
      const r = RADIUS;
      const x0 = 1;
      const y0 = 1;
      const x1 = w - 1;
      const y1 = h - 1;
      pts = [];
      const push = (x: number, y: number, nx: number, ny: number) => pts.push({ x, y, nx, ny });
      const line = (ax: number, ay: number, bx: number, by: number, nx: number, ny: number) => {
        const steps = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 2));
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          push(ax + (bx - ax) * t, ay + (by - ay) * t, nx, ny);
        }
      };
      const arc = (cx: number, cy: number, a0: number, a1: number) => {
        const steps = 24;
        for (let i = 0; i < steps; i++) {
          const a = a0 + ((a1 - a0) * i) / steps;
          const c = Math.cos(a);
          const s = Math.sin(a);
          push(cx + r * c, cy + r * s, c, s);
        }
      };
      const pi = Math.PI;
      line(x0 + r, y0, x1 - r, y0, 0, -1);
      arc(x1 - r, y0 + r, -pi / 2, 0);
      line(x1, y0 + r, x1, y1 - r, 1, 0);
      arc(x1 - r, y1 - r, 0, pi / 2);
      line(x1 - r, y1, x0 + r, y1, 0, 1);
      arc(x0 + r, y1 - r, pi / 2, pi);
      line(x0, y1 - r, x0, y0 + r, -1, 0);
      arc(x0 + r, y0 + r, pi, (3 * pi) / 2);
    };

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      // DPR limitado a 1.5 no mobile/touch (carga de GPU menor, sem perda perceptível).
      const mobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPath();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const start = performance.now();
    let raf = 0;

    // Fora da viewport o loop é desligado de fato (antes ele seguia agendando
    // requestAnimationFrame vazio a cada frame) e religado ao reentrar.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (pts.length === 0) return;

      const N = pts.length;
      const progress = ((now - start) % OFFER_LOOP_MS) / OFFER_LOOP_MS;
      const head = Math.floor(progress * N);
      const beamN = Math.floor(BEAM_FRAC * N);

      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.lineCap = "round";
      for (let k = 0; k < BEAM_BUCKETS; k++) {
        const from = Math.floor((k * beamN) / BEAM_BUCKETS);
        const to = Math.floor(((k + 1) * beamN) / BEAM_BUCKETS);
        const t = (k + 1) / BEAM_BUCKETS;
        ctx.strokeStyle = `rgba(255,255,255,${Math.pow(t, 1.3)})`;
        ctx.lineWidth = 1 + t * 2.6;
        ctx.beginPath();
        for (let i = from + 1; i <= to; i++) {
          const a = pts[(head - beamN + i - 1 + N) % N];
          const b = pts[(head - beamN + i + N) % N];
          if (!a || !b) continue;
          if (Math.hypot(b.x - a.x, b.y - a.y) > 20) continue;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
        ctx.stroke();
      }
      ctx.restore();

      const p = pts[head % N];
      if (p) {
        for (let k = 0; k < 2; k++) {
          if (sparks.length > 40) break;
          const speed = 0.4 + Math.random() * 0.8;
          const tangent = (Math.random() - 0.5) * 0.4;
          sparks.push({
            x: p.x,
            y: p.y,
            vx: -p.nx * speed - p.ny * tangent,
            vy: -p.ny * speed + p.nx * tangent,
            life: 1,
            glyph: OFFER_GLYPHS[Math.floor(Math.random() * OFFER_GLYPHS.length)],
          });
        }
      }

      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.022;
        if (s.life <= 0 || s.x < -6 || s.y < -6 || s.x > w + 6 || s.y > h + 6) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(190,215,255,${s.life * 0.8})`;
        ctx.fillText(s.glyph, s.x, s.y);
      }
    };
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="offer-ride" aria-hidden="true" />;
}

const regularPlans = [
  {
    name: "Plano Start",
    price: "1.500",
    desc: "Ideal para profissionais que buscam uma conversão direta com estética minimalista.",
    cta: "Começar Meu Projeto",
    features: [
      "Estrutura de até 5 Sessões",
      "Design Minimalista & Premium",
      "Copywriting Persuasivo",
      "Otimização Mobile Nativa",
      "Botão WhatsApp Flutuante",
    ],
  },
  {
    name: "Plano Personalizado",
    price: "5.000+",
    desc: "Ecossistemas digitais robustos e experiências ultra-imersivas sob medida.",
    cta: "Falar com Especialista",
    features: [
      "Tudo do plano Elite",
      "Agendamento e pagamentos",
      "Motion Design Avançado (Lottie)",
      "Otimização de Conversão (CRO)",
      "Consultoria de UX & Marca",
    ],
  },
  {
    name: "Plano Elite",
    price: "3.000",
    desc: "Autoridade visual e performance para marcas que exigem o melhor do mercado.",
    cta: "Construir Minha Autoridade",
    features: [
      "Tudo do plano Start",
      "Sessões Ilimitadas",
      "Design Exclusive e Autoral",
      "Animações & Micro-interações",
      "SEO Avançado (Google Rank)",
    ],
  },
];

const websitePlans = [
  {
    name: "Site Start",
    price: "4.800",
    desc: "A base sólida para empresas que precisam de presença digital profissional e elegante.",
    cta: "Iniciar Meu Site",
    features: [
      "Até 4 Páginas Exclusivas",
      "Design Minimalista e Premium",
      "Desenvolvimento High-End",
      "Otimização de Performance",
      "Integração com WhatsApp e E-mail",
    ],
  },
  {
    name: "Custom & Saas",
    price: "15.000+",
    desc: "Engenharia digital sob medida para ecossistemas complexos e softwares.",
    cta: "Projetar Ecossistema",
    features: [
      "Páginas e Fluxos Ilimitados",
      "Painel de Controle Customizado",
      "Integração com APIs e Gateways",
      "Segurança Bancária e Criptografia",
      "Consultoria de Negócios e UX",
    ],
  },
  {
    name: "Site Elite",
    price: "8.500",
    desc: "Autoridade máxima e experiência imersiva para marcas líderes de mercado.",
    cta: "Dominar o Mercado",
    features: [
      "Até 10 Páginas Personalizadas",
      "Motion Design Avançado",
      "Blog Integrado com CMS",
      "SEO Avançado (Arquitetura)",
      "Copywriting Estratégico Incluso",
    ],
  },
];

type Plan = {
  name: string;
  price: string;
  desc: string;
  cta: string;
  features: string[];
};

function PlanCard({
  plan,
  index,
  featured,
}: {
  plan: Plan;
  index: number;
  featured: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const moveFrame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const whatsapp = `https://wa.me/5549991031743?text=${encodeURIComponent(`Olá! Gostaria de detalhes sobre o investimento no plano ${plan.name}.`)}`;

  useEffect(() => () => cancelAnimationFrame(moveFrame.current), []);

  // mousemove dispara acima de 60Hz; ler o rect logo após escrever o transform forçava
  // recálculo de estilo síncrono a cada evento. Agora lê/escreve uma vez por frame.
  const handleMove = (e: { clientX: number; clientY: number }) => {
    pointer.current.x = e.clientX;
    pointer.current.y = e.clientY;
    if (moveFrame.current) return;
    moveFrame.current = requestAnimationFrame(() => {
      moveFrame.current = 0;
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = pointer.current.x - r.left;
      const y = pointer.current.y - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      const rx = (y / r.height - 0.5) * -6;
      const ry = (x / r.width - 0.5) * 6;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
  };

  const handleLeave = () => {
    cancelAnimationFrame(moveFrame.current);
    moveFrame.current = 0;
    const el = cardRef.current;
    if (el) el.style.transform = "";
  };

  return (
    <motion.div
      className="plan-reveal"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        className={`plan-card${featured ? " is-featured" : ""}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="plan-card-body">
          <span className="plan-card-spot" aria-hidden="true" />

          <header className="plan-card-top">
            <span className="plan-card-index">0{index + 1}</span>
            {featured && <span className="plan-card-tag">Mais escolhido</span>}
          </header>

          <h3 className="plan-card-name">{plan.name}</h3>

          <div className="plan-card-price">
            <span className="plan-card-currency">R$</span>
            <strong className="plan-card-value">{plan.price}</strong>
          </div>

          <p className="plan-card-desc">{plan.desc}</p>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="plan-card-cta"
          >
            {plan.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          <div className="plan-card-divider" />

          <motion.ul
            className="plan-card-features"
            style={{ display: "flex", flexDirection: "column", gap: "18px", listStyle: "none", margin: 0, padding: 0 }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
            }}
          >
            {plan.features.map((f) => (
              <motion.li
                key={f}
                className="plan-card-feature"
                style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "2px 0" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.5 } },
                }}
              >
                <span
                  className="plan-card-check"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="plan-card-feature-text" style={{ flex: 1, minWidth: 0, lineHeight: "22px" }}>{f}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      <style jsx>{`
        .plan-reveal {
          height: 100%;
        }
        .plan-card {
          position: relative;
          height: 100%;
          padding: 1px;
          border-radius: 32px;
          overflow: hidden;
          background: linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.12));
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s ease;
          transform-style: preserve-3d;
          box-shadow: 0 40px 80px -30px rgba(0,0,0,0.85);
          will-change: transform;
        }
        @media (hover: hover) {
          .plan-card:hover {
            box-shadow: 0 50px 100px -30px rgba(0,0,0,0.9), 0 0 60px -20px rgba(122,162,255,0.35);
          }
        }
        .plan-card.is-featured {
          background: transparent;
        }
        .plan-card.is-featured::before {
          content: "";
          position: absolute;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent 0deg, rgba(169,196,255,0.95) 70deg, transparent 150deg, transparent 360deg);
          animation: plan-spin 6s linear infinite;
          pointer-events: none;
        }
        @keyframes plan-spin {
          to { transform: rotate(360deg); }
        }
        .plan-card-body {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 2.8rem 2.2rem 2.4rem;
          border-radius: 31px;
          overflow: hidden;
          font-family: var(--font-inter), sans-serif;
          color: #ffffff;
          background: linear-gradient(170deg, rgba(20,28,48,0.92), rgba(9,12,22,0.96));
          z-index: 1;
        }
        .plan-card.is-featured .plan-card-body {
          background: linear-gradient(170deg, rgba(34,48,88,0.94), rgba(12,16,32,0.97));
        }
        .plan-card-spot {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(122,162,255,0.22), transparent 60%);
        }
        @media (hover: hover) {
          .plan-card:hover .plan-card-spot {
            opacity: 1;
          }
        }
        .plan-card-top {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 28px;
        }
        .plan-card-index {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.35);
        }
        .plan-card-tag {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0b0f19;
          background: #ffffff;
          box-shadow: 0 0 20px rgba(122,162,255,0.7);
        }
        .plan-card-name {
          position: relative;
          margin: 1.6rem 0 0;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        .plan-card-price {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin: 1.2rem 0 1.1rem;
          font-family: var(--font-display);
          line-height: 0.9;
        }
        .plan-card-currency {
          font-size: 1.1rem;
          font-weight: 800;
          color: rgba(255,255,255,0.45);
          margin-top: 0.5rem;
        }
        .plan-card-value {
          font-size: clamp(2.6rem, 4.6vw, 3.4rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #ffffff;
          text-shadow: 0 0 28px rgba(122,162,255,0.35);
        }
        .plan-card-desc {
          position: relative;
          min-height: 3.4rem;
          margin: 0;
          font-size: 0.96rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.68);
        }
        .plan-card-cta {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 2rem;
          padding: 1.1rem 1.4rem;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #0b0f19;
          background: #ffffff;
          box-shadow: 0 12px 30px -10px rgba(122,162,255,0.55);
          transition: background 0.4s ease, color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
        }
        .plan-card-cta::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transform: skewX(-22deg);
          animation: plan-cta-shine 3.4s ease-in-out infinite;
          pointer-events: none;
        }
        /* transform em vez de left: 190% do pai / 40% de largura = 475% (mesmo trajeto). */
        @keyframes plan-cta-shine {
          0%, 55% { transform: translateX(0) skewX(-22deg); }
          100% { transform: translateX(475%) skewX(-22deg); }
        }
        @media (hover: hover) {
          .plan-card-cta:hover {
            background: #dbe4ff;
            color: #0b0f19;
            transform: translateY(-2px);
            box-shadow: 0 18px 40px -10px rgba(122,162,255,0.8);
          }
        }
        .plan-card.is-featured .plan-card-cta {
          background: linear-gradient(90deg, #bae6fd, #ffffff 50%, #a5f3fc);
          color: #0b0f19;
        }
        @media (hover: hover) {
          .plan-card.is-featured .plan-card-cta:hover {
            background: linear-gradient(90deg, #7dd3fc, #ffffff 50%, #67e8f9);
            color: #0b0f19;
          }
        }
        .plan-card-divider {
          height: 1px;
          margin: 2.2rem 0 1.8rem;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }
        .plan-card-features {
          position: relative;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 0;
          padding: 0;
        }
        .plan-card-feature {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0.55rem 0.6rem;
          margin: 0 -0.6rem;
          border-radius: 12px;
          font-size: 0.92rem;
          font-weight: 500;
          color: rgba(255,255,255,0.88);
          transition: background 0.35s ease, color 0.35s ease;
        }
        @media (hover: hover) {
          .plan-card-feature:hover {
            background: rgba(255,255,255,0.06);
            color: #ffffff;
          }
        }
        .plan-card-check {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          color: #0b0f19;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.07), 0 0 16px rgba(122,162,255,0.45);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        @media (hover: hover) {
          .plan-card-feature:hover .plan-card-check {
            transform: scale(1.12) rotate(-6deg);
          }
        }
        @media (max-width: 640px) {
          .plan-card-body { padding: 2.2rem 1.5rem 2rem; }
          .plan-card { border-radius: 26px; }
          .plan-card-body { border-radius: 25px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .plan-card.is-featured::before,
          .plan-card-cta::after { animation: none; }
          .plan-card { transition: none; }
        }
      `}</style>
    </motion.div>
  );
}

function SectionIcon({ kind }: { kind: "landing" | "immersive" }) {
  if (kind === "landing") {
    return (
      <svg className="sec-icon sec-icon-landing" width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="10" y="8" width="44" height="48" rx="6" />
        <line x1="10" y1="18" x2="54" y2="18" />
        <circle cx="16" cy="13" r="1.4" fill="currentColor" />
        <circle cx="21" cy="13" r="1.4" fill="currentColor" />
        <rect className="sec-icon-hero" x="18" y="24" width="28" height="8" rx="2" />
        <rect className="sec-icon-cta" x="24" y="40" width="16" height="6" rx="3" />
      </svg>
    );
  }
  return (
    <svg className="sec-icon sec-icon-immersive" width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="32" cy="32" r="22" />
      <ellipse className="sec-icon-orbit" cx="32" cy="32" rx="22" ry="8" />
      <ellipse cx="32" cy="32" rx="9" ry="22" />
      <circle className="sec-icon-dot" cx="32" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

function SectionHeader({
  icon,
  eyebrow,
  title,
  subtitle,
}: {
  icon: "landing" | "immersive";
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="sec-header">
      <div className="sec-header-icon">
        <SectionIcon kind={icon} />
      </div>
      <span className="sec-header-eyebrow">{eyebrow}</span>
      <h3 className="sec-header-title">{title}</h3>
      <p className="sec-header-subtitle">{subtitle}</p>

      <style jsx>{`
        .sec-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin: 0 auto 4.5rem;
          max-width: 640px;
          font-family: var(--font-inter), sans-serif;
        }
        .sec-header-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 92px;
          height: 92px;
          margin-bottom: 1.6rem;
          border-radius: 28px;
          color: #ffffff;
          background: linear-gradient(160deg, rgba(122,162,255,0.22), rgba(255,255,255,0.04));
          border: 1px solid rgba(255,255,255,0.16);
          box-shadow: 0 20px 50px -20px rgba(122,162,255,0.6), inset 0 1px 0 rgba(255,255,255,0.2);
          animation: sec-float 5s ease-in-out infinite;
        }
        .sec-header-eyebrow {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a9c4ff;
        }
        .sec-header-title {
          margin: 0.8rem 0 0.9rem;
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #ffffff;
        }
        .sec-header-subtitle {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
        }
        .sec-icon-landing .sec-icon-hero {
          animation: sec-hero 3.2s ease-in-out infinite;
          transform-origin: center;
        }
        .sec-icon-landing .sec-icon-cta {
          animation: sec-cta 3.2s ease-in-out infinite;
          transform-origin: center;
        }
        .sec-icon-immersive .sec-icon-orbit {
          transform-origin: 32px 32px;
          animation: sec-spin 6s linear infinite;
        }
        .sec-icon-immersive .sec-icon-dot {
          transform-origin: 32px 32px;
          animation: sec-spin 6s linear infinite;
        }
        @keyframes sec-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes sec-hero {
          0%, 100% { opacity: 0.35; transform: scaleX(0.85); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes sec-cta {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes sec-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sec-header-icon, .sec-icon-landing .sec-icon-hero, .sec-icon-landing .sec-icon-cta,
          .sec-icon-immersive .sec-icon-orbit, .sec-icon-immersive .sec-icon-dot {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

const processSteps = [
  {
    title: "Briefing",
    desc: "Você nos conta o negócio, o público e o resultado que espera.",
    deliverable: "Escopo definido",
    icon: "target",
  },
  {
    title: "Estrutura & Texto",
    desc: "Montamos a sequência da página e escrevemos o texto que converte.",
    deliverable: "Roteiro aprovado",
    icon: "layout",
  },
  {
    title: "Design & Animação",
    desc: "Criamos o visual, os ícones e as animações sob medida para cada seção.",
    deliverable: "Layout interativo",
    icon: "spark",
  },
  {
    title: "Entrega",
    desc: "Revisamos juntos, ajustamos o necessário e colocamos no ar.",
    deliverable: "Site publicado",
    icon: "rocket",
  },
];

const processPerks = [
  { title: "Contrato formal", desc: "Escopo, prazo e pagamento por escrito antes de começar." },
  { title: "Prazo sob medida", desc: "Definido conforme a complexidade do seu projeto." },
  { title: "Ícones e animações exclusivos", desc: "Criados para a sua marca, sem modelos prontos." },
  { title: "Pagamento via PIX ou dinheiro", desc: "Você escolhe a forma que for mais prática." },
];

function ProcessIcon({ kind }: { kind: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  const draw = { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true } };
  if (kind === "target") {
    return (
      <svg {...common}>
        <motion.circle cx="12" cy="12" r="9" {...draw} transition={{ duration: 1.2 }} />
        <motion.circle cx="12" cy="12" r="5" {...draw} transition={{ duration: 1.2, delay: 0.2 }} />
        <circle className="proc-dot" cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "layout") {
    return (
      <svg {...common}>
        <motion.rect x="3" y="4" width="18" height="16" rx="3" {...draw} transition={{ duration: 1.1 }} />
        <motion.path d="M3 9h18" {...draw} transition={{ duration: 0.8, delay: 0.3 }} />
        <rect className="proc-bar" x="7" y="13" width="10" height="4" rx="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "spark") {
    return (
      <svg {...common}>
        <motion.path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" {...draw} transition={{ duration: 1.2 }} />
        <circle className="proc-dot" cx="19" cy="19" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <motion.path d="M5 19c2-1 4-4 4-7l3-4 3 4c0 3 2 6 4 7-2 0-4 1-5 2-1-1-3-2-5-2z" {...draw} transition={{ duration: 1.3 }} />
      <circle className="proc-dot" cx="12" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ProcessSection({ isMobile }: { isMobile: boolean }) {
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section className="proc" style={{ marginTop: isMobile ? "5rem" : "9rem", marginBottom: "2rem" }}>
      <motion.div
        className="proc-shell"
        {...reveal()}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "2.5rem" : "3.5rem",
          padding: isMobile ? "2.2rem 1.4rem" : "4rem 3.4rem",
          borderRadius: "36px",
          color: "#ffffff",
          background:
            "radial-gradient(ellipse 60% 50% at 90% 0%, rgba(122,162,255,0.16), transparent 70%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(125,211,252,0.1), transparent 70%), linear-gradient(170deg, rgba(30,40,70,0.55), rgba(10,14,26,0.85))",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
      >

        <header
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.2rem",
          }}
        >
          <span className="proc-eyebrow">Como trabalhamos</span>
          <h3 className="proc-title" style={{ margin: 0 }}>
            Do briefing ao ar,
            <br />
            <span>em quatro etapas.</span>
          </h3>
          <div
            aria-hidden="true"
            style={{
              width: "72px",
              height: "2px",
              borderRadius: "2px",
              background: "linear-gradient(90deg, #a9c4ff, transparent)",
            }}
          />
          <p
            className="proc-lead"
            style={{ maxWidth: "560px", fontSize: "1.05rem", color: "rgba(255,255,255,0.72)" }}
          >
            Você aprova cada fase antes de a próxima começar. Cada etapa termina com uma entrega que você consegue ver e testar.
          </p>
        </header>

        <ol
          className="proc-steps"
          style={{
            position: "relative",
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))",
            gap: "1.1rem",
            margin: 0,
            padding: 0,
          }}
        >
          {processSteps.map((s, i) => (
            <motion.li
              key={s.title}
              className="proc-step"
              {...reveal(0.15 + i * 0.12)}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
                padding: "1.8rem 1.6rem 1.6rem",
                borderRadius: "24px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="proc-node">
                  <ProcessIcon kind={s.icon} />
                </div>
                <span className="proc-step-num">0{i + 1}</span>
              </div>
              <h4 className="proc-step-title">{s.title}</h4>
              <p className="proc-step-desc">{s.desc}</p>
              <span className="proc-deliverable">{s.deliverable}</span>
              <span className="proc-step-bar" aria-hidden="true" />
            </motion.li>
          ))}
        </ol>

        <div
          className="proc-panels"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
            gap: "1.1rem",
          }}
        >
          <motion.div
            className="proc-panel"
            {...reveal()}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.4rem",
              padding: "2.2rem",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="proc-label">Pagamento</span>
            <h4 className="proc-panel-title">Escolha como prefere pagar</h4>
            <div className="proc-options" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0.9rem" }}>
              <div className="proc-option">
                <span className="proc-option-tag">Opção 1</span>
                <strong className="proc-big">50 / 50</strong>
                <span className="proc-option-text">50% para reservar a equipe e 50% na entrega aprovada.</span>
              </div>
              <div className="proc-option proc-option-featured">
                <span className="proc-option-tag">Opção 2</span>
                <strong className="proc-big">100%</strong>
                <span className="proc-option-text">Pagamento integral no início. Para quem confia no nosso trabalho.</span>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
              <span className="proc-muted">Meios de pagamento:</span>
              <span className="proc-chip">PIX</span>
              <span className="proc-chip">Dinheiro</span>
              <span className="proc-muted">· sempre formalizado em contrato</span>
            </div>
          </motion.div>

          <motion.div
            className="proc-panel"
            {...reveal(0.12)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.4rem",
              padding: "2.2rem",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="proc-label">Garantias</span>
            <h4 className="proc-panel-title">O que você recebe</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", margin: 0, padding: 0 }}>
              {processPerks.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "0.9rem 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="proc-check" style={{ marginTop: "2px" }} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <strong style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff" }}>{p.title}</strong>
                    <span style={{ fontSize: "0.88rem", lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}>{p.desc}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <footer
          className="proc-foot"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: "1.4rem",
            paddingTop: "2.2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <p style={{ margin: 0, fontSize: "1.02rem", color: "rgba(255,255,255,0.75)" }}>
            Pronto para começar? Fale com a gente e receba o escopo do seu projeto.
          </p>
          <motion.a
            href="https://wa.me/5549991031743?text=Ol%C3%A1!%20Quero%20come%C3%A7ar%20meu%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, boxShadow: "0 18px 40px -10px rgba(122,162,255,0.85)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "1.05rem 1.8rem",
              borderRadius: "16px",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              textDecoration: "none",
              color: "#0b0f19",
              background: "#ffffff",
              boxShadow: "0 12px 30px -10px rgba(122,162,255,0.6)",
              cursor: "pointer",
            }}
          >
            Começar agora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.a>
        </footer>
      </motion.div>

      <style jsx>{`
        .proc {
          position: relative;
          font-family: var(--font-inter), sans-serif;
        }
        .proc-eyebrow {
          display: inline-block;
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a9c4ff;
          background: rgba(122,162,255,0.1);
          border: 1px solid rgba(169,196,255,0.3);
        }
        .proc-title {
          margin: 1.4rem 0 0;
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.6vw, 3.4rem);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }
        .proc-title span {
          background: linear-gradient(90deg, #ffffff, #a9c4ff 60%, #7dd3fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .proc-lead {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
        }
        .proc-node {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 18px;
          color: #ffffff;
          background: linear-gradient(160deg, rgba(122,162,255,0.3), rgba(255,255,255,0.05));
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 14px 30px -14px rgba(122,162,255,0.7), inset 0 1px 0 rgba(255,255,255,0.22);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
        }
        .proc-step {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s ease, background 0.5s ease;
        }
        @media (hover: hover) {
          .proc-step:hover {
            transform: translateY(-6px);
            background: rgba(255,255,255,0.07) !important;
            border-color: rgba(169,196,255,0.4) !important;
          }
        }
        @media (hover: hover) {
          .proc-step:hover .proc-node {
            transform: rotate(-6deg) scale(1.06);
            box-shadow: 0 22px 44px -14px rgba(122,162,255,0.9);
          }
        }
        .proc-step-num {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.5);
        }
        .proc-step-title {
          margin: 0.4rem 0 0;
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
        }
        .proc-step-desc {
          margin: 0;
          flex: 1;
          font-size: 1rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.82);
        }
        .proc-deliverable {
          align-self: flex-start;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #0b0f19;
          background: #ffffff;
        }
        .proc-step-bar {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, #a9c4ff, #7dd3fc, transparent);
          transform: scaleX(0.25);
          transform-origin: left center;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        @media (hover: hover) {
          .proc-step:hover .proc-step-bar {
            transform: scaleX(1);
          }
        }
        .proc-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a9c4ff;
        }
        .proc-panel-title {
          margin: -0.8rem 0 0;
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
        }
        .proc-option {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 1.3rem;
          border-radius: 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.4s ease, background 0.4s ease;
        }
        @media (hover: hover) {
          .proc-option:hover {
            border-color: rgba(169,196,255,0.4);
            background: rgba(255,255,255,0.06);
          }
        }
        .proc-option-featured {
          border-color: rgba(169,196,255,0.35);
          background: linear-gradient(160deg, rgba(122,162,255,0.14), rgba(255,255,255,0.03));
        }
        .proc-option-text {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
        }
        .proc-chip {
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          background: rgba(122,162,255,0.14);
          border: 1px solid rgba(169,196,255,0.35);
        }
        .proc-option-tag {
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a9c4ff;
        }
        .proc-big {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
          color: #ffffff;
        }
        .proc-muted {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.78);
        }
        .proc-check {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          color: #0b0f19;
          background: #ffffff;
          box-shadow: 0 0 16px rgba(122,162,255,0.5);
        }
        .proc-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 1.05rem 1.7rem;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          text-decoration: none;
          color: #0b0f19;
          background: #ffffff;
          box-shadow: 0 12px 30px -10px rgba(122,162,255,0.6);
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        @media (hover: hover) {
          .proc-cta:hover {
            background: #dbe4ff;
            box-shadow: 0 18px 40px -10px rgba(122,162,255,0.85);
          }
        }
        @media (hover: hover) {
          :global(.proc-step:hover .proc-dot) {
            animation: proc-blink 0.9s ease-in-out infinite;
          }
        }
        @media (hover: hover) {
          :global(.proc-step:hover .proc-bar) {
            animation: proc-bar 0.9s ease-in-out infinite alternate;
            transform-origin: left center;
          }
        }
        @keyframes proc-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes proc-bar {
          from { transform: scaleX(0.4); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.proc-step:hover .proc-dot), :global(.proc-step:hover .proc-bar) { animation: none; }
          .proc-step:hover, .proc-step:hover .proc-node { transform: none; }
        }
      `}</style>
    </section>
  );
}

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  usePauseOffscreenAnimations(sectionRef);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section ref={sectionRef} id="precos" style={{ padding: "10rem 0", width: "100%", background: "var(--bg)", overflow: isMobile ? "visible" : "hidden" }}>
      <style jsx global>{`
        @keyframes premium-glow {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.08); }
        }

        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes shine-flow {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes availability-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.3); border-color: rgba(255,255,255,0.4); }
        }

        @keyframes chrome-shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes silver-neon-pulse {
          0%, 100% { 
            box-shadow: inset 2px 2px 5px rgba(0,0,0,0.4), inset -1px -1px 3px rgba(255,255,255,0.2), 0 0 8px rgba(192, 192, 192, 0.3);
            filter: brightness(1);
          }
          50% { 
            box-shadow: inset 1px 1px 3px rgba(0,0,0,0.2), inset -2px -2px 6px rgba(255,255,255,0.4), 0 0 15px rgba(255, 255, 255, 0.6);
            filter: brightness(1.4);
          }
        }

        .feature-dot-3d {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ffffff 0%, #a1a1a1 50%, #666 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          animation: silver-neon-pulse 4s infinite ease-in-out;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .feature-dot-3d::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--glass-bg);
          border-radius: 50%;
          top: 20%;
          left: 20%;
          filter: blur(1px);
          opacity: 0.8;
        }
        
        .premium-card-glass {
          background: rgba(14, 22, 38, 0.94);
          border: 1px solid var(--border-color);
          border-radius: 40px;
          position: relative;
          z-index: 2;
          will-change: transform;
          transform: translateZ(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.4s ease;
          box-shadow: var(--shadow-lg);
        }

        .offer-card {
          position: relative;
          z-index: 2;
          max-width: 880px;
          margin: 0 auto;
          padding: 5rem clamp(1.5rem, 5vw, 4rem);
          text-align: center;
          border-radius: 36px;
          overflow: hidden;
          isolation: isolate;
          background: linear-gradient(165deg, rgba(20,28,48,0.9), rgba(9,12,22,0.94) 45%, rgba(14,20,36,0.94));
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow:
            0 50px 120px -30px rgba(0,0,0,0.85),
            inset 0 1px 0 rgba(255,255,255,0.25),
            inset 0 -1px 0 rgba(255,255,255,0.06);
        }
        .offer-grid {
          position: absolute;
          left: -20%;
          right: -20%;
          bottom: -10%;
          height: 60%;
          background-image:
            linear-gradient(rgba(122,162,255,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(122,162,255,0.18) 1px, transparent 1px);
          background-size: 56px 56px;
          transform: perspective(400px) rotateX(58deg);
          transform-origin: 50% 100%;
          -webkit-mask-image: linear-gradient(to top, #000 0%, transparent 85%);
          mask-image: linear-gradient(to top, #000 0%, transparent 85%);
          pointer-events: none;
          z-index: 0;
        }
        .offer-corner {
          position: absolute;
          width: 26px;
          height: 26px;
          border-color: rgba(255,255,255,0.7);
          border-style: solid;
          border-width: 0;
          pointer-events: none;
          z-index: 2;
        }
        .offer-corner-tl { top: 18px; left: 18px; border-top-width: 2px; border-left-width: 2px; border-top-left-radius: 10px; }
        .offer-corner-tr { top: 18px; right: 18px; border-top-width: 2px; border-right-width: 2px; border-top-right-radius: 10px; }
        .offer-corner-bl { bottom: 18px; left: 18px; border-bottom-width: 2px; border-left-width: 2px; border-bottom-left-radius: 10px; }
        .offer-corner-br { bottom: 18px; right: 18px; border-bottom-width: 2px; border-right-width: 2px; border-bottom-right-radius: 10px; }
        .offer-card::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background: conic-gradient(from var(--offer-angle, 0deg), transparent 0deg, rgba(122,162,255,0.9) 60deg, transparent 120deg, transparent 360deg);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          animation: offer-spin 6s linear infinite;
        }
        @property --offer-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes offer-spin {
          to { --offer-angle: 360deg; }
        }
        .offer-ride {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .offer-card > :not(.offer-ride):not(.offer-grid):not(.offer-halo):not(.offer-corner) {
          position: relative;
          z-index: 1;
        }
        .offer-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .offer-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7aa2ff;
          box-shadow: 0 0 12px #7aa2ff;
          animation: offer-dot 2s ease-in-out infinite;
        }
        @keyframes offer-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .offer-title {
          margin: 1.8rem 0 1.4rem;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 8vw, 6rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          color: #ffffff;
        }
        .offer-line {
          display: block;
          opacity: 0;
          animation: offer-line-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .offer-line-1 {
          animation-delay: 0.1s;
        }
        .offer-nowrap {
          display: inline-block;
          white-space: nowrap;
        }
        .offer-line-2 {
          animation-delay: 0.35s;
          background: linear-gradient(90deg, #7dd3fc, #ffffff 25%, #67e8f9 50%, #ffffff 75%, #7dd3fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation:
            offer-line-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards,
            offer-accent-flow 6s linear 1.35s infinite;
        }
        @keyframes offer-line-in {
          0% { opacity: 0; filter: blur(12px); transform: translateY(0.5em); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        @keyframes offer-accent-flow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .offer-lead-anim {
          opacity: 0;
          animation: offer-lead-in 1s ease 0.8s forwards;
        }
        @keyframes offer-lead-in {
          to { opacity: 1; }
        }
        .offer-lead {
          max-width: 520px;
          margin: 0 auto;
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 500;
          line-height: 1.6;
          color: rgba(255,255,255,0.92);
          text-shadow: 0 1px 12px rgba(0,0,0,0.5);
        }
        .offer-price-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          margin: 3rem 0 0;
        }
        .offer-compare {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(1.5rem, 4vw, 3rem);
        }
        .offer-compare-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
        }
        .offer-compare-item-main {
          align-items: flex-start;
        }
        .offer-compare-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }
        .offer-old {
          font-family: var(--font-body);
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.55);
          text-decoration: line-through;
          text-decoration-thickness: 2px;
        }
        .offer-compare-arrow {
          display: flex;
          align-items: center;
          color: #a9c4ff;
          filter: drop-shadow(0 0 10px rgba(122,162,255,0.6));
        }
        .offer-price {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #ffffff;
          font-family: var(--font-display);
          line-height: 0.9;
        }
        .offer-currency {
          font-size: 1.8rem;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          margin-top: 0.6rem;
        }
        .offer-value {
          font-size: clamp(4.2rem, 11vw, 7rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          background: linear-gradient(180deg, #ffffff 0%, #ffffff 45%, #a9c4ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 28px rgba(122,162,255,0.55));
        }
        .offer-tag {
          margin-top: 1.1rem;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #0b0f19;
          background: #ffffff;
        }
        .offer-features {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 0.75rem;
          max-width: 760px;
          margin: 0 auto;
          padding: 0;
          text-align: left;
        }
        .offer-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.9rem 1.1rem;
          border-radius: 16px;
          font-size: 0.92rem;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        @media (hover: hover) {
          .offer-feature:hover {
            background: rgba(255,255,255,0.1);
            border-color: rgba(255,255,255,0.25);
            transform: translateY(-2px);
          }
        }
        .offer-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          color: #0b0f19;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.08), 0 0 22px rgba(122,162,255,0.5);
        }
        .offer-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: 3.2rem;
        }
        .offer-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1.2rem 2.8rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #0b0f19;
          background: #ffffff;
          box-shadow: 0 16px 40px -10px rgba(122,162,255,0.55);
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        .offer-cta {
          position: relative;
          overflow: hidden;
        }
        .offer-cta::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent);
          transform: skewX(-22deg);
          animation: offer-cta-shine 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        /* transform em vez de left: 190% do pai / 40% de largura = 475% (mesmo trajeto). */
        @keyframes offer-cta-shine {
          0%, 55% { transform: translateX(0) skewX(-22deg); }
          100% { transform: translateX(475%) skewX(-22deg); }
        }
        @media (hover: hover) {
          .offer-cta:hover {
            background: #7aa2ff;
            box-shadow: 0 20px 50px -10px rgba(122,162,255,0.8);
          }
        }
        @media (max-width: 640px) {
          .offer-card { padding: 3rem 1.25rem; border-radius: 28px; }
          .offer-corner { width: 18px; height: 18px; }
          .offer-corner-tl, .offer-corner-tr { top: 12px; }
          .offer-corner-bl, .offer-corner-br { bottom: 12px; }
          .offer-corner-tl, .offer-corner-bl { left: 12px; }
          .offer-corner-tr, .offer-corner-br { right: 12px; }
          .offer-features { grid-template-columns: 1fr; }
        }
        /* Abaixo de 430px a linha "De R$ 1.500 → Por R$ 997" não cabia no card:
           o preço antigo quebrava e o 997 era cortado. Escala proporcional ao
           espaço interno do card (100vw - 104px = 326px em 430), então em 430px
           os tamanhos são exatamente os originais. */
        @media (max-width: 429px) {
          .offer-compare { gap: min(1.5rem, calc((100vw - 104px) * 0.0736)); }
          .offer-old { white-space: nowrap; font-size: min(1.4rem, calc((100vw - 104px) * 0.0687)); }
          .offer-currency { font-size: min(1.8rem, calc((100vw - 104px) * 0.0883)); margin-top: min(0.6rem, calc((100vw - 104px) * 0.0294)); }
          .offer-value { font-size: min(4.2rem, calc((100vw - 104px) * 0.2061)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .offer-ride { display: none; }
          .offer-card::before, .offer-badge-dot, .offer-cta::after { animation: none; }
          .offer-line, .offer-lead-anim { animation: none; opacity: 1; filter: none; }
        }

        .cta-premium-glass {
          background: var(--text-primary);
          color: var(--bg);
          padding: 1.6rem 4.5rem;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--text-primary);
          text-decoration: none;
          display: inline-block;
          position: relative;
          overflow: hidden;
          animation: pulse-soft 2.5s ease-in-out infinite;
        }

        .cta-premium-glass::after {
          content: "";
          position: absolute;
          top: 0;
          height: 100%;
          width: 60px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent);
          transform: skewX(-25deg);
          animation: shine-flow 3s infinite linear;
        }

        @media (hover: hover) {
          .cta-premium-glass:hover {
            background: transparent;
            color: var(--text-primary);
            border-color: var(--text-primary);
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 30px 60px var(--accent-glow);
            animation-play-state: paused;
          }
        }

        .btn-shine-mini {
          position: relative;
          overflow: hidden;
        }
        .btn-shine-mini::after {
          content: "";
          position: absolute;
          top: 0;
          height: 100%;
          width: 30px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-25deg);
          animation: shine-flow 4s infinite linear;
        }
      `}</style>

      <div className="container" style={{ maxWidth: "1280px" }}>
        
        {/* Main Offer Section */}
        <div style={{ position: "relative", marginBottom: "10rem" }}>
          <div className="offer-card">
            <OfferCodeRide />
            <div className="offer-grid" aria-hidden="true" />
            <span className="offer-corner offer-corner-tl" aria-hidden="true" />
            <span className="offer-corner offer-corner-tr" aria-hidden="true" />
            <span className="offer-corner offer-corner-bl" aria-hidden="true" />
            <span className="offer-corner offer-corner-br" aria-hidden="true" />

            <div className="offer-badge">
              <span className="offer-badge-dot" />
              Oferta de lançamento
            </div>

            <h2 className="offer-title">
              <span className="offer-line offer-line-1">
                Apenas <span className="offer-nowrap">3 vagas.</span>
              </span>
              <span className="offer-line offer-line-2">Por tempo limitado.</span>
            </h2>

            <p className="offer-lead offer-lead-anim">
              Depois das 3 vagas, o valor volta ao preço integral.
            </p>

            <div className="offer-price-block">
              <div className="offer-compare">
                <div className="offer-compare-item">
                  <span className="offer-compare-label">De</span>
                  <span className="offer-old">R$ 1.500</span>
                </div>
                <span className="offer-compare-arrow" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <div className="offer-compare-item offer-compare-item-main">
                  <span className="offer-compare-label">Por</span>
                  <div className="offer-price">
                    <span className="offer-currency">R$</span>
                    <span className="offer-value">997</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="offer-cta-wrap">
              <motion.a
                href="https://wa.me/5549991031743?text=Olá!%20Gostaria%20de%20aproveitar%20a%20condição%20única%20do%20plano%20de%20R$997.%20Quero%20dominar%20meu%20mercado."
                className="offer-cta"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Garantir Minha Vaga
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Regular Plans Section */}
        <SectionHeader
          icon="landing"
          eyebrow="Landing Pages"
          title="Investimento em landing page"
          subtitle="Uma página focada em uma única oferta, pensada para converter visitantes em clientes."
        />

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", 
          gap: "2rem" 
        }}>
          {regularPlans.map((p, i) => (
            <PlanCard
              key={p.name}
              plan={p}
              index={i}
              featured={p.name === "Plano Personalizado"}
            />
          ))}
        </div>
        {/* Website Creation Plans Section */}
        <div style={{ marginTop: "10rem" }}>
          <SectionHeader
            icon="immersive"
            eyebrow="Sites"
            title="Investimento em sites"
            subtitle="Sites institucionais e imersivos, com estrutura completa e experiência sob medida."
          />
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", 
          gap: "2rem" 
        }}>
          {websitePlans.map((p, i) => (
            <PlanCard
              key={p.name}
              plan={p}
              index={i}
              featured={p.name === "Custom & Saas"}
            />
          ))}
        </div>

        {/* Work Format & Payment Section */}
        <ProcessSection isMobile={isMobile} />

      </div>
    </section>

  );
}

