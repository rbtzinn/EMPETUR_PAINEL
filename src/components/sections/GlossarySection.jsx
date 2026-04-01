import React, { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import DownloadDictionaryModal from '../ui/DownloadDictionaryModal';

export default function GlossarySection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const terms = [
    { t: "Ano Cultural", d: "Refere-se ao exercício financeiro em que as festividades ocorreram, permitindo analisar como o fomento à cultura se comporta ano a ano." },
    { t: "Ciclo Cultural", d: "Os grandes momentos de celebração do nosso estado, como o Carnaval, São João e Pernambuco Meu País, eventos massivamente apoiados pela EMPETUR." },
    { t: "Município Atendido", d: "A cidade ou localidade pernambucana oficial que sediou a apresentação artística e recebeu o fluxo turístico da festa." },
    { t: "Artista ou Grupo", d: "A pessoa física ou jurídica (banda, cantor, grupo cultural) contratada via inexigibilidade ou edital para realizar a apresentação artística." },
    { t: "Fomento (Valor Líquido)", d: "O investimento financeiro público efetivamente liquidado e pago para viabilizar a apresentação cultural." },
    { t: "Data Limite de Pagamento", d: "Conforme regras de contratação pública (Leis 8.666/93 e 14.133/21), o prazo legal limite estipulado em até 30 dias corridos após a efetiva liquidação do serviço prestado." }
  ];

  return (
    <section id="glossario" className="py-24 bg-white relative" aria-label="Glossário e Dicionário de Dados">
      <DownloadDictionaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="text-center mb-16 md:mb-20">
          <div className="w-12 h-1.5 bg-[#00AEEF] mx-auto mb-6 rounded-full" />
          <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] tracking-tight mb-4">Entenda o Painel</h2>
          <p className="text-slate-500 text-lg font-light">Um guia rápido e oficial dos termos contábeis e culturais.</p>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {terms.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`border rounded-[1.5rem] overflow-hidden transition-all duration-300 ${isOpen ? 'bg-slate-50 border-slate-200 shadow-lg shadow-slate-200/50' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : i)} 
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20"
                  >
                    <h3 className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-[#00AEEF]' : 'text-[#0B2341]'}`}>{item.t}</h3>
                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#00AEEF] text-white rotate-180 shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                      <ChevronDown strokeWidth={2.5} size={20} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="px-6 md:px-8 pb-8 text-slate-500 text-sm md:text-base leading-relaxed">{item.d}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.5} className="mt-16 md:mt-24">
          <div className="bg-[#0B2341] rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00AEEF]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-xl text-center lg:text-left">
              <h3 className="text-white font-black text-2xl md:text-3xl mb-3 tracking-tight">Dicionário de Dados</h3>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                Desenvolvemos um documento técnico detalhado para auditores e desenvolvedores que desejam cruzar a <strong className="text-white">Base Bruta</strong>. Entenda as tipologias, chaves e origens do e-Fisco PE.
              </p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)} 
              className="relative z-10 shrink-0 w-full lg:w-auto px-8 py-4 bg-[#00AEEF] hover:bg-white text-white hover:text-[#0B2341] rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
            >
              <FileText strokeWidth={2.5} size={18} />
              Baixar PDF Oficial
            </button>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}