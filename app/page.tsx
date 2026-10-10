"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ScrollLogo } from "@/components/ScrollLogo";
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

import { SplashLoader } from "@/components/SplashLoader";
import { CinematicPortal } from "@/components/CinematicPortal";

export default function Home() {
  useScrollObserver();

  return (
    <>
      <SplashLoader />
      <main style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "var(--bg)" }}>
      <Navbar />
      <Hero />
      {/* Cinematic Portal: Localizado na raiz para flutuar por cima de todas as dobras */}
      <div style={{ position: "relative", width: "100%", height: 0, zIndex: 1000, pointerEvents: "none" }}>
        <CinematicPortal />
      </div>
      <FeaturesAI />
      <ScrollLogo />
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
      </div>

      <Team />

      <div aria-hidden="true" style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 1.25rem", height: "1px" }}>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(10, 140, 255, 0.6), #00E5FF, rgba(10, 140, 255, 0.6), transparent)" }} />
      </div>

      <Contact />
      <Footer />
    </main>
    </>
  );
}
