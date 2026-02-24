import React from 'react';
import FadeIn from './FadeIn';

export default function InternalControlSection() {
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Análise e Validação",
      desc: "Nossa equipe revisa cada detalhe das contratações para garantir que tudo ocorra dentro das normas, dando segurança jurídica aos eventos."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Garantia ao Artista",
      desc: "Atuamos para que o fomento financeiro chegue de forma ágil e correta a quem realmente faz a nossa cultura brilhar nos palcos."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      title: "Responsabilidade Pública",
      desc: "Cuidamos dos recursos do estado com eficiência, permitindo que as festividades de Pernambuco cresçam e se destaquem a cada ano."
    }
  ];

  return (
    <section id="gestao" className="py-24 bg-[#0B2341] text-white relative overflow-hidden">
      {/* Detalhe de fundo */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#00AEEF] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* LOGO DO CONTROLE INTERNO EM DESTAQUE */}
        <FadeIn className="mb-12">
          <div className="bg-white/10 p-6 rounded-[2.5rem] backdrop-blur-md border border-white/10 shadow-2xl">
            <img 
              src="images/controleinternologo.png" 
              alt="Logo Controle Interno" 
              className="h-30 md:h-32 object-contain filter brightness-0 invert" 
              /* filter brightness-0 invert torna a logo branca para combinar com o fundo escuro */
            />
          </div>
        </FadeIn>

        <FadeIn className="text-center mb-16">
          <h2 className="text-[#00AEEF] font-bold tracking-widest uppercase text-xs mb-3">Gestão Institucional</h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Excelência nos Bastidores</h3>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Para que a cultura aconteça nos palcos, nossa equipe de <span className="text-white font-bold">Controle Interno</span> garante a conformidade e a agilidade em cada etapa do processo.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 w-full">
          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={idx * 0.2}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full flex flex-col items-start backdrop-blur-sm group">
                <div className="w-14 h-14 rounded-2xl bg-[#00AEEF] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#00AEEF]/20 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}