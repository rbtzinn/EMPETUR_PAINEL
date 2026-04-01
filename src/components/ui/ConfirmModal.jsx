import React from 'react';
import { ExternalLink } from 'lucide-react';
import FadeIn from './FadeIn';

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <style>{`
        body.contraste-negativo .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .lucide { color: #ffea00 !important; }
      `}</style>
      
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={onClose} />

      <FadeIn className="relative w-full max-w-sm">
        <div className="hc-card bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center border border-white/20">
          
          <div className="hc-icon-wrapper w-20 h-20 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 text-[#00AEEF] shadow-inner">
            <ExternalLink strokeWidth={2} className="w-10 h-10 lucide" />
          </div>

          <h3 className="text-2xl font-black text-[#0B2341] mb-3 tracking-tight hc-text-destaque">Visitar Site Oficial?</h3>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed hc-text-desc">
            Você será redirecionado para o portal institucional da <strong className="text-[#0B2341] hc-text-destaque">EMPETUR</strong> na mesma aba. Deseja continuar?
          </p>

          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-500 text-sm font-bold rounded-2xl transition-all active:scale-95 focus:outline-none hc-botao-borda"
            >
              Cancelar
            </button>
            
            <button 
              onClick={onConfirm} 
              className="hc-botao-destaque flex-[1.2] px-4 py-3.5 bg-[#0B2341] hover:bg-[#00AEEF] text-white text-sm font-black uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] hover:shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] active:scale-95"
            >
              Continuar
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}