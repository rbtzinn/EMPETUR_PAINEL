import React from "react";
import { ExternalLink } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
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

      <FadeIn className="relative w-full max-w-sm">
        <div className="hc-card flex flex-col items-center rounded-[2rem] border border-white/20 bg-white p-8 text-center shadow-2xl md:p-10">
          <div className="hc-icon-wrapper mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/80 text-[#00AEEF] shadow-inner">
            <ExternalLink strokeWidth={2} className="lucide h-10 w-10" />
          </div>

          <h3 className="mb-3 text-2xl font-black tracking-tight text-[#0B2341] hc-text-destaque">
            {t.confirmModal.title}
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-slate-500 hc-text-desc">
            {t.confirmModal.description}
          </p>

          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={onClose}
              className="hc-botao-borda flex-1 rounded-2xl bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-500 transition-all hover:bg-slate-100 active:scale-95 focus:outline-none"
            >
              {t.confirmModal.cancel}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="hc-botao-destaque flex-[1.2] rounded-2xl bg-[#0B2341] px-4 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] transition-all duration-300 hover:bg-[#00AEEF] hover:shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] active:scale-95"
            >
              {t.confirmModal.confirm}
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
