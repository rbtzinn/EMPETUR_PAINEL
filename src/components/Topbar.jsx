import React, { useState, useEffect } from 'react';

export default function Topbar({ lookerShareUrl }) {
  const [activeSection, setActiveSection] = useState('');

  // Lógica para detetar em que secção o utilizador está a fazer scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      // Deteta a secção quando ela chega a uma margem próxima ao topo (abaixo do cabeçalho)
      rootMargin: "-100px 0px -60% 0px"
    });

    const sections = ['inicio', 'painel', 'sobre', 'glossario'].map(id => document.getElementById(id));
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Compensar a altura do Topbar (h-20 do tailwind = 80px)
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Função para aplicar a cor azul brilhante se estiver selecionado, ou manter o cinza
  const getLinkClass = (sectionId) => {
    return `transition-colors ${activeSection === sectionId ? 'text-[#00AEEF] font-bold' : 'text-slate-300 hover:text-white'}`;
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#0B2341] border-b-4 border-[#00AEEF] shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logos Oficiais */}
        <div className="flex items-center gap-5">
          {/* Logo EMPETUR */}
          <a className="flex items-center gap-2" href="#inicio" onClick={handleScroll}>
            <img 
              src="/images/empeturlogobranca.png" 
              alt="Logo EMPETUR" 
              className="h-12 w-auto object-contain" 
            />
          </a>

          {/* Divisor Sólido */}
          <div className="w-[2px] h-8 bg-slate-600"></div>

          {/* Logo Controle Interno */}
          <div className="flex flex-col justify-center">
            <span className="text-white font-bold text-[13px] leading-tight">
              Controle Interno
            </span>
            <span className="text-[#00AEEF] font-black text-[10px] uppercase tracking-widest leading-tight">
              EMPETUR
            </span>
          </div>
        </div>

        {/* Menu & Ação */}
        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex gap-6 text-sm">
            <a href="#painel" onClick={handleScroll} className={getLinkClass('painel')}>Painel</a>
            <a href="#sobre" onClick={handleScroll} className={getLinkClass('sobre')}>Sobre</a>
            <a href="#glossario" onClick={handleScroll} className={getLinkClass('glossario')}>Termos</a>
          </nav>
          
          <a 
            href={lookerShareUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 bg-[#00AEEF] text-[#0B2341] text-sm font-black uppercase tracking-wider rounded-sm hover:bg-[#0096D1] transition-colors"
          >
            Acessar Painel
          </a>
        </div>
      </div>
    </header>
  );
}
