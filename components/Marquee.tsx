"use client";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Marquee — Premium Bento Style for Partners
 */

const clientLogos = [
  { src: "/logos/2.png", name: "Client 1" },
  { src: "/logos/32.png", name: "Client 2" },
  { src: "/logos/Ces_Sistemas branco - Oficial.png", name: "Ces Sistemas" },
  { src: "/logos/Elleganza-Branco.png", name: "Elleganza" },
  { src: "/logos/LOGO3.png", name: "Client 3" },
  { src: "/logos/Logo-PH-6.png", name: "PH Logo" },
  { src: "/logos/Marca_04_branca.png", name: "Brand 4" },
  { src: "/logos/logoazul.png", name: "Logo Azul" },
];

const benefitTags = [
  "Soluções Escaláveis",
  "Experiências Personalizadas",
  "Custo-Benefício",
  "Insights em Tempo Real",
  "Automação",
  "Decisões Baseadas em Dados",
  "Design de Elite",
  "Alta Performance",
];

export function Marquee() {
  return (
    <section id="marquee" className="marquee-section" style={{ padding: "100px 0", background: "#ffffff" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div style={{ 
            display: "inline-block",
            fontSize: "10px", 
            fontWeight: 800, 
            textTransform: "uppercase", 
            letterSpacing: "0.4em", 
            color: "rgba(0,0,0,0.25)",
            border: "1px solid rgba(0,0,0,0.05)",
            padding: "8px 24px",
            borderRadius: "100px",
            marginBottom: "1.5rem"
          }}>
            Nossas Conexões & Parcerias
          </div>
          <h2 style={{ 
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)", 
            fontWeight: 800, 
            letterSpacing: "-0.03em",
            color: "#0e1c29" 
          }}>
            Marcas que confiam na nossa vibração.
          </h2>
        </div>

        {/* Premium Bento Grid for PC / Simple Flex for Mobile */}
        <div style={{ 
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
          marginBottom: "6rem"
        }}>
          {clientLogos.map((logo, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)"
              }}
              style={{ 
                width: "min(100%, 220px)",
                height: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                background: "#000000",
                borderRadius: "32px",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={80}
                  style={{ 
                    objectFit: "contain",
                    width: "85%",
                    height: "85%",
                    filter: "brightness(0) invert(1)" // Garante que a logo fique branca se não for
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefit Tags — Subtle Animation */}
        <div style={{ 
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          opacity: 0.6
        }}>
          {benefitTags.map((tag, i) => (
            <span key={i} style={{
              fontSize: "11px",
              fontWeight: 600,
              padding: "6px 16px",
              borderRadius: "100px",
              background: "#f8f9fa",
              border: "1px solid rgba(0,0,0,0.05)",
              color: "#0e1c29"
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-section {
          position: relative;
          z-index: 10;
        }
        @media (max-width: 768px) {
          .marquee-section {
            padding: 60px 0 !important;
          }
          div[style*="width: min(100%, 220px)"] {
            width: calc(50% - 0.75rem) !important;
            height: 100px !important;
          }
        }
      `}</style>
    </section>
  );
}
