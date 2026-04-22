import React, { useMemo } from "react";
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
    <div
      className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-white p-3"
      role="region"
      aria-label={t.dashboard.charts.topArtistsTitle}
      style={{ boxShadow: "0 1px 4px rgba(11,35,65,0.08), 0 0 0 1px rgba(226,232,240,0.5)" }}
    >
      {/* Header */}
      <div className="mb-2 flex shrink-0 items-center justify-between" aria-hidden="true">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#0B2341]">
          {t.dashboard.charts.topArtistsTitle}
        </span>
        <InfoTooltip text={t.dashboard.charts.topArtistsTooltip} />
      </div>

      <span className="mb-2 block shrink-0 border-b border-slate-100 pb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
        {t.dashboard.charts.topArtistsSubtitle}
      </span>

      {/* Lista compacta com scroll interno */}
      <div className="scrollbar-moderna flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {topArtistas.length > 0 ? (
          topArtistas.map((item, index) => (
            <div
              key={item.nome}
              tabIndex={0}
              aria-label={`${index + 1}: ${item.nome} com ${item.total} ${t.common.shows}`}
              className="group flex flex-col gap-1 rounded px-1 py-0.5 transition-colors focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-1"
            >
              <div className="flex items-end justify-between" aria-hidden="true">
                <span className="truncate pr-2 text-[10px] font-bold text-[#0B2341] transition-colors group-hover:text-[#00AEEF]">
                  {index + 1}. {item.nome}
                </span>
                <span className="whitespace-nowrap text-[9px] font-black text-slate-400">
                  {item.total}{" "}
                  {item.total === 1 ? t.common.showUpperSingular : t.common.showUpperPlural}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-[#00AEEF] transition-all duration-1000 ease-out"
                  style={{ width: `${(item.total / maxShows) * 100}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
            {t.common.noDataFound}
          </div>
        )}
      </div>
    </div>
  );
}
