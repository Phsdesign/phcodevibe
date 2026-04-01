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
  // Reduzido para 2x para diminuir o número de nós no DOM e melhorar performance
  const repeatedLogos = [...clientLogos, ...clientLogos];
  const repeatedTags = [...benefitTags, ...benefitTags];

  return (
    <section id="marquee" className="marquee-section animate-on-scroll">
      {/* Label */}
      <div className="marquee-label">
        Nossas Conexões & Parcerias
      </div>

      {/* Logo Marquee */}
      <div className="marquee-track">
        <div className="marquee-scroll marquee-logos">
          {repeatedLogos.map((logo, i) => (
            <div key={i} className="marquee-logo-card" style={{ boxShadow: "none", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="marquee-logo-inner">
                <Image
                  src={logo.src}
                  alt={`Client Logo ${i}`}
                  fill
                  sizes="128px"
                  loading="lazy"
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
            <div key={i} className="marquee-tag" style={{ boxShadow: "none" }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .marquee-logos, .marquee-tags {
            animation: none !important;
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 1rem !important;
            width: 100% !important;
            padding: 1rem !important;
          }
          .marquee-logo-card {
            width: 80px !important;
            height: 80px !important;
          }
          .marquee-tag {
            font-size: 0.7rem !important;
          }
          .marquee-track {
            mask-image: none !important;
            overflow: visible !important;
          }
        }
      `}</style>
    </section>
  );
}
