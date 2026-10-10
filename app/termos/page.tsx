"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const h2Style = { color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" } as const;
const pStyle = { marginBottom: "1.5rem" } as const;

export default function Termos() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "10rem 1.5rem 6rem", maxWidth: "800px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "3rem", letterSpacing: "-0.04em" }}>
            Termos de Uso
          </h1>

          <div style={{ color: "rgb(var(--ink) / 0.7)", lineHeight: 1.8, fontSize: "1.1rem" }}>
            <p style={{ marginBottom: "2rem" }}>
              Estes Termos regulam o uso deste site e a contratação dos serviços de design e desenvolvimento oferecidos pela PH Code Labs. Ao navegar no site ou contratar nossos serviços, você concorda com as condições abaixo.
            </p>

            <h2 style={h2Style}>1. Identificação do prestador</h2>
            <p style={pStyle}>
              Prestador: Pedro Henrique, pessoa física, atuando como PH Code Labs<br />
              WhatsApp: (49) 99103-1743<br />
              E-mail: pedroeditorgrafico@gmail.com
            </p>

            <h2 style={h2Style}>2. Uso do site</h2>
            <p style={pStyle}>
              O conteúdo deste site (textos, imagens, layout e código) é de propriedade da PH Code Labs ou de terceiros licenciados, e não pode ser copiado, reproduzido ou redistribuído sem autorização prévia por escrito. É proibido usar o site para fins ilícitos, tentar acessar áreas restritas ou prejudicar seu funcionamento.
            </p>

            <h2 style={h2Style}>3. Escopo dos serviços</h2>
            <p style={pStyle}>
              Os serviços incluem criação de interfaces digitais, landing pages, sites institucionais e estratégias de design e desenvolvimento. O escopo, prazo e entregáveis de cada projeto são definidos em proposta ou contrato específico, aceito pelas partes antes do início do trabalho.
            </p>

            <h2 style={h2Style}>4. Propostas, valores e pagamento</h2>
            <p style={pStyle}>
              Os valores e condições de pagamento são informados na proposta de cada projeto. A execução começa após a confirmação do pagamento inicial previsto em contrato ou proposta. Alterações de escopo solicitadas pelo cliente podem gerar ajustes de prazo e valor, que serão acordados por escrito antes da execução.
            </p>

            <h2 style={h2Style}>5. Obrigações do cliente</h2>
            <p style={pStyle}>
              O cliente deve fornecer, nos prazos combinados, textos, imagens, acessos e feedbacks necessários ao projeto. Atrasos no envio de materiais podem alterar o prazo de entrega. O cliente também responde pela licitude do conteúdo que fornecer, incluindo direitos de uso de imagens, marcas e fontes.
            </p>

            <h2 style={h2Style}>6. Prazos</h2>
            <p style={pStyle}>
              Os prazos são estimados na proposta e começam a contar após o recebimento do pagamento inicial e dos materiais necessários. Eventuais atrasos causados pelo cliente não geram responsabilidade para a PH Code Labs.
            </p>

            <h2 style={h2Style}>7. Hospedagem e domínio</h2>
            <p style={pStyle}>
              Quando contratada, a configuração de hospedagem é feita em plataformas terceiras (como Vercel ou Cloudflare), cujas condições de uso e eventuais custos são de responsabilidade do cliente. O registro e a renovação anual do domínio (.com.br, .com ou outro) também são de responsabilidade do cliente, salvo acordo em contrário por escrito.
            </p>

            <h2 style={h2Style}>8. Propriedade intelectual</h2>
            <p style={pStyle}>
              Após a quitação integral do valor acordado, a titularidade dos entregáveis do projeto (código e design finais) é transferida ao cliente, salvo componentes de terceiros sob licença própria e ferramentas internas de trabalho da PH Code Labs. Até a quitação, a PH Code Labs mantém a titularidade do material. Salvo acordo em contrário, a PH Code Labs pode exibir o projeto em seu portfólio como caso de sucesso, sem divulgar informações confidenciais.
            </p>

            <h2 style={h2Style}>9. Garantia e revisões</h2>
            <p style={pStyle}>
              Cada projeto inclui as rodadas de revisão previstas na proposta. Correções de falhas técnicas do que foi entregue, identificadas dentro do período de garantia indicado no contrato, são realizadas sem custo adicional. Mudanças de escopo não se enquadram nessa garantia.
            </p>

            <h2 style={h2Style}>10. Cancelamento</h2>
            <p style={pStyle}>
              Qualquer das partes pode encerrar o contrato por escrito. Em caso de cancelamento pelo cliente, o valor já pago pelo trabalho realizado não é reembolsável, e as condições de encerramento seguirão o que estiver definido na proposta ou contrato.
            </p>

            <h2 style={h2Style}>11. Limitação de responsabilidade</h2>
            <p style={pStyle}>
              A PH Code Labs responde pelos serviços contratados nos limites da lei. Não nos responsabilizamos por indisponibilidades de terceiros (hospedagem, domínio, provedores de internet ou serviços de terceiros integrados), nem por danos decorrentes de uso indevido do site ou do material pelo cliente.
            </p>

            <h2 style={h2Style}>12. Proteção de dados</h2>
            <p style={pStyle}>
              O tratamento de dados pessoais segue a Política de Privacidade desta página, em conformidade com a LGPD (Lei nº 13.709/2018).
            </p>

            <h2 style={h2Style}>13. Relação de consumo</h2>
            <p style={pStyle}>
              Quando aplicável, as relações de consumo seguem o Código de Defesa do Consumidor (Lei nº 8.078/1990). Nada nestes Termos afasta direitos garantidos por essa lei.
            </p>

            <h2 style={h2Style}>14. Alterações dos Termos</h2>
            <p style={pStyle}>
              Estes Termos podem ser atualizados a qualquer momento. A versão vigente é a publicada nesta página. Alterações não afetam contratos já assinados, que seguem as condições acordadas.
            </p>

            <h2 style={h2Style}>15. Foro</h2>
            <p style={pStyle}>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca do domicílio do cliente, nos termos do Código de Defesa do Consumidor, ou o foro indicado em contrato específico.
            </p>

            <p style={{ marginTop: "4rem", fontSize: "0.9rem", opacity: 0.5 }}>
              Última atualização: outubro de 2026.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
