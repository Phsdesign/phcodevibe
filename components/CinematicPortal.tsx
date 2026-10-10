"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

export function CinematicPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Configurações para Elegância e Fluidez Orgânica
    const beam = { 
      x: -1500, 
      speed: 2.5, 
      width: 1200, 
      alpha: 0
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 100; 
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity.current = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
    };

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let themeColor = "#ffffff";
    let colorReadAt = -1000;

    const draw = (time: number) => {
      if (!visible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (time - colorReadAt > 250) {
        colorReadAt = time;
        themeColor = getComputedStyle(document.documentElement)
          .getPropertyValue("--text-primary").trim() || "#ffffff";
      }
      
      scrollVelocity.current *= 0.96; 

      const speedMult = 1 + Math.abs(scrollVelocity.current * 0.1);
      beam.x += beam.speed * speedMult;
      
      if (beam.x > canvas.width + 1200) {
        beam.x = -beam.width - 400;
      }

      const centerY = canvas.height / 2;

      ctx.save();
      
      // 1. DESENHO DA FIBRA ÓPTICA LINEAR RETA
      const beamGrad = ctx.createLinearGradient(beam.x, 0, beam.x + beam.width, 0);
      beamGrad.addColorStop(0, "transparent");
      beamGrad.addColorStop(0.5, themeColor);
      beamGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.lineWidth = 0.8; // Finesse absoluta
      ctx.moveTo(beam.x, centerY);
      ctx.lineTo(beam.x + beam.width, centerY);

      ctx.strokeStyle = beamGrad;
      ctx.shadowBlur = 10; 
      ctx.shadowColor = themeColor;
      ctx.globalAlpha = 0.9 * (0.8 + Math.sin(time / 400) * 0.2); 
      ctx.stroke();

      // 2. CORE INCANDESCENTE (Núcleo de luz real)
      ctx.shadowBlur = 4;
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      // 3. PONTOS DE ENERGIA LINEARES
      for (let j = 0; j < 2; j++) {
        const pulseX = beam.x + (beam.width * (0.4 + j * 0.2)) + (Math.sin(time / 600) * 80);
        
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 15;
        ctx.globalAlpha = 0.7;
        ctx.arc(pulseX, centerY, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll);
    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      io.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100px",
        pointerEvents: "none",
        position: "absolute",
        left: 0,
        bottom: "-50px",
        zIndex: 1000,
        mixBlendMode: "screen",
        opacity: 0.9
      }}
    />
  );
}
