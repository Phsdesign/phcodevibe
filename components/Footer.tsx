"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePauseOffscreenAnimations } from "@/hooks/usePauseOffscreenAnimations";

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const VARIANT_GLYPHS = [
  "PHCODELABS01<>/{}#%*+",
  "01ΞΦΔΛ",
  "+*×·•◇",
  "=/\\|_-~",
];

function MatrixLetter({ ch, idx }: { ch: string; idx: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const variant = idx % 4;
    const GLYPHS = VARIANT_GLYPHS[variant];
    const tint = variant === 2 ? "103,232,249" : "96,165,250";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const sizeCanvas = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    type P = { x: number; y: number; vx: number; vy: number; life: number; g: string; size: number };
    let parts: P[] = [];
    let hovering = false;
    let raf = 0;
    let lastSpawn = 0;
    let running = false;

    const spawn = (count: number) => {
      for (let i = 0; i < count; i++) {
        const burst = variant === 2;
        const rise = variant === 1;
        const ang = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 2.5;
        parts.push({
          x: burst ? w / 2 : Math.random() * w,
          y: burst ? h / 2 : rise ? h + 10 : -10 - Math.random() * h * 0.4,
          vx: burst ? Math.cos(ang) * sp : (Math.random() - 0.5) * (variant === 3 ? 2.2 : 0.6),
          vy: burst ? Math.sin(ang) * sp : rise ? -(1.2 + Math.random() * 2.4) : 1.2 + Math.random() * 2.4,
          life: 1,
          g: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          size: 9 + Math.random() * 5,
        });
      }
    };

    const loop = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      if (hovering && now - lastSpawn > 40) {
        spawn(3);
        lastSpawn = now;
      }
      parts = parts.filter((p) => p.y < h + 30 && p.y > -h - 30 && p.x > -w && p.x < w * 2 && p.life > 0);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (!hovering) p.life -= 0.02;
        const a = Math.max(0, p.life) * (0.5 + Math.random() * 0.5);
        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = `rgba(${tint},${a})`;
        ctx.shadowColor = `rgba(${tint},0.9)`;
        ctx.shadowBlur = 8;
        ctx.fillText(p.g, p.x, p.y);
      }
      ctx.shadowBlur = 0;
      if (hovering || parts.length > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      hovering = true;
      sizeCanvas();
      start();
    };
    const onLeave = () => {
      hovering = false;
    };
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [idx]);

  return (
    <span ref={wrapRef} className="ft-wm-letter">
      <canvas ref={canvasRef} className="ft-wm-letter-fx" />
      <span className={`ft-wm-letter-txt ft-gl-${idx % 4}`} data-ch={ch}>{ch}</span>
    </span>
  );
}

function useLocalTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Folha isolada: o relógio atualiza a cada 30s re-renderizando só este texto,
// e não o Footer inteiro (com seu <style> grande e as letras com canvas).
function LocalTime() {
  const time = useLocalTime();
  return <>{time || "--:--"}</>;
}

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  usePauseOffscreenAnimations(rootRef);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ft-in");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const marquee = "Design de elite · Engenharia de precisão · Menos ruído · Mais conexão · ";

  return (
    <footer ref={rootRef} className="ft-root">
      <style>{`
        .ft-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          background: #000;
          color: #fff;
          overflow: hidden;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          font-family: inherit;
        }
        .ft-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: ${NOISE};
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: overlay;
        }
        .ft-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: calc(100% / 12) 100%, 100% 96px;
          background-position: -1px 0, 0 0;
          mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.4) 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.4) 70%, transparent 100%);
        }
        .ft-glow {
          position: absolute;
          left: -10%;
          top: -30%;
          width: 70%;
          height: 90%;
          background: radial-gradient(closest-side, rgba(30, 63, 128, 0.22), transparent 70%);
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 2.4s ease;
        }
        .ft-in .ft-glow { opacity: 1; }
        .ft-wrap { position: relative; z-index: 1; padding: clamp(1.25rem, 3vw, 2.5rem) clamp(1.25rem, 4vw, 4rem); display: flex; flex-direction: column; flex: 1; }

        /* barra superior */
        .ft-topbar {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1.1rem;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .ft-topbar > :last-child { justify-self: end; }
        .ft-status { display: inline-flex; align-items: center; gap: 0.55rem; }
        .ft-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #3a6bc4;
          box-shadow: 0 0 0 0 rgba(58,107,196,0.6);
          animation: ft-pulse 2.4s ease-out infinite;
        }
        @keyframes ft-pulse {
          0% { box-shadow: 0 0 0 0 rgba(58,107,196,0.55); }
          80%, 100% { box-shadow: 0 0 0 10px rgba(58,107,196,0); }
        }

        /* título */
        .ft-hero { margin: clamp(3rem, 8vw, 7rem) 0 0; }
        .ft-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.5rem, 7.2vw, 7.5rem);
          letter-spacing: -0.055em;
          line-height: 0.88;
        }
        .ft-line { display: block; overflow: hidden; padding: 0.02em 0 0.06em; }
        .ft-line > span {
          display: inline-block;
          transform: translateY(105%) rotate(2deg);
          transform-origin: left bottom;
          transition: transform 1.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ft-in .ft-line > span { transform: translateY(0) rotate(0); }
        .ft-line:nth-child(2) > span { transition-delay: 0.12s; }
        .ft-line:nth-child(3) > span { transition-delay: 0.24s; }
        .ft-outline > span {
          color: transparent;
          -webkit-text-stroke: 1.2px rgba(255,255,255,0.85);
        }
        .ft-accent-word { color: #9db4e3; }


        .ft-icons {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 3vw, 2.25rem);
          margin-top: clamp(1.5rem, 3vw, 2.5rem);
          color: rgba(255,255,255,0.75);
        }
        .ft-icon {
          position: relative;
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
        }
        .ft-icon svg { width: 22px; height: 22px; }
        .ft-icon-spin svg { animation: ftSpin 6s linear infinite; }
        .ft-icon-pulse { animation: ftPulse 2.4s ease-in-out infinite; }
        .ft-icon-float { animation: ftFloat 3.2s ease-in-out infinite; }
        .ft-icon-draw path {
          stroke-dasharray: 60;
          animation: ftDraw 3s ease-in-out infinite;
        }
        .ft-icon-glow:hover { box-shadow: 0 0 22px rgba(96,165,250,0.45); border-color: rgba(96,165,250,0.5); }
        @keyframes ftSpin { to { transform: rotate(360deg); } }
        @keyframes ftPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(96,165,250,0.35); }
          50% { box-shadow: 0 0 0 10px rgba(96,165,250,0); }
        }
        @keyframes ftFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes ftDraw {
          0% { stroke-dashoffset: 60; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -60; }
        }

        .ft-cta-arrow svg { animation: ftArrowLoop 2s ease-in-out infinite; }
        @keyframes ftArrowLoop {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }

        /* CTA gigante */
        .ft-cta-row {
          position: relative;
          margin-top: clamp(2.5rem, 6vw, 5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem 2rem;
          padding: clamp(1.25rem, 2.5vw, 2rem) 0;
          border-top: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          text-decoration: none;
          overflow: hidden;
        }
        /* Abaixo de 430px texto, legenda e seta não cabem numa linha: o
           "Fale com a gente pelo WhatsApp" e a seta eram cortados pelo
           overflow. Ali legenda e seta descem para uma segunda linha. */
        @media (max-width: 429px) {
          .ft-cta-row { flex-wrap: wrap; }
        }
        .ft-cta-row::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #1e3f80, #17607a);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .ft-cta-row:hover::before { transform: scaleY(1); }
        .ft-cta-row > * { position: relative; z-index: 1; }
        .ft-cta-text {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2rem, 6vw, 5.5rem);
          letter-spacing: -0.04em;
          line-height: 1;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ft-cta-row:hover .ft-cta-text { transform: translateX(0.4em); }
        .ft-cta-meta {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          max-width: 200px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }
        .ft-cta-arrow {
          flex-shrink: 0;
          width: clamp(3.5rem, 7vw, 6.5rem);
          height: clamp(3.5rem, 7vw, 6.5rem);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          display: grid;
          place-items: center;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s ease, border-color 0.5s ease;
        }
        .ft-cta-row:hover .ft-cta-arrow {
          transform: rotate(-45deg);
          background: #fff;
          border-color: #fff;
          color: #000;
        }

        /* marquee */
        .ft-marquee {
          margin: clamp(2rem, 4vw, 3.5rem) -2rem 0;
          overflow: hidden;
          white-space: nowrap;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 0.9rem 0;
        }
        .ft-track {
          display: inline-flex;
          animation: ft-scroll 38s linear infinite;
        }
        .ft-track span {
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.42);
          padding-right: 0.6rem;
        }
        .ft-track span:nth-child(even) { color: rgba(157,180,227,0.7); }
        @keyframes ft-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* colunas */
        .ft-cols {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-top: clamp(2.5rem, 5vw, 4rem);
        }
        @media (min-width: 900px) {
          .ft-cols { grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 2rem; }
        }
        .ft-col-head {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin: 0 0 1.4rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .ft-col-head b { color: #5d82c9; font-weight: 500; }
        .ft-brand-row { display: flex; align-items: center; gap: 0.8rem; }
        .ft-brand-name { font-weight: 900; font-size: 1.25rem; letter-spacing: -0.02em; }
        .ft-brand-text {
          margin: 1.3rem 0 0;
          max-width: 380px;
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.58);
        }
        .ft-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.2rem; }
        .ft-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.02rem;
          opacity: 0.75;
          transition: opacity 0.4s ease, padding 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
        }
        .ft-link .ft-arr {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          color: #9db4e3;
        }
        .ft-link:hover { opacity: 1; padding-left: 0.6rem; border-color: rgba(157,180,227,0.45); }
        .ft-link:hover .ft-arr { opacity: 1; transform: translateX(0); }
        .ft-link-muted { font-size: 0.9rem; opacity: 0.5; font-weight: 500; }

        /* grande wordmark */
        .ft-wordmark {
          margin: clamp(2.5rem, 5vw, 4rem) 0 0;
          font-weight: 900;
          font-size: clamp(3.5rem, 17.5vw, 22rem);
          letter-spacing: -0.07em;
          line-height: 0.78;
          white-space: nowrap;
          text-align: center;
          user-select: none;
          background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.02) 88%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transform: translateY(18%);
          opacity: 0;
          transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s ease;
        }
        .ft-in .ft-wordmark { transform: translateY(0); opacity: 1; }
        .ft-wm-letter {
          position: relative;
          display: inline-block;
          isolation: isolate;
          overflow: hidden;
          padding: 0.14em 0.08em;
          margin: -0.14em -0.08em;
          cursor: default;
        }
        .ft-wm-letter-fx {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .ft-wm-letter:hover .ft-wm-letter-fx { opacity: 1; }
        .ft-wm-letter-txt {
          position: relative;
          z-index: 1;
          transition: color 0.4s ease, text-shadow 0.4s ease;
        }
        .ft-wm-letter:hover .ft-wm-letter-txt {
          color: #60a5fa;
          text-shadow: 0 0 26px rgba(59,130,246,0.7);
        }
        .ft-wm-space { display: inline-block; width: 0.28em; }

        .ft-wm-letter-txt { display: inline-block; }
        .ft-wm-letter:hover .ft-gl-0 { animation: ftGl0 0.8s steps(1) infinite; }
        .ft-wm-letter:hover .ft-gl-2 { animation: ftGl2 0.55s steps(1) infinite; }
        .ft-wm-letter:hover .ft-gl-3 { animation: ftGl3 0.3s steps(2) infinite; }
        .ft-wm-letter:hover .ft-gl-1::before,
        .ft-wm-letter:hover .ft-gl-1::after {
          content: attr(data-ch);
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .ft-wm-letter:hover .ft-gl-1::before { color: #67e8f9; animation: ftSliceA 0.75s steps(1) infinite; }
        .ft-wm-letter:hover .ft-gl-1::after { color: #1d4ed8; animation: ftSliceB 0.6s steps(1) infinite; }
        .ft-wm-letter:hover .ft-gl-3::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 3px;
          background: #67e8f9;
          box-shadow: 0 0 12px #67e8f9;
          animation: ftScan 1.1s linear infinite;
        }

        @keyframes ftGl0 {
          0% { transform: translate(0); text-shadow: none; }
          25% { transform: translate(-2px, 0); text-shadow: -2px 0 #3b82f6, 2px 0 #22d3ee; }
          50% { transform: translate(1px, -1px); text-shadow: 2px 0 #1d4ed8, -1px 0 #67e8f9; }
          75% { transform: translate(0); text-shadow: none; }
          100% { transform: translate(0); text-shadow: none; }
        }
        @keyframes ftGl2 {
          0% { transform: skewX(0) scaleY(1); text-shadow: none; }
          20% { transform: skewX(-12deg) scaleY(0.86); }
          40% { transform: skewX(8deg) scaleY(1.08); text-shadow: 0 0 14px #67e8f9; }
          60% { transform: skewX(0) scaleY(1); }
          80% { transform: skewX(-4deg) translateX(2px); text-shadow: none; }
          100% { transform: skewX(0); }
        }
        @keyframes ftGl3 {
          0% { opacity: 1; }
          50% { opacity: 0.35; }
          100% { opacity: 1; }
        }
        @keyframes ftSliceA {
          0% { clip-path: inset(0 0 70% 0); transform: translateX(-3px); }
          25% { clip-path: inset(40% 0 30% 0); transform: translateX(3px); }
          50% { clip-path: inset(75% 0 0 0); transform: translateX(-2px); }
          75% { clip-path: inset(10% 0 80% 0); transform: translateX(2px); }
          100% { clip-path: inset(0 0 70% 0); transform: translateX(0); }
        }
        @keyframes ftSliceB {
          0% { clip-path: inset(80% 0 0 0); transform: translateX(2px); }
          30% { clip-path: inset(20% 0 60% 0); transform: translateX(-3px); }
          60% { clip-path: inset(50% 0 40% 0); transform: translateX(3px); }
          100% { clip-path: inset(80% 0 0 0); transform: translateX(0); }
        }
        @keyframes ftScan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .ft-bottom {
          margin-top: clamp(1.5rem, 3vw, 2.5rem);
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.12);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .ft-bottom b { color: rgba(255,255,255,0.85); font-weight: 600; }

        /* revelação em sequência */
        .ft-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 1s ease, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ft-in .ft-reveal { opacity: 1; transform: translateY(0); }
        .ft-in .ft-d1 { transition-delay: 0.35s; }
        .ft-in .ft-d2 { transition-delay: 0.5s; }
        .ft-in .ft-d3 { transition-delay: 0.65s; }
        .ft-in .ft-d4 { transition-delay: 0.8s; }

        @media (prefers-reduced-motion: reduce) {
          .ft-line > span, .ft-reveal, .ft-wordmark, .ft-glow, .ft-track, .ft-dot {
            transition: none; animation: none; transform: none; opacity: 1;
          }
        }
      `}</style>

      <div className="ft-glow" aria-hidden="true" />
      <div className="ft-grid" aria-hidden="true" />

      <div className="ft-wrap">
        <div className="ft-topbar ft-reveal">
          <span>PH Code Labs — Índice 00</span>
          <span>Estúdio de design de elite</span>
          <span className="ft-status">
            <span className="ft-dot" />
            System operational · <LocalTime /> BRT
          </span>
        </div>

        <div className="ft-hero">
          <h2 className="ft-title">
            <span className="ft-line"><span>Transformando</span></span>
            <span className="ft-line ft-accent-line"><span className="ft-accent-word">visão em realidade.</span></span>
          </h2>
          <div className="ft-icons" aria-hidden="true">
            <span className="ft-icon ft-icon-spin ft-icon-glow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>
            </span>
            <span className="ft-icon ft-icon-pulse ft-icon-glow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
            </span>
            <span className="ft-icon ft-icon-float ft-icon-glow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" /></svg>
            </span>
            <span className="ft-icon ft-icon-draw ft-icon-glow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4" /></svg>
            </span>
          </div>
        </div>

        <a
          href="https://wa.me/5549991031743"
          target="_blank"
          rel="noopener noreferrer"
          className="ft-cta-row ft-reveal ft-d2"
        >
          <span className="ft-cta-text">Começar projeto</span>
          <span className="ft-cta-meta">
            Fale com a gente
            <br />
            pelo WhatsApp
          </span>
          <span className="ft-cta-arrow" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>

        <div className="ft-marquee ft-reveal ft-d3" aria-hidden="true">
          <div className="ft-track">
            <span>{marquee}</span>
            <span>{marquee}</span>
          </div>
        </div>

        <div className="ft-cols">
          <div className="ft-reveal ft-d1">
            <div className="ft-brand-row">
              <Image src="/logoicon.svg" alt="Logo" width={32} height={32} />
              <span className="ft-brand-name">PH CODE LABS</span>
            </div>
            <p className="ft-brand-text">
              Arquitetando o futuro digital através de design de elite e engenharia de precisão. Menos ruído, mais conexão absoluta.
            </p>
          </div>

          <div className="ft-reveal ft-d2">
            <h4 className="ft-col-head"><b>01</b> Navegação</h4>
            <ul className="ft-links">
              <li><Link href="/sobre" className="ft-link">Studio<span className="ft-arr">→</span></Link></li>
              <li><Link href="/portfolio" className="ft-link">Showcase<span className="ft-arr">→</span></Link></li>
              <li><Link href="/contato" className="ft-link">Briefing<span className="ft-arr">→</span></Link></li>
            </ul>
          </div>

          <div className="ft-reveal ft-d3">
            <h4 className="ft-col-head"><b>02</b> Social</h4>
            <ul className="ft-links">
              <li><a href="https://instagram.com/phcodelabs" target="_blank" rel="noopener noreferrer" className="ft-link">Instagram<span className="ft-arr">→</span></a></li>
            </ul>
          </div>

          <div className="ft-reveal ft-d4">
            <h4 className="ft-col-head"><b>03</b> Legal</h4>
            <ul className="ft-links">
              <li><Link href="/privacidade" className="ft-link ft-link-muted">Privacidade</Link></li>
              <li><Link href="/termos" className="ft-link ft-link-muted">Termos</Link></li>
            </ul>
          </div>
        </div>

        <div className="ft-wordmark" aria-hidden="true">
          {"PH CODE LABS".split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="ft-wm-space" />
            ) : (
              <MatrixLetter key={i} ch={ch} idx={i} />
            )
          )}
        </div>

        <div className="ft-bottom ft-reveal ft-d4">
          <span>© 2026 PH Code Labs — Made by <b>Pedro Henrique</b></span>
          <span>Design · Engenharia · Conexão</span>
        </div>
      </div>
    </footer>
  );
}
