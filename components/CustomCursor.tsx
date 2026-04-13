"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 180, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener("mousemove", moveMouse);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .neu-card, .hero-cta-primary, .hero-cta-secondary');
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isVisible) return null;

  const content = (
    <div 
      id="custom-cursor-portal"
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100vw", 
        height: "100vh", 
        pointerEvents: "none", 
        zIndex: 9999999, // Um milhão de prioridade
        isolation: "isolate"
      }}
    >
      {/* Outer Triangle - Minimalist & Rotating */}
      <motion.div
        style={{
          position: "absolute",
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "difference" // GARANTE VISIBILIDADE EM FUNDO PRETO
        }}
      >
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: isHovered ? 2 : 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <motion.path
            d="M50 15 L85 75 L15 75 Z"
            fill="none"
            stroke="#ffffff" // Branco puro para reflexo em diferença
            strokeWidth="3"
            strokeLinejoin="round"
            animate={{
              strokeWidth: isHovered ? 4 : 3,
              scale: isHovered ? 1.15 : 1
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Center Dot - High Precision */}
      <motion.div
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          mixBlendMode: "difference"
        }}
        animate={{
          scale: isHovered ? 1.5 : 1
        }}
      />
    </div>
  );

  return createPortal(content, document.body);
}
