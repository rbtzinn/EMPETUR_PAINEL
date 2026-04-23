import React from "react";
import { BookOpen, DownloadCloud } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

export default function DownloadDictionaryModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <style>{`
        body.contraste-negativo .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .lucide { color: #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .bg-white { background-color: #000 !important; }
      `}</style>

      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <FadeIn className="relative w-full max-w-md">
        <div className="hc-card flex flex-col items-center rounded-[2.5rem] border border-white/20 bg-white p-8 text-center shadow-2xl md:p-10">
          <div className="hc-icon-wrapper relative mb-6 flex h-24 w-24 items-center justify-center rounded-[1.5rem] border border-indigo-100 bg-indigo-50/80 shadow-inner">
            <BookOpen
              strokeWidth={1.5}
              className="lucide absolute -ml-4 h-10 w-10 text-indigo-500"
            />
            <DownloadCloud
              strokeWidth={2.5}
              className="lucide absolute -mr-6 mt-4 h-8 w-8 rounded-full bg-white p-1 text-[#0B2341]"
            />
          </div>

          <h2 className="mb-3 text-2xl font-black tracking-tight text-[#0B2341] hc-text-destaque">
            {t.downloadDictionaryModal.title}
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-slate-500 hc-text-desc">
            {t.downloadDictionaryModal.description}
          </p>

          <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="hc-botao-borda flex-1 rounded-2xl bg-slate-50 px-4 py-3.5 font-bold text-slate-500 transition-all hover:bg-slate-100 active:scale-95 focus:outline-none"
            >
              {t.downloadDictionaryModal.cancel}
            </button>

            <a
              href="/docs/dicionario_dados_empetur.pdf"
              download="Dicionario_Dados_EMPETUR.pdf"
              onClick={onClose}
              className="hc-botao-destaque flex flex-[1.2] items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3.5 font-black uppercase tracking-wider text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.4)] transition-all duration-300 hover:bg-[#0B2341] hover:shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] active:scale-95"
            >
              {t.downloadDictionaryModal.download}
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
