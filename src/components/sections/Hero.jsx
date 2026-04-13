import React, { useEffect, useState } from "react";
import FadeIn from "../ui/FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";

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
      <div className="hero-counter-value mb-1 font-mono text-2xl font-black text-[#0B2341] sm:text-4xl md:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="hero-counter-label text-center text-[9px] font-bold uppercase tracking-[0.16em] text-[#00AEEF] sm:text-xs">
        {label}
      </div>
    </div>
  );
};

export default function Hero({ apresentacoes, municipios, artistas }) {
  const { t } = useLanguage();

  const handleScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").substring(1);
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
      className="hero-section relative overflow-hidden bg-[#0B2341] pb-14 pt-[160px] sm:pb-20 sm:pt-[180px] md:pb-24 md:pt-[200px]"
    >
      <style>{`
        body.contraste-negativo .hero-title-gradient {
          background: none !important;
          -webkit-text-fill-color: #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hero-overlay { display: none !important; }
        body.contraste-negativo .hero-stats { background: #000 !important; border: 2px solid #ffea00 !important; }
        body.contraste-negativo .hero-button { background: transparent !important; color: #ffea00 !important; border: 2px solid #ffea00 !important; box-shadow: none !important; }
        body.contraste-negativo .hero-button:hover { background: #ffea00 !important; color: #000 !important; }
      `}</style>

      <div className="absolute inset-0 z-0">
        <img
          src="/images/heroImage.png"
          alt={t.hero.backgroundAlt}
          className="hero-bg-image h-full w-full object-cover object-center opacity-80"
        />
        <div className="hero-overlay absolute inset-0 bg-[#07182F]/70" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6">
        <FadeIn>
          <div className="hero-badge mb-6 inline-flex max-w-full items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-center text-[8px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-md shadow-sm sm:mb-10 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.15em]">
            {t.hero.badge}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto w-full max-w-[290px] sm:max-w-4xl lg:max-w-5xl">
            <h1 className="w-full min-w-0 font-black leading-[0.92] tracking-[-0.045em] text-white sm:hidden">
              <span className="block text-[clamp(2rem,10.5vw,2.8rem)] [overflow-wrap:anywhere]">
                {t.hero.titlePrefix}
              </span>
              <span className="hero-title-gradient block bg-gradient-to-r from-white via-[#7DD3FC] to-[#00AEEF] bg-clip-text text-[clamp(1.9rem,10vw,2.55rem)] text-transparent [overflow-wrap:anywhere]">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <h1 className="hidden w-full min-w-0 font-black leading-[0.95] tracking-tight text-white sm:block sm:text-5xl md:text-6xl lg:text-7xl">
              {t.hero.titlePrefix}
              <span className="hero-title-gradient mt-2 block bg-gradient-to-r from-white via-[#7DD3FC] to-[#00AEEF] bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto w-full max-w-[310px] sm:max-w-3xl">
            <p className="hc-text-desc mb-8 px-1 text-[13px] font-light leading-relaxed text-slate-100 sm:mb-12 sm:px-0 sm:text-lg md:text-xl">
              {t.hero.description}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="hero-stats mx-auto mb-8 grid w-full max-w-[320px] grid-cols-1 divide-y-2 divide-slate-100 rounded-3xl border border-white/70 bg-white/95 p-3 shadow-2xl shadow-blue-950/20 backdrop-blur-lg sm:mb-12 sm:max-w-3xl sm:p-6 md:grid-cols-3 md:divide-x-2 md:divide-y-0 md:p-8">
            <AnimatedCounter end={apresentacoes} label={t.hero.stats.presentations} />
            <AnimatedCounter end={municipios} label={t.hero.stats.municipalities} />
            <AnimatedCounter
              end={artistas}
              suffix="+"
              label={t.hero.stats.artists}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <a
            href="#painel"
            onClick={handleScroll}
            className="hero-button inline-flex items-center justify-center rounded-2xl bg-[#00AEEF] px-5 py-3.5 text-[13px] font-black uppercase tracking-widest text-white shadow-xl shadow-cyan-900/30 transition-all active:scale-95 sm:px-10 sm:py-5 sm:text-base"
          >
            {t.hero.cta}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
