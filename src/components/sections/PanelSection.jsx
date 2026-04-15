import React, { useMemo, useState } from "react";
import {
} from "lucide-react";
import FadeIn from "../ui/FadeIn";
import {
  createDefaultFilters,
  hasActiveFilters,
  INITIAL_QUICK_TABLE_ROWS,
} from "../../constants/dashboard";
import { useProcessedData } from "../../hooks/useProcessedData";
import {
  buildFilterOptions,
  filterRows,
} from "../../utils/dashboardFilters";
import { useLanguage } from "../../contexts/LanguageContext";
import PanelFiltersCard from "./panel/PanelFiltersCard";
import PanelRecordsTable from "./panel/PanelRecordsTable";

export default function PanelSection({ id, csvUrls, lookerShareUrl }) {
  const { data: dados, loading } = useProcessedData(csvUrls);
  const [filtros, setFiltros] = useState(createDefaultFilters);
  const { t } = useLanguage();
  const isEnglish = t.locale === "en-US";

  const filtrados = useMemo(
    () =>
      filterRows(dados, filtros, {
        allowMacroCycle: false,
        useNormalizedMunicipio: false,
      }),
    [dados, filtros]
  );

  const opcoes = useMemo(
    () =>
      buildFilterOptions(dados, filtros, {
        allowMacroCycle: false,
        useNormalizedMunicipio: false,
      }),
    [dados, filtros]
  );

  const temFiltroAtivo = useMemo(() => hasActiveFilters(filtros), [filtros]);
  const dadosExibidos = useMemo(
    () =>
      temFiltroAtivo
        ? filtrados
        : filtrados.slice(0, INITIAL_QUICK_TABLE_ROWS),
    [filtrados, temFiltroAtivo]
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-[#F8FAFC] py-32">
        <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-[#00AEEF]/20 border-t-[#00AEEF]" />
        <p className="hc-text-destaque animate-pulse text-sm font-bold uppercase tracking-widest text-[#0B2341]">
          {t.panelSection.loading}
        </p>
      </div>
    );
  }

  return (
    <section id={id} className="relative bg-transparent py-16 md:py-20">
      <style>{`
        body.contraste-negativo .hc-tabela-card { background-color: #000 !important; border: 2px solid #ffea00 !important; box-shadow: none !important; }
        body.contraste-negativo .hc-tabela-header th { background-color: #111 !important; color: #ffea00 !important; border-bottom: 2px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-linha:hover { background-color: #111 !important; }
        body.contraste-negativo .hc-text-destaque { color: #ffea00 !important; }
        body.contraste-negativo .hc-pilula { background-color: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-valor { color: #00ff00 !important; }
        body.contraste-negativo .hc-tabela-header th .lucide,
        body.contraste-negativo .hc-tabela-linha .lucide {
          color: #ffea00 !important;
        }
      `}</style>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-10">
        <FadeIn className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-48px_rgba(11,35,65,0.35)] md:p-9">
          <div className="max-w-3xl">
            <div className="mb-5 h-1.5 w-14 rounded-full bg-[#00AEEF]" />
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0B2341] hc-text-destaque md:text-5xl">
              {t.panelSection.title}
            </h2>
            <p className="max-w-xl text-base font-medium leading-relaxed text-slate-500 hc-text-destaque md:text-lg">
              {t.panelSection.description}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="relative z-30 mb-6">
          <PanelFiltersCard
            fields={t.panelSection.filters}
            filtros={filtros}
            setFiltros={setFiltros}
            getOpcoes={(field) => opcoes[field] || []}
            onClear={() => setFiltros(createDefaultFilters())}
            lookerShareUrl={lookerShareUrl}
            clearLabel={t.panelSection.clear}
            advancedPanelLabel={t.panelSection.advancedPanel}
          />
        </FadeIn>

        <FadeIn delay={0.14}>
          <PanelRecordsTable
            dadosExibidos={dadosExibidos}
            filtrados={filtrados}
            temFiltroAtivo={temFiltroAtivo}
            setFiltros={setFiltros}
            t={t}
            isEnglish={isEnglish}
          />
        </FadeIn>
      </div>
    </section>
  );
}
