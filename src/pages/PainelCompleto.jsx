import React, { useState } from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import {
  canonizarMunicipio,
  normalizarMunicipio,
} from "../utils/pernambucoUtils";
import { createDefaultFilters } from "../constants/dashboard";
import { useLanguage } from "../contexts/LanguageContext";

import TopbarPainel from "../components/layout/TopbarPainel";
import DashboardHeader from "../components/layout/DashboardHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import MapaPernambuco from "../components/layout/MapaPernambuco";
import TabelaHistorico from "../components/ui/TabelaHistorico";
import IndicadoresKPI from "../components/charts/IndicadoresKPI";
import GraficoBarrasNativo from "../components/charts/GraficoBarrasNativo";
import TopMunicipiosChart from "../components/charts/TopMunicipiosChart";
import TopArtistasCard from "../components/charts/TopArtistasCard";
import MobileDashboardFilterBar from "../components/layout/painel/MobileDashboardFilterBar";
import DashboardChartCard from "../components/layout/painel/DashboardChartCard";
import DashboardLoadingScreen from "../components/layout/painel/DashboardLoadingScreen";

export default function PainelCompleto({ csvUrls }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dataUltimaAtualizacao = "06/04/2026";
  const { t } = useLanguage();

  const {
    loading,
    filtros,
    setFiltros,
    temFiltroAtivo,
    filtrados,
    registrosPorCiclo,
    registrosPorMunicipio,
    registrosPorAno,
    getOpcoes,
  } = useDashboardData(csvUrls);

  const limparFiltros = () => setFiltros(createDefaultFilters());

  const normalizarMunicipioParaFiltro = (nome = "") => {
    if (!nome) return "";

    const canonico = canonizarMunicipio(nome);
    if (!canonico || canonico === "NÃO IDENTIFICADO") return "";

    return normalizarMunicipio(canonico);
  };

  if (loading) {
    return <DashboardLoadingScreen label={t.dashboard.loading} />;
  }

  const toggleCycleFilter = (value) =>
    setFiltros((current) => ({
      ...current,
      ciclo: value === current.ciclo ? "" : value,
    }));

  const toggleYearFilter = (value) =>
    setFiltros((current) => ({
      ...current,
      ano: value === current.ano ? "" : value,
    }));

  return (
    <div className="hc-bg-painel flex h-screen flex-col overflow-hidden bg-[#F8FAFC]">
      <style>{`
        .scrollbar-moderna::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-moderna::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-moderna::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .scrollbar-moderna::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        body.contraste-negativo .hc-bg-painel { background-color: #000 !important; }
        body.contraste-negativo .hc-mobile-filterbar {
          background-color: transparent !important;
          border-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>

      <TopbarPainel
        filtros={filtros}
        setFiltros={setFiltros}
        getOpcoes={getOpcoes}
        limparFiltros={limparFiltros}
        temFiltroAtivo={temFiltroAtivo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <MobileDashboardFilterBar
        onOpen={() => setIsMobileMenuOpen(true)}
        temFiltroAtivo={temFiltroAtivo}
        filterLabel={t.dashboard.mobileFilterButton}
        backLabel={t.common.back}
      />

      <main className="hc-bg-painel scrollbar-moderna flex-1 overflow-y-auto bg-[#F8FAFC]">
        <div className="mx-auto w-full max-w-[1600px] px-4 pb-4 pt-24 md:p-8 lg:p-10">

          <Breadcrumb isPainel />
          <DashboardHeader dataUltimaAtualizacao={dataUltimaAtualizacao} />

          <div className="mt-8">
            <IndicadoresKPI
              filtrados={filtrados}
              filtros={filtros}
              setFiltros={setFiltros}
            />
          </div>

          <div className="mt-8 w-full">
            <MapaPernambuco
              dados={filtrados}
              municipioSelecionado={filtros.municipio || ""}
              onSelectMunicipio={(nomeNormalizado) =>
                setFiltros((current) => ({
                  ...current,
                  municipio: nomeNormalizado || "",
                }))
              }
            />
          </div>

          <div className="mb-8 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="w-full">
              <DashboardChartCard
                title={t.dashboard.charts.cycleTitle}
                tooltip={t.dashboard.charts.cycleTooltip}
              >
                <GraficoBarrasNativo
                  data={registrosPorCiclo}
                  indice="ciclo"
                  formatador={(num) => `${num} ${t.common.shows}`}
                  onClick={toggleCycleFilter}
                  filtroAtivo={filtros.ciclo}
                />
              </DashboardChartCard>
            </div>

            <div className="w-full">
              <TopMunicipiosChart
                data={registrosPorMunicipio}
                onFilter={(nome) =>
                  setFiltros((current) => ({
                    ...current,
                    municipio: normalizarMunicipioParaFiltro(nome),
                  }))
                }
              />
            </div>
          </div>

          <div className="mb-8">
            <TabelaHistorico
              filtrados={filtrados}
              setFiltros={setFiltros}
              temFiltroAtivo={temFiltroAtivo}
            />
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="w-full">
              <DashboardChartCard
                title={t.dashboard.charts.yearTitle}
                tooltip={t.dashboard.charts.yearTooltip}
              >
                <GraficoBarrasNativo
                  data={registrosPorAno}
                  indice="ano"
                  formatador={(num) => `${num} ${t.common.shows}`}
                  onClick={toggleYearFilter}
                  filtroAtivo={filtros.ano}
                />
              </DashboardChartCard>
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
