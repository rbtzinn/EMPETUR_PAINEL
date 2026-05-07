import React from "react";
import { Text } from "@tremor/react";
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

export default function HistoricoTableContent({
  dadosExibidos,
  filtros = {},
  setFiltros,
  t,
  containerRef,
  footer = null,
  comfortable = false,
}) {
  const headerTextClass = comfortable ? "text-[11px]" : "text-[9px]";
  const mainTextClass = comfortable ? "text-base" : "text-sm";
  const secondaryTextClass = comfortable ? "text-xs" : "text-[10px]";
  const creditorTextClass = comfortable ? "text-sm" : "text-xs";
  const pillTextClass = comfortable ? "text-xs" : "text-[10px]";
  const getHeaderClass = (field) =>
    filtros?.[field]
      ? "hc-filtered-column-header bg-sky-50 text-[#00AEEF] shadow-[inset_0_-3px_0_#00AEEF]"
      : "text-slate-400";

  return (
    <div
      ref={containerRef}
      className="relative min-h-0 flex-1 overflow-x-auto overflow-y-auto bg-white scrollbar-moderna bi-scroll"
    >
      <style>{`
        body.contraste-negativo .hc-filtered-column-header {
          background-color: #ffea00 !important;
          color: #000 !important;
          box-shadow: inset 0 -3px 0 #000 !important;
        }
        body.contraste-negativo .hc-tabela-header .hc-filtered-column-header,
        body.contraste-negativo .hc-filtered-column-header.hc-text-destaque,
        body.contraste-negativo .hc-filtered-column-header .lucide,
        body.contraste-negativo .hc-filtered-column-header span {
          color: #000 !important;
        }
      `}</style>

      <table className="w-full min-w-[1200px] border-collapse text-left">
        <thead className="hc-tabela-header sticky top-0 z-30 bg-slate-50 shadow-[inset_0_-1px_0_0_#e2e8f0]">
          <tr>
            <th className={`px-4 py-3 font-bold uppercase tracking-wider transition-colors hc-text-destaque ${headerTextClass} ${getHeaderClass("artista")}`}>
              <div className="flex items-center gap-2">
                <User size={14} /> {t.dashboard.table.headers.artist}
              </div>
            </th>
            <th className={`px-4 py-3 font-bold uppercase tracking-wider transition-colors hc-text-destaque ${headerTextClass} ${getHeaderClass("nomeCredor")}`}>
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} /> {t.dashboard.table.headers.creditor}
              </div>
            </th>
            <th className={`px-4 py-3 font-bold uppercase tracking-wider transition-colors hc-text-destaque ${headerTextClass} ${getHeaderClass("municipio")}`}>
              <div className="flex items-center gap-2">
                <MapPin size={14} /> {t.dashboard.table.headers.municipality}
              </div>
            </th>
            <th className={`px-4 py-3 font-bold uppercase tracking-wider transition-colors hc-text-destaque ${headerTextClass} ${getHeaderClass("ciclo")}`}>
              <div className="flex items-center gap-2">
                <Layers size={14} /> {t.dashboard.table.headers.cycle}
              </div>
            </th>
            <th className={`px-4 py-3 font-bold uppercase tracking-wider transition-colors hc-text-destaque ${headerTextClass} ${getHeaderClass("dataEvento")}`}>
              <div className="flex items-center gap-2">
                <Calendar size={14} /> {t.dashboard.table.headers.eventDeadline}
              </div>
            </th>
            <th className={`px-6 py-4 text-right font-bold uppercase tracking-wider text-slate-400 hc-text-destaque ${comfortable ? "text-xs" : "text-[10px]"}`}>
              <div className="flex items-center justify-end gap-2">
                <DollarSign size={14} /> {t.dashboard.table.headers.value}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {dadosExibidos.length > 0 ? (
            dadosExibidos.map((item) => (
              <tr
                key={item.id}
                className="hc-tabela-linha border-b border-slate-50 bg-white transition-colors even:bg-blue-50/30 hover:bg-slate-100"
              >
                <td
                  className="group max-w-[240px] cursor-pointer align-top px-4 py-3"
                  onClick={() =>
                    setFiltros((current) => ({
                      ...current,
                      artista: current.artista === item.artista ? "" : item.artista,
                    }))
                  }
                >
                  <div className="mt-1 flex flex-col gap-2">
                    <span className={`truncate font-bold text-[#0B2341] transition-colors group-hover:text-[#00AEEF] hc-text-destaque ${mainTextClass}`}>
                      {item.artista}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`font-black uppercase tracking-widest text-slate-400 hc-text-destaque ${secondaryTextClass}`}>
                        {t.dashboard.table.commitment}
                      </span>
                      <span className={`hc-tabela-card rounded-md border border-slate-200 bg-white/50 px-2 py-0.5 font-bold text-slate-500 ${secondaryTextClass}`}>
                        {item.numeroEmpenho}
                      </span>
                    </div>
                  </div>
                </td>

                <td
                  className="group max-w-[260px] cursor-pointer align-top px-4 py-3"
                  onClick={() =>
                    setFiltros((current) => ({
                      ...current,
                      nomeCredor:
                        current.nomeCredor === item.nomeCredor ? "" : item.nomeCredor,
                    }))
                  }
                >
                  <div className="mt-1 flex flex-col items-start gap-2">
                    <span className={`w-full truncate font-bold text-slate-700 transition-colors group-hover:text-[#00AEEF] hc-text-destaque ${creditorTextClass}`}>
                      {item.nomeCredor}
                    </span>
                    <span className={`hc-text-destaque rounded-md border border-slate-200/50 bg-white/50 px-2 py-1 font-mono font-bold text-slate-500 ${secondaryTextClass}`}>
                      {maskDocument(item.documentoCredor)}
                    </span>
                  </div>
                </td>

                <td
                  className="cursor-pointer align-top px-4 py-3"
                  onClick={() =>
                    setFiltros((current) => ({
                      ...current,
                      municipio:
                        current.municipio === item.municipioNormalizado
                          ? ""
                          : item.municipioNormalizado,
                    }))
                  }
                >
                  <div className="group/mun mt-1 flex items-center gap-2">
                    <MapPin
                      size={16}
                      className="text-slate-300 transition-colors group-hover:text-[#00AEEF]"
                    />
                    <span className={`font-bold text-slate-600 transition-colors group-hover:text-[#00AEEF] hc-text-destaque ${mainTextClass}`}>
                      {item.municipio}
                    </span>
                  </div>
                </td>

                <td
                  className="cursor-pointer align-top px-4 py-3"
                  onClick={() =>
                    setFiltros((current) => ({
                      ...current,
                      ciclo: current.ciclo === item.ciclo ? "" : item.ciclo,
                    }))
                  }
                >
                  <span className={`hc-pilula mt-1 inline-block max-w-[200px] rounded-lg bg-[#0B2341] px-3 py-2 text-left font-black uppercase tracking-tight text-white transition-colors hover:bg-[#00AEEF] ${pillTextClass}`}>
                    {item.ciclo}
                  </span>
                </td>

                <td className="align-top px-4 py-3">
                  <div className="mt-1 flex flex-col gap-2">
                    <span className={`font-bold text-slate-700 hc-text-destaque ${mainTextClass}`}>
                      {item.dataEvento}
                    </span>
                    <span className={`font-black uppercase tracking-wider text-slate-400 hc-text-destaque ${secondaryTextClass}`}>
                      {t.dashboard.table.deadline}{" "}
                      <span className="text-amber-500 hc-text-destaque">
                        {calculatePaymentDeadline(item.dataEvento, {
                          pendingLabel: t.common.pendingDefinition,
                          fallbackLabel: t.common.consultCommitment,
                        })}
                      </span>
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-right align-top">
                  <div className="mt-1">
                    <span className={`hc-valor font-mono font-black text-[#00AEEF] ${mainTextClass}`}>
                      {formatCurrency(item.valor, t.locale)}
                    </span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-20 text-center">
                <Text className="font-bold text-slate-400 hc-text-destaque">
                  {t.dashboard.table.empty}
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {footer}
    </div>
  );
}
