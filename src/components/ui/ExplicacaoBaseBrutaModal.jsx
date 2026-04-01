import React from "react";
import { Database, ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

export default function ExplicacaoBaseBrutaModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const baseBrutaUrl = "https://docs.google.com/spreadsheets/d/1P94FuVBBiScKlty_slbSVOE5N6uO5g3bzD5giKMtT3I/view";

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
        <div className="hc-card rounded-[2.5rem] border border-white/20 shadow-2xl bg-white p-8 md:p-10 flex flex-col items-center text-center">
          
          <div className="hc-icon-wrapper w-20 h-20 rounded-[1.5rem] bg-orange-50/80 border border-orange-100 flex items-center justify-center mb-6 text-orange-500 shadow-inner">
            <Database strokeWidth={1.5} className="w-10 h-10 lucide" />
          </div>

          <h2 className="text-2xl font-black text-[#0B2341] mb-3 tracking-tight hc-text-destaque">Aviso sobre a Base Bruta</h2>
          <p className="text-slate-500 leading-relaxed mb-8 text-sm hc-text-desc">
            A planilha que você está prestes a acessar contém <strong className="text-slate-700 hc-text-destaque">todos os registros contábeis brutos</strong> do e-Fisco.<br/><br/>
            Ela possui <strong className="text-slate-700 hc-text-destaque">mais linhas que o painel</strong>, pois inclui notas de empenho estornadas, anuladas ou duplicidades que a nossa inteligência de dados já limpou da tela principal.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button 
              onClick={onClose} 
              className="flex-1 px-6 py-3.5 rounded-2xl bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-300 hc-botao-borda"
            >
              Voltar
            </button>
            
            <a 
              href={baseBrutaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={onClose} 
              className="hc-botao-destaque flex-[1.2] px-6 py-3.5 rounded-2xl bg-[#00AEEF] text-white font-black uppercase tracking-wider shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] hover:bg-[#0B2341] hover:shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group"
            >
              Acessar Base
              <ArrowRight strokeWidth={2.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform lucide" />
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}