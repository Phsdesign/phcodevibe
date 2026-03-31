"use client";
import Image from "next/image";

/**
 * Marquee — Performance-optimized version
 * 
 * REMOVED: onMouseMove per card (24 event listeners), 4x duplication, inset box-shadow
 * REPLACED WITH: 2x duplication (minimum for seamless loop), pure CSS animation, no JS events
 */

const clientLogos = [
  { src: "/logos/2.png" },
  { src: "/logos/Ces_Sistemas branco - Oficial.png" },
  { src: "/logos/Elleganza-Branco.png" },
  { src: "/logos/LOGO3.png" },
  { src: "/logos/Logo-PH-6.png" },
  { src: "/logos/Marca_04_branca.png" },
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
  // Increased duplication to 4x to ensure seamless loop on large screens
  const repeatedLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];
  const repeatedTags = [...benefitTags, ...benefitTags, ...benefitTags, ...benefitTags];

  return (
    <section className="marquee-section animate-on-scroll">
      {/* Label */}
      <div className="marquee-label">
        Nossas Conexões & Parcerias
      </div>

      {/* Logo Marquee */}
      <div className="marquee-track">
        <div className="marquee-scroll marquee-logos">
          {repeatedLogos.map((logo, i) => (
            <div key={i} className="marquee-logo-card">
              <div className="marquee-logo-inner">
                <Image
                  src={logo.src}
                  alt={`Client Logo ${i}`}
                  fill
                  sizes="128px"
                  loading="eager"
                  priority={i < 12}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefit Tags Marquee */}
      <div className="marquee-track">
        <div className="marquee-scroll marquee-tags">
          {repeatedTags.map((tag, i) => (
            <div key={i} className="marquee-tag">
              {tag}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
