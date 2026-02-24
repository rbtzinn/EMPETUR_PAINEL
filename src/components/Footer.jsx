import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0B2341] py-20 px-6 relative overflow-hidden">
      {/* Linha de destaque superior */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00AEEF] via-[#0B2341] to-[#00AEEF]" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
        <div className="lg:col-span-2">
          <div className="text-white font-black text-3xl tracking-tighter mb-4">EMPETUR</div>
          <div className="inline-block px-3 py-1 bg-white/5 rounded-md text-[#00AEEF] font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
            Controle Interno • Governo de PE
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed font-light">
            Painel Oficial de Contratações Artísticas. Compromisso com a cultura, o turismo e a transparência pública.
          </p>
        </div>
        
        {['Contato Oficial', 'Endereço'].map((title, idx) => (
          <div key={idx}>
            <h4 className="text-white font-bold text-sm mb-8 tracking-wide">{title}</h4>
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
                  <li className="text-xs">Salgadinho, Olinda - PE</li>
                </>
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[11px] font-bold uppercase tracking-widest">
        <p>© {new Date().getFullYear()} EMPETUR. Transparência em primeiro lugar.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-white transition-colors">Privacidade</span>
          <span className="hover:text-white transition-colors">Termos de Uso</span>
        </div>
      </div>
    </footer>
  );
}