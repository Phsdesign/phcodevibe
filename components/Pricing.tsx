"use client";

import { useState, useEffect } from "react";
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
    price: "5.000+",
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

const websitePlans = [
  {
    name: "Site Start",
    price: "4.800",
    desc: "A base sólida para empresas que precisam de presença digital profissional e elegante.",
    features: [
      "Até 4 Páginas Exclusivas",
      "Design Minimalista e Premium",
      "Desenvolvimento High-End",
      "Otimização de Performance",
      "Integração com WhatsApp e E-mail",
    ],
  },
  {
    name: "Custom & Saas",
    price: "15.000+",
    desc: "Engenharia digital sob medida para ecossistemas complexos e softwares.",
    features: [
      "Páginas e Fluxos Ilimitados",
      "Painel de Controle Customizado",
      "Integração com APIs e Gateways",
      "Segurança Bancária e Criptografia",
      "Consultoria de Negócios e UX",
    ],
  },
  {
    name: "Site Elite",
    price: "8.500",
    desc: "Autoridade máxima e experiência imersiva para marcas líderes de mercado.",
    features: [
      "Até 10 Páginas Personalizadas",
      "Motion Design Avançado",
      "Blog Integrado com CMS",
      "SEO Avançado (Arquitetura)",
      "Copywriting Estratégico Incluso",
    ],
  },
];

