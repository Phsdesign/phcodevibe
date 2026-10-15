"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Em dispositivos móveis e touch, utilizar o scroll nativo de 120Hz do navegador
    const isTouchOrMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    if (isTouchOrMobile) return;

    // Lenis só é baixado no desktop (import dinâmico): no celular o scroll é
    // nativo e o pacote não entra no carregamento.
    let frame = 0;
    let lenis: import("lenis").default | null = null;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
      });
      lenis = instance;
      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
