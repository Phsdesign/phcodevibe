"use client";

import { useEffect, useRef } from "react";

const LOGO_PATH =
  "M41.3,85.8v-.2c-.6-2.8-4.2-23,8.1-33.8,3.4-2.9,7.2-4.8,10.5-5.7,9.8-2.6,24.4-3.1,31.3,3.6,1,1,1.6,1.8,1.8,2.1,3.9,6,.8,14.1.3,15.4-4.6,11.9-20.8,14.2-21.5,14.3,6.1.5,15.9-.3,26.3-4.9,4.3-2.2,9.4-4.8,12.9-10.7,3.3-5.7,3.3-11.2,3.2-15.3,0-9.1-3.3-16.2-5.7-20.3,0,.2.3.5.6.8,1.7,2.5,5,7.3,7.4,14,1.5,4.1,2.2,7.6,2.9,10.9.5,5.9.4,14-2.3,22.9-7.7,25.1-29.9,36.7-35.2,39.2,8.9-8.2,13.2-15.8,15.4-20.8,2.1-4.7,2.7-7.7,1.3-9.7-1.2-1.7-3.8-2.8-8.8-2.9-5.9,0-16.4,1.3-20.2,2.9-1.3.5-2.8,1.2-4.5,2.4,0,0-3.1,2-5.2,4.7-4.3,5.3-4,13.4-3.9,15,1.1,17.8,13.9,27.3,13.9,27.3-4.8-3.1-11.7-8.6-16.8-17.2-3.6-6-4.8-10.9-5.1-12.3-.7-2.9-1.4-6.3-.8-10.7.8-5.7,3.5-9.7,4.8-11.5,1.9-2.7,6.7-6.2,15.3-9.7,4.5-1.8,7.6-2.2,10.8-5.4,2.8-2.7,3.2-5,3.4-5.9.2-.8,1-4-.8-6.9-1.8-3-4.9-3.9-7.2-4.2-6-.8-10.9.7-13.5,1.8-7.1,2.9-11,7.7-12,9.1-.7.9-3.5,4.7-5,10.4-1.6,6.1-1.8,12.4-1.8,12.4,0,0,0-.5-.2-.8l.3-.3Z";

const VIEW = 160;
const GRID = 260;
const REPEL_RADIUS = 130;
const REPEL_FORCE = 1.6;

