import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 🔴 Import do Link mantido!
import ConfirmModal from '../ui/ConfirmModal'; // 🔴 Caminho ajustado

export default function Topbar({ lookerShareUrl }) {
  const [activeSection, setActiveSection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-25% 0px -25% 0px', threshold: [0.3] });

    const sectionsToObserve = ['inicio', 'painel', 'gestao', 'sobre', 'glossario'];
    const timeoutId = setTimeout(() => {
      sectionsToObserve.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => { clearTimeout(timeoutId); observer.disconnect(); };
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    setIsMobileMenuOpen(false);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const confirmarVisitaSite = () => {
    setIsModalOpen(false);
    window.open('https://www.empetur.pe.gov.br/', '_self'); // 🔴 Mesma aba
  };

  const getLinkClass = (sectionId) => `relative py-2 text-sm font-medium transition-all duration-300 ${activeSection === sectionId ? 'text-[#00AEEF]' : 'text-slate-300 hover:text-white'}`;

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-[#0B2341]/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <a className="flex items-center hover:opacity-80 transition-opacity cursor-pointer" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
              <img src="/images/empeturlogobranca.png" alt="Logo EMPETUR" className="h-14 md:h-20 w-auto object-contain" />
            </a>
            <div className="hidden xs:block w-[1px] h-8 bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-[10px] md:text-xs tracking-tight uppercase">Gestão Cultural</span>
              <span className="text-[#00AEEF] font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em]">Pernambuco</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-10">
            <nav className="hidden lg:flex gap-8">
              {['painel', 'gestao', 'sobre', 'glossario'].map((id) => (
                <a key={id} href={`#${id}`} onClick={handleScroll} className={getLinkClass(id)}>
                  {id === 'gestao' ? 'Gestão' : id.charAt(0).toUpperCase() + id.slice(1)}
                  {activeSection === id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00AEEF] rounded-full" />}
                </a>
              ))}
            </nav>

            <Link to={lookerShareUrl} className="hidden sm:block px-6 py-2.5 bg-[#00AEEF] hover:bg-white text-[#0B2341] text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-[#00AEEF]/20 active:scale-95">
              Acessar Painel
            </Link>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0B2341] border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            {['painel', 'gestao', 'sobre', 'glossario'].map((id) => (
              <a key={id} href={`#${id}`} onClick={handleScroll} className={`text-lg font-bold uppercase tracking-widest ${activeSection === id ? 'text-[#00AEEF]' : 'text-white'}`}>
                {id === 'gestao' ? 'Gestão' : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <Link to={lookerShareUrl} onClick={() => setIsMobileMenuOpen(false)} className="mt-4 w-full text-center py-4 bg-[#00AEEF] text-[#0B2341] font-black uppercase tracking-widest rounded-xl">
              Acessar Painel
            </Link>
          </div>
        )}
      </header>
      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmarVisitaSite} />
    </>
  );
}