import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import Breadcrumb from "../layout/Breadcrumb";

const HERO_SLIDES = [
  {
    src: "/images/PE Meu País no carnaval RECIFE - Alyne Pinheiro - SecultPE.jpg",
    alt: "PE Meu Pais no Carnaval do Recife",
    position: "center center",
  },
  {
    src: "/images/Carnaval Olinda - Arquimedes Santos.jpg",
    alt: "Carnaval de Olinda",
    position: "center center",
  },
  {
    src: "/images/Papangus BEZERROS - Alyne Pinheiro - SecultPE.jpg",
    alt: "Papangus de Bezerros",
    position: "center center",
  },
  {
    src: "/images/Maracatus NAZARÉ DA MATA - Ray Evllyn - SecultPE.jpg",
    alt: "Maracatus de Nazare da Mata",
    position: "center center",
  },
  {
    src: "/images/Cortejo Afoxé - Dani Pedrosa - SecultPE.jpg",
    alt: "Cortejo Afoxe",
    position: "center center",
  },
  {
    src: "/images/Passista Olinda - Arquimedes Santos.jpg",
    alt: "Passista em Olinda",
    position: "center center",
  },
  {
    src: "/images/Maracatus NAZARÉ DA MATA - Ray Evllyn - SecultPE 2.jpg",
    alt: "Maracatus em Nazare da Mata",
    position: "center center",
  },
  {
    src: "/images/Boi Maracatu - Artur Freire - SecultPE.jpg",
    alt: "Boi Maracatu",
    position: "center center",
  },
  {
    src: "/images/Brincantes PESQUEIRA - Silla Cadengue - Fundarpe.jpg",
    alt: "Brincantes de Pesqueira",
    position: "center center",
  },
  {
    src: "/images/Brincantes PESQUEIRA - Silla Cadengue - Fundarpe 2.jpg",
    alt: "Brincantes em Pesqueira",
    position: "center center",
  },
  {
    src: "/images/Bacamarte - Dani Pedrosa SECULTPE Fundarpe.jpg",
    alt: "Bacamarteiros",
    position: "center center",
  },
  {
    src: "/images/Bacamarte - Dani Pedrosa SECULTPE Fundarpe B.jpg",
    alt: "Apresentacao de bacamarteiros",
    position: "center center",
  },
  {
    src: "/images/Malhada de Pedras - Ft Jorge Farias.jpg",
    alt: "Malhada de Pedras",
    position: "center center",
  },
  {
    src: "/images/Malhada de Pedras - Ft Jorge Farias 3.jpg",
    alt: "Festa em Malhada de Pedras",
    position: "center center",
  },
  {
    src: "/images/Alto do Moura - Jorge Pinho.jpg",
    alt: "Alto do Moura",
    position: "center center",
  },
  {
    src: "/images/Petrolina - Emerson Leite.jpg",
    alt: "Petrolina",
    position: "center center",
  },
  {
    src: "/images/nova Jerusalém - Jorge Pinho.jpg",
    alt: "Nova Jerusalem",
    position: "center center",
  },
];

const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];

const getRelativeOffset = (index, activeIndex) => {
  let offset = (index - activeIndex + HERO_SLIDES.length) % HERO_SLIDES.length;

  if (offset > HERO_SLIDES.length / 2) {
    offset -= HERO_SLIDES.length;
  }

  return offset;
};

const getOrbitTransform = (offset) => {
  const angle = offset * 47 + 135;
  const scale = offset === 0 ? 3.2 : Math.abs(offset) === 1 ? 1.28 : 0.86;

  return `rotate(${angle}deg) translateY(142px) rotate(${-angle}deg) translate(-50%, -50%) scale(${scale})`;
};

