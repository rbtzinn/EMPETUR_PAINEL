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
      <div className="flex h-full w-full items-center justify-center text-slate-400">
        {t.common.noData}
      </div>
    );
  }

  const maximo = Math.max(...data.map((item) => Number(item.total || 0)), 0);

  return (
    <div
      className="scrollbar-moderna h-full w-full overflow-x-auto overflow-y-hidden pb-2"
      role="region"
      aria-label={`Gráfico de barras com volume por ${indice}`}
    >
      <div className="sr-only">
        {data
          .map((item) => `A categoria ${item[indice]} possui ${formatador(item.total || 0)}.`)
          .join(" ")}
      </div>

      <div className="flex h-full min-w-max items-end justify-start gap-4 px-4 pt-10 md:justify-center md:gap-8" aria-hidden="true">
        {data.map((item, index) => {
          const total = Number(item.total || 0);
          const chave = item?.[indice] ?? "";
          const altura = maximo === 0 ? 0 : (total / maximo) * 100;
          const selecionado = filtroAtivo === chave;
          const apagado = filtroAtivo !== "" && !selecionado;

          return (
            <button
              key={`${String(chave)}-${index}`}
              type="button"
              onClick={() => onClick(chave)}
              className="group relative flex h-full w-20 shrink-0 flex-col items-center justify-end rounded-t-md focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 md:w-28"
            >
              <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0B2341] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                {String(chave)}
                <span className="mt-1 block text-center text-[#00AEEF]">
                  {formatador(total)}
                </span>
              </div>

              <div
                style={{ height: `${altura}%`, minHeight: total > 0 ? "8px" : "0" }}
                className={`w-full rounded-t-md shadow-sm transition-all duration-500 ${
                  apagado ? "bg-slate-200" : "bg-[#00AEEF]"
                }`}
              />

              <div className="mt-3 flex min-h-[36px] w-full items-start justify-center">
                <span className="line-clamp-2 text-center text-[10px] font-black leading-tight text-slate-500 md:text-[11px]">
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
