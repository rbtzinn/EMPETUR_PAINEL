import React, { useState } from "react";
import { Card, Title, Text } from "@tremor/react";
import { Filter } from "lucide-react";
import { normalizarMunicipio } from "../utils/stringUtils";
import { useDashboardData } from "../hooks/useDashboardData";

// 🔴 NOVO: Usando apenas o TopbarPainel!
import TopbarPainel from "../components/layout/TopbarPainel";
import DashboardHeader from "../components/layout/DashboardHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import MapaPernambuco from "../components/layout/MapaPernambuco";
import InfoTooltip from "../components/ui/InfoTooltip";
import TabelaHistorico from "../components/ui/TabelaHistorico";
import IndicadoresKPI from "../components/charts/IndicadoresKPI";
import GraficoBarrasNativo from "../components/charts/GraficoBarrasNativo";
import TopMunicipiosChart from "../components/charts/TopMunicipiosChart";
import TopArtistasCard from "../components/charts/TopArtistasCard";

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
        <Text className="text-2xl font-black text-[#0B2341] animate-pulse hc-text-destaque">Carregando Dashboard Oficial...</Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] overflow-hidden hc-bg-painel">
      <style>{`
        .scrollbar-moderna::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-moderna::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-moderna::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .scrollbar-moderna::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        /* ALTO CONTRASTE GERAL DO PAINEL */
        body.contraste-negativo .hc-bg-painel { background-color: #000 !important; }
      `}</style>

      {/* ============================================== */}
      {/* 🔴 TOPBAR UNIFICADA (Desktop horizontal / Mobile Dropdown) */}
      {/* ============================================== */}
      <TopbarPainel 
        filtros={filtros}
        setFiltros={setFiltros}
        getOpcoes={getOpcoes}
        limparFiltros={limparFiltros}
        temFiltroAtivo={temFiltroAtivo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* 3. ÁREA PRINCIPAL (CONTAINER CENTRALIZADO) */}
      <main className="hc-bg-painel flex-1 overflow-y-auto scrollbar-moderna bg-[#F8FAFC]">
        <div className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-10 w-full">

          {/* Botão de Filtros (Mobile) */}
          <div className="lg:hidden mb-6 mt-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-full bg-[#0B2341] text-white p-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-transform"
            >
              <Filter size={18} />
              Filtrar Resultados
              {temFiltroAtivo && <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 ml-1"></span>}
            </button>
          </div>

          {/* Header e Breadcrumb */}
          <Breadcrumb isPainel={true} />
          <DashboardHeader dataUltimaAtualizacao={dataUltimaAtualizacao} />

          {/* KPIs */}
          <div className="mt-8">
            <IndicadoresKPI filtrados={filtrados} filtros={filtros} setFiltros={setFiltros} />
          </div>

          {/* Mapa de Pernambuco */}
          <div className="w-full mt-8">
            <MapaPernambuco 
              dados={filtrados} 
              municipioSelecionado={filtros.municipio} 
              onSelectMunicipio={(nome) => setFiltros((prev) => ({ ...prev, municipio: nome }))} 
            />
          </div>

          {/* Gráficos: Ciclo e Top Municípios */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-8">
            <div className="w-full">
              <Card className="relative rounded-[2rem] border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 flex flex-col h-full">
                <Title className="text-[#0B2341] font-black mb-6">Apresentações por Ciclo</Title>
                <div className="absolute top-6 right-6 md:top-8 md:right-8">
                  <InfoTooltip text="Clique nas barras para filtrar os dados por ciclo específico." />
                </div>
                <div className="flex-1 min-h-[300px]">
                  <GraficoBarrasNativo 
                    data={registrosPorCiclo} 
                    indice="ciclo" 
                    formatador={(num) => `${num} shows`} 
                    onClick={(v) => setFiltros(prev => ({ ...prev, ciclo: v === filtros.ciclo ? "" : v }))} 
                    filtroAtivo={filtros.ciclo} 
                  />
                </div>
              </Card>
            </div>
            <div className="w-full">
              <TopMunicipiosChart 
                data={registrosPorMunicipio} 
                onFilter={(nome) => setFiltros(prev => ({ ...prev, municipio: normalizarMunicipio(nome) }))} 
              />
            </div>
          </div>

          {/* Tabela de Dados Históricos */}
          <div className="mb-8">
            <TabelaHistorico filtrados={filtrados} setFiltros={setFiltros} />
          </div>

          {/* Gráficos: Por Ano e Top Artistas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="w-full">
              <Card className="relative rounded-[2rem] border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 h-full flex flex-col">
                <Title className="text-[#0B2341] font-black mb-6">Apresentações por Ano</Title>
                <div className="absolute top-6 right-6 md:top-8 md:right-8">
                  <InfoTooltip text="Estatísticas baseadas na data do empenho oficial emitida pela EMPETUR." />
                </div>
                <div className="flex-1 min-h-[300px]">
                  <GraficoBarrasNativo 
                    data={registrosPorAno} 
                    indice="ano" 
                    formatador={(num) => `${num} shows`} 
                    onClick={(v) => setFiltros(prev => ({ ...prev, ano: v === filtros.ano ? "" : v }))} 
                    filtroAtivo={filtros.ano} 
                  />
                </div>
              </Card>
            </div>
            <div className="w-full">
              <TopArtistasCard filtrados={filtrados} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}