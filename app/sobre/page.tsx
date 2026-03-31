"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Sobre() {
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
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span>Nossa Essência</span>
            </div>
          </div>
          <h1 className="animate-fade-slide-1" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0e1c29", marginBottom: "2rem" }}>
            A Nova Era do Design Digital
          </h1>
          <p className="animate-fade-slide-2" style={{ fontSize: "1.1rem", color: "rgba(0,0,0,0.5)", lineHeight: 1.8, marginBottom: "3rem" }}>
            Não somos apenas uma agência. Na PH Code Vibe, operamos como um estúdio de inovação de alto padrão. Nosso manifesto é simples: forjar experiências imersivas que desafiam o status quo e transformam marcas comuns em autoridades indiscutíveis no mercado digital.
          </p>

          <div className="animate-fade-slide-3 grid grid-cols-1 md:grid-cols-2 gap-6 text-left" style={{ marginTop: "4rem" }}>
            <div style={{ padding: "2rem", borderRadius: "20px", background: "#f5f5f5", border: "1px solid rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#0e1c29", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>A Visão</h3>
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                Acreditamos que a estética premium e a inteligência artificial não são o futuro, mas a linguagem obrigatória do presente. Cada pixel é desenhado com intenção. Cada linha de código é otimizada para o máximo desempenho (Core Web Vitals) e conversão.
              </p>
            </div>
            <div style={{ padding: "2rem", borderRadius: "20px", background: "#f5f5f5", border: "1px solid rgba(0,0,0,0.06)" }}>
              <h3 style={{ color: "#0e1c29", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>O Diferencial</h3>
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                Enquanto o mercado entrega templates invisíveis, nós integramos Motion Design avançado, arquitetura serverless e copywriting obsessivo por resultados. Criamos o seu &quot;Oceano Azul&quot;.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