const AnimatedCounter = ({ end, suffix = "", label, active }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

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
    <div className="flex min-w-0 flex-col items-center justify-center px-1.5 py-2 sm:px-3 sm:py-3 md:p-4">
      <div className="hero-counter-value mb-0.5 font-mono text-[clamp(1rem,5vw,1.45rem)] font-black leading-none text-[#0B2341] sm:text-3xl md:mb-1 md:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="hero-counter-label max-w-full text-center text-[7px] font-bold uppercase leading-tight tracking-[0.06em] text-[#00AEEF] sm:text-[10px] sm:tracking-[0.12em] md:text-xs md:tracking-[0.16em]">
        {label}
      </div>
    </div>
  );
};

export default function Hero({ apresentacoes, municipios, artistas }) {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(
    () =>
      typeof document !== "undefined" &&
      document.body.classList.contains("contraste-negativo")
  );
  const [isDesktop, setIsDesktop] = useState(false);
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
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktopMode = () => setIsDesktop(mediaQuery.matches);

    updateDesktopMode();
    mediaQuery.addEventListener("change", updateDesktopMode);

    return () => mediaQuery.removeEventListener("change", updateDesktopMode);
  }, []);

  useEffect(() => {
    if (isCarouselPaused || isHighContrast) return undefined;

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isCarouselPaused, isHighContrast]);

  useEffect(() => {
    const showTimer = setTimeout(() => setContentVisible(true), 220);
    const countersTimer = setTimeout(() => setCountersActive(true), 700);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(countersTimer);
    };
  }, []);

  const orderedOrbitSlides = useMemo(() => {
    return HERO_SLIDES.map((slide, index) => ({
      ...slide,
      originalIndex: index,
      offset: getRelativeOffset(index, activeSlide),
    })).filter((slide) => VISIBLE_OFFSETS.includes(slide.offset));
  }, [activeSlide]);

  const handleCarouselPhotoClick = (slideIndex) => {
    setActiveSlide((current) =>
      slideIndex === current ? (current + 1) % HERO_SLIDES.length : slideIndex
    );
  };

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
        body.contraste-negativo #inicio > .absolute.inset-0.z-\\[1\\],
        body.contraste-negativo .hero-gallery,
        body.contraste-negativo .hero-bg-image,
        body.contraste-negativo .hero-fade,
        body.contraste-negativo .hero-bottom-fade {
          display: none !important;
        }
        body.contraste-negativo .hero-title-gradient {
          background: none !important;
          -webkit-text-fill-color: #ffea00 !important;
          color: #ffea00 !important;
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
        @media (prefers-reduced-motion: reduce) {
          .hero-bg-image,
          .hero-orbit-item {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <section
        id="inicio"
        className={`hero-section relative min-h-[780px] overflow-hidden sm:min-h-[760px] md:min-h-[780px] lg:min-h-[820px] xl:min-h-[840px] 2xl:min-h-[860px] ${
          isHighContrast ? "bg-black" : "bg-[#071a30]"
        }`}
      >
        <Breadcrumb />

        {!isHighContrast && (
          <div className="absolute inset-0">
            <img
              key={HERO_SLIDES[activeSlide].src}
              src={HERO_SLIDES[activeSlide].src}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="hero-bg-image absolute inset-0 h-full w-full scale-[1.04] object-cover transition-opacity duration-500 ease-out"
              style={{ objectPosition: HERO_SLIDES[activeSlide].position }}
            />
          </div>
        )}

        {!isHighContrast && (
          <>
            <div className="hero-overlay absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(4,16,31,0.7)_0%,rgba(7,24,47,0.3)_50%,rgba(4,16,31,0.82)_100%)] md:bg-[linear-gradient(100deg,rgba(4,16,31,0.94)_0%,rgba(6,25,48,0.7)_34%,rgba(7,26,48,0.2)_66%,rgba(7,24,47,0.26)_100%)]" />
            <div className="hero-fade pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[54%] bg-[radial-gradient(circle_at_30%_42%,rgba(0,174,239,0.18),transparent_35%),linear-gradient(90deg,rgba(4,16,31,0.96)_0%,rgba(4,16,31,0.68)_58%,transparent_100%)] md:block" />
            <div className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-[#071a30] via-[#071a30]/55 to-transparent" />
          </>
        )}

        {!isHighContrast && isDesktop && (
          <div
            className="hero-gallery pointer-events-auto absolute bottom-[-132px] right-[-134px] z-[2] h-[420px] w-[420px] xl:bottom-[-126px] xl:right-[-118px]"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onFocus={() => setIsCarouselPaused(true)}
            onBlur={() => setIsCarouselPaused(false)}
          >
            <div className="absolute left-1/2 top-1/2 h-[336px] w-[336px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#eebe97]/50 bg-white/[0.02] shadow-[0_0_72px_rgba(0,174,239,0.12)]" />
            <div className="absolute left-1/2 top-1/2 h-[232px] w-[232px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

            {orderedOrbitSlides.map((slide) => {
              const isActive = slide.offset === 0;

              return (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Mostrar imagem: ${slide.alt}`}
                  aria-current={isActive ? "true" : undefined}
                  title={isActive ? "Avancar para a proxima imagem" : slide.alt}
                  onClick={() => handleCarouselPhotoClick(slide.originalIndex)}
                  className={`hero-orbit-item absolute left-1/2 top-1/2 h-[58px] w-[58px] cursor-pointer overflow-hidden rounded-full border bg-white/10 p-1 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-white hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/60 ${
                    isActive
                      ? "z-20 border-[#eebe97]/85 shadow-[0_22px_58px_rgba(0,0,0,0.42)]"
                      : "z-10 border-white/50 shadow-[0_14px_32px_rgba(0,0,0,0.34)]"
                  }`}
                  style={{
                    opacity: 1,
                    transform: getOrbitTransform(slide.offset),
                  }}
                >
                  <img
                    src={slide.src}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    loading={isActive ? "eager" : "lazy"}
                    className="h-full w-full rounded-full object-cover"
                    style={{ objectPosition: slide.position }}
                  />
                </button>
              );
            })}
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-start pb-8 pt-[148px] sm:pt-[156px] md:pt-[176px] lg:items-start lg:pt-[190px] xl:pt-[204px]"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div
              className="pointer-events-auto mx-auto flex w-full max-w-full flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left"
              style={{ maxWidth: "clamp(280px, 52vw, 820px)" }}
            >
              <div className="hero-badge mb-4 inline-flex max-w-full items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-white shadow-sm backdrop-blur-md sm:mb-5 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.12em]">
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

              <h1 className="hidden w-full font-black leading-[0.96] tracking-[-0.035em] text-white sm:block sm:text-[2.55rem] md:text-[3rem] lg:text-left lg:text-[3.55rem] xl:text-[4.1rem]">
                {t.hero.titlePrefix}
                <span className="hero-title-gradient mt-1.5 block bg-gradient-to-r from-white via-[#7DD3FC] to-[#00AEEF] bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="hc-text-desc mt-3 w-full max-w-none text-center text-[12px] font-light leading-relaxed text-slate-200 sm:mt-4 sm:text-[14px] md:max-w-[42rem] md:text-center md:text-[15px] lg:max-w-[34rem] lg:text-left lg:text-[16px]">
                {t.hero.description}
              </p>

              <div className="hero-stats mt-4 grid w-full max-w-full grid-cols-3 divide-x-2 divide-slate-100 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-2xl shadow-blue-950/20 backdrop-blur-lg sm:mt-5 sm:p-3 md:max-w-[38rem] md:p-5 lg:max-w-[35rem]">
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

              {!isHighContrast && (
                <div className="mt-5 flex items-center justify-center gap-2 lg:hidden">
                  {HERO_SLIDES.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      aria-label={`Mostrar imagem: ${slide.alt}`}
                      aria-current={index === activeSlide ? "true" : undefined}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/50 ${
                        index === activeSlide
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/45"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
