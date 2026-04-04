"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const [pedroHovered, setPedroHovered] = useState(false);
  const [luizHovered, setLuizHovered] = useState(false);
  const [claudioHovered, setClaudioHovered] = useState(false);

  const fadeIn: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 }
  };

  const defaultTransition: import("framer-motion").Transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
  const viewportConfig = { once: true, margin: "-50px" };

  return (
    <section id="sobre" ref={containerRef} style={{ background: "#ffffff", padding: "10rem 0", overflow: "hidden" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        
        {/* --- 01. PEDRO HENRIQUE --- */}
        <div className="team-grid" style={{ marginBottom: "15rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "center" }}>
          <motion.div 
            {...fadeIn}
            viewport={viewportConfig}
            transition={defaultTransition}
            onMouseEnter={() => setPedroHovered(true)}
            onMouseLeave={() => setPedroHovered(false)}
            style={{ position: "relative", cursor: "crosshair" }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "0.8", overflow: "hidden", borderRadius: "4px", background: "#f8f9fa" }}>
              <motion.div
                animate={{ scale: pedroHovered ? 1.05 : 1, filter: pedroHovered ? "grayscale(0)" : "grayscale(1)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="member-photo-inner"
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image src="/person.png" alt="Pedro Henrique" fill quality={95} priority style={{ objectFit: "cover", objectPosition: "center top" }} />
              </motion.div>
            </div>
            <div className="desktop-only" style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.4 }}>
              <div style={{ width: "6px", height: "6px", background: "#000", borderRadius: "50%" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", fontFamily: "monospace", color: "#000" }}>DESIGN 2026 // PHCODEVIBE</span>
            </div>
          </motion.div>

          <div className="content-container">
            <motion.div {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.2 }} style={{ fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.3)", letterSpacing: "0.3em", marginBottom: "3rem" }}>01 / THE VISIONARY</motion.div>
            <motion.h2 {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.3 }} style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 0.9, color: "#000", letterSpacing: "-0.04em", marginBottom: "3rem", textTransform: "uppercase" }}>
              Pedro <br /> <span style={{ position: "relative" }}>Henrique<motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 0.8, duration: 1.2 }} style={{ position: "absolute", bottom: "10%", left: 0, height: "4px", background: "#000", opacity: 0.1 }} /></span>
            </motion.h2>
            <motion.p {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.4 }} style={{ fontSize: "1.25rem", lineHeight: 1.6, color: "#000", opacity: 0.6, maxWidth: "480px", marginBottom: "4rem" }}>Especializado na criação de arquiteturas digitais onde o design atua como uma linguagem silenciosa de sofisticação e precisão. Menos ruído, mais conexão.</motion.p>
            <motion.div {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.5 }} style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://instagram.com/phcodevibe" target="_blank" className="premium-link">Instagram</a>
              <span style={{ opacity: 0.1, color: "#000" }}>/</span>
              <a href="https://behance.net/phcodevibe" target="_blank" className="premium-link">Behance</a>
              <span style={{ opacity: 0.1, color: "#000" }}>/</span>
              <a href="https://github.com/phcodevibe" target="_blank" className="premium-link">GitHub</a>
            </motion.div>
          </div>
        </div>

        {/* --- 02. LUIZ FELIPE --- */}
        <div className="team-grid inverted" style={{ marginBottom: "15rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "center" }}>
          <div className="content-container">
            <motion.div {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.2 }} style={{ fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.3)", letterSpacing: "0.3em", marginBottom: "3rem" }}>02 / THE ARCHITECT</motion.div>
            <motion.h2 {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.3 }} style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 0.9, color: "#000", letterSpacing: "-0.04em", marginBottom: "3rem", textTransform: "uppercase" }}>
              Luiz <br /> <span style={{ position: "relative" }}>Felipe<motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 0.8, duration: 1.2 }} style={{ position: "absolute", bottom: "10%", left: 0, height: "4px", background: "#000", opacity: 0.1 }} /></span>
            </motion.h2>
            <motion.p {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.4 }} style={{ fontSize: "1.25rem", lineHeight: 1.6, color: "#000", opacity: 0.6, maxWidth: "480px", marginBottom: "4rem" }}>Engenheiro Back-end focado na construção de sistemas invisíveis, porém indestrutíveis. Especialista em performance, segurança e escalabilidade de dados.</motion.p>
            <motion.div {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.5 }} style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://www.linkedin.com/in/luizlfc-dev" target="_blank" className="premium-link">LinkedIn</a>
              <span style={{ opacity: 0.1, color: "#000" }}>/</span>
              <a href="https://www.instagram.com/luizlfc.py/" target="_blank" className="premium-link">Instagram</a>
              <span style={{ opacity: 0.1, color: "#000" }}>/</span>
              <a href="https://luizlfc-dev.github.io/" target="_blank" className="premium-link">Website</a>
            </motion.div>
          </div>

          <motion.div 
            {...fadeIn}
            viewport={viewportConfig}
            transition={defaultTransition}
            onMouseEnter={() => setLuizHovered(true)}
            onMouseLeave={() => setLuizHovered(false)}
            style={{ position: "relative", cursor: "crosshair" }}
            className="portrait-container"
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "0.8", overflow: "hidden", borderRadius: "4px", background: "#f8f9fa" }}>
              <motion.div 
                animate={{ scale: luizHovered ? 1.05 : 1, filter: luizHovered ? "grayscale(0)" : "grayscale(1)" }} 
                transition={{ duration: 0.6, ease: "easeOut" }} 
                className="member-photo-inner"
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image src="/person-2.png" alt="Luiz Felipe" fill quality={95} style={{ objectFit: "cover", objectPosition: "center center" }} />
              </motion.div>
            </div>
            <div className="desktop-only" style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.4, justifyContent: "flex-end" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", fontFamily: "monospace", color: "#000" }}>BACKEND // DESIGN 2026</span>
              <div style={{ width: "6px", height: "6px", background: "#000", borderRadius: "50%" }} />
            </div>
          </motion.div>
        </div>

        {/* --- 03. CLAUDIO LISBOA --- */}
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "center" }}>
          <motion.div 
            {...fadeIn}
            viewport={viewportConfig}
            transition={defaultTransition}
            onMouseEnter={() => setClaudioHovered(true)}
            onMouseLeave={() => setClaudioHovered(false)}
            style={{ position: "relative", cursor: "crosshair" }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "0.8", overflow: "hidden", borderRadius: "4px", background: "#f8f9fa" }}>
              <motion.div
                animate={{ scale: claudioHovered ? 1.05 : 1, filter: claudioHovered ? "grayscale(0)" : "grayscale(1)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="member-photo-inner"
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image src="/person-3.png" alt="Claudio Lisboa" fill quality={95} style={{ objectFit: "cover", objectPosition: "center top" }} />
              </motion.div>
            </div>
            <div className="desktop-only" style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.4 }}>
              <div style={{ width: "6px", height: "6px", background: "#000", borderRadius: "50%" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", fontFamily: "monospace", color: "#000" }}>GROWTH // DESIGN 2026</span>
            </div>
          </motion.div>

          <div className="content-container">
            <motion.div {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.2 }} style={{ fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.3)", letterSpacing: "0.3em", marginBottom: "3rem" }}>03 / THE STRATEGIST</motion.div>
            <motion.h2 {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.3 }} style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 0.9, color: "#000", letterSpacing: "-0.04em", marginBottom: "3rem", textTransform: "uppercase" }}>
              Claudio <br /> <span style={{ position: "relative" }}>Lisboa<motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 0.8, duration: 1.2 }} style={{ position: "absolute", bottom: "10%", left: 0, height: "4px", background: "#000", opacity: 0.1 }} /></span>
            </motion.h2>
            <motion.p {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.4 }} style={{ fontSize: "1.25rem", lineHeight: 1.6, color: "#000", opacity: 0.6, maxWidth: "480px", marginBottom: "4rem" }}>Estrategista de Growth Marketing focado em escala acelerada e aquisição de alto impacto. Transforma dados em tração e audiência em faturamento recorrente.</motion.p>
            <motion.div {...fadeIn} viewport={viewportConfig} transition={{ duration: 1, delay: 0.5 }} style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
              <a href="#" target="_blank" className="premium-link">Instagram</a>
              <span style={{ opacity: 0.1, color: "#000" }}>/</span>
              <a href="#" target="_blank" className="premium-link">LinkedIn</a>
              <span style={{ opacity: 0.1, color: "#000" }}>/</span>
              <a href="#" target="_blank" className="premium-link">Growth Case</a>
            </motion.div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .premium-link { font-size: 14px; font-weight: 700; color: #000; text-decoration: none; position: relative; transition: all 0.3s ease; }
        .premium-link::after { content: ""; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #000; transition: width 0.3s ease; }
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
