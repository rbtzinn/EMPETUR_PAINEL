import React from "react";
import FadeIn from "../ui/FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Banner({ image }) {
  const { t } = useLanguage();

  return (
    <section className="bg-[#F8FAFC] px-4 pb-16 pt-12 sm:px-4 sm:pb-24 sm:pt-14 md:px-6">
      <style>{`
        body.contraste-negativo .hc-banner-container { background: #000 !important; border: 2px solid #ffea00 !important; box-shadow: none !important; }
        body.contraste-negativo .hc-banner-gradient { display: none !important; }
        body.contraste-negativo .hc-banner-chip { background: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
      `}</style>

      <div className="hc-banner-container relative mx-auto flex max-w-7xl flex-col overflow-hidden rounded-3xl bg-[#0B2341] shadow-2xl sm:rounded-[2.5rem] md:flex-row md:rounded-[3.5rem]">
        <div className="hc-banner-gradient absolute inset-y-0 right-0 z-0 w-full md:w-2/3 lg:w-3/4">
          <img
            src={image}
            alt={t.banner.imageAlt}
            className="h-full w-full object-cover object-center opacity-40 sm:opacity-60 md:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-[#0B2341]/90 to-[#0B2341]/0 md:bg-gradient-to-r" />
        </div>

        <div className="relative z-20 flex w-full flex-col justify-center p-6 sm:p-10 md:w-[65%] md:pr-0 md:pl-16 md:pt-16 md:pb-16 lg:w-1/2 lg:p-20 lg:pr-0">
          <FadeIn>
            <div className="hc-banner-gradient mb-4 h-1 w-8 rounded-full bg-[#00AEEF] shadow-[0_0_15px_rgba(0,174,239,0.5)] sm:mb-6 sm:h-1.5 sm:w-12 md:mb-8" />

            <h2 className="hc-text-destaque text-2xl font-black leading-[1.1] tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl">
              {t.banner.title}
            </h2>

            <p className="hc-text-desc mt-3 max-w-md text-sm font-light leading-relaxed text-slate-300 sm:mt-6 sm:text-base md:mt-8 md:text-lg">
              {t.banner.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-1.5 sm:mt-8 sm:gap-2 md:mt-10 md:gap-3">
              {t.banner.chips.map((chip) => (
                <span
                  key={chip}
                  className="hc-banner-chip cursor-default rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/20 sm:rounded-xl sm:px-4 sm:py-2 sm:text-[10px] md:px-5 md:py-2.5 md:text-xs"
                >
                  {chip}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="pointer-events-none mx-auto -mt-3 h-8 w-[88%] max-w-5xl rounded-full bg-[#0B2341]/10 blur-2xl sm:-mt-4 sm:h-10" />
    </section>
  );
}
