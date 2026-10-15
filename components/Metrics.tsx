"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const valuePillars = [
  {
    id: "01",
    title: "Autoridade Visual Absoluta",
    desc: "Não é apenas 'bonito'. É design que impõe respeito no primeiro segundo. Transformamos sua presença digital em uma declaração de poder que separa sua marca do resto do ruído.",
    details: ["Design UI/UX de Elite", "Motion Design Cinematográfico", "Identidade Visual de Impacto"],
  },
  {
    id: "02",
    title: "Engenharia de Performance",
    desc: "Sites que carregam antes do usuário piscar. Utilizamos infraestrutura global e código limpo para garantir que seu negócio nunca perca uma venda por lentidão ou instabilidade.",
    details: ["Deploy Global (Vercel/Cloudflare)", "Otimização Core Web Vitals", "Código Nativo de Alta Performance"],
  },
  {
    id: "03",
    title: "Conversão Estratégica",
    desc: "Cada pixel tem uma função: vender. Aplicamos psicologia do usuário e fluxos de navegação otimizados para transformar visitantes em clientes fiéis de forma orgânica.",
    details: ["Copywriting Persuasivo", "Funis de Vendas Integrados", "Análise de Dados e Heatmaps"],
  },
  {
    id: "04",
    title: "Ecossistema Inteligente",
    desc: "Integramos IA e automações que trabalham para você 24/7. Seu site deixa de ser um cartão de visitas e passa a ser uma máquina de eficiência operacional.",
    details: ["Automações com IA", "Integrações de Sistemas", "Escalabilidade Sem Limites"],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const INK = "#0b0f19";
const INK_SOFT = "#2a3142";
const INK_MUTED = "#5b6375";
const headlineLines = ["Onde o valor real", "encontra o código."];

function useMediaFlags() {
  const [flags, setFlags] = useState({ desktop: false, fine: false });

  useEffect(() => {
    const desk = window.matchMedia("(min-width: 1025px)");
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

function PillarScene({
  pillar,
  desktop,
  interactive,
}: {
  pillar: (typeof valuePillars)[number];
  desktop: boolean;
  interactive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numeralY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const rotateX = useSpring(useTransform(my, [0, 100], [6, -6]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 100], [-6, 6]), { stiffness: 160, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const handleLeave = () => {
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={{
        hidden: { opacity: 0, y: 70, rotateX: 14 },
        show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1.1, ease: EASE } },
      }}
      style={{ padding: desktop ? "24px 0" : "16px 0", transformPerspective: 1200 }}
    >
      <motion.div
        onMouseMove={interactive ? handleMove : undefined}
        onMouseLeave={interactive ? handleLeave : undefined}
        whileHover={interactive ? "hover" : undefined}
        variants={{
          show: {
            y: 0,
            scale: 1,
            backgroundColor: "rgba(20, 26, 38, 0.95)",
            borderColor: "rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
          },
          hover: {
            y: -6,
            scale: 1.01,
            backgroundColor: "#ffffff",
            borderColor: "#ffffff",
            boxShadow: "0 25px 50px -15px rgba(255, 255, 255, 0.25)",
          },
        }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          position: "relative",
          overflow: "hidden",
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformPerspective: 1100,
          willChange: "transform",
          display: "grid",
          gridTemplateColumns: desktop ? "minmax(120px, 0.7fr) 2fr 1fr" : "1fr",
          gap: desktop ? 48 : 20,
          alignItems: "center",
          padding: desktop ? "56px 48px" : "28px 22px",
          borderRadius: desktop ? 40 : 26,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backgroundColor: "rgba(20, 26, 38, 0.95)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        }}
      >
        <motion.span
          aria-hidden
          className="mt-pillar-arrow"
          variants={{
            show: { opacity: 0, x: -12, y: 12, color: INK },
            hover: { opacity: 1, x: 0, y: 0, color: INK },
          }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            position: "absolute",
            top: 28,
            right: 32,
            fontSize: 30,
            lineHeight: 1,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          ↗
        </motion.span>

        <motion.div
          variants={{
            show: { color: "rgba(255, 255, 255, 0)", scale: 1 },
            hover: { color: INK, scale: 1.06 },
          }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            y: desktop ? numeralY : 0,
            // Mesmo estado do variant "show" já no HTML (número só com contorno).
            color: "rgba(255, 255, 255, 0)",
            fontSize: desktop ? "clamp(5rem, 11vw, 9rem)" : "4rem",
            fontWeight: 900,
            lineHeight: 0.85,
            fontFamily: "var(--font-heading, inherit)",
            WebkitTextStrokeWidth: "1.5px",
            WebkitTextStrokeColor: "rgba(255, 255, 255, 0.75)",
            letterSpacing: "-0.04em",
            position: "relative",
            zIndex: 1,
          }}
        >
          {pillar.id}
        </motion.div>

        <motion.div style={{ y: desktop ? contentY : 0, position: "relative", zIndex: 1 }}>
          <motion.div
            variants={{
              show: { color: "rgba(255, 255, 255, 0.55)" },
              hover: { color: INK_MUTED },
            }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Pilar {pillar.id}
          </motion.div>

          <motion.h3
            variants={{
              show: { x: 0, color: "#ffffff" },
              hover: { x: 6, color: INK },
            }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{
              fontSize: desktop ? "clamp(1.8rem, 3.4vw, 3rem)" : "1.7rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 18px",
            }}
          >
            {pillar.title}
          </motion.h3>

          <motion.p
            variants={{
              show: { color: "rgba(255, 255, 255, 0.8)" },
              hover: { color: INK_SOFT },
            }}
            transition={{ duration: 0.45 }}
            style={{
              fontSize: desktop ? "1.08rem" : "1rem",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 560,
            }}
          >
            {pillar.desc}
          </motion.p>
        </motion.div>

        <motion.div
          variants={{
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
            hover: {},
          }}
          style={{
            display: "flex",
            flexDirection: desktop ? "column" : "row",
            flexWrap: "wrap",
            gap: 10,
            alignItems: desktop ? "flex-end" : "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          {pillar.details.map((detail) => (
            <motion.span
              key={detail}
              variants={{
                hidden: { opacity: 0, x: 18 },
                show: {
                  opacity: 1,
                  x: 0,
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  transition: { duration: 0.6, ease: EASE },
                },
                hover: {
                  opacity: 1,
                  x: -4,
                  color: "#ffffff",
                  backgroundColor: INK,
                  borderColor: INK,
                  transition: { duration: 0.4, ease: EASE },
                },
              }}
              transition={{ duration: 0.4 }}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.05em",
                padding: "8px 14px",
                borderRadius: 100,
                border: "1px solid rgba(255, 255, 255, 0.2)",
                whiteSpace: "nowrap",
              }}
            >
              {detail}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Metrics() {
  const { desktop, fine } = useMediaFlags();
  const reduceMotion = useReducedMotion();
  const parallax = desktop && !reduceMotion;
  const interactive = parallax && fine;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const chapterScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section
      id="metricas"
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: desktop ? "160px 0 140px" : "90px 0",
        background: "var(--bg)",
      }}
    >
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ maxWidth: 820, marginBottom: desktop ? 110 : 60 }}>
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.75)",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Valor Além dos Números
          </motion.div>

          <h2
            style={{
              fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.98,
              margin: "0 0 2rem",
              color: "#ffffff",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            {headlineLines.map((line, i) => (
              <span key={line} style={{ display: "block", overflow: "hidden", paddingBottom: "0.1em" }}>
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
                  style={{
                    display: "block",
                    color: i === 1 ? "rgba(255, 255, 255, 0.7)" : "#ffffff",
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            style={{
              fontSize: desktop ? "1.2rem" : "1.05rem",
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.6,
              maxWidth: 620,
              margin: 0,
            }}
          >
            Métricas são importantes, mas autoridade e escala são o que definem o jogo. Nosso método foca em 4 pilares
            fundamentais.
          </motion.p>
        </div>

        {desktop && (
          <div style={{ position: "relative", height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 40 }}>
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(150,185,255,0.2), rgba(255,255,255,0.9))",
                transformOrigin: "0% 50%",
                scaleX: parallax ? chapterScale : 1,
              }}
            />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: desktop ? 36 : 22 }}>
          {valuePillars.map((pillar) => (
            <PillarScene key={pillar.id} pillar={pillar} desktop={desktop} interactive={interactive} />
          ))}
        </div>
      </div>
    </section>
  );
}
