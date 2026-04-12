"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer style={{ padding: "clamp(1.5rem, 4vw, 3rem)", width: "100%", background: "var(--bg)" }}>
      <div 
        className="animate-on-scroll"
        style={{ 
          maxWidth: "1400px", 
          margin: "0 auto", 
          background: "#000", /* Fundo preto fixo no footer para impacto visual */
          borderRadius: "clamp(2rem, 5vw, 4rem)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem) clamp(2rem, 4vw, 3rem)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
        }}
      >
        {/* Background Large Text Overlay */}
        <div 
          style={{ 
            position: "absolute", 
            top: "85%", 
            left: "2%", 
            transform: "translateY(-50%)",
            fontSize: "clamp(10rem, 30vw, 40rem)", 
            fontWeight: 900, 
            color: "#fff", 
            opacity: 0.03,
            userSelect: "none",
            letterSpacing: "-0.08em",
            zIndex: 0,
            whiteSpace: "nowrap",
            lineHeight: 0.8
          }}
        >
          PHCODE
        </div>

        {/* Top Section: CTA & Vision */}
        <div style={{ textAlign: "left", marginBottom: "clamp(4rem, 10vw, 8rem)", position: "relative", zIndex: 1 }}>
          <div className="animate-fade-slide" style={{ display: "flex", marginBottom: "2.5rem" }}>
            <div 
              className="orbai-badge"
              style={{ 
                background: "var(--bg)", 
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)"
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px #4ade80" }}></span>
              Estúdio de Design de Elite
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 animate-fade-slide-1">
              <h2 
                style={{ 
                  fontSize: "clamp(2.5rem, 6vw, 5rem)", 
                  fontWeight: 800, 
                  letterSpacing: "-0.055em", 
                  lineHeight: 0.9, 
                  color: "#fff",
                  marginBottom: "2rem"
                }}
              >
                Transformando visão em <br />
                <span style={{ opacity: 0.2 }}>realidade absoluta.</span>
              </h2>
            </div>
            
            <div className="lg:col-span-4 animate-fade-slide-2" style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <a
                  href="https://wa.me/5549991031743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine-mini"
                  style={{
                    padding: "1rem 2.2rem",
                    borderRadius: "100px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    background: "#fff",
                    color: "#000",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    boxShadow: "0 10px 20px rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease"
                  }}
                >
                  Começar Projeto
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "clamp(4rem, 8vw, 6rem)", position: "relative", zIndex: 1 }} />

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative z-10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 animate-fade-slide">
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "2rem" }}>
              <Image src="/logoicon.svg" alt="Logo" width={32} height={32} />
              <span style={{ fontWeight: 900, fontSize: "1.4rem", letterSpacing: "-0.02em", color: "#fff" }}>PH CODE VIBE</span>
            </div>
            
            <p style={{ color: "#fff", opacity: 0.6, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "400px", fontWeight: 400 }}>
              Arquitetando o futuro digital através de design de elite e engenharia de precisão. Menos ruído, mais conexão absoluta.
            </p>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="animate-fade-slide-1">
              <h4 style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", opacity: 0.3, marginBottom: "2rem" }}>
                Navegação
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <li><Link href="/sobre" style={{ textDecoration: "none", color: "#fff", fontWeight: 600, fontSize: "0.9rem", opacity: 0.7, transition: "opacity 0.2s" }}>Studio</Link></li>
                <li><Link href="/portfolio" style={{ textDecoration: "none", color: "#fff", fontWeight: 600, fontSize: "0.9rem", opacity: 0.7, transition: "opacity 0.2s" }}>Showcase</Link></li>
                <li><Link href="/contato" style={{ textDecoration: "none", color: "#fff", fontWeight: 600, fontSize: "0.9rem", opacity: 0.7, transition: "opacity 0.2s" }}>Briefing</Link></li>
              </ul>
            </div>

            <div className="animate-fade-slide-2">
              <h4 style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", opacity: 0.3, marginBottom: "2rem" }}>
                Social
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <li><a href="https://instagram.com/phcodevibe" target="_blank" style={{ textDecoration: "none", color: "#fff", fontWeight: 600, fontSize: "0.9rem", opacity: 0.7 }}>Instagram</a></li>
                <li><a href="https://behance.net/henriquedesignn" target="_blank" style={{ textDecoration: "none", color: "#fff", fontWeight: 600, fontSize: "0.9rem", opacity: 0.7 }}>Behance</a></li>
              </ul>
            </div>

            <div className="animate-fade-slide-3 sm:col-span-1 col-span-2">
              <h4 style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#fff", opacity: 0.3, marginBottom: "2rem" }}>
                Legal
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <li><Link href="/privacidade" style={{ textDecoration: "none", color: "#fff", opacity: 0.5, fontWeight: 500, fontSize: "0.85rem" }}>Privacy</Link></li>
                <li><Link href="/termos" style={{ textDecoration: "none", color: "#fff", opacity: 0.5, fontWeight: 500, fontSize: "0.85rem" }}>Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "clamp(4rem, 8vw, 6rem)", paddingTop: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.8rem", color: "#fff", opacity: 0.4, fontWeight: 500, letterSpacing: "0.02em" }}>
            © 2025 PH CODE VIBE. MADE BY <span style={{ fontWeight: 700 }}>PEDRO HENRIQUE</span>.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#fff", opacity: 0.5 }}>System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
