"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════
   IMMERSIVE PROJECT PAGE — Premium Optimized
   ═══════════════════════════════════════════════ */

/* ── Force scroll to top on mount + route change ── */
function useScrollToTop() {
  const { slug } = useParams();
  useEffect(() => {
    // Instant scroll — no animation, no delay
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Double-tap after paint to catch late hydration
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [slug]);
}

/* ── Scroll Reveal Hook (GPU-optimized) ── */
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

/* ── Throttled Parallax Hook (rAF-based, no jank) ── */
function useParallax(speed = 0.04) {
  const ref = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip parallax on mobile for performance
    if (window.innerWidth < 768) return;

    const handler = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewCenter = window.innerHeight / 2;
        const offset = (center - viewCenter) * speed;
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

/* ── Gallery Image Component (optimized) ── */
function GalleryImage({
  src,
  alt,
  index,
  total,
  onOpen,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  onOpen: (i: number) => void;
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
      <div
        className="proj-image-container"
        onClick={() => onOpen(index)}
      >
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

        {/* Image number badge */}
        <div className="proj-image-number">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        {/* Hover overlay */}
        <div className="proj-image-hover-overlay">
          <div className="proj-zoom-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
              <path d="M11 8v6M8 11h6"/>
            </svg>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="proj-image-gradient" />
      </div>
    </div>
  );
}

/* ── Lightbox Component (touch swipe support) ── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  return (
    <div className="proj-lightbox" onClick={onClose}>
      <div
        className="proj-lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="proj-lightbox-close" onClick={onClose} aria-label="Fechar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="proj-lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>

        <div className="proj-lightbox-image-wrapper">
          <Image
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Imagem ${currentIndex + 1}`}
            fill
            sizes="90vw"
            priority
            style={{ objectFit: "contain" }}
            className="proj-lightbox-image"
          />
        </div>

        {currentIndex > 0 && (
          <button className="proj-lightbox-nav proj-lightbox-prev" onClick={onPrev} aria-label="Anterior">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button className="proj-lightbox-nav proj-lightbox-next" onClick={onNext} aria-label="Próximo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Next / Prev Project Navigation ── */
function ProjectNav({ currentSlug }: { currentSlug: string }) {
  const currentIdx = portfolioData.findIndex((p) => p.slug === currentSlug);
  const prev = currentIdx > 0 ? portfolioData[currentIdx - 1] : null;
  const next = currentIdx < portfolioData.length - 1 ? portfolioData[currentIdx + 1] : null;
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="proj-gallery-item proj-nav-section">
      <div className="proj-nav-grid">
        {prev ? (
          <Link href={`/portfolio/${prev.slug}`} className="proj-nav-card" scroll={true}>
            <span className="proj-nav-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5m0 0l7 7m-7-7l7-7"/>
              </svg>
              Projeto Anterior
            </span>
            <span className="proj-nav-title">{prev.title}</span>
            <span className="proj-nav-cat">{prev.category}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/portfolio/${next.slug}`} className="proj-nav-card proj-nav-card-right" scroll={true}>
            <span className="proj-nav-label">
              Próximo Projeto
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m0 0l-7-7m7 7l-7 7"/>
              </svg>
            </span>
            <span className="proj-nav-title">{next.title}</span>
            <span className="proj-nav-cat">{next.category}</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function ProjectPage({ slug: propSlug }: { slug?: string }) {
  const params = useParams();
  const slug = propSlug || params?.slug;
  const router = useRouter();
  const project = portfolioData.find((p) => p.slug === slug);

  /* Force scroll to top on every page load / route change */
  useScrollToTop();

  /* Throttled scroll progress (rAF) */
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTicking = useRef(false);
  useEffect(() => {
    const handler = () => {
      if (scrollTicking.current) return;
      scrollTicking.current = true;
      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(total > 0 ? window.scrollY / total : 0);
        scrollTicking.current = false;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Lightbox state */
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    if (lightboxIndex !== null && project && lightboxIndex < project.mockups.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  }, [lightboxIndex, project]);
  const prevImage = useCallback(() => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  }, [lightboxIndex]);

  /* Reveal refs */
  const heroRevealRef = useReveal(0.05);
  const challengeRef = useReveal();
  const solutionRef = useReveal();

  useEffect(() => {
    if (!project) router.push("/");
  }, [project, router]);

  if (!project) return null;

  const currentIdx = portfolioData.findIndex((p) => p.slug === slug);

  return (
    <main className="proj-page-main">
      <Navbar />

      {/* Scroll Progress Bar — GPU composited */}
      <div
        className="proj-scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* ── HERO SECTION ── */}
      <section className="proj-hero">
        <div className="container">
          <Link href="/#portfolio" className="proj-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5m0 0l7 7m-7-7l7-7"/>
            </svg>
            Voltar ao Portfólio
          </Link>

          <div ref={heroRevealRef} className="proj-gallery-item">
            <div className="proj-category-badge">
              <span>{project.category}</span>
            </div>
            <h1 className="proj-title">{project.title}</h1>
            <div className="proj-meta-row">
              <div className="proj-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="2"/>
                  <path d="M2 16l5-5 4 4 4-6 7 7"/>
                </svg>
                <span>{project.mockups.length} imagens</span>
              </div>
              <div className="proj-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/>
                </svg>
                <span>Projeto #{String(currentIdx + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE — Full Width Cinematic ── */}
      <section className="proj-hero-image-section">
        <div className="proj-hero-image-wrapper" onClick={() => openLightbox(0)}>
          <Image
            src={project.mockups[0]}
            alt={`${project.title} Hero`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="proj-hero-image-overlay" />
          <div className="proj-hero-image-scroll-hint">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14m0 0l-6-6m6 6l6-6"/>
            </svg>
            <span>Scroll para explorar</span>
          </div>
        </div>
      </section>

      {/* ── CHALLENGE SECTION ── */}
      <section className="proj-text-section">
        <div className="container">
          <div ref={challengeRef} className="proj-gallery-item proj-text-block">
            <div className="proj-section-label">
              <div className="proj-section-line" />
              <span>O Desafio</span>
            </div>
            <p className="proj-text-content">{project.challenge}</p>
          </div>
        </div>
      </section>

      {/* ── GALLERY — Immersive Masonry ── */}
      <section className="proj-gallery-section">
        <div className="container" style={{ maxWidth: "1280px" }}>
          <div className="proj-gallery-header">
            <h2 className="proj-gallery-title">Galeria do Projeto</h2>
            <p className="proj-gallery-subtitle">
              Clique em qualquer imagem para visualizar em tela cheia
            </p>
          </div>
          <div className="proj-masonry-grid">
            {project.mockups.slice(1).map((mockup, idx) => (
              <GalleryImage
                key={idx}
                src={mockup}
                alt={`${project.title} — Mockup ${idx + 2}`}
                index={idx + 1}
                total={project.mockups.length}
                onOpen={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section className="proj-solution-section">
        <div className="container">
          <div ref={solutionRef} className="proj-gallery-item proj-solution-block">
            <div className="proj-section-label">
              <div className="proj-section-line" />
              <span>A Solução</span>
            </div>
            <p className="proj-solution-text">{project.solution}</p>
            <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/#contato" className="proj-cta-primary">
                <span>Iniciar Projeto Semelhante</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </Link>
              <Link href="/#portfolio" className="proj-cta-secondary">
                Ver Mais Projetos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT / PREV PROJECT ── */}
      <section style={{ padding: "4rem 0 2rem", background: "#fff" }}>
        <div className="container" style={{ maxWidth: "1280px" }}>
          <ProjectNav currentSlug={project.slug} />
        </div>
      </section>

      <Footer />

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={project.mockups}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </main>
  );
}
