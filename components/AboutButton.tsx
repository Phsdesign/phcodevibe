"use client";

import { motion } from "framer-motion";

// Único trecho interativo que estava em app/page.tsx: isolado como folha client
// para que a página em si seja renderizada como Server Component.
export function AboutButton() {
  return (
    <motion.a 
      href="#sobre"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "1.2rem 3rem",
        background: "rgba(255, 255, 255, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "100px",
        color: "#ffffff",
        fontSize: "0.85rem",
        fontWeight: 900,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        textDecoration: "none",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      Quem somos nós
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </motion.a>
  );
}
