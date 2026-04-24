import React, { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import Breadcrumb from "../layout/Breadcrumb";

const HERO_SLIDES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Convento_de_S%C3%A3o_Francisco_-_Olinda_-_Pernambuco_-_Brasil.jpg/1280px-Convento_de_S%C3%A3o_Francisco_-_Olinda_-_Pernambuco_-_Brasil.jpg",
    alt: "Centro Histórico de Olinda, em Pernambuco",
    credit: "Olinda / Wikimedia Commons / CC BY-SA 4.0",
    position: "center 58%",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Passistas_de_Frevo.jpg/1280px-Passistas_de_Frevo.jpg",
    alt: "Passistas de frevo no Carnaval",
    credit: "Frevo / Wikimedia Commons / CC BY-SA 4.0",
    position: "center 34%",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Um_mundo_chamado_Sert%C3%A3o.jpg/1280px-Um_mundo_chamado_Sert%C3%A3o.jpg",
    alt: "Paisagem típica do Sertão de Pernambuco",
    credit: "Sertão (Caatinga) / Wikimedia Commons / CC BY-SA 4.0",
    position: "center center",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Antonio_Vaz_island_-_Recife%2C_Pernambuco%2C_Brazil_%28cropped%29.jpg/1280px-Antonio_Vaz_island_-_Recife%2C_Pernambuco%2C_Brazil_%28cropped%29.jpg",
    alt: "Vista de Recife, Pernambuco",
    credit: "Recife / Wikimedia Commons / CC BY-SA 4.0",
    position: "center center",
  },
];

