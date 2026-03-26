import React, { useState } from "react";
import { Card, Title, Text } from "@tremor/react";
import { Filter, X } from "lucide-react";
import { normalizarMunicipio } from "../utils/DataProcessor";
import { useDashboardData } from "../hooks/useDashboardData"; 

// Componentes
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import MapaPernambuco from "../components/layout/MapaPernambuco";
import InfoTooltip from "../components/ui/InfoTooltip";
import TabelaHistorico from "../components/ui/TabelaHistorico";
import IndicadoresKPI from "../components/charts/IndicadoresKPI";
import GraficoBarrasNativo from "../components/charts/GraficoBarrasNativo";
import TopMunicipiosChart from "../components/charts/TopMunicipiosChart";
import TopArtistasCard from "../components/charts/TopArtistasCard";
import DropdownPesquisavel from "../components/ui/DropdownPesquisavel"; 

export default function PainelCompleto({ csvUrls }) {
  const dataUltimaAtualizacao = "25/03/2026";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { 
    loading, filtros, setFiltros, temFiltroAtivo, filtrados, 
    registrosPorCiclo, registrosPorMunicipio, registrosPorAno, getOpcoes 
  } = useDashboardData(csvUrls);

  const limparFiltros = () => {
    setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "", nomeCredor: "" });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Text className="text-2xl font-black text-[#0B2341] animate-pulse">Carregando Dashboard Oficial...</Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] overflow-hidden">
      <style>{`
        .scrollbar-moderna::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-moderna::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-moderna::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .scrollbar-moderna::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* 1. SIDEBAR APENAS PARA MOBILE */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} filtros={filtros} setFiltros={setFiltros} getOpcoes={getOpcoes} />

      {/* 2. NAVBAR FIXA (APENAS DESKTOP) */}
      <div className="hidden lg:block sticky top-0 z-40 bg-[#0B2341] shadow-2xl w-full pt-5 px-6 relative">
        <div className="flex items-end gap-4 max-w-[1800px] mx-auto">
          
          {/* Grade de Filtros */}
          <div className="grid grid-cols-3 xl:grid-cols-6 gap-3 flex-1">
            <DropdownPesquisavel label="Município" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoes('municipio')} />
            <DropdownPesquisavel label="Ciclo Cultural" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoes('ciclo')} />
            <DropdownPesquisavel label="Ano" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoes('ano')} />
            <DropdownPesquisavel label="Razão Social (Credor)" value={filtros.nomeCredor} onChange={(v) => setFiltros({ ...filtros, nomeCredor: v })} options={getOpcoes('nomeCredor')} />
            <DropdownPesquisavel label="Artista" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoes('artista')} />
            <DropdownPesquisavel label="Data do Evento" value={filtros.dataEvento} onChange={(v) => setFiltros({ ...filtros, dataEvento: v })} options={getOpcoes('dataEvento')} />
          </div>

          {/* Botão de Limpar */}
          {temFiltroAtivo ? (
            <button 
              onClick={limparFiltros} 
              className="h-[46px] mb-5 px-6 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shrink-0 group"
              title="Limpar todos os filtros"
            >
              <X size={16} className="group-hover:scale-110 transition-transform" /> Limpar
            </button>
          ) : (
            <div className="w-[120px] shrink-0 hidden xl:block mb-5"></div>
          )}
        </div>

        {/* 🌈 LINHA PERNAMBUCO */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 flex">
          <div className="h-full flex-1 bg-[#002776]"></div>
          <div className="h-full flex-1 bg-[#FFB81C]"></div>
          <div className="h-full flex-1 bg-[#E4002B]"></div>
          <div className="h-full flex-1 bg-[#009B3A]"></div>
        </div>
      </div>

      {/* 3. ÁREA PRINCIPAL FULL SCREEN */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 scrollbar-moderna w-full">
        
        {/* Botão de Abrir Filtros (Apenas Mobile) */}
        <div className="lg:hidden mb-6 mt-2">
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="w-full bg-[#0B2341] text-white p-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0B2341]/20 active:scale-95 transition-transform"
          >
            <Filter size={16} /> 
            Filtrar Resultados
            {temFiltroAtivo && <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 ml-1"></span>}
          </button>
        </div>

        <Breadcrumb isPainel={true} />
        <DashboardHeader dataUltimaAtualizacao={dataUltimaAtualizacao} />

        <IndicadoresKPI filtrados={filtrados} filtros={filtros} setFiltros={setFiltros} />

        <div className="w-full mt-6">
          <MapaPernambuco dados={filtrados} municipioSelecionado={filtros.municipio} onSelectMunicipio={(nome) => setFiltros((prev) => ({ ...prev, municipio: nome }))} />
        </div>

        {/* 🔴 AQUI ESTÁ A MÁGICA 50/50: grid-cols-2 em vez de 3, e sem col-span-2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="w-full h-full">
            <Card className="relative rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 flex flex-col h-full">
              <Title className="text-[#0B2341] font-black mb-6">Apresentações por Ciclo</Title>
              <div className="absolute top-6 right-6 md:top-8 md:right-8"><InfoTooltip text="Clique nas barras para filtrar os dados por este ciclo cultural específico." /></div>
              <div className="flex-1 min-h-[250px]">
                <GraficoBarrasNativo data={registrosPorCiclo} indice="ciclo" formatador={(num) => `${num} shows`} onClick={(v) => setFiltros(prev => ({ ...prev, ciclo: v === filtros.ciclo ? "" : v }))} filtroAtivo={filtros.ciclo} />
              </div>
            </Card>
          </div>
          <div className="w-full h-full">
            <TopMunicipiosChart data={registrosPorMunicipio} onFilter={(nome) => setFiltros(prev => ({ ...prev, municipio: normalizarMunicipio(nome) }))} />
          </div>
        </div>

        <TabelaHistorico filtrados={filtrados} setFiltros={setFiltros} />

        {/* 🔴 AQUI TAMBÉM 50/50 PARA MANTER ALINHADO COM OS DE CIMA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="w-full h-full">
            <Card className="relative rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 h-full flex flex-col">
              <Title className="text-[#0B2341] font-black mb-6">Apresentações por Ano</Title>
              <div className="absolute top-6 right-6 md:top-8 md:right-8"><InfoTooltip text="Estatísticas baseadas na data do empenho oficial emitida pela EMPETUR." /></div>
              <div className="flex-1 min-h-[300px]">
                <GraficoBarrasNativo data={registrosPorAno} indice="ano" formatador={(num) => `${num} shows`} onClick={(v) => setFiltros(prev => ({ ...prev, ano: v === filtros.ano ? "" : v }))} filtroAtivo={filtros.ano} />
              </div>
            </Card>
          </div>
          <div className="w-full h-full">
            <TopArtistasCard filtrados={filtrados} />
          </div>
        </div>
      </main>
    </div>
  );
}