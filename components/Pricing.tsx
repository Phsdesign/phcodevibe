"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const regularPlans = [
  {
    name: "Plano Start",
    price: "1.500",
    desc: "O essencial para sua presença digital profissional.",
    features: [
      "Landing Page de Alta Conversão",
      "SEO Base (Indexação Google)",
      "Copywriting focado em Vendas",
      "Botão Direto para WhatsApp",
    ],
  },
  {
    name: "Plano Personalizado",
    price: "5.000 +",
    desc: "Sistemas complexos e experiências imersivas sob medida.",
    features: [
      "Tudo do plano Elite",
      "Motion Design Integrado (Lottie)",
      "Otimização Core Web Vitals",
      "Consultoria de Estratégia Digital",
    ],
  },
  {
    name: "Plano Elite",
    price: "3.000",
    desc: "O equilíbrio perfeito entre design premium e resultados.",
    features: [
      "Tudo do plano Start",
      "Design Exclusivo (Sem Templates)",
      "Animations & Micro-interactions",
      "SEO Avançado & Performance",
    ],
  },
];

export function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="precos" style={{ padding: "10rem 0", width: "100%", background: "#ffffff", overflow: "hidden" }}>
      <style jsx global>{`
        @keyframes premium-glow {
          0%, 100% { opacity: 0.4; filter: blur(40px); }
          50% { opacity: 0.6; filter: blur(60px); }
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
          0% { background-position: 0% center; }
          100% { background-position: 100% center; }
        }
        
        .premium-card-glass {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          position: relative;
          z-index: 2;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.8);
        }

        .cta-premium-glass {
          background: #ffffff;
          color: #000000;
          padding: 1.6rem 4.5rem;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid #ffffff;
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

        .cta-premium-glass:hover {
          background: transparent;
          color: #ffffff;
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 30px 60px rgba(255, 255, 255, 0.15);
          animation-play-state: paused;
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
          
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "90%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
            animation: "premium-glow 8s infinite ease-in-out",
            pointerEvents: "none",
            zIndex: 1
          }} />

          <div 
            className="premium-card-glass"
            style={{
              maxWidth: "1050px",
              margin: "0 auto",
              padding: "7rem 4rem",
              textAlign: "center",
            }}
          >
            <div style={{ display: "center", justifyContent: "center", marginBottom: "4rem" }}>
              <div style={{
                padding: "10px 24px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "100px",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.25em",
                color: "#ffffff",
                animation: "availability-glow 3s infinite ease-in-out",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{ width: "8px", height: "8px", background: "#ffffff", borderRadius: "50%", boxShadow: "0 0 10px #fff" }} />
                DISPONIBILIDADE LIMITADA: MARÇO 2026
              </div>
            </div>

            <h2 style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)", 
              color: "#fff", 
              fontWeight: 900, 
              letterSpacing: "-0.05em",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              lineHeight: 0.95
            }}>
              DOMINE COM <br/>
              <span style={{ 
                position: "relative",
                display: "inline-block",
                background: "linear-gradient(to right, #4d4d4d 0%, #ffffff 10%, #4d4d4d 20%)",
                backgroundPosition: "0",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "chrome-shine 5s infinite linear",
                backgroundSize: "500% auto",
                fontWeight: 950,
              }}>
                AUTORIDADE.
              </span>
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "1.2rem", marginBottom: "5rem", fontWeight: 500, letterSpacing: "0.03em", maxWidth: "600px", margin: "0 auto 5rem" }}>
              Oferta exclusiva de lançamento: Design de elite para marcas que buscam o topo absoluto.
            </p>

            <div style={{ marginBottom: "6rem" }}>
              <div style={{ opacity: 0.25, fontSize: "1.6rem", fontWeight: 800, textDecoration: "line-through", color: "#fff", marginBottom: "0.5rem", letterSpacing: "0.15em" }}>
                R$ 1.500
              </div>
              <div style={{ fontSize: "clamp(5.5rem, 14vw, 10rem)", fontWeight: 900, lineHeight: 0.8, letterSpacing: "-0.06em", color: "#fff", fontFamily: "var(--font-display)" }}>
                <span style={{ fontSize: "2rem", verticalAlign: "top", marginRight: "12px", opacity: 0.4, fontWeight: 800 }}>R$</span>
                997
              </div>
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.3em", marginTop: "1rem", opacity: 0.6 }}>
                CONDIÇÃO ÚNICA & LIMITADA
              </div>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
              gap: "3rem", 
              maxWidth: "900px", 
              margin: "0 auto 6rem",
              textAlign: "left"
            }}>
              {[
                "Presença Digital High-End",
                "SEO de Máxima Performance",
                "Animações de Nível Cinema",
                "Infraestrutura Global",
                "Foco em Alta Conversão",
                "Suporte Prioritário VIP"
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "6px", height: "6px", background: "#fff", borderRadius: "1px", opacity: 0.5, transform: "rotate(45deg)" }} />
                  <span style={{ fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.7)", fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <motion.a 
                href="https://wa.me/5549991031743?text=Olá!%20Gostaria%20de%20aproveitar%20a%20condição%20única%20do%20plano%20de%20R$997.%20Quero%20dominar%20meu%20mercado."
                className="cta-premium-glass"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Garantir Minha Vaga
              </motion.a>
            </div>
          </div>
        </div>

        {/* Regular Plans Section */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h3 style={{ 
            fontSize: "0.8rem", 
            fontWeight: 800, 
            letterSpacing: "0.4rem", 
            textTransform: "uppercase", 
            color: "rgba(0,0,0,0.2)",
            marginBottom: "1rem"
          }}>
            Outros Investimentos
          </h3>
          <div style={{ width: "40px", height: "2px", background: "#000", margin: "0 auto", opacity: 0.1 }} />
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", 
          gap: "2rem" 
        }}>
          {regularPlans.map((p, i) => {
            const isCenter = p.name === "Plano Personalizado";
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={p.name}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: isCenter ? "#0b0b0b" : "#ffffff",
                  color: isCenter ? "#ffffff" : "#000000",
                  borderRadius: "40px",
                  padding: "4.5rem 2.8rem",
                  border: isCenter ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isHovered ? "translateY(-15px) scale(1.02)" : "none",
                  boxShadow: isHovered 
                    ? (isCenter ? "0 50px 100px -20px rgba(0,0,0,0.5)" : "0 40px 80px -20px rgba(0,0,0,0.12)") 
                    : "0 10px 30px rgba(0,0,0,0.03)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {isCenter && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: "linear-gradient(90deg, transparent, #fff, transparent)",
                    opacity: 0.5
                  }} />
                )}

                <div style={{ marginBottom: "2.5rem", position: "relative", zIndex: 2 }}>
                  <div style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: 900, 
                    textTransform: "uppercase", 
                    letterSpacing: "0.3em", 
                    marginBottom: "1.8rem", 
                    color: isCenter ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" 
                  }}>
                    {p.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1.2rem" }}>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: isCenter ? "#fff" : "#000", opacity: 0.4 }}>R$</span>
                    <p style={{ fontSize: "3.8rem", fontWeight: 900, letterSpacing: "-0.04em", color: isCenter ? "#fff" : "#000", fontFamily: "var(--font-display)", lineHeight: 1 }}>{p.price}</p>
                  </div>
                  <p style={{ 
                    fontSize: "1rem", 
                    lineHeight: 1.6, 
                    color: isCenter ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", 
                    minHeight: "3.5rem",
                    fontWeight: 500
                  }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ position: "relative", zIndex: 2, marginBottom: "3.5rem" }}>
                  <a
                    href={`https://wa.me/5549991031743?text=${encodeURIComponent(`Olá! Gostaria de detalhes sobre o investimento no plano ${p.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine-mini"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      padding: "1.4rem",
                      borderRadius: "20px",
                      background: isCenter ? "#ffffff" : "#000000",
                      color: isCenter ? "#000000" : "#ffffff",
                      fontWeight: 900,
                      fontSize: "0.9rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: isCenter ? "0 20px 40px rgba(255,255,255,0.1)" : "0 20px 40px rgba(0,0,0,0.1)",
                      border: "none",
                    }}
                  >
                    Selecionar Plano
                    <motion.svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      animate={{ x: isHovered ? 3 : 0, y: isHovered ? -3 : 0 }}
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </motion.svg>
                  </a>
                </div>

                <div style={{ 
                  height: "1px", 
                  background: isCenter ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)", 
                  marginBottom: "2.5rem",
                  position: "relative",
                  zIndex: 2 
                }} />

                <ul style={{ 
                  listStyle: "none", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "1.4rem", 
                  padding: 0, 
                  margin: 0,
                  position: "relative",
                  zIndex: 2 
                }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "14px", 
                      fontSize: "0.9rem", 
                      color: isCenter ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                      fontWeight: 500 
                    }}>
                      <div style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: isCenter ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
