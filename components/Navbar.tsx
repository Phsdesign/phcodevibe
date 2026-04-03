"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#metricas", label: "Métricas" },
  { href: "#precos", label: "Preços" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      setScrolled(window.scrollY > 40);
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header role="banner" className={`navbar-header ${scrolled ? "navbar-scrolled" : ""}`}>
      <nav className="container navbar-nav">
        {/* Logo */}
        <Link href="/" className="navbar-logo-link" aria-label="Ir para a página inicial">
          <Image src="/logoicon.svg" alt="PH Code Vibe Logo" width={28} height={28} style={{ objectFit: "contain" }} priority />
          <span className="navbar-brand">PH CODE VIBE</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="navbar-link">
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="hidden md:flex navbar-status-pill">
            <span className="navbar-status-dot" />
            <span className="navbar-status-text">Disponível</span>
          </div>

          <Link href="#contato" className="navbar-cta" aria-label="Iniciar novo projeto">
            Começar Projeto
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
        </div>
      </nav>

    </header>
  );
}
