"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const regularPlans = [
  {
    name: "Start",
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
    name: "Elite",
    price: "3.000",
    desc: "O equilíbrio perfeito entre design premium e resultados.",
    features: [
      "Tudo do plano Start",
      "Design Exclusivo (Sem Templates)",
      "Animations & Micro-interactions",
      "SEO Avançado & Performance",
    ],
  },
  {
    name: "Personalizado",
    price: "5.000 +",
    desc: "Sistemas complexos e experiências imersivas sob medida.",
    features: [
      "Tudo do plano Elite",
      "Motion Design Integrado (Lottie)",
      "Otimização Core Web Vitals",
      "Consultoria de Estratégia Digital",
    ],
  },
];

export function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="precos" style={{ padding: "10rem 0", width: "100%", background: "#ffffff", overflow: "hidden" }}>
      <style jsx global>{`
        @keyframes premium-glow {
          0%, 100% { opacity: 0.5; filter: blur(40px); }
          50% { opacity: 0.8; filter: blur(60px); }
        }
        
        .premium-card-stealth {
          background: #000;
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
          z-index: 2;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .premium-card-stealth::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%);
          pointer-events: none;
        }

        .offer-badge-minimal {
          padding: 6px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        .price-glitch {
          font-size: clamp(5rem, 12vw, 9rem);
          font-weight: 900;
          line-height: 0.8;
          letter-spacing: -0.06em;
          color: #fff;
          position: relative;
        }

        .cta-premium-stealth {
          background: #fff;
          color: #000;
          padding: 1.25rem 3.5rem;
          border-radius: 2px;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid #fff;
        }

        .cta-premium-stealth:hover {
          background: transparent;
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        @media (max-width: 768px) {
          .premium-card-stealth {
            padding: 4rem 1.5rem !important;
          }
          .price-glitch {
            font-size: 5.5rem !important;
          }
        }
      `}</style>

      <div className="container" style={{ maxWidth: "1280px" }}>
        
        {/* Main Offer Section */}
        <div style={{ position: "relative", marginBottom: "10rem" }}>
          
          {/* Decorative Glow Elements */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            background: "radial-gradient(circle, rgba(0, 112, 243, 0.08) 0%, transparent 70%)",
            animation: "premium-glow 8s infinite ease-in-out",
            pointerEvents: "none",
            zIndex: 1
          }} />

          <div 
            className="premium-card-stealth"
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              padding: "6rem 4rem",
              borderRadius: "4px",
              textAlign: "center",
              boxShadow: "0 60px 100px -30px rgba(0,0,0,0.4)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
              <div className="offer-badge-minimal">
                <span style={{ color: "#fff", marginRight: "8px" }}>●</span>
                Disponibilidade Limitada: Março 2026
              </div>
            </div>

            <h2 style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(2rem, 5vw, 4rem)", 
              color: "#fff", 
              fontWeight: 800, 
              letterSpacing: "-0.04em",
              marginBottom: "1rem" 
            }}>
              Autoridade Imediata
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "4rem", fontWeight: 500 }}>
              Design de elite para quem não aceita o comum.
            </p>

            <div style={{ marginBottom: "5rem" }}>
              <div style={{ opacity: 0.2, fontSize: "1.2rem", fontWeight: 700, textDecoration: "line-through", color: "#fff", marginBottom: "0.5rem" }}>
                R$ 1.500
              </div>
              <div className="price-glitch">
                <span style={{ fontSize: "1.5rem", verticalAlign: "top", marginRight: "10px", opacity: 0.5 }}>R$</span>
                997
              </div>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "2rem", 
              maxWidth: "800px", 
              margin: "0 auto 5rem",
              textAlign: "left"
            }}>
              {[
                "Presença Digital de Elite",
                "SEO de Alta Performance",
                "Animações Cinematográficas",
                "Infraestrutura de Nuvem",
                "Foco Total em Conversão",
                "Domínio não incluso"
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "4px", height: "4px", background: "#fff", opacity: 0.3 }} />
                  <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <a 
                href="https://wa.me/5549991031743?text=Olá!%20Gostaria%20de%20garantir%20o%20plano%20Autoridade%20Imediata%20de%20R$997.%20Busco%20exclusividade."
                className="cta-premium-stealth"
                target="_blank"
                rel="noopener noreferrer"
              >
                Garantir Exclusividade
              </a>
            </div>
          </div>
        </div>

        {/* Regular Plans Header */}
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

        {/* Regular Plans Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", 
          gap: "2rem" 
        }}>
          {regularPlans.map((p, i) => {
            const isElite = p.name === "Elite";
            return (
              <motion.div
                key={p.name}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: isElite ? "#000" : "#fff",
                  color: isElite ? "#fff" : "#0e1c29",
                  borderRadius: "2px",
                  padding: "4rem 2.5rem",
                  border: isElite ? "none" : "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3rem",
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: hoveredIndex === i ? "translateY(-8px)" : "none",
                  boxShadow: hoveredIndex === i ? "0 40px 80px -20px rgba(0,0,0,0.1)" : "0 4px 20px rgba(0,0,0,0.02)"
                }}
              >
                <div>
                  <div style={{ 
                    fontSize: "0.7rem", 
                    fontWeight: 800, 
                    textTransform: "uppercase", 
                    letterSpacing: "0.2rem", 
                    marginBottom: "1.5rem", 
                    opacity: isElite ? 0.4 : 0.3 
                  }}>
                    {p.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, opacity: 0.5 }}>R$</span>
                    <p style={{ fontSize: "3rem", fontWeight: 900, letterSpacing: "-0.04em" }}>{p.price}</p>
                  </div>
                  <p style={{ fontSize: "0.95rem", marginTop: "1.5rem", lineHeight: 1.6, opacity: 0.6 }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ height: "1px", background: isElite ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }} />

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.2rem", padding: 0, margin: 0 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.85rem", opacity: 0.7 }}>
                      <span style={{ color: isElite ? "#fff" : "#000", fontWeight: 900 }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/5549991031743?text=${encodeURIComponent(`Olá! Gostaria de detalhes sobre o investimento no plano ${p.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.2rem",
                    border: isElite ? "1px solid #fff" : "1px solid #000",
                    background: isElite ? "#fff" : "transparent",
                    color: isElite ? "#000" : "#000",
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    marginTop: "auto",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (isElite) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#fff";
                    } else {
                      e.currentTarget.style.background = "#000";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isElite) {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.color = "#000";
                    } else {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#000";
                    }
                  }}
                >
                  Consultar Projeto
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
