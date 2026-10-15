"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function StarsBackground() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("theme-changed", checkTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("theme-changed", checkTheme);
    };
  }, []);

  useEffect(() => {
    // Se não estiver na home (ex: /sobre, /portfolio, etc.), sempre visível
    if (pathname !== "/") {
      const id = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(id);
    }

    // Na home: oculta na Hero (dobra 1) e ativa a partir da dobra 2.
    // A altura da Hero é medida só no resize (antes: offsetHeight a cada evento de
    // scroll) e a checagem roda no máximo 1x por frame.
    let heroHeight = 600;
    let needsMeasure = false;
    let frame = 0;

    const measure = () => {
      const heroElement = document.getElementById("hero");
      heroHeight = heroElement ? heroElement.offsetHeight : 600;
    };
    const check = () => {
      // Começa a transição suave quando o usuário começa a sair da Hero em direção à dobra 2
      setIsVisible(window.scrollY > Math.max(200, heroHeight * 0.45));
    };
    const schedule = (remeasure: boolean) => {
      if (remeasure) needsMeasure = true;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (needsMeasure) {
          needsMeasure = false;
          measure();
        }
        check();
      });
    };
    const onScroll = () => schedule(false);
    const onResize = () => schedule(true);

    // Primeira checagem no próximo frame (evita setState síncrono dentro do effect).
    schedule(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return (
    <div
      className={`stars-bg-container ${isVisible || !isDark ? "stars-visible" : "stars-hidden"}`}
      aria-hidden="true"
    >
      {/* Partículas de estrelas SÓ na versão black (dark mode). Na versão white: sem partículas, apenas a cor */}
      {isDark && (
        <>
          <div className="stars-tile stars-tile-0">
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
          </div>
          <div className="stars-tile stars-tile-1">
            <div className="stars-sub-1" />
            <div className="stars-sub-2" />
            <div className="stars-sub-3" />
          </div>
          <div className="stars-tile stars-tile-2">
            <div className="stars-sub-1" />
            <div className="stars-sub-2" />
            <div className="stars-sub-3" />
          </div>
          <div className="stars-tile stars-tile-3">
            <div className="stars-sub-1" />
            <div className="stars-sub-2" />
            <div className="stars-sub-3" />
          </div>
        </>
      )}
    </div>
  );
}

export default StarsBackground;
