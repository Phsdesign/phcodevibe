"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Team() {
  const containerRef = useRef<HTMLElement>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="sobre" ref={containerRef} style={{ background: "#ffffff", padding: "10rem 0", overflow: "hidden" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="mobile-only-header" style={{ marginBottom: "2rem", display: "none" }}>
          <motion.div 
            {...fadeIn}
            style={{ fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.3)", letterSpacing: "0.3em", textAlign: "center" }}
          >
            01 / THE VISIONARY
          </motion.div>
        </div>

        <div className="team-grid">
          
          {/* Portrait Side */}
          <motion.div 
            {...fadeIn}
            className="portrait-container"
            style={{ position: "relative" }}
          >
            <div style={{ 
              position: "relative", 
              width: "100%", 
              aspectRatio: "0.8", 
              overflow: "hidden",
              borderRadius: "4px",
              background: "#f8f9fa"
            }}>
              <Image
                src="/person.png"
                alt="Pedro Henrique"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div className="desktop-only" style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "12px", opacity: 0.4 }}>
              <div style={{ width: "6px", height: "6px", background: "#000", borderRadius: "50%" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", fontFamily: "monospace" }}>
                ESTABLISHED_2024 // PH_CODEVIBE
              </span>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="content-container">
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="desktop-only"
              style={{ fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.3)", letterSpacing: "0.3em", marginBottom: "3rem" }}
            >
              01 / THE VISIONARY
            </motion.div>
            
            <motion.h2 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              style={{ 
                fontSize: "clamp(3rem, 6vw, 5.5rem)", 
                fontWeight: 900, 
                lineHeight: 0.9, 
                color: "#000", 
                letterSpacing: "-0.04em",
                marginBottom: "3rem",
                textTransform: "uppercase"
              }}
            >
              Pedro <br /> 
              <span style={{ position: "relative" }}>
                Henrique
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  style={{ position: "absolute", bottom: "10%", left: 0, height: "4px", background: "#000", opacity: 0.1 }}
                />
              </span>
            </motion.h2>

            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.4 }}
              style={{ 
                fontSize: "1.25rem", 
                lineHeight: 1.6, 
                color: "rgba(0,0,0,0.6)", 
                maxWidth: "480px", 
                marginBottom: "4rem" 
              }}
            >
              Especializado na criação de arquiteturas digitais onde o design 
              atua como uma linguagem silenciosa de sofisticação e precisão. 
              Menos ruído, mais conexão.
            </motion.p>

            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.5 }}
              style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}
            >
              <a href="https://instagram.com/phcodevibe" target="_blank" className="premium-link">Instagram</a>
              <span style={{ opacity: 0.1 }}>/</span>
              <a href="https://behance.net/phcodevibe" target="_blank" className="premium-link">Behance</a>
              <span style={{ opacity: 0.1 }}>/</span>
              <a href="https://github.com/phcodevibe" target="_blank" className="premium-link">GitHub</a>
            </motion.div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .team-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .premium-link {
          font-size: 14px;
          font-weight: 700;
          color: #000;
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
        }
        .premium-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #000;
          transition: width 0.3s ease;
        }
        .premium-link:hover::after {
          width: 100%;
        }
        @media (max-width: 968px) {
          .team-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .mobile-only-header {
            display: block !important;
          }
          .desktop-only {
            display: none !important;
          }
          .portrait-container {
            order: 1;
          }
          .content-container {
            order: 2;
            text-align: center;
          }
          .content-container h2 {
            margin-top: 1rem !important;
          }
          .content-container p {
            margin-left: auto;
            margin-right: auto;
          }
          .content-container div {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
