import React, { useState, useEffect } from 'react';
import FadeIn from './FadeIn';

// Subcomponente para fazer os números subirem animados
const AnimatedCounter = ({ end, suffix = "", label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Animação de 2 segundos (2000ms)
    const increment = end / (2000 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-4xl md:text-5xl font-black text-[#0B2341] mb-1 font-mono">
        {count}{suffix}
      </div>
      <div className="text-xs font-bold text-[#00AEEF] uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
};

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
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
            PORTAL DE CONTRATAÇÕES ARTÍSTICAS OFICIAL
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
            Acompanhe a valorização dos nossos artistas locais e a expansão dos ciclos culturais promovidos pela EMPETUR em todo o estado.
          </p>
        </FadeIn>

        {/* ÁREA DOS CONTADORES ANIMADOS */}
        <FadeIn delay={0.3} className="w-full max-w-3xl mx-auto mb-12 bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-100">
          {/* Pode mudar os valores do 'end' para bater com a sua planilha */}
          <AnimatedCounter end={829} label="Apresentações" />
          <AnimatedCounter end={129} label="Municípios Atendidos" />
          <AnimatedCounter end={423} suffix="+" label="Artistas Diferentes" />
        </FadeIn>

        <FadeIn delay={0.4}>
          <a
            href="#painel"
            onClick={handleScroll}
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#0B2341] text-white font-bold rounded-2xl hover:bg-[#003399] transition-all shadow-xl shadow-blue-900/20"
          >
            Explorar o Painel
            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}