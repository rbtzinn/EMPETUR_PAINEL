import React from "react";
import { X } from "lucide-react";
import FadeIn from "./FadeIn";

export default function GovernancaModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={onClose} />

      <FadeIn className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Premium */}
        <div className="bg-gradient-to-r from-[#0B2341] to-[#123661] p-6 md:p-8 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">Motor de Governança</h2>
            <p className="text-[#00AEEF] text-xs font-bold uppercase tracking-widest">Como garantimos a precisão do painel</p>
          </div>
          <button onClick={onClose} className="relative z-10 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-2.5 rounded-full transition-all backdrop-blur-sm">
            <X strokeWidth={2.5} size={20} />
          </button>
        </div>

        <div className="p-6 md:p-10 overflow-y-auto scrollbar-moderna text-slate-600">
          <p className="text-base md:text-lg leading-relaxed mb-8 text-slate-500">
            Os dados extraídos do sistema governamental (e-Fisco) contêm abreviações e empenhos cancelados. Nosso sistema aplica <strong className="text-[#0B2341]">4 camadas automáticas de saneamento:</strong>
          </p>

          <FadeIn staggerChildren={true} direction="none" className="grid md:grid-cols-2 gap-6">
            {[
              { num: "1", color: "red", title: "Filtro de Valores", desc: "Notas de empenho estornadas, anuladas ou com R$ 0,00 liquidado são bloqueadas automaticamente." },
              { num: "2", color: "orange", title: "Dicionário de Nomes", desc: "Corrigimos divergências de digitação. Abreviações são normalizadas para os nomes oficiais dos municípios e bandas." },
              { num: "3", color: "emerald", title: "Inteligência de Leitura", desc: "Nosso algoritmo lê o texto longo do contrato e extrai cirurgicamente a data real da apresentação e o artista." },
              { num: "4", color: "blue", title: "Trava Anti-Duplicidade", desc: "Gera uma Chave Única (Artista + Cidade + Data + Valor). Duas notas para o mesmo evento contabilizam apenas um show." }
            ].map((item, idx) => (
              <FadeIn key={idx} direction="up" className={`bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:shadow-lg hover:bg-white transition-all duration-300 group`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center text-xl font-black shadow-sm group-hover:scale-110 transition-transform`}>
                    {item.num}
                  </div>
                  <h3 className="font-bold text-[#0B2341] text-lg">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </FadeIn>
            ))}
          </FadeIn>
        </div>

        <div className="bg-white p-6 md:p-8 border-t border-slate-100 shrink-0">
          <button onClick={onClose} className="w-full py-4 rounded-2xl bg-[#0B2341] hover:bg-[#00AEEF] text-white font-black uppercase tracking-widest transition-colors duration-300 shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] hover:shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] active:scale-95">
            Entendi
          </button>
        </div>
      </FadeIn>
    </div>
  );
}