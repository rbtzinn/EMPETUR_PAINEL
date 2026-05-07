import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import {
  canonizarMunicipio,
  normalizarMunicipio,
} from "../utils/pernambucoUtils";
import { createDefaultFilters } from "../constants/dashboard";
import { useLanguage } from "../contexts/LanguageContext";
import { useViewMode } from "../contexts/ViewModeContext";
import { exportarBIPDF } from "../utils/exportarBIPDF";
import { exportarBIRelatorioPDF } from "../utils/exportarBIRelatorioPDF";

import TopbarPainel from "../components/layout/TopbarPainel";
import BIDashboardHeader from "../components/layout/BIDashboardHeader";
import MapaPernambuco from "../components/layout/MapaPernambuco";
import TabelaHistorico from "../components/ui/TabelaHistorico";
import GraficoBarrasNativo from "../components/charts/GraficoBarrasNativo";
import TopArtistasCard from "../components/charts/TopArtistasCard";
import MobileDashboardFilterBar from "../components/layout/painel/MobileDashboardFilterBar";
import DashboardLoadingScreen from "../components/layout/painel/DashboardLoadingScreen";
import PainelPadraoLayout from "../components/layout/painel/PainelPadraoLayout";
import DashboardTutorialOverlay from "../components/ui/DashboardTutorialOverlay";

const IndicadoresKPI = lazy(() => import("../components/charts/IndicadoresKPI"));
const TopMunicipiosChart = lazy(() => import("../components/charts/TopMunicipiosChart"));
const DashboardChartCard = lazy(() => import("../components/layout/painel/DashboardChartCard"));
const ModalExportarBIPDF = lazy(() => import("../components/ui/ModalExportarBIPDF"));
const DASHBOARD_TUTORIAL_STORAGE_KEY = "empetur-dashboard-tour-v1";
const DASHBOARD_TUTORIAL_FORCE_PARAM = "tour";
const FALLBACK_TUTORIAL_TEXTS = {
  dialogAriaLabel: "Dashboard tutorial",
  close: "Fechar",
  next: "Próximo",
  progress: "Etapa {current} de {total}",
  steps: {
    mobile: {
      filters: { title: "", description: "" },
      summary: { title: "", description: "" },
      ranking: { title: "", description: "" },
      artists: { title: "", description: "" },
      table: { title: "", description: "" },
    },
    default: {
      filters: { title: "", description: "" },
      viewMode: { title: "", description: "" },
      summary: { title: "", description: "" },
      map: { title: "", description: "" },
      table: { title: "", description: "" },
    },
    bi: {
      filters: { title: "", description: "" },
      kpis: { title: "", description: "" },
      map: { title: "", description: "" },
      table: { title: "", description: "" },
      artists: { title: "", description: "" },
    },
  },
};

