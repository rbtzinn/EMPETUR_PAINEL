import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Trash2, X } from "lucide-react";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";
import PainelFilterFields from "./painel/PainelFilterFields";
import DesktopPainelMenu from "./painel/DesktopPainelMenu";
import ViewModeToggle from "../ui/ViewModeToggle";

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
  const [desktopTopbarHeight, setDesktopTopbarHeight] = useState(64);
  const desktopMenuRef = useRef(null);
  const desktopTopbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) {
        setIsDesktopMenuOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") setIsDesktopMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const topbar = desktopTopbarRef.current;
    if (!topbar) return undefined;

    const updateTopbarHeight = () => {
      const nextHeight = Math.ceil(topbar.getBoundingClientRect().height);
      if (nextHeight > 0) {
        setDesktopTopbarHeight(nextHeight);
      }
    };

    updateTopbarHeight();

    const resizeObserver = new ResizeObserver(updateTopbarHeight);
    resizeObserver.observe(topbar);
    window.addEventListener("resize", updateTopbarHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTopbarHeight);
    };
  }, []);

  return (
    <>
      <style>{`
        body.contraste-negativo .hc-topbar-painel { 
          background-color: #000 !important; 
          border-bottom: 2px solid #ffea00 !important; 
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
        body.contraste-negativo .hc-topbar-brand-pill {
          background-color: #222 !important;
          border-color: #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-topbar-separator {
          background-color: #ffea00 !important;
          opacity: 1 !important;
        }
      `}</style>

      {/* ── Desktop: barra completa, full-width, plana ── */}
      <div className="hidden lg:block">
        <div
          ref={desktopTopbarRef}
          data-tour="filters-desktop"
          className="hc-topbar-painel fixed inset-x-0 top-0 z-50 w-full border-b border-slate-200 bg-white/98 backdrop-blur-xl"
        >
          {/* Faixa de cor PE no topo */}
          <div className="hc-pe-colors h-[2.5px] w-full bg-gradient-to-r from-[#0B2341] via-[#00AEEF] via-yellow-400 via-red-500 to-green-500" />

          {/* Linha principal: brand + filtros + modo + menu */}
          <div className="flex items-center gap-0 px-5 py-1" style={{ minHeight: "58px" }}>

            {/* Brand block */}
            <div className="hc-topbar-brand-pill mr-3 flex shrink-0 items-center gap-2.5 border-r border-slate-200 pr-4 py-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#0B2341] p-1">
                <img
                  src="/images/empeturlogo.png"
                  alt="Logo EMPETUR"
                  className="h-full w-full object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Filtros */}
            <PainelFilterFields
              fields={t.dashboard.topbar.fields}
              filtros={filtros}
              setFiltros={setFiltros}
              getOpcoes={getOpcoes}
              className="grid flex-1 grid-cols-6 gap-1.5 py-2"
              compact
            />

            {/* Separador */}
            <div className="hc-topbar-separator mx-3 h-6 w-px shrink-0 bg-slate-200" />

            {/* Toggle de modo */}
            <div className="shrink-0" data-tour="view-mode-toggle">
              <ViewModeToggle />
            </div>

            {/* Separador */}
            <div className="hc-topbar-separator mx-3 h-6 w-px shrink-0 bg-slate-200" />

            {/* Limpar */}
            <button
              type="button"
              onClick={limparFiltros}
              disabled={!temFiltroAtivo}
              className={`hc-btn-limpar mr-2 flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[8px] font-black uppercase tracking-widest transition-all ${temFiltroAtivo
                  ? "text-red-500 hover:bg-red-500 hover:text-white active:scale-95"
                  : "cursor-not-allowed text-slate-300 opacity-60"
                }`}
            >
              <X size={11} />
              {t.dashboard.topbar.clear}
            </button>

            {/* Menu de acessibilidade */}
            <DesktopPainelMenu
              isOpen={isDesktopMenuOpen}
              onToggle={() => setIsDesktopMenuOpen((current) => !current)}
              onClose={() => setIsDesktopMenuOpen(false)}
              menuRef={desktopMenuRef}
            />
          </div>
        </div>
        <div style={{ height: desktopTopbarHeight }} aria-hidden="true" />
      </div>

      {/* Mobile: drawer */}
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
                  className={`hc-btn-limpar flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black uppercase tracking-widest transition-all ${temFiltroAtivo
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
