import React, { useMemo } from "react";
import { Card, Text, Title } from "@tremor/react";
import InfoTooltip from "../ui/InfoTooltip";
import { useLanguage } from "../../contexts/LanguageContext";

export default function TopArtistasCard({ filtrados }) {
  const { t } = useLanguage();

  const topArtistas = useMemo(() => {
    if (!filtrados?.length) return [];

    const contagem = {};

    filtrados.forEach((item) => {
      const nome = item.artista || "NÃO IDENTIFICADO";
      contagem[nome] = (contagem[nome] || 0) + 1;
    });

    return Object.entries(contagem)
      .map(([nome, total]) => ({ nome, total }))
      .sort((left, right) =>
        right.total !== left.total
          ? right.total - left.total
          : left.nome.localeCompare(right.nome)
      )
      .slice(0, 10);
  }, [filtrados]);

  const maxShows = topArtistas[0]?.total || 1;

  return (
    <Card
      className="relative flex h-full flex-col rounded-3xl border-none bg-white p-6 shadow-xl shadow-blue-900/5 md:p-8"
      role="region"
      aria-label={t.dashboard.charts.topArtistsTitle}
    >
      <div className="mb-2 flex items-center justify-between" aria-hidden="true">
        <Title className="font-black text-[#0B2341]">
          {t.dashboard.charts.topArtistsTitle}
        </Title>
        <InfoTooltip text={t.dashboard.charts.topArtistsTooltip} />
      </div>

      <Text className="mb-6 border-b border-slate-100 pb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {t.dashboard.charts.topArtistsSubtitle}
      </Text>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-2">
        {topArtistas.length > 0 ? (
          topArtistas.map((item, index) => (
            <div
              key={item.nome}
              tabIndex={0}
              aria-label={`${index + 1}: ${item.nome} com ${item.total} ${t.common.shows}`}
              className="group flex flex-col gap-1.5 rounded-md p-1 transition-colors focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2"
            >
              <div className="flex items-end justify-between" aria-hidden="true">
                <span className="truncate pr-4 text-xs font-bold text-[#0B2341] transition-colors group-hover:text-[#00AEEF]">
                  {index + 1}. {item.nome}
                </span>
                <span className="whitespace-nowrap text-[10px] font-black text-slate-400">
                  {item.total}{" "}
                  {item.total === 1
                    ? t.common.showUpperSingular
                    : t.common.showUpperPlural}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-[#00AEEF] transition-all duration-1000 ease-out"
                  style={{ width: `${(item.total / maxShows) * 100}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
            {t.common.noDataFound}
          </div>
        )}
      </div>
    </Card>
  );
}
