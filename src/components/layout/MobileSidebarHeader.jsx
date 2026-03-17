import React from 'react';

export default function MobileSidebarHeader({ isMobileMenuOpen, setIsMobileMenuOpen, temFiltroAtivo }) {
  return (
    <>
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-[60] flex items-center justify-between p-4 bg-[#0B2341] transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center gap-3">
          <img src="/images/empeturlogobranca.png" alt="Logo" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-white font-black text-xs uppercase tracking-tight">Filtros e Gestão</span>
            <span className="text-[#00AEEF] font-bold text-[9px] uppercase tracking-widest">Painel Oficial</span>
          </div>
        </div>

        <button onClick={() => setIsMobileMenuOpen(true)} className="relative p-3 text-white bg-white/10 rounded-xl hover:bg-white/20 transition-all active:scale-95">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          {temFiltroAtivo && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AEEF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00AEEF] border-2 border-[#0B2341]"></span>
            </span>
          )}
        </button>
      </div>
      <div className="lg:hidden h-20"></div>
    </>
  );
}