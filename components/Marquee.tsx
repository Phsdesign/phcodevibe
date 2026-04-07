"use client";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Marquee — Premium Bento Style for Partners
 * Mobile: CSS-only animations (zero Framer Motion overhead = scroll suave)
 * Visual: Tamanhos calibrados individualmente por logo para peso visual uniforme
 */

const clientLogos = [
  {
    src: "/logos/2.png",
    name: "Mario Amaral",
    imgStyle: { maxWidth: "80%", maxHeight: "80%" },
  },
  {
    src: "/logos/32.png",
    name: "Garen 44",
    imgStyle: { maxWidth: "100%", maxHeight: "100%", transform: "scale(2.0)" },
  },
  {
    src: "/logos/Ces_Sistemas branco - Oficial.png",
    name: "Ces Sistemas",
    imgStyle: { maxWidth: "82%", maxHeight: "55%" },
  },
  {
    src: "/logos/Elleganza-Branco.png",
    name: "Elleganza",
    imgStyle: { maxWidth: "100%", maxHeight: "100%", transform: "scale(2.2)" },
  },
  {
    src: "/logos/LOGO3.png",
    name: "Sushi Na House",
    imgStyle: { maxWidth: "100%", maxHeight: "100%", transform: "scale(1.3)" },
  },
  {
    src: "/logos/Logo-PH-6.png",
    name: "Popeloni Hub",
    imgStyle: { maxWidth: "100%", maxHeight: "100%", transform: "scale(1.7)" },
  },
  {
    src: "/logos/Marca_04_branca.png",
    name: "Braslimp",
    imgStyle: { maxWidth: "80%", maxHeight: "60%" },
  },
  {
    src: "/logos/logoazul.png",
    name: "Slap",
    imgStyle: { maxWidth: "65%", maxHeight: "65%" },
  },
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

function BenefitTag({ text }: { text: string }) {
  return (
    <span className="benefit-tag" style={{
      fontSize: "clamp(12px, 1.2vw, 13px)",
      fontWeight: 500,
      padding: "10px 22px",
      borderRadius: "100px",
      background: "#ffffff",
      border: "1px solid rgba(0,0,0,0.06)",
      color: "#4b5563", 
      boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
      display: "inline-block",
      whiteSpace: "nowrap",
      fontFamily: "var(--font-body)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      cursor: "default"
    }}>
      {text}
    </span>
  );
}

export function Marquee() {
  return (
    <section id="marquee" className="marquee-section" style={{ padding: "120px 0", background: "#ffffff" }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container" 
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
      >
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
            Nossas Conexões &amp; Parcerias
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

        {/* Logo Grid — tamanho calibrado por logo */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
          marginBottom: "6rem"
        }}>
          {clientLogos.map((logo, i) => (
            <div
              key={i}
              className="logo-card"
              style={{
                ["--delay" as string]: `${i * 0.08}s`,
                width: "min(100%, 220px)",
                height: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                background: "#000000",
                borderRadius: "32px",
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
              } as React.CSSProperties}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={200}
                height={100}
                loading="lazy"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  filter: "brightness(0) invert(1)",
                  // Aplicar o tamanho calibrado individualmente
                  ...logo.imgStyle,
                }}
              />
            </div>
          ))}
        </div>

        {/* Benefit Tags — Layout em Nuvem Estilizado */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          marginTop: "2rem"
        }}>
          {/* Top Row */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BenefitTag text={benefitTags[0]} />
          </div>
          
          {/* Mid-Top Row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <BenefitTag text={benefitTags[1]} />
            <BenefitTag text={benefitTags[2]} />
          </div>

          {/* Center Row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <BenefitTag text={benefitTags[3]} />
            <BenefitTag text={benefitTags[4]} />
          </div>

          {/* Mid-Bottom Row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <BenefitTag text={benefitTags[5]} />
            <BenefitTag text={benefitTags[6]} />
          </div>

          {/* Bottom Row */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BenefitTag text={benefitTags[7]} />
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .marquee-section {
          position: relative;
          z-index: 10;
        }

        .benefit-tag:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.06) !important;
          border-color: rgba(0,0,0,0.12) !important;
          color: #000000 !important;
        }

        /* Hover apenas em dispositivos com mouse real */
        @media (hover: hover) and (pointer: fine) {
          .logo-card {
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.35s ease;
            cursor: pointer;
          }
          .logo-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 30px 60px -15px rgba(0,0,0,0.25);
            border-color: rgba(255,255,255,0.25);
          }
        }

        @media (max-width: 768px) {
          .marquee-section {
            padding: 50px 0 !important;
          }
          .logo-card {
            width: calc(50% - 0.75rem) !important;
            height: 90px !important;
            border-radius: 20px !important;
            padding: 1rem !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
