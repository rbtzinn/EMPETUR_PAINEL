import React from 'react';
import FadeIn from './FadeIn';

export default function QuickGuide() {
  const steps = [
    { num: "01", title: "Filtre por Ano", desc: "Selecione o exercício financeiro desejado." },
    { num: "02", title: "Escolha o Ciclo", desc: "Carnaval, São João, Festivais." },
    { num: "03", title: "Defina o Local", desc: "Busque rapidamente pelo município." },
    { num: "04", title: "Explore os Dados", desc: "Visualize a Observação do Empenho." },
  ];

  return (
    <section className="bg-white py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className="bg-[#F8FAFC] p-8 border border-slate-200 rounded-sm hover:border-[#00AEEF] transition-colors h-full">
                <div className="text-[#00AEEF] font-black text-3xl mb-4">{step.num}</div>
                <h3 className="text-[#0B2341] font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}