"use client";
import { useEffect, useRef } from "react";

export function ScrollEffects() {
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // Otimização: No mobile (largura < 768px), desativamos transições de cor pesadas
      if (window.innerWidth < 768) {
        ticking.current = false;
        return;
      }

      // Ignora cálculos pesados no scroll inicial (transição Hero)
      if (window.scrollY < 100) {
        ticking.current = false;
        return;
      }

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
          
          document.documentElement.style.setProperty("--scroll-progress", progress.toString());

          // Artistic Background Transition (White to Black)
          const easeProgress = Math.pow(progress, 1.5); 
          const colorValue = Math.floor(255 * (1 - easeProgress));
          const bgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
          
          document.body.style.backgroundColor = bgColor;
          
          if (progress > 0.6) {
            document.documentElement.style.setProperty("--text-primary", "#ffffff");
            document.documentElement.style.setProperty("--text-secondary", "rgba(255, 255, 255, 0.7)");
          } else {
            document.documentElement.style.setProperty("--text-primary", "#0e1c29");
            document.documentElement.style.setProperty("--text-secondary", "rgba(0, 0, 0, 0.6)");
          }
          
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
