"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AIAutomation() {
  useScrollObserver();

  return (
    <main style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fafafa" }}>
      <Navbar />

      <section
        style={{
          width: "100%",
          padding: "clamp(8rem, 15vw, 15rem) 0 clamp(6rem, 10vw, 10rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Decorative Mesh */}
        <div 
          style={{ 
            position: "absolute", 
            top: "-20%", 
            right: "-10%", 
            width: "60%", 
            height: "80%", 
            background: "radial-gradient(circle, rgba(0,0,0,0.015) 0%, transparent 70%)", 
            pointerEvents: "none" 
          }} 
        />

        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7">
              <div className="animate-fade-slide" style={{ display: "flex", marginBottom: "2.5rem" }}>
                <div className="orbai-badge" style={{ background: "#000", color: "#fff", borderColor: "#000" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v8l6-4-6-4zM12 14v8l-6-4 6-4z"/>
                  </svg>
                  <span>AI NATIVE STUDIO</span>
                </div>
              </div>

              <h1 
                className="animate-fade-slide-1" 
                style={{ 
                  fontSize: "clamp(3rem, 7vw, 6rem)", 
                  fontWeight: 800, 
                  letterSpacing: "-0.06em", 
                  lineHeight: 0.9, 
                  color: "var(--text-primary)", 
                  marginBottom: "2.5rem" 
                }}
              >
                O futuro já <br />
                <span style={{ color: "rgba(0,0,0,0.15)" }}>não dorme.</span>
              </h1>

              <p 
                className="animate-fade-slide-2" 
                style={{ 
                  fontSize: "clamp(1rem, 2vw, 1.25rem)", 
                  color: "rgba(0,0,0,0.5)", 
                  lineHeight: 1.6, 
                  marginBottom: "3.5rem", 
                  maxWidth: "540px" 
                }}
              >
                Desenvolvemos o cérebro digital da sua empresa. Automações que não apenas executam tarefas, mas tomam decisões estratégicas 24/7 para escalar seu lucro.
              </p>

              <div className="animate-fade-slide-3" style={{ display: "flex", justifyContent: "flex-start" }}>
                <a
                  href="https://wa.me/5549991031743?text=Olá! Gostaria de conversar sobre Automação com Inteligência Artificial."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    padding: "1.25rem 2.5rem",
                    borderRadius: "16px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    width: "auto",
                    minWidth: "min-content"
                  }}
                >
                  Solicitar Auditoria Gratuita
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>            </div>

            {/* Right: Visual Element (Minimalist) */}
            <div className="lg:col-span-5 animate-fade-slide-delayed" style={{ position: "relative" }}>
              <div 
                style={{ 
                  width: "100%", 
                  aspectRatio: "1", 
                  background: "var(--bg)", 
                  borderRadius: "40px", 
                  border: "1px solid rgba(0,0,0,0.04)", 
                  boxShadow: "0 40px 100px -20px rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div style={{ transform: "scale(1.5)", opacity: 0.03, position: "absolute", fontWeight: 900, fontSize: "10rem", pointerEvents: "none" }}>AI</div>
                <div 
                  className="animate-float" 
                  style={{ 
                    padding: "2rem", 
                    borderRadius: "24px", 
                    background: "#fafafa", 
                    border: "1px solid rgba(0,0,0,0.05)",
                    zIndex: 1
                  }}
                >
                  <pre style={{ fontSize: "0.75rem", color: "var(--text-primary)", fontFamily: "monospace", opacity: 0.6 }}>
                    {`{
  "system": "ORBAI",
  "status": "scaling",
  "optimization": 0.98,
  "roi_boost": "400%"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
