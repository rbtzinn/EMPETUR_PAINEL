import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  FileBarChart2,
  House,
  LayoutDashboard,
  Shield,
  Database,
  Clock,
  CalendarDays,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function BIDashboardHeader({ dataUltimaAtualizacao }) {
  const { t } = useLanguage();

  return (
    <>
      <style>{`
        body.contraste-negativo .hc-bi-header {
          background-color: #000 !important;
          border-color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-crumb-inactive {
          color: #ccc !important;
        }
        body.contraste-negativo .hc-bi-crumb-inactive:hover { color: #ffea00 !important; }
        body.contraste-negativo .hc-bi-crumb-active { color: #ffea00 !important; }
        body.contraste-negativo .hc-bi-meta { color: #aaa !important; }
        body.contraste-negativo .hc-bi-meta,
        body.contraste-negativo .hc-bi-meta span {
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-meta svg {
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-title { color: #ffea00 !important; }
        body.contraste-negativo .hc-bi-sep { color: #555 !important; }
        body.contraste-negativo .hc-bi-mobile-pill {
          background-color: #111 !important;
          border: 1px solid #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-crumb-active.hc-bi-mobile-pill {
          background-color: #ffea00 !important;
          color: #000 !important;
        }
        body.contraste-negativo .hc-bi-crumb-active.hc-bi-mobile-pill svg {
          color: #000 !important;
        }
      `}</style>

      <div className="hc-bi-header border-b border-slate-200/80 bg-[#0B2341] px-4 pb-3 pt-20 lg:hidden">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2">
          <div className="no-scrollbar -mx-1 overflow-x-auto pb-1">
            <nav
              aria-label={t.breadcrumb.aria}
              className="flex min-w-max items-center gap-1.5 whitespace-nowrap px-1 text-[9px] font-bold uppercase tracking-[0.14em]"
            >
              <a
                href="https://www.empetur.pe.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="hc-bi-crumb-inactive hc-bi-mobile-pill inline-flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-white/70 transition-colors hover:text-white"
              >
                <House className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
                <span>{t.breadcrumb.portal}</span>
              </a>

              <ChevronRight className="hc-bi-sep h-3 w-3 shrink-0 text-white/25" strokeWidth={2} />

              <span className="hc-bi-crumb-inactive hc-bi-mobile-pill inline-flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-white/70">
                <Shield className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
                <span>{t.breadcrumb.transparency}</span>
              </span>

              <ChevronRight className="hc-bi-sep h-3 w-3 shrink-0 text-white/25" strokeWidth={2} />

              <Link
                to="/"
                className="hc-bi-crumb-inactive hc-bi-mobile-pill inline-flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2 py-1 text-white/70 transition-colors hover:text-white"
              >
                <FileBarChart2 className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
                <span>{t.breadcrumb.contracts}</span>
              </Link>

              <ChevronRight className="hc-bi-sep h-3 w-3 shrink-0 text-white/25" strokeWidth={2} />

              <span className="hc-bi-crumb-active hc-bi-mobile-pill inline-flex shrink-0 items-center gap-1 rounded-full bg-[#00AEEF]/12 px-2 py-1 text-[#00AEEF]">
                <LayoutDashboard className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
                <span>{t.breadcrumb.dashboard}</span>
              </span>
            </nav>
          </div>

          <div
            className="hc-bi-meta flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55"
            aria-label="Metadados da fonte de dados"
          >
            <span className="inline-flex items-center gap-1">
              <Database className="h-2.5 w-2.5 shrink-0 text-emerald-400" strokeWidth={2.5} />
              e-Fisco PE
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-2.5 w-2.5 shrink-0 text-orange-400" strokeWidth={2.5} />
              {dataUltimaAtualizacao}
            </span>
          </div>
        </div>
      </div>

      <div className="bi-header hc-bi-header hidden shrink-0 items-center gap-3 border-b border-slate-200/80 bg-[#0B2341] px-5 py-1.5 lg:flex lg:px-6">
        <nav
          aria-label={t.breadcrumb.aria}
          className="flex shrink-0 items-center gap-1.5"
        >
          <a
            href="https://www.empetur.pe.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="hc-bi-crumb-inactive flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
          >
            <House className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
            <span>{t.breadcrumb.portal}</span>
          </a>

          <ChevronRight className="hc-bi-sep h-3 w-3 shrink-0 text-white/20" strokeWidth={2} />

          <span className="hc-bi-crumb-inactive flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white/50">
            <Shield className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
            <span>{t.breadcrumb.transparency}</span>
          </span>

          <ChevronRight className="hc-bi-sep h-3 w-3 shrink-0 text-white/20" strokeWidth={2} />

          <Link
            to="/"
            className="hc-bi-crumb-inactive flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
          >
            <FileBarChart2 className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
            <span>{t.breadcrumb.contracts}</span>
          </Link>

          <ChevronRight className="hc-bi-sep h-3 w-3 shrink-0 text-white/20" strokeWidth={2} />

          <span className="hc-bi-crumb-active flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[#00AEEF]">
            <LayoutDashboard className="h-2.5 w-2.5 shrink-0" strokeWidth={2.5} />
            <span>{t.breadcrumb.dashboard}</span>
          </span>
        </nav>

        <h1 className="hc-bi-title mx-2 min-w-0 flex-1 truncate text-center text-[10px] font-black uppercase tracking-widest text-white/80">
          {t.dashboard.header.title}
        </h1>

        <div
          className="hc-bi-meta flex shrink-0 items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-white/40"
          aria-label="Metadados da fonte de dados"
        >
          <span className="hidden items-center gap-1 md:flex">
            <Database className="h-2.5 w-2.5 shrink-0 text-emerald-400" strokeWidth={2.5} />
            e-Fisco PE
          </span>
          <span className="hidden items-center gap-1 lg:flex">
            <Clock className="h-2.5 w-2.5 shrink-0 text-[#00AEEF]" strokeWidth={2.5} />
            {t.dashboard.header.monthly}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-2.5 w-2.5 shrink-0 text-orange-400" strokeWidth={2.5} />
            {dataUltimaAtualizacao}
          </span>
        </div>
      </div>
    </>
  );
}