export default function PainelCompleto({ csvUrls }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const dataUltimaAtualizacao = "07/05/2026";
  const { t } = useLanguage();
  const { isBIMode, isMobile } = useViewMode();

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

  useEffect(() => {
    if (loading || typeof window === "undefined") return undefined;

    const searchParams = new URLSearchParams(window.location.search);
    const shouldForceTutorial = searchParams.get(DASHBOARD_TUTORIAL_FORCE_PARAM) === "1";

    let shouldSkipTutorial = false;
    try {
      shouldSkipTutorial =
        window.localStorage.getItem(DASHBOARD_TUTORIAL_STORAGE_KEY) === "done";
    } catch {
      shouldSkipTutorial = false;
    }

    if (shouldSkipTutorial && !shouldForceTutorial) return undefined;

    const timeoutId = window.setTimeout(() => {
      setIsTutorialOpen(true);
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [loading]);

  const normalizarMunicipioParaFiltro = (nome = "") => {
    if (!nome) return "";
    const canonico = canonizarMunicipio(nome);
    if (!canonico || canonico === "NÃO IDENTIFICADO") return "";
    return normalizarMunicipio(canonico);
  };

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

  const toggleArtistFilter = (value) =>
    setFiltros((current) => ({
      ...current,
      artista: value === current.artista ? "" : value,
    }));

  const handleExportBI = async (mode) => {
    const dateStamp = new Date().toISOString().slice(0, 10);

    if (mode === "report") {
      return exportarBIRelatorioPDF({
        filename:
          t.locale === "en-US"
            ? `EMPETUR_BI_Report_${dateStamp}.pdf`
            : `EMPETUR_BI_Relatorio_${dateStamp}.pdf`,
        rows: filtrados,
        filters: filtros,
        fieldLabels: t.dashboard.topbar.fields,
        registrosPorMunicipio,
        registrosPorCiclo,
        registrosPorAno,
        lastUpdate: dataUltimaAtualizacao,
        locale: t.locale,
        texts: {
          badge: t.dashboard.biExport.report.badge,
          title: t.dashboard.header.title,
          description: t.dashboard.header.description,
          sourceLabel: t.dashboard.header.source,
          sourceValue: "e-Fisco PE",
          frequencyLabel: t.dashboard.header.frequency,
          frequencyValue: t.dashboard.header.monthly,
          lastUpdateLabel: t.dashboard.header.lastUpdate,
          generatedLabel: t.dashboard.biExport.report.generatedAt,
          filtersLabel: t.dashboard.biExport.report.filters,
          noFiltersLabel: t.dashboard.biExport.report.noFilters,
          metrics: t.dashboard.biExport.report.metrics,
          sections: t.dashboard.biExport.report.sections,
          recordsSubtitle: t.dashboard.biExport.report.recordsSubtitle,
          emptyRecords: t.dashboard.biExport.report.emptyRecords,
          tableHeaders: {
            artist: t.dashboard.table.headers.artist,
            creditor: t.dashboard.table.headers.creditor,
            municipality: t.dashboard.table.headers.municipality,
            cycle: t.dashboard.table.headers.cycle,
            event: t.dashboard.table.headers.eventDeadline,
            value: t.dashboard.table.headers.value,
          },
          commitmentLabel: t.dashboard.table.commitment,
          deadlineLabel: t.dashboard.table.deadline,
          pendingLabel: t.common.pendingDefinition,
          fallbackLabel: t.common.consultCommitment,
          emptyValue: "---",
          pageLabel: t.dashboard.biExport.report.page,
        },
      });
    }

    return exportarBIPDF({
      elementId: "bi-dashboard-root",
      filename:
        t.locale === "en-US"
          ? `EMPETUR_BI_Snapshot_${dateStamp}.pdf`
          : `EMPETUR_BI_Snapshot_${dateStamp}.pdf`,
      messages: t.dashboard.biExport.errors,
    });
  };

  const cardFallback = (
    <div className="h-full min-h-[220px] rounded-xl border border-slate-200 bg-white/70" />
  );

  const closeTutorial = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(DASHBOARD_TUTORIAL_STORAGE_KEY, "done");
      } catch {
        // no-op
      }
    }

    setIsTutorialOpen(false);
  };

  const tutorialTexts = t?.dashboard?.tour || FALLBACK_TUTORIAL_TEXTS;

  const tutorialSteps = useMemo(() => {
    if (isMobile) {
      return [
        {
          target: '[data-tour="filters-mobile"]',
          title: tutorialTexts.steps.mobile.filters.title,
          description: tutorialTexts.steps.mobile.filters.description,
        },
        {
          target: '[data-tour="hero-summary"]',
          title: tutorialTexts.steps.mobile.summary.title,
          description: tutorialTexts.steps.mobile.summary.description,
        },
        {
          target: '[data-tour="ranking-card"]',
          title: tutorialTexts.steps.mobile.ranking.title,
          description: tutorialTexts.steps.mobile.ranking.description,
        },
        {
          target: '[data-tour="artists-card"]',
          title: tutorialTexts.steps.mobile.artists.title,
          description: tutorialTexts.steps.mobile.artists.description,
        },
        {
          target: '[data-tour="history-table"]',
          title: tutorialTexts.steps.mobile.table.title,
          description: tutorialTexts.steps.mobile.table.description,
        },
      ];
    }

    if (isBIMode) {
      return [
        {
          target: '[data-tour="filters-desktop"]',
          title: tutorialTexts.steps.bi.filters.title,
          description: tutorialTexts.steps.bi.filters.description,
        },
        {
          target: '[data-tour="bi-kpis"]',
          title: tutorialTexts.steps.bi.kpis.title,
          description: tutorialTexts.steps.bi.kpis.description,
        },
        {
          target: '[data-tour="bi-map"]',
          title: tutorialTexts.steps.bi.map.title,
          description: tutorialTexts.steps.bi.map.description,
        },
        {
          target: '[data-tour="bi-table"]',
          title: tutorialTexts.steps.bi.table.title,
          description: tutorialTexts.steps.bi.table.description,
        },
        {
          target: '[data-tour="bi-artists"]',
          title: tutorialTexts.steps.bi.artists.title,
          description: tutorialTexts.steps.bi.artists.description,
        },
      ];
    }

    return [
      {
        target: '[data-tour="filters-desktop"]',
        title: tutorialTexts.steps.default.filters.title,
        description: tutorialTexts.steps.default.filters.description,
      },
      {
        target: '[data-tour="view-mode-toggle"]',
        title: tutorialTexts.steps.default.viewMode.title,
        description: tutorialTexts.steps.default.viewMode.description,
      },
      {
        target: '[data-tour="hero-summary"]',
        title: tutorialTexts.steps.default.summary.title,
        description: tutorialTexts.steps.default.summary.description,
      },
      {
        target: '[data-tour="map-card"]',
        title: tutorialTexts.steps.default.map.title,
        description: tutorialTexts.steps.default.map.description,
      },
      {
        target: '[data-tour="history-table"]',
        title: tutorialTexts.steps.default.table.title,
        description: tutorialTexts.steps.default.table.description,
      },
    ];
  }, [isBIMode, isMobile, tutorialTexts]);

  if (loading) {
    return <DashboardLoadingScreen label={t.dashboard.loading} />;
  }

  /* ─────────────────────────────────────────────────
     SHARED HEADER (topbar + BI header bar)
     Renderizado sempre, independente do modo
  ───────────────────────────────────────────────── */
  const sharedHeader = (
    <>
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
      <BIDashboardHeader dataUltimaAtualizacao={dataUltimaAtualizacao} />
    </>
  );

  /* ═══════════════════════════════════════════════════
     MODO PADRÃO — layout com seções e scroll elegante
  ═══════════════════════════════════════════════════ */
  if (isMobile || !isBIMode) {
    return (
      <div className="hc-bg-painel flex min-h-screen flex-col bg-[#F3F7FA]">
        <style>{`
          body.contraste-negativo .hc-bg-painel { background-color: #000 !important; }
        `}</style>
        {sharedHeader}
        <PainelPadraoLayout
          filtrados={filtrados}
          filtros={filtros}
          setFiltros={setFiltros}
          temFiltroAtivo={temFiltroAtivo}
          registrosPorCiclo={registrosPorCiclo}
          registrosPorMunicipio={registrosPorMunicipio}
          registrosPorAno={registrosPorAno}
          dataUltimaAtualizacao={dataUltimaAtualizacao}
        />
        <DashboardTutorialOverlay
          isOpen={isTutorialOpen && tutorialSteps.length > 0}
          steps={tutorialSteps}
          texts={tutorialTexts}
          onClose={closeTutorial}
        />
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════
     MODO BI — grid 3-colunas tela única
  ═══════════════════════════════════════════════════ */
  return (
    <div className="hc-bg-painel flex h-screen flex-col overflow-hidden bg-[#F3F7FA]">
      <style>{`
        /* ── Scrollbar BI telas internas ── */
        .bi-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .bi-scroll::-webkit-scrollbar-track { background: transparent; }
        .bi-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .bi-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        /* ── CORREÇÃO: Remove ring/border escuro do Tremor Card ── */
        .tremor-Card-root {
          --tw-ring-color: transparent !important;
          --tw-ring-shadow: 0 0 #0000 !important;
          --tw-shadow: 0 1px 3px 0 rgba(11,35,65,0.06), 0 1px 2px -1px rgba(11,35,65,0.06) !important;
          --tw-shadow-colored: 0 0 #0000 !important;
          box-shadow: var(--tw-shadow) !important;
          border: 1px solid rgba(226,232,240,0.6) !important;
        }

        /* ── Alto contraste ── */
        body.contraste-negativo .hc-bg-painel { background-color: #000 !important; }
        body.contraste-negativo .hc-bi-grid-card { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .bi-grid { background: #000 !important; }
        body.contraste-negativo .hc-mobile-filterbar {
          background-color: transparent !important;
          border-color: transparent !important;
          box-shadow: none !important;
        }

        /* ── Grid BI responsivo ── */
        .bi-grid {
          display: grid;
          grid-template-columns: 260px 1fr 280px;
          grid-template-rows: 1fr;
          gap: 8px;
          padding: 8px;
          background: #EEF4F8;
          min-height: 0;
        }

        /* ── Coluna esquerda ── */
        .bi-col-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 0;
          overflow: hidden;
        }

        .bi-kpis { flex: 0 0 auto; }
        .bi-municipios { flex: 1 1 0; min-height: 0; overflow: hidden; }

        /* ── Coluna central ── */
        .bi-col-center {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 0;
          overflow: hidden;
        }

        /* Mapa: 42% — tabela: 58% */
        .bi-mapa { flex: 0 0 42%; min-height: 0; overflow: hidden; }
        .bi-tabela { flex: 1 1 0; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }

        /* ── Coluna direita ── */
        .bi-col-right {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 0;
          overflow: hidden;
        }

        /* Barras ciclo: 32% | Barras ano: 28% | Artistas: resto */
        .bi-ciclos   { flex: 0 0 32%; min-height: 0; overflow: hidden; }
        .bi-anos     { flex: 0 0 28%; min-height: 0; overflow: hidden; }
        .bi-artistas { flex: 1 1 0; min-height: 0; overflow: hidden; }
      `}</style>

      {sharedHeader}

      {/* ══════════════════════════════════════════
          LAYOUT DESKTOP: Grid BI 3-colunas
         ══════════════════════════════════════════ */}
      <main
        id="bi-dashboard-root"
        className="bi-grid hidden min-h-0 flex-1 lg:grid"
        aria-label="Painel de dados — modo BI"
      >
        {/* ── COLUNA ESQUERDA: KPIs + Top Municípios ── */}
        <div className="bi-col-left">
          <div className="bi-kpis" data-tour="bi-kpis">
            <Suspense fallback={cardFallback}>
              <IndicadoresKPI
                filtrados={filtrados}
                filtros={filtros}
                setFiltros={setFiltros}
              />
            </Suspense>
          </div>
          <div className="bi-municipios" data-tour="bi-municipios">
            <Suspense fallback={cardFallback}>
              <TopMunicipiosChart
                data={registrosPorMunicipio}
                onFilter={(nome) =>
                  setFiltros((current) => ({
                    ...current,
                    municipio: normalizarMunicipioParaFiltro(nome),
                  }))
                }
                filtroAtivo={filtros.municipio || ""}
                onExportPDF={() => setIsExportModalOpen(true)}
              />
            </Suspense>
          </div>
        </div>

        {/* ── COLUNA CENTRAL: Mapa + Tabela ── */}
        <div className="bi-col-center">
          <div className="bi-mapa" data-tour="bi-map">
            <Suspense fallback={cardFallback}>
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
            </Suspense>
          </div>
          <div className="bi-tabela bi-scroll overflow-y-auto" data-tour="bi-table">
            <TabelaHistorico
              filtrados={filtrados}
              filtros={filtros}
              setFiltros={setFiltros}
              temFiltroAtivo={temFiltroAtivo}
            />
          </div>
        </div>

        {/* ── COLUNA DIREITA: Ciclos + Anos + Artistas ── */}
        <div className="bi-col-right">
          <div className="bi-ciclos">
            <Suspense fallback={cardFallback}>
              <DashboardChartCard
                title={t.dashboard.charts.cycleTitle}
                tooltip={t.dashboard.charts.cycleTooltip}
                compact
              >
                <GraficoBarrasNativo
                  data={registrosPorCiclo}
                  indice="ciclo"
                  formatador={(num) => `${num} ${t.common.shows}`}
                  onClick={toggleCycleFilter}
                  filtroAtivo={filtros.ciclo}
                />
              </DashboardChartCard>
            </Suspense>
          </div>

          <div className="bi-anos">
            <Suspense fallback={cardFallback}>
              <DashboardChartCard
                title={t.dashboard.charts.yearTitle}
                tooltip={t.dashboard.charts.yearTooltip}
                compact
              >
                <GraficoBarrasNativo
                  data={registrosPorAno}
                  indice="ano"
                  formatador={(num) => `${num} ${t.common.shows}`}
                  onClick={toggleYearFilter}
                  filtroAtivo={filtros.ano}
                />
              </DashboardChartCard>
            </Suspense>
          </div>

          <div className="bi-artistas" data-tour="bi-artists">
            <TopArtistasCard
              filtrados={filtrados}
              onFilter={toggleArtistFilter}
              filtroAtivo={filtros.artista || ""}
            />
          </div>
        </div>
      </main>

      {/* Modal de exportacao PDF */}
      <Suspense fallback={null}>
        <ModalExportarBIPDF
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          onConfirm={handleExportBI}
        />
      </Suspense>

      <DashboardTutorialOverlay
        isOpen={isTutorialOpen && tutorialSteps.length > 0}
        steps={tutorialSteps}
        texts={tutorialTexts}
        onClose={closeTutorial}
      />

    </div>
  );
}
