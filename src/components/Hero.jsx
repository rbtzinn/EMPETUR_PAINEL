import React, { useState, useEffect } from 'react';
import FadeIn from './FadeIn';

// Subcomponente para fazer os números subirem animados
const AnimatedCounter = ({ end, suffix = "", label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
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
      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B2341] mb-1 font-mono">
        {count}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs font-bold text-[#00AEEF] uppercase tracking-widest text-center">
        {label}
      </div>
    </div>
  );
};

export default function Hero({ apresentacoes, municipios, artistas }) {
  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative bg-[#F8FAFC] pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
    >
      {/* Fundo decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#0B2341] px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase mb-8 sm:mb-10 shadow-sm text-center max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse shrink-0" />
            <span className="truncate">PORTAL DE CONTRATAÇÕES ARTÍSTICAS OFICIAL</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="w-full max-w-[320px] sm:max-w-4xl lg:max-w-5xl mx-auto">
            {/* TÍTULO MOBILE */}
            <h1 className="sm:hidden w-full min-w-0 font-black tracking-[-0.04em] leading-[0.88] mb-6 text-[#0B2341]">
              <span className="block text-[clamp(2.6rem,14vw,3.8rem)] [overflow-wrap:anywhere]">
                Contratações
              </span>
              <span className="block text-[clamp(2.6rem,14vw,3.8rem)] [overflow-wrap:anywhere]">
                Artísticas
              </span>
              <span className="block text-[clamp(2.1rem,11vw,3rem)] mt-1 text-[#145F95]">
                em
              </span>
              <span className="block text-[clamp(2.4rem,13vw,3.5rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#0B2341] to-[#00AEEF] [overflow-wrap:anywhere]">
                Pernambuco.
              </span>
            </h1>

            {/* TÍTULO DESKTOP/TABLET */}
            <h1 className="hidden sm:block w-full min-w-0 text-5xl md:text-6xl lg:text-7xl font-black text-[#0B2341] tracking-tight leading-[0.95] mb-8">
              Contratações Artísticas
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0B2341] to-[#00AEEF]">
                em Pernambuco.
              </span>
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="w-full max-w-[320px] sm:max-w-2xl mx-auto">
            <p className="text-slate-500 text-sm sm:text-lg md:text-xl leading-relaxed mb-10 sm:mb-12 font-light px-1">
              Acompanhe a valorização dos nossos artistas locais e a expansão dos ciclos culturais promovidos pela EMPETUR em todo o estado.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="w-full max-w-3xl mx-auto mb-10 sm:mb-12 bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-100">
            <AnimatedCounter end={apresentacoes} label="Apresentações" />
            <AnimatedCounter end={municipios} label="Municípios Atendidos" />
            <AnimatedCounter end={artistas} suffix="+" label="Artistas Diferentes" />
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <a
            href="#painel"
            onClick={handleScroll}
            className="group inline-flex items-center justify-center gap-3 px-7 sm:px-10 py-4 sm:py-5 bg-[#0B2341] text-white text-sm sm:text-base font-bold rounded-2xl hover:bg-[#003399] transition-all shadow-xl shadow-blue-900/20"
          >
            Explorar o Painel
            <svg
              className="w-5 h-5 group-hover:translate-y-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}