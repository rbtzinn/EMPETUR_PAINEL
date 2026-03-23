import React from "react";
import { Card, Title, DonutChart } from "@tremor/react";
import InfoTooltip from "../ui/InfoTooltip";

export default function TopMunicipiosChart({ data, onFilter, filtroAtivo = "" }) {
  const customTooltipDonut = ({ payload, active }) => {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
      // 🔴 hc-card e hc-text adicionados no Tooltip
      <div className="bg-[#0B2341] p-4 rounded-xl shadow-2xl border border-white/10 z-50 hc-card">
        <p className="font-bold text-white text-sm mb-1 hc-text-destaque">{item.nome}</p>
        <p className="text-[#00AEEF] font-black text-lg hc-text-destaque">{item.total} shows</p>
      </div>
    );
  };

  // Função auxiliar rápida para comparar os nomes selecionados
  const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

  return (
    <Card 
      // 🔴 hc-card adicionado no Card principal
      className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 lg:col-span-2 flex flex-col h-full relative hc-card"
      role="region"
      aria-label="Gráfico dos principais municípios atendidos."
    >
      <style>{`
        /* 🔵 CORES NORMAIS (Gráfico) */
        .recharts-pie-sector:nth-child(1) path { fill: #0B2341 !important; }
        .recharts-pie-sector:nth-child(2) path { fill: #00AEEF !important; }
        .recharts-pie-sector:nth-child(3) path { fill: #38BDF8 !important; }
        .recharts-pie-sector:nth-child(4) path { fill: #7DD3FC !important; }
        .recharts-pie-sector:nth-child(5) path { fill: #E0F2FE !important; }
        .recharts-pie-sector:nth-child(6) path { fill: #94A3B8 !important; }
        .recharts-pie-sector:nth-child(7) path { fill: #CBD5E1 !important; }
        .recharts-pie-sector:nth-child(8) path { fill: #F1F5F9 !important; }
        .recharts-pie-sector path { stroke: #ffffff !important; stroke-width: 2px !important; outline: none !important; }

        /* 🔵 CORES NORMAIS (Bolinhas da Legenda) */
        .legenda-0 { background-color: #0B2341; }
        .legenda-1 { background-color: #00AEEF; }
        .legenda-2 { background-color: #38BDF8; }
        .legenda-3 { background-color: #7DD3FC; }
        .legenda-4 { background-color: #E0F2FE; }
        .legenda-5 { background-color: #94A3B8; }
        .legenda-6 { background-color: #CBD5E1; }
        .legenda-7 { background-color: #F1F5F9; }

        /* 🟡 ALTO CONTRASTE (Substitui TUDO por cores vibrantes para daltónicos e baixa visão) */
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

      {/* 🔴 hc-text-destaque adicionado */}
      <Title className="text-[#0B2341] font-black mb-8 hc-text-destaque">Top Municípios</Title>

      <div className="absolute top-6 right-6 md:top-8 md:right-8">
        <InfoTooltip text="Clique na fatia ou no nome da cidade na legenda para filtrar o painel." />
      </div>

      <div className="sr-only">
        {data.length > 0 
          ? `Ranking de Municípios: ` + data.map((d, i) => `${i + 1}º lugar é ${d.nome} com ${d.total} shows. `).join('')
          : "Nenhum dado encontrado para municípios."}
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8 h-full" aria-hidden="true">
        <div className="w-full md:w-1/2 flex items-center justify-center min-h-[250px] outline-none">
          {data.length > 0 ? (
            <DonutChart 
              data={data} 
              category="total" 
              index="nome" 
              className="h-72 w-full cursor-pointer outline-none" 
              customTooltip={customTooltipDonut} 
              onValueChange={(v) => onFilter(v ? v.nome : "")} 
            />
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 hc-text-destaque">Nenhum dado encontrado.</div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-2 max-h-72 overflow-y-auto pr-2 scrollbar-moderna">
          {data.map((item, idx) => {
            const selecionado = filtroAtivo === normalize(item.nome);

            return (
              <button 
                key={idx} 
                onClick={() => onFilter(item.nome)} 
                className={`w-full text-left flex items-center justify-between group cursor-pointer p-2 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 ${selecionado ? 'bg-blue-50 ring-1 ring-blue-200 hc-card' : 'hover:bg-slate-50 hc-card'}`} 
                title={selecionado ? `Remover filtro de ${item.nome}` : `Filtrar shows em ${item.nome}`}
              >
                <div className="flex items-center gap-3 truncate pr-2">
                  {/* 🔴 A BOLINHA AGORA RECEBE A CLASSE DE COR EM VEZ DE INLINE STYLE */}
                  <span className={`w-3.5 h-3.5 rounded-full shrink-0 shadow-sm transition-transform legenda-${idx % 8} ${selecionado ? 'scale-125' : ''}`}></span>
                  <span className={`text-sm font-bold truncate transition-colors hc-text-destaque ${selecionado ? 'text-[#00AEEF]' : 'text-[#0B2341] group-hover:text-[#00AEEF]'}`}>{item.nome}</span>
                </div>
                <div className={`text-xs font-black shrink-0 hc-text-destaque ${selecionado ? 'text-[#00AEEF]' : 'text-slate-400'}`}>
                  {item.total} <span className="font-medium text-[10px] uppercase">shows</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}