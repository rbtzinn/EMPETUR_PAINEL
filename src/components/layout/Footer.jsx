import React, { useState } from 'react';
import { ShieldCheck, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import PrivacidadeModal from '../ui/PrivacidadeModal';

export default function Footer() {
  const [isPrivacidadeOpen, setIsPrivacidadeOpen] = useState(false);

  const equipe = [
    { nome: "Karla Taciana Sabino", cargo: "Titular AECI" },
    { nome: "Monique Torres", cargo: "Adjunta AECI" },
    { nome: "Renan Ádson", cargo: "Membro AECI" },
    { nome: "Roberto Gabriel", cargo: "Membro AECI" }
  ];

  return (
    <>
      <PrivacidadeModal isOpen={isPrivacidadeOpen} onClose={() => setIsPrivacidadeOpen(false)} />
      
      <footer className="bg-[#0B2341] pt-24 pb-8 px-6 relative overflow-hidden">
        {/* Glows Decorativos */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00AEEF] rounded-full blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16 mb-20 relative z-10">
          
          {/* Coluna 1: Marca */}
          <div className="md:col-span-12 lg:col-span-5">
            <img src="/images/empeturlogobranca.png" alt="EMPETUR" className="h-16 w-auto mb-6 opacity-90" />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-white font-bold text-[10px] uppercase tracking-widest mb-6">
              <ShieldCheck size={14} className="text-[#00AEEF]" /> Controle Interno
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-light mb-8 max-w-sm">
              Painel Oficial de Contratações Artísticas. Transparência ativa garantindo o compromisso com a cultura e o turismo de Pernambuco.
            </p>

            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/empetur.pe/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#00AEEF] hover:text-white hover:border-[#00AEEF] transition-all">
                <Instagram size={18} strokeWidth={2} />
              </a>
              <a href="https://www.youtube.com/@empetur" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                <Youtube size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
          
          {/* Colunas de Contato */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-white font-black text-sm mb-6 tracking-widest uppercase">Atendimento</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:empetur@empetur.pe.gov.br" className="flex items-start gap-3 text-slate-400 hover:text-[#00AEEF] transition-colors group">
                  <Mail size={16} className="mt-0.5 group-hover:text-[#00AEEF]" />
                  <span className="text-sm">empetur@empetur.pe.gov.br</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400">
                  <Phone size={16} className="mt-0.5" />
                  <span className="text-sm">+55 (81) 3182-8000</span>
                </div>
              </li>
              <li className="pl-7">
                <span className="text-xs text-slate-500 block">Segunda a Sexta • 08h às 17h</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="text-white font-black text-sm mb-6 tracking-widest uppercase">Localização</h4>
            <div className="flex items-start gap-3 text-slate-400">
              <MapPin size={16} className="mt-1 shrink-0 text-[#00AEEF]" />
              <p className="text-sm leading-relaxed">
                Centro de Convenções de PE<br/>
                Av. Professor Andrade Bezerra, s/n<br/>
                <strong className="text-white font-medium mt-1 block">Salgadinho, Olinda - PE</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bloco da Equipe Premium */}
        <div className="max-w-7xl mx-auto mb-16 p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00AEEF]"></div>
            <h5 className="text-white font-black text-xs uppercase tracking-widest">Equipe de Desenvolvimento e Controle</h5>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {equipe.map((membro, index) => (
              <div key={index} className="flex flex-col border-l-2 border-white/10 pl-4">
                <span className="text-white font-bold text-sm mb-1">{membro.nome}</span>
                <span className="text-[#00AEEF] text-[10px] font-black uppercase tracking-widest opacity-80">{membro.cargo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} EMPETUR. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <button onClick={() => setIsPrivacidadeOpen(true)} className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
              Política de Privacidade
            </button>
            <a href="https://efisco.sefaz.pe.gov.br/" target="_blank" rel="noopener noreferrer" className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-[#00AEEF] transition-colors">
              Portal e-Fisco PE
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}