import React, { useState } from 'react';
import FadeIn from './FadeIn';

export default function GlossarySection() {
  // Estado para controlar qual aba está aberta (null = nenhuma)
  const [openIndex, setOpenIndex] = useState(null);

  // Termos ajustados para uma linguagem mais cultural e menos técnica
  const terms = [
    { t: "Ano Cultural", d: "Refere-se ao ano em que as festividades ocorreram, permitindo comparar como a cultura se expande ano a ano." },
    { t: "Ciclo Cultural", d: "Os grandes momentos de celebração do nosso estado, como o Carnaval, São João e Festival de Inverno." },
    { t: "Município Atendido", d: "A cidade pernambucana que recebeu a apresentação artística e a festa." },
    { t: "Artista ou Grupo", d: "A estrela do show. A banda, cantor ou grupo cultural que foi contratado para realizar a apresentação." },
    { t: "Fomento (Valor)", d: "O investimento financeiro realizado para viabilizar a apresentação e fortalecer a cultura local." }
  ];

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="glossario" className="py-24 bg-white">
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
                <div 
                  className={`border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[#F8FAFC] shadow-xl shadow-blue-900/5' : 'bg-white hover:bg-slate-50'}`}
                >
                  <button 
                    onClick={() => toggleItem(i)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                  >
                    <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#00AEEF]' : 'text-[#0B2341]'}`}>
                      {item.t}
                    </h3>
                    
                    {/* Ícone de Seta animado */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#00AEEF] text-white rotate-180' : 'bg-slate-100 text-[#0B2341]'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Conteúdo da Sanfona */}
                  <div 
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}