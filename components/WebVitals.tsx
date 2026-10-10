"use client";

import { useReportWebVitals } from "next/web-vitals";

declare global {
  interface Window {
    __webVitals?: Record<
      string,
      {
        id: string;
        name: string;
        value: number;
        rating: "good" | "needs-improvement" | "poor";
        navigationType: string;
        timestamp: number;
      }
    >;
  }
}

/**
 * WebVitals Monitor Component
 * Em conformidade com a skill de Core Web Vitals (LCP, INP, CLS, FCP, TTFB).
 * Monitora e atribui métricas de performance sem alterar nenhum elemento visual da tela (zero impacto no layout/UI).
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    const isDev = process.env.NODE_ENV === "development";
    const debugParam =
      typeof window !== "undefined" &&
      window.location.search.includes("vitals=true");

    // Armazena no objeto window para diagnóstico do desenvolvedor ou ferramentas
    if (typeof window !== "undefined") {
      window.__webVitals = window.__webVitals || {};
      window.__webVitals[metric.name] = {
        id: metric.id,
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        navigationType: metric.navigationType,
        timestamp: Date.now(),
      };
    }

    // Exibe diagnóstico formatado no console quando em dev ou via query param ?vitals=true
    if (isDev || debugParam) {
      const color =
        metric.rating === "good"
          ? "#10B981"
          : metric.rating === "needs-improvement"
          ? "#F59E0B"
          : "#EF4444";

      const formattedValue =
        metric.name === "CLS"
          ? metric.value.toFixed(3)
          : `${Math.round(metric.value)}ms`;

      console.groupCollapsed(
        `%c[Core Web Vitals] ${metric.name}: ${formattedValue} (${metric.rating.toUpperCase()})`,
        `color: ${color}; font-weight: bold; font-family: monospace;`
      );
      console.log("Métrica detalhada:", metric);
      console.log(
        "Alvo Google (p75):",
        metric.name === "LCP"
          ? "Bom: ≤ 2.5s | Ajustar: 2.5s - 4.0s | Ruim: > 4.0s"
          : metric.name === "INP"
          ? "Bom: ≤ 200ms | Ajustar: 200ms - 500ms | Ruim: > 500ms"
          : metric.name === "CLS"
          ? "Bom: ≤ 0.1 | Ajustar: 0.1 - 0.25 | Ruim: > 0.25"
          : metric.name === "FCP"
          ? "Bom: ≤ 1.8s | Ajustar: 1.8s - 3.0s | Ruim: > 3.0s"
          : metric.name === "TTFB"
          ? "Bom: ≤ 800ms | Ajustar: 800ms - 1800ms | Ruim: > 1800ms"
          : ""
      );
      console.groupEnd();
    }
  });

  return null;
}
