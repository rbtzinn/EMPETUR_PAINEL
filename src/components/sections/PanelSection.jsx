import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  DollarSign,
  ExternalLink,
  Layers,
  MapPin,
  RefreshCw,
  ShieldAlert,
  User,
} from "lucide-react";
import FadeIn from "../ui/FadeIn";
import DropdownPesquisavel from "../ui/DropdownPesquisavel";
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
import {
  calculatePaymentDeadline,
  formatCurrency,
  maskDocument,
} from "../../utils/dashboardFormatters";
import { useLanguage } from "../../contexts/LanguageContext";

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
          <div className="hc-tabela-card rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-48px_rgba(11,35,65,0.35)]">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(t.panelSection.filters).map(([field, label]) => (
                <DropdownPesquisavel
                  key={field}
                  label={label}
                  value={filtros[field]}
                  onChange={(value) =>
                    setFiltros((current) => ({ ...current, [field]: value }))
                  }
                  options={opcoes[field] || []}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setFiltros(createDefaultFilters())}
                className="hc-text-destaque inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#0B2341] transition-all hover:bg-slate-200 active:scale-95"
              >
                <RefreshCw strokeWidth={2.5} size={16} /> {t.panelSection.clear}
              </button>

              <Link
                to={lookerShareUrl}
                className="hc-botao-destaque inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0B2341] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#00AEEF] active:scale-95"
              >
                {t.panelSection.advancedPanel}
                <ExternalLink strokeWidth={2.5} size={18} />
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="hc-tabela-card flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_-48px_rgba(11,35,65,0.35)]">
            <div className="relative flex flex-col items-start justify-between gap-4 border-b border-slate-100/80 p-6 md:flex-row md:items-center md:p-8">
              <div>
                <h3 className="mb-1 text-2xl font-black tracking-tight text-[#0B2341] hc-text-destaque">
                  {t.panelSection.table.title}
                </h3>
                <p className="text-sm font-medium text-slate-400 hc-text-destaque">
                  {t.panelSection.table.subtitle}
                </p>
              </div>
              <div className="hc-tabela-card flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/80 px-5 py-2.5 text-[#00AEEF]">
                <span className="text-xs font-black uppercase tracking-widest hc-text-destaque">
                  {dadosExibidos.length}/{filtrados.length} {t.common.records}
                </span>
              </div>
            </div>

            {!temFiltroAtivo && filtrados.length > INITIAL_QUICK_TABLE_ROWS && (
              <div className="border-b border-slate-100/80 bg-slate-50/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 md:px-8">
                {isEnglish
                  ? `Showing the first ${INITIAL_QUICK_TABLE_ROWS} records. Apply a filter to load the full list.`
                  : `Exibindo os primeiros ${INITIAL_QUICK_TABLE_ROWS} registros. Aplique um filtro para liberar a lista completa.`}
              </div>
            )}

            <div className="h-[650px] overflow-y-auto bg-slate-50/30 scrollbar-moderna">
              <table className="w-full min-w-[1050px] border-collapse text-left">
                <thead className="hc-tabela-header sticky top-0 z-10 bg-white/95 shadow-sm shadow-slate-100 backdrop-blur-md">
                  <tr>
                    {[
                      { icon: <User size={14} />, label: t.panelSection.table.artistHeader },
                      {
                        icon: <ShieldAlert size={14} />,
                        label: t.panelSection.table.contractorHeader,
                        title: "Documento anonimizado (LGPD)",
                      },
                      { icon: <MapPin size={14} />, label: t.panelSection.table.municipalityHeader },
                      { icon: <Layers size={14} />, label: t.panelSection.table.cycleHeader },
                      { icon: <Calendar size={14} />, label: t.panelSection.table.dateHeader },
                    ].map((header) => (
                      <th
                        key={header.label}
                        className="whitespace-nowrap px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hc-tabela-header"
                        title={header.title}
                      >
                        <div className="flex items-center gap-2">
                          {header.icon}
                          {header.label}
                        </div>
                      </th>
                    ))}
                    <th className="whitespace-nowrap px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400 hc-tabela-header">
                      <div className="flex items-center justify-end gap-2">
                        <DollarSign size={14} />
                        {t.panelSection.table.valueHeader}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dadosExibidos.length > 0 ? (
                    dadosExibidos.map((item) => (
                      <tr
                        key={item.id}
                        className="group hc-tabela-linha border-b border-slate-100/60 bg-white transition-colors last:border-0 hover:bg-blue-50/40"
                      >
                        <td
                          className="max-w-[200px] cursor-pointer px-6 py-5"
                          onClick={() =>
                            setFiltros((current) => ({
                              ...current,
                              artista:
                                current.artista === item.artista
                                  ? ""
                                  : item.artista,
                            }))
                          }
                        >
                          <div className="flex flex-col gap-1.5">
                            <span className="truncate text-sm font-bold text-[#0B2341] transition-colors group-hover:text-[#00AEEF] hc-text-destaque">
                              {item.artista}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 hc-text-destaque">
                                {t.panelSection.table.ne}
                              </span>
                              <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide text-slate-600 hc-tabela-card">
                                {item.numeroEmpenho}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td
                          className="max-w-[220px] cursor-pointer px-6 py-5"
                          onClick={() =>
                            setFiltros((current) => ({
                              ...current,
                              nomeCredor:
                                current.nomeCredor === item.nomeCredor
                                  ? ""
                                  : item.nomeCredor,
                            }))
                          }
                        >
                          <div className="flex flex-col items-start gap-1.5">
                            <span className="w-full truncate text-xs font-bold text-slate-600 transition-colors group-hover:text-[#00AEEF] hc-text-destaque">
                              {item.nomeCredor}
                            </span>
                            <span className="rounded border border-slate-200/60 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-slate-500 hc-tabela-card hc-text-destaque">
                              {maskDocument(item.documentoCredor)}
                            </span>
                          </div>
                        </td>

                        <td
                          className="cursor-pointer px-6 py-5"
                          onClick={() =>
                            setFiltros((current) => ({
                              ...current,
                              municipio:
                                current.municipio === item.municipio
                                  ? ""
                                  : item.municipio,
                            }))
                          }
                        >
                          <span className="text-sm font-bold text-slate-600 transition-colors group-hover:text-[#0B2341] hc-text-destaque">
                            {item.municipio}
                          </span>
                        </td>

                        <td
                          className="cursor-pointer px-6 py-5 align-middle"
                          onClick={() =>
                            setFiltros((current) => ({
                              ...current,
                              ciclo:
                                current.ciclo === item.ciclo ? "" : item.ciclo,
                            }))
                          }
                        >
                          <span className="hc-pilula inline-flex max-w-[160px] items-center justify-center truncate rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#0B2341] transition-all">
                            {item.ciclo}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-[#0B2341] hc-text-destaque">
                              {item.dataEvento}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 hc-text-destaque">
                              {t.panelSection.table.deadline}
                              <span className="ml-1 text-amber-600 hc-text-destaque">
                                {calculatePaymentDeadline(item.dataEvento, {
                                  pendingLabel: t.common.pendingDefinition,
                                  fallbackLabel: t.common.consultCommitment,
                                })}
                              </span>
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <span className="hc-valor font-mono text-[15px] font-black text-[#00AEEF]">
                            {formatCurrency(item.valor, t.locale)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-32">
                        <div className="flex flex-col items-center justify-center px-4 text-center">
                          <h4 className="mb-2 text-lg font-bold text-[#0B2341] hc-text-destaque">
                            {t.panelSection.table.empty}
                          </h4>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
