"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { FeaturesAI } from "@/components/FeaturesAI";
import { Services } from "@/components/Services";
import { Metrics } from "@/components/Metrics";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  useScrollObserver();

  return (
    <main style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "#ffffff" }}>
      <Navbar />
      <Hero />
      <FeaturesAI />
      <Marquee />
      <Services />
      <Metrics />
      <Portfolio />
      <Pricing />
      
      {/* Botão Centralizado Quem Somos Nós */}
      <div style={{ padding: "4rem 0 8rem", textAlign: "center" }}>
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
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "100px",
            color: "#000000",
            fontSize: "0.85rem",
            fontWeight: 900,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          Quem somos nós
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </motion.a>
      </div>

      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
