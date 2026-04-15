import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, RefreshCw } from "lucide-react";
import PainelFilterFields from "../../layout/painel/PainelFilterFields";

export default function PanelFiltersCard({
  fields,
  filtros,
  setFiltros,
  getOpcoes,
  onClear,
  lookerShareUrl,
  clearLabel,
  advancedPanelLabel,
}) {
  return (
    <div className="hc-tabela-card rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-48px_rgba(11,35,65,0.35)]">
      <PainelFilterFields
        fields={fields}
        filtros={filtros}
        setFiltros={setFiltros}
        getOpcoes={getOpcoes}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onClear}
          className="hc-text-destaque inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#0B2341] transition-all hover:bg-slate-200 active:scale-95"
        >
          <RefreshCw strokeWidth={2.5} size={16} /> {clearLabel}
        </button>

        <Link
          to={lookerShareUrl}
          className="hc-botao-destaque inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0B2341] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#00AEEF] active:scale-95"
        >
          {advancedPanelLabel}
          <ExternalLink strokeWidth={2.5} size={18} />
        </Link>
      </div>
    </div>
  );
}
