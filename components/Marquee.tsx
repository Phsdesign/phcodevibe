"use client";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Marquee — Updated to Static Grid with Hover Effects
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
    <section id="marquee" className="marquee-section animate-on-scroll" style={{ padding: "80px 0", background: "#fcfcfc" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* Label */}
        <div style={{ 
          textAlign: "center", 
          fontSize: "12px", 
          fontWeight: 700, 
          textTransform: "uppercase", 
          letterSpacing: "0.2em", 
          color: "rgba(0,0,0,0.4)",
          marginBottom: "4rem"
        }}>
          Nossas Conexões & Parcerias
        </div>

        {/* Static Logo Grid with Hover Effects */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
          gap: "2rem",
          alignItems: "center",
          justifyItems: "center",
          marginBottom: "5rem"
        }}>
          {clientLogos.map((logo, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ 
                width: "100%",
                maxWidth: "200px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                background: "#ffffff",
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.04)",
                boxShadow: "0 4px 20px -10px rgba(0,0,0,0.05)",
                filter: "grayscale(100%) opacity(0.6)",
                cursor: "pointer",
                transition: "filter 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "grayscale(0%) opacity(1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "grayscale(100%) opacity(0.6)";
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

        {/* Benefit Tags — Still scrolling for dynamic feel, but more subtle */}
        <div className="marquee-track" style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "3rem" }}>
          <div className="marquee-scroll marquee-tags">
            {[...benefitTags, ...benefitTags].map((tag, i) => (
              <div key={i} className="marquee-tag" style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.1)", color: "rgba(0,0,0,0.6)" }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
