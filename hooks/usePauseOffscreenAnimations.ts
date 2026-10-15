"use client";

import { useEffect, type RefObject } from "react";

/**
 * Pausa as animações CSS infinitas (shine, sweep, pulse, marquee…) de uma seção
 * enquanto ela está totalmente fora da viewport, e retoma antes de reentrar.
 *
 * Muitas dessas animações mexem em propriedades que não são do compositor
 * (background-position, box-shadow, text-shadow), então seguiam custando
 * recálculo de estilo a cada frame mesmo invisíveis. O atributo é escrito
 * direto no DOM (sem estado React → sem re-render) e a regra de pausa vive em
 * `app/globals.css` (`[data-anim-offscreen]`). Como só atua fora da tela, não há
 * diferença visual.
 */
export function usePauseOffscreenAnimations(ref: RefObject<HTMLElement | null>, rootMargin = "200px 0px") {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.removeAttribute("data-anim-offscreen");
        else el.setAttribute("data-anim-offscreen", "");
      },
      { rootMargin }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      el.removeAttribute("data-anim-offscreen");
    };
  }, [ref, rootMargin]);
}
