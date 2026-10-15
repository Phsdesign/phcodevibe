"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePauseOffscreenAnimations } from "@/hooks/usePauseOffscreenAnimations";

type ClientLogo = {
  src: string;
  name: string;
  imgStyle: CSSProperties;
};

const clientLogos: ClientLogo[] = [
  { src: "/logos/2.png", name: "Mario Amaral", imgStyle: { maxWidth: "80%", maxHeight: "80%" } },
  { src: "/logos/32.png", name: "Garage 44", imgStyle: { maxWidth: "100%", maxHeight: "100%", transform: "scale(2.0)" } },
  { src: "/logos/Ces_Sistemas branco - Oficial.png", name: "Ces Sistemas", imgStyle: { maxWidth: "82%", maxHeight: "55%" } },
  { src: "/logos/Elleganza-Branco.png", name: "Elleganza", imgStyle: { maxWidth: "100%", maxHeight: "100%", transform: "scale(2.2)" } },
  { src: "/logos/LOGO3.png", name: "Sushi Na House", imgStyle: { maxWidth: "100%", maxHeight: "100%", transform: "scale(1.3)" } },
  { src: "/logos/Logo-PH-6.png", name: "Popeloni Hub", imgStyle: { maxWidth: "100%", maxHeight: "100%", transform: "scale(1.7)" } },
  { src: "/logos/Marca_04_branca.png", name: "Braslimp", imgStyle: { maxWidth: "80%", maxHeight: "60%" } },
  { src: "/logos/logoazul.png", name: "Slap", imgStyle: { maxWidth: "65%", maxHeight: "65%" } },
];

const benefitTags = [
  "Soluções Escaláveis",
  "Experiências Personalizadas",
  "Custo-Benefício",
  "Insights em Tempo Real",
  "Automação",
  "Decisões Baseadas em Dados",
  "Design de Elite",
  "Alta Performance",
];

const titleWords = ["Marcas", "que", "confiam", "na", "nossa", "vibração."];

const EASE = [0.16, 1, 0.3, 1] as const;

const cellPlacement: CSSProperties[] = [
  { gridColumn: "1 / 3", gridRow: "1 / 3" },
  { gridColumn: "3", gridRow: "1" },
  { gridColumn: "4", gridRow: "1" },
  { gridColumn: "3", gridRow: "2" },
  { gridColumn: "4", gridRow: "2" },
  { gridColumn: "1 / 3", gridRow: "3" },
  { gridColumn: "3", gridRow: "3" },
  { gridColumn: "4", gridRow: "3" },
];

const cellDepths = [1.2, 0.7, 1.4, 0.9, 0.6, 1.1, 0.8, 1.3];

const accents = ["#2f6fd6", "#15a3b8", "#1e5fb0", "#3b82c4", "#1aa5a0", "#2a7fa8", "#2f6fd6", "#15a3b8"];

