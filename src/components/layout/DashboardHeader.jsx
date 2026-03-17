import React from 'react';
import { Text } from "@tremor/react";

export default function DashboardHeader({ dataUltimaAtualizacao }) {
  return (
    <div className="mb-8 flex flex-col xl:flex-row xl:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-[#0B2341] tracking-tight mb-2 mt-4">
          Painel de Dados Culturais
        </h1>
        <Text className="text-slate-500 font-medium">
          Monitoramento oficial das contratações artísticas, feitas pela EMPETUR, do Governo de Pernambuco.
        </Text>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fonte: e-Fisco PE</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
          <svg className="w-4 h-4 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Atualização: Mensal</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Última: {dataUltimaAtualizacao}</span>
        </div>
      </div>
    </div>
  );
}