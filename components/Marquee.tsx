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

function BenefitTag({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="benefit-tag" style={{ "--delay": `${delay}s` } as React.CSSProperties}>
      {text}
    </span>
  );
}

export function Marquee() {
  return (
    <section id="marquee" className="marquee-section" style={{ padding: "120px 0", background: "var(--bg)" }}>
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
            color: "var(--text-primary)",
            opacity: 0.3,
            border: "1px solid var(--border-color)",
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
            color: "var(--text-primary)"
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
                background: "var(--text-primary)",
                borderRadius: "32px",
                border: "1px solid var(--glass-border)",
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
                  filter: "brightness(0) invert(var(--invert-value, 1))",
                  // Aplicar o tamanho calibrado individualmente
                  ...logo.imgStyle,
                }}
              />
            </div>
          ))}
        </div>

        {/* Benefit Tags — Layout em Nuvem Estilizado */}
        <div className="benefit-tags-container">
          {benefitTags.map((tag, i) => (
             <BenefitTag key={i} text={tag} delay={i * 0.15} />
          ))}
        </div>
      </motion.div>

      <style jsx global>{`
        .marquee-section {
          position: relative;
          z-index: 10;
        }

        .benefit-tags-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin: 2rem auto 0;
          max-width: 850px;
        }

        .benefit-tag {
          font-size: clamp(13px, 1.2vw, 15px);
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 100px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          display: inline-block;
          white-space: nowrap;
          font-family: var(--font-body);
          cursor: default;
          position: relative;
          will-change: transform, opacity;
          opacity: 1; /* Garante visibilidade base */
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        /* Animação apenas se não for mobile para evitar bugs de visibilidade */
        @media (min-width: 769px) {
          .benefit-tag {
            opacity: 0;
            animation: pillEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: calc(var(--delay) + 0.3s);
          }
        }

        @keyframes pillEntrance {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }

        /* Hover apenas em dispositivos com mouse real */
        @media (hover: hover) and (pointer: fine) {

          .benefit-tag:hover {
            animation-play-state: paused;
            transform: translateY(-4px) scale(1.05) !important;
            box-shadow: var(--shadow-md) !important;
            border-color: var(--text-primary) !important;
            color: var(--bg) !important;
            background: var(--text-primary) !important;
            z-index: 2;
          }

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
          .benefit-tags-container {
            gap: 10px !important;
            padding: 0 10px;
          }
          .benefit-tag {
            padding: 10px 18px !important;
            font-size: 12px !important;
            border-radius: 50px !important;
            animation: none !important; /* Sem animação no mobile */
            transform: none !important;
            width: calc(50% - 5px); /* Grade perfeita de 2 em 2 no celular */
            text-align: center;
            white-space: normal; /* Permite quebrar linha se o texto for muito longo */
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 48px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          }
        }
      `}</style>
    </section>
  );
}
