"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   IMMERSIVE PROJECT PAGE — Premium Optimized
   ═══════════════════════════════════════════════ */

function useScrollToTop() {
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    requestAnimationFrame(() => { window.scrollTo(0, 0); });
  }, [slug]);
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("proj-revealed");
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useParallax(speed = 0.04) {
  const ref = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.innerWidth < 768) return;

    const handler = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [speed]);
  return ref;
}

function GalleryImage({
  src,
  alt,
  index,
  total
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
}) {
  const revealRef = useReveal(0.08);
  const parallaxRef = useParallax(0.03);
  const isWide = index === 0 || index % 3 === 0;

  return (
    <div
      ref={revealRef}
      className={`proj-gallery-item ${isWide ? "proj-gallery-wide" : "proj-gallery-regular"}`}
      style={{ transitionDelay: `${(index % 4) * 60}ms` }}
    >
      <div className="proj-image-container" style={{ cursor: "default" }}>
        <div ref={parallaxRef} className="proj-image-parallax">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="proj-image-number" style={{ background: "var(--grad-brand)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className="proj-image-gradient" />
      </div>
    </div>
  );
}

function ProjectNav({ currentSlug }: { currentSlug: string }) {
  const currentIdx = portfolioData.findIndex((p) => p.slug === currentSlug);
  const prev = currentIdx > 0 ? portfolioData[currentIdx - 1] : null;
  const next = currentIdx < portfolioData.length - 1 ? portfolioData[currentIdx + 1] : null;
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="proj-gallery-item proj-nav-section">
      <div className="proj-nav-grid">
        {prev ? (
          <Link href={`/portfolio/${prev.slug}`} className="proj-nav-card" style={{ background: "var(--grad-brand)", borderColor: "rgba(255,255,255,0.1)" }} scroll={true}>
            <span className="proj-nav-label" style={{ color: "#fff", opacity: 0.4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5m0 0l7 7m-7-7l7-7"/>
              </svg>
              Projeto Anterior
            </span>
            <span className="proj-nav-title" style={{ color: "#fff" }}>{prev.title}</span>
            <span className="proj-nav-cat" style={{ color: "#fff", opacity: 0.4 }}>{prev.category}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/portfolio/${next.slug}`} className="proj-nav-card proj-nav-card-right" style={{ background: "var(--grad-brand)", borderColor: "rgba(255,255,255,0.1)" }} scroll={true}>
            <span className="proj-nav-label" style={{ color: "#fff", opacity: 0.4 }}>
              Próximo Projeto
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m0 0l-7-7m7 7l-7 7"/>
              </svg>
            </span>
            <span className="proj-nav-title" style={{ color: "#fff" }}>{next.title}</span>
            <span className="proj-nav-cat" style={{ color: "#fff", opacity: 0.4 }}>{next.category}</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

export default function ProjectPage({ slug: propSlug }: { slug?: string }) {
  const params = useParams();
  const slug = propSlug || params?.slug;
  const router = useRouter();
  const project = portfolioData.find((p) => p.slug === slug);

  useScrollToTop();

  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const handler = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(total > 0 ? window.scrollY / total : 0);
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const heroRevealRef = useReveal(0.05);
  const challengeRef = useReveal();
  const solutionRef = useReveal();

  useEffect(() => {
    if (!project) router.push("/");
  }, [project, router]);

  if (!project) return null;

  const currentIdx = portfolioData.findIndex((p) => p.slug === slug);

  return (
    <main className="proj-page-main" style={{ background: "var(--bg)", color: "var(--text-primary)" }}>
      <Navbar />

      <div
        className="proj-scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})`, background: "var(--text-primary)" }}
      />

      {/* ── HERO SECTION ── */}
      <section className="proj-hero" style={{ background: "var(--bg)" }}>
        <div className="container">
          <Link href="/#portfolio" className="proj-back-link" style={{ color: "var(--text-primary)", opacity: 0.4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5m0 0l7 7m-7-7l7-7"/>
            </svg>
            Voltar ao Portfólio
          </Link>

          <div ref={heroRevealRef} className="proj-gallery-item">
            <div className="proj-category-badge">
              <span style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}>{project.category}</span>
            </div>
            <h1 className="proj-title" style={{ color: "var(--text-primary)" }}>{project.title}</h1>
            <div className="proj-meta-row">
              <div className="proj-meta-item" style={{ color: "var(--text-primary)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M2 16l5-5 4 4 4-6 7 7"/>
                </svg>
                <span>{project.mockups.length} imagens</span>
              </div>
              <div className="proj-meta-item" style={{ color: "var(--text-primary)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/>
                </svg>
                <span>Projeto #{String(currentIdx + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="proj-hero-image-section">
        <div className="proj-hero-image-wrapper" style={{ cursor: "default", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <Image
            src={project.mockups[0]}
            alt={`${project.title} Hero`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="proj-hero-image-overlay" />
        </div>
      </section>

      {/* ── CHALLENGE SECTION ── */}
      <section className="proj-text-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div ref={challengeRef} className="proj-gallery-item proj-text-block">
            <div className="proj-section-label">
              <div className="proj-section-line" style={{ background: "var(--text-primary)" }} />
              <span style={{ color: "var(--text-primary)" }}>O Desafio</span>
            </div>
            <p className="proj-text-content" style={{ color: "var(--text-primary)", opacity: 0.7 }}>{project.challenge}</p>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="proj-gallery-section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div className="proj-gallery-header">
            <h2 className="proj-gallery-title" style={{ color: "var(--text-primary)" }}>Galeria do Projeto</h2>
          </div>
          <div className="proj-masonry-grid">
            {project.mockups.slice(1).map((mockup, idx) => (
              <GalleryImage
                key={idx}
                src={mockup}
                alt={`${project.title} — Mockup ${idx + 2}`}
                index={idx + 1}
                total={project.mockups.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section className="proj-solution-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div ref={solutionRef} className="proj-gallery-item proj-solution-block">
            <div className="proj-section-label">
              <div className="proj-section-line" style={{ background: "var(--text-primary)" }} />
              <span style={{ color: "var(--text-primary)" }}>A Solução</span>
            </div>
            <p className="proj-solution-text" style={{ color: "var(--text-primary)", opacity: 0.7 }}>{project.solution}</p>
            <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/#contato" className="proj-cta-primary" style={{ background: "var(--grad-brand)", color: "#fff", padding: "1rem 2rem", borderRadius: "100px", fontWeight: 700 }}>
                <span>Iniciar Projeto Semelhante</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </Link>
              <Link href="/#portfolio" className="proj-cta-secondary" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)", padding: "1rem 2rem", borderRadius: "100px" }}>
                Ver Mais Projetos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT / PREV PROJECT ── */}
      <section style={{ padding: "4rem 0 2rem", background: "var(--bg)" }}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <ProjectNav currentSlug={project.slug} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
