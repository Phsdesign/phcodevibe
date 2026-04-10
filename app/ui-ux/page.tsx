"use client";

import { useScrollObserver } from "@/hooks/useScrollObserver";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function UiUx() {
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
            bottom: "-10%", 
            left: "-5%", 
            width: "50%", 
            height: "70%", 
            background: "radial-gradient(circle, rgba(0,0,0,0.01) 0%, transparent 70%)", 
            pointerEvents: "none" 
          }} 
        />

        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Visual Element (Left for asymmetry contrast with IA page) */}
            <div className="lg:col-span-5 order-2 lg:order-1 animate-fade-slide-left">
              <div 
                style={{ 
                  width: "100%", 
                  aspectRatio: "1.2", 
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
                <div style={{ transform: "rotate(-10deg) scale(1.2)", opacity: 0.02, position: "absolute", fontWeight: 900, fontSize: "12rem", pointerEvents: "none" }}>UX</div>
                
                {/* Visual Representation of Grid/Layout */}
                <div className="animate-float-delayed" style={{ width: "240px", height: "320px", background: "#fafafa", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.05)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ width: "40%", height: "8px", background: "#000", opacity: 0.1, borderRadius: "4px" }} />
                  <div style={{ width: "100%", height: "30%", background: "#000", opacity: 0.03, borderRadius: "12px" }} />
                  <div className="grid grid-cols-2 gap-2" style={{ height: "40%" }}>
                    <div style={{ background: "#000", opacity: 0.05, borderRadius: "8px" }} />
                    <div style={{ background: "#000", opacity: 0.05, borderRadius: "8px" }} />
                  </div>
                  <div style={{ width: "80%", height: "40px", background: "#000", borderRadius: "10px", marginTop: "auto" }} />
                </div>
              </div>
            </div>

            {/* Content (Right) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="animate-fade-slide" style={{ display: "flex", marginBottom: "2.5rem" }}>
                <div className="orbai-badge" style={{ background: "#000", color: "#fff", borderColor: "#000" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <path d="M9 3v18M3 9h18"/>
                  </svg>
                  <span>CRAFTED EXPERIENCE</span>
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
                Design que <br />
                <span style={{ color: "rgba(0,0,0,0.15)" }}>exala autoridade.</span>
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
                Interfaces que convertem visitantes em clientes nos primeiros 3 segundos. Arquitetura de informação baseada em psicologia comportamental e estética de classe mundial.
              </p>

              <div className="animate-fade-slide-3">
                <a
                  href="https://wa.me/5549991031743?text=Olá! Gostaria de conversar sobre um projeto de UI/UX."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ 
                    padding: "1.25rem 3rem", 
                    borderRadius: "20px", 
                    fontSize: "1rem", 
                    fontWeight: 700 
                  }}
                >
                  Solicitar Briefing
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
