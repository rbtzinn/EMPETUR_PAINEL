import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Trash2, X } from "lucide-react";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";
import PainelFilterFields from "./painel/PainelFilterFields";
import DesktopPainelMenu from "./painel/DesktopPainelMenu";

export default function TopbarPainel({
  filtros,
  setFiltros,
  getOpcoes,
  limparFiltros,
  temFiltroAtivo,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const { t } = useLanguage();
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const desktopMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) {
        setIsDesktopMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsDesktopMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <style>{`
        body.contraste-negativo .hc-topbar-painel { 
          background-color: #000 !important; 
          border: 2px solid #ffea00 !important; 
          box-shadow: none !important; 
        }
        body.contraste-negativo .hc-topbar-mobile { 
          background-color: #000 !important; 
          border-bottom: 2px solid #ffea00 !important; 
          box-shadow: none !important;
        }
        body.contraste-negativo .hc-pe-colors { display: none !important; }
        body.contraste-negativo .hc-btn-limpar { 
          background-color: transparent !important; 
          color: #ffea00 !important; 
          border: 1px solid #ffea00 !important; 
        }
        body.contraste-negativo .hc-btn-limpar:hover { 
          background-color: #ffea00 !important; 
          color: #000 !important; 
        }
        body.contraste-negativo .hc-btn-aplicar { 
          background-color: #ffea00 !important; 
          color: #000 !important; 
          border: none !important;
        }
        body.contraste-negativo .hc-topbar-painel-divider { 
          background-color: #ffea00 !important; 
          opacity: 0.3; 
        }
      `}</style>

      <div className="hidden w-full px-6 pt-6 lg:sticky lg:top-0 lg:z-50 lg:block">
        <div className="mx-auto max-w-[1600px]">
          <div className="hc-topbar-painel group relative flex items-end gap-4 rounded-[2.25rem] border border-slate-200/70 bg-white/95 p-4 pl-6 shadow-[0_20px_50px_-20px_rgba(11,35,65,0.25)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,174,239,0.2)]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
              <div className="hc-pe-colors absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#0B2341] via-[#00AEEF] via-yellow-400 via-red-500 to-green-500 opacity-90 transition-all duration-300" />
            </div>

            <PainelFilterFields
              fields={t.dashboard.topbar.fields}
              filtros={filtros}
              setFiltros={setFiltros}
              getOpcoes={getOpcoes}
              className="grid flex-1 grid-cols-6 gap-3.5"
            />

            <div className="flex items-center self-end gap-3 pr-1 pb-5">
              <button
                type="button"
                onClick={limparFiltros}
                disabled={!temFiltroAtivo}
                className={`hc-btn-limpar group flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 text-[10px] font-black uppercase tracking-widest transition-all ${
                  temFiltroAtivo
                    ? "bg-red-50 text-red-500 shadow-sm ring-1 ring-red-100 hover:bg-red-500 hover:text-white active:scale-95"
                    : "cursor-not-allowed bg-slate-50 text-slate-300 opacity-60"
                }`}
              >
                <Trash2
                  size={14}
                  className={temFiltroAtivo ? "transition-transform group-hover:scale-110" : ""}
                />
                {t.dashboard.topbar.clear}
              </button>

              <DesktopPainelMenu
                isOpen={isDesktopMenuOpen}
                onToggle={() => setIsDesktopMenuOpen((current) => !current)}
                onClose={() => setIsDesktopMenuOpen(false)}
                menuRef={desktopMenuRef}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[130] bg-[#0B2341]/60 backdrop-blur-md lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="hc-topbar-mobile fixed inset-x-0 top-0 z-[140] flex h-[100dvh] w-full flex-col overflow-hidden rounded-b-[2rem] bg-white shadow-[0_20px_50px_-15px_rgba(11,35,65,0.35)] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 p-6">
                <div className="flex items-center gap-3">
                  <div className="hc-btn-limpar flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#00AEEF]">
                    <Filter size={18} strokeWidth={2.5} />
                  </div>
                  <span className="hc-text-destaque text-sm font-black uppercase tracking-tight text-[#0B2341]">
                    {t.dashboard.topbar.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hc-btn-limpar flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-all hover:text-[#0B2341] active:scale-95"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              <div className="relative z-20 flex-1 overflow-y-auto overflow-x-visible bg-white p-6 pb-8 scrollbar-moderna">
                <div className="mb-5 flex justify-center">
                  <LanguageSwitcher theme="light" />
                </div>

                <PainelFilterFields
                  fields={t.dashboard.topbar.fields}
                  filtros={filtros}
                  setFiltros={setFiltros}
                  getOpcoes={getOpcoes}
                  className="flex flex-col gap-5"
                />
              </div>

              <div className="relative z-10 flex shrink-0 gap-3 border-t border-slate-100 bg-white p-6">
                <button
                  type="button"
                  onClick={limparFiltros}
                  disabled={!temFiltroAtivo}
                  className={`hc-btn-limpar flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black uppercase tracking-widest transition-all ${
                    temFiltroAtivo
                      ? "bg-red-50 text-red-500 hover:bg-red-100"
                      : "bg-slate-50 text-slate-300 opacity-50"
                  }`}
                >
                  <Trash2 size={16} strokeWidth={2.5} /> {t.dashboard.topbar.clear}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hc-btn-aplicar flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-[#00AEEF] py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] transition-all hover:bg-[#0B2341] active:scale-95"
                >
                  {t.dashboard.topbar.apply}
                </button>

                <div className="hc-pe-colors absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#0B2341] via-[#00AEEF] via-yellow-400 via-red-500 to-green-500 opacity-90" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
