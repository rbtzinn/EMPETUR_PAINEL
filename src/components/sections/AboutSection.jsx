import React, { useState } from "react";
import { ArrowRight, RefreshCcw, ShieldCheck, Target } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import GovernancaModal from "../ui/GovernancaModal";
import { useLanguage } from "../../contexts/LanguageContext";

const CARD_ICONS = [Target, RefreshCcw, ShieldCheck];
const CARD_STYLES = [
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-white/10 text-white",
];

export default function AboutSection({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-white py-24 md:py-32"
      aria-label={t.about.aria}
    >
      <GovernancaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <style>{`
        body.contraste-negativo .hc-sobre-bg { display: none !important; }
        body.contraste-negativo .hc-botao-borda { border: 2px solid #ffea00 !important; color: #ffea00 !important; background: transparent !important; }
        body.contraste-negativo .hc-botao-borda:hover { background: #ffea00 !important; color: #000 !important; }
        body.contraste-negativo #sobre .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo #sobre .hc-icon-wrapper .lucide { color: #ffea00 !important; }

        @media (max-width: 640px) {
          #sobre .max-w-2xl { text-align: center; }
          #sobre .hc-card { text-align: center; align-items: center; margin: 0 auto; }
        }
      `}</style>

      <div className="hc-sobre-bg pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-slate-50 opacity-50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeIn className="mb-14 max-w-3xl md:mb-18">
          <div className="hc-sobre-bg mb-6 h-1.5 w-12 rounded-full bg-[#00AEEF]" />
          <h2 className="mb-5 max-w-full text-3xl font-black tracking-tight text-[#0B2341] hc-text-destaque [overflow-wrap:anywhere] sm:text-4xl md:text-5xl">
            {t.about.title}
          </h2>
          <p className="max-w-2xl text-lg font-light leading-8 text-slate-500 hc-text-desc md:text-xl">
            {t.about.description}
          </p>
        </FadeIn>

        <FadeIn
          staggerChildren
          direction="none"
          className="grid gap-6 md:grid-cols-3 lg:gap-7"
        >
          {t.about.cards.map((card, index) => {
            const Icon = CARD_ICONS[index];
            const isHighlight = index === 2;

            return (
              <FadeIn
                key={card.title}
                direction="up"
                delay={0.1 * (index + 1)}
                className="h-full"
              >
                <div
                  className={`hc-card group relative flex h-full flex-col rounded-[2rem] border p-7 transition-all duration-300 md:p-8 ${
                    isHighlight
                      ? "overflow-hidden border-[#0B2341] bg-[#0B2341]"
                      : "border-slate-100 bg-slate-50"
                  }`}
                >
                  {isHighlight && (
                    <div className="hc-sobre-bg absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#00AEEF]/20 blur-2xl" />
                  )}

                  <div
                    className={`hc-icon-wrapper relative z-10 mb-7 flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner ${CARD_STYLES[index]}`}
                  >
                    <Icon strokeWidth={2} className="lucide h-8 w-8" />
                  </div>

                  <h3
                    className={`relative z-10 mb-4 text-2xl font-black tracking-tight hc-text-destaque ${
                      isHighlight ? "text-white" : "text-[#0B2341]"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`relative z-10 flex-1 text-sm leading-7 hc-text-desc ${
                      isHighlight ? "mb-8 text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {card.desc}
                  </p>

                  {isHighlight && (
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="hc-botao-borda relative z-10 mt-auto flex w-full items-center justify-between rounded-2xl bg-[#00AEEF] px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition-colors duration-300 active:scale-95"
                    >
                      {t.about.cta}
                      <ArrowRight strokeWidth={2.5} className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
