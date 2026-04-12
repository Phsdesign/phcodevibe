"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const [pedroHovered, setPedroHovered] = useState(false);
  const [luizHovered, setLuizHovered] = useState(false);
  const [claudioHovered, setClaudioHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fadeIn: Variants = isMobile 
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } };

  const defaultTransition: import("framer-motion").Transition = isMobile 
    ? { duration: 0 } 
    : { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
    
  const viewportConfig = isMobile 
    ? { once: true, margin: "0px" } 
    : { once: true, margin: "-50px" };

  return (
    <section id="sobre" ref={containerRef} style={{ background: "var(--bg)", padding: isMobile ? "4rem 0" : "10rem 0", overflow: isMobile ? "visible" : "hidden" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        
        {/* --- 01. PEDRO HENRIQUE --- */}
        <div className="team-grid" style={{ marginBottom: isMobile ? "4rem" : "15rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "100px", alignItems: "center" }}>
          <motion.div 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={defaultTransition}
            onMouseEnter={() => !isMobile && setPedroHovered(true)}
            onMouseLeave={() => !isMobile && setPedroHovered(false)}
            style={{ position: "relative", cursor: "crosshair" }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "0.8", overflow: "hidden", borderRadius: "4px", background: "var(--bg-secondary)" }}>
              <motion.div
                animate={isMobile ? {} : { scale: pedroHovered ? 1.05 : 1, filter: pedroHovered ? "grayscale(0)" : "grayscale(1)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="member-photo-inner"
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image src="/person.png" alt="Pedro Henrique" fill quality={isMobile ? 80 : 95} style={{ objectFit: "cover", objectPosition: "center top" }} />
              </motion.div>
            </div>
            <div className="desktop-only" style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.4 }}>
              <div style={{ width: "6px", height: "6px", background: "var(--text-primary)", borderRadius: "50%" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", fontFamily: "monospace", color: "var(--text-primary)" }}>DESIGN 2026 // PHCODEVIBE</span>
            </div>
          </motion.div>

          <div className="content-container">
            <motion.div initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.2 }} style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", opacity: 0.5, letterSpacing: "0.3em", marginBottom: isMobile ? "1rem" : "3rem" }}>01 / THE VISIONARY</motion.div>
            <motion.h2 initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.3 }} style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 0.9, color: "var(--text-primary)", letterSpacing: "-0.04em", marginBottom: isMobile ? "1.5rem" : "3rem", textTransform: "uppercase" }}>
              Pedro <br /> <span style={{ position: "relative" }}>Henrique{!isMobile && <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 0.8, duration: 1.2 }} style={{ position: "absolute", bottom: "10%", left: 0, height: "4px", background: "var(--text-primary)", opacity: 0.1 }} />}</span>
            </motion.h2>
            <motion.p initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.4 }} style={{ fontSize: isMobile ? "0.95rem" : "1.1rem", lineHeight: 1.6, color: "var(--text-primary)", opacity: 0.7, maxWidth: "520px", marginBottom: isMobile ? "2rem" : "3rem" }}>
              Com 9 anos de experiência, atuo no desenvolvimento de projetos de alto nível. Construo ecossistemas digitais completos para marcas que não aceitam o amadorismo, entregando:
            </motion.p>
            
            <motion.div initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.5 }} style={{ marginBottom: isMobile ? "2rem" : "4rem" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                {[
                  "Identidades Visuais de Autoridade",
                  "Vídeos Motion de Alto Engajamento",
                  "Landing Pages de Conversão Extrema",
                  "Sistemas com Performance Impecável"
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                    <div style={{ width: "4px", height: "4px", background: "var(--text-primary)", borderRadius: "50%", opacity: 0.3 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: "2rem", fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)", opacity: 0.4, letterSpacing: "0.05em" }}>
                Para marcas que buscam liderança de mercado e conexão real.
              </p>
            </motion.div>
            <motion.div initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.5 }} style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://instagram.com/phcodevibe" target="_blank" className="premium-link">Instagram</a>
              <span style={{ opacity: 0.1, color: "var(--text-primary)" }}>/</span>
              <a href="https://behance.net/phcodevibe" target="_blank" className="premium-link">Behance</a>
              <span style={{ opacity: 0.1, color: "var(--text-primary)" }}>/</span>
              <a href="https://github.com/phcodevibe" target="_blank" className="premium-link">GitHub</a>
            </motion.div>
          </div>
        </div>

        {/* --- 02. LUIZ FELIPE --- */}
        <div className="team-grid inverted" style={{ marginBottom: isMobile ? "4rem" : "15rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "100px", alignItems: "center" }}>
          <div className="content-container">
            <motion.div initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.2 }} style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", opacity: 0.5, letterSpacing: "0.3em", marginBottom: isMobile ? "1rem" : "3rem" }}>02 / THE ARCHITECT</motion.div>
            <motion.h2 initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.3 }} style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 0.9, color: "var(--text-primary)", letterSpacing: "-0.04em", marginBottom: isMobile ? "1.5rem" : "3rem", textTransform: "uppercase" }}>
              Luiz <br /> <span style={{ position: "relative" }}>Felipe{!isMobile && <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 0.8, duration: 1.2 }} style={{ position: "absolute", bottom: "10%", left: 0, height: "4px", background: "var(--text-primary)", opacity: 0.1 }} />}</span>
            </motion.h2>
            <motion.p initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.4 }} style={{ fontSize: isMobile ? "0.95rem" : "1.1rem", lineHeight: 1.6, color: "var(--text-primary)", opacity: 0.7, maxWidth: "520px", marginBottom: isMobile ? "2rem" : "3rem" }}>
              A mente lógica por trás de cada estrutura invisível. Desenvolvedor Full-stack com raízes profundas na engenharia Back-end, constrói o alicerce onde o design de alto nível ganha vida.
            </motion.p>
            
            <motion.div initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.5 }} style={{ marginBottom: isMobile ? "2rem" : "4rem" }}>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-primary)", opacity: 0.6, marginBottom: "1.5rem" }}>
                Com expertise sólida em <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>C#/.NET, Python, Java e arquitetura Docker</span>, Luiz transforma regras de negócio complexas em APIs RESTful de extrema velocidade e segurança.
              </p>
              <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)", opacity: 0.4, letterSpacing: "0.05em" }}>
                Da pesquisa avançada na Unidade EMBRAPII à execução de mercado, sua precisão garante sistemas escaláveis e indestrutíveis.
              </p>
            </motion.div>
            <motion.div initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={viewportConfig} transition={isMobile ? { duration: 0 } : { duration: 1, delay: 0.5 }} style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://www.linkedin.com/in/luizlfc-dev" target="_blank" className="premium-link">LinkedIn</a>
              <span style={{ opacity: 0.1, color: "var(--text-primary)" }}>/</span>
              <a href="https://www.instagram.com/luizlfc.py/" target="_blank" className="premium-link">Instagram</a>
              <span style={{ opacity: 0.1, color: "var(--text-primary)" }}>/</span>
              <a href="https://luizlfc-dev.github.io/" target="_blank" className="premium-link">Website</a>
            </motion.div>
          </div>

          <motion.div 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={defaultTransition}
            onMouseEnter={() => !isMobile && setLuizHovered(true)}
            onMouseLeave={() => !isMobile && setLuizHovered(false)}
            style={{ position: "relative", cursor: "crosshair" }}
            className="portrait-container"
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "0.8", overflow: "hidden", borderRadius: "4px", background: "var(--bg-secondary)" }}>
              <motion.div 
                animate={isMobile ? {} : { scale: luizHovered ? 1.05 : 1, filter: luizHovered ? "grayscale(0)" : "grayscale(1)" }} 
                transition={{ duration: 0.6, ease: "easeOut" }} 
                className="member-photo-inner"
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image src="/person-2.png" alt="Luiz Felipe" fill quality={isMobile ? 80 : 95} style={{ objectFit: "cover", objectPosition: "center center" }} />
              </motion.div>
            </div>
            <div className="desktop-only" style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.4, justifyContent: "flex-end" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", fontFamily: "monospace", color: "var(--text-primary)" }}>BACKEND // DESIGN 2026</span>
              <div style={{ width: "6px", height: "6px", background: "var(--text-primary)", borderRadius: "50%" }} />
            </div>
          </motion.div>
        </div>



      </div>

      <style jsx>{`
        .premium-link { font-size: 14px; font-weight: 700; color: var(--text-primary); text-decoration: none; position: relative; transition: all 0.3s ease; }
        .premium-link::after { content: ""; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--text-primary); transition: width 0.3s ease; }
        .premium-link:hover::after { width: 100%; }
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
