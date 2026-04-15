import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "../../ui/LanguageSwitcher";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function DesktopPainelMenu({
  isOpen,
  onToggle,
  onClose,
  menuRef,
}) {
  const { t } = useLanguage();

  return (
    <div className="relative" ref={menuRef}>
      <style>{`
        body.contraste-negativo .hc-desktop-menu-button {
          background-color: #000 !important;
          border-color: #ffea00 !important;
          color: #ffea00 !important;
          box-shadow: none !important;
        }

        body.contraste-negativo .hc-desktop-menu-line,
        body.contraste-negativo .hc-desktop-menu-line::before {
          background-color: #ffea00 !important;
        }
      `}</style>

      <button
        type="button"
        onClick={onToggle}
        aria-label={t.languageSwitcher.label}
        aria-expanded={isOpen}
        className={`hc-desktop-menu-button relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 active:scale-95 ${
          isOpen
            ? "border-[#00AEEF] bg-slate-50 text-[#00AEEF] shadow-[0_16px_38px_-24px_rgba(0,174,239,0.35)]"
            : "border-slate-200 bg-slate-50 text-[#0B2341] hover:border-[#00AEEF] hover:text-[#00AEEF]"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.16),transparent_62%)] transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span
            className={`hc-desktop-menu-line absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 ${
              isOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px]"
            }`}
          />
          <span
            className={`hc-desktop-menu-line absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-200 ${
              isOpen ? "scale-x-0 opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`hc-desktop-menu-line absolute h-[2px] w-[18px] rounded-full bg-current transition-all duration-300 ${
              isOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px]"
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+0.75rem)] z-[90] w-[280px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_24px_60px_-24px_rgba(11,35,65,0.35)]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <LanguageSwitcher theme="light" className="justify-center" />
              </div>

              <Link
                to="/"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#0B2341] transition-all hover:border-[#00AEEF] hover:text-[#00AEEF] active:scale-[0.98]"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                {t.dashboard.backToSite}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
