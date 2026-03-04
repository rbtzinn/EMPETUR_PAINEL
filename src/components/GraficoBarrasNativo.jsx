import React from "react";

/**
 * GraficoBarrasNativo
 * - Scroll horizontal só do gráfico
 * - Barras com largura fixa (não espreme os textos)
 * - Rótulo perfeitamente centralizado
 */
export default function GraficoBarrasNativo({
  data = [],
  indice,
  formatador = (n) => String(n),
  onClick = () => {},
  filtroAtivo = "",
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        Sem dados
      </div>
    );
  }

  const maximo = Math.max(...data.map((d) => Number(d.total || 0)), 0);

  return (
    <div className="h-full w-full flex flex-col">
      {/* Área rolável só do gráfico */}
      <div className="h-full w-full overflow-x-auto scrollbar-moderna pb-2">
        {/* trilho com largura do conteúdo */}
        <div className="min-w-max h-full flex items-end gap-3 md:gap-4 pt-10 px-2">
          {data.map((item, idx) => {
            const total = Number(item.total || 0);
            const chave = item?.[indice] ?? "";
            const altura = maximo === 0 ? 0 : (total / maximo) * 100;

            const selecionado = filtroAtivo === chave;
            const apagado = filtroAtivo !== "" && !selecionado;

            return (
              <button
                key={`${String(chave)}-${idx}`}
                type="button"
                onClick={() => onClick(chave)}
                /* Adicionado "items-center" aqui para alinhar tudo no eixo central */
                className="relative flex flex-col items-center justify-end h-full flex-none w-24 md:w-28 group cursor-pointer rounded-t-xl hover:bg-slate-50 transition-all px-1"
                title={String(chave)}
              >
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0B2341] text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap z-50 pointer-events-none transition-opacity shadow-xl">
                  {String(chave)}
                  <span className="block text-[#00AEEF] text-center mt-1">
                    {formatador(total)}
                  </span>
                </div>

                {/* Barra */}
                <div
                  style={{
                    height: `${altura}%`,
                    minHeight: total > 0 ? "6px" : "0",
                  }}
                  className={`w-full rounded-t-md transition-all duration-500 shadow-sm ${
                    apagado ? "bg-slate-200" : "bg-[#00AEEF]"
                  }`}
                />

                {/* Rótulo centralizado - Removido o conflito com Flexbox */}
                <div className="mt-2 w-full px-1 min-h-[32px]">
                  <p className="w-full text-center text-[9px] md:text-[10px] font-black text-slate-500 line-clamp-2 leading-snug">
                    {String(chave)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {data.length > 6 && (
        <div className="mt-2 text-[10px] text-slate-400 font-semibold text-center shrink-0">
          Role para o lado para ver todos →
        </div>
      )}
    </div>
  );
}