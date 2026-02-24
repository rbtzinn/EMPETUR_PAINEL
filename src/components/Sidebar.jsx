import React from "react";
import { Text } from "@tremor/react";
import DropdownPesquisavel from "./DropdownPesquisavel"; // Ajuste o caminho se necessário!

export default function Sidebar({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  filtros, 
  setFiltros, 
  getOpcoes 
}) {
  return (
    <>
      {/* OVERLAY MOBILE: Fundo escuro quando a sidebar abre no celular */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#0B2341]/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ASIDE DA SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-slate-200 shadow-2xl z-40 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <img src="/images/empeturlogobranca.png" alt="Logo" className="h-50 object-contain filter invert opacity-90" />
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="lg:hidden p-2 text-slate-400 hover:text-[#0B2341] bg-slate-50 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-1 scrollbar-moderna">
          <Text className="text-[#0B2341] font-black mb-6">Filtros Avançados</Text>
          
          {/* USANDO O COMPONENTE ISOLADO */}
          <DropdownPesquisavel 
            label="Município" 
            value={filtros.municipio} 
            onChange={(v) => setFiltros({ ...filtros, municipio: v })} 
            options={getOpcoes('municipio')} 
          />
          <DropdownPesquisavel 
            label="Ciclo Cultural" 
            value={filtros.ciclo} 
            onChange={(v) => setFiltros({ ...filtros, ciclo: v })} 
            options={getOpcoes('ciclo')} 
          />
          <DropdownPesquisavel 
            label="Ano" 
            value={filtros.ano} 
            onChange={(v) => setFiltros({ ...filtros, ano: v })} 
            options={getOpcoes('ano')} 
          />
          <DropdownPesquisavel 
            label="Artista" 
            value={filtros.artista} 
            onChange={(v) => setFiltros({ ...filtros, artista: v })} 
            options={getOpcoes('artista')} 
          />
          
          <button 
            onClick={() => {
              setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "" });
              setIsMobileMenuOpen(false);
            }}
            className="w-full mt-6 py-3 rounded-xl bg-blue-50 text-[#00AEEF] font-bold text-sm hover:bg-[#00AEEF] hover:text-white transition-all shadow-sm active:scale-95"
          >
            ↺ Resetar Filtros
          </button>
        </div>
      </aside>
    </>
  );
}