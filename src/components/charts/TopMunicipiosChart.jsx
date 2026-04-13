import React from "react";
import { Card, DonutChart, Title } from "@tremor/react";
import InfoTooltip from "../ui/InfoTooltip";
import { useLanguage } from "../../contexts/LanguageContext";

export default function TopMunicipiosChart({
  data,
  onFilter,
  filtroAtivo = "",
}) {
  const { t } = useLanguage();

  const customTooltipDonut = ({ payload, active }) => {
    if (!active || !payload?.length) return null;

    const item = payload[0].payload;

    return (
      <div className="hc-card z-50 rounded-xl border border-white/10 bg-[#0B2341] p-4 shadow-2xl">
        <p className="mb-1 text-sm font-bold text-white hc-text-destaque">
          {item.nome}
        </p>
        <p className="text-lg font-black text-[#00AEEF] hc-text-destaque">
          {item.total} {t.common.shows}
        </p>
      </div>
    );
  };

  const normalize = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

  return (
    <Card
      className="hc-card relative flex h-full flex-col rounded-3xl border-none bg-white p-6 shadow-xl shadow-blue-900/5 lg:col-span-2 md:p-8"
      role="region"
      aria-label={t.dashboard.charts.topMunicipiosTitle}
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
        .recharts-pie-sector path { stroke: #ffffff !important; stroke-width: 2px !important; outline: none !important; }
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

      <Title className="mb-8 font-black text-[#0B2341] hc-text-destaque">
        {t.dashboard.charts.topMunicipiosTitle}
      </Title>

      <div className="absolute right-6 top-6 md:right-8 md:top-8">
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

      <div className="flex h-full flex-1 flex-col items-center justify-between gap-8 md:flex-row" aria-hidden="true">
        <div className="flex min-h-[250px] w-full items-center justify-center outline-none md:w-1/2">
          {data.length > 0 ? (
            <DonutChart
              data={data}
              category="total"
              index="nome"
              className="h-72 w-full cursor-pointer outline-none"
              customTooltip={customTooltipDonut}
              onValueChange={(value) => onFilter(value ? value.nome : "")}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400 hc-text-destaque">
              {t.common.noDataFound}
            </div>
          )}
        </div>

        <div className="flex max-h-72 w-full flex-col gap-2 overflow-y-auto pr-2 scrollbar-moderna md:w-1/2">
          {data.map((item, index) => {
            const selecionado = filtroAtivo === normalize(item.nome);

            return (
              <button
                key={item.nome}
                type="button"
                onClick={() => onFilter(item.nome)}
                className={`group hc-card flex w-full items-center justify-between rounded-xl p-2 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 ${
                  selecionado
                    ? "bg-blue-50 ring-1 ring-blue-200"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex truncate pr-2 items-center gap-3">
                  <span
                    className={`legenda-${index % 8} h-3.5 w-3.5 shrink-0 rounded-full shadow-sm transition-transform ${
                      selecionado ? "scale-125" : ""
                    }`}
                  />
                  <span
                    className={`truncate text-sm font-bold transition-colors hc-text-destaque ${
                      selecionado
                        ? "text-[#00AEEF]"
                        : "text-[#0B2341] group-hover:text-[#00AEEF]"
                    }`}
                  >
                    {item.nome}
                  </span>
                </div>
                <div
                  className={`shrink-0 text-xs font-black hc-text-destaque ${
                    selecionado ? "text-[#00AEEF]" : "text-slate-400"
                  }`}
                >
                  {item.total}{" "}
                  <span className="text-[10px] font-medium uppercase">
                    {t.common.shows}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
