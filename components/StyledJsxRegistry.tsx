"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";

// Registro do styled-jsx para o App Router (padrão da documentação do Next).
// Sem ele, os <style jsx> de Pricing e Team não iam para o HTML estático: eram
// injetados só na hidratação, o que recalculava o estilo da página inteira
// (inclusive o @property do card de oferta) e remontava o layout dessas seções.
export function StyledJsxRegistry({ children }: { children: ReactNode }) {
  const [registry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = registry.styles();
    registry.flush();
    return <>{styles}</>;
  });

  return <StyleRegistry registry={registry}>{children}</StyleRegistry>;
}
