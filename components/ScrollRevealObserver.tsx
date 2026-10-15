"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";

// Ponte client mínima para o hook de reveal, permitindo que a página seja Server Component.
export function ScrollRevealObserver() {
  useScrollObserver();
  return null;
}
