import React from "react";
import FadeIn from "../ui/FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";

const ICONS = [
  <svg
    className="hc-icon h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>,
  <svg
    className="hc-icon h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>,
  <svg
    className="hc-icon h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>,
];

export default function InternalControlSection() {
  const { t } = useLanguage();

  return (
    <section
      id="gestao"
      className="relative overflow-hidden bg-[#0B2341] py-24 text-white md:py-32"
    >
      <style>{`
        body.contraste-negativo .hc-gestao-glow { display: none !important; }
        body.contraste-negativo .hc-gestao-card { background: #000 !important; border: 2px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .hc-icon { color: #ffea00 !important; }
      `}</style>

      <div className="hc-gestao-glow pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/2 rounded-full bg-[#00AEEF] opacity-10 blur-[120px]" />
      <div className="hc-gestao-glow pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full bg-[#00AEEF] opacity-10 blur-[100px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <FadeIn direction="down" className="mb-16">
          <div className="hc-gestao-card mb-8 inline-flex items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <img
              src="images/controleinternologo.png"
              alt="AECI EMPETUR"
              className="h-16 object-contain opacity-90 filter brightness-0 invert md:h-20"
            />
          </div>
        </FadeIn>

        <FadeIn
          staggerChildren
          direction="none"
          className="grid w-full gap-6 md:grid-cols-3 lg:gap-8"
        >
          {t.internalControl.steps.map((step, index) => (
            <FadeIn key={step.title} direction="up" className="h-full">
              <div className="hc-gestao-card group flex h-full flex-col items-center rounded-[2.5rem] border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 md:p-10">
                <div className="hc-icon-wrapper mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00AEEF]/20 text-[#00AEEF] ring-1 ring-[#00AEEF]/50 transition-all duration-300 group-hover:bg-[#00AEEF] group-hover:text-white">
                  {ICONS[index]}
                </div>
                <h4 className="mb-3 text-xl font-black tracking-tight text-white hc-text-destaque md:text-2xl">
                  {step.title}
                </h4>
                <p className="text-sm font-light leading-relaxed text-slate-400 hc-text-desc md:text-base">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </FadeIn>

        <FadeIn delay={0.6} className="mt-20 w-full max-w-3xl border-t border-white/10 pt-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hc-text-desc md:text-xs">
            {t.internalControl.footer}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
