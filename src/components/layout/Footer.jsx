import React, { useState } from 'react';
import PrivacidadeModal from '../ui/PrivacidadeModal';

export default function Footer() {
  const [isPrivacidadeOpen, setIsPrivacidadeOpen] = useState(false);

  const equipe = [
    { nome: "Karla Taciana Sabino de Paula Sales", cargo: "Titular" },
    { nome: "Monique de Oliveira Ferraz Torres", cargo: "Adjunta" },
    { nome: "Renan Ádson Rodrigues dos Santos", cargo: "Membro" },
    { nome: "Roberto Gabriel Araújo Miranda", cargo: "Membro & Desenvolvedor" }
  ];

  return (
    <>
      <PrivacidadeModal isOpen={isPrivacidadeOpen} onClose={() => setIsPrivacidadeOpen(false)} />
      <footer className="bg-[#0B2341] py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00AEEF] via-[#0B2341] to-[#00AEEF]" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="text-white font-black text-3xl tracking-tighter mb-4">EMPETUR</div>
            <div className="inline-block px-3 py-1 bg-white/5 rounded-md text-[#00AEEF] font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
              Controle Interno • Governo de PE
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed font-light mb-8">
              Painel Oficial de Contratações Artísticas. Compromisso com a cultura, o turismo e a transparência pública de Pernambuco.
            </p>

            {/* REDES SOCIAIS AQUI */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="https://www.instagram.com/empetur.pe/" target="_blank" rel="noopener noreferrer" title="Instagram da EMPETUR" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#00AEEF] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@empetur" target="_blank" rel="noopener noreferrer" title="TikTok da EMPETUR" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#00AEEF] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.61-.6 3.2-1.72 4.31-1.14 1.14-2.73 1.78-4.35 1.77-1.74-.01-3.41-.74-4.59-2.03-1.16-1.27-1.77-2.96-1.72-4.7.04-1.72.73-3.37 1.93-4.56 1.25-1.25 3.02-1.86 4.79-1.75.14.01.27.02.41.04v4.06c-.11-.03-.22-.05-.33-.06-.88-.08-1.78.22-2.42.84-.66.64-1.04 1.57-1.02 2.5.02.95.45 1.84 1.15 2.45.69.6 1.64.9 2.57.85.93-.05 1.81-.5 2.43-1.2.66-.75 1.01-1.76 1.01-2.78V.02h-.24z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@empetur" target="_blank" rel="noopener noreferrer" title="YouTube da EMPETUR" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#00AEEF] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            
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
            <span onClick={() => setIsPrivacidadeOpen(true)} className="hover:text-white transition-colors cursor-pointer">
              Política de Privacidade
            </span>
            <a href="https://efisco.sefaz.pe.gov.br/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Portal e-Fisco PE
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}