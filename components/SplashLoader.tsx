"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashLoader() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    // Se for parte web / desktop, desativa imediatamente e libera o scroll
    if (!mobile) {
      setLoading(false);
      document.body.style.overflow = "auto";
      return;
    }

    // Apenas no mobile: bloqueia o scroll ao iniciar o loading
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("splash-active");
    document.body.classList.add("splash-active");

    const timer = setTimeout(() => {
      setLoading(false);
      // Restaura o scroll após o tempo do splash
      document.body.style.overflow = "auto";
      document.documentElement.classList.remove("splash-active");
      document.body.classList.remove("splash-active");
    }, 3200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
      document.documentElement.classList.remove("splash-active");
      document.body.classList.remove("splash-active");
    };
  }, []);

  // Se já montou no cliente e confirmou que é desktop/web, não renderiza nada
  if (mounted && !isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="splash-loader-mobile"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 99999,
            background: "#000",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >


          {/* Overlay gradiente para profundidade intensa */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.9) 100%)",
            zIndex: 1
          }} />

          {/* Content Wrapper */}
          <div style={{ 
            position: "relative", 
            zIndex: 2, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center"
          }}>
            {/* Logo VFX 2030 CORE */}
            <motion.div 
              style={{ position: "relative", width: "160px", height: "160px" }}
              initial={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0px)"
              }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg 
                id="Logo_Future_VFX" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 160 160"
                style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 15px rgba(255,255,255,0.2))" }}
              >
                {/* Magnetic Energy Rings */}
                {[1, 2, 3].map((i) => (
                  <motion.circle 
                    key={i}
                    cx="80" 
                    cy="80" 
                    r={72 + i * 2}
                    fill="none"
                    stroke={`rgba(255,255,255,${0.08 / i})`}
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{ pathLength: 1, rotate: 360 }}
                    transition={{ 
                      pathLength: { duration: 2, ease: "easeInOut" },
                      rotate: { duration: 12 / i, repeat: Infinity, ease: "linear" }
                    }}
                  />
                ))}

                {/* Main Logo Path */}
                <motion.path 
                  d="M41.3,85.8c0,0,0-.2,0-.2-.6-2.8-4.2-23,8.1-33.8,3.4-2.9,7.2-4.8,10.5-5.7,9.8-2.6,24.4-3.1,31.3,3.6,1,1,1.6,1.8,1.8,2.1,3.9,6,.8,14.1.3,15.4-4.6,11.9-20.8,14.2-21.5,14.3,6.1.5,15.9-.3,26.3-4.9,4.3-2.2,9.4-4.8,12.9-10.7,3.3-5.7,3.3-11.2,3.2-15.3,0-9.1-3.3-16.2-5.7-20.3.1.2.3.5.6.8,1.7,2.5,5,7.3,7.4,14,1.5,4.1,2.2,7.6,2.9,10.9.5,5.9.4,14-2.3,22.9-7.7,25.1-29.9,36.7-35.2,39.2,8.9-8.2,13.2-15.8,15.4-20.8,2.1-4.7,2.7-7.7,1.3-9.7-1.2-1.7-3.8-2.8-8.8-2.9-5.9-.1-16.4,1.3-20.2,2.9-1.3.5-2.8,1.2-4.5,2.4,0,0-3.1,2-5.2,4.7-4.3,5.3-4,13.4-3.9,15,1.1,17.8,13.9,27.3,13.9,27.3-4.8-3.1-11.7-8.6-16.8-17.2-3.6-6-4.8-10.9-5.1-12.3-.7-2.9-1.4-6.3-.8-10.7.8-5.7,3.5-9.7,4.8-11.5,1.9-2.7,6.7-6.2,15.3-9.7,4.5-1.8,7.6-2.2,10.8-5.4,2.8-2.7,3.2-5,3.4-5.9.2-.8,1-4-.8-6.9-1.8-3-4.9-3.9-7.2-4.2-6-.8-10.9.7-13.5,1.8-7.1,2.9-11,7.7-12,9.1-.7.9-3.5,4.7-5,10.4-1.6,6.1-1.8,12.4-1.8,12.4,0,0,0-.5-.2-.8Z"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="0.8"
                  initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 1,
                    fill: "rgba(255,255,255,1)",
                    rotate: [0, 0, 360],
                    scale: [1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    pathLength: { duration: 2, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.2 },
                    fill: { delay: 1.5, duration: 1 },
                    rotate: { 
                      times: [0, 0.7, 1],
                      duration: 3, 
                      ease: [0.16, 1, 0.3, 1] 
                    },
                    scale: {
                      times: [0, 0.7, 0.85, 1],
                      duration: 3,
                      ease: "easeInOut"
                    }
                  }}
                />
              </svg>
            </motion.div>

            {/* Impactful Rhythmic Name Display */}
            <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", overflow: "hidden" }}>
                {"PH CODE LABS".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ 
                      delay: 1.2 + (index * 0.05),
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    style={{ 
                      color: "#fff", 
                      fontSize: "1rem", 
                      fontWeight: 900, 
                      textTransform: "uppercase",
                      fontFamily: "var(--font-display)",
                      letterSpacing: char === " " ? "0.8em" : "0.4em",
                      display: "inline-block",
                      minWidth: char === " " ? "0.8em" : "auto"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <div style={{ marginTop: "1.8rem", display: "flex", gap: "0.4em" }}>
                {"SC - BRASIL // 2026".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ 
                      delay: 2.2 + (index * 0.03),
                      duration: 0.1
                    }}
                    style={{ 
                      color: "#fff", 
                      fontSize: "0.55rem", 
                      letterSpacing: "0.2em", 
                      textTransform: "uppercase",
                      fontWeight: 300,
                      fontFamily: "monospace"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
