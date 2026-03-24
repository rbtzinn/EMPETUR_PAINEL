import React, { useState } from 'react';
import FadeIn from '../ui/FadeIn';
import DownloadDictionaryModal from '../ui/DownloadDictionaryModal';

export default function GlossarySection() {
  const [openIndex, setOpenIndex] = useState(null);
  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const terms = [
    { t: "Ano Cultural", d: "Refere-se ao exercício em que as festividades ocorreram, permitindo comparar como a cultura se expande ano a ano." },
    { t: "Ciclo Cultural", d: "Os grandes momentos de celebração do nosso estado, como o Carnaval, São João, Pernambuco meu País, entre outros eventos apoiados pela EMPETUR." },
    { t: "Município Atendido", d: "A cidade pernambucana que recebeu a apresentação artística e a festa." },
    { t: "Artista ou Grupo", d: "A estrela do show. A banda, cantor ou grupo cultural que foi contratado para realizar a apresentação." },
    { t: "Fomento (Valor)", d: "O investimento financeiro realizado para viabilizar a apresentação e fortalecer a cultura local." },
    { t: "Data Limite de Pagamento", d: "Conforme as regras de contratação pública (Lei nº 8.666/1993 e Lei nº 14.133/2021) aplicadas pela EMPETUR, o prazo ou data limite para o pagamento dos fomentos artísticos é estipulado em até 30 dias corridos após a efetivação do contrato e a devida liquidação do serviço prestado." }
  ];

  return (
    <section id="glossario" className="py-24 bg-white relative" aria-label="Glossário e Dicionário de Dados">
      
      {/* 🔴 O NOVO MODAL ESTÁ AQUI, COMPACTO E ELEGANTE */}
      <DownloadDictionaryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] tracking-tight mb-6">Entenda o Painel</h2>
          <p className="text-slate-500 mb-6">Um guia rápido sobre como organizamos os dados culturais.</p>
          <div className="w-20 h-2 bg-[#00AEEF] mx-auto rounded-full"></div>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {terms.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-slate-50 shadow-xl shadow-blue-900/5 hc-card' : 'bg-white hover:bg-slate-50 hc-card'}`}>
                  <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]">
                    <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#00AEEF]' : 'text-[#0B2341]'}`}>{item.t}</h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#00AEEF] text-white rotate-180' : 'bg-slate-100 text-[#0B2341] hc-icon-wrapper'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">{item.d}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.5} className="mt-16">
          <div className="bg-[#0B2341] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hc-card relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00AEEF]/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-lg text-center md:text-left">
              <h3 className="text-white font-black text-2xl mb-2">Dicionário de Dados</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Para auditores, programadores ou cidadãos que descarregarem a Base Bruta: disponibilizamos um documento técnico a explicar as tipologias, formatações e origens de cada coluna do sistema e-Fisco.
              </p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)} 
              className="hc-botao-destaque relative z-10 whitespace-nowrap px-8 py-4 bg-[#00AEEF] hover:bg-white text-white hover:text-[#0B2341] rounded-xl font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-95 flex items-center gap-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/50"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descarregar PDF
            </button>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}