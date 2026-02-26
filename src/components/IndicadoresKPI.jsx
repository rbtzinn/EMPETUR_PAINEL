import React, { useMemo } from "react";
import { Card, Metric, Text } from "@tremor/react";

export default function IndicadoresKPI({ filtrados, filtros, setFiltros }) {
  if (!filtrados || filtrados.length === 0) return null;

  // 1. Contagens básicas
  const totalApresentacoes = filtrados.length;
  const totalArtistas = [...new Set(filtrados.map((d) => d.artista))].length;
  const totalMunicipios = [...new Set(filtrados.map((d) => d.municipio))].length;

  // 2. Lógica para descobrir o Top 1 Artista (Com Desempate Alfabético)
  const topArtista = useMemo(() => {
    const contagem = {};
    filtrados.forEach(d => contagem[d.artista] = (contagem[d.artista] || 0) + 1);
    
    const ranking = Object.entries(contagem)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        return a.nome.localeCompare(b.nome);
      });

    return ranking.length > 0 ? ranking[0].nome : "";
  }, [filtrados]);

  // 3. Lógica para descobrir o Top 1 Município (Com Desempate Alfabético)
  const topMunicipio = useMemo(() => {
    const contagem = {};
    const nomesOriginais = {}; 
    filtrados.forEach(d => {
      contagem[d.municipioNormalizado] = (contagem[d.municipioNormalizado] || 0) + 1;
      nomesOriginais[d.municipioNormalizado] = d.municipio;
    });
    
    const ranking = Object.entries(contagem)
      .map(([normalizado, total]) => ({ normalizado, original: nomesOriginais[normalizado], total }))
      .sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        return a.original.localeCompare(b.original);
      });

    return ranking.length > 0 ? ranking[0] : { normalizado: "", original: "" };
  }, [filtrados]);

  // 4. Verificador se existe algum filtro ativo
  const temFiltroAtivo = Object.values(filtros).some(valor => valor !== "");

  // 5. Handlers de Clique
  const handleReset = () => {
    setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "" });
  };

  const handleToggleArtista = () => {
    setFiltros(prev => ({
      ...prev,
      artista: prev.artista === topArtista ? "" : topArtista
    }));
  };

  const handleToggleMunicipio = () => {
    setFiltros(prev => ({
      ...prev,
      municipio: prev.municipio === topMunicipio.normalizado ? "" : topMunicipio.normalizado
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
      
      {/* KPI 1: APRESENTAÇÕES (Botão de Reset) */}
      <Card 
        onClick={handleReset}
        className={`flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 transition-all duration-300 relative overflow-hidden group flex flex-col justify-center
          ${temFiltroAtivo ? 'bg-[#0B2341] cursor-pointer hover:bg-[#0f2d52] hover:scale-[1.02]' : 'bg-[#0B2341]/80'}`}
      >
        <Text className="text-white/60 font-bold uppercase tracking-widest text-[10px]">
          Apresentações Encontradas
        </Text>
        <Metric className="text-white text-5xl font-black mt-2">
          {totalApresentacoes}
        </Metric>
        
        {temFiltroAtivo && (
          <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-[#00AEEF] text-[#0B2341] text-[9px] font-black uppercase px-2 py-1.5 rounded-md shadow-md">
            Limpar Filtros
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </Card>

      {/* KPI 2: ARTISTAS (Filtra pelo Top 1) */}
      <Card 
        onClick={handleToggleArtista}
        className={`flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white cursor-pointer hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-center
          ${filtros.artista === topArtista ? 'ring-2 ring-[#0B2341]' : ''}`}
      >
        <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Artistas Diferentes
        </Text>
        <Metric className="text-[#0B2341] text-5xl font-black mt-2">
          {totalArtistas}
        </Metric>
        
        {totalArtistas > 1 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500 group-hover:text-[#00AEEF] transition-colors">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="truncate">Destaque: <span className="font-bold">{topArtista}</span></span>
          </div>
        )}
      </Card>

      {/* KPI 3: MUNICÍPIOS (Filtra pelo Top 1) */}
      <Card 
        onClick={handleToggleMunicipio}
        className={`flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white cursor-pointer hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-center
          ${filtros.municipio === topMunicipio.normalizado ? 'ring-2 ring-[#00AEEF]' : ''}`}
      >
        <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Municípios Atendidos
        </Text>
        <Metric className="text-[#00AEEF] text-5xl font-black mt-2">
          {totalMunicipios}
        </Metric>
        
        {totalMunicipios > 1 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500 group-hover:text-[#00AEEF] transition-colors">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">Destino Top: <span className="font-bold">{topMunicipio.original}</span></span>
          </div>
        )}
      </Card>

    </div>
  );
}