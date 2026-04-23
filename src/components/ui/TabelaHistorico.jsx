import React, { useEffect, useMemo, useRef, useState } from "react";

import ExportModal from "./ExportModal";
import ExplicacaoBaseBrutaModal from "./ExplicacaoBaseBrutaModal";
import { useLanguage } from "../../contexts/LanguageContext";
import { useViewMode } from "../../contexts/ViewModeContext";
import {
  DASHBOARD_TABLE_ROWS_STEP,
  INITIAL_DASHBOARD_TABLE_ROWS,
  MIN_DASHBOARD_SEARCH_CHARS,
} from "../../constants/dashboard";
import HistoricoTableToolbar from "./history/HistoricoTableToolbar";
import HistoricoTableContent from "./history/HistoricoTableContent";

export default function TabelaHistorico({
  filtrados,
  setFiltros,
  temFiltroAtivo = false,
  comfortable = false,
}) {
  const [termoBusca, setTermoBusca] = useState("");
  const [visibleRows, setVisibleRows] = useState(INITIAL_DASHBOARD_TABLE_ROWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExplicacaoOpen, setIsExplicacaoOpen] = useState(false);
  const tableContainerRef = useRef(null);
  const pendingScrollTopRef = useRef(null);
  const { t } = useLanguage();
  const { isMobile } = useViewMode();
  const isEnglish = t.locale === "en-US";
  const termoBuscaNormalizado = termoBusca.trim();
  const buscaAtiva = termoBuscaNormalizado.length >= MIN_DASHBOARD_SEARCH_CHARS;

  useEffect(() => {
    setVisibleRows(INITIAL_DASHBOARD_TABLE_ROWS);
  }, [filtrados, buscaAtiva]);

  useEffect(() => {
    if (pendingScrollTopRef.current === null || !tableContainerRef.current) return;

    const container = tableContainerRef.current;
    const nextTop = Math.min(
      container.scrollHeight - container.clientHeight,
      pendingScrollTopRef.current + 96
    );

    container.scrollTo({
      top: nextTop,
      behavior: "smooth",
    });

    pendingScrollTopRef.current = null;
  }, [visibleRows]);

  const dadosBuscados = useMemo(() => {
    if (!buscaAtiva) return filtrados;

    const buscaLower = termoBuscaNormalizado.toLowerCase();
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
  }, [buscaAtiva, filtrados, termoBuscaNormalizado]);

  const deveLimitarResultados = !buscaAtiva;
  const dadosExibidos = useMemo(
    () =>
      deveLimitarResultados
        ? dadosBuscados.slice(0, visibleRows)
        : dadosBuscados,
    [dadosBuscados, deveLimitarResultados, visibleRows]
  );
  const aindaTemMaisResultados = deveLimitarResultados && dadosBuscados.length > visibleRows;
  const buscaCurtaDemais =
    termoBuscaNormalizado.length > 0 &&
    termoBuscaNormalizado.length < MIN_DASHBOARD_SEARCH_CHARS;
  const mensagemLimite = isEnglish
    ? `Showing ${dadosExibidos.length} of ${dadosBuscados.length} records. Use Show more or search with at least ${MIN_DASHBOARD_SEARCH_CHARS} characters to unlock the full history.`
    : `Exibindo ${dadosExibidos.length} de ${dadosBuscados.length} registros. Use Mostrar mais ou pesquise com pelo menos ${MIN_DASHBOARD_SEARCH_CHARS} caracteres para liberar o histórico completo.`;
  const mensagemBuscaCurta = isEnglish
    ? `Type at least ${MIN_DASHBOARD_SEARCH_CHARS} characters to search the full history.`
    : `Digite pelo menos ${MIN_DASHBOARD_SEARCH_CHARS} caracteres para pesquisar em todo o histórico.`;

  return (
    <div className="h-full w-full flex flex-col min-h-0">
      <style>{`
        body.contraste-negativo .hc-tabela-card { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-header { background-color: #111 !important; color: #ffea00 !important; box-shadow: inset 0 -2px 0 0 #ffea00 !important; }
        body.contraste-negativo .hc-tabela-linha:hover { background-color: #111 !important; }
        body.contraste-negativo .hc-text-destaque { color: #ffea00 !important; }
        body.contraste-negativo .hc-pilula { background-color: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-valor { color: #00ff00 !important; }
        body.contraste-negativo .hc-tabela-limit-info {
          background-color: #111 !important;
          border-bottom: 1px solid #ffea00 !important;
          color: #ffea00 !important;
        }
      `}</style>

      <ExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dados={dadosBuscados}
      />
      <ExplicacaoBaseBrutaModal
        isOpen={isExplicacaoOpen}
        onClose={() => setIsExplicacaoOpen(false)}
      />

      <div
        className="hc-tabela-card flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-white"
        style={{ boxShadow: "0 1px 4px rgba(11,35,65,0.08), 0 0 0 1px rgba(226,232,240,0.5)" }}
      >
        <HistoricoTableToolbar
          title={t.dashboard.table.title}
          subtitle={t.dashboard.table.subtitle}
          rawDatabaseLabel={t.dashboard.table.rawDatabase}
          exportLabel={t.dashboard.table.export}
          searchPlaceholder={t.dashboard.table.searchPlaceholder}
          termoBusca={termoBusca}
          onSearchChange={setTermoBusca}
          onOpenExplanation={() => setIsExplicacaoOpen(true)}
          onOpenExport={() => setIsModalOpen(true)}
          comfortable={comfortable}
        />

        {deveLimitarResultados && dadosBuscados.length > INITIAL_DASHBOARD_TABLE_ROWS && (
          <div className={`hc-tabela-limit-info border-b border-slate-100 bg-slate-50/80 px-4 py-3 font-bold uppercase tracking-[0.14em] text-slate-400 md:px-8 md:tracking-[0.16em] ${
            comfortable ? "text-xs md:text-sm" : "text-[11px] md:text-xs"
          }`}>
            {buscaCurtaDemais ? mensagemBuscaCurta : mensagemLimite}
          </div>
        )}

        <HistoricoTableContent
          dadosExibidos={dadosExibidos}
          setFiltros={setFiltros}
          t={t}
          isMobile={isMobile}
          containerRef={tableContainerRef}
          comfortable={comfortable}
          footer={
            aindaTemMaisResultados ? (
              <div className="border-t border-slate-100 bg-white px-4 py-5 md:px-8">
                <button
                  type="button"
                  onClick={() => {
                    const container = tableContainerRef.current;

                    if (container) {
                      pendingScrollTopRef.current =
                        container.scrollHeight - container.clientHeight;
                    }

                    setVisibleRows((current) => current + DASHBOARD_TABLE_ROWS_STEP);
                  }}
                  className="hc-text-destaque inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-5 text-xs font-black uppercase tracking-[0.16em] text-[#0B2341] transition-all hover:border-[#00AEEF] hover:text-[#00AEEF] active:scale-[0.98] md:w-auto"
                >
                  {isEnglish ? "Show more" : "Mostrar mais"}
                </button>
              </div>
            ) : null
          }
        />
      </div>
    </div>
  );
}
