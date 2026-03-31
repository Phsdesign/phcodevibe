"use client";

import { useState, useEffect } from "react";

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
];

export function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="precos" style={{ padding: "8rem 0", width: "100%", background: "transparent" }}>
      <style jsx global>{`
        @keyframes shimmer-blue {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-blue {
          0% { box-shadow: 0 0 0 0 rgba(0, 112, 243, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(0, 112, 243, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 112, 243, 0); }
        }
        @keyframes ray-move-blue {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes button-call {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 40px rgba(0, 112, 243, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 30px 60px rgba(0, 112, 243, 0.7); filter: brightness(1.2); }
        }
        .promo-card-exclusive-blue {
          background: linear-gradient(135deg, #000 0%, #001a33 50%, #000 100%);
          border: 2px solid #0070f3;
          animation: pulse-blue 2s infinite;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 768px) {
          .promo-card-exclusive-blue {
            padding: 3rem 1rem !important;
            border-radius: 32px !important;
          }
          .promo-card-exclusive-blue h3 {
            font-size: 1.75rem !important;
            margin-bottom: 2rem !important;
          }
          .exclusive-list-mobile {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .price-highlight-blue span:last-child {
            font-size: 4.5rem !important;
          }
          .cta-button-mobile {
            padding: 1.25rem 2rem !important;
            font-size: 1rem !important;
            width: 100% !important;
          }
        }
        .promo-card-exclusive-blue::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(0, 112, 243, 0.15), transparent);
          animation: ray-move-blue 4s infinite linear;
          pointer-events: none;
        }
        .scanline-effect {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(0, 112, 243, 0.2);
          animation: scanline 3s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .exclusive-badge-blue {
          background: linear-gradient(90deg, #0070f3, #00c2ff, #0070f3);
          background-size: 200% auto;
          animation: shimmer-blue 3s linear infinite;
          color: #fff;
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          font-weight: 900;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 0 10px 20px rgba(0, 112, 243, 0.3);
          display: flex;
          alignItems: center;
          gap: 0.5rem;
        }
        .price-highlight-blue {
          position: relative;
          color: #0070f3;
          filter: drop-shadow(0 0 15px rgba(0, 112, 243, 0.6));
        }
        .dark-premium-card {
          background: #000 !important;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
        .light-card {
          background: #ffffff !important;
          color: #0e1c29 !important;
          border: 1px solid rgba(0,0,0,0.06) !important;
        }
      `}</style>

      <div className="container" style={{ maxWidth: "1280px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div className="orbai-badge">
              <span>TABELA DE INVESTIMENTOS 2026</span>
            </div>
          </div>
          <h2 style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.05em",
              fontWeight: 800,
              color: "#0e1c29",
              lineHeight: 1,
            }}>
            Escolha o Plano Ideal
          </h2>
        </div>

        {/* PROMO CARD EXCLUSIVO AZUL REFORMULADO */}
        <div 
          className="promo-card-exclusive-blue"
          style={{
            maxWidth: "960px",
            margin: "0 auto 6rem",
            padding: "4rem 2rem",
            borderRadius: "40px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 40px 100px -20px rgba(0, 112, 243, 0.3)"
          }}
        >
          <div className="scanline-effect" />
          <div className="exclusive-badge-blue" style={{ marginBottom: "2.5rem", position: "relative", zIndex: 2 }}>
            <span style={{ width: "8px", height: "8px", background: "#ff3e3e", borderRadius: "50%", animation: "pulse 1s infinite" }} />
            OFERTA RELÂMPAGO: 2 VAGAS RESTANTES
          </div>

          <h3 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.5rem", position: "relative", zIndex: 2 }}>
            Autoridade Imediata
          </h3>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2.5rem", flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 2 }}>
            <div style={{ position: "relative" }}>
               <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>R$ 1.500</span>
               <div style={{ position: "absolute", top: "50%", left: "-10%", width: "120%", height: "2px", background: "#ff3e3e", transform: "rotate(-10deg)" }} />
            </div>
            <div className="price-highlight-blue" style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
               <span style={{ fontSize: "1.5rem", fontWeight: 800, opacity: 0.8 }}>R$</span>
               <span style={{ fontSize: "clamp(4rem, 10vw, 7rem)", fontWeight: 900, lineHeight: 1 }}>997</span>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2, marginBottom: "3rem" }}>
            <ul 
              className="exclusive-list-mobile"
              style={{ 
                listStyle: "none", 
                padding: 0, 
                margin: "0 auto", 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: "1rem",
                maxWidth: "700px",
                textAlign: "left"
              }}
            >
              {[
                "Até 5 páginas exclusivas",
                "SEO Básico (Indexação Google)",
                "Animações Essenciais",
                "Site 100% Responsivo",
                "Hospedagem Gratuita (Vercel/Cloudflare)",
                "Você paga apenas o domínio"
              ].map((item, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", color: "rgba(255,255,255,0.8)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0070f3" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="https://wa.me/5549991031743?text=Olá!%20Vi%20a%20oferta%20exclusiva%20Autoridade%20Imediata%20de%20R$997%20(5%20páginas,%20SEO,%20Hospedagem)%20e%20gostaria%20de%20garantir%20minha%20vaga."
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button-mobile"
            style={{
              background: "#0070f3",
              color: "#fff",
              padding: "1.5rem 4rem",
              borderRadius: "20px",
              fontWeight: 900,
              fontSize: "1.25rem",
              textDecoration: "none",
              boxShadow: "0 20px 40px rgba(0, 112, 243, 0.4)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              position: "relative",
              zIndex: 2,
              animation: "button-call 2s ease-in-out infinite"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 30px 60px rgba(0, 112, 243, 0.6)";
              e.currentTarget.style.background = "#00c2ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 112, 243, 0.4)";
              e.currentTarget.style.background = "#0070f3";
            }}
          >
            GARANTIR MINHA VAGA AGORA
          </a>
        </div>

        {/* Planos Padrão */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Outras Opções de Investimento</h4>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", 
          gap: "2rem" 
        }}>
          {regularPlans.map((p, i) => {
            const isMiddle = i === 1;
            return (
              <div
                key={p.name}
                className={isMiddle ? 'dark-premium-card' : 'light-card'}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  borderRadius: "32px",
                  padding: "3.5rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2.5rem",
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: hoveredIndex === i ? "translateY(-10px)" : "none",
                  boxShadow: hoveredIndex === i ? "0 40px 80px -20px rgba(0,0,0,0.15)" : "0 4px 20px rgba(0,0,0,0.02)"
                }}
              >
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.5rem", color: isMiddle ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", letterSpacing: "0.1em" }}>
                    Plano {p.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem", fontWeight: 700, color: isMiddle ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)" }}>R$</span>
                    <p style={{ fontSize: "3.5rem", fontWeight: 900, letterSpacing: "-0.04em", color: isMiddle ? "#fff" : "#0e1c29" }}>{p.price}</p>
                  </div>
                  <p style={{ fontSize: "1rem", marginTop: "1rem", lineHeight: 1.5, color: isMiddle ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}>
                    {p.desc}
                  </p>
                </div>

                <a
                  href={`https://wa.me/5549991031743?text=${encodeURIComponent(`Olá! Tenho interesse no Plano ${p.name} de R$ ${p.price}. Poderia me dar mais detalhes?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    textDecoration: "none",
                    padding: "1.2rem",
                    borderRadius: "16px",
                    background: isMiddle ? "#fff" : "#000",
                    color: isMiddle ? "#000" : "#fff",
                    fontWeight: 800,
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  Selecionar Plano
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>

                <div style={{ height: "1px", background: isMiddle ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.2rem", padding: 0, margin: 0 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "0.95rem", opacity: 0.8 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div style={{ textAlign: "center", marginTop: "6rem", opacity: 0.4 }}>
          <p style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            * Todos os valores são baseados em complexidade padrão. Orçamentos personalizados sob consulta.
          </p>
        </div>
      </div>
    </section>
  );
}
