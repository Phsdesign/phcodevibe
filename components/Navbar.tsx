"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#metricas", label: "Métricas" },
  { href: "#precos", label: "Preços" },
  { href: "#contato", label: "Contato" },
];

const MotionLink = motion(Link);

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delay
    }
  })
};

const itemVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.85 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      delay
    }
  })
};

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ticking = useRef(false);
  const base = isMobile ? 3.3 : 0.1;
  const step = 0.12;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      <header className="navbar-header" style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)", opacity: hidden ? 0 : 1, transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)", willChange: "transform" }}>
        <motion.nav 
          className="navbar-nav"
          custom={base}
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          {/* Logo */}
          <MotionLink
            href="/"
            className="navbar-logo-link"
            custom={base + step}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <Image 
              src="/logoicon.svg" 
              alt="Logo" 
              width={24} 
              height={24} 
              priority
              style={{ objectFit: "contain" }}
            />
            <span className="navbar-brand">PH CODE LABS</span>
          </MotionLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((l, i) => (
              <MotionLink
                key={l.href}
                href={l.href}
                className="navbar-link"
                custom={base + step * 2 + i * step}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                {l.label}
              </MotionLink>
            ))}
          </div>

          {/* Right Area */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <MotionLink
              href="/quiz"
              className="navbar-link"
              custom={base + step * 2 + links.length * step}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              style={{ border: "1px solid rgb(var(--ink) / 0.2)", borderRadius: "999px", padding: "0.45rem 0.95rem" }}
            >
              Quiz
            </MotionLink>

            <motion.div
              custom={base + step * 2 + links.length * step}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="hidden md:flex navbar-status-pill"
            >
              <span className="navbar-status-dot-wrapper">
                <span className="navbar-status-dot-ping" />
                <span className="navbar-status-dot" />
              </span>
              <span className="navbar-status-text">Disponível</span>
            </motion.div>

            {/* Alternador White / Dark (Uiverse) */}
            <motion.div
              custom={base + step * 3 + links.length * step}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <ThemeToggle id="navbar-theme-toggle" />
            </motion.div>

            <MotionLink
              href="#contato"
              className="navbar-cta"
              custom={base + step * 4 + links.length * step}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              Começar Projeto
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </MotionLink>

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

              <div style={{ padding: "1rem 0", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", margin: "0.5rem 0 1rem" }}>
                <span style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 600 }}>Versão White / Black</span>
                <ThemeToggle id="drawer-theme-toggle" />
              </div>

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
