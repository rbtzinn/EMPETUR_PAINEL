import React from 'react';
import FadeIn from '../components/FadeIn';
import LookerEmbed from './LookerEmbed';

export default function DashboardSection({ embedUrl }) {
  return (
    <section id="painel" className="py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn>
          <div className="mb-10 flex flex-col md:flex-row items-baseline justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B2341] tracking-tight">Painel Interativo</h2>
              <div className="w-16 h-1.5 bg-[#00AEEF] mt-4"></div>
            </div>
            <p className="text-slate-600 font-medium mt-6 md:mt-0 md:max-w-md md:text-right">
              Utilize os filtros abaixo para refinar os resultados e explorar tabelas de contratação.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {/* Container Cinza Sólido */}
          <div className="w-full bg-[#E2E8F0] p-3 rounded-sm">
            <LookerEmbed embedUrl={embedUrl} title="Painel da EMPETUR" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}