import React, { useMemo } from "react";
import { Card, Metric, Text } from "@tremor/react";
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

  return (
    <div className="mb-8 flex w-full flex-col gap-6 md:flex-row">
      <style>{`
        body.contraste-negativo .hc-kpi-card { background-color: #000 !important; border: 2px solid #FFFF00 !important; }
        body.contraste-negativo .hc-kpi-card * { color: #FFFF00 !important; }
        body.contraste-negativo .hc-kpi-active { background-color: #333300 !important; }
      `}</style>

      <Card
        className={`hc-kpi-card group relative flex flex-1 flex-col justify-center overflow-hidden rounded-3xl border-none shadow-xl shadow-blue-900/5 transition-all duration-300 ${
          temFiltroAtivo
            ? "hc-kpi-active cursor-pointer bg-[#0B2341] hover:bg-[#0f2d52]"
            : "bg-[#0B2341]/80"
        }`}
      >
        <Text className="text-[10px] font-bold uppercase tracking-widest text-white/60">
          {t.dashboard.kpi.presentations}
        </Text>
        <Metric className="mt-2 text-5xl font-black text-white">
          {totalApresentacoes}
        </Metric>
        {temFiltroAtivo && (
          <div className="absolute bottom-4 right-5 flex items-center gap-1 rounded-md bg-[#00AEEF] px-2 py-1.5 text-[9px] font-black uppercase text-[#0B2341] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            {t.common.clearFilters}
          </div>
        )}
      </Card>

      <Card className="hc-kpi-card flex flex-1 flex-col justify-center rounded-3xl border-none bg-white shadow-xl shadow-blue-900/5">
        <Text className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {t.dashboard.kpi.artists}
        </Text>
        <Metric className="mt-2 text-5xl font-black text-[#0B2341]">
          {totalArtistas}
        </Metric>
      </Card>

      <Card
        onClick={() =>
          setFiltros((current) => ({
            ...current,
            municipio:
              current.municipio === topMunicipio.normalizado
                ? ""
                : topMunicipio.normalizado,
          }))
        }
        className={`hc-kpi-card group flex flex-1 cursor-pointer flex-col justify-center rounded-3xl border-none bg-white shadow-xl shadow-blue-900/5 transition-all duration-300 hover:scale-[1.02] ${
          filtros.municipio === topMunicipio.normalizado
            ? "hc-kpi-active ring-2 ring-[#00AEEF]"
            : ""
        }`}
      >
        <Text className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {t.dashboard.kpi.municipalities}
        </Text>
        <Metric className="mt-2 text-5xl font-black text-[#00AEEF]">
          {totalMunicipios}
        </Metric>
        {totalMunicipios > 1 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors group-hover:text-[#00AEEF]">
            <span className="truncate">
              {t.dashboard.kpi.topDestination}{" "}
              <span className="font-bold">{topMunicipio.original}</span>
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}
