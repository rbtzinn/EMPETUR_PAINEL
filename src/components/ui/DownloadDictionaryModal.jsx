import React from "react";
import { BookOpen, DownloadCloud } from "lucide-react";
import FadeIn from "./FadeIn";

export default function DownloadDictionaryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <style>{`
        body.contraste-negativo .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .lucide { color: #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .bg-white { background-color: #000 !important; }
      `}</style>
      
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={onClose} />

      <FadeIn className="relative w-full max-w-md">
        <div className="hc-card rounded-[2.5rem] bg-white border border-white/20 shadow-2xl p-8 md:p-10 flex flex-col items-center text-center">
          
          <div className="hc-icon-wrapper w-24 h-24 rounded-[1.5rem] bg-indigo-50/80 border border-indigo-100 flex items-center justify-center mb-6 shadow-inner relative">
            <BookOpen strokeWidth={1.5} className="w-10 h-10 text-indigo-500 absolute -ml-4 lucide" />
            <DownloadCloud strokeWidth={2.5} className="w-8 h-8 text-[#0B2341] absolute -mr-6 mt-4 bg-white rounded-full p-1 lucide" />
          </div>

          <h2 className="text-2xl font-black text-[#0B2341] mb-3 tracking-tight hc-text-destaque">Dicionário de Dados</h2>
          
          <p className="text-slate-500 leading-relaxed mb-8 text-sm hc-text-desc">
            Baixe o documento oficial da EMPETUR contendo os <strong className="text-slate-700 hc-text-destaque">metadados técnicos</strong> do painel em formato PDF.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 transition-all active:scale-95 focus:outline-none hc-botao-borda"
            >
              Cancelar
            </button>
            
            <a 
              href="/docs/dicionario_dados_empetur.pdf" 
              download="Dicionario_Dados_EMPETUR.pdf" 
              onClick={onClose} 
              className="hc-botao-destaque flex-[1.2] px-4 py-3.5 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-wider shadow-[0_8px_20px_-6px_rgba(79,70,229,0.4)] hover:bg-[#0B2341] hover:shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              Baixar PDF
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}