function useMediaFlags() {
  const [flags, setFlags] = useState({ desktop: false, fine: false });

  useEffect(() => {
    const desk = window.matchMedia("(min-width: 900px)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFlags({ desktop: desk.matches, fine: fine.matches });
    update();
    desk.addEventListener("change", update);
    fine.addEventListener("change", update);
    return () => {
      desk.removeEventListener("change", update);
      fine.removeEventListener("change", update);
    };
  }, []);

  return flags;
}

function PartnerCell({
  logo,
  index,
  progress,
  desktop,
  interactive,
}: {
  logo: ClientLogo;
  index: number;
  progress: MotionValue<number>;
  desktop: boolean;
  interactive: boolean;
}) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const depth = cellDepths[index];
  const y = useTransform(progress, [0, 1], [-10 * depth, 10 * depth]);

  const featured = index === 0;

  const accent = accents[index];

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x);
    my.set(y);
    e.currentTarget.style.setProperty("--mx", `${x * r.width}px`);
    e.currentTarget.style.setProperty("--my", `${y * r.height}px`);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      style={{ ...(desktop ? cellPlacement[index] : {}), perspective: 1000 }}
      initial={{ opacity: 0, y: 50, rotateX: 20, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.07, ease: EASE }}
    >
      <motion.div style={{ y: desktop ? y : 0, height: desktop ? "100%" : 120 }}>
        <motion.div
          className="mq-cell"
          whileHover={interactive ? { scale: 1.05 } : undefined}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onMouseMove={interactive ? handleMove : undefined}
          onMouseLeave={interactive ? handleLeave : undefined}
          style={{
            rotateX: interactive ? rotateX : 0,
            rotateY: interactive ? rotateY : 0,
            transformPerspective: 900,
            willChange: "transform",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: featured ? "2.5rem" : "1.5rem",
            borderRadius: featured ? 36 : 26,
            background: "rgba(14, 22, 38, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="mq-spot" style={{ background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${accent}66, transparent 65%)` }} />
          <div className="mq-sheen" style={{ animationDelay: `${index * 0.9}s` }} />
          <Image
            src={logo.src}
            alt={logo.name}
            width={200}
            height={100}
            loading="lazy"
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 1,
              filter: "brightness(0) invert(var(--invert-value))",
              ...logo.imgStyle,
            }}
          />

          <span
            style={{
              position: "absolute",
              top: 16,
              right: 20,
              zIndex: 2,
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.25em",
              color: accent,
            }}
          >
            0{index + 1}
          </span>
          <span
            style={{
              position: "absolute",
              left: 20,
              bottom: 14,
              zIndex: 2,
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {logo.name}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function TickerRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mq-ticker">
      <div className={reverse ? "mq-track mq-reverse" : "mq-track"}>
        {[0, 1, 2, 3].map((g) => (
          <div key={g} className="mq-group">
            {items.map((text, i) => (
              <span key={text} className="mq-pill" style={{ "--c": accents[(i + (reverse ? 3 : 0)) % accents.length] } as CSSProperties}>
                <i className="mq-dot" />
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const { desktop, fine } = useMediaFlags();
  const reduceMotion = useReducedMotion();
  const parallax = desktop && !reduceMotion;
  const interactive = parallax && fine;
  const sectionRef = useRef<HTMLElement>(null);
  usePauseOffscreenAnimations(sectionRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const headerY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="marquee"
      ref={sectionRef}
      className="marquee-section"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: desktop ? "140px 0 160px" : "80px 0",
        background: "transparent",
      }}
    >
      <style>{`
        #marquee {
          background: transparent !important;
        }
        .mq-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent 70%);
          mask-image: radial-gradient(ellipse at center, #000 20%, transparent 70%);
        }

        .mq-word {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding-bottom: 0.12em;
          margin-right: 0.25em;
        }
        .mq-word > span { display: inline-block; }
        .mq-ticker {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }
        .mq-track {
          display: flex;
          width: max-content;
          animation: mqScroll 40s linear infinite;
        }
        .mq-reverse { animation-direction: reverse; }
        .mq-ticker:hover .mq-track { animation-play-state: paused; }
        .mq-group {
          display: flex;
          flex-shrink: 0;
          gap: 14px;
          padding-right: 14px;
        }
        @keyframes mqScroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-25%, 0, 0); }
        }
        .mq-pill {
          white-space: nowrap;
          padding: 14px 28px;
          border-radius: 100px;
          font-family: var(--font-body);
          font-size: clamp(13px, 1.2vw, 15px);
          font-weight: 600;
          color: var(--text-primary);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 767px) {
          .mq-pill { padding: 10px 18px; font-size: 12px; }
          .mq-group { gap: 10px; padding-right: 10px; }
        }
        .mq-aura {
          display: none !important;
        }
        .mq-spot {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .mq-cell:hover .mq-spot { opacity: 1; }
        .mq-sheen {
          position: absolute;
          top: 0;
          left: 0;
          width: 35%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transform: translateX(-120%) skewX(-20deg);
          animation: mqSheen 7s ease-in-out infinite;
        }
        @keyframes mqSheen {
          0%, 55% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(380%) skewX(-20deg); }
        }
        .mq-grad {
          background: linear-gradient(90deg, #5f8fe0, #2ab3c9, #7dd3fc, #5f8fe0);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: mqGrad 6s linear infinite;
        }
        @keyframes mqGrad { to { background-position: 300% 0; } }
        .mq-badge { position: relative; overflow: hidden; }
        .mq-badge::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(120,170,255,0.35), transparent);
          animation: mqBadge 3.5s ease-in-out infinite;
        }
        /* transform em vez de left: 190% do pai / 40% de largura = 475% (mesmo trajeto). */
        @keyframes mqBadge {
          0%, 60% { transform: translateX(0); }
          100% { transform: translateX(475%); }
        }
        .mq-pill {
          --c: #2f6fd6;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .mq-pill:hover {
          transform: translateY(-3px);
          border-color: var(--c);
          box-shadow: 0 10px 30px -10px var(--c);
        }
        .mq-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--c);
          box-shadow: 0 0 10px var(--c);
        }
        @media (prefers-reduced-motion: reduce) {
          .mq-track, .mq-aura, .mq-sheen, .mq-grad, .mq-badge::after { animation: none; }
        }
      `}</style>

      <div className="mq-grid" aria-hidden />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <motion.div style={{ y: parallax ? headerY : 0, textAlign: "center", marginBottom: desktop ? "5rem" : "3rem" }}>
          <motion.div
            className="mq-badge"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: "#ffffff",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "8px 24px",
              borderRadius: 100,
              marginBottom: "1.5rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            Nossas Conexões &amp; Parcerias
          </motion.div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#ffffff",
              margin: 0,
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            {titleWords.map((word, i) => (
              <span key={word} className="mq-word">
                <motion.span
                  className={word === "vibração." ? "mq-grad" : undefined}
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            style={{
              marginTop: "1.25rem",
              fontSize: desktop ? 16 : 14,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
            }}
          >
            Empresas que escolheram a PH Code Labs para crescer no digital.
          </motion.p>
        </motion.div>

        {desktop && (
          <div
            style={{
              position: "relative",
              height: 1,
              background: "rgba(255,255,255,0.08)",
              marginBottom: 32,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, #2f6fd6, #15a3b8, #1e5fb0)",
                boxShadow: "0 0 12px rgba(47,111,214,0.6)",
                transformOrigin: "0% 50%",
                scaleX: parallax ? lineScale : 1,
              }}
            />
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: desktop ? "repeat(4, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))",
            gridTemplateRows: desktop ? "repeat(3, 170px)" : undefined,
            gap: desktop ? 32 : 14,
            marginBottom: desktop ? "6rem" : "3.5rem",
          }}
        >
          {clientLogos.map((logo, i) => (
            <PartnerCell
              key={logo.name}
              logo={logo}
              index={i}
              progress={scrollYProgress}
              desktop={desktop}
              interactive={interactive}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TickerRow items={benefitTags.slice(0, 4)} />
          <TickerRow items={benefitTags.slice(4)} reverse />
        </div>
      </div>
    </section>
  );
}
