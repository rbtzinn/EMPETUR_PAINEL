import React from "react";
import { FileSpreadsheet, FileText, DownloadCloud } from "lucide-react";
import FadeIn from "./FadeIn";
import { exportarParaCSV, exportarParaExcelPersonalizado } from "../../utils/ExportUtils"; 

export default function ExportModal({ isOpen, onClose, dados }) {
  if (!isOpen) return null;

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
        <div className="hc-card rounded-[2.5rem] border border-white/20 shadow-2xl bg-white p-8 md:p-10 flex flex-col items-center text-center">
          
          <div className="hc-icon-wrapper w-24 h-24 rounded-full bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-8 shadow-inner relative">
            <div className="absolute inset-0 rounded-full bg-[#00AEEF]/5 animate-ping opacity-75"></div>
            <DownloadCloud strokeWidth={1.5} className="w-12 h-12 text-[#00AEEF] relative z-10 lucide" />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#0B2341] mb-3 tracking-tight hc-text-destaque">
            Exportar Painel
          </h2>
          <p className="text-slate-500 leading-relaxed mb-10 max-w-md text-base hc-text-desc">
            Estão visíveis <strong className="text-[#0B2341] font-black hc-text-destaque">{dados?.length || 0} registros</strong>. Escolha o formato de download desejado para a sua análise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-300 hc-botao-borda"
            >
              Cancelar
            </button>
            
            <button 
              onClick={() => { exportarParaCSV(dados); onClose(); }} 
              className="hc-botao-borda flex-[1.2] px-4 py-4 rounded-2xl border-2 border-[#00AEEF] text-[#00AEEF] font-black uppercase tracking-wider hover:bg-[#00AEEF] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <FileText strokeWidth={2.5} size={18} className="group-hover:-translate-y-1 transition-transform lucide" />
              CSV (Dados Abertos)
            </button>

            <button 
              onClick={async () => { 
                await exportarParaExcelPersonalizado(dados); 
                onClose(); 
              }} 
              className="hc-botao-destaque flex-[1.2] px-4 py-4 rounded-2xl bg-emerald-600 text-white font-black uppercase tracking-wider shadow-[0_8px_20px_-6px_rgba(5,150,105,0.4)] hover:bg-emerald-700 hover:shadow-[0_8px_20px_-6px_rgba(4,120,87,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <FileSpreadsheet strokeWidth={2.5} size={18} className="group-hover:-translate-y-1 transition-transform lucide" />
              Excel (.XLSX)
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}