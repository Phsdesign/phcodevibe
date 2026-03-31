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

export default function Home() {
  useScrollObserver();

  return (
    <main style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "#ffffff" }}>
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturesAI />
      <Services />
      <Metrics />
      <Portfolio />
      <Pricing />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
