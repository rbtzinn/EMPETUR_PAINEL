import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BotaoSugestaoFlutuante({ onOpen }) {
  const [minimizado, setMinimizado] = useState(false);

  return (
    <>
      <style>{`
        body.contraste-negativo .hc-btn-sugestao { background-color: #000 !important; color: #ffea00 !important; border: 2px solid #ffea00 !important; box-shadow: none !important; }
        body.contraste-negativo .hc-btn-sugestao:hover { background-color: #ffea00 !important; color: #000 !important; }
      `}</style>

      {/* 🔴 Ajuste: margem um pouco menor no mobile (bottom-4 right-4) */}
      <div className="fixed bottom-4 right-0 sm:bottom-6 sm:right-0 z-[140] flex items-center justify-end h-10 sm:h-14">
        <AnimatePresence initial={false} mode="wait">
          {!minimizado ? (
            <motion.div 
              key="expanded"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <button
                onClick={onOpen}
                // 🔴 Ajuste: h-10 px-4 text-xs no mobile
                className="hc-btn-sugestao h-10 sm:h-14 px-4 sm:px-6 rounded-full bg-white text-[#0B2341] font-bold text-xs sm:text-sm flex items-center gap-2 sm:gap-3 shadow-[0_10px_40px_-10px_rgba(11,35,65,0.15)] hover:shadow-[0_10px_40px_-10px_rgba(0,174,239,0.3)] hover:text-[#00AEEF] transition-all border border-slate-100 active:scale-95"
              >
                <Lightbulb strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline tracking-wide">Sugerir Melhoria</span>
              </button>

              <button
                onClick={() => setMinimizado(true)}
                // 🔴 Ajuste: Botão de X menor (w-8 h-8) no mobile
                className="hc-btn-sugestao w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-red-500 shadow-lg border border-slate-100 transition-all active:scale-95"
              >
                <X strokeWidth={2.5} className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="collapsed"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setMinimizado(false)}
                className="hc-btn-sugestao w-10 h-10 sm:w-12 sm:h-14 rounded-l-full rounded-r-none bg-white flex items-center justify-center pl-1.5 sm:pl-2 text-[#0B2341] shadow-[0_10px_40px_-10px_rgba(11,35,65,0.15)] border-y border-l border-slate-100 hover:text-[#00AEEF] hover:pr-1.5 sm:hover:pr-2 transition-all"
              >
                <ChevronLeft strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}