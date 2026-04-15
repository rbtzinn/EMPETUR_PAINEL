import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";

export default function MobileDashboardFilterBar({
  onOpen,
  temFiltroAtivo,
  filterLabel,
  backLabel,
}) {
  return (
    <div className="hc-mobile-filterbar fixed inset-x-0 top-0 z-[120] px-4 pb-3 pt-4 lg:hidden">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3">
        <Link
          to="/"
          aria-label={backLabel}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/96 text-[#0B2341] shadow-[0_16px_40px_-26px_rgba(11,35,65,0.28)] backdrop-blur-xl transition-all active:scale-95"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </Link>

        <button
          type="button"
          onClick={onOpen}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B2341] px-4 py-4 text-sm font-bold text-white shadow-[0_16px_40px_-26px_rgba(11,35,65,0.38)] transition-transform active:scale-95"
        >
          <Filter size={18} />
          {filterLabel}
          {temFiltroAtivo && (
            <span className="ml-1 flex h-2.5 w-2.5 rounded-full bg-red-500" />
          )}
        </button>
      </div>
    </div>
  );
}
