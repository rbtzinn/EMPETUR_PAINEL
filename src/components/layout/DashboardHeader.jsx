import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function DashboardHeader({ dataUltimaAtualizacao }) {
  const { t } = useLanguage();

  return (
    <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_24px_60px_-48px_rgba(11,35,65,0.28)] md:px-7 md:py-7 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="max-w-4xl min-w-0 flex-auto">
          <h1 className="mb-4 text-2xl font-black leading-tight tracking-tight text-[#0B2341] md:text-3xl lg:text-4xl">
          {t.dashboard.header.title}
          </h1>
          <p className="max-w-3xl text-sm font-medium leading-7 text-slate-500 md:text-base">
          {t.dashboard.header.description}
          </p>
        </div>

        <div className="grid shrink-0 gap-3 sm:grid-cols-3 lg:min-w-[430px]">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            <div className="flex min-w-0 flex-col">
              <span className="text-[10px] font-bold uppercase leading-none text-slate-400">
                {t.dashboard.header.source}
              </span>
              <span className="truncate pt-1 text-xs font-bold text-slate-700">e-Fisco PE</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <svg className="h-4 w-4 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex min-w-0 flex-col">
              <span className="text-[10px] font-bold uppercase leading-none text-slate-400">
                {t.dashboard.header.frequency}
              </span>
              <span className="truncate pt-1 text-xs font-bold text-slate-700">
                {t.dashboard.header.monthly}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <svg className="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex min-w-0 flex-col">
              <span className="text-[10px] font-bold uppercase leading-none text-slate-400">
                {t.dashboard.header.lastUpdate}
              </span>
              <span className="truncate pt-1 text-xs font-bold text-slate-700">
                {dataUltimaAtualizacao}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
