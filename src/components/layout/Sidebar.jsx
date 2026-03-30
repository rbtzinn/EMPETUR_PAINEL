import React from "react";
import { Text } from "@tremor/react";
import { Trash2, X } from "lucide-react"; // Importando a lixeira
import DropdownPesquisavel from "../ui/DropdownPesquisavel";

export default function Sidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  filtros,
  setFiltros,
  getOpcoes
}) {
  const temFiltroAtivo = Object.values(filtros).some(v => v !== "");

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0B2341]/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-80 bg-white border-r border-slate-200 shadow-2xl z-50 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>

        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <img
            src="/images/empeturlogobranca.png"
            alt="Logo"
            className="h-10 w-auto object-contain filter invert opacity-80"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-slate-400 hover:text-[#0B2341] hover:bg-slate-200 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 scrollbar-moderna">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 bg-[#00AEEF] rounded-full"></div>
              <Text className="text-[#0B2341] font-black text-xs uppercase tracking-widest">Filtros</Text>
            </div>

            {/* ÍCONE DE LIXEIRA PARA LIMPAR NO MOBILE */}
            {temFiltroAtivo && (
              <button
                onClick={() => setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "", nomeCredor: "" })}
                className="p-2.5 bg-red-50 text-red-500 rounded-xl border border-red-100 active:scale-90 transition-transform flex items-center justify-center shadow-sm"
                title="Limpar tudo"
              >
                <Trash2 size={18} strokeWidth={2.5} />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <DropdownPesquisavel label="Município" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoes('municipio')} />
            <DropdownPesquisavel label="Ciclo Cultural" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoes('ciclo')} />
            <DropdownPesquisavel label="Ano" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoes('ano')} />
            <DropdownPesquisavel label="Razão Social" value={filtros.nomeCredor} onChange={(v) => setFiltros({ ...filtros, nomeCredor: v })} options={getOpcoes('nomeCredor')} />
            <DropdownPesquisavel label="Artista" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoes('artista')} />
            <DropdownPesquisavel label="Data do Evento" value={filtros.dataEvento} onChange={(v) => setFiltros({ ...filtros, dataEvento: v })} options={getOpcoes('dataEvento')} />
          </div>
        </div>

        {/* BOTÃO DE APLICAR/FECHAR NO RODAPÉ DA SIDEBAR */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 bg-[#0B2341] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all"
          >
            Ver Resultados
          </button>
        </div>
      </aside>
    </>
  );
}