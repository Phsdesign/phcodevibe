"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Privacidade() {
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
            Política de Privacidade
          </h1>

          <div style={{ color: "rgba(0,0,0,0.7)", lineHeight: 1.8, fontSize: "1.1rem" }}>
            <p style={{ marginBottom: "2rem" }}>
              A sua privacidade é importante para nós. É política do PH CODE VIBE respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site PH CODE VIBE.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>1. Coleta de Informações</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>2. Uso de Dados</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei. Retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>3. Cookies</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Utilizamos cookies para entender como você interage com nosso site e melhorar sua experiência. Você pode optar por desativar os cookies nas configurações do seu navegador.
            </p>

            <h2 style={{ color: "#0e1c29", fontSize: "1.5rem", fontWeight: 700, marginTop: "3rem", marginBottom: "1rem" }}>4. Contato</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco através do nosso WhatsApp.
            </p>

            <p style={{ marginTop: "4rem", fontSize: "0.9rem", opacity: 0.5 }}>
              Esta política é efetiva a partir de Março de 2026.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
