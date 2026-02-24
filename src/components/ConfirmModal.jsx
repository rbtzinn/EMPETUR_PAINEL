import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  // Se não estiver aberto, não renderiza nada na tela
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fundo escuro com blur (clicar nele também fecha o modal) */}
      <div 
        className="absolute inset-0 bg-[#0B2341]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* O Cartão do Modal */}
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
        
        {/* Ícone de aviso/link */}
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#00AEEF]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>

        <h3 className="text-xl font-black text-[#0B2341] mb-2">Visitar Site Oficial?</h3>
        <p className="text-sm text-slate-500 mb-8">
          Você será redirecionado para o portal da <strong>EMPETUR</strong> em uma nova aba. Deseja continuar?
        </p>

        {/* Botões do Modal */}
        <div className="flex gap-3 w-full">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-[#00AEEF] hover:bg-[#089bd3] text-white text-sm font-black uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-blue-500/30"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}