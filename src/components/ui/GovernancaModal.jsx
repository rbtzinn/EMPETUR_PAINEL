import React from "react";
import { X } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

const STEP_COLOR_CLASSES = {
  red: "bg-red-100 text-red-600",
  orange: "bg-orange-100 text-orange-600",
  emerald: "bg-emerald-100 text-emerald-600",
  blue: "bg-blue-100 text-blue-600",
};

export default function GovernancaModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <FadeIn className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-2xl md:rounded-[2.5rem]">
        <div className="relative flex items-start justify-between gap-3 overflow-hidden bg-gradient-to-r from-[#0B2341] to-[#123661] px-5 py-5 md:items-center md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <div className="relative z-10 min-w-0 pr-1">
            <h2 className="mb-1 max-w-[13rem] text-[1.35rem] font-black leading-tight tracking-tight text-white sm:max-w-none sm:text-2xl md:text-3xl">
              {t.governanceModal.title}
            </h2>
            <p className="max-w-[13.5rem] text-[0.62rem] font-bold uppercase leading-snug tracking-[0.16em] text-[#00AEEF] sm:max-w-none sm:text-xs sm:tracking-widest">
              {t.governanceModal.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="relative z-10 shrink-0 rounded-full bg-white/5 p-2.5 text-white/60 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
            aria-label="Fechar modal"
          >
            <X strokeWidth={2.5} size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 text-slate-600 scrollbar-moderna md:p-10">
          <p className="mb-8 text-base leading-relaxed text-slate-500 md:text-lg">
            {t.governanceModal.intro}
          </p>

          <FadeIn
            staggerChildren
            direction="none"
            className="grid gap-6 md:grid-cols-2"
          >
            {t.governanceModal.steps.map((item) => (
              <FadeIn
                key={item.title}
                direction="up"
                className="group rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-all duration-300 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black shadow-sm transition-transform group-hover:scale-110 ${STEP_COLOR_CLASSES[item.color]}`}
                  >
                    {item.num}
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2341]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </FadeIn>
            ))}
          </FadeIn>
        </div>

        <div className="shrink-0 border-t border-slate-100 bg-white p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl bg-[#0B2341] py-4 font-black uppercase tracking-widest text-white shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] transition-colors duration-300 hover:bg-[#00AEEF] hover:shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] active:scale-95"
          >
            {t.governanceModal.acknowledge}
          </button>
        </div>
      </FadeIn>
    </div>
  );
}
