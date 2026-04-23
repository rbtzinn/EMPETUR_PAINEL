import React, { useState } from "react";
import { ChevronLeft, Lightbulb, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export default function BotaoSugestaoFlutuante({ onOpen }) {
  const [minimizado, setMinimizado] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <style>{`
        body.contraste-negativo .hc-btn-sugestao { background-color: #000 !important; color: #ffea00 !important; border: 2px solid #ffea00 !important; box-shadow: none !important; }
        body.contraste-negativo .hc-btn-sugestao:hover { background-color: #ffea00 !important; color: #000 !important; }
      `}</style>

      <div
        className={`fixed bottom-4 z-[140] flex items-end justify-end transition-all duration-300 sm:bottom-6 ${
          minimizado ? "-left-7 sm:-left-9" : "left-3 sm:left-4"
        }`}
      >
        <AnimatePresence initial={false} mode="wait">
          {!minimizado ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative flex items-center"
            >
              <button
                type="button"
                onClick={onOpen}
                className="hc-btn-sugestao flex h-10 items-center gap-2 rounded-full border border-slate-100 bg-white px-4 pr-5 text-xs font-bold text-[#0B2341] shadow-[0_10px_40px_-10px_rgba(11,35,65,0.15)] transition-all hover:text-[#00AEEF] hover:shadow-[0_10px_40px_-10px_rgba(0,174,239,0.3)] active:scale-95 sm:h-14 sm:gap-3 sm:px-6 sm:pr-7 sm:text-sm"
              >
                <Lightbulb strokeWidth={2.5} className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden tracking-wide xs:inline">
                  {t.suggestion.floatingButton}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMinimizado(true)}
                className="hc-btn-sugestao absolute -right-1.5 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow-lg transition-all hover:text-red-500 active:scale-95 sm:-right-2 sm:-top-4 sm:h-8 sm:w-8"
              >
                <X strokeWidth={2.5} className="h-3 w-3 sm:h-4 sm:w-4" />
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
                type="button"
                onClick={() => setMinimizado(false)}
                aria-label={t.suggestion.floatingButton}
                title={t.suggestion.floatingButton}
                className="hc-btn-sugestao flex h-11 w-12 items-center justify-end rounded-r-full rounded-l-none border-y border-r border-slate-200 bg-slate-100 pr-2 text-[#0B2341] shadow-[0_10px_34px_-16px_rgba(11,35,65,0.22)] transition-all hover:translate-x-2 hover:bg-white hover:text-[#00AEEF] active:scale-95 sm:h-14 sm:w-14 sm:pr-3"
              >
                <ChevronLeft strokeWidth={2.5} className="h-4 w-4 rotate-180 sm:h-5 sm:w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
