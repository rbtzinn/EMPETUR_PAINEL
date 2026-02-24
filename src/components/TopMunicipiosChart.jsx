import React from "react";
import { Card, Title, Text, DonutChart } from "@tremor/react";

export default function TopMunicipiosChart({ data, onFilter }) {
  // Tooltip customizado com o design do seu painel
  const customTooltipDonut = ({ payload, active }) => {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0].payload;
    return (
      <div className="bg-[#0B2341] p-4 rounded-xl shadow-2xl border border-white/10 z-50">
        <p className="font-bold text-white text-sm mb-1">{item.nome}</p>
        <p className="text-[#00AEEF] font-black text-lg">{item.total} shows</p>
      </div>
    );
  };

  // Array de cores hexadecimais que batem EXATAMENTE com o CSS abaixo,
  // usado para pintar as bolinhas da nossa legenda customizada.
  const coresHex = [
    "#0B2341", // 1
    "#00AEEF", // 2
    "#38BDF8", // 3
    "#7DD3FC", // 4
    "#E0F2FE", // 5
    "#94A3B8", // 6
    "#CBD5E1", // 7
    "#F1F5F9"  // 8
  ];

  return (
    <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 lg:col-span-2 flex flex-col h-full relative">
      
      {/* O CSS agora tem 8 posições para cobrir o seu slice(0, 8) e evitar qualquer cor preta */}
      <style>{`
        .recharts-pie-sector:nth-child(1) path { fill: #0B2341 !important; }
        .recharts-pie-sector:nth-child(2) path { fill: #00AEEF !important; }
        .recharts-pie-sector:nth-child(3) path { fill: #38BDF8 !important; }
        .recharts-pie-sector:nth-child(4) path { fill: #7DD3FC !important; }
        .recharts-pie-sector:nth-child(5) path { fill: #E0F2FE !important; }
        .recharts-pie-sector:nth-child(6) path { fill: #94A3B8 !important; }
        .recharts-pie-sector:nth-child(7) path { fill: #CBD5E1 !important; }
        .recharts-pie-sector:nth-child(8) path { fill: #F1F5F9 !important; }
        .recharts-pie-sector path { stroke: #ffffff !important; stroke-width: 2px !important; }
      `}</style>

      <div className="mb-6">
        <Title className="text-[#0B2341] font-black">Top Municípios</Title>
        <Text className="text-slate-400 text-xs">💡 Clique na fatia ou no nome para filtrar</Text>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
        
        {/* LADO ESQUERDO: GRÁFICO DONUT */}
        <div className="w-full md:w-1/2 flex items-center justify-center min-h-[250px]">
          {data.length > 0 ? (
            <DonutChart
              data={data} 
              category="total" 
              index="nome"
              className="h-72 w-full cursor-pointer"
              showLegend={false} // Mantemos o nativo desligado
              customTooltip={customTooltipDonut}
              onValueChange={(v) => onFilter(v ? v.nome : "")}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              Nenhum dado encontrado.
            </div>
          )}
        </div>

        {/* LADO DIREITO: LEGENDA CUSTOMIZADA E CLICÁVEL */}
        <div className="w-full md:w-1/2 flex flex-col gap-2 max-h-72 overflow-y-auto pr-2 scrollbar-moderna">
          {data.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => onFilter(item.nome)}
              className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors"
              title={`Filtrar shows em ${item.nome}`}
            >
              {/* Bolinha de Cor e Nome */}
              <div className="flex items-center gap-3 truncate pr-2">
                <span 
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" 
                  style={{ backgroundColor: coresHex[idx % coresHex.length] }}
                ></span>
                <span className="text-sm font-bold text-[#0B2341] group-hover:text-[#00AEEF] transition-colors truncate">
                  {item.nome}
                </span>
              </div>
              
              {/* Quantidade (Valor) */}
              <div className="text-xs font-black text-slate-400 shrink-0">
                {item.total} <span className="font-medium text-[10px] uppercase">shows</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Card>
  );
}