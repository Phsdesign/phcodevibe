"use client";

import { useState, useEffect, useRef } from "react";

const skills = [
  "MOTION DESIGN", "VFX ARTIST", "WEB DESIGN", "IDENTIDADE VISUAL", 
  "BRANDING", "3D MODELING", "AI EXPLORER", "UI/UX DESIGN",
  "GIT WORKFLOW", "VERCEL DEPLOY"
];

/* ─── High Density Neural Canvas (IA Card) ─── */
function NeuralCanvas({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 120;
    const connectionDistance = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = isHovered ? "255, 255, 255" : "0, 0, 0";
      const opacity = isHovered ? 0.4 : 0.1;

      particles.forEach((p1, i) => {
        p1.x += p1.vx; p1.y += p1.vy;
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.beginPath(); ctx.arc(p1.x, p1.y, 1.5, 0, Math.PI * 2); ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x; const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.strokeStyle = `rgba(${color}, ${(1 - dist / connectionDistance) * opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize(); draw();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", resize); };
  }, [isHovered]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", opacity: 0.8 }} />;
}

/* ─── Individual Letter Animation Component ─── */
function AnimatedLetter({ char, index }: { char: string, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  if (char === " ") return <span style={{ width: "0.4em" }}>&nbsp;</span>;

  return (
    <span 
      className={`animated-char ${isHovered ? "char-active" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transitionDelay: `${isHovered ? 0 : index * 0.02}s`
      }}
    >
      {char}
    </span>
  );
}

/* ─── Background Flow Canvas ─── */
function FlowCanvas({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speed: number; angle: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: 0.5 + Math.random() * 1,
        angle: Math.random() * Math.PI * 2
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = isHovered ? "0, 0, 0" : "0, 0, 0";
      const opacity = isHovered ? 0.15 : 0.05;

      particles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize(); draw();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", resize); };
  }, [isHovered]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

export function FeaturesAI() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const firstName = "PEDRO HENRIQUE".split("");
  const lastName = "SILVA".split("");

  return (
    <section id="features" className="features-section">
      <div className="container" style={{ maxWidth: "1280px" }}>

        {/* Header Artístico: Tipografia Fluida */}
        <div className="name-header-v4">
          <div className="badge-wrap">
            <div className="orbai-badge">
              <span className="dot-blink" />
              <span>ESTRATEGISTA DIGITAL</span>
            </div>
          </div>
          
          <div className="name-container">
            <FlowCanvas isHovered={hoveredCard === 0} />
            <div 
              className="name-line"
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {firstName.map((c, i) => <AnimatedLetter key={i} char={c} index={i} />)}
            </div>
            <div 
              className="name-line outline-row"
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {lastName.map((c, i) => <AnimatedLetter key={i + 20} char={c} index={i + 15} />)}
            </div>
          </div>
          
          <div className="name-details">
            <div className="status-progress-track">
              <div className="status-progress-fill" />
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="features-bento-grid">
          {/* Card 1: 9 Anos */}
          <div className="art-card" onMouseEnter={() => setHoveredCard(1)} onMouseLeave={() => setHoveredCard(null)}>
            <div className="art-visual">
              <div className="journey-bg-text">09</div>
              <div className="journey-label-new">ANOS DE EVOLUÇÃO</div>
            </div>
            <div className="art-content">
              <h3>Minha Jornada</h3>
              <p>São mais de 9 anos refinando meu olhar. Comecei no design puro e hoje transformo pixels em autoridade digital.</p>
            </div>
          </div>

          {/* Card 2: IA */}
          <div className="art-card" onMouseEnter={() => setHoveredCard(2)} onMouseLeave={() => setHoveredCard(null)}>
            <div className="art-visual" style={{ background: hoveredCard === 2 ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)", borderRadius: "20px" }}>
              <NeuralCanvas isHovered={hoveredCard === 2} />
              <div className="neural-center-icon"><div className="core-dot" /></div>
            </div>
            <div className="art-content">
              <h3>Fascínio por IA</h3>
              <p>Sempre fui apaixonado por tecnologia. Estudo e aplico Inteligência Artificial para potencializar resultados criativos.</p>
            </div>
          </div>

          {/* Card 3: Autodidata */}
          <div className="art-card" onMouseEnter={() => setHoveredCard(3)} onMouseLeave={() => setHoveredCard(null)}>
            <div className="art-visual"><div className="wireframe-cube">{[...Array(6)].map((_, i) => <div key={i} className="side" />)}</div></div>
            <div className="art-content">
              <h3>Espírito Autodidata</h3>
              <p>Aprendi tudo na raça. Resolvo problemas complexos e crio projetos de ponta a ponta com agilidade absoluta.</p>
            </div>
          </div>

          {/* Card 4: Visão 360° */}
          <div className="art-card" onMouseEnter={() => setHoveredCard(4)} onMouseLeave={() => setHoveredCard(null)}>
            <div className="art-visual vertical-marquee-container">
              <div className="marquee-v-mask-top" /><div className="marquee-v-scroll">{[...skills, ...skills].map((skill, i) => <div key={i} className="v-skill-item">{skill}</div>)}</div><div className="marquee-v-mask-bottom" />
            </div>
            <div className="art-content">
              <h3>Visão Multidisciplinar</h3>
              <p>Vim do Motion e do VFX, e trouxe esse olhar cinematográfico para o desenvolvimento de experiências web.</p>
            </div>
          </div>

          {/* Card 5: Engenharia Própria (WIDE) */}
          <div className="art-card card-wide-horizontal" onMouseEnter={() => setHoveredCard(5)} onMouseLeave={() => setHoveredCard(null)}>
            <div className="art-content-side">
              <h3>Engenharia Própria</h3>
              <p>Seu site nasce com engenharia de ponta: o código é guardado em um cofre digital (GitHub) e distribuído globalmente pelas nuvens mais rápidas do mundo (Vercel ou Cloudflare). Isso garante que ele esteja sempre online e carregue instantaneamente para qualquer pessoa.</p>
              <div className="engine-status-tag"><span className="dot-pulse" />INFRAESTRUTURA GLOBAL ATIVA</div>
            </div>
            <div className="art-visual-side" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .features-section { padding: 10rem 0; background: #ffffff; }

        /* NAME HEADER V4 - FLUID & COMPACT */
        .name-header-v4 { margin-bottom: 8rem; text-align: center; position: relative; }
        .badge-wrap { display: flex; justify-content: center; margin-bottom: 2rem; }
        
        .name-container {
          position: relative; padding: 2rem 0; display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
        }
        
        .name-line {
          font-family: var(--font-display); font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 800; line-height: 1; letter-spacing: -0.02em;
          display: flex; position: relative; z-index: 2;
        }
        .outline-row {
          color: transparent; -webkit-text-stroke: 1px rgba(0,0,0,0.2);
        }

        .animated-char {
          display: inline-block; color: inherit;
          animation: letterFloat 4s ease-in-out infinite alternate;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animated-char:hover {
          color: #000; -webkit-text-stroke-width: 0;
          transform: translateY(-10px) scale(1.2) rotate(5deg);
          text-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        @keyframes letterFloat {
          from { transform: translateY(0); }
          to { transform: translateY(-6px); }
        }

        .name-details { 
          display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 2rem; 
          opacity: 0.4;
        }
        .detail-tag { font-family: monospace; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.3em; }
        
        .status-progress-track { width: 120px; height: 2px; background: rgba(0,0,0,0.05); overflow: hidden; position: relative; }
        .status-progress-fill { 
          width: 40%; height: 100%; background: #000; 
          position: absolute; left: 0; top: 0;
          animation: progressMove 3s ease-in-out infinite alternate; 
        }
        @keyframes progressMove { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }

        /* BENTO CARDS */
        .features-bento-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 4rem; }
        .art-card {
          background: #ffffff; border: 1.5px solid rgba(0,0,0,0.08); border-radius: 40px; padding: 3.5rem;
          display: flex; flex-direction: column; gap: 2.5rem; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden; position: relative; cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.08);
        }
        .art-card:hover { background: #000; transform: translateY(-12px) scale(1.01); border-color: rgba(255,255,255,0.2); box-shadow: 0 30px 60px -15px rgba(0,0,0,0.4); }
        .art-card:hover h3 { color: #fff; }
        .art-card:hover p { color: rgba(255,255,255,0.5); }

        .art-visual { height: 220px; position: relative; display: flex; align-items: center; justify-content: center; }
        .journey-bg-text { font-size: 12rem; font-weight: 900; color: #000; opacity: 0.03; position: absolute; transition: all 0.6s ease; }
        .art-card:hover .journey-bg-text { color: #fff; opacity: 0.1; }
        .journey-label-new { font-size: 1rem; font-weight: 800; letter-spacing: 0.4em; color: #000; z-index: 2; transition: all 0.6s ease; }
        .art-card:hover .journey-label-new { color: #fff; }
        .core-dot { width: 8px; height: 8px; background: #000; border-radius: 50%; transition: all 0.6s ease; }
        .art-card:hover .core-dot { background: #fff; box-shadow: 0 0 20px #fff; transform: scale(1.5); }
        .card-wide-horizontal { grid-column: span 2; flex-direction: row; align-items: center; justify-content: space-between; gap: 4rem; }
        .art-content-side { flex: 1.3; }
        .art-content-side h3 { font-size: 2.5rem; font-weight: 700; color: #000; margin-bottom: 1.5rem; transition: all 0.6s ease; }
        .art-content-side p { font-size: 1.125rem; line-height: 1.7; color: rgba(0,0,0,0.5); transition: all 0.6s ease; }
        .engine-status-tag { display: inline-flex; align-items: center; gap: 10px; margin-top: 2.5rem; padding: 8px 16px; border-radius: 8px; background: rgba(0,0,0,0.04); font-family: monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; transition: all 0.6s ease; }
        .art-card:hover .engine-status-tag { background: rgba(255,255,255,0.1); color: #fff; }
        .dot-pulse { width: 6px; height: 6px; background: #000; border-radius: 50%; animation: pulse-node 2s infinite; }
        .art-card:hover .dot-pulse { background: #fff; }
        .wireframe-cube { width: 80px; height: 80px; position: relative; transform-style: preserve-3d; animation: rotate-cube 10s linear infinite; }
        .side { position: absolute; width: 80px; height: 80px; border: 1px solid rgba(0,0,0,0.1); transition: all 0.6s ease; }
        .art-card:hover .side { border-color: rgba(255,255,255,0.4); }
        .side:nth-child(1) { transform: translateZ(40px); } .side:nth-child(2) { transform: rotateY(180deg) translateZ(40px); } .side:nth-child(3) { transform: rotateY(90deg) translateZ(40px); } .side:nth-child(4) { transform: rotateY(-90deg) translateZ(40px); } .side:nth-child(5) { transform: rotateX(90deg) translateZ(40px); } .side:nth-child(6) { transform: rotateX(-90deg) translateZ(40px); }
        @keyframes rotate-cube { from { transform: rotateX(0) rotateY(0); } to { transform: rotateX(360deg) rotateY(360deg); } }
        .vertical-marquee-container { width: 100%; height: 200px; overflow: hidden; position: relative; }
        .marquee-v-scroll { display: flex; flex-direction: column; gap: 12px; animation: scroll-up 25s linear infinite; }
        .v-skill-item { padding: 14px; background: transparent; border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; font-weight: 800; font-size: 0.7rem; letter-spacing: 0.3em; color: rgba(0,0,0,0.3); text-align: center; transition: all 0.4s ease; }
        .art-card:hover .v-skill-item { color: rgba(255,255,255,0.4); border-color: rgba(255,255,255,0.1); }
        @keyframes scroll-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }

        .art-content h3 { font-size: 1.75rem; font-weight: 700; color: #000; margin-bottom: 1rem; transition: all 0.6s ease; }
        .art-content p { font-size: 1rem; line-height: 1.7; color: rgba(0,0,0,0.5); transition: all 0.6s ease; max-width: 400px; }

        @media (max-width: 768px) {
          .features-bento-grid { 
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important; 
          }
          .art-card { 
            width: 100% !important;
            padding: 2rem 1.5rem !important; 
            border-radius: 24px !important;
            min-height: auto !important;
          }
          .card-wide-horizontal { 
            flex-direction: column !important; 
            padding: 2rem 1.5rem !important; 
            gap: 2rem !important; 
          }
          .art-content-side h3 { font-size: 1.75rem !important; }
          .name-line { font-size: 1.8rem !important; flex-wrap: wrap !important; justify-content: center !important; }
          .art-visual { height: 140px !important; }
          .journey-bg-text { font-size: 7rem !important; }
        }
      `}</style>
    </section>
  );
}
