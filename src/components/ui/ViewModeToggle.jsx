import React from "react";
import { LayoutDashboard, PanelTop } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useViewMode } from "../../contexts/ViewModeContext";

export default function ViewModeToggle() {
  const { mode, setMode, isMobile } = useViewMode();
  const { t } = useLanguage();

  if (isMobile) return null;

  const options = [
    {
      key: "bi",
      Icon: LayoutDashboard,
      label: t.dashboard.viewMode.biLabel,
      description: t.dashboard.viewMode.biDescription,
    },
    {
      key: "padrao",
      Icon: PanelTop,
      label: t.dashboard.viewMode.defaultLabel,
      description: t.dashboard.viewMode.defaultDescription,
    },
  ];

  return (
    <>
      <style>{`
        body.contraste-negativo .hc-view-toggle {
          background-color: #000 !important;
          border-color: #ffea00 !important;
          box-shadow: none !important;
        }
        body.contraste-negativo .hc-view-toggle-btn {
          color: #ffea00 !important;
          background-color: transparent !important;
        }
        body.contraste-negativo .hc-view-toggle-btn:hover {
          background-color: #111 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-view-toggle-btn[aria-pressed="true"] {
          background-color: #ffea00 !important;
          color: #000 !important;
        }
        body.contraste-negativo .hc-view-toggle-icon {
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-view-toggle-btn[aria-pressed="true"] .hc-view-toggle-icon {
          color: #000 !important;
        }
      `}</style>

      <div
        className="hc-view-toggle flex shrink-0 items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-100/80 p-0.5 shadow-inner"
        role="group"
        aria-label={t.dashboard.viewMode.groupAria}
      >
        {options.map(({ key, Icon, label, description }) => {
          const isActive = mode === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              title={description}
              aria-pressed={isActive}
              aria-label={`${isActive ? t.dashboard.viewMode.activePrefix : t.dashboard.viewMode.switchPrefix} ${label} - ${description}`}
              className={`hc-view-toggle-btn group relative flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-1 ${
                isActive
                  ? "bg-[#0B2341] text-white shadow-sm"
                  : "text-slate-500 hover:bg-white/70 hover:text-[#0B2341]"
              }`}
            >
              <Icon
                className={`hc-view-toggle-icon h-3 w-3 shrink-0 transition-all ${
                  isActive ? "text-[#00AEEF]" : "text-slate-400 group-hover:text-[#0B2341]"
                }`}
                strokeWidth={2.5}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
