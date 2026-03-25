import React from "react";
import { Text } from "@tremor/react";
import DropdownPesquisavel from "../ui/DropdownPesquisavel";

export default function Sidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  filtros,
  setFiltros,
  getOpcoes
}) {
  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0B2341]/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-slate-200 shadow-2xl z-40 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        {/* Header da Sidebar mais compacto */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-center bg-slate-50/50 relative">
          <img
            src="/images/empeturlogobranca.png"
            alt="Logo"
            className="h-30 w-auto object-contain filter invert opacity-80"
          />

          {/* Botão de fechar (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-[#0B2341] absolute right-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 🔴 CORREÇÃO AQUI: Trocamos as classes antigas pela "scrollbar-moderna" */}
        <div className="p-6 pb-32 overflow-y-auto flex-1 scrollbar-moderna">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-[#00AEEF] rounded-full"></div>
            <Text className="text-[#0B2341] font-black text-xs uppercase tracking-widest">Filtros Avançados</Text>
          </div>

          {/* Agrupando os filtros */}
          <div className="flex flex-col gap-3">
            <DropdownPesquisavel label="Município" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoes('municipio')} />
            <DropdownPesquisavel label="Ciclo Cultural" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoes('ciclo')} />
            <DropdownPesquisavel label="Ano" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoes('ano')} />
            
            <DropdownPesquisavel label="Razão Social (Credor)" value={filtros.nomeCredor} onChange={(v) => setFiltros({ ...filtros, nomeCredor: v })} options={getOpcoes('nomeCredor')} />
            
            <DropdownPesquisavel label="Artista" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoes('artista')} />
            <DropdownPesquisavel label="Data do Evento" value={filtros.dataEvento} onChange={(v) => setFiltros({ ...filtros, dataEvento: v })} options={getOpcoes('dataEvento')} />
          </div>

          <button
            onClick={() => {
              setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "", nomeCredor: "" });
              setIsMobileMenuOpen(false);
            }}
            className="w-full mt-6 py-3 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs hover:bg-red-50 hover:text-red-500 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Limpar Seleção
          </button>
        </div>
      </aside>
    </>
  );
}