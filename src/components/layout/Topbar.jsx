import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmModal from "../ui/ConfirmModal";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Topbar({ lookerShareUrl }) {
  const [activeSection, setActiveSection] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: [0.3] }
    );

    const sectionsToObserve = ["inicio", "painel", "gestao", "sobre", "glossario", "contato"];
    const timeoutId = setTimeout(() => {
      sectionsToObserve.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const navigateToSection = (id) => {
    setIsMenuOpen(false);
    const targetElement = document.getElementById(id);

    if (!targetElement) return;

    const headerOffset = 100;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const scrollToSection = (event, id) => {
    event.preventDefault();
    navigateToSection(id);
  };

  return (
    <>
      <style>{`
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

        body.contraste-negativo .hc-topbar-link-active {
          color: #ffea00 !important;
          background-color: transparent !important;
        }

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

        body.contraste-negativo .hc-topbar-active-dot {
          background-color: #ffea00 !important;
        }

        body.contraste-negativo .hc-topbar-link:hover .hc-topbar-active-dot,
        body.contraste-negativo .hc-topbar-link-active:hover .hc-topbar-active-dot {
          background-color: #000 !important;
        }

      `}</style>

      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[120] flex justify-center px-4 pt-4 sm:pt-6">
        <div className="relative w-full max-w-7xl">
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`hc-topbar pointer-events-auto w-full rounded-[1.75rem] border border-white/10 transition-all duration-500 ease-in-out ${
              scrolled
                ? "bg-[#071a30]/88 px-4 py-2.5 shadow-[0_10px_30px_rgba(2,12,27,0.22)] backdrop-blur-xl sm:px-6"
                : "bg-[#0B2341]/96 px-4 py-3.5 shadow-[0_10px_30px_rgba(2,12,27,0.18)] sm:px-6"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 sm:gap-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center rounded-lg outline-none transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
                >
                  <img
                    src="/images/empeturlogobranca.png"
                    alt="EMPETUR"
                    className={`w-auto transition-all duration-300 ${
                      scrolled ? "h-10 sm:h-12" : "h-12 sm:h-14"
                    }`}
                  />
                </button>

                <div className="hidden h-8 w-[1px] bg-white/20 sm:block" />

                <div className="hidden flex-col xs:flex hc-topbar-text">
                  <span className="text-[10px] font-black uppercase leading-tight tracking-tight text-white hc-topbar-text sm:text-[11px]">
                    {t.topbar.transparency}
                  </span>
                  <span className="text-[8px] font-bold uppercase leading-tight tracking-[0.2em] text-[#00AEEF] hc-topbar-text sm:text-[9px]">
                    {t.topbar.officialPanel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <nav className="mr-4 hidden items-center gap-1 lg:flex">
                  {t.topbar.navLinks.slice(0, 3).map((link) => {
                    const isActive = activeSection === link.id;

                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(event) => scrollToSection(event, link.id)}
                        className={`hc-topbar-link rounded-full px-4 py-2 text-sm font-bold transition-all ${
                          isActive
                            ? "hc-topbar-link-active bg-white/10 text-[#00AEEF]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>

                <LanguageSwitcher className="hidden lg:inline-flex" />

                <Link
                  to={lookerShareUrl}
                  className="hc-topbar-btn hidden items-center gap-2 rounded-full bg-[#00AEEF] px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_4px_14px_0_rgba(0,174,239,0.39)] transition-all duration-300 hover:bg-white hover:text-[#0B2341] active:scale-95 sm:flex sm:py-3 sm:text-xs"
                >
                  {t.topbar.accessData}
                  <ExternalLink size={14} strokeWidth={2.5} />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className="hc-topbar-btn flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white outline-none transition-all hover:bg-[#00AEEF] active:scale-95 focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
                >
                  {isMenuOpen ? (
                    <X size={20} strokeWidth={2.5} />
                  ) : (
                    <Menu size={20} strokeWidth={2.5} />
                  )}
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
                className="hc-topbar-dropdown pointer-events-auto absolute right-0 top-[calc(100%+1rem)] w-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B2341]/95 p-4 shadow-2xl backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-1">
                  {t.topbar.navLinks.map((link) => {
                    const isActive = activeSection === link.id;

                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(event) => scrollToSection(event, link.id)}
                        className={`hc-topbar-link flex items-center justify-between rounded-xl px-5 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                          isActive
                            ? "hc-topbar-link-active bg-[#00AEEF]/20 text-[#00AEEF]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <div className="hc-topbar-active-dot h-1.5 w-1.5 rounded-full bg-[#00AEEF]" />
                        )}
                      </a>
                    );
                  })}

                  <div className="my-2 h-px bg-white/10" />

                  <LanguageSwitcher className="justify-center" />

                  <Link
                    to={lookerShareUrl}
                    className="hc-topbar-btn flex items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-5 py-4 text-xs font-black uppercase tracking-widest text-white transition-transform active:scale-95 sm:hidden"
                  >
                    {t.topbar.accessPanel}
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
        onConfirm={() => {
          setIsModalOpen(false);
          window.open("https://www.empetur.pe.gov.br/", "_self");
        }}
      />
    </>
  );
}
