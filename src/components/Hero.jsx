import React from 'react';
import FadeIn from './FadeIn';

export default function Hero() {
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Compensar a altura do Topbar (h-20 do tailwind = 80px)
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="inicio" className="bg-[#F8FAFC] pt-24 pb-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        <FadeIn>
          <div className="inline-block bg-[#E2E8F0] text-[#0B2341] px-4 py-1.5 rounded-sm text-xs font-black tracking-[0.1em] uppercase mb-8">
            Portal de Contratações Artísticas Oficial
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-black text-[#0B2341] tracking-tighter leading-[1.1] mb-6">
            Contratações Artísticas <br className="hidden md:block" />
            <span className="text-[#00AEEF]">em Pernambuco.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
            Acompanhe os investimentos do Governo na cultura local. Uma visualização de dados sólida, direta e detalhada para consulta pública.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a 
            href="#painel" 
            onClick={handleScroll}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B2341] text-white font-bold rounded-sm hover:bg-[#15345E] transition-colors"
          >
            Visualizar Dados Completos
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
