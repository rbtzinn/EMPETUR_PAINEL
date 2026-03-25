import React from "react";
import { Link } from "react-router-dom";
import {
  House,
  Shield,
  FileBarChart2,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

function Crumb({
  to,
  href,
  icon: Icon,
  label,
  active = false,
  external = false,
}) {
  const baseClass =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.04em] sm:tracking-[0.08em] whitespace-nowrap transition-all";

  const activeClass =
    "bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/20";

  const defaultClass =
    "bg-white text-slate-500 border border-slate-200 hover:border-[#00AEEF]/30 hover:text-[#00AEEF]";

  const content = (
    <>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={`${baseClass} ${active ? activeClass : defaultClass}`}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={`${baseClass} ${active ? activeClass : defaultClass}`}>
        {content}
      </Link>
    );
  }

  return (
    <span className={`${baseClass} ${active ? activeClass : defaultClass}`}>
      {content}
    </span>
  );
}

function Separator() {
  return (
    <span className="text-slate-300 shrink-0">
      <ChevronRight className="w-3.5 h-3.5" />
    </span>
  );
}

export default function Breadcrumb({ isPainel = false }) {
  return (
    <div
      className={`w-full relative z-10 ${
        isPainel
          ? "mb-3 sm:mb-4"
          : "bg-white pt-[4.2rem] sm:pt-[5.5rem] pb-2.5 sm:pb-3 border-b border-slate-200 shadow-sm"
      }`}
    >
      <div className={`${isPainel ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 mt-5 sm:mt-0"}`}>
        <nav
          aria-label="Breadcrumb"
          className="overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 min-w-max">
            <Crumb
              href="https://www.empetur.pe.gov.br/"
              external
              icon={House}
              label="Início"
            />

            <Separator />

            <Crumb
              icon={Shield}
              label="Transparência"
            />

            <Separator />

            <Crumb
              to="/"
              icon={FileBarChart2}
              label="Portal de Contratações Artísticas"
              active={!isPainel}
            />

            {isPainel && (
              <>
                <Separator />
                <Crumb
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active
                />
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}