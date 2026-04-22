import React from "react";
import InfoTooltip from "../../ui/InfoTooltip";

/**
 * DashboardChartCard — container limpo para gráficos no layout BI.
 * Não usa Tremor Card para evitar ring/border artifacts.
 */
export default function DashboardChartCard({ title, tooltip, children, compact = false }) {
  return (
    <div
      className="hc-bi-chartcard relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-white"
      style={{ boxShadow: "0 1px 4px rgba(11,35,65,0.08), 0 0 0 1px rgba(226,232,240,0.5)" }}
    >
      <style>{`
        body.contraste-negativo .hc-bi-chartcard {
          background-color: #000 !important;
          border: 1px solid #ffea00 !important;
          box-shadow: none !important;
        }
        body.contraste-negativo .hc-bi-chartcard-title {
          color: #ffea00 !important;
        }
      `}</style>

      {/* Header compacto */}
      <div className={`flex shrink-0 items-center justify-between border-b border-slate-100 ${compact ? 'px-3 py-2' : 'px-4 py-2.5'}`}>
        <span className={`hc-bi-chartcard-title font-black uppercase tracking-widest text-[#0B2341] ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
          {title}
        </span>
        <InfoTooltip text={tooltip} />
      </div>

      {/* Conteúdo */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
