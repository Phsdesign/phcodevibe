"use client";

import { useEffect } from "react";
import { onFrame } from "@/lib/frameLoop";

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Em dispositivos móveis e touch, utilizar o scroll nativo de 120Hz do navegador
    const isTouchOrMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    if (isTouchOrMobile) return;

    // Lenis só é baixado no desktop (import dinâmico): no celular o scroll é
    // nativo e o pacote não entra no carregamento.
    let stopFrame: (() => void) | null = null;
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
        autoRaf: false,
      });
      lenis = instance;
      // Lenis anda no relógio único da página (mesmo frame do framer-motion e
      // dos canvas), em vez de um requestAnimationFrame próprio.
      stopFrame = onFrame((time) => instance.raf(time));
    });

    return () => {
      cancelled = true;
      stopFrame?.();
      lenis?.destroy();
    };
  }, []);

  return null;
}
