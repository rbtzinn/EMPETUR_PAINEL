import React from "react";

export function TopbarDesktopNav({ links, activeSection, onNavigate }) {
  return (
    <nav className="mr-4 hidden items-center gap-1 lg:flex">
      {links.slice(0, 3).map((link) => {
        const isActive = activeSection === link.id;

        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(event) => onNavigate(event, link.id)}
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
  );
}

export function TopbarMenuLinks({ links, activeSection, onNavigate }) {
  return (
    <>
      {links.map((link) => {
        const isActive = activeSection === link.id;

        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(event) => onNavigate(event, link.id)}
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
    </>
  );
}
