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
          el.classList.add("portfolio-revealed");
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

/* ── Card Component — CSS-driven hover, minimal JS ── */
function ProjectCard({ project, index }: { project: typeof portfolioData[0]; index: number }) {
  const cardRef = useReveal();
  const isLarge = index === 0 || index === 3;

  return (
    <div
      ref={cardRef}
      className={`portfolio-card-reveal ${isLarge ? "portfolio-card-large" : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link 
        href={`/portfolio/${project.slug}`} 
        className="portfolio-card-link"
        aria-label={`Ver detalhes do projeto: ${project.title}`}
      >
        <div className="portfolio-card-immersive">
          {/* Image */}
          <div className="portfolio-image-wrapper">
            <Image
              src={project.mockups[0]}
              alt={`${project.title} Cover`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading={index < 3 ? "eager" : "lazy"}
              className="portfolio-card-img"
            />

            {/* Gradient overlay */}
            <div className="portfolio-overlay-gradient" />

            {/* Project number */}
            <div className="portfolio-project-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Mockup count */}
            <div className="portfolio-mockup-count">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="2"/>
                <path d="M2 16l5-5 4 4 4-6 7 7"/>
              </svg>
              {project.mockups.length} fotos
            </div>

            {/* Hover view label */}
            <div className="portfolio-hover-info">
              <span className="portfolio-view-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M20.188 10.934c.388.472.582.707.582 1.066s-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18c-3.636 0-6.768-3.21-8.188-4.934C3.424 12.594 3.23 12.36 3.23 12s.194-.594.582-1.066C5.232 9.21 8.364 6 12 6c3.636 0 6.768 3.21 8.188 4.934z"/>
                </svg>
                Ver Projeto
              </span>
            </div>
          </div>

          {/* Info bar */}
          <div className="portfolio-info-bar">
            <div>
              <p className="portfolio-category">{project.category}</p>
              <h3 className="portfolio-title">{project.title}</h3>
            </div>
            <div className="portfolio-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ── Main Portfolio Section ── */
export function Portfolio() {
  return (
    <section id="portfolio" className="portfolio-immersive-section">
      <div className="container" style={{ maxWidth: "1280px" }}>
        {/* Header */}
        <div className="portfolio-header animate-on-scroll">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div className="orbai-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <span>Showcase</span>
            </div>
          </div>
          <h2 className="portfolio-main-title">
            Experiências Imersivas
          </h2>
          <p className="portfolio-subtitle">
            Veja como transformamos visões audaciosas em realidades digitais absolutas.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="portfolio-bento-grid">
          {portfolioData.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="animate-on-scroll" style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link href="/portfolio" className="portfolio-cta-btn">
            <span>Explorar Todos os Projetos</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
        </div>
      </div>

    </section>
  );
}
