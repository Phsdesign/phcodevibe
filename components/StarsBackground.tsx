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
      setIsVisible(true);
      return;
    }

    // Na home: oculta na Hero (dobra 1) e ativa a partir da dobra 2
    const checkScroll = () => {
      const heroElement = document.getElementById("hero");
      const heroHeight = heroElement ? heroElement.offsetHeight : 600;
      // Começa a transição suave quando o usuário começa a sair da Hero em direção à dobra 2
      const scrolledToSecondFold = window.scrollY > Math.max(200, heroHeight * 0.45);
      setIsVisible(scrolledToSecondFold);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
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
