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
      <FadeIn className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho Fixo do Modal */}
        <div className="bg-[#0B2341] p-6 md:p-8 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
              Política de Privacidade
            </h2>
            <p className="text-[#00AEEF] text-xs font-bold uppercase tracking-widest">
              Empresa de Turismo de Pernambuco S.A.
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

        {/* Corpo Rolável do Modal com o Texto Oficial */}
        <div className="p-6 md:p-8 overflow-y-auto scrollbar-moderna text-slate-600 space-y-8">
          
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <p className="text-sm leading-relaxed text-[#0B2341]">
              A <strong>Empresa de Turismo de Pernambuco Governador Eduardo Campos S.A. (EMPETUR)</strong> está comprometida com a segurança dos seus dados pessoais, com o respeito à sua privacidade e com a transparência em nossas operações. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações quando você acessa nosso site.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Coluna Esquerda */}
            <div className="space-y-8">
              <section>
                <h3 className="font-black text-[#0B2341] text-lg mb-3 flex items-center gap-2">
                  <span className="text-[#00AEEF]">#</span> Quem Somos
                </h3>
                <p className="text-sm leading-relaxed">
                  A EMPETUR é uma sociedade de economia mista, vinculada à Secretaria de Turismo, Esportes e Lazer de Pernambuco, que fomenta programas e projetos visando a consolidação de Pernambuco como destino turístico de destaque no país. 
                  <br/><br/>
                  Nossa sede está localizada na <strong>Avenida Professor Andrade Bezerra, S/N, Salgadinho, Olinda/PE</strong>. Atuamos como controladores dos seus dados pessoais, responsáveis por decidir como eles serão tratados e protegidos.
                </p>
              </section>

              <section>
                <h3 className="font-black text-[#0B2341] text-lg mb-3 flex items-center gap-2">
                  <span className="text-[#00AEEF]">#</span> Legislação Aplicável
                </h3>
                <ul className="text-sm leading-relaxed space-y-2 list-disc pl-5">
                  <li><strong>Lei nº 13.709/2018:</strong> LGPD</li>
                  <li><strong>Lei nº 12.965/2014:</strong> Marco Civil da Internet</li>
                  <li><strong>Lei nº 12.527/2011:</strong> Lei de Acesso à Informação</li>
                  <li><strong>Lei Estadual nº 14.804/2012:</strong> LAI de Pernambuco</li>
                  <li><strong>Decreto Estadual nº 38.787/2012:</strong> Regulamenta a LAI-PE</li>
                  <li><strong>Decreto Estadual nº 49.265/2020:</strong> Política de Proteção de Dados</li>
                  <li><strong>Decreto Estadual nº 49.914/2020:</strong> Segurança da Informação</li>
                </ul>
              </section>

              <section>
                <h3 className="font-black text-[#0B2341] text-lg mb-3 flex items-center gap-2">
                  <span className="text-[#00AEEF]">#</span> Publicação de Dados (Painel)
                </h3>
                <p className="text-sm leading-relaxed">
                  Neste painel específico de transparência, a divulgação de dados financeiros (como nomes de credores e valores pagos) ocorre para o cumprimento de obrigação legal e execução de políticas públicas, conforme o Art. 7º da LGPD combinado com a Lei de Acesso à Informação, visando o controle social.
                </p>
              </section>
            </div>

            {/* Coluna Direita */}
            <div className="space-y-8">
              <section>
                <h3 className="font-black text-[#0B2341] text-lg mb-3 flex items-center gap-2">
                  <span className="text-[#00AEEF]">#</span> Dados e Cookies
                </h3>
                <p className="text-sm leading-relaxed">
                  Podemos coletar dados de navegação (IP, dispositivo, visualizações) e utilizamos cookies para melhorar a experiência do usuário, analisar o tráfego do site e personalizar conteúdo. O compartilhamento de informações, quando ocorre, obedece rigorosamente às exigências legais ou a solicitações de autoridades governamentais.
                </p>
              </section>

              <section>
                <h3 className="font-black text-[#0B2341] text-lg mb-3 flex items-center gap-2">
                  <span className="text-[#00AEEF]">#</span> Seus Direitos
                </h3>
                <ul className="text-sm leading-relaxed space-y-2 list-disc pl-5">
                  <li>Confirmar a existência de tratamento.</li>
                  <li>Acessar e corrigir dados incompletos ou inexatos.</li>
                  <li>Solicitar anonimização, bloqueio ou eliminação de dados excessivos.</li>
                  <li>Obter informações sobre compartilhamento.</li>
                  <li>Revogar o consentimento.</li>
                </ul>
              </section>

              <section className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h3 className="font-black text-[#0B2341] text-base mb-3">Contato do Encarregado (DPO)</h3>
                <p className="text-sm leading-relaxed text-slate-600 mb-1">
                  <strong>Nome:</strong> Victor Hugo Feitosa Lima Aragão
                </p>
                <p className="text-sm leading-relaxed text-slate-600 mb-1">
                  <strong>Telefone:</strong> (81) 3182-8210
                </p>
                <p className="text-sm leading-relaxed text-slate-600">
                  <strong>E-mail:</strong> victor.aragao@empetur.pe.gov.br
                </p>
              </section>
            </div>
          </div>

        </div>

        {/* Rodapé do Modal */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 shrink-0 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Versão: 10 de abril de 2025
          </span>
          <button 
            onClick={onClose}
            className="w-full md:w-auto px-10 py-3 rounded-xl bg-[#00AEEF] hover:bg-[#0B2341] text-white font-black uppercase tracking-widest transition-colors shadow-lg"
          >
            Estou Ciente
          </button>
        </div>
      </FadeIn>
    </div>
  );
}