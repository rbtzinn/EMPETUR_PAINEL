import React, { useMemo } from "react";
import { Card, Metric, Text } from "@tremor/react";

export default function IndicadoresKPI({ filtrados, filtros, setFiltros }) {
  if (!filtrados || filtrados.length === 0) return null;

  const totalApresentacoes = filtrados.length;
  const totalArtistas = [...new Set(filtrados.map((d) => d.artista))].length;
  const totalMunicipios = [...new Set(filtrados.map((d) => d.municipio))].length;

  const topArtista = useMemo(() => {
    const contagem = {};
    filtrados.forEach(d => contagem[d.artista] = (contagem[d.artista] || 0) + 1);
    const ranking = Object.entries(contagem).map(([nome, total]) => ({ nome, total })).sort((a, b) => b.total !== a.total ? b.total - a.total : a.nome.localeCompare(b.nome));
    return ranking.length > 0 ? ranking[0].nome : "";
  }, [filtrados]);

  const topMunicipio = useMemo(() => {
    const contagem = {};
    const nomesOriginais = {}; 
    filtrados.forEach(d => {
      contagem[d.municipioNormalizado] = (contagem[d.municipioNormalizado] || 0) + 1;
      nomesOriginais[d.municipioNormalizado] = d.municipio;
    });
    const ranking = Object.entries(contagem).map(([normalizado, total]) => ({ normalizado, original: nomesOriginais[normalizado], total })).sort((a, b) => b.total !== a.total ? b.total - a.total : a.original.localeCompare(b.original));
    return ranking.length > 0 ? ranking[0] : { normalizado: "", original: "" };
  }, [filtrados]);

  const temFiltroAtivo = Object.values(filtros).some(valor => valor !== "");

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
      <style>{`
        body.contraste-negativo .hc-kpi-card { background-color: #000 !important; border: 2px solid #FFFF00 !important; }
        body.contraste-negativo .hc-kpi-card * { color: #FFFF00 !important; }
        body.contraste-negativo .hc-kpi-active { background-color: #333300 !important; }
      `}</style>

      <Card onClick={() => setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "" })} className={`flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-center hc-kpi-card ${temFiltroAtivo ? 'bg-[#0B2341] cursor-pointer hover:bg-[#0f2d52] hc-kpi-active' : 'bg-[#0B2341]/80'}`}>
        <Text className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Apresentações Encontradas</Text>
        <Metric className="text-white text-5xl font-black mt-2">{totalApresentacoes}</Metric>
        {temFiltroAtivo && (<div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-[#00AEEF] text-[#0B2341] text-[9px] font-black uppercase px-2 py-1.5 rounded-md shadow-md">Limpar Filtros</div>)}
      </Card>

      <Card onClick={() => setFiltros(prev => ({...prev, artista: prev.artista === topArtista ? "" : topArtista}))} className={`flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white cursor-pointer hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-center hc-kpi-card ${filtros.artista === topArtista ? 'ring-2 ring-[#0B2341] hc-kpi-active' : ''}`}>
        <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Artistas Diferentes</Text>
        <Metric className="text-[#0B2341] text-5xl font-black mt-2">{totalArtistas}</Metric>
        {totalArtistas > 1 && (<div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500 group-hover:text-[#00AEEF] transition-colors"><span className="truncate">Destaque: <span className="font-bold">{topArtista}</span></span></div>)}
      </Card>

      <Card onClick={() => setFiltros(prev => ({...prev, municipio: prev.municipio === topMunicipio.normalizado ? "" : topMunicipio.normalizado}))} className={`flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white cursor-pointer hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-center hc-kpi-card ${filtros.municipio === topMunicipio.normalizado ? 'ring-2 ring-[#00AEEF] hc-kpi-active' : ''}`}>
        <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Municípios Atendidos</Text>
        <Metric className="text-[#00AEEF] text-5xl font-black mt-2">{totalMunicipios}</Metric>
        {totalMunicipios > 1 && (<div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500 group-hover:text-[#00AEEF] transition-colors"><span className="truncate">Destino Top: <span className="font-bold">{topMunicipio.original}</span></span></div>)}
      </Card>
    </div>
  );
}