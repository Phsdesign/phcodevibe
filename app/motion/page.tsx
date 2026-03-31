"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Motion() {
  useScrollObserver();

  return (
    <main style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "#ffffff" }}>
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
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <span>Serviços</span>
            </div>
          </div>
          <h1 className="animate-fade-slide-1" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0e1c29", marginBottom: "2rem" }}>
            Motion Design
          </h1>
          <p className="animate-fade-slide-2" style={{ fontSize: "1.1rem", color: "rgba(0,0,0,0.5)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Movimento gera emoção, e emoção gera conversão. Trazemos o seu site à vida com animações fluidas (60fps), micro-interações refinadas e transições imersivas. Deixe as páginas estáticas para os seus concorrentes.
          </p>

          <div className="animate-fade-slide-3" style={{ marginTop: "2rem" }}>
            <a
              href="https://wa.me/5549991031743?text=Olá! Gostaria de adicionar Motion Design imersivo ao meu projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ borderRadius: "9999px", padding: "0.875rem 2rem" }}
            >
              Solicitar Animações
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
