import React, { useState, useEffect } from 'react';
import FadeIn from '../ui/FadeIn';
import heroImage from '/images/heroImage.png';

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
    <div className="flex flex-col items-center justify-center px-3 py-4 sm:p-4">
      <div className="hero-counter-value text-2xl sm:text-4xl md:text-5xl font-black text-[#0B2341] mb-1 font-mono">
        {count}{suffix}
      </div>
      <div className="hero-counter-label text-[9px] sm:text-xs font-bold text-[#00AEEF] uppercase tracking-[0.16em] text-center">
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
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="inicio"
      // 🔴 O SEGREDO ESTÁ AQUI: pt-[160px] empurra o conteúdo para baixo da Navbar + Breadcrumb
      className="hero-section relative bg-[#0B2341] pt-[160px] sm:pt-[180px] md:pt-[200px] pb-14 sm:pb-20 md:pb-24 overflow-hidden"
    >
      <style>{`
        body.contraste-negativo .hero-title-gradient { background: none !important; -webkit-text-fill-color: #ffea00 !important; color: #ffea00 !important; }
        body.contraste-negativo .hero-glow, body.contraste-negativo .hero-overlay { display: none !important; }
        body.contraste-negativo .hero-stats { background: #000 !important; border: 2px solid #ffea00 !important; }
        body.contraste-negativo .hero-button { background: transparent !important; color: #ffea00 !important; border: 2px solid #ffea00 !important; box-shadow: none !important; }
        body.contraste-negativo .hero-button:hover { background: #ffea00 !important; color: #000 !important; }
      `}</style>

      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Imagem institucional do painel"
          className="hero-bg-image w-full h-full object-cover object-center opacity-80"
        />
        <div className="hero-overlay absolute inset-0 bg-[#07182F]/70" />
        <div className="hero-glow absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,174,239,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        <FadeIn>
          <div className="hero-badge inline-flex max-w-full items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-bold tracking-[0.10em] sm:tracking-[0.15em] uppercase mb-6 sm:mb-10 shadow-sm text-center">
            <span className="hero-chip-dot w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse shrink-0" />
            <span className="truncate">Transparência Ativa • Lei Estadual nº 16.790/2019</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="w-full max-w-[290px] sm:max-w-4xl lg:max-w-5xl mx-auto">
            <h1 className="sm:hidden w-full min-w-0 font-black tracking-[-0.045em] leading-[0.92] mb-5 text-white">
              <span className="block text-[clamp(2rem,10.5vw,2.8rem)] [overflow-wrap:anywhere]">
                Painel de
              </span>
              <span className="block text-[clamp(1.9rem,10vw,2.55rem)] [overflow-wrap:anywhere]">
                Pagamentos
              </span>
              <span className="hero-title-gradient block text-[clamp(1.9rem,10vw,2.55rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#7DD3FC] via-[#00AEEF] to-white [overflow-wrap:anywhere]">
                de Eventos e Apresentações Artísticas
              </span>
            </h1>

            <h1 className="hidden sm:block w-full min-w-0 text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] mb-5">
              Painel de Pagamentos
              <span className="hero-title-gradient block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7DD3FC] via-[#00AEEF] to-white">
                de Eventos e Apresentações Artísticas
              </span>
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="w-full max-w-[310px] sm:max-w-3xl mx-auto">
            <p className="text-white/80 text-[10px] sm:text-sm md:text-base font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] mb-3 sm:mb-4">
              Transparência sobre pagamentos e apoios a eventos
            </p>

            <p className="text-slate-100 text-[13px] sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-12 font-light px-1 sm:px-0 hc-text-desc">
              Consulte, de forma clara e acessível, a execução financeira dos apoios da EMPETUR
              a eventos voltados ao desenvolvimento, à promoção e à comercialização do turismo em Pernambuco.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="hero-stats w-full max-w-[320px] sm:max-w-3xl mx-auto mb-8 sm:mb-12 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-950/20 p-3 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-100 border border-white/70">
            <AnimatedCounter end={apresentacoes} label="Apresentações Lidas" />
            <AnimatedCounter end={municipios} label="Municípios Atendidos" />
            <AnimatedCounter end={artistas} suffix="+" label="Artistas Diferentes" />
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <a
            href="#painel"
            onClick={handleScroll}
            className="hero-button group inline-flex items-center justify-center gap-3 px-5 sm:px-10 py-3.5 sm:py-5 bg-[#00AEEF] text-white text-[13px] sm:text-base font-black uppercase tracking-widest rounded-2xl hover:bg-[#0095d1] transition-all shadow-xl shadow-cyan-900/30 active:scale-95"
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
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}