"use client";

import { useState, useEffect } from "react";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Novo Contato pelo Site: ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`);
    window.location.href = `mailto:pedroeditorgrafico@gmail.com?subject=${subject}&body=${body}`;
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "clamp(0.75rem, 2vw, 1rem) 1.25rem",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    fontSize: "0.9375rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
  };

  return (
    <section id="contato" style={{ padding: "clamp(6rem, 10vw, 10rem) 0", width: "100%", background: "#000", position: "relative", overflow: "hidden" }}>
      {/* Background Video */}
      {isDesktop && (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.7,
          }}
        >
          <source src="/page-bg.webm" type="video/webm" />
          <source src="/page-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Background Subtle Gradient Overlay */}
      <div 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)", 
          pointerEvents: "none",
          zIndex: 1
        }} 
      />

      <div className="container" style={{ maxWidth: "1200px", position: "relative", zIndex: 2 }}>
        <div
          className="animate-on-scroll"
          style={{
            borderRadius: "40px",
            padding: "clamp(1.5rem, 6vw, 5rem)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left: Content */}
            <div className="animate-fade-slide">
              <div style={{ display: "flex", marginBottom: "2rem" }}>
                <div className="orbai-badge" style={{ background: "#ffffff", color: "#000", borderColor: "#ffffff" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4l3 3"/>
                  </svg>
                  <span>Disponível agora</span>
                </div>
              </div>

              <h2
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  letterSpacing: "-0.05em",
                  fontWeight: 800,
                  lineHeight: 0.95,
                  marginBottom: "2rem",
                  color: "#ffffff",
                }}
              >
                Pronto para o próximo <br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>nível de impacto?</span>
              </h2>

              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.0625rem", lineHeight: 1.6, marginBottom: "3rem", maxWidth: "420px" }}>
                Não fazemos apenas sites. Construímos ativos digitais que exalam autoridade. Fale conosco e vamos desenhar sua nova realidade.
              </p>
              {/* Contact Channels */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { label: "E-mail oficial", value: "pedroeditorgrafico@gmail.com", href: "mailto:pedroeditorgrafico@gmail.com", icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                      <path d="M22 17a2 2 0 01-2 2H4a2 2 0 01-2-2V9.5C2 7 4 5 6.5 5h11C20 5 22 7 22 9.5V17z"/>
                      <path d="m2 9.5 10 6 10-6"/>
                    </svg>
                  )},
                  { label: "Direct via WhatsApp", value: "Conversar agora", href: "https://wa.me/5549991031743", icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  )},
                ].map((c, i) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`animate-fade-slide-${i+1}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      padding: "1.25rem",
                      borderRadius: "20px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      textDecoration: "none",
                      color: "#ffffff",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.color = "#000000";
                      e.currentTarget.querySelector("div")!.style.borderColor = "rgba(0,0,0,0.1)";
                      e.currentTarget.querySelector("svg")!.style.stroke = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.querySelector("div")!.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.querySelector("svg")!.style.stroke = "#ffffff";
                    }}
                  >
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.4s ease"
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: "0.25rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</p>
                      <p style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="animate-fade-slide-2">
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: "0.5rem" }}>
                      Nome completo
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Como podemos te chamar?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: "0.5rem" }}>
                      E-mail corporativo
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="seu@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" style={{ display: "block", fontSize: "0.8125rem", fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: "0.5rem" }}>
                    Fale sobre seu projeto
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="Quais são seus objetivos, prazos e desafios atuais?"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "1.25rem",
                      borderRadius: "18px",
                      fontSize: "1rem",
                      fontWeight: 700,
                      gap: "0.75rem",
                      background: "#ffffff",
                      color: "#000000",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: "0 10px 30px -10px rgba(255,255,255,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 15px 40px -10px rgba(255,255,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(255,255,255,0.2)";
                    }}
                  >
                    Enviar Proposta
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  
                  <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "1.5rem", fontWeight: 500 }}>
                    Ao enviar, você concorda com nossos termos de privacidade. <br />
                    Responderemos em até 2 horas comerciais.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
