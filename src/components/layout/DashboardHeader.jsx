import React from 'react';

export default function DashboardHeader({ dataUltimaAtualizacao }) {
  return (
    <div className="mb-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-slate-100 pb-8">
      {/* Container de Texto - flex-auto permite ocupar o espaço, min-w-0 previne quebras */}
      <div className="flex-auto min-w-0 max-w-5xl">
        {/* Título com ajuste de tamanho e tracking para evitar quebras */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0B2341] tracking-tight leading-tight mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
          PAINEL DE PAGAMENTOS DE SHOWS E EVENTOS
        </h1>
        <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-3xl">
          Transparência sobre os pagamentos realizados para shows e eventos apoiados pela EMPETUR, 
          em atendimento à <span className="text-slate-700 font-semibold leading-relaxed">Lei Estadual nº 16.790/2019</span>.
        </p>
      </div>

      {/* Container de Info - shrink-0 garante que ele não encolha e cause problemas */}
      <div className="flex flex-wrap items-center gap-y-3 gap-x-1 sm:gap-x-0 bg-slate-50/50 p-1.5 rounded-2xl border border-slate-200/60 shrink-0">
        
        {/* Item: Fonte */}
        <div className="flex items-center gap-2 px-4 py-2">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold leading-none">Fonte</span>
            <span className="text-xs font-bold text-slate-700">e-Fisco PE</span>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-slate-200" />

        {/* Item: Atualização */}
        <div className="flex items-center gap-2 px-4 py-2">
          <svg className="w-4 h-4 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold leading-none">Frequência</span>
            <span className="text-xs font-bold text-slate-700">Mensal</span>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-slate-200" />

        {/* Item: Data */}
        <div className="flex items-center gap-2 px-4 py-2">
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold leading-none">Última Atualização</span>
            <span className="text-xs font-bold text-slate-700">{dataUltimaAtualizacao}</span>
          </div>
        </div>
      </div>
    </div>
  );
}