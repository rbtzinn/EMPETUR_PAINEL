import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Text, Title } from "@tremor/react";
import { ArrowLeft, Filter } from "lucide-react";
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
import InfoTooltip from "../components/ui/InfoTooltip";
import TabelaHistorico from "../components/ui/TabelaHistorico";
import IndicadoresKPI from "../components/charts/IndicadoresKPI";
import GraficoBarrasNativo from "../components/charts/GraficoBarrasNativo";
import TopMunicipiosChart from "../components/charts/TopMunicipiosChart";
import TopArtistasCard from "../components/charts/TopArtistasCard";

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
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <Text className="hc-text-destaque animate-pulse text-2xl font-black text-[#0B2341]">
          {t.dashboard.loading}
        </Text>
      </div>
    );
  }

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

      <div className="hc-mobile-filterbar fixed inset-x-0 top-0 z-[120] px-4 pb-3 pt-4 lg:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3">
          <Link
            to="/"
            aria-label={t.common.back}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/96 text-[#0B2341] shadow-[0_16px_40px_-26px_rgba(11,35,65,0.28)] backdrop-blur-xl transition-all active:scale-95"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B2341] px-4 py-4 text-sm font-bold text-white shadow-[0_16px_40px_-26px_rgba(11,35,65,0.38)] transition-transform active:scale-95"
          >
            <Filter size={18} />
            {t.dashboard.mobileFilterButton}
            {temFiltroAtivo && (
              <span className="ml-1 flex h-2.5 w-2.5 rounded-full bg-red-500" />
            )}
          </button>
        </div>
      </div>

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
              <Card className="relative flex h-full flex-col rounded-[2rem] border-none bg-white p-6 shadow-xl shadow-blue-900/5 md:p-8">
                <Title className="mb-6 font-black text-[#0B2341]">
                  {t.dashboard.charts.cycleTitle}
                </Title>
                <div className="absolute right-6 top-6 md:right-8 md:top-8">
                  <InfoTooltip text={t.dashboard.charts.cycleTooltip} />
                </div>
                <div className="min-h-[300px] flex-1">
                  <GraficoBarrasNativo
                    data={registrosPorCiclo}
                    indice="ciclo"
                    formatador={(num) => `${num} ${t.common.shows}`}
                    onClick={(value) =>
                      setFiltros((current) => ({
                        ...current,
                        ciclo: value === filtros.ciclo ? "" : value,
                      }))
                    }
                    filtroAtivo={filtros.ciclo}
                  />
                </div>
              </Card>
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
              <Card className="relative flex h-full flex-col rounded-[2rem] border-none bg-white p-6 shadow-xl shadow-blue-900/5 md:p-8">
                <Title className="mb-6 font-black text-[#0B2341]">
                  {t.dashboard.charts.yearTitle}
                </Title>
                <div className="absolute right-6 top-6 md:right-8 md:top-8">
                  <InfoTooltip text={t.dashboard.charts.yearTooltip} />
                </div>
                <div className="min-h-[300px] flex-1">
                  <GraficoBarrasNativo
                    data={registrosPorAno}
                    indice="ano"
                    formatador={(num) => `${num} ${t.common.shows}`}
                    onClick={(value) =>
                      setFiltros((current) => ({
                        ...current,
                        ano: value === filtros.ano ? "" : value,
                      }))
                    }
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
