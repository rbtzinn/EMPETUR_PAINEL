import React from "react";
import {
  Calendar,
  DollarSign,
  Layers,
  MapPin,
  ShieldAlert,
  User,
} from "lucide-react";
import {
  calculatePaymentDeadline,
  formatCurrency,
  maskDocument,
} from "../../../utils/dashboardFormatters";
import { INITIAL_QUICK_TABLE_ROWS } from "../../../constants/dashboard";

export default function PanelRecordsTable({
  dadosExibidos,
  filtrados,
  filtros,
  temFiltroAtivo,
  setFiltros,
  t,
  isEnglish,
  aindaTemMaisResultados,
  onShowMore,
}) {
  const headers = [
    { field: "artista", icon: <User size={14} />, label: t.panelSection.table.artistHeader },
    {
      field: "nomeCredor",
      icon: <ShieldAlert size={14} />,
      label: t.panelSection.table.contractorHeader,
      title: "Documento anonimizado (LGPD)",
    },
    { field: "municipio", icon: <MapPin size={14} />, label: t.panelSection.table.municipalityHeader },
    { field: "ciclo", icon: <Layers size={14} />, label: t.panelSection.table.cycleHeader },
    { field: "dataEvento", icon: <Calendar size={14} />, label: t.panelSection.table.dateHeader },
  ];

  return (
    <div className="hc-tabela-card flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_-48px_rgba(11,35,65,0.35)]">
      <style>{`
        body.contraste-negativo .hc-filtered-column-header {
          background-color: #ffea00 !important;
          color: #000 !important;
          box-shadow: inset 0 -3px 0 #000 !important;
        }
        body.contraste-negativo .hc-tabela-header .hc-filtered-column-header,
        body.contraste-negativo .hc-tabela-header .hc-filtered-column-header.hc-tabela-header,
        body.contraste-negativo .hc-filtered-column-header .lucide,
        body.contraste-negativo .hc-filtered-column-header span {
          color: #000 !important;
        }
      `}</style>

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

      {filtrados.length > INITIAL_QUICK_TABLE_ROWS && (
        <div className="border-b border-slate-100/80 bg-slate-50/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 md:px-8">
          {isEnglish
            ? `Showing ${dadosExibidos.length} of ${filtrados.length} records. Use Show more to load more results.`
            : `Exibindo ${dadosExibidos.length} de ${filtrados.length} registros. Use Mostrar mais para carregar mais resultados.`}
        </div>
      )}

      <div className="h-[650px] overflow-x-auto overflow-y-auto bg-slate-50/30 scrollbar-moderna">
        <table className="w-full min-w-[1050px] border-collapse text-left">
          <thead className="hc-tabela-header sticky top-0 z-10 bg-white/95 shadow-sm shadow-slate-100 backdrop-blur-md">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.label}
                  className={`whitespace-nowrap px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-colors hc-tabela-header ${
                    filtros?.[header.field]
                      ? "hc-filtered-column-header bg-sky-50 text-[#00AEEF] shadow-[inset_0_-3px_0_#00AEEF]"
                      : "text-slate-400"
                  }`}
                  title={header.title}
                  aria-sort={filtros?.[header.field] ? "other" : undefined}
                >
                  <div className="flex items-center gap-2">
                    {header.icon}
                    <span>{header.label}</span>
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
                        artista: current.artista === item.artista ? "" : item.artista,
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
                          current.nomeCredor === item.nomeCredor ? "" : item.nomeCredor,
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
                        municipio: current.municipio === item.municipio ? "" : item.municipio,
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
                        ciclo: current.ciclo === item.ciclo ? "" : item.ciclo,
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

      {aindaTemMaisResultados && (
        <div className="border-t border-slate-100/80 bg-white px-6 py-5 md:px-8">
          <button
            type="button"
            onClick={onShowMore}
            className="hc-text-destaque inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-5 text-xs font-black uppercase tracking-[0.16em] text-[#0B2341] transition-all hover:border-[#00AEEF] hover:text-[#00AEEF] active:scale-[0.98] md:w-auto"
          >
            {isEnglish ? "Show more" : "Mostrar mais"}
          </button>
        </div>
      )}
    </div>
  );
}
