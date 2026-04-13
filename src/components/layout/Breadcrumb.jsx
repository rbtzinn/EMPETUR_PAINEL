import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  FileBarChart2,
  House,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

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

  const stateClass = active
    ? "bg-[#0B2341] text-white border border-[#0B2341]"
    : "bg-white text-slate-500 border border-slate-200 hover:border-[#00AEEF] hover:text-[#00AEEF]";

  const content = (
    <>
      <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2.5} />
      <span>{label}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={`${baseClass} ${stateClass}`}>
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={`${baseClass} ${stateClass}`}>
        {content}
      </Link>
    );
  }

  return <span className={`${baseClass} ${stateClass}`}>{content}</span>;
}

function Separator({ isPainel }) {
  return (
    <span
      className={`flex shrink-0 items-center ${
        isPainel ? "text-slate-300" : "mb-3 mt-4 text-white/50"
      }`}
    >
      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
    </span>
  );
}

export default function Breadcrumb({ isPainel = false }) {
  const { t } = useLanguage();

  return (
    <div
      className={`pointer-events-none z-40 w-full ${
        isPainel
          ? "relative mb-3 sm:mb-4"
          : "absolute left-0 right-0 top-[80px] pb-2 pt-5 sm:top-[90px]"
      }`}
    >
      <div className={isPainel ? "w-full" : "mx-auto max-w-7xl px-4 sm:px-6"}>
        <nav
          aria-label={t.breadcrumb.aria}
          className="pointer-events-auto overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          <div className="inline-flex min-w-max items-center gap-1.5 sm:gap-2">
            <Crumb
              href="https://www.empetur.pe.gov.br/"
              external
              icon={House}
              label={t.breadcrumb.portal}
            />

            <Separator isPainel={isPainel} />

            <Crumb icon={Shield} label={t.breadcrumb.transparency} />

            <Separator isPainel={isPainel} />

            <Crumb
              to="/"
              icon={FileBarChart2}
              label={t.breadcrumb.contracts}
              active={!isPainel}
            />

            {isPainel && (
              <>
                <Separator isPainel={isPainel} />
                <Crumb
                  icon={LayoutDashboard}
                  label={t.breadcrumb.dashboard}
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
