import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function GraficoBarrasNativo({
  data = [],
  indice,
  formatador = (n) => String(n),
  onClick = () => {},
  filtroAtivo = "",
}) {
  const { t } = useLanguage();

  if (!data?.length) {
    return (
      <div className="flex h-full w-full items-center justify-center text-[11px] text-slate-400">
        {t.common.noData}
      </div>
    );
  }

  const maximo = Math.max(...data.map((item) => Number(item.total || 0)), 0);

  return (
    <div
      className="bi-scroll h-full w-full overflow-x-auto overflow-y-hidden"
      role="region"
      aria-label={`Gráfico de barras com volume por ${indice}`}
    >
      {/* Texto acessível oculto */}
      <div className="sr-only">
        {data
          .map((item) => `A categoria ${item[indice]} possui ${formatador(item.total || 0)}.`)
          .join(" ")}
      </div>

      {/* Barras */}
      <div
        className="flex h-full min-w-max items-end justify-center gap-3 px-3 pt-3"
        aria-hidden="true"
      >
        {data.map((item, index) => {
          const total = Number(item.total || 0);
          const chave = item?.[indice] ?? "";
          const alturaPercent = maximo === 0 ? 0 : (total / maximo) * 100;
          const selecionado = filtroAtivo === chave;
          const apagado = filtroAtivo !== "" && !selecionado;

          // Area de barras = altura total minus label area (~28px)
          const labelArea = 28;

          return (
            <button
              key={`${String(chave)}-${index}`}
              type="button"
              onClick={() => onClick(chave)}
              className="group relative flex h-full flex-1 shrink-0 flex-col items-center justify-end rounded-t-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-1"
              style={{ minWidth: 36, maxWidth: 64 }}
            >
              {/* Valor em cima da barra */}
              <span className={`mb-0.5 text-[8px] font-black transition-all ${
                apagado ? "text-slate-300" : selecionado ? "text-[#0B2341]" : "text-[#00AEEF]"
              }`}>
                {total}
              </span>

              {/* Barra */}
              <div
                className="w-full overflow-hidden rounded-t-sm transition-all duration-500"
                style={{ height: `calc(${alturaPercent}% - ${labelArea}px)`, minHeight: total > 0 ? "4px" : "0" }}
              >
                <div
                  className={`h-full w-full rounded-t-sm transition-all duration-300 ${
                    apagado
                      ? "bg-slate-200"
                      : selecionado
                      ? "bg-[#0B2341]"
                      : "bg-[#00AEEF] group-hover:bg-[#0099d6]"
                  }`}
                />
              </div>

              {/* Label abaixo */}
              <div className="mt-1 flex w-full items-start justify-center" style={{ height: labelArea }}>
                <span className={`line-clamp-2 text-center text-[8px] font-bold leading-tight transition-colors ${
                  apagado ? "text-slate-300" : selecionado ? "text-[#0B2341] font-black" : "text-slate-500"
                }`}>
                  {String(chave)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
