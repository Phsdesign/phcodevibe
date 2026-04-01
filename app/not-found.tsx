"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020202] text-white px-6 text-center">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tight">
          Página não encontrada
        </h2>
        <p className="text-zinc-400 max-w-md mx-auto mb-10 text-lg">
          O link que você tentou acessar pode estar quebrado ou a página foi movida para outro endereço.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar página anterior
          </button>
        </div>
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 opacity-20 pointer-events-none">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-white" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-white" />
      </div>
    </div>
  );
}