export function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredWebIndex, setHoveredWebIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="precos" style={{ padding: "10rem 0", width: "100%", background: "var(--bg)", overflow: isMobile ? "visible" : "hidden" }}>
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
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        
        .premium-card-glass {
          background: var(--bg-card);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--border-color);
          border-radius: 40px;
          position: relative;
          z-index: 2;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-lg);
        }

        .cta-premium-glass {
          background: var(--text-primary);
          color: var(--bg);
          padding: 1.6rem 4.5rem;
          border-radius: 100px;
          font-weight: 900;
          font-size: 1rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--text-primary);
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
          color: var(--text-primary);
          border-color: var(--text-primary);
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 30px 60px var(--accent-glow);
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
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "100px",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.25em",
                color: "var(--text-primary)",
                animation: "availability-glow 3s infinite ease-in-out",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{ width: "8px", height: "8px", background: "var(--accent)", borderRadius: "50%", boxShadow: "0 0 10px var(--accent)" }} />
                DISPONIBILIDADE LIMITADA: MARÇO 2026
              </div>
            </div>

            <h2 style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)", 
              color: "var(--text-primary)", 
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
                animation: "chrome-shine 8s infinite linear",
                backgroundSize: "500% auto",
                fontWeight: 950,
              }}>
                AUTORIDADE.
              </span>
            </h2>
            <p style={{ color: "var(--text-primary)", opacity: 0.5, fontSize: "1.2rem", marginBottom: "5rem", fontWeight: 500, letterSpacing: "0.03em", maxWidth: "600px", margin: "0 auto 5rem" }}>
              Oferta exclusiva de lançamento: Design de elite para marcas que buscam o topo absoluto.
            </p>

            <div style={{ marginBottom: "6rem" }}>
              <div style={{ opacity: 0.25, fontSize: "1.6rem", fontWeight: 800, textDecoration: "line-through", color: "var(--text-primary)", marginBottom: "0.5rem", letterSpacing: "0.15em" }}>
                R$ 1.500
              </div>
              <div style={{ fontSize: "clamp(5.5rem, 14vw, 10rem)", fontWeight: 900, lineHeight: 0.8, letterSpacing: "-0.06em", color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                <span style={{ fontSize: "2rem", verticalAlign: "top", marginRight: "12px", opacity: 0.4, fontWeight: 800 }}>R$</span>
                997
              </div>
              <div style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.3em", marginTop: "1rem", opacity: 0.6 }}>
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
                  <div style={{ width: "6px", height: "6px", background: "var(--text-primary)", borderRadius: "1px", opacity: 0.5, transform: "rotate(45deg)" }} />
                  <span style={{ fontSize: "0.95rem", color: "var(--text-primary)", opacity: 0.7, fontWeight: 600 }}>{item}</span>
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
        <div style={{ textAlign: "center", marginBottom: "6rem" }}>
          <div style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "rgba(0,0,0,0.03)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "100px",
            color: "var(--text-primary)",
            fontSize: "0.75rem",
            fontWeight: 900,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
          }}>
            Investimentos em Landing Pages
          </div>
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
                  background: isCenter ? "var(--text-primary)" : "var(--bg)",
                  color: isCenter ? "var(--bg)" : "var(--text-primary)",
                  borderRadius: "40px",
                  padding: isMobile ? "3rem 1.5rem" : "4.5rem 2.8rem",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isHovered && !isMobile ? "translateY(-15px) scale(1.02)" : "none",
                  boxShadow: isHovered && !isMobile
                    ? "var(--shadow-lg)"
                    : "var(--shadow-sm)",
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
                      color: "inherit",
                      opacity: 0.5 
                    }}>
                    {p.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1.2rem" }}>
                    <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "inherit", opacity: 0.4 }}>R$</span>
                    <p style={{ fontSize: "3.8rem", fontWeight: 900, letterSpacing: "-0.04em", color: "inherit", fontFamily: "var(--font-display)", lineHeight: 1 }}>{p.price}</p>
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
                      background: isCenter ? "var(--bg)" : "var(--text-primary)",
                      color: isCenter ? "var(--text-primary)" : "var(--bg)",
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
        {/* Website Creation Plans Section */}
        <div style={{ textAlign: "center", marginBottom: "6rem", marginTop: "10rem" }}>
          <div style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "rgba(0,0,0,0.03)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "100px",
            color: "var(--text-primary)",
            fontSize: "0.75rem",
            fontWeight: 900,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
          }}>
            Criação de Sites Imersivos
          </div>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", 
          gap: "2rem" 
        }}>
          {websitePlans.map((p, i) => {
            const isCenter = p.name === "Custom & Saas"; // AGORA CUSTOM & SAAS É O DESTAQUE
            const isHovered = hoveredWebIndex === i;

            return (
              <motion.div
                key={p.name}
                onMouseEnter={() => setHoveredWebIndex(i)}
                onMouseLeave={() => setHoveredWebIndex(null)}
                style={{
                  background: isCenter ? "var(--text-primary)" : "var(--bg)",
                  color: isCenter ? "var(--bg)" : "var(--text-primary)",
                  borderRadius: "40px",
                  padding: isMobile ? "3rem 1.5rem" : "4.5rem 2.8rem",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isHovered && !isMobile ? "translateY(-15px) scale(1.02)" : "none",
                  boxShadow: isHovered && !isMobile
                    ? "var(--shadow-lg)"
                    : "var(--shadow-sm)",
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
                      background: isCenter ? "var(--bg)" : "var(--text-primary)",
                      color: isCenter ? "var(--text-primary)" : "var(--bg)",
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

        {/* Work Format & Payment Section */}
        <div style={{ marginTop: isMobile ? "5rem" : "10rem", marginBottom: "2rem" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--bg-card)",
              borderRadius: isMobile ? "24px" : "40px",
              padding: isMobile ? "2.5rem 1.5rem" : "5rem",
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-lg)",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "3rem" : "4rem",
              alignItems: "center"
            }}
          >
            {/* Background Glow */}
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "-20%",
              width: "60%",
              height: "150%",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%)",
              transform: "rotate(-15deg)",
              pointerEvents: "none"
            }} />

            <div style={{ flex: "1.2", position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-block",
                padding: "8px 24px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "100px",
                color: "var(--text-primary)",
                fontSize: "0.7rem",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "2rem"
              }}>
                Transparência &amp; Segurança
              </div>
              <h3 style={{ 
                fontSize: "clamp(2rem, 8vw, 4rem)", 
                fontWeight: 900, 
                color: "var(--text-primary)",
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                marginBottom: "1.8rem",
                fontFamily: "var(--font-display), var(--font-inter), sans-serif",
                wordBreak: "break-word"
              }}>
                COMO <br/><span style={{ opacity: 0.3 }}>TRABALHAMOS</span>.
              </h3>
              <p style={{ 
                color: "var(--text-primary)", 
                opacity: 0.6,
                fontSize: "1.1rem", 
                lineHeight: 1.8, 
                maxWidth: "420px",
                fontWeight: 400,
                fontFamily: "var(--font-inter), sans-serif",
                marginBottom: "2rem"
              }}>
                Atendemos demandas para construção de <span style={{ color: "var(--text-primary)", fontWeight: 800 }}>Landing Pages</span> e <span style={{ color: "var(--text-primary)", fontWeight: 800 }}>Sites Completos</span>. Para garantir a segurança mútua, oficializamos todas as parcerias por contrato formal.
              </p>
              
              {/* Prazos Information Block */}
              <div style={{
                padding: "1.5rem",
                background: "var(--bg-secondary)",
                borderLeft: "3px solid var(--text-primary)",
                borderRadius: "0 16px 16px 0",
                maxWidth: "420px"
              }}>
                <h4 style={{ color: "var(--text-primary)", fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-inter), sans-serif", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Prazos Personalizados
                </h4>
                <p style={{ color: "var(--text-primary)", opacity: 0.5, fontSize: "0.95rem", lineHeight: 1.6, fontWeight: 400, fontFamily: "var(--font-inter), sans-serif", margin: 0 }}>
                  Não trabalhamos com "linhas de montagem". Cada projeto possui um cronograma de entrega exclusivo definido no início, garantindo tempo hábil para um nível extremo de detalhe.
                </p>
              </div>
            </div>

            <div style={{ 
              flex: "1", 
              display: "flex", 
              flexDirection: "column", 
              gap: "1.5rem",
              position: "relative",
              zIndex: 2,
              width: "100%"
            }}>
              {/* Opção 1 */}
              <div style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                padding: "2.2rem",
                borderRadius: "24px",
                backdropFilter: "blur(10px)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 15px var(--accent)", flexShrink: 0 }} />
                  <h4 style={{ color: "var(--text-primary)", fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-inter), sans-serif", margin: 0 }}>Modelo 50/50</h4>
                </div>
                <p style={{ color: "var(--text-primary)", opacity: 0.5, fontSize: "1rem", lineHeight: 1.6, fontFamily: "var(--font-inter), sans-serif", fontWeight: 400, margin: 0 }}>
                  <strong style={{color:"var(--text-primary)", fontWeight: 800}}>50%</strong> atua como start e garantia de alocação da equipe. Os <strong style={{color:"var(--text-primary)", fontWeight: 800}}>50%</strong> restantes são liberados unicamente na entrega e aprovação final.
                </p>
              </div>

              {/* Opção 2 */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "2.2rem",
                borderRadius: "24px",
                backdropFilter: "blur(10px)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "transparent", border: "2px solid rgba(255,255,255,0.4)", flexShrink: 0 }} />
                  <h4 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-inter), sans-serif", margin: 0 }}>100% Antecipado</h4>
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", lineHeight: 1.6, fontFamily: "var(--font-inter), sans-serif", fontWeight: 400, margin: 0 }}>
                  Pagamento via contrato fechado no ato. Toda cronologia e segurança de entrega são protegidas juridicamente em contrato formal.
                </p>
              </div>

              {/* Métodos de Pagamento Aceitos */}
              <div style={{ 
                display: "flex", 
                alignItems: isMobile ? "flex-start" : "center", 
                flexDirection: isMobile ? "column" : "row",
                flexWrap: "wrap",
                gap: "1.2rem", 
                marginTop: "1rem"
              }}>
                <h4 style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-inter), sans-serif", margin: 0, fontWeight: 700 }}>Pagamentos via</h4>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ 
                    padding: "0.6rem 1.5rem", 
                    background: "rgba(255,255,255,0.05)", 
                    borderRadius: "100px", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem"
                  }}>
                    PIX
                  </div>
                  <div style={{ 
                    padding: "0.6rem 1.5rem", 
                    background: "rgba(255,255,255,0.05)", 
                    borderRadius: "100px", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem"
                  }}>
                    Dinheiro
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>

  );
}
