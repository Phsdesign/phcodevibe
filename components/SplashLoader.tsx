"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          {/* Logo SVG Animada */}
          <div style={{ position: "relative", width: "120px", height: "120px" }}>
            <svg 
              id="Camada_1" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 160 160"
              style={{ width: "100%", height: "100%" }}
            >
              {/* Círculo de Fundo com Fade In */}
              <motion.circle 
                cx="80" 
                cy="80" 
                r="71.9"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Path da Logo com Animação de Escrita (Draw) */}
              <motion.path 
                d="M41.3,85.8c0,0,0-.2,0-.2-.6-2.8-4.2-23,8.1-33.8,3.4-2.9,7.2-4.8,10.5-5.7,9.8-2.6,24.4-3.1,31.3,3.6,1,1,1.6,1.8,1.8,2.1,3.9,6,.8,14.1.3,15.4-4.6,11.9-20.8,14.2-21.5,14.3,6.1.5,15.9-.3,26.3-4.9,4.3-2.2,9.4-4.8,12.9-10.7,3.3-5.7,3.3-11.2,3.2-15.3,0-9.1-3.3-16.2-5.7-20.3.1.2.3.5.6.8,1.7,2.5,5,7.3,7.4,14,1.5,4.1,2.2,7.6,2.9,10.9.5,5.9.4,14-2.3,22.9-7.7,25.1-29.9,36.7-35.2,39.2,8.9-8.2,13.2-15.8,15.4-20.8,2.1-4.7,2.7-7.7,1.3-9.7-1.2-1.7-3.8-2.8-8.8-2.9-5.9-.1-16.4,1.3-20.2,2.9-1.3.5-2.8,1.2-4.5,2.4,0,0-3.1,2-5.2,4.7-4.3,5.3-4,13.4-3.9,15,1.1,17.8,13.9,27.3,13.9,27.3-4.8-3.1-11.7-8.6-16.8-17.2-3.6-6-4.8-10.9-5.1-12.3-.7-2.9-1.4-6.3-.8-10.7.8-5.7,3.5-9.7,4.8-11.5,1.9-2.7,6.7-6.2,15.3-9.7,4.5-1.8,7.6-2.2,10.8-5.4,2.8-2.7,3.2-5,3.4-5.9.2-.8,1-4-.8-6.9-1.8-3-4.9-3.9-7.2-4.2-6-.8-10.9.7-13.5,1.8-7.1,2.9-11,7.7-12,9.1-.7.9-3.5,4.7-5,10.4-1.6,6.1-1.8,12.4-1.8,12.4,0,0,0-.5-.2-.8Z"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  fill: "rgba(255,255,255,1)" 
                }}
                transition={{ 
                  pathLength: { duration: 2, ease: "easeInOut" },
                  opacity: { duration: 0.5 },
                  fill: { delay: 1.8, duration: 1 }
                }}
              />
            </svg>
            
            {/* Brilho Pulsante */}
            <motion.div 
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.3, 1] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: "-20px",
                background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                borderRadius: "50%",
                zIndex: -1
              }}
            />
          </div>

          {/* Nome da Marca com Reveal Suave */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(5px)" }}
            animate={{ 
              opacity: 1, 
              letterSpacing: "0.5em",
              filter: "blur(0px)",
              transition: { delay: 1.5, duration: 1.2, ease: "easeOut" }
            }}
            style={{ marginTop: "3rem" }}
          >
            <h1 style={{ 
              color: "#fff", 
              fontSize: "0.85rem", 
              fontWeight: 900, 
              textTransform: "uppercase",
              fontFamily: "var(--font-display)",
              margin: 0
            }}>
              PH CODE VIBE
            </h1>
          </motion.div>

          {/* Barra de Progresso High-End */}
          <div style={{ 
            position: "absolute", 
            bottom: "12%", 
            width: "180px", 
            height: "1px", 
            background: "rgba(255,255,255,0.05)" 
          }}>
            <motion.div 
              initial={{ width: 0, left: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                height: "100%", 
                background: "linear-gradient(90deg, transparent, #fff, transparent)",
                boxShadow: "0 0 15px rgba(255,255,255,0.5)"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
