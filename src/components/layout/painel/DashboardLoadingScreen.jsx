import React from "react";

export default function DashboardLoadingScreen({ label }) {
  return (
    <div className="hc-bg-painel flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <style>{`
        @keyframes empetur-loader-bars {
          0%, 100% { box-shadow: 0 0 #00AEEF, 0 0 #0B2341; }
          33% { box-shadow: 0 -26px #00AEEF, 0 0 #0B2341; }
          66% { box-shadow: 0 0 #00AEEF, 0 -26px #0B2341; }
        }

        @keyframes empetur-loader-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
        }

        @keyframes empetur-loader-shine {
          0% { transform: translateX(-130%); }
          100% { transform: translateX(130%); }
        }

        body.contraste-negativo .hc-dashboard-loader-shell {
          background-color: #000 !important;
          border: 2px solid #ffea00 !important;
          box-shadow: none !important;
        }

        body.contraste-negativo .hc-dashboard-loader-text,
        body.contraste-negativo .hc-dashboard-loader-kicker {
          color: #ffea00 !important;
        }

        body.contraste-negativo .hc-dashboard-loader-core,
        body.contraste-negativo .hc-dashboard-loader-core::before,
        body.contraste-negativo .hc-dashboard-loader-core::after {
          background: #ffea00 !important;
          box-shadow: none !important;
        }
      `}</style>

      <div
        role="status"
        aria-live="polite"
        className="hc-dashboard-loader-shell relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 px-6 py-8 shadow-[0_30px_90px_-56px_rgba(11,35,65,0.35)] backdrop-blur md:px-10 md:py-10"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,174,239,0.1),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(11,35,65,0.08),transparent_28%)]" />
          <div
            className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-80"
            style={{ animation: "empetur-loader-shine 2.3s linear infinite" }}
          />
        </div>

        <div className="relative flex flex-col items-center text-center">
          <div className="hc-dashboard-loader-kicker mb-5 inline-flex rounded-full border border-[#00AEEF]/15 bg-[#00AEEF]/8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#0B2341]">
            EMPETUR
          </div>

          <div className="mb-8 flex h-24 items-center justify-center">
            <div
              aria-hidden="true"
              className="hc-dashboard-loader-core relative h-3 w-3 rounded-full bg-[#00AEEF]"
              style={{ animation: "empetur-loader-pulse 1.2s ease-in-out infinite" }}
            >
              <span
                className="absolute left-[-18px] top-0 h-3 w-3 rounded-full bg-[#00AEEF]"
                style={{ animation: "empetur-loader-bars 1.1s ease-in-out infinite" }}
              />
              <span
                className="absolute right-[-18px] top-0 h-3 w-3 rounded-full bg-[#0B2341]"
                style={{ animation: "empetur-loader-bars 1.1s ease-in-out 0.25s infinite" }}
              />
            </div>
          </div>

          <div className="hc-dashboard-loader-text max-w-xl text-balance text-2xl font-black tracking-tight text-[#0B2341] md:text-4xl">
            {label}
          </div>

          <div aria-hidden="true" className="mt-8 flex w-full max-w-md items-center gap-3">
            <span className="h-2 flex-1 rounded-full bg-slate-200" />
            <span className="h-2 w-24 rounded-full bg-[#00AEEF]/20" />
            <span className="h-2 flex-1 rounded-full bg-slate-200" />
          </div>

          <div aria-hidden="true" className="mt-6 grid w-full max-w-lg grid-cols-3 gap-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-4"
              >
                <div className="mb-3 h-2.5 w-14 rounded-full bg-slate-200" />
                <div className="h-7 rounded-xl bg-slate-200/80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
