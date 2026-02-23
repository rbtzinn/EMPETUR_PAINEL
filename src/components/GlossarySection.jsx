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
    <section id="glossario" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#0B2341] tracking-tight mb-4">Dicionário de Variáveis</h2>
          <div className="w-16 h-1.5 bg-[#00AEEF]"></div>
        </FadeIn>

        <div className="bg-white border border-slate-200 rounded-sm">
          {terms.map((item, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="flex flex-col md:flex-row md:items-start p-6 border-b border-slate-200 last:border-b-0">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <span className="text-lg font-bold text-[#0B2341]">{item.t}</span>
                </div>
                <div className="md:w-2/3">
                  <p className="text-slate-600">{item.d}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
