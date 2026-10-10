"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type Answers = Record<string, string | string[]>;

type Step = {
  id: string;
  q: string;
  hint?: string;
  type: "single" | "multi" | "text" | "textarea";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  when?: (a: Answers) => boolean;
};

const TEM_MARCA = {
  sim: "Sim, já tenho uma marca",
  criando: "Estou criando uma agora",
  nada: "Ainda não tenho nada definido",
};

const IDENTIDADE = {
  completa: "Sim, tenho logo, cores e fontes",
  logo: "Tenho só a logo",
  cores: "Tenho só algumas cores ou ideias",
  nada: "Não, quero criar do zero",
};

const SITE = {
  tem: "Sim, já tenho um site",
  refazer: "Tenho, mas quero refazer",
  nao: "Não tenho site",
};

const v = (a: Answers, k: string) => (typeof a[k] === "string" ? (a[k] as string) : "");
const m = (a: Answers, k: string) => (Array.isArray(a[k]) ? (a[k] as string[]) : []);
const hasName = (a: Answers) => v(a, "tem_marca") !== TEM_MARCA.nada && v(a, "tem_marca") !== "";
const hasIdentity = (a: Answers) => v(a, "identidade") !== "" && v(a, "identidade") !== IDENTIDADE.nada;
const hasSite = (a: Answers) => v(a, "site") === SITE.tem || v(a, "site") === SITE.refazer;

const STEPS: Step[] = [
  {
    id: "tem_marca",
    q: "Você já tem uma marca?",
    hint: "Isso muda as próximas perguntas.",
    type: "single",
    required: true,
    options: [TEM_MARCA.sim, TEM_MARCA.criando, TEM_MARCA.nada],
  },
  {
    id: "nome_marca",
    q: "Qual é o nome da marca?",
    hint: "Pode ser um nome provisório.",
    type: "text",
    placeholder: "Ex.: Studio Aurora",
    when: hasName,
  },
  {
    id: "responsavel",
    q: "Qual é o seu nome?",
    type: "text",
    required: true,
    placeholder: "Seu nome completo",
  },
  {
    id: "cidade",
    q: "De onde você é?",
    hint: "Cidade e estado.",
    type: "text",
    required: true,
    placeholder: "Ex.: Lages, SC",
  },
  {
    id: "segmento",
    q: "Em qual segmento a marca atua?",
    type: "single",
    required: true,
    options: [
      "Alimentação e restaurantes",
      "Saúde e estética",
      "Moda e beleza",
      "Serviços profissionais",
      "Tecnologia",
      "Educação",
      "Imobiliário",
      "Varejo e loja física",
      "Outro",
    ],
  },
  {
    id: "tempo_mercado",
    q: "Há quanto tempo a marca existe?",
    type: "single",
    when: (a) => v(a, "tem_marca") === TEM_MARCA.sim,
    options: ["Menos de 6 meses", "De 6 meses a 2 anos", "Mais de 2 anos"],
  },
  {
    id: "presenca",
    q: "Onde a marca aparece hoje?",
    hint: "Pode escolher mais de um.",
    type: "multi",
    options: ["Instagram", "Google Meu Negócio", "WhatsApp", "Marketplace (iFood, Mercado Livre...)", "Site próprio", "Ainda não aparece em lugar nenhum"],
  },
  {
    id: "identidade",
    q: "Você já tem identidade visual?",
    hint: "Logo, cores e fontes.",
    type: "single",
    required: true,
    options: [IDENTIDADE.completa, IDENTIDADE.logo, IDENTIDADE.cores, IDENTIDADE.nada],
  },
  {
    id: "cores",
    q: "Quais cores a marca usa?",
    hint: "Se souber, envie o código (ex.: #0A1128) ou o nome das cores.",
    type: "text",
    placeholder: "Ex.: azul marinho e dourado",
    when: hasIdentity,
  },
  {
    id: "fontes",
    q: "Quais fontes a marca usa?",
    hint: "Se não souber, pode pular.",
    type: "text",
    placeholder: "Ex.: Montserrat",
    when: (a) => v(a, "identidade") === IDENTIDADE.completa,
  },
  {
    id: "site",
    q: "Você já tem site?",
    type: "single",
    required: true,
    options: [SITE.tem, SITE.refazer, SITE.nao],
  },
  {
    id: "url_site",
    q: "Qual é o endereço atual do site?",
    hint: "Opcional.",
    type: "text",
    placeholder: "https://seusite.com.br",
    when: hasSite,
  },
  {
    id: "objetivo",
    q: "Qual é o principal objetivo do site?",
    type: "single",
    required: true,
    options: [
      "Vender produtos online",
      "Captar clientes e pedidos de orçamento",
      "Apresentar a empresa (institucional)",
      "Mostrar portfólio e trabalhos",
      "Divulgar um produto, evento ou lançamento",
      "Outro",
    ],
  },
  {
    id: "estilo",
    q: "Qual estilo você imagina?",
    hint: "Pode escolher mais de um.",
    type: "multi",
    required: true,
    options: [
      "Minimalista e limpo",
      "Premium e escuro",
      "Futurista e tecnológico",
      "Bold e editorial (tipografia grande)",
      "Colorido e vibrante",
      "Elegante e clássico",
      "Orgânico e natural",
      "Ousado e fora do padrão",
    ],
  },
  {
    id: "sensacao",
    q: "Que sensação o visitante deve ter ao entrar?",
    type: "single",
    required: true,
    options: ["Confiança", "Exclusividade", "Energia e movimento", "Acolhimento", "Inovação", "Tranquilidade"],
  },
  {
    id: "referencias",
    q: "Tem sites ou marcas que você admira?",
    hint: "Cole os links. Opcional.",
    type: "textarea",
    placeholder: "https://...",
  },
  {
    id: "paginas",
    q: "Quais páginas o site deve ter?",
    hint: "Pode escolher mais de uma.",
    type: "multi",
    options: ["Início", "Sobre", "Serviços", "Portfólio", "Preços", "Contato", "Blog", "Loja online"],
  },
  {
    id: "funcionalidades",
    q: "Precisa de alguma funcionalidade?",
    hint: "Pode escolher mais de uma.",
    type: "multi",
    options: [
      "Formulário de contato",
      "Botão de WhatsApp",
      "Agendamento online",
      "Pagamento online",
      "Área de login para clientes",
      "Blog",
      "Atendimento automatizado com IA",
      "Versão em outro idioma",
    ],
  },
  {
    id: "prazo",
    q: "Para quando você precisa do site?",
    type: "single",
    options: ["Urgente (até 2 semanas)", "No próximo mês", "Sem pressa", "Ainda não sei"],
  },
  {
    id: "observacoes",
    q: "Algo mais que devemos saber?",
    hint: "Opcional.",
    type: "textarea",
    placeholder: "Qualquer detalhe que ajude a entender o seu projeto",
  },
];

