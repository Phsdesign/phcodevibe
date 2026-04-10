"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Portfolio } from "@/components/Portfolio";

export default function PaginaPortfolio() {
  useScrollObserver();

  return (
    <main style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "var(--bg)" }}>
      <Navbar />

      <div style={{ width: "100%", paddingTop: "6rem" }}>
        <Portfolio />
      </div>


      <Footer />
    </main>
  );
}
