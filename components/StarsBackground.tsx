"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createFrameLoop } from "@/lib/frameLoop";
import { STAR_LAYERS, STAR_TILE } from "@/data/starfield";

/**
 * Estrelas do fundo cósmico desenhadas num único canvas do tamanho da tela.
 *
 * Antes eram 12 camadas de box-shadow (4 tiles x 3 tamanhos), cada uma com
 * 2000x4000 px na GPU, e era o item que mais pesava na rolagem do desktop.
 * Agora: um canvas, DPR no máximo 2, desenhado no relógio único da página,
 * parado enquanto o fundo está escondido (Hero) e estático no celular e em
 * prefers-reduced-motion. Mesmo trajeto e velocidade: cada camada sobe 2000 px
 * em 50 s, 100 s e 150 s, e os tiles 1 e 3 são espelhados como antes.
 */
function StarsCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const controls = useRef<{ setActive: (on: boolean) => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate =
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // No celular só o primeiro tile existia (os outros eram display: none).
    const maxTiles = window.innerWidth < 768 ? 1 : 4;
    const t0 = performance.now();
    let w = 0;
    let h = 0;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      const tiles = Math.min(maxTiles, Math.ceil(w / STAR_TILE));
      for (const layer of STAR_LAYERS) {
        const offset = animate ? (((time - t0) / layer.periodMs) % 1) * STAR_TILE : 0;
        const s = layer.size;
        const pts = layer.points;
        ctx.beginPath();
        for (let i = 0; i < pts.length; i += 2) {
          let y = pts[i + 1] - offset;
          if (y < 0) y += STAR_TILE;
          for (let k = 0; k < tiles; k++) {
            const x = k * STAR_TILE + (k % 2 ? STAR_TILE - pts[i] - s : pts[i]);
            if (x > w) continue;
            for (let yy = y; yy < h; yy += STAR_TILE) ctx.rect(x, yy, s, s);
          }
        }
        ctx.fill();
      }
    };

    const loop = createFrameLoop((time) => draw(time));

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (Math.round(r.width) === w && Math.round(r.height) === h) return;
      w = Math.round(r.width);
      h = Math.round(r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };
    resize();

    const setActive = (on: boolean) => {
      if (!animate) return;
      if (on) {
        // Desenha já no estado atual antes de aparecer, e só então liga o loop.
        draw(performance.now());
        loop.start();
      } else {
        loop.stop();
      }
    };
    controls.current = { setActive };
    setActive(activeRef.current);

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      loop.stop();
      controls.current = null;
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
    controls.current?.setActive(active);
  }, [active]);

  return <canvas ref={canvasRef} className="stars-canvas" />;
}

export function StarsBackground() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("theme-changed", checkTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("theme-changed", checkTheme);
    };
  }, []);

  useEffect(() => {
    // Se não estiver na home (ex: /sobre, /portfolio, etc.), sempre visível
    if (pathname !== "/") {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }

    // Na home: oculta na Hero (dobra 1) e ativa a partir da dobra 2.
    // A altura da Hero é medida só no resize (antes: offsetHeight a cada evento de
    // scroll) e a checagem roda no máximo 1x por frame.
    let heroHeight = 600;
    let needsMeasure = false;
    let frame = 0;

    const measure = () => {
      const heroElement = document.getElementById("hero");
      heroHeight = heroElement ? heroElement.offsetHeight : 600;
    };
    const check = () => {
      // Começa a transição suave quando o usuário começa a sair da Hero em direção à dobra 2
      setIsVisible(window.scrollY > Math.max(200, heroHeight * 0.45));
    };
    const schedule = (remeasure: boolean) => {
      if (remeasure) needsMeasure = true;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (needsMeasure) {
          needsMeasure = false;
          measure();
        }
        check();
      });
    };
    const onScroll = () => schedule(false);
    const onResize = () => schedule(true);

    // Primeira checagem no próximo frame (evita setState síncrono dentro do effect).
    schedule(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  const shown = isVisible || !isDark;

  return (
    <div
      className={`stars-bg-container ${shown ? "stars-visible" : "stars-hidden"}`}
      aria-hidden="true"
    >
      {/* Partículas de estrelas SÓ na versão black (dark mode). Na versão white: sem partículas, apenas a cor */}
      {isDark && <StarsCanvas active={shown} />}
    </div>
  );
}

export default StarsBackground;
