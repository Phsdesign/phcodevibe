"use client";

import { useState, useEffect } from "react";

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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(timer);
    };
  }, []);

  return (
    <section id="features" style={{ background: "#ffffff", padding: isMobile ? "3rem 0" : "8rem 0", width: "100%", overflow: "visible" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-block", background: "#000", color: "#fff", padding: "8px 20px", borderRadius: "100px", fontSize: "10px", fontWeight: "800", marginBottom: "1.5rem" }}>
            ESTRATEGISTA DE MARCAS & CRESCIMENTO DIGITAL
          </div>
          <h2 style={{ fontSize: isMobile ? "2.5rem" : "5rem", fontWeight: "900", color: "#000", lineHeight: "1.1", margin: 0 }}>
            Domine o seu Mercado.
          </h2>
        </div>

        {/* CARDS PRINCIPAIS */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
          <div style={{ background: "#f8f8f8", padding: "2rem", borderRadius: "24px", border: "1px solid #eee" }}>
            <span style={{ fontSize: "2rem", fontWeight: "900", color: "#ddd", display: "block", marginBottom: "1rem" }}>{SLIDES[currentSlide].index}</span>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#000", marginBottom: "1rem" }}>{SLIDES[currentSlide].title}</h3>
            <p style={{ fontSize: "1rem", color: "#666", lineHeight: "1.5" }}>{SLIDES[currentSlide].desc}</p>
          </div>

          <div style={{ background: "#111", padding: "2rem", borderRadius: "24px", color: "#fff" }}>
            <span style={{ fontSize: "2rem", fontWeight: "900", color: "#333", display: "block", marginBottom: "1rem" }}>02</span>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", marginBottom: "1rem" }}>Estrutura Indestrutível</h3>
            <p style={{ fontSize: "1rem", color: "#aaa", lineHeight: "1.5" }}>Sites rápidos e seguros. Sua marca preparada para vender 24h por dia no Google.</p>
          </div>
        </div>

        {/* PROCESSO — AQUI ESTÁ O TEXTO FORÇADO EM BRANCO */}
        <div style={{ 
          background: "#000", 
          padding: isMobile ? "3rem 2rem" : "60px", 
          borderRadius: "32px", 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          justifyContent: "space-between", 
          gap: isMobile ? "40px" : "20px",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: "10px", fontWeight: "900", color: "#fff", opacity: 0.4, display: "block", marginBottom: "10px" }}>01</span>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff", marginBottom: "10px", display: "block" }}>IMERSÃO</h4>
            <p style={{ fontSize: "0.9rem", color: "#cccccc", lineHeight: "1.6", margin: 0, display: "block" }}>Analisamos seu mercado para encontrar a brecha onde sua marca pode dominar.</p>
          </div>
          
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: "10px", fontWeight: "900", color: "#fff", opacity: 0.4, display: "block", marginBottom: "10px" }}>02</span>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff", marginBottom: "10px", display: "block" }}>ARQUITETURA</h4>
            <p style={{ fontSize: "0.9rem", color: "#cccccc", lineHeight: "1.6", margin: 0, display: "block" }}>Construímos a estética de elite e a estrutura técnica que seus clientes amam.</p>
          </div>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: "10px", fontWeight: "900", color: "#fff", opacity: 0.4, display: "block", marginBottom: "10px" }}>03</span>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff", marginBottom: "10px", display: "block" }}>DOMÍNIO</h4>
            <p style={{ fontSize: "0.9rem", color: "#cccccc", lineHeight: "1.6", margin: 0, display: "block" }}>Lançamos sua nova presença digital configurada para converter e escalar.</p>
          </div>
        </div>

        {/* MANIFESTO */}
        <div style={{ textAlign: "center", padding: "4rem 0", marginTop: "2rem" }}>
          <span style={{ fontSize: "10px", fontWeight: "900", color: "#999", letterSpacing: "0.3em" }}>NOSSA FILOSOFIA</span>
          <blockquote style={{ fontSize: isMobile ? "1.4rem" : "2.5rem", fontWeight: "400", fontStyle: "italic", margin: "2rem auto", color: "#000", maxWidth: "800px", lineHeight: "1.4" }}>
            "Um site bonito atrai o olhar, mas um site estratégico atrai o dinheiro."
          </blockquote>
          <div style={{ fontSize: "1rem", color: "#000" }}>
            <strong>Pedro Henrique Silva</strong><br />
            <span style={{ color: "#666" }}>Fundador @ PH Code Vibe</span>
          </div>
        </div>

      </div>
    </section>
  );
}
