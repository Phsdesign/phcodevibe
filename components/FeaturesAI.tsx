"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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

const cardHoverVariants = {
  initial: { 
    backgroundColor: "var(--bg-card)", 
    color: "var(--text-primary)",
    scale: 1
  },
  hover: { 
    backgroundColor: "#ffffff", 
    color: "#0a0a0a",
    scale: 1.02,
    transition: {
      duration: 0.4,
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

export function FeaturesAI() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section id="features" style={{ 
      position: "relative", 
      background: "var(--bg)", 
      padding: isMobile ? "3rem 0" : "8rem 0", 
      width: "100%", 
      overflow: "hidden" // Ajustado para conter o vídeo
    }}>
      {/* Background Video — Optimized for Web (bg2) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.12, // Suave para manter foco no texto
          filter: "grayscale(1) contrast(1.1)",
          transform: "scaleY(-1)", // Espelhamento vertical solicitado
          pointerEvents: "none"
        }}
      >
        <source src="/bg2-optimized.mp4" type="video/mp4" />
      </video>

      {/* Premium Shadow System (Top/Bottom/Radial) */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          linear-gradient(to bottom, var(--bg) 0%, transparent 15%),
          linear-gradient(to top, var(--bg) 0%, transparent 15%),
          radial-gradient(circle at center, transparent 20%, var(--bg) 100%)
        `,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.9 // Ajuste de intensidade da sombra
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "1440px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div style={{ 
            display: "inline-block", 
            background: "var(--text-primary)", 
            color: "var(--bg)", 
            padding: "8px 20px", 
            borderRadius: "100px", 
            fontSize: "10px", 
            fontWeight: "800", 
            marginBottom: "1.5rem",
            transition: "all 0.4s ease" 
          }}>
            ESTRATEGISTA DE MARCAS & CRESCIMENTO DIGITAL
          </div>
          <h2 style={{ fontSize: isMobile ? "2.5rem" : "5rem", fontWeight: "900", color: "var(--text-primary)", lineHeight: "1.1", margin: 0 }}>
            Domine o seu Mercado.
          </h2>
        </motion.div>

        {/* CARDS PRINCIPAIS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px", marginBottom: "40px" }}
        >
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div
              variants={cardHoverVariants}
              initial="initial"
              style={{ 
                padding: "2.5rem", 
                borderRadius: "24px", 
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-sm)",
                height: "100%",
                cursor: "pointer"
              }}
            >
              <span style={{ fontSize: "2rem", fontWeight: "900", color: "inherit", opacity: 0.2, display: "block", marginBottom: "1rem" }}>{SLIDES[currentSlide].index}</span>
              <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "inherit", marginBottom: "1rem" }}>{SLIDES[currentSlide].title}</h3>
              <p style={{ fontSize: "1.05rem", color: "inherit", opacity: 0.8, lineHeight: "1.6" }}>{SLIDES[currentSlide].desc}</p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div
              variants={cardHoverVariants}
              initial="initial"
              style={{ 
                padding: "2.5rem", 
                borderRadius: "24px", 
                color: "inherit",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-sm)",
                height: "100%",
                cursor: "pointer"
              }}
            >
              <span style={{ fontSize: "2rem", fontWeight: "900", color: "inherit", opacity: 0.2, display: "block", marginBottom: "1rem" }}>02</span>
              <h3 style={{ fontSize: "1.8rem", fontWeight: "800", color: "inherit", marginBottom: "1rem" }}>Estrutura Indestrutível</h3>
              <p style={{ fontSize: "1.05rem", color: "inherit", opacity: 0.8, lineHeight: "1.6" }}>Sites rápidos e seguros. Sua marca preparada para vender 24h por dia no Google.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* PROCESSO — ENTRADA STAGGERED */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ 
            background: "#0a0a0a", 
            padding: isMobile ? "3.5rem 2rem" : "80px", 
            borderRadius: "32px", 
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? "48px" : "32px",
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid rgba(255,255,255,0.05)"
          }}
        >
          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <span style={{ fontSize: "10px", fontWeight: "900", color: "#fff", opacity: 0.4, display: "block", marginBottom: "10px" }}>01</span>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff", marginBottom: "10px", display: "block" }}>IMERSÃO</h4>
            <p style={{ fontSize: "1rem", color: "#a1a1a1", lineHeight: "1.6", margin: 0, display: "block" }}>Analisamos seu mercado para encontrar a brecha onde sua marca pode dominar.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <span style={{ fontSize: "10px", fontWeight: "900", color: "#fff", opacity: 0.4, display: "block", marginBottom: "10px" }}>02</span>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff", marginBottom: "10px", display: "block" }}>ARQUITETURA</h4>
            <p style={{ fontSize: "1rem", color: "#a1a1a1", lineHeight: "1.6", margin: 0, display: "block" }}>Construímos a estética de elite e a estrutura técnica que seus clientes amam.</p>
          </motion.div>

          <motion.div variants={itemVariants} style={{ flex: 1 }}>
            <span style={{ fontSize: "10px", fontWeight: "900", color: "#fff", opacity: 0.4, display: "block", marginBottom: "10px" }}>03</span>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff", marginBottom: "10px", display: "block" }}>DOMÍNIO</h4>
            <p style={{ fontSize: "1rem", color: "#a1a1a1", lineHeight: "1.6", margin: 0, display: "block" }}>Lançamos sua nova presença digital configurada para converter e escalar.</p>
          </motion.div>
        </motion.div>

        {/* MANIFESTO */}
        <div style={{ textAlign: "center", padding: "4rem 0", marginTop: "2rem" }}>
          <span style={{ fontSize: "10px", fontWeight: "900", color: "#999", letterSpacing: "0.3em" }}>NOSSA FILOSOFIA</span>
          <blockquote style={{ fontSize: isMobile ? "1.4rem" : "2.5rem", fontWeight: "400", fontStyle: "italic", margin: "2rem auto", color: "var(--text-primary)", maxWidth: "800px", lineHeight: "1.4" }}>
            "Um site bonito atrai o olhar, mas um site estratégico atrai o dinheiro."
          </blockquote>
          <div style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
            <strong>Pedro Henrique Silva</strong><br />
            <span style={{ color: "#666" }}>Fundador @ PH Code Vibe</span>
          </div>
        </div>

      </div>
    </section>
  );
}
