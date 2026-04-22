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
    <>
      <style>{`
        body.contraste-negativo .hc-mobile-filterbar {
          background: transparent !important;
        }
        body.contraste-negativo .hc-mobile-back-btn {
          background: #000 !important;
          border: 2px solid #ffea00 !important;
          color: #ffea00 !important;
          box-shadow: none !important;
        }
        body.contraste-negativo .hc-mobile-filter-btn {
          background: #000 !important;
          border: 2px solid #ffea00 !important;
          color: #ffea00 !important;
          box-shadow: none !important;
        }
        body.contraste-negativo .hc-mobile-filter-dot {
          background: #ffea00 !important;
        }
      `}</style>

      <div className="hc-mobile-filterbar fixed inset-x-0 top-0 z-[120] px-4 pb-3 pt-4 lg:hidden">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3">
          <Link
            to="/"
            aria-label={backLabel}
            title={backLabel}
            className="hc-mobile-back-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/96 text-[#0B2341] shadow-[0_16px_40px_-26px_rgba(11,35,65,0.28)] backdrop-blur-xl transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/40 active:scale-95"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </Link>

          <button
            type="button"
            onClick={onOpen}
            aria-label={filterLabel}
            className="hc-mobile-filter-btn flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B2341] px-4 py-4 text-sm font-bold text-white shadow-[0_16px_40px_-26px_rgba(11,35,65,0.38)] transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/40 active:scale-95"
          >
            <Filter size={18} aria-hidden="true" />
            <span>{filterLabel}</span>
            {temFiltroAtivo && (
              <span
                className="hc-mobile-filter-dot ml-1 flex h-2.5 w-2.5 rounded-full bg-red-500"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
