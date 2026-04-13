"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#metricas", label: "Métricas" },
  { href: "#precos", label: "Preços" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      
      if (window.innerWidth >= 1024) {
        setHidden(scrollY > 800);
      } else {
        setHidden(false);
      }
      
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

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
      <header className="navbar-header" style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)", opacity: hidden ? 0 : 1, transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <motion.nav 
          className="navbar-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            delay: 3.4 // Sincronizado com o fim do Splash (3.2s + 0.2s)
          }}
        >
          {/* Logo */}
          <Link href="/" className="navbar-logo-link">
            <Image 
              src="/logoicon.svg" 
              alt="Logo" 
              width={24} 
              height={24} 
              priority
              style={{ objectFit: "contain" }}
            />
            <span className="navbar-brand">PH CODE VIBE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="navbar-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right Area */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className="hidden md:flex navbar-status-pill">
              <span className="navbar-status-dot animate-ping" />
              <span className="navbar-status-text">Disponível</span>
            </div>

            <Link href="#contato" className="navbar-cta">
              Começar Projeto
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden"
              onClick={() => setDrawerOpen(!drawerOpen)}
              style={{ background: "transparent", border: "none", color: "#fff", padding: "0.5rem", display: "flex", alignItems: "center" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={drawerOpen ? "M18 6L6 18M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} />
              </svg>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="mobile-drawer-overlay open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />

            <motion.nav 
              className="mobile-drawer open"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <button className="mobile-drawer-close" onClick={closeDrawer}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              {links.map((l) => (
                <Link key={l.href} href={l.href} className="mobile-drawer-link" onClick={closeDrawer}>
                  {l.label}
                </Link>
              ))}

              <a href="https://wa.me/5549991031743" target="_blank" className="mobile-drawer-cta" onClick={closeDrawer}>
                Começar Projeto
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
