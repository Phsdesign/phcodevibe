import { ScrollRevealObserver } from "@/components/ScrollRevealObserver";
import { AboutButton } from "@/components/AboutButton";
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

import { SplashLoader } from "@/components/SplashLoader";
import { CinematicPortal } from "@/components/CinematicPortal";

export default function Home() {
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
        <AboutButton />
      </div>

      <Team />

      <div aria-hidden="true" style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 1.25rem", height: "1px" }}>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(10, 140, 255, 0.6), #00E5FF, rgba(10, 140, 255, 0.6), transparent)" }} />
      </div>

      <Contact />
      <Footer />
      <ScrollRevealObserver />
    </main>
    </>
  );
}
