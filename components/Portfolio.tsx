"use client";

import Link from "next/link";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { useEffect, useRef } from "react";

/* ── Reveal hook with IntersectionObserver ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("pf-revealed");
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const ArrowIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

/* Linhas de 3 colunas: [largo, estreito] · [estreito, largo] · [largo, estreito] */
const WIDE_INDEXES = [0, 3, 4];

/* ── Card ── */
function ProjectCard({ project, index, eagerImages }: { project: typeof portfolioData[0]; index: number; eagerImages: boolean }) {
  const cardRef = useReveal();
  const isWide = WIDE_INDEXES.includes(index);

  return (
    <div
      ref={cardRef}
      className={`pf-reveal ${isWide ? "pf-card-wide" : "pf-card-narrow"}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="pf-card"
        aria-label={`Ver detalhes do projeto: ${project.title}`}
      >
        <div className="pf-media">
          <Image
            src={project.mockups[0]}
            alt={`${project.title} Cover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={eagerImages && index < 3 ? "eager" : "lazy"}
            className="pf-img"
          />
          <span className="pf-count">{project.mockups.length} fotos</span>
        </div>

        <div className="pf-glass-panel">
          <div className="pf-info-text">
            <p className="pf-category">{project.category}</p>
            <h3 className="pf-title-card">{project.title}</h3>
          </div>
          <span className="pf-arrow">
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ── Main Portfolio Section ── */
// Na home o portfólio fica muitas dobras abaixo: as capas não devem competir com o
// carregamento inicial. Em /portfolio (acima da dobra) as 3 primeiras seguem "eager".
export function Portfolio({ eagerImages = false }: { eagerImages?: boolean }) {
  return (
    <section id="portfolio" className="pf-section">
      <div className="container" style={{ maxWidth: "1280px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <header className="pf-header">
          <span className="pf-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Showcase
          </span>
          <h2 className="pf-main-title">Experiências Imersivas</h2>
          <p className="pf-subtitle">
            Veja como transformamos visões audaciosas em realidades digitais absolutas.
          </p>
        </header>

        {/* Grid */}
        <div className="pf-grid">
          {portfolioData.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} eagerImages={eagerImages} />
          ))}
        </div>

        {/* CTA */}
        <div className="pf-footer">
          <Link href="/portfolio" className="pf-cta-btn">
            <span>Explorar Todos os Projetos</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