type Particle = {
  ux: number;
  uy: number;
  seed: number;
  seed2: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  primed: boolean;
};

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function samplePoints() {
  const off = document.createElement("canvas");
  off.width = GRID;
  off.height = GRID;
  const octx = off.getContext("2d");
  if (!octx) return { particles: [] as Particle[], cxB: 0, cyB: 0, den: 1 };
  octx.setTransform(GRID / VIEW, 0, 0, GRID / VIEW, 0, 0);
  octx.fillStyle = "#fff";
  octx.fill(new Path2D(LOGO_PATH));
  const data = octx.getImageData(0, 0, GRID, GRID).data;

  const hits: [number, number][] = [];
  let minX = GRID, maxX = 0, minY = GRID, maxY = 0;
  for (let y = 0; y < GRID; y += 2) {
    for (let x = 0; x < GRID; x += 2) {
      if (data[(y * GRID + x) * 4 + 3] < 128) continue;
      hits.push([x, y]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const cxB = (minX + maxX) / 2;
  const cyB = (minY + maxY) / 2;
  const den = Math.max(maxX - minX, maxY - minY) || 1;

  const particles: Particle[] = hits.map(([x, y]) => ({
    ux: (x - cxB) / den,
    uy: (y - cyB) / den,
    seed: Math.random(),
    seed2: Math.random(),
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    primed: false,
  }));
  return { particles, cxB, cyB, den };
}

export function ScrollLogo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { particles, cxB, cyB, den } = samplePoints();
    const logo = new Path2D(LOGO_PATH);
    let vw = 0;
    let vh = 0;
    let dpr = 1;
    let layers: { body: HTMLCanvasElement; shine: CanvasRenderingContext2D } | null = null;

    const placeLogo = (c: CanvasRenderingContext2D, cx: number, cy: number, logoSize: number) => {
      const k = logoSize / den;
      c.translate(cx, cy);
      c.scale(k, k);
      c.translate(-cxB, -cyB);
      c.scale(GRID / VIEW, GRID / VIEW);
    };

    const makeLayer = () => {
      const c = document.createElement("canvas");
      c.width = vw * dpr;
      c.height = vh * dpr;
      const g = c.getContext("2d");
      if (!g) return null;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      return g;
    };

    const buildLayers = () => {
      const cx = vw / 2;
      const cy = vh / 2;
      const logoSize = Math.min(vw * 0.6, vh * 0.78);
      const bg = makeLayer();
      const sg = makeLayer();
      if (!bg || !sg) return;

      bg.save();
      placeLogo(bg, cx, cy, logoSize);
      const body = bg.createLinearGradient(0, 30, 0, 130);
      body.addColorStop(0, "#ffffff");
      body.addColorStop(0.5, "#a5f3fc");
      body.addColorStop(1, "#818cf8");
      bg.shadowColor = "rgba(103, 232, 249, 0.75)";
      bg.shadowBlur = 36;
      bg.fillStyle = body;
      bg.fill(logo);
      bg.shadowBlur = 0;
      bg.save();
      bg.clip(logo);
      bg.fillStyle = "rgba(8, 12, 24, 0.22)";
      for (let y = 0; y < VIEW; y += 3) bg.fillRect(-10, y, VIEW + 20, 1);
      bg.restore();
      bg.restore();

      layers = { body: bg.canvas, shine: sg };
    };

    // Calibragem de DPR: no mobile/touch o canvas de tela cheia é limitado a 1.5x
    // (partículas de 2px — diferença imperceptível, ~44% menos pixels por frame em telas 2x).
    const coarse = window.matchMedia("(pointer: coarse)");
    const maxDpr = () => (window.innerWidth < 768 || coarse.matches ? 1.5 : 2);

    const resize = () => {
      const nextDpr = Math.min(window.devicePixelRatio || 1, maxDpr());
      // No mobile a barra de endereço dispara resize ao rolar; realocar o bitmap
      // e recalcular as camadas sem mudança real de tamanho era trabalho perdido.
      if (nextDpr === dpr && window.innerWidth === vw && window.innerHeight === vh) return;
      dpr = nextDpr;
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.forEach((q) => (q.primed = false));
      layers = null;
    };
    resize();

    const mouse = { x: -9999, y: -9999 };
    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let resizeFrame = 0;
    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
        scrollDirty = true;
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    let p = 0;
    const updateScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - vh);
      p = Math.min(1, Math.max(0, -rect.top / range));
    };
    // O scroll só marca "sujo"; a leitura de layout acontece 1x por frame no loop
    // (antes: getBoundingClientRect + offsetHeight a cada evento de scroll).
    let scrollDirty = true;
    const onScroll = () => {
      scrollDirty = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    const t0 = performance.now();
    let raf = 0;
    // Fora da viewport o loop é parado de fato e retomado ao reentrar.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        updateScrollProgress();
        if (!raf) raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (scrollDirty) {
        scrollDirty = false;
        updateScrollProgress();
      }
      const t = (now - t0) / 1000;

      const gather = smoothstep(0.0, 0.2, p);
      const split = smoothstep(0.2, 0.45, p);
      const form = smoothstep(0.45, 0.75, p);
      const finish = smoothstep(0.72, 0.95, p);

      const cx = vw / 2;
      const cy = vh / 2;
      const logoSize = Math.min(vw * 0.6, vh * 0.78);
      const bridgeHalf = Math.min(vw * 0.46, 760);

      ctx.clearRect(0, 0, vw, vh);

      for (const q of particles) {
        const scatterX = cx + (q.seed - 0.5) * vw * 0.9;
        const scatterY = cy + (q.seed2 - 0.5) * vh * 0.9;

        const gatherX = cx + q.ux * 40;
        const gatherY = cy + q.uy * 40;

        const gx = scatterX + (gatherX - scatterX) * gather;
        const gy = scatterY + (gatherY - scatterY) * gather;

        const bridgeX = cx + q.ux * 2 * bridgeHalf;
        const bridgeY = cy + q.uy * 30 + Math.sin(q.ux * Math.PI * 2 + t * 0.8) * 14;
        const sx = gx + (bridgeX - gx) * split;
        const sy = gy + (bridgeY - gy) * split;

        const logoX = cx + q.ux * logoSize;
        const logoY = cy + q.uy * logoSize;
        const tx = sx + (logoX - sx) * form;
        const ty = sy + (logoY - sy) * form;

        if (!q.primed) {
          q.x = tx;
          q.y = ty;
          q.primed = true;
        } else {
          const k = 0.04 + 0.06 * q.seed2;
          q.vx += (tx - q.x) * k;
          q.vy += (ty - q.y) * k;

          const dx = q.x - mouse.x;
          const dy = q.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = 1 - d / REPEL_RADIUS;
            q.vx += (dx / d) * REPEL_FORCE * f * f;
            q.vy += (dy / d) * REPEL_FORCE * f * f;
          }

          q.vx *= 0.86;
          q.vy *= 0.86;
          q.x += q.vx;
          q.y += q.vy;
        }

        const near = Math.max(0, 1 - Math.sqrt((q.x - mouse.x) ** 2 + (q.y - mouse.y) ** 2) / REPEL_RADIUS);
        ctx.globalAlpha = Math.min(1, 0.55 + 0.25 * Math.sin(t * 2 + q.seed * 6.28) + near * 0.5 + finish * 0.45);
        ctx.fillStyle = near > 0.3 || q.seed > 0.88 ? "#67e8f9" : "#ffffff";
        const size = 2 + near * 1.5;
        ctx.fillRect(q.x, q.y, size, size);
      }
      ctx.globalAlpha = 1;

      if (finish > 0) {
        if (!layers) buildLayers();
        if (layers) {
          const sg = layers.shine;
          const sc = sg.canvas;
          sg.setTransform(1, 0, 0, 1, 0, 0);
          sg.clearRect(0, 0, sc.width, sc.height);
          sg.setTransform(dpr, 0, 0, dpr, 0, 0);
          placeLogo(sg, cx, cy, logoSize);
          const sweep = -80 + ((t * 0.16) % 1.5) * 260;
          const shine = sg.createLinearGradient(sweep, 0, sweep + 70, 0);
          shine.addColorStop(0, "rgba(255,255,255,0)");
          shine.addColorStop(0.5, "rgba(255,255,255,0.9)");
          shine.addColorStop(1, "rgba(255,255,255,0)");
          sg.fillStyle = shine;
          sg.fillRect(-10, -10, VIEW + 20, VIEW + 20);
          sg.globalCompositeOperation = "destination-in";
          sg.fillStyle = "#000";
          sg.fill(logo);
          sg.globalCompositeOperation = "source-over";

          ctx.save();
          ctx.globalAlpha = finish * 0.92;
          ctx.drawImage(layers.body, 0, 0, vw, vh);
          ctx.drawImage(sc, 0, 0, vw, vh);
          ctx.restore();
        }
      }
    };

    raf = requestAnimationFrame(frame);
    io.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeFrame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      style={{ position: "relative", width: "100%", height: "420vh" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
      </div>
    </div>
  );
}