const AnimatedCounter = ({ end, suffix = "", label, active }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const increment = end / (1600 / 16);
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
  }, [end, active]);

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
  const [isHighContrast, setIsHighContrast] = useState(
    () =>
      typeof document !== "undefined" &&
      document.body.classList.contains("contraste-negativo")
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [countersActive, setCountersActive] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const body = document.body;
    const updateContrastMode = () => {
      setIsHighContrast(body.classList.contains("contraste-negativo"));
    };

    updateContrastMode();

    const observer = new MutationObserver(updateContrastMode);
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const showTimer = setTimeout(() => setContentVisible(true), 220);
    const countersTimer = setTimeout(() => setCountersActive(true), 700);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(countersTimer);
    };
  }, []);

  useEffect(() => {
    if (isHighContrast) return undefined;

    const intervalId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [isHighContrast]);

  const handleScrollToPanel = (event) => {
    event.preventDefault();

    const target = document.getElementById("painel");
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        body.contraste-negativo #inicio {
          background: #000 !important;
        }
        body.contraste-negativo .hero-overlay,
        body.contraste-negativo #inicio > .absolute.inset-0.z-\\[1\\] {
          display: none !important;
        }
        body.contraste-negativo .hero-title-gradient {
          background: none !important;
          -webkit-text-fill-color: #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hero-overlay {
          display: none !important;
        }
        body.contraste-negativo .hero-stats {
          background: #000 !important;
          border: 2px solid #ffea00 !important;
        }
        body.contraste-negativo .hero-button {
          background: transparent !important;
          color: #ffea00 !important;
          border: 2px solid #ffea00 !important;
          box-shadow: none !important;
        }
        body.contraste-negativo .hero-button:hover {
          background: #ffea00 !important;
          color: #000 !important;
        }
        .hero-slide {
          transition: opacity 1.1s ease, transform 6s ease;
        }
      `}</style>

      <section
        id="inicio"
        className="relative h-screen overflow-hidden bg-[#0B2341]"
      >
        <Breadcrumb />

        {!isHighContrast && (
          <>
            {/* Mobile slides */}
            <div className="md:hidden">
              {HERO_SLIDES.map((slide, index) => {
                const active = index === currentSlide;

                return (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className="hero-slide absolute inset-0 h-full w-full object-cover"
                    style={{
                      opacity: active ? 1 : 0,
                      objectPosition: slide.position,
                      transform: active ? "scale(1.06)" : "scale(1.015)",
                    }}
                  />
                );
              })}
            </div>

            <div className="absolute inset-0 hidden md:block">
              <img
                src="/images/heroImage.png"
                alt="Imagem principal do painel de dados culturais de Pernambuco"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </>
        )}

        <div className="hero-overlay absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,#123f72_0%,#0B2341_42%,#06182e_100%)] md:bg-[linear-gradient(to_bottom,rgba(7,24,47,0.42)_0%,rgba(7,24,47,0.12)_52%,rgba(7,24,47,0.65)_100%)] md:hidden" />
        <div className="absolute inset-0 z-[1] hidden bg-[linear-gradient(to_bottom,rgba(7,24,47,0.55)_0%,rgba(7,24,47,0.22)_48%,rgba(7,24,47,0.68)_100%)] md:block pointer-events-none" />
        
        <div
          className="absolute inset-0 z-[2] flex flex-col items-center justify-start"
          style={{
            padding: "176px 0 2rem",
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="mx-auto flex w-full max-w-full flex-col items-center text-center" style={{ maxWidth: "clamp(280px, 52vw, 820px)" }}>
              <div className="hero-badge mb-4 inline-flex max-w-full items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-md shadow-sm sm:mb-5 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.12em]">
                {t.hero.badge}
              </div>

              <h1 className="w-full font-black leading-[0.97] tracking-[-0.04em] text-white sm:hidden">
                <span className="block text-[clamp(1.55rem,7.6vw,2.08rem)] [overflow-wrap:anywhere]">
                  {t.hero.titlePrefix}
                </span>
                <span className="hero-title-gradient mt-1 block bg-gradient-to-r from-white via-[#7DD3FC] to-[#00AEEF] bg-clip-text text-[clamp(1.48rem,7.3vw,1.95rem)] text-transparent [overflow-wrap:anywhere]">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <h1 className="hidden w-full font-black leading-[0.96] tracking-[-0.035em] text-white sm:block sm:text-[2.55rem] md:text-[3rem] lg:text-[3.45rem]">
                {t.hero.titlePrefix}
                <span className="hero-title-gradient mt-1.5 block bg-gradient-to-r from-white via-[#7DD3FC] to-[#00AEEF] bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="hc-text-desc mt-3 w-full max-w-none text-center text-[12px] font-light leading-relaxed text-slate-200 sm:mt-4 sm:text-[14px] md:max-w-[42rem] md:text-center md:text-[15px]">
                {t.hero.description}
              </p>

              <div className="hero-stats mt-5 grid w-full max-w-full grid-cols-1 divide-y-2 divide-slate-100 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-2xl shadow-blue-950/20 backdrop-blur-lg sm:mt-5 sm:p-4 md:max-w-[38rem] md:grid-cols-3 md:divide-x-2 md:divide-y-0 md:p-5">
                <AnimatedCounter
                  end={apresentacoes}
                  label={t.hero.stats.presentations}
                  active={countersActive}
                />
                <AnimatedCounter
                  end={municipios}
                  label={t.hero.stats.municipalities}
                  active={countersActive}
                />
                <AnimatedCounter
                  end={artistas}
                  suffix="+"
                  label={t.hero.stats.artists}
                  active={countersActive}
                />
              </div>

              <a
                href="#painel"
                onClick={handleScrollToPanel}
                className="hero-button mt-5 inline-flex items-center justify-center rounded-2xl bg-[#00AEEF] px-5 py-3.5 text-[12px] font-black uppercase tracking-widest text-white shadow-xl shadow-cyan-900/30 transition-all active:scale-95 sm:mt-5 sm:px-6 sm:py-3.5 sm:text-[12px]"
              >
                {t.hero.cta}
              </a>
            </div>
          </div>

          {!isHighContrast && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] md:hidden">
              <div className="mx-auto flex max-w-7xl justify-end px-4 pb-4 sm:px-6">
                <span className="rounded-full border border-white/15 bg-[#071B34]/55 px-3 py-1 text-[9px] font-medium text-white/75 backdrop-blur-md">
                  {HERO_SLIDES[currentSlide]?.credit}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
