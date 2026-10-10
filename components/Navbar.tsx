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
              className="navbar-link hidden sm:inline-flex"
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

            <MotionLink
              href="#contato"
              className="navbar-cta hidden sm:inline-flex"
              custom={base + step * 3 + links.length * step}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <span className="navbar-cta-label">Começar Projeto</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
              <span className="navbar-cta-particles" aria-hidden="true">
                <i /><i /><i /><i /><i /><i />
              </span>
            </MotionLink>

            {/* Mobile Hamburger Button */}
            <motion.button
              type="button"
              className="navbar-hamburger lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu de navegação"
              custom={base + step * 3 + links.length * step}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </motion.button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="mobile-drawer-portal">
            <motion.div
              className="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeDrawer}
            />

            <motion.nav 
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              aria-label="Menu principal mobile"
            >
              <div className="mobile-drawer-header">
                <Link href="/" className="navbar-logo-link" onClick={closeDrawer}>
                  <Image 
                    src="/logoicon.svg" 
                    alt="Logo" 
                    width={22} 
                    height={22} 
                    style={{ objectFit: "contain" }}
                  />
                  <span className="navbar-brand text-sm">PH CODE LABS</span>
                </Link>

                <button 
                  type="button"
                  className="mobile-drawer-close" 
                  onClick={closeDrawer}
                  aria-label="Fechar menu"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="mobile-drawer-status">
                <span className="navbar-status-dot-wrapper">
                  <span className="navbar-status-dot-ping" />
                  <span className="navbar-status-dot" />
                </span>
                <span className="navbar-status-text">Disponível para novos projetos</span>
              </div>

              <div className="mobile-drawer-links">
                {links.map((l) => (
                  <Link 
                    key={l.href} 
                    href={l.href} 
                    className="mobile-drawer-link" 
                    onClick={closeDrawer}
                  >
                    <span>{l.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </Link>
                ))}

                <Link 
                  href="/quiz" 
                  className="mobile-drawer-link mobile-drawer-quiz" 
                  onClick={closeDrawer}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>Quiz Interativo</span>
                    <span className="mobile-quiz-badge">Novo</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              </div>

              <div className="mobile-drawer-footer">
                <a 
                  href="#contato" 
                  className="mobile-drawer-cta primary" 
                  onClick={closeDrawer}
                >
                  Começar Projeto
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/5549991031743" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mobile-drawer-cta secondary" 
                  onClick={closeDrawer}
                >
                  Falar no WhatsApp
                </a>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
