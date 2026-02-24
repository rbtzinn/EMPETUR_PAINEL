import React, { useMemo } from "react";
import { Card, Title, Text } from "@tremor/react";

export default function TopArtistasCard({ filtrados }) {
  // Processamento isolado: conta os shows e pega os 5 maiores
  const topArtistas = useMemo(() => {
    const mapa = {};
    filtrados.forEach((d) => { 
      mapa[d.artista] = (mapa[d.artista] || 0) + 1; 
    });
    
    return Object.entries(mapa)
      .map(([name, value]) => ({ name, value }))
      .sort((a,b) => b.value - a.value)
      .slice(0, 5);
  }, [filtrados]);

  // Usamos o maior valor para calcular a largura das barrinhas
  const valorMaximo = topArtistas.length > 0 ? topArtistas[0].value : 1;

  return (
    <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 flex flex-col h-full">
      <div className="mb-6">
        <Title className="text-[#0B2341] font-black">Top Artistas</Title>
        <Text className="text-slate-400 text-xs">Artistas com mais apresentações</Text>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        {topArtistas.length > 0 ? (
          <div className="flex flex-col gap-5">
            {topArtistas.map((artista, index) => {
              // Calcula o tamanho da barra horizontal em %
              const largura = `${(artista.value / valorMaximo) * 100}%`;
              
              return (
                <div key={index} className="flex items-center gap-4 w-full group cursor-default">
                  
                  {/* Posição no Ranking (1, 2, 3...) */}
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#00AEEF] flex items-center justify-center text-xs font-black shrink-0 group-hover:bg-[#00AEEF] group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  
                  {/* Nome, Valor e Barrinha */}
                  <div className="flex-1 w-full min-w-0">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-xs font-bold text-[#0B2341] truncate pr-2" title={artista.name}>
                        {artista.name}
                      </span>
                      <span className="text-sm font-black text-[#00AEEF]">
                        {artista.value}
                      </span>
                    </div>
                    
                    {/* Fundo da Barrinha */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      {/* Barrinha Preenchida */}
                      <div 
                        className="h-full bg-[#00AEEF] rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: largura }}
                      ></div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm">
            Sem dados para exibir
          </div>
        )}
      </div>
    </Card>
  );
}