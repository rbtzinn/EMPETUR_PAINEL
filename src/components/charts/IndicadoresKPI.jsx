import React, { useMemo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function IndicadoresKPI({ filtrados, filtros, setFiltros }) {
  const { t } = useLanguage();

  if (!filtrados?.length) return null;

  const totalApresentacoes = filtrados.length;
  const totalArtistas = new Set(filtrados.map((item) => item.artista)).size;
  const totalMunicipios = new Set(filtrados.map((item) => item.municipio)).size;

  const topMunicipio = useMemo(() => {
    const contagem = {};
    const nomesOriginais = {};

    filtrados.forEach((item) => {
      contagem[item.municipioNormalizado] =
        (contagem[item.municipioNormalizado] || 0) + 1;
      nomesOriginais[item.municipioNormalizado] = item.municipio;
    });

    const ranking = Object.entries(contagem)
      .map(([normalizado, total]) => ({
        normalizado,
        original: nomesOriginais[normalizado],
        total,
      }))
      .sort((left, right) =>
        right.total !== left.total
          ? right.total - left.total
          : left.original.localeCompare(right.original)
      );

    return ranking[0] || { normalizado: "", original: "" };
  }, [filtrados]);

  const temFiltroAtivo = Object.values(filtros).some((value) => value !== "");

  const cardBase =
    "rounded-xl overflow-hidden flex flex-col justify-between p-3 transition-all duration-200";
  const shadow =
    "0 1px 4px rgba(11,35,65,0.08), 0 0 0 1px rgba(226,232,240,0.5)";

  return (
    <div className="flex flex-col gap-2">
      <style>{`
        body.contraste-negativo .hc-kpi-card {
          background: #000 !important;
          background-image: none !important;
          border: 2px solid #ffff00 !important;
          box-shadow: none !important;
        }
        body.contraste-negativo .hc-kpi-card * {
          color: #ffff00 !important;
        }
        body.contraste-negativo .hc-kpi-active {
          background: #333300 !important;
        }
      `}</style>

      <div
        role="button"
        tabIndex={temFiltroAtivo ? 0 : -1}
        aria-label={`${t.dashboard.kpi.presentations}: ${totalApresentacoes}${
          temFiltroAtivo ? ". Clique para limpar filtros." : ""
        }`}
        onClick={() =>
          temFiltroAtivo &&
          setFiltros((current) => ({
            ...current,
            municipio: "",
            ciclo: "",
            ano: "",
            artista: "",
            dataEvento: "",
            nomeCredor: "",
          }))
        }
        onKeyDown={(event) =>
          event.key === "Enter" &&
          temFiltroAtivo &&
          setFiltros((current) => ({
            ...current,
            municipio: "",
            ciclo: "",
            ano: "",
            artista: "",
            dataEvento: "",
            nomeCredor: "",
          }))
        }
        className={`hc-kpi-card ${cardBase} ${
          temFiltroAtivo ? "hc-kpi-active cursor-pointer hover:opacity-90" : "cursor-default"
        }`}
        style={{
          background: "linear-gradient(135deg, #0B2341 0%, #0d2d52 100%)",
          boxShadow: shadow,
        }}
      >
        <span className="text-[8px] font-black uppercase tracking-widest text-white/50">
          {t.dashboard.kpi.presentations}
        </span>
        <span className="mt-1 text-3xl font-black leading-none tracking-tight text-white">
          {totalApresentacoes.toLocaleString("pt-BR")}
        </span>
        {temFiltroAtivo && (
          <span className="mt-1.5 text-[8px] font-bold text-[#00AEEF]">
            x {t.common.clearFilters}
          </span>
        )}
      </div>

      <div
        role="region"
        aria-label={`${t.dashboard.kpi.artists}: ${totalArtistas}`}
        className={`hc-kpi-card ${cardBase} bg-white`}
        style={{ boxShadow: shadow }}
      >
        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
          {t.dashboard.kpi.artists}
        </span>
        <span className="mt-1 text-3xl font-black leading-none tracking-tight text-[#0B2341]">
          {totalArtistas.toLocaleString("pt-BR")}
        </span>
      </div>

      <button
        type="button"
        onClick={() =>
          setFiltros((current) => ({
            ...current,
            municipio:
              current.municipio === topMunicipio.normalizado
                ? ""
                : topMunicipio.normalizado,
          }))
        }
        aria-label={`${t.dashboard.kpi.municipalities}: ${totalMunicipios}. ${t.dashboard.kpi.topDestination} ${topMunicipio.original}`}
        className={`hc-kpi-card group ${cardBase} bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 ${
          filtros.municipio === topMunicipio.normalizado
            ? "hc-kpi-active ring-2 ring-[#00AEEF]"
            : "hover:scale-[1.01]"
        }`}
        style={{ boxShadow: shadow }}
      >
        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
          {t.dashboard.kpi.municipalities}
        </span>
        <span className="mt-1 text-3xl font-black leading-none tracking-tight text-[#00AEEF]">
          {totalMunicipios.toLocaleString("pt-BR")}
        </span>
        {totalMunicipios > 1 && (
          <span className="mt-1.5 truncate text-[8px] font-bold text-slate-400 transition-colors group-hover:text-[#00AEEF]">
            {t.dashboard.kpi.topDestination} <span className="font-black">{topMunicipio.original}</span>
          </span>
        )}
      </button>
    </div>
  );
}
