import React from "react";
import FadeIn from "./FadeIn";

export default function PrivacidadeModal({ isOpen, onClose }) {
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
              Política de Privacidade
            </h2>
            <p className="text-[#00AEEF] text-xs font-bold uppercase tracking-widest">
              Conformidade com a LGPD e a LAI
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
        <div className="p-6 md:p-8 overflow-y-auto scrollbar-moderna text-slate-600 space-y-6">
          
          <p className="text-sm leading-relaxed">
            A Empresa de Turismo de Pernambuco (EMPETUR) reafirma seu compromisso com a transparência pública e a proteção de dados pessoais, em estrita observância à <strong>Lei Geral de Proteção de Dados (LGPD - Lei Federal nº 13.709/2018)</strong> e à <strong>Lei de Acesso à Informação (LAI - Lei Federal nº 12.527/2011)</strong>.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[#0B2341] text-lg mb-2">1. Coleta de Dados de Usuários</h3>
              <p className="text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                Este portal possui caráter estritamente informativo e consultivo. <strong>Não realizamos a coleta, armazenamento ou tratamento de dados pessoais</strong> (como nome, e-mail, CPF, localização ou cookies de rastreamento de perfil) dos cidadãos que navegam nesta página. A navegação é anônima e livre de cadastros.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#0B2341] text-lg mb-2">2. Dados Publicados no Painel (Artistas e Credores)</h3>
              <p className="text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                As informações financeiras e contratuais apresentadas neste dashboard (como nomes de credores, representantes legais ou artistas e os respectivos valores pagos) são de natureza estritamente pública. 
                <br/><br/>
                A divulgação desses dados ocorre para o cumprimento de obrigação legal ou regulatória pelo controlador e para a execução de políticas públicas previstas em leis (Art. 7º, incisos II e III da LGPD), visando o controle social do gasto público.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#0B2341] text-lg mb-2">3. Fonte da Informação</h3>
              <p className="text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                Todos os dados exibidos são provenientes das bases abertas e estruturadas do <strong>e-Fisco (Sistema Integrado de Administração Financeira para Estados e Municípios)</strong> do Governo do Estado de Pernambuco, sendo este painel um facilitador visual para a compreensão cidadã dessas contratações.
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
            Estou ciente
          </button>
        </div>
      </FadeIn>
    </div>
  );
}