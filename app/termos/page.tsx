"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Termos() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      
      <section style={{ padding: "10rem 1.5rem 6rem", maxWidth: "800px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: "#0e1c29", marginBottom: "3rem", letterSpacing: "-0.04em" }}>
            Termos de Serviço
          </h1>

          <div style={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.8, fontSize: "1.1rem" }}>
            <p style={{ marginBottom: "2rem" }}>
              Estes termos regem a contratação dos serviços de design e desenvolvimento do **PH CODE VIBE**. Ao iniciar um projeto conosco, você concorda com as diretrizes abaixo.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>1. Escopo de Trabalho</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Nossos serviços abrangem a criação de interfaces digitais, landing pages e estratégias de design. O escopo detalhado de cada projeto é definido via WhatsApp ou contrato específico. Projetos do pacote &quot;Autoridade Imediata&quot; são limitados a até 5 páginas e funcionalidades essenciais.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>2. Hospedagem e Domínio</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Oferecemos a configuração de hospedagem gratuita através de plataformas de alta performance (Vercel ou Cloudflare). No entanto, o custo de registro e renovação anual do **domínio (endereço .com.br ou .com)** é de inteira responsabilidade do cliente.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>3. Obrigações do Cliente</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Para a execução ágil do projeto, o cliente compromete-se a fornecer os textos base, imagens necessárias e feedbacks dentro dos prazos acordados. A demora no envio de materiais pode impactar a data de entrega final.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>4. Propriedade Intelectual</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Após a quitação total do valor acordado, a propriedade do código e do design final é transferida integralmente ao cliente. O PH CODE VIBE reserva-se o direito de exibir o projeto em seu portfólio como caso de sucesso.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>5. Pagamentos</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Os valores e condições de pagamento são os vigentes no site no momento da contratação ou conforme orçamento personalizado. O início do desenvolvimento ocorre mediante a confirmação do pagamento inicial acordado.
            </p>

            <p style={{ marginTop: "4rem", fontSize: "0.9rem", opacity: 0.5 }}>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Última atualização: Março de 2026.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
