"use client";

import { useState } from "react";

const icons = {
  mail: <path d="M22 17a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10zM22 7l-10 6L2 7" />,
  phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />,
  clock: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2" />,
  user: <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />,
  message: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
  arrowUpRight: <path d="M7 17L17 7M9 7h8v8" />,
  arrowRight: <path d="M5 12h14M12 5l7 7-7 7" />,
};

type IconProps = { children: React.ReactNode; size?: number; strokeWidth?: number };

function Icon({ children, size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const channels = [
  {
    label: "E-mail",
    value: "pedroeditorgrafico@gmail.com",
    href: "mailto:pedroeditorgrafico@gmail.com",
    icon: icons.mail,
  },
  {
    label: "WhatsApp",
    value: "Conversar agora",
    href: "https://wa.me/5549991031743",
    icon: icons.phone,
  },
];

const highlights = [
  { icon: icons.clock, title: "Resposta em até 2h", text: "Durante o horário comercial." },
  { icon: icons.user, title: "Atendimento direto", text: "Você fala com quem desenha o projeto." },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const filled = [name, email, message].filter((v) => v.trim().length > 0).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Novo Contato pelo Site: ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`);
    window.location.href = `mailto:pedroeditorgrafico@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contato" className="ct">
      <style>{`
        .ct {
          --ct-text: var(--text-primary);
          --ct-muted: color-mix(in srgb, var(--text-primary) 74%, transparent);
          --ct-faint: color-mix(in srgb, var(--text-primary) 52%, transparent);
          --ct-line: color-mix(in srgb, var(--text-primary) 12%, transparent);
          --ct-surface: color-mix(in srgb, var(--text-primary) 4%, transparent);
          --ct-surface-hover: color-mix(in srgb, var(--text-primary) 8%, transparent);
          --ct-blue: #0A8CFF;
          --ct-ease: cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          margin-top: -5rem;
          padding: 0 0 clamp(4.5rem, 8vw, 7rem);
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;
          color: var(--ct-text);
        }
        .ct-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.25rem;
        }

        /* Header */
        .ct-head {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: clamp(1.75rem, 3vw, 2.5rem);
          max-width: 980px;
        }
        .ct-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--ct-text);
          background: var(--ct-surface);
          border: 1px solid var(--ct-line);
        }
        .ct-dot {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }
        .ct-dot::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          animation: ct-ping 2s var(--ct-ease) infinite;
        }
        @keyframes ct-ping {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(2); opacity: 0; }
        }
        .ct-title {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 4.8vw, 3.75rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0;
          text-wrap: balance;
        }
        .ct-title span {
          background: linear-gradient(90deg, #0A8CFF, #00E5FF, #ffffff, #00E5FF, #0A8CFF, #00E5FF, #ffffff, #00E5FF, #0A8CFF);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: ct-shimmer 5s linear infinite;
        }
        .ct-subtitle {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--ct-muted);
          margin: 0;
          max-width: 620px;
        }

        /* Layout */
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 1024px) {
          .ct-grid { grid-template-columns: 5fr 7fr; gap: 1.5rem; align-items: stretch; }
        }
        .ct-card {
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          padding: clamp(1.5rem, 3vw, 2.25rem);
          background: var(--ct-surface);
          border: 1px solid var(--ct-line);
          animation: ct-rise 0.9s var(--ct-ease) both;
        }
        .ct-card-title {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ct-faint);
          margin: 0 0 1.5rem;
        }
        @keyframes ct-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Channels */
        .ct-channels {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ct-channels + .ct-highlights { margin-top: 1.5rem; }
        .ct-channel {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.1rem;
          border-radius: 16px;
          text-decoration: none;
          color: var(--ct-text);
          border: 1px solid var(--ct-line);
          background: transparent;
          transition: background-color 0.4s ease, border-color 0.4s ease, transform 0.5s var(--ct-ease);
        }
        .ct-channel:hover {
          background: var(--ct-surface-hover);
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
          transform: translateX(4px);
        }
        .ct-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00E5FF;
          background: color-mix(in srgb, #0A8CFF 14%, transparent);
          border: 1px solid color-mix(in srgb, #00E5FF 28%, transparent);
        }
        .ct-channel-meta { flex: 1; min-width: 0; }
        .ct-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--ct-faint);
          margin-bottom: 0.2rem;
        }
        .ct-value {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ct-arrow {
          color: var(--ct-faint);
          transition: transform 0.5s var(--ct-ease), color 0.4s ease;
        }
        .ct-channel:hover .ct-arrow {
          color: var(--accent);
          transform: translate(2px, -2px);
        }

        /* Highlights */
        .ct-highlights {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--ct-line);
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .ct-highlight {
          display: flex;
          gap: 0.9rem;
          align-items: flex-start;
        }
        .ct-highlight-title {
          display: block;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.15rem;
        }
        .ct-highlight-text {
          display: block;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--ct-muted);
        }

        /* Form */
        .ct-form { display: flex; flex-direction: column; gap: 1.25rem; flex: 1; }
        .ct-msg { display: flex; flex-direction: column; flex: 1; }
        .ct-msg .ct-input { flex: 1; }
        .ct-pair {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .ct-pair { grid-template-columns: 1fr 1fr; }
        }
        .ct-field-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--ct-text);
          margin-bottom: 0.5rem;
        }
        .ct-field-label svg { color: var(--accent); }
        .ct-field { position: relative; }
        .ct-input {
          width: 100%;
          padding: 0.9rem 1rem;
          font-family: inherit;
          font-size: 0.975rem;
          color: var(--ct-text);
          background: var(--bg);
          border: 1px solid var(--ct-line);
          border-radius: 14px;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .ct-input::placeholder { color: var(--ct-faint); }
        .ct-input:hover { border-color: color-mix(in srgb, var(--text-primary) 24%, transparent); }
        .ct-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 16%, transparent);
        }
        .ct-textarea { resize: vertical; min-height: 150px; line-height: 1.6; }
        .ct-fine {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--ct-faint);
          margin: 0.9rem auto 0;
          max-width: 460px;
          text-align: center;
          text-wrap: balance;
        }

        .ct-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 700;
          background: linear-gradient(90deg, #1e3f80, #17607a, #1e3f80);
          background-size: 200% 100%;
          color: #ffffff;
          animation: ct-shimmer 6s linear infinite;
          transition: transform 0.4s var(--ct-ease), box-shadow 0.4s ease, filter 0.4s ease;
        }
        .ct-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px -10px rgba(30, 63, 128, 0.6);
          filter: brightness(1.06);
        }
        @keyframes ct-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .ct-submit:active { transform: translateY(0); }
        .ct-submit:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .ct-submit-arrow { transition: transform 0.5s var(--ct-ease); }
        .ct-submit:hover .ct-submit-arrow { transform: translateX(4px); }

        .ct-progress {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.8125rem;
          color: var(--ct-faint);
        }
        .ct-steps {
          display: flex;
          gap: 4px;
          flex: 1;
        }
        .ct-step {
          flex: 1;
          height: 4px;
          border-radius: 4px;
          background: var(--ct-line);
          transition: background-color 0.5s ease;
        }
        .ct-step.on { background: linear-gradient(90deg, #0A8CFF, #00E5FF); }

        @media (prefers-reduced-motion: reduce) {
          .ct *, .ct *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="ct-wrap">
        <header className="ct-head animate-on-scroll">
          <span className="ct-badge">
            <span className="ct-dot" />
            Disponível para novos projetos
          </span>
          <h2 className="ct-title">
            Pronto para o próximo <span>nível de impacto?</span>
          </h2>
          <p className="ct-subtitle">
            Não fazemos apenas sites. Construímos ativos digitais que exalam autoridade. Fale conosco e vamos desenhar sua nova realidade.
          </p>
        </header>

        <div className="ct-grid animate-on-scroll">
          <aside className="ct-card" style={{ animationDelay: "0.05s" }}>
            <h3 className="ct-card-title">Canais diretos</h3>

            <div className="ct-channels">
              {channels.map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="ct-channel">
                  <span className="ct-icon">
                    <Icon>{c.icon}</Icon>
                  </span>
                  <span className="ct-channel-meta">
                    <span className="ct-label">{c.label}</span>
                    <span className="ct-value">{c.value}</span>
                  </span>
                  <span className="ct-arrow">
                    <Icon size={18} strokeWidth={2}>{icons.arrowUpRight}</Icon>
                  </span>
                </a>
              ))}
            </div>

            <div className="ct-highlights">
              {highlights.map((h) => (
                <div key={h.title} className="ct-highlight">
                  <span className="ct-icon">
                    <Icon>{h.icon}</Icon>
                  </span>
                  <span>
                    <span className="ct-highlight-title">{h.title}</span>
                    <span className="ct-highlight-text">{h.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <div className="ct-card" style={{ animationDelay: "0.15s" }}>
            <div className="ct-progress" style={{ marginBottom: "1.5rem" }} aria-label={`${filled} de 3 campos preenchidos`}>
              <span>Briefing</span>
              <div className="ct-steps">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={`ct-step ${i < filled ? "on" : ""}`} />
                ))}
              </div>
              <span>{filled}/3</span>
            </div>

            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-pair">
                <div>
                  <label htmlFor="contact-name" className="ct-field-label">
                    <Icon size={16} strokeWidth={2}>{icons.user}</Icon>
                    Nome completo
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Como podemos te chamar?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="ct-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="ct-field-label">
                    <Icon size={16} strokeWidth={2}>{icons.mail}</Icon>
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="seu@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="ct-input"
                  />
                </div>
              </div>

              <div className="ct-msg">
                <label htmlFor="contact-message" className="ct-field-label">
                  <Icon size={16} strokeWidth={2}>{icons.message}</Icon>
                  Fale sobre seu projeto
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Quais são seus objetivos, prazos e desafios atuais?"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="ct-input ct-textarea"
                />
              </div>

              <div>
                <button type="submit" className="ct-submit">
                  Enviar proposta
                  <span className="ct-submit-arrow">
                    <Icon size={18} strokeWidth={2.2}>{icons.arrowRight}</Icon>
                  </span>
                </button>
                <p className="ct-fine">
                  Ao enviar, você concorda com nossos termos de privacidade. Responderemos em até 2 horas comerciais.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
