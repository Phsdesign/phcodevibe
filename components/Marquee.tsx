"use client";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Marquee — Premium Bento Style for Partners
 */

const clientLogos = [
  { src: "/logos/2.png", name: "Client 1" },
  { src: "/logos/Ces_Sistemas branco - Oficial.png", name: "Ces Sistemas" },
  { src: "/logos/Elleganza-Branco.png", name: "Elleganza" },
  { src: "/logos/LOGO3.png", name: "Client 3" },
  { src: "/logos/Logo-PH-6.png", name: "PH Logo" },
  { src: "/logos/Marca_04_branca.png", name: "Brand 4" },
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
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.1)"
              }}
              style={{ 
                width: "min(100%, 180px)",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                background: "#ffffff",
                borderRadius: "32px",
                border: "1px solid rgba(0,0,0,0.06)",
                cursor: "pointer",
                filter: "grayscale(100%) opacity(0.4)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "grayscale(0%) opacity(1)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "grayscale(100%) opacity(0.4)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="160px"
                  style={{ objectFit: "contain" }}
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
        }
      `}</style>
    </section>
  );
}
