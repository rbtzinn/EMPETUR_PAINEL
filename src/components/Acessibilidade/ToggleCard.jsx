import React from "react";

export default function ToggleCard({ ativo, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center rounded-2xl p-5 transition-all duration-300 active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/30 ${
        ativo
          ? "border-2 border-[#00AEEF] bg-blue-50 text-[#00AEEF] shadow-md shadow-blue-100"
          : "border-2 border-slate-100 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {/* Indicador visual de ativo (bolinha no canto) */}
      {ativo && (
        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AEEF] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00AEEF]"></span>
        </span>
      )}

      <div className={`mb-3 transition-transform duration-300 ${ativo ? "scale-110" : "scale-100"}`}>
        {icon}
      </div>
      <span className={`text-[11px] font-black uppercase tracking-wider text-center ${ativo ? "text-[#0B2341]" : ""}`}>
        {label}
      </span>
    </button>
  );
}