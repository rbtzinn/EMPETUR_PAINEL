import React from 'react';
import FadeIn from './FadeIn';

export default function GlossarySection() {
  const terms = [
    { t: "Ano", d: "Período fiscal de referência utilizado como base para filtros temporais das consultas." },
    { t: "Evento/Ciclo", d: "Classificação macro da realização artística (ex.: Carnaval, São João, Festival de Inverno)." },
    { t: "Município", d: "Cidade de execução da apresentação, extraído de forma bruta da Observação do Empenho." },
    { t: "Credor/Artista", d: "Pessoa física ou jurídica formalmente contratada e beneficiária do repasse do pagamento." },
    { t: "Valor Pago", d: "Montante financeiro efetivamente liquidado e pago ao credor nos registros contábeis." }
  ];

  return (
    <section id="glossario" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] tracking-tight mb-6">Dicionário de Variáveis</h2>
          <div className="w-20 h-2 bg-[#00AEEF] mx-auto rounded-full"></div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="h-full p-8 bg-[#F8FAFC] border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group">
                <div className="text-xs font-black text-[#00AEEF] uppercase tracking-widest mb-4 opacity-50 group-hover:opacity-100 transition-opacity">Definição</div>
                <h3 className="text-xl font-bold text-[#0B2341] mb-3">{item.t}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}