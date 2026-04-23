import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../contexts/LanguageContext";
import Breadcrumb from "../layout/Breadcrumb";

gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [isDesktopHero, setIsDesktopHero] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768
  );
  const [isHighContrast, setIsHighContrast] = useState(
    () =>
      typeof document !== "undefined" &&
      document.body.classList.contains("contraste-negativo")
  );
  const [videoReady, setVideoReady] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [countersActive, setCountersActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateMode = (event) => setIsDesktopHero(event.matches);

    setIsDesktopHero(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMode);
      return () => mediaQuery.removeEventListener("change", updateMode);
    }

    mediaQuery.addListener(updateMode);
    return () => mediaQuery.removeListener(updateMode);
  }, []);

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
    if (!isDesktopHero) {
      setVideoReady(true);
      return undefined;
    }

    setVideoReady(false);

    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
      setVideoReady(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [isDesktopHero]);

  useEffect(() => {
    if (!videoReady) return;

    const showTimer = setTimeout(() => setContentVisible(true), 220);
    const countersTimer = setTimeout(() => setCountersActive(true), 700);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(countersTimer);
    };
  }, [videoReady]);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!isDesktopHero) return;
    if (!hero || !video || !videoReady) return;

    if (!isDesktopHero || isHighContrast) {
      scrollTriggerRef.current = null;
      video.currentTime = 0;

      if (!isHighContrast) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }

      return () => {
        video.pause();
      };
    }

    const scrubState = { time: 0 };
    const duration = Math.max(0.01, video.duration || 0);
    const endDistance = Math.max(
      Math.round(window.innerHeight * 1.05),
      Math.round(duration * 620)
    );

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: `+=${endDistance}`,
          scrub: 0.35,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTriggerRef.current = timeline.scrollTrigger ?? null;

      timeline.to(scrubState, {
        time: duration,
        onUpdate: () => {
          const nextTime = Math.min(scrubState.time, Math.max(duration - 1 / 60, 0));

          if (Math.abs(video.currentTime - nextTime) > 1 / 120) {
            video.currentTime = nextTime;
          }
        },
      });
    }, hero);

    ScrollTrigger.refresh();

    return () => {
      scrollTriggerRef.current = null;
      context.revert();
    };
  }, [videoReady, isDesktopHero, isHighContrast]);

  const handleScrollToPanel = (event) => {
    event.preventDefault();

    const target = document.getElementById("painel");
    if (target) {
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        body.contraste-negativo #inicio {
          background: #000 !important;
        }
        body.contraste-negativo .hero-video {
          display: none !important;
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
        .hero-video::-webkit-media-controls {
          display: none !important;
        }
        .hero-video::-webkit-media-controls-enclosure {
          display: none !important;
        }
      `}</style>

      <section
        ref={heroRef}
        id="inicio"
        className="relative h-screen overflow-hidden bg-[#0B2341]"
      >
        <Breadcrumb />

        {isDesktopHero && (
          <video
            ref={videoRef}
            className="hero-video absolute inset-0 h-full w-full object-cover"
            src="/hero-video.mp4"
            muted
            playsInline
            preload="auto"
            loop={false}
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            style={{
              pointerEvents: "none",
              objectPosition: "46% 52%",
              transform: "scale(1.08)",
              transformOrigin: "center center",
            }}
          />
        )}

        <div className="hero-overlay absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,#123f72_0%,#0B2341_42%,#06182e_100%)] md:bg-[linear-gradient(to_bottom,rgba(7,24,47,0.42)_0%,rgba(7,24,47,0.12)_52%,rgba(7,24,47,0.65)_100%)]" />
        <div className="absolute inset-0 z-[1] hidden bg-[linear-gradient(to_right,#0B2341_0%,#0B2341_16%,rgba(11,35,65,0.86)_34%,rgba(11,35,65,0.46)_54%,transparent_100%)] md:block" />
        <div
          className="absolute inset-0 z-[2] flex flex-col items-center justify-start md:items-start"
          style={{
            padding: "176px 0 2rem",
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="mx-auto flex w-full max-w-full flex-col items-center text-center md:mx-0 md:block md:text-left" style={{ maxWidth: isDesktopHero ? "clamp(280px, 39%, 520px)" : "100%" }}>
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

              <p className="hc-text-desc mt-3 w-full max-w-none text-center text-[12px] font-light leading-relaxed text-slate-200 sm:mt-4 sm:text-[14px] md:max-w-[31rem] md:text-left md:text-[15px]">
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
        </div>
      </section>
    </>
  );
}
