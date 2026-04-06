import React from "react";
import { Trash2, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropdownPesquisavel from "../ui/DropdownPesquisavel";

export default function TopbarPainel({ 
  filtros, 
  setFiltros, 
  getOpcoes, 
  limparFiltros, 
  temFiltroAtivo,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  return (
    <>
      <style>{`
        /* 🔴 BLINDAGEM DO ALTO CONTRASTE */
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
        /* Esconde as cores de PE no modo Alto Contraste para garantir a leitura */
        body.contraste-negativo .hc-pe-colors { 
          display: none !important; 
        }
        
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
          font-weight: black !important; 
          border: none !important;
        }
        body.contraste-negativo .hc-topbar-painel-divider { 
          background-color: #ffea00 !important; 
          opacity: 0.3; 
        }
      `}</style>

      {/* ======================================================== */}
      {/* 1. TOPBAR DE FILTROS - DESKTOP */}
      {/* ======================================================== */}
      <div className="hidden lg:block sticky top-0 z-50 w-full pt-6 px-6">
        <div className="max-w-[1600px] mx-auto">
          
          {/* 🔴 CONTAINER COM SOMBRA AZUL ESCURA E BORDA DE PERNAMBUCO */}
          <div className="hc-topbar-painel relative bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(11,35,65,0.4)] rounded-[2.5rem] p-3 pl-8 flex items-center gap-4 transition-all duration-500 group hover:shadow-[0_20px_50px_-15px_rgba(0,174,239,0.4)]">
            
            {/* ✨ DETALHE INSTITUCIONAL: Cores EMPETUR + Bandeira PE no topo da barra */}
            <div className="hc-pe-colors absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0B2341] via-[#00AEEF] via-yellow-400 via-red-500 to-green-500 opacity-90 transition-all duration-300"></div>

            <div className="grid grid-cols-6 gap-3 flex-1 mt-1">
              <DropdownPesquisavel label="Município" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoes('municipio')} />
              <DropdownPesquisavel label="Ciclo Cultural" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoes('ciclo')} />
              <DropdownPesquisavel label="Ano" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoes('ano')} />
              <DropdownPesquisavel label="Razão Social" value={filtros.nomeCredor} onChange={(v) => setFiltros({ ...filtros, nomeCredor: v })} options={getOpcoes('nomeCredor')} />
              <DropdownPesquisavel label="Artista" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoes('artista')} />
              <DropdownPesquisavel label="Data do Evento" value={filtros.dataEvento} onChange={(v) => setFiltros({ ...filtros, dataEvento: v })} options={getOpcoes('dataEvento')} />
            </div>

            <div className="hc-topbar-painel-divider h-8 w-[1px] bg-slate-200 mx-2 mt-1"></div>

            <div className="pr-2 mt-1">
              <button
                onClick={limparFiltros}
                disabled={!temFiltroAtivo}
                className={`hc-btn-limpar group flex items-center justify-center gap-2 h-11 px-6 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${temFiltroAtivo ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white shadow-sm ring-1 ring-red-100 active:scale-95" : "bg-slate-50 text-slate-300 cursor-not-allowed opacity-60"}`}
              >
                <Trash2 size={14} className={temFiltroAtivo ? "group-hover:scale-110 transition-transform" : ""} />
                Limpar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TOPBAR DE FILTROS - MOBILE */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0B2341]/60 backdrop-blur-md z-[130] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div 
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              // 🔴 Sombra e cantos arredondados no mobile
              className="hc-topbar-mobile fixed inset-x-0 top-0 w-full bg-white shadow-[0_20px_50px_-15px_rgba(11,35,65,0.6)] z-[140] flex flex-col lg:hidden overflow-hidden rounded-b-[2rem]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00AEEF] flex items-center justify-center hc-btn-limpar">
                    <Filter size={18} strokeWidth={2.5} />
                  </div>
                  <span className="font-black text-[#0B2341] tracking-tight uppercase text-sm hc-text-destaque">Filtrar Dados</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hc-btn-limpar w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-[#0B2341] flex items-center justify-center transition-all active:scale-95 shadow-sm"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh] scrollbar-moderna bg-white relative">
                <div className="flex flex-col gap-5">
                  <DropdownPesquisavel label="Município" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoes('municipio')} />
                  <DropdownPesquisavel label="Ciclo Cultural" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoes('ciclo')} />
                  <DropdownPesquisavel label="Ano" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoes('ano')} />
                  <DropdownPesquisavel label="Razão Social" value={filtros.nomeCredor} onChange={(v) => setFiltros({ ...filtros, nomeCredor: v })} options={getOpcoes('nomeCredor')} />
                  <DropdownPesquisavel label="Artista" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoes('artista')} />
                  <DropdownPesquisavel label="Data do Evento" value={filtros.dataEvento} onChange={(v) => setFiltros({ ...filtros, dataEvento: v })} options={getOpcoes('dataEvento')} />
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white shrink-0 flex gap-3 relative">
                <button
                  onClick={limparFiltros}
                  disabled={!temFiltroAtivo}
                  className={`hc-btn-limpar flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${temFiltroAtivo ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-slate-50 text-slate-300 opacity-50"}`}
                >
                  <Trash2 size={16} strokeWidth={2.5} /> Limpar
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hc-btn-aplicar flex-[2] py-4 bg-[#00AEEF] hover:bg-[#0B2341] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Aplicar Filtros
                </button>

                {/* ✨ DETALHE INSTITUCIONAL MOBILE: Linha colorida na base */}
                <div className="hc-pe-colors absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0B2341] via-[#00AEEF] via-yellow-400 via-red-500 to-green-500 opacity-90"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}