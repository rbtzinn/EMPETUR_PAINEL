import React, { useState, useEffect } from 'react';

export default function Topbar({ lookerShareUrl }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { 
      // Ajustei o rootMargin para ser mais amigável, ativando quando a seção chega a 20% do topo da tela
      rootMargin: "-20% 0px -60% 0px" 
    });

    const sectionsToObserve = ['inicio', 'painel', 'sobre', 'glossario'];

    // Colocamos num setTimeout bem rapidinho apenas para garantir que o DOM já foi montado
    const timeoutId = setTimeout(() => {
      sectionsToObserve.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const getLinkClass = (sectionId) => {
    return `relative py-2 text-sm font-medium transition-all duration-300 ${
      activeSection === sectionId ? 'text-[#00AEEF]' : 'text-slate-300 hover:text-white'
    }`;
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#0B2341]/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a className="flex items-center hover:opacity-80 transition-opacity" href="#inicio" onClick={handleScroll}>
            <img src="/images/empeturlogobranca.png" alt="Logo EMPETUR" className="h-30 w-auto object-contain" />
          </a>
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-xs tracking-tight uppercase">Controle Interno</span>
            <span className="text-[#00AEEF] font-black text-[9px] uppercase tracking-[0.2em]">Pernambuco</span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <nav className="hidden lg:flex gap-8">
            {['painel', 'sobre', 'glossario'].map((id) => (
              <a key={id} href={`#${id}`} onClick={handleScroll} className={getLinkClass(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
                {activeSection === id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00AEEF] rounded-full" />}
              </a>
            ))}
          </nav>
          <a 
            href={lookerShareUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 bg-[#00AEEF] hover:bg-white text-[#0B2341] text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-[#00AEEF]/20 active:scale-95"
          >
            Acessar Painel
          </a>
        </div>
      </div>
    </header>
  );
}