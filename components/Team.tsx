"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const SKILL_ICONS = [
  <path key="a" d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />,
  <polygon key="b" points="5 3 19 12 5 21 5 3" />,
  <path key="c" d="M4 4h16v12H4zM8 20h8M12 16v4" />,
  <path key="d" d="M13 2L3 14h7l-1 8 10-12h-7z" />,
];

export function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const [pedroHovered, setPedroHovered] = useState(false);
  const [luizHovered, setLuizHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="sobre" ref={containerRef} style={{ background: "var(--bg)", padding: isMobile ? "4rem 0" : "10rem 0", overflow: isMobile ? "visible" : "hidden" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        
        {/* --- 01. PEDRO HENRIQUE --- */}
        <div className="pedro-grid">
          <div
            onMouseEnter={() => !isMobile && setPedroHovered(true)}
            onMouseLeave={() => !isMobile && setPedroHovered(false)}
            style={{ position: "relative" }}
          >
            <div
              className="pedro-photo"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "0.8",
                overflow: "hidden",
                borderRadius: "32px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "var(--bg-secondary)",
                boxShadow: "0 40px 90px -30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.14)",
              }}
            >
              <div
                className="pedro-photo-inner"
                style={{ width: "100%", height: "100%", position: "relative", transform: pedroHovered ? "scale(1.04)" : "scale(1)", filter: pedroHovered ? "grayscale(0)" : "grayscale(1)", transition: "transform 0.6s ease, filter 0.6s ease" }}
              >
                <Image src="/person.webp" alt="Pedro Henrique" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <div
                aria-hidden="true"
                style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, transparent 55%, rgba(8,11,20,0.85))" }}
              />
              <span className="pedro-corner pedro-corner-tl" aria-hidden="true" />
              <span className="pedro-corner pedro-corner-tr" aria-hidden="true" />
              <span className="pedro-corner pedro-corner-bl" aria-hidden="true" />
              <span className="pedro-corner pedro-corner-br" aria-hidden="true" />
              <div
                style={{
                  position: "absolute",
                  left: "1.2rem",
                  bottom: "1.2rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "rgba(10,14,26,0.55)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              >
                <span className="pedro-live" aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#ffffff" }}>
                  Design 2026 // PHCodeLabs
                </span>
              </div>
            </div>
          </div>

          <div className="pedro-content">
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "7px 16px",
                  borderRadius: "999px",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#a9c4ff",
                  background: "rgba(122,162,255,0.1)",
                  border: "1px solid rgba(169,196,255,0.3)",
                }}
              >
                01 / The Visionary
              </span>
            </div>

            <h2 className="pedro-title">
              Pedro
              <br />
              <span className="pedro-name-accent">Henrique</span>
            </h2>

            <div aria-hidden="true" style={{ width: "72px", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg, #a9c4ff, transparent)" }} />

            <p className="pedro-text">
              Com 9 anos de experiência, desenvolvo projetos de alto nível. Construo ecossistemas digitais completos para marcas que não aceitam o amadorismo.
            </p>

            <ul className="pedro-skills">
              {[
                "Identidades visuais de autoridade",
                "Vídeos motion de alto engajamento",
                "Landing pages de conversão extrema",
                "Sistemas com performance impecável",
              ].map((item, i) => (
                <li key={item} className="pedro-skill">
                  <span className="pedro-skill-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {SKILL_ICONS[i]}
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="pedro-tagline">
              Para marcas que buscam liderança de mercado e conexão real.
            </p>

            <div className="pedro-stats">
              <div className="pedro-stat">
                <strong>9+</strong>
                <span>anos de experiência</span>
              </div>
              <div className="pedro-stat">
                <strong>Design</strong>
                <span>+ código no mesmo projeto</span>
              </div>
              <div className="pedro-stat">
                <strong>360°</strong>
                <span>da identidade ao ar</span>
              </div>
            </div>

            <div className="pedro-links">
              {[
                { label: "Instagram", href: "https://www.instagram.com/henriqueprofx/" },
                { label: "GitHub", href: "https://github.com/phcodelabs" },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="pedro-link">
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- 02. LUIZ FELIPE --- */}
        <div className="luiz-grid">
          <div
            onMouseEnter={() => !isMobile && setLuizHovered(true)}
            onMouseLeave={() => !isMobile && setLuizHovered(false)}
            className="luiz-portrait"
          >
            <div className="luiz-photo">
              <div
                className="luiz-photo-inner"
                style={{ transform: luizHovered ? "scale(1.04)" : "scale(1)", filter: luizHovered ? "grayscale(0)" : "grayscale(1)" }}
              >
                <Image src="/person-2.webp" alt="Luiz Felipe" fill style={{ objectFit: "cover", objectPosition: "center center" }} />
              </div>
              <span className="pedro-corner pedro-corner-tl" aria-hidden="true" />
              <span className="pedro-corner pedro-corner-tr" aria-hidden="true" />
              <span className="pedro-corner pedro-corner-bl" aria-hidden="true" />
              <span className="pedro-corner pedro-corner-br" aria-hidden="true" />
              <div className="luiz-badge">
                <span className="pedro-live" aria-hidden="true" />
                <span>Backend // Design 2026</span>
              </div>
            </div>
          </div>

          <div className="luiz-content">
            <span className="luiz-eyebrow">02 / The Architect</span>

            <h2 className="luiz-title">
              Luiz <br /> <span className="luiz-title-accent">Felipe</span>
            </h2>

            <div aria-hidden="true" className="luiz-divider" />

            <p className="luiz-lead">
              A mente lógica por trás de cada estrutura invisível. Desenvolvedor Full-stack com raízes profundas na engenharia Back-end, constrói o alicerce onde o design de alto nível ganha vida.
            </p>

            <ul className="luiz-skills">
              <li className="pedro-skill">
                <span className="pedro-skill-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
                </span>
                <span>C#/.NET e Python</span>
              </li>
              <li className="pedro-skill">
                <span className="pedro-skill-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /></svg>
                </span>
                <span>Java e arquitetura Docker</span>
              </li>
              <li className="pedro-skill">
                <span className="pedro-skill-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12H4zM8 20h8M12 16v4" /></svg>
                </span>
                <span>APIs RESTful de alta performance</span>
              </li>
              <li className="pedro-skill">
                <span className="pedro-skill-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></svg>
                </span>
                <span>Sistemas escaláveis e seguros</span>
              </li>
            </ul>

            <p className="luiz-detail-sub">
              Com expertise sólida em <span className="luiz-strong">C#/.NET, Python, Java e arquitetura Docker</span>, Luiz transforma regras de negócio complexas em APIs RESTful de extrema velocidade e segurança. Da pesquisa avançada na Unidade EMBRAPII à execução de mercado, sua precisão garante sistemas escaláveis e indestrutíveis.
            </p>

            <div className="luiz-stats">
              <div className="pedro-stat">
                <strong>C#</strong>
                <span>.NET e back-end robusto</span>
              </div>
              <div className="pedro-stat">
                <strong>Full</strong>
                <span>stack com raízes em engenharia</span>
              </div>
              <div className="pedro-stat">
                <strong>EMBRAPII</strong>
                <span>pesquisa aplicada ao mercado</span>
              </div>
            </div>

            <div className="luiz-links">
              <a href="https://www.linkedin.com/in/luizlfc-dev" target="_blank" rel="noopener noreferrer" className="pedro-link">
                LinkedIn
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
              </a>
              <a href="https://www.instagram.com/luizlfc.py/" target="_blank" rel="noopener noreferrer" className="pedro-link">
                Instagram
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
              </a>
              <a href="https://luizlfc-dev.github.io/" target="_blank" rel="noopener noreferrer" className="pedro-link">
                Website
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
              </a>
            </div>
          </div>
        </div>



      </div>

      <style jsx>{`
        .pedro-link {
          display: inline-flex;
          align-items: center;
          padding: 0.7rem 1.3rem;
          border-radius: 999px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: #ffffff;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.16);
          gap: 8px;
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
        }
        .pedro-link svg {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        @media (hover: hover) {
          .pedro-link:hover {
            background: #ffffff;
            color: #0b0f19;
            border-color: #ffffff;
            transform: translateY(-2px);
          }
        }
        @media (hover: hover) {
          .pedro-link:hover svg {
            transform: translate(2px, -2px);
          }
        }
        .pedro-skill {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.35;
          color: #ffffff;
          padding: 0.8rem 1rem;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.4s ease, background 0.4s ease;
        }
        @media (hover: hover) {
          .pedro-skill:hover {
            border-color: rgba(169,196,255,0.4);
            background: rgba(255,255,255,0.07);
          }
        }
        .pedro-skill-icon {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          color: #a9c4ff;
          background: rgba(122,162,255,0.12);
          border: 1px solid rgba(169,196,255,0.25);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease;
        }
        @media (hover: hover) {
          .pedro-skill:hover .pedro-skill-icon {
            transform: scale(1.08) rotate(-4deg);
            background: rgba(122,162,255,0.22);
          }
        }
        .pedro-live {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7dd3fc;
          box-shadow: 0 0 12px #7dd3fc;
          animation: pedro-pulse 2.4s ease-in-out infinite;
        }
        .pedro-photo {
          transition: box-shadow 0.6s ease, border-color 0.6s ease;
        }
        @media (hover: hover) {
          .pedro-photo:hover {
            border-color: rgba(169,196,255,0.4);
            box-shadow: 0 50px 110px -30px rgba(0,0,0,0.9), 0 0 70px -24px rgba(122,162,255,0.45), inset 0 1px 0 rgba(255,255,255,0.18);
          }
        }
        .pedro-corner {
          position: absolute;
          z-index: 2;
          width: 26px;
          height: 26px;
          border-color: rgba(169,196,255,0.85);
          border-style: solid;
          border-width: 0;
          pointer-events: none;
          transition: width 0.6s cubic-bezier(0.16,1,0.3,1), height 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .pedro-corner-tl { top: 16px; left: 16px; border-top-width: 2px; border-left-width: 2px; border-top-left-radius: 14px; }
        .pedro-corner-tr { top: 16px; right: 16px; border-top-width: 2px; border-right-width: 2px; border-top-right-radius: 14px; }
        .pedro-corner-bl { bottom: 16px; left: 16px; border-bottom-width: 2px; border-left-width: 2px; border-bottom-left-radius: 14px; }
        .pedro-corner-br { bottom: 16px; right: 16px; border-bottom-width: 2px; border-right-width: 2px; border-bottom-right-radius: 14px; }
        @media (hover: hover) {
          .pedro-photo:hover .pedro-corner {
            width: 44px;
            height: 44px;
          }
        }
        .pedro-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.2rem;
          padding-top: 1.6rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .pedro-stat {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }
        .pedro-stat strong {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 900;
          line-height: 1;
          color: #ffffff;
        }
        .pedro-stat span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.8rem;
          line-height: 1.4;
          color: rgba(255,255,255,0.7);
        }
        .pedro-skill-icon svg {
          flex-shrink: 0;
        }
        .luiz-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 100px;
          align-items: center;
          margin-bottom: 15rem;
        }
        .luiz-portrait {
          position: relative;
          min-width: 0;
        }
        .luiz-photo {
          position: relative;
          width: 100%;
          aspect-ratio: 0.8;
          overflow: hidden;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.12);
          background: var(--bg-secondary);
          box-shadow: 0 40px 90px -30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.14);
        }
        @media (hover: hover) {
          .luiz-photo:hover {
            border-color: rgba(169,196,255,0.4);
            box-shadow: 0 50px 110px -30px rgba(0,0,0,0.9), 0 0 70px -24px rgba(122,162,255,0.45), inset 0 1px 0 rgba(255,255,255,0.18);
          }
        }
        .luiz-photo-inner {
          position: absolute;
          inset: 0;
          transition: transform 0.6s ease, filter 0.6s ease;
        }
        @media (hover: hover) {
          .luiz-photo:hover .pedro-corner {
            width: 44px;
            height: 44px;
          }
        }
        .luiz-badge {
          position: absolute;
          left: 1.2rem;
          bottom: 1.2rem;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(10,14,26,0.55);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #ffffff;
        }
        .luiz-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          min-width: 0;
          font-family: var(--font-inter), sans-serif;
        }
        .luiz-eyebrow {
          display: inline-block;
          align-self: flex-start;
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a9c4ff;
          background: rgba(122,162,255,0.1);
          border: 1px solid rgba(169,196,255,0.3);
        }
        .luiz-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 6.2vw, 5.2rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          color: #ffffff;
        }
        .luiz-title-accent {
          background: linear-gradient(90deg, #ffffff, #a9c4ff 60%, #7dd3fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .luiz-divider {
          width: 72px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #a9c4ff, transparent);
        }
        .luiz-lead {
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
          max-width: 540px;
        }
        .luiz-skills {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 0.8rem;
        }
        .luiz-detail-sub {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
        }
        .luiz-strong {
          color: #ffffff;
          font-weight: 700;
        }
        .luiz-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.2rem;
          padding-top: 1.6rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .luiz-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
        }
        @media (max-width: 968px) {
          .luiz-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 56px;
            margin-bottom: 6rem;
          }
          .luiz-portrait {
            order: -1;
            max-width: 560px;
          }
        }
        @media (max-width: 640px) {
          .luiz-grid {
            gap: 40px;
            margin-bottom: 4rem;
          }
          .luiz-skills {
            grid-template-columns: minmax(0, 1fr);
          }
          .luiz-stats {
            grid-template-columns: minmax(0, 1fr);
            gap: 0.8rem;
          }
        }
        @media (max-width: 968px) {
          .luiz-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 56px;
            margin-bottom: 6rem;
          }
          .luiz-portrait {
            order: -1;
            max-width: 560px;
          }
        }
        @media (max-width: 640px) {
          .luiz-grid {
            gap: 40px;
            margin-bottom: 4rem;
          }
        }
        .pedro-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 100px;
          align-items: center;
          margin-bottom: 15rem;
          text-align: left;
        }
        .pedro-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          min-width: 0;
          font-family: var(--font-inter), sans-serif;
        }
        .pedro-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 6.2vw, 5.2rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          color: #ffffff;
        }
        .pedro-text {
          margin: 0;
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
          max-width: 540px;
        }
        .pedro-tagline {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }
        .pedro-skills {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 0.8rem;
        }
        .pedro-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
        }
        @media (max-width: 968px) {
          .pedro-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 56px;
            margin-bottom: 6rem;
          }
          .pedro-photo {
            max-width: 560px;
          }
        }
        @media (max-width: 640px) {
          .pedro-grid {
            gap: 40px;
            margin-bottom: 4rem;
          }
          .pedro-skills {
            grid-template-columns: minmax(0, 1fr);
          }
          .pedro-stats {
            gap: 0.6rem;
          }
          .pedro-stat strong {
            font-size: 1.25rem;
          }
          .pedro-stat span {
            font-size: 0.72rem;
          }
        }
        .pedro-name-accent {
          background: linear-gradient(90deg, #ffffff, #a9c4ff 60%, #7dd3fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        @keyframes pedro-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }        .premium-link { font-size: 14px; font-weight: 700; color: var(--text-primary); text-decoration: none; position: relative; transition: all 0.3s ease; }
        .premium-link::after { content: ""; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--text-primary); transition: width 0.3s ease; }
        @media (hover: hover) {
          .premium-link:hover::after { width: 100%; }
        }
        @media (max-width: 968px) {
          .team-grid { grid-template-columns: 1fr !important; gap: 60px !important; text-align: center; }
          .team-grid.inverted { display: flex !important; flex-direction: column !important; }
          .team-grid.inverted .content-container { order: 2; }
          .team-grid.inverted .portrait-container { order: 1; }
          .desktop-only { display: none !important; }
        }
      `}</style>
    </section>
  );
}
