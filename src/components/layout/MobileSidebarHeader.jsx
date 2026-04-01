import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileSidebarHeader({ isMobileMenuOpen, setIsMobileMenuOpen, temFiltroAtivo }) {
  return (
    <div className="lg:hidden flex justify-center w-full px-4 pt-4 pb-2 bg-[#F8FAFC]">
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(true)} 
        className="w-full relative flex items-center justify-between p-4 bg-white border border-slate-200 rounded-[1.5rem] shadow-lg shadow-blue-900/5 text-left transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#00AEEF] flex items-center justify-center">
            <SlidersHorizontal size={18} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#0B2341] font-black text-sm tracking-tight">Filtros Avançados</span>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              {temFiltroAtivo ? 'Filtros Ativos' : 'Toque para refinar'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {temFiltroAtivo && (
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AEEF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00AEEF]"></span>
            </span>
          )}
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
      </motion.button>
    </div>
  );
}