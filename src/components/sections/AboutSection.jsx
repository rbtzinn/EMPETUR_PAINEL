import React, { useState } from "react";
import { Target, RefreshCcw, ShieldCheck, ArrowRight } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import GovernancaModal from "../ui/GovernancaModal";

export default function AboutSection({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id={id} className="py-24 md:py-32 bg-white relative overflow-hidden" aria-label="Sobre o painel">
      <GovernancaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        body.contraste-negativo .hc-sobre-bg { display: none !important; }
        body.contraste-negativo .hc-botao-borda { border: 2px solid #ffea00 !important; color: #ffea00 !important; background: transparent !important; }
        body.contraste-negativo .hc-botao-borda:hover { background: #ffea00 !important; color: #000 !important; }
        
        /* 🔴 CORREÇÃO: Ícones amarelos com FUNDO PRETO no contraste negativo */
        body.contraste-negativo #sobre .hc-icon-wrapper {
          background-color: #000 !important;
          border: 1px solid #ffea00 !important;
        }
        body.contraste-negativo #sobre .hc-icon-wrapper .lucide {
          color: #ffea00 !important;
        }

        /* Centralização no mobile */
        @media (max-width: 640px) {
          #sobre .max-w-2xl {
            text-align: center;
          }
          #sobre .hc-card {
            text-align: center;
            align-items: center;
            margin: 0 auto;
          }
        }
      `}</style>

      <div className="hc-sobre-bg absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeIn className="max-w-2xl mb-16 md:mb-24">
          <div className="hc-sobre-bg w-12 h-1.5 bg-[#00AEEF] mb-6 rounded-full" />
          <h2 className="text-4xl md:text-5xl font-black text-[#0B2341] mb-6 tracking-tight hc-text-destaque">
            Transparência <br className="hidden md:block" /> em Foco
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed hc-text-desc">
            Uma plataforma projetada para o cidadão consultar as contratações artísticas cruzando dados por <strong className="text-[#0B2341] font-bold hc-text-destaque">ano</strong>, <strong className="text-[#0B2341] font-bold hc-text-destaque">evento</strong> e <strong className="text-[#0B2341] font-bold hc-text-destaque">município</strong>.
          </p>
        </FadeIn>

        <FadeIn staggerChildren={true} direction="none" className="grid md:grid-cols-3 gap-6 lg:gap-8">
          
          <FadeIn direction="up" delay={0.1} className="h-full">
            <div className="hc-card h-full p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all duration-300 group flex flex-col">
              <div className="hc-icon-wrapper w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-8 shadow-inner">
                <Target strokeWidth={2} className="w-8 h-8 lucide" />
              </div>
              <h3 className="text-2xl font-black text-[#0B2341] mb-4 tracking-tight hc-text-destaque">Objetivo Central</h3>
              <p className="text-slate-500 leading-relaxed text-sm flex-1 hc-text-desc">
                Centralizar informações para responder rapidamente a três perguntas fundamentais da gestão pública: <strong className="text-slate-700 hc-text-destaque">onde foi</strong>, <strong className="text-slate-700 hc-text-destaque">o que foi</strong> e <strong className="text-slate-700 hc-text-destaque">quando foi</strong>.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} className="h-full">
            <div className="hc-card h-full p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all duration-300 group flex flex-col">
              <div className="hc-icon-wrapper w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8 shadow-inner">
                <RefreshCcw strokeWidth={2} className="w-8 h-8 lucide" />
              </div>
              <h3 className="text-2xl font-black text-[#0B2341] mb-4 tracking-tight hc-text-destaque">Fonte de Dados</h3>
              <p className="text-slate-500 leading-relaxed text-sm flex-1 hc-text-desc">
                Extraímos os registros diretamente da base contábil oficial do Governo do Estado (<strong className="text-slate-700 hc-text-destaque">e-Fisco PE</strong>), com atualizações automatizadas mensalmente.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} className="h-full">
            <div className="hc-card h-full p-8 md:p-10 rounded-[2.5rem] bg-[#0B2341] border border-[#0B2341] transition-all duration-300 group flex flex-col relative overflow-hidden">
              <div className="hc-sobre-bg absolute -right-6 -top-6 w-32 h-32 bg-[#00AEEF]/20 rounded-full blur-2xl"></div>
              
              <div className="hc-icon-wrapper relative z-10 w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-8 backdrop-blur-sm">
                <ShieldCheck strokeWidth={2} className="w-8 h-8 lucide" />
              </div>
              <h3 className="relative z-10 text-2xl font-black text-white mb-4 tracking-tight hc-text-destaque">Sanidade de Dados</h3>
              <p className="relative z-10 text-slate-300 leading-relaxed text-sm mb-8 flex-1 hc-text-desc">
                Nosso motor de governança bloqueia automaticamente empenhos cancelados, valores zerados e duplicidades antes da exibição.
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="hc-botao-borda relative z-10 mt-auto w-full py-4 px-6 rounded-2xl bg-[#00AEEF] text-white font-black text-xs uppercase tracking-widest transition-colors duration-300 active:scale-95 flex items-center justify-between"
              >
                Entenda o Processo
                <ArrowRight strokeWidth={2.5} className="w-4 h-4" />
              </button>
            </div>
          </FadeIn>

        </FadeIn>
      </div>
    </section>
  );
}