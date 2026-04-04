"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── SLIDER DATA ─── */
const SLIDES = [
  {
    index: "01",
    tags: ["DESEJO", "AUTORIDADE", "LUXO"],
    title: "Design que Gera Lucro",
    desc: "9 anos criando experiências que transformam meros visitantes em clientes apaixonados. Não fazemos apenas o 'bonito', criamos identidades que impõe respeito e justificam o seu preço."
  },
  {
    index: "02",
    tags: ["ESTRATÉGIA", "CONVERSÃO", "ELITE"],
    title: "Venda Mais Caro",
    desc: "Posicionamos sua marca no topo. Quando o seu site transparece excelência, a barreira do preço desaparece e o seu cliente entende o valor real do que você entrega."
  },
  {
    index: "03",
    tags: ["EXCLUSIVO", "ÚNICO", "IMBATÍVEL"],
    title: "Sua Marca Absolute",
    desc: "Crie um ecossistema digital onde cada pixel é planejado para prender a atenção. Transformamos seu site em seu melhor vendedor, funcionando 24h por dia."
  }
];

/* ─── Simple Smooth Card Component ─── */
function SimpleSmoothCard({ children, className = "", dark = false }: { children: React.ReactNode, className?: string, dark?: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`spotlight-card ${dark ? "dark" : ""} ${className}`}
      style={{ cursor: "default" }}
    >
      <div className="card-inner-content">
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Security Connections Animation ─── */
function SecurityConnections() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div className="security-bg">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="node"
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            background: "#27c93f",
            borderRadius: "50%",
            top: `${20 + i * 15}%`,
            left: `${30 + (i % 2) * 40}%`,
            boxShadow: "0 0 10px #27c93f",
          }}
        />
      ))}
      <style jsx>{`
        .security-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; opacity: 0.4; }
        .security-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(39, 201, 63, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(39, 201, 63, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}

/* ─── Cinematic Background Animation for Process Box ─── */
function ProcessCinematicBg() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        background: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 80%)",
        pointerEvents: "none",
        zIndex: 1
      }} />
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-10%", "10%", "-10%"],
          opacity: [0.05, 0.12, 0.05]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)",
          filter: "blur(100px)"
        }}
      />
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: ["100%", "-10%"],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear" 
          }}
          style={{
            position: "absolute",
            width: "1.5px",
            height: "1.5px",
            background: "#fff",
            borderRadius: "50%",
            filter: "blur(0.5px)"
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated HUD Lines ─── */
function HUDLines() {
  return (
    <div className="hud-overlay">
      <div className="line-h l1" />
      <div className="line-h l2" />
      <div className="line-v v1" />
      <div className="line-v v2" />
      <div className="corner c-tl" /><div className="corner c-tr" /><div className="corner c-bl" /><div className="corner c-br" />
      <style jsx>{`
        .hud-overlay { position: absolute; inset: 0; pointer-events: none; opacity: 0.15; z-index: 0; }
        .line-h { position: absolute; left: 0; width: 100%; height: 1px; background: #000; }
        .l1 { top: 20%; } .l2 { top: 80%; }
        .line-v { position: absolute; top: 0; width: 1px; height: 100%; background: #000; }
        .v1 { left: 20%; } .v2 { left: 80%; }
        .corner { position: absolute; width: 20px; height: 20px; border: 2px solid #000; }
        .c-tl { top: 40px; left: 40px; border-right: 0; border-bottom: 0; }
        .c-tr { top: 40px; right: 40px; border-left: 0; border-bottom: 0; }
        .c-bl { bottom: 40px; left: 40px; border-right: 0; border-top: 0; }
        .c-br { bottom: 40px; right: 40px; border-left: 0; border-top: 0; }
      `}</style>
    </div>
  );
}

export function FeaturesAI() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const stepVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section ref={containerRef} id="features" className="features-v3">
      <HUDLines />
      
      <div className="container" style={{ position: "relative", zIndex: 5, maxWidth: "1440px" }}>
        
        <header className="v3-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="v3-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
            </svg>
            <span>ESTRATEGISTA DE MARCAS & CRESCIMENTO DIGITAL</span>
          </motion.div>
          <h2 className="v3-title">Domine o seu <span className="outlined">Mercado.</span></h2>
        </header>

        <div className="v3-grid">
          
          <SimpleSmoothCard className="v3-card-large">
            <div className="card-header-v3">
              <AnimatePresence mode="wait">
                <motion.span key={currentSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="card-index">
                  {SLIDES[currentSlide].index}
                </motion.span>
              </AnimatePresence>
              <div className="card-tags-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div key={currentSlide} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="card-tags" style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {SLIDES[currentSlide].tags.map(tag => (
                      <span key={tag} className="tag-v3">{tag}</span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="card-body-v3">
              <AnimatePresence mode="wait">
                <motion.div key={currentSlide} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <h3 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "2rem", letterSpacing: "-0.04em" }}>{SLIDES[currentSlide].title}</h3>
                  <p style={{ fontSize: "1.2rem", lineHeight: 1.6, color: "rgba(0,0,0,0.5)", maxWidth: "500px", minHeight: "100px" }}>{SLIDES[currentSlide].desc}</p>
                </motion.div>
              </AnimatePresence>
              <div className="visual-indicator" style={{ display: "flex", gap: "10px", marginTop: "4rem" }}>
                {SLIDES.map((_, i) => (
                  <div key={i} className={`v-bar-container ${currentSlide === i ? "active" : ""}`} onClick={() => setCurrentSlide(i)} style={{ position: "relative", width: "60px", height: "4px", borderRadius: "10px", overflow: "hidden", cursor: "pointer" }}>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.05)" }} />
                    {currentSlide === i && (
                      <motion.div layoutId="activeBar" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} style={{ position: "absolute", left: 0, top: 0, height: "100%", background: "#000" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SimpleSmoothCard>

          <SimpleSmoothCard dark className="v3-card-med">
            <SecurityConnections />
            <div className="card-header-v3">
              <span className="card-index" style={{ color: "rgba(255,255,255,0.1)" }}>02</span>
              <div className="pulse-indicator">
                <div className="p-dot" /><span style={{ color: "#fff", fontSize: "9px", fontWeight: "800" }}>PROTEÇÃO ATIVA</span>
              </div>
            </div>
            <div className="card-body-v3">
              <h3 style={{ color: "#fff", fontSize: "3rem", fontWeight: 800, marginBottom: "2rem" }}>Estrutura Indestrutível</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.2rem", lineHeight: 1.6 }}>Nada de sites lentos que perdem vendas. Sua marca terá uma presença digital rápida, segura e preparada para ser encontrada no Google 24h por dia.</p>
              <div className="tech-pills">
                <div className="pill-v3">VELOCIDADE MÁXIMA</div>
                <div className="pill-v3">SEGURANÇA TOTAL</div>
                <div className="pill-v3">PRONTO PARA VENDER</div>
              </div>
            </div>
          </SimpleSmoothCard>

          <div className="v3-manifesto">
            <div className="manifesto-wrap">
              <div className="m-label">NOSSA FILOSOFIA</div>
              <blockquote>"Um site bonito atrai o olhar, mas um site estratégico atrai o dinheiro. Minha missão é garantir que sua empresa seja a escolha óbvia do seu cliente."</blockquote>
              <div className="m-author">
                <strong>Pedro Henrique Silva</strong>
                <span>Fundador @ PH Code Vibe</span>
              </div>
            </div>
          </div>

        </div>

        {/* PROCESSO ABSOLUTE */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "80px 60px",
            background: "#000",
            borderRadius: "48px",
            color: "#fff",
            marginTop: "60px",
            position: "relative",
            overflow: "hidden",
            width: "100%"
          }}
        >
          <ProcessCinematicBg />

          <motion.div variants={stepVariants} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", zIndex: 2 }}>
            <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.3, letterSpacing: "0.3em", marginBottom: "10px" }}>01</span>
            <h4 style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "serif", letterSpacing: "0.02em", marginBottom: "15px", color: "#fff" }}>IMERSÃO</h4>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "280px" }}>Analisamos seu mercado e seus concorrentes para encontrar a brecha onde sua marca pode dominar.</p>
          </motion.div>

          <motion.div variants={stepVariants} style={{ fontSize: "2rem", opacity: 0.2, padding: "0 20px", marginTop: "20px", zIndex: 2 }}>→</motion.div>

          <motion.div variants={stepVariants} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", zIndex: 2 }}>
            <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.3, letterSpacing: "0.3em", marginBottom: "10px" }}>02</span>
            <h4 style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "serif", letterSpacing: "0.02em", marginBottom: "15px", color: "#fff" }}>ARQUITETURA</h4>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "280px" }}>Construímos a estética de elite e a estrutura técnica que o Google e seus clientes amam.</p>
          </motion.div>

          <motion.div variants={stepVariants} style={{ fontSize: "2rem", opacity: 0.2, padding: "0 20px", marginTop: "20px", zIndex: 2 }}>→</motion.div>

          <motion.div variants={stepVariants} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", zIndex: 2 }}>
            <span style={{ fontSize: "10px", fontWeight: 900, opacity: 0.3, letterSpacing: "0.3em", marginBottom: "10px" }}>03</span>
            <h4 style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "serif", letterSpacing: "0.02em", marginBottom: "15px", color: "#fff" }}>DOMÍNIO</h4>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "280px" }}>Lançamos sua nova presença digital configurada para converter e escalar seu faturamento.</p>
          </motion.div>
        </motion.div>

      </div>

      <style jsx>{`
        .features-v3 { padding: 15rem 0; background: #ffffff; position: relative; overflow: hidden; }
        .v3-header { text-align: center; margin-bottom: 10rem; }
        .v3-badge {
          display: inline-flex; align-items: center; padding: 10px 20px; background: #000; border-radius: 100px;
          color: #fff; font-size: 10px; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 3rem;
        }
        .v3-title { font-size: clamp(3.5rem, 10vw, 7.5rem); font-weight: 900; line-height: 0.85; letter-spacing: -0.06em; color: #000; }
        .v3-title .outlined { color: transparent; -webkit-text-stroke: 1.5px #000; }
        .v3-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; margin-bottom: 40px; }
        :global(.spotlight-card) {
          position: relative; border-radius: 48px; padding: 5rem;
          background: #fafafa; border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden; transition: border-color 0.4s ease;
        }
        :global(.spotlight-card.dark) { background: #080808; border-color: rgba(255,255,255,0.05); }
        :global(.spotlight-card:hover) { border-color: rgba(0,0,0,0.2); }
        :global(.spotlight-card.dark:hover) { border-color: rgba(255,255,255,0.2); }
        .card-inner-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; }
        .card-header-v3 { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8rem; }
        .card-index { font-size: 5rem; font-weight: 900; color: rgba(0,0,0,0.04); line-height: 0.8; }
        .tag-v3 { padding: 6px 14px; border: 1px solid rgba(0,0,0,0.1); border-radius: 100px; font-size: 9px; font-weight: 800; letter-spacing: 0.1em; color: #000; }
        .dark .tag-v3 { border-color: rgba(255,255,255,0.1); color: #fff; }
        .pulse-indicator { display: flex; align-items: center; gap: 8px; }
        .p-dot { width: 6px; height: 6px; background: #27c93f; border-radius: 50%; box-shadow: 0 0 10px #27c93f; animation: p-pulse 2s infinite; }
        @keyframes p-pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        .tech-pills { display: flex; gap: 10px; margin-top: 4rem; }
        .pill-v3 { padding: 8px 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 9px; font-weight: 800; }
        .v3-manifesto { grid-column: span 2; padding: 8rem 0; border-top: 1px solid rgba(0,0,0,0.05); }
        .manifesto-wrap { max-width: 900px; margin: 0 auto; text-align: center; }
        .m-label { font-size: 10px; font-weight: 900; letter-spacing: 0.6em; color: rgba(0,0,0,0.2); margin-bottom: 4rem; }
        blockquote { font-size: 3rem; font-family: serif; font-style: italic; line-height: 1.2; color: #000; margin-bottom: 4rem; letter-spacing: -0.02em; }
        .m-author { display: flex; flex-direction: column; gap: 5px; }
        .m-author strong { font-size: 1.2rem; font-weight: 800; }
        .m-author span { font-size: 0.9rem; color: rgba(0,0,0,0.4); }
        @media (max-width: 1024px) {
          .v3-grid { grid-template-columns: 1fr; }
          blockquote { font-size: 2rem; }
          :global(.spotlight-card) { padding: 3rem; }
        }
      `}</style>
    </section>
  );
}
