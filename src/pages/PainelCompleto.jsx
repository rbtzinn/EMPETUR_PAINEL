import React, { useState } from "react";
import { Card, Title, Text } from "@tremor/react";
import { normalizarMunicipio } from "../utils/DataProcessor";
import { useDashboardData } from "../hooks/useDashboardData"; 

// Componentes
import Sidebar from "../components/layout/Sidebar";
import MobileSidebarHeader from "../components/layout/MobileSidebarHeader";
import DashboardHeader from "../components/layout/DashboardHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import MapaPernambuco from "../components/layout/MapaPernambuco";
import InfoTooltip from "../components/ui/InfoTooltip";
import TabelaHistorico from "../components/ui/TabelaHistorico";
import IndicadoresKPI from "../components/charts/IndicadoresKPI";
import GraficoBarrasNativo from "../components/charts/GraficoBarrasNativo";
import TopMunicipiosChart from "../components/charts/TopMunicipiosChart";
import TopArtistasCard from "../components/charts/TopArtistasCard";

export default function PainelCompleto({ csvUrls }) { // 🔴 Recebe Array
  const dataUltimaAtualizacao = "25/03/2026";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { 
    loading, filtros, setFiltros, temFiltroAtivo, filtrados, 
    registrosPorCiclo, registrosPorMunicipio, registrosPorAno, getOpcoes 
  } = useDashboardData(csvUrls); // 🔴 Passa pro Hook

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Text className="text-2xl font-black text-[#0B2341] animate-pulse">Carregando Dashboard Oficial...</Text>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">
      <style>{`
        .scrollbar-moderna::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-moderna::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-moderna::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .scrollbar-moderna::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* 1. BARRA LATERAL (Filtros) */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} filtros={filtros} setFiltros={setFiltros} getOpcoes={getOpcoes} />

      <main className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-moderna min-w-0">
        {/* 2. CABEÇALHOS E NAVEGAÇÃO */}
        <MobileSidebarHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} temFiltroAtivo={temFiltroAtivo} />
        <Breadcrumb isPainel={true} />
        <DashboardHeader dataUltimaAtualizacao={dataUltimaAtualizacao} />

        {/* 3. KPIS (Cards Superiores) */}
        <IndicadoresKPI filtrados={filtrados} filtros={filtros} setFiltros={setFiltros} />

        {/* 4. MAPA GERAL */}
        <div className="w-full mt-6">
          <MapaPernambuco dados={filtrados} municipioSelecionado={filtros.municipio} onSelectMunicipio={(nome) => setFiltros((prev) => ({ ...prev, municipio: nome }))} />
        </div>

        {/* 5. LINHA CENTRAL DE GRÁFICOS (Ciclos e Municípios) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
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

        {/* 6. TABELA DETALHADA */}
        <TabelaHistorico filtrados={filtrados} setFiltros={setFiltros} />

        {/* 7. LINHA INFERIOR DE GRÁFICOS (Anos e Top Artistas) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="relative rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 h-full flex flex-col">
              <Title className="text-[#0B2341] font-black mb-6">Apresentações por Ano</Title>
              <div className="absolute top-6 right-6 md:top-8 md:right-8"><InfoTooltip text="Estatísticas baseadas na data do empenho oficial emitida pela EMPETUR." /></div>
              <div className="flex-1 min-h-[300px]">
                <GraficoBarrasNativo data={registrosPorAno} indice="ano" formatador={(num) => `${num} shows`} onClick={(v) => setFiltros(prev => ({ ...prev, ano: v === filtros.ano ? "" : v }))} filtroAtivo={filtros.ano} />
              </div>
            </Card>
          </div>
          <TopArtistasCard filtrados={filtrados} />
        </div>
      </main>
    </div>
  );
}