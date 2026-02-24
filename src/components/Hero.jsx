import React from 'react';
import FadeIn from './FadeIn';

export default function Hero() {
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative bg-[#F8FAFC] pt-32 pb-24 overflow-hidden">
      {/* Elemento Decorativo de Fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#0B2341] px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Portal de Contratações Artísticas Oficial
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-black text-[#0B2341] tracking-tight leading-[1.05] mb-8">
            Contratações Artísticas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2341] to-[#00AEEF]">em Pernambuco.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Transparência e dados sólidos sobre os investimentos culturais do Governo de Pernambuco.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a 
            href="#painel" 
            onClick={handleScroll}
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#0B2341] text-white font-bold rounded-2xl hover:bg-[#003399] transition-all shadow-xl shadow-blue-900/20"
          >
            Visualizar Dados Completos
            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}