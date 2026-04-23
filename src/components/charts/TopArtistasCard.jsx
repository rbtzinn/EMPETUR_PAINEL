import React, { useMemo } from "react";
import InfoTooltip from "../ui/InfoTooltip";
import { useLanguage } from "../../contexts/LanguageContext";

export default function TopArtistasCard({
  filtrados,
  comfortable = false,
  onFilter = null,
  filtroAtivo = "",
}) {
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
  const canFilter = typeof onFilter === "function";

  return (
    <div
      className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-white ${
        comfortable ? "p-0" : "p-3"
      }`}
      role="region"
      aria-label={t.dashboard.charts.topArtistsTitle}
      style={{ boxShadow: "0 1px 4px rgba(11,35,65,0.08), 0 0 0 1px rgba(226,232,240,0.5)" }}
    >
      <div
        className={`shrink-0 border-b border-slate-100 ${
          comfortable ? "px-5 py-3" : "mb-2 pb-2"
        }`}
        aria-hidden="true"
      >
        {comfortable ? (
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="hc-padrao-card-kicker text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t.dashboard.standardLayout.topArtistsKicker}
              </p>
              <h2 className="hc-padrao-card-title text-lg font-black text-[#0B2341]">
                {t.dashboard.charts.topArtistsTitle}
              </h2>
              <p className="hc-padrao-card-text text-xs text-slate-400">
                {t.dashboard.charts.topArtistsSubtitle}
              </p>
            </div>
            <InfoTooltip text={t.dashboard.charts.topArtistsTooltip} />
          </div>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0B2341]">
                {t.dashboard.charts.topArtistsTitle}
              </span>
              <InfoTooltip text={t.dashboard.charts.topArtistsTooltip} />
            </div>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">
              {t.dashboard.charts.topArtistsSubtitle}
            </span>
          </>
        )}
      </div>

      {/* Lista compacta com scroll interno */}
      <div
        className={`scrollbar-moderna flex min-h-0 flex-1 flex-col overflow-y-auto ${
          comfortable ? "gap-3 px-4 py-3 pr-4" : "gap-2 pr-1"
        }`}
      >
        {topArtistas.length > 0 ? (
          topArtistas.map((item, index) => {
            const selecionado = filtroAtivo === item.nome;
            const Element = canFilter ? "button" : "div";

            return (
              <Element
                key={item.nome}
                type={canFilter ? "button" : undefined}
                tabIndex={canFilter ? undefined : 0}
                onClick={canFilter ? () => onFilter(item.nome) : undefined}
                aria-pressed={canFilter ? selecionado : undefined}
                aria-label={`${index + 1}: ${item.nome} com ${item.total} ${t.common.shows}`}
                className={`hc-top-artist-row group flex w-full flex-col rounded-lg text-left transition-all focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-1 ${
                  comfortable ? "gap-1.5 px-2 py-1.5" : "gap-1 px-1.5 py-1"
                } ${
                  canFilter ? "cursor-pointer hover:bg-slate-50" : ""
                } ${
                  selecionado ? "bg-blue-50 ring-1 ring-[#00AEEF] hc-top-artist-row-active" : ""
                }`}
              >
              <div className="flex items-end justify-between" aria-hidden="true">
                <span className={`truncate pr-2 font-bold text-[#0B2341] transition-colors group-hover:text-[#00AEEF] ${
                  comfortable ? "text-xs" : "text-[10px]"
                }`}>
                  {index + 1}. {item.nome}
                </span>
                <span className={`whitespace-nowrap font-black text-slate-400 ${
                  comfortable ? "text-[10px]" : "text-[9px]"
                }`}>
                  {item.total}{" "}
                  {item.total === 1 ? t.common.showUpperSingular : t.common.showUpperPlural}
                </span>
              </div>
              <div className={`${comfortable ? "h-1.5" : "h-1"} w-full overflow-hidden rounded-full bg-slate-100`} aria-hidden="true">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    selecionado ? "bg-[#0B2341]" : "bg-[#00AEEF]"
                  }`}
                  style={{ width: `${(item.total / maxShows) * 100}%` }}
                />
              </div>
              </Element>
            );
          })
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
            {t.common.noDataFound}
          </div>
        )}
      </div>
    </div>
  );
}
