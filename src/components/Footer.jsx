import React from 'react';

export default function Footer() {
  const equipe = [
    { nome: "Karla Taciana Sabino de Paula Sales", cargo: "Titular" },
    { nome: "Monique de Oliveira Ferraz Torres", cargo: "Adjunta" },
    { nome: "Renan Ádson Rodrigues dos Santos", cargo: "Membro" },
    { nome: "Roberto Gabriel Araújo Miranda", cargo: "Membro & Desenvolvedor" }
  ];

  return (
    <footer className="bg-[#0B2341] py-20 px-6 relative overflow-hidden">
      {/* Linha de destaque superior */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00AEEF] via-[#0B2341] to-[#00AEEF]" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="lg:col-span-2">
          <div className="text-white font-black text-3xl tracking-tighter mb-4">EMPETUR</div>
          <div className="inline-block px-3 py-1 bg-white/5 rounded-md text-[#00AEEF] font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
            Controle Interno • Governo de PE
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed font-light">
            Painel Oficial de Contratações Artísticas. Compromisso com a cultura, o turismo e a transparência pública de Pernambuco.
          </p>
        </div>
        
        {['Contato Oficial', 'Endereço'].map((title, idx) => (
          <div key={idx}>
            <h4 className="text-white font-bold text-sm mb-8 tracking-wide uppercase">{title}</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-light">
              {idx === 0 ? (
                <>
                  <li className="hover:text-white transition-colors cursor-pointer text-xs">contato@empetur.pe.gov.br</li>
                  <li className="text-xs">+55 (81) 3182-8000</li>
                  <li className="text-xs opacity-60">Segunda a Sexta • 08h às 17h</li>
                </>
              ) : (
                <>
                  <li className="text-xs leading-relaxed">Centro de Convenções de PE<br/>Av. Professor Andrade Bezerra, s/n</li>
                  <li className="text-xs text-white font-medium">Salgadinho, Olinda - PE</li>
                </>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* SEÇÃO DA EQUIPE DE CONTROLE INTERNO */}
      <div className="max-w-7xl mx-auto mb-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
        <div className="text-[#00AEEF] text-[9px] font-black uppercase tracking-[0.3em] mb-8 text-center opacity-70">
          Equipe de Controle Interno e Desenvolvimento
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {equipe.map((membro, index) => (
            <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-white font-bold text-xs mb-1">{membro.nome}</span>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{membro.cargo}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        <p>© {new Date().getFullYear()} EMPETUR. Transparência e Governança.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-white transition-colors">Auditado</span>
          <span className="hover:text-white transition-colors">e-Fisco PE</span>
        </div>
      </div>
    </footer>
  );
}