"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer style={{ padding: "clamp(1.5rem, 4vw, 3rem)", width: "100%", background: "#ffffff" }}>
      <div 
        className="animate-on-scroll"
        style={{ 
          maxWidth: "1400px", 
          margin: "0 auto", 
          background: "#ffffff", 
          borderRadius: "clamp(2rem, 5vw, 4rem)",
          border: "1px solid rgba(0,0,0,0.03)",
          padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem) clamp(2rem, 4vw, 3rem)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 60px 120px -20px rgba(0,0,0,0.03)"
        }}
      >
        {/* Background Large Text Overlay (Refined) */}
        <div 
          style={{ 
            position: "absolute", 
            top: "85%", 
            left: "2%", 
            transform: "translateY(-50%)",
            fontSize: "clamp(10rem, 30vw, 40rem)", 
            fontWeight: 900, 
            color: "rgba(0,0,0,0.03)", 
            pointerEvents: "none",
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
                background: "rgba(0,0,0,0.02)", 
                border: "1px solid rgba(0,0,0,0.05)",
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
                  color: "#0e1c29",
                  marginBottom: "2rem"
                }}
              >
                Transformando visão em <br />
                <span style={{ color: "rgba(0,0,0,0.1)" }}>realidade absoluta.</span>
              </h2>
            </div>
            
            <div className="lg:col-span-4 animate-fade-slide-2" style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <a
                  href="https://wa.me/5549991031743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    padding: "1.25rem 2.5rem",
                    borderRadius: "18px",
                    fontWeight: 700,
                    fontSize: "1rem"
                  }}
                >
                  Começar Projeto
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div style={{ width: "100%", height: "1px", background: "rgba(0,0,0,0.03)", marginBottom: "clamp(4rem, 8vw, 6rem)", position: "relative", zIndex: 1 }} />

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative z-10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 animate-fade-slide">
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "2rem" }}>
              <Image src="/logoicon.svg" alt="Logo" width={36} height={36} />
              <span style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.04em" }}>PH CODE VIBE</span>
            </div>
            
            <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "400px", fontWeight: 500 }}>
              Arquitetando o futuro digital através de design de elite e engenharia de precisão. Menos ruído, mais conexão absoluta.
            </p>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="animate-fade-slide-1">
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.25)", marginBottom: "2rem" }}>
                Navegação
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <li><Link href="/sobre" style={{ textDecoration: "none", color: "#0e1c29", fontWeight: 600, fontSize: "0.9375rem", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.6"}>Studio</Link></li>
                <li><Link href="/portfolio" style={{ textDecoration: "none", color: "#0e1c29", fontWeight: 600, fontSize: "0.9375rem", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.6"}>Showcase</Link></li>
                <li><Link href="/contato" style={{ textDecoration: "none", color: "#0e1c29", fontWeight: 600, fontSize: "0.9375rem", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.6"}>Briefing</Link></li>
              </ul>
            </div>

            <div className="animate-fade-slide-2">
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.25)", marginBottom: "2rem" }}>
                Social
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <li><a href="https://instagram.com/phcodevibe" target="_blank" style={{ textDecoration: "none", color: "#0e1c29", fontWeight: 600, fontSize: "0.9375rem", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.6"}>Instagram</a></li>
                <li><a href="https://behance.net/henriquedesignn" target="_blank" style={{ textDecoration: "none", color: "#0e1c29", fontWeight: 600, fontSize: "0.9375rem", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.6"}>Behance</a></li>
              </ul>
            </div>

            <div className="animate-fade-slide-3 sm:col-span-1 col-span-2">
              <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(0,0,0,0.25)", marginBottom: "2rem" }}>
                Legal
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <li><Link href="/privacidade" style={{ textDecoration: "none", color: "rgba(0,0,0,0.4)", fontWeight: 500, fontSize: "0.875rem" }}>Privacy</Link></li>
                <li><Link href="/termos" style={{ textDecoration: "none", color: "rgba(0,0,0,0.4)", fontWeight: 500, fontSize: "0.875rem" }}>Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.03)", marginTop: "clamp(4rem, 8vw, 6rem)", paddingTop: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.875rem", color: "rgba(0,0,0,0.3)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            © 2025 PH CODE VIBE. MADE BY <span style={{ color: "#000" }}>PEDRO HENRIQUE</span>.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#000" }}>System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
