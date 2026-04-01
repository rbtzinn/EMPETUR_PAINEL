import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import LookerEmbed from './LookerEmbed'; 

export default function DashboardSection({ embedUrl }) {
  return (
    <section id="painel" className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <FadeIn className="mb-12 flex flex-col md:flex-row items-baseline justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00AEEF] flex items-center justify-center shadow-inner">
                <LayoutDashboard size={20} strokeWidth={2.5} />
              </div>
              <div className="w-12 h-1.5 bg-[#00AEEF] rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] tracking-tight">Painel Interativo</h2>
          </div>
          <p className="text-slate-500 font-medium text-base md:text-lg md:max-w-md md:text-right leading-relaxed">
            Utilize os filtros nativos do painel abaixo para realizar cruzamentos complexos e gerar relatórios customizados.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/* Container Premium para o Embed */}
          <div className="w-full bg-white p-2 md:p-3 rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-slate-200">
            <div className="w-full bg-slate-50 rounded-[1.5rem] overflow-hidden border border-slate-100 ring-1 ring-black/5">
              <LookerEmbed embedUrl={embedUrl} title="Painel BI da EMPETUR" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}