"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function WebDev() {
  useScrollObserver();

  return (
    <main style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "var(--bg)" }}>
      <Navbar />

      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12rem 0 8rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ maxWidth: "800px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="animate-fade-slide" style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div className="orbai-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              <span>Serviços</span>
            </div>
          </div>
          <h1 className="animate-fade-slide-1" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "2rem" }}>
            Desenvolvimento Web
          </h1>
          <p className="animate-fade-slide-2" style={{ fontSize: "1.1rem", color: "rgba(0,0,0,0.5)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Performance no estado da arte. Desenvolvemos com as tecnologias mais modernas (Next.js, React, Tailwind) garantindo que a sua aplicação carregue em milissegundos, ranqueie no topo do Google e proporcione uma experiência sem fricções.
          </p>

          <div className="animate-fade-slide-3" style={{ marginTop: "2rem" }}>
            <a
              href="https://wa.me/5549991031743?text=Olá! Preciso de um Desenvolvimento Web de alta performance."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ borderRadius: "9999px", padding: "0.875rem 2rem" }}
            >
              Solicitar Arquiteto Web
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
