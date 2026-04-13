import React, { useMemo, useState } from "react";
import { Card, Text, Title } from "@tremor/react";
import {
  Calendar,
  DollarSign,
  Layers,
  MapPin,
  Search,
  ShieldAlert,
  User,
} from "lucide-react";

import ExportModal from "./ExportModal";
import ExplicacaoBaseBrutaModal from "./ExplicacaoBaseBrutaModal";
import {
  calculatePaymentDeadline,
  formatCurrency,
  maskDocument,
} from "../../utils/dashboardFormatters";
import { useLanguage } from "../../contexts/LanguageContext";
import { INITIAL_DASHBOARD_TABLE_ROWS } from "../../constants/dashboard";

export default function TabelaHistorico({
  filtrados,
  setFiltros,
  temFiltroAtivo = false,
}) {
  const [termoBusca, setTermoBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExplicacaoOpen, setIsExplicacaoOpen] = useState(false);
  const { t } = useLanguage();
  const isEnglish = t.locale === "en-US";

  const dadosBuscados = useMemo(() => {
    if (!termoBusca) return filtrados;

    const buscaLower = termoBusca.toLowerCase();
    const buscaDocumento = buscaLower.replace(/[^\w\d]/g, "");

    return filtrados.filter((item) => {
      const documento = String(item.documentoCredor || "").replace(/[^\w\d]/g, "");

      return (
        item.artista?.toLowerCase().includes(buscaLower) ||
        item.municipio?.toLowerCase().includes(buscaLower) ||
        item.ciclo?.toLowerCase().includes(buscaLower) ||
        item.numeroEmpenho?.toLowerCase().includes(buscaLower) ||
        item.nomeCredor?.toLowerCase().includes(buscaLower) ||
        documento.includes(buscaDocumento)
      );
    });
  }, [filtrados, termoBusca]);

  const deveLimitarResultados = !temFiltroAtivo && !termoBusca;
  const dadosExibidos = useMemo(
    () =>
      deveLimitarResultados
        ? dadosBuscados.slice(0, INITIAL_DASHBOARD_TABLE_ROWS)
        : dadosBuscados,
    [dadosBuscados, deveLimitarResultados]
  );

  return (
    <div className="mb-8 w-full">
      <style>{`
        body.contraste-negativo .hc-tabela-card { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-header { background-color: #111 !important; color: #ffea00 !important; box-shadow: inset 0 -2px 0 0 #ffea00 !important; }
        body.contraste-negativo .hc-tabela-linha:hover { background-color: #111 !important; }
        body.contraste-negativo .hc-text-destaque { color: #ffea00 !important; }
        body.contraste-negativo .hc-pilula { background-color: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-valor { color: #00ff00 !important; }
      `}</style>

      <ExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dados={dadosExibidos}
      />
      <ExplicacaoBaseBrutaModal
        isOpen={isExplicacaoOpen}
        onClose={() => setIsExplicacaoOpen(false)}
      />

      <Card className="hc-tabela-card flex flex-col overflow-hidden rounded-[2rem] border-none bg-white p-0 shadow-[0_26px_70px_-52px_rgba(11,35,65,0.28)]">
        <div className="relative flex shrink-0 flex-col items-start justify-between gap-6 overflow-hidden bg-[#0B2341] p-6 md:flex-row md:items-start md:p-8">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#00AEEF]/10 blur-3xl" />

          <div className="relative z-10 w-full lg:w-auto">
            <Title className="hc-text-destaque mb-2 text-2xl font-black tracking-tight text-white md:text-3xl">
              {t.dashboard.table.title}
            </Title>
            <Text className="hc-text-destaque text-sm font-medium uppercase tracking-widest text-slate-400">
              {t.dashboard.table.subtitle}
            </Text>
          </div>

          <div className="relative z-10 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:w-auto">
            <button
              type="button"
              onClick={() => setIsExplicacaoOpen(true)}
              className="hc-text-destaque flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl border border-white/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-[#00AEEF] transition-colors hover:border-white/20 hover:text-white focus:outline-none focus-visible:underline"
            >
              {t.dashboard.table.rawDatabase}
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hc-text-destaque flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-[#0B2341] shadow-lg shadow-sky-900/20 transition-all hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 sm:w-auto"
            >
              <Layers size={16} /> {t.dashboard.table.export}
            </button>

            <div className="relative w-full sm:w-72">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder={t.dashboard.table.searchPlaceholder}
                value={termoBusca}
                onChange={(event) => setTermoBusca(event.target.value)}
                className="hc-text-destaque w-full rounded-xl border border-white/20 bg-white/10 py-2.5 pl-11 pr-4 text-sm text-white transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
              />
            </div>
          </div>
        </div>

        {deveLimitarResultados && filtrados.length > INITIAL_DASHBOARD_TABLE_ROWS && (
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400 md:px-8">
            {isEnglish
              ? `Showing the first ${INITIAL_DASHBOARD_TABLE_ROWS} records. Filter or search to load the full history.`
              : `Exibindo os primeiros ${INITIAL_DASHBOARD_TABLE_ROWS} registros. Filtre ou pesquise para liberar o historico completo.`}
          </div>
        )}

        <div className="relative max-h-[600px] overflow-auto bg-white scrollbar-moderna">
          <table className="w-full min-w-[1200px] border-collapse text-left">
            <thead className="hc-tabela-header sticky top-0 z-30 bg-slate-50 shadow-[inset_0_-1px_0_0_#e2e8f0]">
              <tr>
                <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-wider text-slate-400 hc-text-destaque">
                  <div className="flex items-center gap-2">
                    <User size={14} /> {t.dashboard.table.headers.artist}
                  </div>
                </th>
                <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-wider text-slate-400 hc-text-destaque">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={14} /> {t.dashboard.table.headers.creditor}
                  </div>
                </th>
                <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-wider text-slate-400 hc-text-destaque">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} /> {t.dashboard.table.headers.municipality}
                  </div>
                </th>
                <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-wider text-slate-400 hc-text-destaque">
                  <div className="flex items-center gap-2">
                    <Layers size={14} /> {t.dashboard.table.headers.cycle}
                  </div>
                </th>
                <th className="px-6 py-6 text-[10px] font-bold uppercase tracking-wider text-slate-400 hc-text-destaque">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /> {t.dashboard.table.headers.eventDeadline}
                  </div>
                </th>
                <th className="px-6 py-6 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400 hc-text-destaque">
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
                      className="group max-w-[220px] cursor-pointer align-top px-6 py-6"
                      onClick={() =>
                        setFiltros((current) => ({
                          ...current,
                          artista:
                            current.artista === item.artista ? "" : item.artista,
                        }))
                      }
                    >
                      <div className="mt-1 flex flex-col gap-2">
                        <span className="truncate text-sm font-bold text-[#0B2341] transition-colors group-hover:text-[#00AEEF] hc-text-destaque">
                          {item.artista}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 hc-text-destaque">
                            {t.dashboard.table.commitment}
                          </span>
                          <span className="hc-tabela-card rounded-md border border-slate-200 bg-white/50 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                            {item.numeroEmpenho}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td
                      className="group max-w-[240px] cursor-pointer align-top px-6 py-6"
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
                      <div className="mt-1 flex flex-col items-start gap-2">
                        <span className="w-full truncate text-xs font-bold text-slate-700 transition-colors group-hover:text-[#00AEEF] hc-text-destaque">
                          {item.nomeCredor}
                        </span>
                        <span className="hc-text-destaque rounded-md border border-slate-200/50 bg-white/50 px-2 py-1 font-mono text-[10px] font-bold text-slate-500">
                          {maskDocument(item.documentoCredor)}
                        </span>
                      </div>
                    </td>

                    <td
                      className="cursor-pointer align-top px-6 py-6"
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
                        <span className="text-sm font-bold text-slate-600 transition-colors group-hover:text-[#00AEEF] hc-text-destaque">
                          {item.municipio}
                        </span>
                      </div>
                    </td>

                    <td
                      className="cursor-pointer align-top px-6 py-6"
                      onClick={() =>
                        setFiltros((current) => ({
                          ...current,
                          ciclo: current.ciclo === item.ciclo ? "" : item.ciclo,
                        }))
                      }
                    >
                      <span className="hc-pilula mt-1 inline-block max-w-[180px] rounded-lg bg-[#0B2341] px-3 py-2 text-left text-[10px] font-black uppercase tracking-tight text-white transition-colors hover:bg-[#00AEEF]">
                        {item.ciclo}
                      </span>
                    </td>

                    <td className="align-top px-6 py-6">
                      <div className="mt-1 flex flex-col gap-2">
                        <span className="text-sm font-bold text-slate-700 hc-text-destaque">
                          {item.dataEvento}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 hc-text-destaque">
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

                    <td className="px-6 py-6 text-right align-top">
                      <div className="mt-1">
                        <span className="hc-valor font-mono text-sm font-black text-[#00AEEF]">
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
        </div>
      </Card>
    </div>
  );
}
