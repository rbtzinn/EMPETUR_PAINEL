import React from "react";
import { Layers, Search } from "lucide-react";

export default function HistoricoTableToolbar({
  title,
  subtitle,
  rawDatabaseLabel,
  exportLabel,
  searchPlaceholder,
  termoBusca,
  onSearchChange,
  onOpenExplanation,
  onOpenExport,
  comfortable = false,
}) {
  return (
    <div className="relative flex shrink-0 flex-col items-stretch justify-between gap-3 overflow-hidden bg-[#0B2341] px-4 py-4 md:flex-row md:flex-nowrap md:items-center md:gap-2 md:py-3">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#00AEEF]/10 blur-3xl" />

      <div className="relative z-10 min-w-0">
        <span className={`hc-text-destaque block font-black uppercase tracking-[0.14em] text-white md:truncate md:tracking-widest ${
          comfortable ? "text-base md:text-sm" : "text-sm md:text-xs"
        }`}>
          {title}
        </span>
        <span className={`hc-text-destaque block font-medium uppercase tracking-[0.12em] text-slate-300 md:truncate md:tracking-widest ${
          comfortable ? "text-xs md:text-[11px]" : "text-[10px] md:text-[9px]"
        }`}>
          {subtitle}
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-2 md:flex-row md:items-center">
        <div className="grid grid-cols-2 gap-2 md:flex md:items-center">
          <button
            type="button"
            onClick={onOpenExplanation}
            className={`hc-text-destaque flex min-h-10 min-w-0 flex-1 items-center justify-center rounded-xl border border-white/10 px-3 text-center font-black uppercase leading-tight tracking-[0.14em] text-[#00AEEF] transition-colors hover:border-white/20 hover:text-white focus:outline-none focus-visible:underline md:h-8 md:min-h-0 md:flex-none md:rounded-lg md:whitespace-nowrap ${
              comfortable ? "text-xs md:text-[10px]" : "text-[10px] md:text-[9px]"
            }`}
          >
            {rawDatabaseLabel}
          </button>

          <button
            type="button"
            onClick={onOpenExport}
            className={`hc-text-destaque flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#00AEEF] px-3 text-center font-black uppercase leading-tight tracking-[0.14em] text-[#0B2341] shadow-lg shadow-sky-900/20 transition-all hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 md:h-8 md:min-h-0 md:flex-none md:rounded-lg md:whitespace-nowrap ${
              comfortable ? "text-xs md:text-[10px]" : "text-[10px] md:text-[9px]"
            }`}
          >
            <Layers size={12} className="shrink-0" /> <span>{exportLabel}</span>
          </button>
        </div>

        <div className="relative w-full md:w-auto">
          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={termoBusca}
            onChange={(event) => onSearchChange(event.target.value)}
            className={`hc-text-destaque h-10 w-full rounded-xl border border-white/20 bg-white/10 pl-8 pr-3 text-white transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] md:h-8 md:w-60 md:rounded-lg md:pl-7 ${
              comfortable ? "text-sm md:text-xs" : "text-[12px] md:text-[10px]"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
