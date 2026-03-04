import React from "react";

export default function GraficoBarrasNativo({
  data = [],
  indice,
  formatador = (n) => String(n),
  onClick = () => {},
  filtroAtivo = "",
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-400">
        Sem dados
      </div>
    );
  }

  const maximo = Math.max(...data.map((d) => Number(d.total || 0)), 0);

  return (
    // Essa é a única caixa agora! O justify-center aqui não tem como falhar.
    <div className="h-full w-full flex items-end justify-center gap-4 md:gap-8 pb-2 pt-10">
      
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
            // w-20 a w-28 garante que as barras tenham a mesma grossura
            className="relative flex flex-col items-center justify-end h-full w-20 md:w-28 shrink-0 group cursor-pointer"
            title={String(chave)}
          >
            {/* Tooltip Flutuante */}
            <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0B2341] text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap z-50 pointer-events-none transition-opacity shadow-xl">
              {String(chave)}
              <span className="block text-[#00AEEF] text-center mt-1">
                {formatador(total)}
              </span>
            </div>

            {/* A Barra Azul */}
            <div
              style={{
                height: `${altura}%`,
                minHeight: total > 0 ? "8px" : "0",
              }}
              className={`w-full rounded-t-md transition-all duration-500 shadow-sm ${
                apagado ? "bg-slate-200" : "bg-[#00AEEF]"
              }`}
            />

            {/* Texto debaixo da barra */}
            <div className="mt-3 w-full flex items-start justify-center min-h-[36px]">
              <span className="text-center text-[10px] md:text-[11px] font-black text-slate-500 leading-tight line-clamp-2">
                {String(chave)}
              </span>
            </div>
          </button>
        );
      })}

    </div>
  );
}