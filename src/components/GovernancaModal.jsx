import React from "react";
import FadeIn from "./FadeIn";

export default function GovernancaModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
      {/* Fundo escuro com blur */}
      <div 
        className="absolute inset-0 bg-[#0B2341]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Caixa do Modal */}
      <FadeIn className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho Fixo do Modal */}
        <div className="bg-[#0B2341] p-6 md:p-8 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
              Motor de Governança de Dados
            </h2>
            <p className="text-[#00AEEF] text-xs font-bold uppercase tracking-widest">
              Como garantimos a precisão do painel
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Corpo Rolável do Modal */}
        <div className="p-6 md:p-8 overflow-y-auto scrollbar-moderna text-slate-600 space-y-8">
          
          <p className="text-sm md:text-base leading-relaxed">
            Os dados brutos extraídos do sistema governamental (e-Fisco) muitas vezes contêm abreviações, empenhos cancelados ou erros de digitação. Para exibir um painel limpo e confiável, nosso sistema aplica <strong>4 camadas automáticas de saneamento:</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Regra 1 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg font-black">1</div>
                <h3 className="font-bold text-[#0B2341]">Filtro de Valores Zerados</h3>
              </div>
              <p className="text-xs leading-relaxed">
                Notas de empenho que foram estornadas, anuladas ou que possuem <strong>R$ 0,00</strong> de valor liquidado são bloqueadas automaticamente antes de entrarem na contagem do painel.
              </p>
            </div>

            {/* Regra 2 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg font-black">2</div>
                <h3 className="font-bold text-[#0B2341]">Dicionário de Nomes</h3>
              </div>
              <p className="text-xs leading-relaxed">
                Corrigimos divergências de digitação humana. Abreviações como <em>"Belém de São Fco"</em> ou erros como <em>"Cumbuca"</em> são normalizados para os nomes oficiais dos municípios. O mesmo vale para os nomes das bandas.
              </p>
            </div>

            {/* Regra 3 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg font-black">3</div>
                <h3 className="font-bold text-[#0B2341]">Inteligência de Leitura</h3>
              </div>
              <p className="text-xs leading-relaxed">
                Como não existe uma coluna separada para "Data do Show" ou "Nome da Banda" na base bruta, nosso algoritmo lê o texto longo do contrato e <strong>extrai cirurgicamente</strong> a data real da apresentação e o nome do artista.
              </p>
            </div>

            {/* Regra 4 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-black">4</div>
                <h3 className="font-bold text-[#0B2341]">Trava Anti-Duplicidade</h3>
              </div>
              <p className="text-xs leading-relaxed">
                Para evitar inflar os números de shows, o sistema gera uma <strong>Chave de Identidade Única</strong> (Artista + Cidade + Data + Valor). Se o governo emitir duas notas para o mesmo evento, o painel contabiliza apenas uma apresentação.
              </p>
            </div>
          </div>

        </div>

        {/* Rodapé do Modal */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-[#00AEEF] hover:bg-[#0B2341] text-white font-black uppercase tracking-widest transition-colors shadow-lg"
          >
            Entendi
          </button>
        </div>
      </FadeIn>
    </div>
  );
}