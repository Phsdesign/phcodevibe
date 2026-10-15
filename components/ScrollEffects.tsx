"use client";
import { useEffect, useRef } from "react";

export function ScrollEffects() {
  const ticking = useRef(false);
  const lastBg = useRef("");

  useEffect(() => {
    // Skip entirely on mobile — zero scroll overhead
    if (window.innerWidth < 768) return;

    let scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const measure = () => {
      scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    };
    window.addEventListener("resize", measure, { passive: true });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        ticking.current = false;
        return;
      }

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);

          const root = document.documentElement;
          // IMPORTANT: Se o modo escuro estiver ativado, pare o override do scroll!
          // Só limpa uma vez: escrever no style do <html> a cada frame invalidava
          // o estilo da página inteira durante toda a rolagem no modo escuro.
          if (root.classList.contains('dark')) {
            if (lastBg.current !== 'dark') {
              document.body.style.backgroundColor = '';
              root.style.removeProperty('--text-primary');
              root.style.removeProperty('--text-secondary');
              lastBg.current = 'dark';
            }
            ticking.current = false;
            return;
          }

          root.style.setProperty("--scroll-progress", progress.toString());

          // Background Transition (White to Black) - Only if NOT in dark mode
          const easeProgress = Math.pow(progress, 1.5);
          const colorValue = Math.floor(255 * (1 - easeProgress));
          const newBg = `rgb(${colorValue},${colorValue},${colorValue})`;

          // Only write to DOM if value actually changed
          if (newBg !== lastBg.current) {
            document.body.style.backgroundColor = newBg;
            lastBg.current = newBg;
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return null;
}
