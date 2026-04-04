"use client";
import { useEffect, useRef } from "react";

export function ScrollEffects() {
  const ticking = useRef(false);
  const lastBg = useRef("");

  useEffect(() => {
    // Skip entirely on mobile — zero scroll overhead
    if (window.innerWidth < 768) return;

    const handleScroll = () => {
      if (window.scrollY < 100) {
        ticking.current = false;
        return;
      }

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);

          const root = document.documentElement;
          root.style.setProperty("--scroll-progress", progress.toString());

          // Background Transition (White to Black)
          const easeProgress = Math.pow(progress, 1.5);
          const colorValue = Math.floor(255 * (1 - easeProgress));
          const newBg = `rgb(${colorValue},${colorValue},${colorValue})`;

          // Only write to DOM if value actually changed
          if (newBg !== lastBg.current) {
            document.body.style.backgroundColor = newBg;
            lastBg.current = newBg;
          }

          if (progress > 0.6) {
            root.style.setProperty("--text-primary", "#ffffff");
            root.style.setProperty("--text-secondary", "rgba(255, 255, 255, 0.7)");
          } else {
            root.style.setProperty("--text-primary", "#0e1c29");
            root.style.setProperty("--text-secondary", "rgba(0, 0, 0, 0.6)");
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
