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
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header role="banner" className={`navbar-header ${scrolled ? "navbar-scrolled" : ""}`}>
        <nav className="container navbar-nav">
          {/* Logo */}
          <Link href="/" className="navbar-logo-link" aria-label="Ir para a página inicial">
            <Image src="/logoicon.svg" alt="PH Code Vibe Logo" width={28} height={28} style={{ objectFit: "contain" }} priority />
            <span className="navbar-brand">PH CODE VIBE</span>
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="navbar-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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

            {/* Hamburger Button — Only visible on mobile via CSS */}
            <button
              className={`mobile-hamburger ${drawerOpen ? "open" : ""}`}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Abrir menu de navegação"
              style={{ display: "none" }}  /* Hidden by default; CSS shows it on mobile */
            >
              <span />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${drawerOpen ? "open" : ""}`}
        onClick={closeDrawer}
        style={{ display: "none" }}
        aria-hidden={!drawerOpen}
      />

      {/* Mobile Drawer */}
      <nav
        className={`mobile-drawer ${drawerOpen ? "open" : ""}`}
        style={{ display: "none" }}
        role="navigation"
        aria-label="Menu principal mobile"
      >
        {/* Close button */}
        <button
          className="mobile-drawer-close"
          onClick={closeDrawer}
          aria-label="Fechar menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Links */}
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="mobile-drawer-link"
            onClick={closeDrawer}
          >
            {l.label}
          </Link>
        ))}

        {/* CTA */}
        <a
          href="https://wa.me/5549991031743"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-drawer-cta"
          onClick={closeDrawer}
        >
          Começar Projeto
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </a>
      </nav>
    </>
  );
}
