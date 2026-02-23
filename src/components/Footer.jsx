import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0B2341] border-t-8 border-[#00AEEF] py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-700 pb-12 mb-8">
        <div className="lg:col-span-2">
          <div className="text-white font-black text-2xl tracking-tighter mb-2">
            EMPETUR
          </div>
          <div className="text-[#00AEEF] font-bold text-xs uppercase tracking-widest mb-4">
            Controle Interno • Governo de Pernambuco
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            Painel Oficial de Contratações Artísticas. Compromisso com a cultura, o turismo e a clareza da informação pública.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-black tracking-widest uppercase mb-6 text-slate-500">Contato Oficial</h4>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li>contato@empetur.pe.gov.br</li>
            <li>+55 (81) 3182-8000</li>
            <li>Segunda a Sexta • 08h às 17h</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black tracking-widest uppercase mb-6 text-slate-500">Endereço</h4>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li>Centro de Convenções de PE</li>
            <li>Av. Professor Andrade Bezerra, s/n</li>
            <li>Salgadinho, Olinda - PE</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-medium">
        <p>© {new Date().getFullYear()} EMPETUR. Todos os direitos reservados.</p>
        <p className="mt-2 md:mt-0">Uso governamental e público.</p>
      </div>
    </footer>
  );
}
