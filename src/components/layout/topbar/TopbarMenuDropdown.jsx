import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LanguageSwitcher from "../../ui/LanguageSwitcher";
import { TopbarMenuLinks } from "./TopbarNavLinks";

export default function TopbarMenuDropdown({
  isOpen,
  navLinks,
  activeSection,
  onNavigate,
  lookerShareUrl,
  accessPanelLabel,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="hc-topbar-dropdown pointer-events-auto absolute right-0 top-[calc(100%+1rem)] w-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B2341]/95 p-4 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-1">
            <TopbarMenuLinks
              links={navLinks}
              activeSection={activeSection}
              onNavigate={onNavigate}
            />

            <div className="my-2 h-px bg-white/10" />

            <LanguageSwitcher className="justify-center" />

            <Link
              to={lookerShareUrl}
              className="hc-topbar-btn flex items-center justify-center gap-2 rounded-xl bg-[#00AEEF] px-5 py-4 text-xs font-black uppercase tracking-widest text-white transition-transform active:scale-95 sm:hidden"
            >
              {accessPanelLabel}
              <ExternalLink size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
