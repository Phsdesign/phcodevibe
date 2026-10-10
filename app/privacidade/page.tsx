"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const h2Style = { color: "var(--text-primary)", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" } as const;
const pStyle = { marginBottom: "1.5rem" } as const;

export default function Privacidade() {
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
            Política de Privacidade
          </h1>

          <div style={{ color: "rgb(var(--ink) / 0.7)", lineHeight: 1.8, fontSize: "1.1rem" }}>
            <p style={{ marginBottom: "2rem" }}>
              Esta Política explica como a PH Code Labs coleta, usa, armazena e protege os dados pessoais de quem navega pelo site e entra em contato conosco. Ela foi elaborada com base na Lei Geral de Proteção de Dados Pessoais (LGPD, Lei nº 13.709/2018).
            </p>

            <h2 style={h2Style}>1. Responsável pelo tratamento dos dados</h2>
            <p style={pStyle}>
              Nome: Pedro Henrique, atuando como PH Code Labs (pessoa física, sem CNPJ)<br />
              E-mail: pedroeditorgrafico@gmail.com<br />
              WhatsApp: (49) 99103-1743
            </p>
            <p style={pStyle}>
              Como o tratamento é feito pelo próprio responsável, o contato acima também serve para assuntos de privacidade e para exercer os direitos previstos nesta política.
            </p>

            <h2 style={h2Style}>2. Quais dados coletamos</h2>
            <p style={pStyle}>
              Dados fornecidos por você: nome, e-mail, telefone e informações do projeto, quando você entra em contato pelo WhatsApp, e-mail ou formulários do site.
            </p>
            <p style={pStyle}>
              Dados de navegação: endereço IP, tipo de navegador e dispositivo, páginas acessadas e horário de acesso, coletados automaticamente por meio de cookies e registros do servidor.
            </p>

            <h2 style={h2Style}>3. Para que usamos seus dados</h2>
            <p style={pStyle}>
              Responder pedidos de orçamento e contato; elaborar propostas e executar contratos de prestação de serviços; cumprir obrigações legais e fiscais; e melhorar o desempenho e a segurança do site.
            </p>
            <p style={pStyle}>
              As bases legais são: execução de contrato ou de procedimentos preliminares (art. 7º, V, da LGPD); cumprimento de obrigação legal (art. 7º, II); consentimento, quando solicitado (art. 7º, I); e legítimo interesse, para segurança e melhoria do site (art. 7º, IX).
            </p>

            <h2 style={h2Style}>4. Com quem compartilhamos</h2>
            <p style={pStyle}>
              Não vendemos dados pessoais. Compartilhamos apenas o necessário com fornecedores que nos auxiliam na operação, como provedores de hospedagem (Vercel ou Cloudflare), ferramentas de análise de tráfego e o WhatsApp (Meta). Também podemos informar dados quando exigido por lei ou ordem de autoridade competente.
            </p>

            <h2 style={h2Style}>5. Cookies</h2>
            <p style={pStyle}>
              Usamos cookies essenciais, necessários para o funcionamento do site, e cookies de desempenho, que nos ajudam a entender como o site é utilizado. Você pode bloquear ou apagar cookies nas configurações do seu navegador. Algumas funções do site podem deixar de funcionar se os cookies essenciais forem desativados.
            </p>

            <h2 style={h2Style}>6. Por quanto tempo guardamos</h2>
            <p style={pStyle}>
              Mantemos os dados pelo tempo necessário para a finalidade para a qual foram coletados. Dados de contratos e obrigações fiscais são guardados pelos prazos previstos em lei. Depois disso, eles são excluídos ou anonimizados.
            </p>

            <h2 style={h2Style}>7. Segurança</h2>
            <p style={pStyle}>
              Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perda ou alteração, incluindo conexão criptografada (HTTPS). Nenhum sistema é totalmente imune a falhas, por isso também recomendamos cautela ao compartilhar informações pela internet.
            </p>

            <h2 style={h2Style}>8. Seus direitos</h2>
            <p style={pStyle}>
              Nos termos do art. 18 da LGPD, você pode solicitar: confirmação da existência de tratamento; acesso aos seus dados; correção de dados incompletos ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; informação sobre compartilhamentos; e revogação do consentimento. Para exercer seus direitos, fale com o nosso encarregado pelo e-mail indicado acima.
            </p>
            <p style={pStyle}>
              Se entender que o tratamento não está de acordo com a lei, você também pode registrar reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>

            <h2 style={h2Style}>9. Menores de idade</h2>
            <p style={pStyle}>
              Nossos serviços são destinados a maiores de 18 anos ou a pessoas representadas por responsável legal. Não coletamos intencionalmente dados de crianças e adolescentes sem o consentimento de pais ou responsável.
            </p>

            <h2 style={h2Style}>10. Alterações desta política</h2>
            <p style={pStyle}>
              Podemos atualizar esta Política a qualquer momento. A versão vigente é sempre a publicada nesta página, com a data de atualização indicada abaixo.
            </p>

            <p style={{ marginTop: "4rem", fontSize: "0.9rem", opacity: 0.5 }}>
              Esta Política é regida pelas leis da República Federativa do Brasil. Última atualização: outubro de 2026.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