const WHATS = "https://wa.me/5549991031743";

function isAnswered(step: Step, a: Answers) {
  if (step.type === "multi") return m(a, step.id).length > 0 || !step.required;
  const val = v(a, step.id).trim();
  return step.required ? val.length > 0 : true;
}

function buildMessage(answers: Answers, steps: Step[]) {
  const lines = steps
    .map((s) => {
      if (s.type === "multi") {
        const list = m(answers, s.id);
        return list.length ? `${s.q}\n- ${list.join("\n- ")}` : null;
      }
      const val = v(answers, s.id).trim();
      return val ? `${s.q}\n${val}` : null;
    })
    .filter(Boolean);
  return `Olá! Preenchi o briefing da PH Code Labs:\n\n${lines.join("\n\n")}`;
}

export default function QuizPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const visible = STEPS.filter((s) => !s.when || s.when(answers));
  const current = visible[idx];
  const total = visible.length;
  const progress = done ? 100 : Math.round((idx / total) * 100);

  const setValue = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const goNext = () => {
    if (idx + 1 >= total) setDone(true);
    else setIdx(idx + 1);
  };

  const goBack = () => {
    if (done) {
      setDone(false);
      return;
    }
    if (idx > 0) setIdx(idx - 1);
  };

  const pickSingle = (opt: string) => {
    setValue(current.id, opt);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(goNext, 280);
  };

  const toggleMulti = (opt: string) => {
    const list = m(answers, current.id);
    setValue(
      current.id,
      list.includes(opt) ? list.filter((o) => o !== opt) : [...list, opt]
    );
  };

  const restart = () => {
    setAnswers({});
    setIdx(0);
    setDone(false);
  };

  const canContinue = current ? isAnswered(current, answers) : true;

  const optionStyle = (selected: boolean) => ({
    padding: "0.95rem 1.2rem",
    borderRadius: "14px",
    border: `1px solid ${selected ? "rgba(96,165,250,0.7)" : "rgb(var(--ink) / 0.12)"}`,
    background: selected ? "var(--grad-brand)" : "var(--bg-secondary)",
    color: selected ? "#fff" : "var(--text-primary)",
    textAlign: "left" as const,
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.25s ease",
  });

  const primaryBtn = {
    padding: "0.9rem 1.8rem",
    borderRadius: "999px",
    border: "none",
    background: "var(--grad-brand)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "opacity 0.25s ease",
  } as const;

  const ghostBtn = {
    padding: "0.9rem 1.4rem",
    borderRadius: "999px",
    border: "1px solid rgb(var(--ink) / 0.2)",
    background: "transparent",
    color: "var(--text-primary)",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
  } as const;

  const inputStyle = {
    width: "100%",
    padding: "1rem 1.1rem",
    borderRadius: "14px",
    border: "1px solid rgb(var(--ink) / 0.15)",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: "1rem",
    outline: "none",
    fontFamily: "inherit",
  } as const;

  return (
    <main style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "var(--bg)" }}>
      <Navbar />

      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "11rem 1.5rem 6rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: "680px" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgb(var(--ink) / 0.45)" }}>
              Briefing da sua marca
            </span>
            <div style={{ marginTop: "0.9rem", height: "4px", borderRadius: "999px", background: "rgb(var(--ink) / 0.08)", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "var(--grad-brand)", transition: "width 0.5s ease" }} />
            </div>
            {!done && (
              <span style={{ display: "block", marginTop: "0.6rem", fontSize: "0.8rem", color: "rgb(var(--ink) / 0.4)" }}>
                Pergunta {idx + 1} de {total}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!done && current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--text-primary)", marginBottom: "0.6rem" }}>
                  {current.q}
                </h1>
                {current.hint && (
                  <p style={{ color: "rgb(var(--ink) / 0.5)", fontSize: "0.95rem", marginBottom: "1.8rem" }}>{current.hint}</p>
                )}

                {current.type === "single" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginTop: current.hint ? 0 : "1.8rem" }}>
                    {current.options?.map((opt) => (
                      <button key={opt} type="button" onClick={() => pickSingle(opt)} style={optionStyle(v(answers, current.id) === opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {current.type === "multi" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {current.options?.map((opt) => (
                      <button key={opt} type="button" onClick={() => toggleMulti(opt)} style={optionStyle(m(answers, current.id).includes(opt))}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {(current.type === "text" || current.type === "textarea") && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (canContinue) goNext();
                    }}
                  >
                    {current.type === "text" ? (
                      <input
                        autoFocus
                        value={v(answers, current.id)}
                        onChange={(e) => setValue(current.id, e.target.value)}
                        placeholder={current.placeholder}
                        style={inputStyle}
                      />
                    ) : (
                      <textarea
                        autoFocus
                        rows={5}
                        value={v(answers, current.id)}
                        onChange={(e) => setValue(current.id, e.target.value)}
                        placeholder={current.placeholder}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    )}
                    <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.8rem" }}>
                      <button type="submit" disabled={!canContinue} style={{ ...primaryBtn, opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}>
                        Continuar
                      </button>
                    </div>
                  </form>
                )}

                {current.type === "multi" && (
                  <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.8rem" }}>
                    <button type="button" onClick={goNext} disabled={!canContinue} style={{ ...primaryBtn, opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}>
                      Continuar
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {done && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "0.6rem" }}>
                  Briefing concluído
                </h1>
                <p style={{ color: "rgb(var(--ink) / 0.5)", fontSize: "0.95rem", marginBottom: "2rem" }}>
                  Confira as respostas. Ao enviar, a mensagem abre no seu WhatsApp já preenchida.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", padding: "1.5rem", borderRadius: "20px", background: "var(--bg-secondary)", border: "1px solid rgb(var(--ink) / 0.08)" }}>
                  {visible.map((s) => {
                    const val = s.type === "multi" ? m(answers, s.id).join(", ") : v(answers, s.id).trim();
                    if (!val) return null;
                    return (
                      <div key={s.id}>
                        <span style={{ display: "block", fontSize: "0.8rem", color: "rgb(var(--ink) / 0.45)" }}>{s.q}</span>
                        <span style={{ display: "block", color: "var(--text-primary)", fontSize: "0.98rem", whiteSpace: "pre-wrap" }}>{val}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                  <a
                    href={`${WHATS}?text=${encodeURIComponent(buildMessage(answers, visible))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...primaryBtn, textDecoration: "none", display: "inline-block" }}
                  >
                    Enviar pelo WhatsApp
                  </a>
                  <button type="button" onClick={restart} style={ghostBtn}>
                    Refazer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!done && idx > 0 && (
            <div style={{ marginTop: "2.5rem" }}>
              <button type="button" onClick={goBack} style={{ ...ghostBtn, padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}>
                Voltar
              </button>
            </div>
          )}
          {done && (
            <div style={{ marginTop: "1.2rem" }}>
              <button type="button" onClick={goBack} style={{ ...ghostBtn, padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}>
                Voltar e editar
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
