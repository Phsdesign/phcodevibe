"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * FounderNote — Ultra-performance version
 * Eliminates JS loops for word reveals to prevent scroll stutter.
 */
export function FounderNote() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("fn-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const text = "Transformamos dados em experiências imersivas, entendemos sua essência e usamos design de elite para elevar sua marca acima do ruído. O melhor? Nós executamos com perfeição.";
  const words = text.split(" ");
  const boldWords = ["dados", "essência", "design", "elite", "executamos"];

  return (
    <section 
      ref={sectionRef} 
      className="fn-section" 
      style={{ 
        background: "var(--bg)", 
        contain: "paint",
        position: "relative",
        zIndex: 2
      }}
    >
      <div className="fn-container">
        <div className="fn-quote-wrapper">
          <h3 className="fn-quote">
            <span style={{ color: "var(--text-primary)", opacity: 0.15, marginRight: "8px" }}>&ldquo;</span>
            {words.map((word, i) => {
              const isBold = boldWords.some(bw => word.toLowerCase().includes(bw));
              return (
                <span
                  key={i}
                  className="fn-word-static"
                  style={{ 
                    fontWeight: isBold ? 700 : 400,
                    display: "inline-block",
                    marginRight: "0.35em",
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                    transitionDelay: `${i * 30}ms`
                  }}
                >
                  {word}
                </span>
              );
            })}
            <span style={{ color: "var(--text-primary)", opacity: 0.15, marginLeft: "4px" }}>&rdquo;</span>
          </h3>
        </div>

        <div className="fn-author animate-on-scroll">
          <div className="fn-author-avatar">
            <Image
              src="/logo1.png"
              alt="PH Code Vibe"
              width={36}
              height={36}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <p className="fn-author-name">PH CODE VIBE</p>
            <p className="fn-author-role">The Future of Digital Esthetics</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fn-word-static {
          opacity: 0.05;
          transform: translate3d(0, 5px, 0);
        }
        .fn-revealed .fn-word-static {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .fn-section {
          padding: 10rem 1rem;
        }
      `}</style>
    </section>
  );
}
