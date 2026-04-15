import React from "react";
import { Text, Title } from "@tremor/react";
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
}) {
  return (
    <div className="relative flex shrink-0 flex-col items-start justify-between gap-6 overflow-hidden bg-[#0B2341] p-6 md:flex-row md:items-start md:p-8">
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#00AEEF]/10 blur-3xl" />

      <div className="relative z-10 w-full lg:w-auto">
        <Title className="hc-text-destaque mb-2 text-2xl font-black tracking-tight text-white md:text-3xl">
          {title}
        </Title>
        <Text className="hc-text-destaque text-sm font-medium uppercase tracking-widest text-slate-400">
          {subtitle}
        </Text>
      </div>

      <div className="relative z-10 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:w-auto">
        <button
          type="button"
          onClick={onOpenExplanation}
          className="hc-text-destaque flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl border border-white/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-[#00AEEF] transition-colors hover:border-white/20 hover:text-white focus:outline-none focus-visible:underline"
        >
          {rawDatabaseLabel}
        </button>

        <button
          type="button"
          onClick={onOpenExport}
          className="hc-text-destaque flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-[#0B2341] shadow-lg shadow-sky-900/20 transition-all hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 sm:w-auto"
        >
          <Layers size={16} /> {exportLabel}
        </button>

        <div className="relative w-full sm:w-72">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={termoBusca}
            onChange={(event) => onSearchChange(event.target.value)}
            className="hc-text-destaque w-full rounded-xl border border-white/20 bg-white/10 py-2.5 pl-11 pr-4 text-sm text-white transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
          />
        </div>
      </div>
    </div>
  );
}
