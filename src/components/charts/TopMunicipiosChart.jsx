import React from "react";
import { DonutChart } from "@tremor/react";
import { FileDown } from "lucide-react";
import InfoTooltip from "../ui/InfoTooltip";
import { useLanguage } from "../../contexts/LanguageContext";

export default function TopMunicipiosChart({
  data,
  onFilter,
  filtroAtivo = "",
  onExportPDF = null,
}) {
  const { t } = useLanguage();

  const customTooltipDonut = ({ payload, active }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0].payload;
    return (
      <div className="hc-card z-50 rounded-xl border border-white/10 bg-[#0B2341] px-3 py-2 shadow-2xl">
        <p className="mb-0.5 text-xs font-bold text-white hc-text-destaque">{item.nome}</p>
        <p className="text-sm font-black text-[#00AEEF] hc-text-destaque">
          {item.total} {t.common.shows}
        </p>
      </div>
    );
  };

  const normalize = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

  return (
    <div
      className="hc-card relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-white p-3"
      role="region"
      aria-label={t.dashboard.charts.topMunicipiosTitle}
      style={{ boxShadow: "0 1px 4px rgba(11,35,65,0.08), 0 0 0 1px rgba(226,232,240,0.5)" }}
    >
      <style>{`
        .recharts-pie-sector:nth-child(1) path { fill: #0B2341 !important; }
        .recharts-pie-sector:nth-child(2) path { fill: #00AEEF !important; }
        .recharts-pie-sector:nth-child(3) path { fill: #38BDF8 !important; }
        .recharts-pie-sector:nth-child(4) path { fill: #7DD3FC !important; }
        .recharts-pie-sector:nth-child(5) path { fill: #E0F2FE !important; }
        .recharts-pie-sector:nth-child(6) path { fill: #94A3B8 !important; }
        .recharts-pie-sector:nth-child(7) path { fill: #CBD5E1 !important; }
        .recharts-pie-sector:nth-child(8) path { fill: #F1F5F9 !important; }
        .recharts-pie-sector path { stroke: #ffffff !important; stroke-width: 1.5px !important; outline: none !important; }
        .legenda-0 { background-color: #0B2341; }
        .legenda-1 { background-color: #00AEEF; }
        .legenda-2 { background-color: #38BDF8; }
        .legenda-3 { background-color: #7DD3FC; }
        .legenda-4 { background-color: #E0F2FE; }
        .legenda-5 { background-color: #94A3B8; }
        .legenda-6 { background-color: #CBD5E1; }
        .legenda-7 { background-color: #F1F5F9; }
        body.contraste-negativo .recharts-pie-sector path { stroke: #000000 !important; }
        body.contraste-negativo .recharts-pie-sector:nth-child(1) path, body.contraste-negativo .legenda-0 { fill: #FFFF00 !important; background-color: #FFFF00 !important; }
        body.contraste-negativo .recharts-pie-sector:nth-child(2) path, body.contraste-negativo .legenda-1 { fill: #00FF00 !important; background-color: #00FF00 !important; }
        body.contraste-negativo .recharts-pie-sector:nth-child(3) path, body.contraste-negativo .legenda-2 { fill: #00FFFF !important; background-color: #00FFFF !important; }
        body.contraste-negativo .recharts-pie-sector:nth-child(4) path, body.contraste-negativo .legenda-3 { fill: #FF00FF !important; background-color: #FF00FF !important; }
        body.contraste-negativo .recharts-pie-sector:nth-child(5) path, body.contraste-negativo .legenda-4 { fill: #FFA500 !important; background-color: #FFA500 !important; }
        body.contraste-negativo .recharts-pie-sector:nth-child(6) path, body.contraste-negativo .legenda-5 { fill: #FFFFFF !important; background-color: #FFFFFF !important; }
        body.contraste-negativo .recharts-pie-sector:nth-child(7) path, body.contraste-negativo .legenda-6 { fill: #FF4500 !important; background-color: #FF4500 !important; }
        body.contraste-negativo .recharts-pie-sector:nth-child(8) path, body.contraste-negativo .legenda-7 { fill: #ADFF2F !important; background-color: #ADFF2F !important; }
      `}</style>

      {/* Header */}
      <div className="mb-2 flex shrink-0 items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#0B2341] hc-text-destaque">
          {t.dashboard.charts.topMunicipiosTitle}
        </span>
        <InfoTooltip text={t.dashboard.charts.topMunicipiosTooltip} />
      </div>

      <div className="sr-only">
        {data.length > 0
          ? `Ranking: ${data
              .map(
                (item, index) =>
                  `${index + 1} ${item.nome} com ${item.total} ${t.common.shows}.`
              )
              .join(" ")}`
          : t.common.noDataFound}
      </div>

      {/* Donut compacto */}
      <div className="flex shrink-0 items-center justify-center py-1" aria-hidden="true">
        {data.length > 0 ? (
          <DonutChart
            data={data}
            category="total"
            index="nome"
            className="h-28 w-full cursor-pointer outline-none"
            customTooltip={customTooltipDonut}
            onValueChange={(value) => onFilter(value ? value.nome : "")}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400 hc-text-destaque">
            {t.common.noDataFound}
          </div>
        )}
      </div>

      {/* Lista com scroll — todos os itens, sem espaço em branco embaixo */}
      <div className="bi-scroll min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-0.5 pb-1">
          {data.map((item, index) => {
            const selecionado = filtroAtivo === normalize(item.nome);
            return (
              <button
                key={item.nome}
                type="button"
                onClick={() => onFilter(item.nome)}
                className={`group hc-card flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-1 ${
                  selecionado ? "bg-blue-50 ring-1 ring-blue-200" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`legenda-${index % 8} h-2 w-2 shrink-0 rounded-full`} />
                  <span
                    className={`text-[10px] font-bold hc-text-destaque ${
                      selecionado ? "text-[#00AEEF]" : "text-[#0B2341] group-hover:text-[#00AEEF]"
                    }`}
                    title={item.nome}
                  >
                    {item.nome}
                  </span>
                </div>
                <span
                  className={`ml-2 shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-black hc-text-destaque ${
                    selecionado ? "bg-blue-100 text-[#00AEEF]" : "text-slate-500"
                  }`}
                >
                  {item.total}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Botao Exportar PDF - so aparece em modo BI quando prop onExportPDF for passada */}
      {onExportPDF && (
        <div className="bi-export-btn mt-2 shrink-0 border-t border-slate-100 pt-2">
          <button
            type="button"
            onClick={onExportPDF}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B2341] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#00AEEF] active:scale-[0.97]"
          >
            <FileDown className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
            {t.dashboard.biExport.button}
          </button>
        </div>
      )}
    </div>
  );
}
