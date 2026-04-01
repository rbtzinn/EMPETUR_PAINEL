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
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all shadow-sm";

  const activeClass =
    "bg-[#0B2341] text-white border border-[#0B2341]";

  const defaultClass =
    "bg-white text-slate-500 border border-slate-200 hover:border-[#00AEEF] hover:text-[#00AEEF]";

  const content = (
    <>
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" strokeWidth={2.5} />
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

function Separator({ isPainel }) {
  return (
    // Removi o mt-3 mb-4 e adicionei flex items-center para a seta ficar perfeitamente alinhada ao meio
    <span className={`flex items-center shrink-0 ${isPainel ? "text-slate-300" : "text-white/50 mt-4 mb-3"}`}>
      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={3} />
    </span>
  );
}

export default function Breadcrumb({ isPainel = false }) {
  return (
    <div
      className={`w-full z-[90] pointer-events-none ${
        isPainel
          ? "relative mb-3 sm:mb-4"
          : "absolute top-[80px] sm:top-[90px] left-0 right-0 pt-5 pb-2"
      }`}
    >
      <div className={`${isPainel ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6"}`}>
        <nav
          aria-label="Breadcrumb"
          className="overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] pointer-events-auto"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 min-w-max">
            <Crumb
              href="https://www.empetur.pe.gov.br/"
              external
              icon={House}
              label="Portal"
            />

            <Separator isPainel={isPainel} />

            <Crumb
              icon={Shield}
              label="Transparência"
            />

            <Separator isPainel={isPainel} />

            <Crumb
              to="/"
              icon={FileBarChart2}
              label="Contratações"
              active={!isPainel}
            />

            {isPainel && (
              <>
                <Separator isPainel={isPainel} />
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