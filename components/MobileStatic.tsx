"use client";

import { MotionGlobalConfig } from "framer-motion";

// Versão mobile estática: no celular as animações do framer-motion pulam direto
// para o estado final (sem rodar frames em JS). O CSS em mobile-fix.css já deixa
// o conteúdo visível desde o HTML; isto só evita o trabalho de animação à toa.
if (typeof window !== "undefined" && window.innerWidth < 768) {
  MotionGlobalConfig.skipAnimations = true;
}

export function MobileStatic() {
  return null;
}
