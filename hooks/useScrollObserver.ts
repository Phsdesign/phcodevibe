"use client";

import { useEffect } from "react";

/**
 * Scroll Observer Hook — optimized for performance
 * Adds `.in-view` class to all `.animate-on-scroll` and `.animate-fade-slide` elements.
 * Uses rootMargin to pre-trigger animations before elements are fully visible.
 */
export function useScrollObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -30px 0px",
        threshold: 0.05,
      }
    );

    // Use specific class selectors for better performance
    const elements = document.querySelectorAll(
      ".animate-on-scroll, .animate-fade-slide, .animate-fade-slide-1, .animate-fade-slide-2, .animate-fade-slide-3, .animate-fade-slide-4, .color-reveal"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
