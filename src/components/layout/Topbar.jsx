import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import ConfirmModal from "../ui/ConfirmModal";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";
import { topbarContrastStyles } from "./topbar/topbarStyles";
import TopbarBrand from "./topbar/TopbarBrand";
import { TopbarDesktopNav } from "./topbar/TopbarNavLinks";
import TopbarMenuDropdown from "./topbar/TopbarMenuDropdown";

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
        ${topbarContrastStyles}
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
              <TopbarBrand
                scrolled={scrolled}
                onOpenModal={() => setIsModalOpen(true)}
                transparency={t.topbar.transparency}
                officialPanel={t.topbar.officialPanel}
              />

              <div className="flex items-center gap-2 sm:gap-4">
                <TopbarDesktopNav
                  links={t.topbar.navLinks}
                  activeSection={activeSection}
                  onNavigate={scrollToSection}
                />

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

          <TopbarMenuDropdown
            isOpen={isMenuOpen}
            navLinks={t.topbar.navLinks}
            activeSection={activeSection}
            onNavigate={scrollToSection}
            lookerShareUrl={lookerShareUrl}
            accessPanelLabel={t.topbar.accessPanel}
          />
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
