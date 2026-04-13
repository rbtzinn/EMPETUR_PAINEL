import React from "react";
import { DownloadCloud, FileSpreadsheet, FileText } from "lucide-react";
import FadeIn from "./FadeIn";
import {
  exportarParaCSV,
  exportarParaExcelPersonalizado,
} from "../../utils/ExportUtils";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ExportModal({ isOpen, onClose, dados }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const description = t.dashboard.exportModal.description.replace(
    "{count}",
    dados?.length || 0
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <style>{`
        body.contraste-negativo .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .lucide { color: #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .bg-\\[\\#00AEEF\\]\\/5 { display: none !important; }
      `}</style>

      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <FadeIn className="relative w-full max-w-2xl">
        <div className="hc-card flex flex-col items-center rounded-[2.5rem] border border-white/20 bg-white p-8 text-center shadow-2xl md:p-10">
          <div className="hc-icon-wrapper relative mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-blue-100 bg-blue-50/80 shadow-inner">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#00AEEF]/5 opacity-75" />
            <DownloadCloud
              strokeWidth={1.5}
              className="lucide relative z-10 h-12 w-12 text-[#00AEEF]"
            />
          </div>

          <h2 className="mb-3 text-3xl font-black tracking-tight text-[#0B2341] hc-text-destaque md:text-4xl">
            {t.dashboard.exportModal.title}
          </h2>
          <p className="hc-text-desc mb-10 max-w-md text-base leading-relaxed text-slate-500">
            {description}
          </p>

          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="hc-botao-borda flex flex-1 items-center justify-center rounded-2xl bg-slate-50 px-4 py-4 font-bold text-slate-500 transition-all hover:bg-slate-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              {t.dashboard.exportModal.cancel}
            </button>

            <button
              type="button"
              onClick={() => {
                exportarParaCSV(dados);
                onClose();
              }}
              className="hc-botao-borda group flex flex-[1.2] items-center justify-center gap-2 rounded-2xl border-2 border-[#00AEEF] px-4 py-4 font-black uppercase tracking-wider text-[#00AEEF] transition-all hover:bg-[#00AEEF] hover:text-white active:scale-95"
            >
              <FileText
                strokeWidth={2.5}
                size={18}
                className="lucide transition-transform group-hover:-translate-y-1"
              />
              {t.dashboard.exportModal.csv}
            </button>

            <button
              type="button"
              onClick={async () => {
                await exportarParaExcelPersonalizado(dados);
                onClose();
              }}
              className="hc-botao-destaque group flex flex-[1.2] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-4 font-black uppercase tracking-wider text-white shadow-[0_8px_20px_-6px_rgba(5,150,105,0.4)] transition-all duration-300 hover:bg-emerald-700 hover:shadow-[0_8px_20px_-6px_rgba(4,120,87,0.4)] active:scale-95"
            >
              <FileSpreadsheet
                strokeWidth={2.5}
                size={18}
                className="lucide transition-transform group-hover:-translate-y-1"
              />
              {t.dashboard.exportModal.excel}
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
