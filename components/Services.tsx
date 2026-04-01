"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const services = [
  {
    id: 2,
    title: "Motion Design",
    desc: "Injetamos movimento e vida em cada frame.",
    long_desc: "Motion é a linguagem do futuro. Criamos animações que não apenas decoram, mas comunicam. Cada movimento tem propósito cinematográfico.",
    tag: "MOTION",
    gridSize: "medium",
    href: "/motion",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Vibe Code",
    desc: "IA encontra design de elite em um fluxo único.",
    long_desc: "A fusão perfeita entre inteligência artificial e estética elite. Criamos conteúdo que não existe em lugar nenhum: único, memorável, extraordinário.",
    tag: "SIGNATURE",
    gridSize: "medium",
    href: "/ia",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Design UI/UX",
    desc: "Interfaces que pensam no usuário e focam em conversão.",
    long_desc: "Design que converte. Criamos interfaces onde cada pixel tem propósito. Estética refinada encontra usabilidade intuitiva.",
    tag: "DESIGN",
    gridSize: "small",
    href: "/ui-ux",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Landing Pages",
    desc: "Páginas de alta performance com design autoral.",
    long_desc: "Sua landing page é seu melhor vendedor. Construímos páginas que hipnotizam visitantes e os convertem em clientes.",
    tag: "WEB",
    gridSize: "small",
    href: "/web",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "SEO & Performance",
    desc: "Otimização técnica profunda e arquitetura estratégica.",
    long_desc: "SEO é a arma secreta das marcas extraordinárias. Otimização técnica profunda, arquitetura estratégica e velocidade extrema.",
    tag: "GROWTH",
    gridSize: "medium",
    href: "/web",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Id Visual",
    desc: "Identidades que impõe respeito e autoridade.",
    long_desc: "Mais que um logo, uma marca absoluta. Criamos sistemas visuais completos que transmitem poder, sofisticação e a essência única do seu negócio.",
    tag: "BRAND",
    gridSize: "medium",
    href: "/ui-ux",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.5 3.5L12 9 8.5 5.5 12 2z" />
        <path d="M12 22l-3.5-3.5L12 15l3.5 3.5L12 22z" />
        <path d="M22 12l-3.5 3.5L15 12l3.5-3.5L22 12z" />
        <path d="M2 12l3.5-3.5L9 12l-3.5 3.5L2 12z" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const gridSizeClass = isDesktop ? {
    large: { gridColumn: "span 2", minHeight: "450px" },
    medium: { gridColumn: "span 1", minHeight: "380px" },
    small: { gridColumn: "span 1", minHeight: "300px" },
  }[service.gridSize] : { gridColumn: "span 1", minHeight: "300px" };

  // Alterna a direção: índices pares vêm da esquerda (-x), ímpares da direita (+x)
  const initialX = isDesktop ? (index % 2 === 0 ? -100 : 100) : 0;
  const initialY = isDesktop ? 0 : 40;

  return (
    <Link href={service.href} scroll={false} style={{ display: "contents", textDecoration: "none" }}>
      <motion.div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalhes do serviço: ${service.title}`}
        initial={{ opacity: 0, x: initialX, y: initialY }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          delay: index * 0.1, 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      style={{
        ...gridSizeClass,
        position: "relative",
        borderRadius: "32px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        padding: "clamp(2rem, 5vw, 3rem)",
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isHovered 
          ? "var(--shadow-lg)" 
          : "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "6px 14px",
          borderRadius: "100px",
          background: "#f8f9fa",
          border: "1px solid #e9ecef",
          fontSize: "11px",
          fontWeight: 700,
          color: "#6c757d",
          letterSpacing: "0.05em",
          marginBottom: "2rem",
        }}>
          {service.tag}
        </div>

        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: "#f8f9fa",
          border: "1px solid #e9ecef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0e1c29",
          marginBottom: "2rem",
        }}>
          {service.icon}
        </div>

        <div style={{ marginTop: "auto" }}>
          <h3 style={{
            fontSize: service.gridSize === "large" ? "2.5rem" : "1.75rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
            lineHeight: 1.1
          }}>
            {service.title}
          </h3>
          <p style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            marginBottom: "1.5rem",
            maxWidth: "90%"
          }}>
            {service.desc}
          </p>
        </div>
      </div>
    </motion.div>
  </Link>
);
}

export function Services() {
  return (
    <section
      id="servicos"
      style={{
        padding: "120px 0",
        background: "#ffffff",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#f8f9fa",
            border: "1px solid #e9ecef",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "2rem",
            fontSize: "12px",
            fontWeight: 700,
            color: "#0e1c29",
            letterSpacing: "0.1em",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            SERVIÇOS
          </div>

          <h2 style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            color: "#0e1c29",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "1.5rem",
          }}>
            Experiências de Elite
          </h2>
          <p style={{
            fontSize: "1.2rem",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            Design que não apenas existe — domina. Transformamos visões audaciosas em realidades digitais absolutas.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
          gap: "24px",
        }}>
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
