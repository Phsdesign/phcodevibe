"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const valuePillars = [
  {
    id: "01",
    title: "Autoridade Visual Absoluta",
    desc: "Não é apenas 'bonito'. É design que impõe respeito no primeiro segundo. Transformamos sua presença digital em uma declaração de poder que separa sua marca do resto do ruído.",
    details: ["Design UI/UX de Elite", "Motion Design Cinematográfico", "Identidade Visual de Impacto"],
    color: "var(--text-primary)"
  },
  {
    id: "02",
    title: "Engenharia de Performance",
    desc: "Sites que carregam antes do usuário piscar. Utilizamos infraestrutura global e código limpo para garantir que seu negócio nunca perca uma venda por lentidão ou instabilidade.",
    details: ["Deploy Global (Vercel/Cloudflare)", "Otimização Core Web Vitals", "Código Nativo de Alta Performance"],
    color: "var(--text-primary)"
  },
  {
    id: "03",
    title: "Conversão Estratégica",
    desc: "Cada pixel tem uma função: vender. Aplicamos psicologia do usuário e fluxos de navegação otimizados para transformar visitantes em clientes fiéis de forma orgânica.",
    details: ["Copywriting Persuasivo", "Funis de Vendas Integrados", "Análise de Dados e Heatmaps"],
    color: "var(--text-primary)"
  },
  {
    id: "04",
    title: "Ecossistema Inteligente",
    desc: "Integramos IA e automações que trabalham para você 24/7. Seu site deixa de ser um cartão de visitas e passa a ser uma máquina de eficiência operacional.",
    details: ["Automações com IA", "Integrações de Sistemas", "Escalabilidade Sem Limites"],
    color: "var(--text-primary)"
  }
];

export function Metrics() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <section id="metricas" style={{ padding: isDesktop ? "120px 0" : "80px 0", background: "var(--bg)", overflow: "hidden" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header Estratégico */}
        <div style={{ marginBottom: isDesktop ? "100px" : "60px", maxWidth: "800px" }}>
          <div style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--text-secondary)",
            opacity: 0.6,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "1.5rem"
          }}>
            Valor Além dos Números
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            marginBottom: "2rem"
          }}>
            Onde o valor real <br /> 
            <span style={{ color: "var(--border-color)" }}>encontra o código.</span>
          </h2>
          <p style={{ fontSize: isDesktop ? "1.25rem" : "1.1rem", color: "var(--text-secondary)", opacity: 0.8, lineHeight: 1.6, maxWidth: "600px" }}>
            Métricas são importantes, mas autoridade e escala são o que definem o jogo. Nosso método foca em 4 pilares fundamentais.
          </p>
        </div>

        {/* Novo Layout de Linhas de Valor */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {valuePillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: "relative",
                padding: isDesktop ? "60px 0" : "40px 0",
                borderTop: "1px solid var(--border-color)",
                borderBottom: index === valuePillars.length - 1 ? "1px solid var(--border-color)" : "none",
                cursor: "pointer",
                transition: "all 0.4s ease"
              }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: isDesktop ? "clamp(60px, 10vw, 120px) 1fr clamp(200px, 20vw, 300px)" : "1fr",
                gap: isDesktop ? "40px" : "20px",
                alignItems: "start",
                position: "relative",
                zIndex: 2
              }}>
                {/* ID / Número */}
                <div style={{
                  fontSize: isDesktop ? "1.5rem" : "1.2rem",
                  fontWeight: 800,
                  color: (hoveredIndex === index || !isDesktop) ? "var(--text-primary)" : "var(--border-color)",
                  transition: "color 0.4s ease",
                  fontFamily: "monospace",
                  marginBottom: isDesktop ? 0 : "0.5rem"
                }}>
                  {pillar.id}
                </div>

                {/* Conteúdo Principal */}
                <div>
                  <h3 style={{
                    fontSize: isDesktop ? "clamp(1.5rem, 3vw, 2.5rem)" : "1.75rem",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "1rem",
                    letterSpacing: "-0.02em"
                  }}>
                    {pillar.title}
                  </h3>
                  <p style={{
                    fontSize: "1.1rem",
                    color: "var(--text-secondary)",
                    opacity: 0.7,
                    lineHeight: 1.6,
                    maxWidth: "600px",
                    marginBottom: isDesktop ? 0 : "1.5rem"
                  }}>
                    {pillar.desc}
                  </p>
                </div>

                {/* Detalhes Técnicos / Pills */}
                <div style={{
                  display: "flex",
                  flexDirection: isDesktop ? "column" : "row",
                  flexWrap: "wrap",
                  gap: "12px",
                  opacity: (hoveredIndex === index || !isDesktop) ? 1 : 0.4,
                  transition: "opacity 0.4s ease",
                  justifyContent: isDesktop ? "center" : "flex-start",
                  height: "100%"
                }}>
                  {pillar.details.map((detail, dIndex) => (
                    <div key={dIndex} style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      background: "var(--bg-secondary)",
                      padding: "6px 12px",
                      borderRadius: "100px",
                      border: "1px solid var(--border-color)",
                      alignSelf: "flex-start",
                      letterSpacing: "0.05em"
                    }}>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Hover Effect */}
              <motion.div
                animate={{
                  height: hoveredIndex === index ? "100%" : "0%",
                  opacity: hoveredIndex === index ? 1 : 0
                }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, var(--bg-secondary) 0%, transparent 100%)",
                  zIndex: 1,
                  pointerEvents: "none"
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
