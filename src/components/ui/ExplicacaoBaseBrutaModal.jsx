import React from "react";
import { ArrowRight, Database } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

const BASE_BRUTA_URL =
  "https://docs.google.com/spreadsheets/d/1P94FuVBBiScKlty_slbSVOE5N6uO5g3bzD5giKMtT3I/view";

export default function ExplicacaoBaseBrutaModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <style>{`
        body.contraste-negativo .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .lucide { color: #ffea00 !important; }
      `}</style>

      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <FadeIn className="relative w-full max-w-md">
        <div className="hc-card flex flex-col items-center rounded-[2.5rem] border border-white/20 bg-white p-8 text-center shadow-2xl md:p-10">
          <div className="hc-icon-wrapper mb-6 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-orange-100 bg-orange-50/80 text-orange-500 shadow-inner">
            <Database strokeWidth={1.5} className="lucide h-10 w-10" />
          </div>

          <h2 className="mb-3 text-2xl font-black tracking-tight text-[#0B2341] hc-text-destaque">
            {t.dashboard.rawDatabaseModal.title}
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-slate-500 hc-text-desc whitespace-pre-line">
            {t.dashboard.rawDatabaseModal.description}
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="hc-botao-borda flex-1 rounded-2xl bg-slate-50 px-6 py-3.5 font-bold text-slate-500 transition-all hover:bg-slate-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              {t.dashboard.rawDatabaseModal.back}
            </button>

            <a
              href={BASE_BRUTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="hc-botao-destaque group flex flex-[1.2] items-center justify-center gap-2 rounded-2xl bg-[#00AEEF] px-6 py-3.5 font-black uppercase tracking-wider text-white shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] transition-all duration-300 hover:bg-[#0B2341] hover:shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] active:scale-95"
            >
              {t.dashboard.rawDatabaseModal.access}
              <ArrowRight
                strokeWidth={2.5}
                className="lucide h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
