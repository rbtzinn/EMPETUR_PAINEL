import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmModal from '../ui/ConfirmModal';

export default function Topbar({ lookerShareUrl }) {
  const [activeSection, setActiveSection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-25% 0px -25% 0px', threshold: [0.3] });

    const sectionsToObserve = ['inicio', 'painel', 'gestao', 'sobre', 'glossario', 'contato'];
    const timeoutId = setTimeout(() => {
      sectionsToObserve.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const confirmarVisitaSite = () => {
    setIsModalOpen(false);
    window.open('https://www.empetur.pe.gov.br/', '_self');
  };

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'painel', label: 'Painel' },
    { id: 'gestao', label: 'Gestão' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'glossario', label: 'Glossário' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <>
      <style>{`
        /* 🔴 BLINDAGEM ALTO CONTRASTE PARA A TOPBAR E DROPDOWN */
        body.contraste-negativo .hc-topbar {
          background-color: #000 !important;
          border: 2px solid #ffea00 !important;
          box-shadow: none !important;
        }

        body.contraste-negativo .hc-topbar-dropdown {
          background-color: #000 !important;
          border: 2px solid #ffea00 !important;
        }

        body.contraste-negativo .hc-topbar-text {
          color: #ffea00 !important;
        }

        body.contraste-negativo .hc-topbar-link {
          color: #ffea00 !important;
          background-color: transparent !important;
        }

        /* ITEM ATIVO NO ALTO CONTRASTE: SEM FUNDO AZUL */
        body.contraste-negativo .hc-topbar-link-active {
          color: #ffea00 !important;
          background-color: transparent !important;
        }

        /* HOVER NO ALTO CONTRASTE: FUNDO AMARELO E TEXTO PRETO */
        body.contraste-negativo .hc-topbar-link:hover,
        body.contraste-negativo .hc-topbar-link-active:hover {
          background-color: #ffea00 !important;
          color: #000 !important;
        }

        body.contraste-negativo .hc-topbar-btn {
          background-color: transparent !important;
          color: #ffea00 !important;
          border: 1px solid #ffea00 !important;
        }

        body.contraste-negativo .hc-topbar-btn:hover {
          background-color: #ffea00 !important;
          color: #000 !important;
        }

        /* BOLINHA DO ITEM ATIVO NO DROPDOWN EM ALTO CONTRASTE */
        body.contraste-negativo .hc-topbar-active-dot {
          background-color: #ffea00 !important;
        }

        body.contraste-negativo .hc-topbar-link:hover .hc-topbar-active-dot,
        body.contraste-negativo .hc-topbar-link-active:hover .hc-topbar-active-dot {
          background-color: #000 !important;
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 z-[120] flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none">
        <div className="w-full max-w-7xl relative">
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`hc-topbar pointer-events-auto w-full transition-all duration-500 ease-in-out border border-white/10 rounded-full ${
              scrolled
                ? 'bg-[#0B2341]/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] py-2 px-4 sm:px-6'
                : 'bg-[#0B2341] shadow-2xl py-3 px-4 sm:px-6'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* LOGO E IDENTIDADE */}
              <div className="flex items-center gap-3 sm:gap-5">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] rounded-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <img
                    src="/images/empeturlogobranca.png"
                    alt="EMPETUR"
                    className={`w-auto transition-all duration-300 ${scrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-14'}`}
                  />
                </button>

                <div className="w-[1px] h-8 bg-white/20 hidden sm:block"></div>

                <div className="flex flex-col hidden xs:flex hc-topbar-text">
                  <span className="text-white font-black text-[10px] sm:text-[11px] tracking-tight uppercase leading-tight hc-topbar-text">
                    Transparência
                  </span>
                  <span className="text-[#00AEEF] font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.2em] leading-tight hc-topbar-text">
                    Painel Oficial
                  </span>
                </div>
              </div>

              {/* AÇÕES E MENU */}
              <div className="flex items-center gap-2 sm:gap-4">
                <nav className="hidden lg:flex items-center gap-1 mr-4">
                  {navLinks.slice(0, 3).map((link) => {
                    const isActive = activeSection === link.id;

                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => scrollToSection(e, link.id)}
                        className={`hc-topbar-link ${isActive ? 'hc-topbar-link-active' : ''} px-4 py-2 rounded-full text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-white/10 text-[#00AEEF]'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>

                <Link
                  to={lookerShareUrl}
                  className="hc-topbar-btn hidden sm:flex items-center gap-2 px-6 py-2.5 sm:py-3 bg-[#00AEEF] hover:bg-white text-white hover:text-[#0B2341] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,174,239,0.39)] active:scale-95"
                >
                  Acessar Dados
                  <ExternalLink size={14} strokeWidth={2.5} />
                </Link>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="hc-topbar-btn w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#00AEEF] transition-all border border-white/10 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
                >
                  {isMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
                </button>
              </div>
            </div>
          </motion.header>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="hc-topbar-dropdown pointer-events-auto absolute top-[calc(100%+1rem)] right-0 w-[280px] bg-[#0B2341]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-4 overflow-hidden"
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;

                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => scrollToSection(e, link.id)}
                        className={`hc-topbar-link ${isActive ? 'hc-topbar-link-active' : ''} flex items-center justify-between px-5 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                          isActive
                            ? 'bg-[#00AEEF]/20 text-[#00AEEF]'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <div className="hc-topbar-active-dot w-1.5 h-1.5 rounded-full bg-[#00AEEF]"></div>
                        )}
                      </a>
                    );
                  })}

                  <div className="h-px bg-white/10 my-2"></div>

                  <Link
                    to={lookerShareUrl}
                    className="hc-topbar-btn sm:hidden flex items-center justify-center gap-2 px-5 py-4 bg-[#00AEEF] text-white font-black uppercase tracking-widest rounded-xl text-xs active:scale-95 transition-transform"
                  >
                    Acessar Painel
                    <ExternalLink size={14} strokeWidth={2.5} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmarVisitaSite}
      />
    </>
  );
}