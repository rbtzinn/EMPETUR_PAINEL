import React, { useMemo } from "react";
import { Card, Title, Text } from "@tremor/react";
import InfoTooltip from "../ui/InfoTooltip"; // 🔴 Caminho ajustado

export default function TopArtistasCard({ filtrados }) {
  const topArtistas = useMemo(() => {
    if (!filtrados || filtrados.length === 0) return [];
    const contagem = {};
    filtrados.forEach((d) => {
      const nome = d.artista || "NÃO IDENTIFICADO";
      contagem[nome] = (contagem[nome] || 0) + 1;
    });

    return Object.entries(contagem)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        return a.nome.localeCompare(b.nome);
      })
      .slice(0, 10);
  }, [filtrados]);

  const maxShows = topArtistas.length > 0 ? topArtistas[0].total : 1;

  return (
    <Card className="relative rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <Title className="text-[#0B2341] font-black">Top Artistas</Title>
        <InfoTooltip text="Ranking dos 10 artistas com o maior volume de apresentações contratadas." />
      </div>

      <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-6 border-b border-slate-100 pb-4">
        Por Quantidade de Shows
      </Text>

      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
        {topArtistas.length > 0 ? (
          topArtistas.map((item, index) => (
            <div key={index} className="flex flex-col gap-1.5 group">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-[#0B2341] truncate pr-4 group-hover:text-[#00AEEF] transition-colors">
                  {index + 1}. {item.nome}
                </span>
                <span className="text-[10px] font-black text-slate-400 whitespace-nowrap">
                  {item.total} {item.total === 1 ? 'SHOW' : 'SHOWS'}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00AEEF] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(item.total / maxShows) * 100}%` }}></div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">Nenhum artista encontrado.</div>
        )}
      </div>
    </Card>
  );
}