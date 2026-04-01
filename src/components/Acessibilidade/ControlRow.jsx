import React from "react";
import { Minus, Plus } from "lucide-react";

export default function ControlRow({ label, value, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm hover:border-slate-300 transition-colors">
      <span className="text-xs font-black uppercase tracking-widest text-[#0B2341]">{label}</span>

      <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200">
        <button
          onClick={onDecrease}
          className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition-all hover:bg-slate-200 hover:text-[#0B2341] active:scale-95"
          aria-label={`Diminuir ${label}`}
        >
          <Minus size={16} strokeWidth={3} />
        </button>

        <span className="w-12 text-center text-sm font-black text-[#0B2341]">{value}%</span>

        <button
          onClick={onIncrease}
          className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#00AEEF]/10 text-[#00AEEF] transition-all hover:bg-[#00AEEF] hover:text-white active:scale-95"
          aria-label={`Aumentar ${label}`}
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}