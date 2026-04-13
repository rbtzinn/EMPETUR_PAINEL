import React from "react";
import { ShieldCheck, X } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PrivacidadeModal({ isOpen, onClose }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <FadeIn className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-[#0B2341] to-[#1a4275] p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm sm:flex">
              <ShieldCheck className="h-6 w-6 text-[#00AEEF]" />
            </div>
            <div>
              <h2 className="mb-1 text-2xl font-black tracking-tight text-white md:text-3xl">
                {t.privacyModal.title}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#00AEEF] md:text-xs">
                {t.privacyModal.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/5 p-3 text-white/50 transition-all hover:bg-white/20 hover:text-white"
          >
            <X strokeWidth={2.5} size={20} />
          </button>
        </div>

        <div className="space-y-10 overflow-y-auto p-6 text-slate-600 scrollbar-moderna md:p-10">
          <div className="relative overflow-hidden rounded-3xl border border-blue-100/50 bg-blue-50/80 p-6 md:p-8">
            <div className="absolute left-0 top-0 h-full w-2 bg-[#00AEEF]" />
            <p className="text-sm leading-relaxed text-[#0B2341] md:text-base">
              {t.privacyModal.intro}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-10">
              <section>
                <h3 className="mb-4 flex items-center gap-3 text-lg font-black text-[#0B2341]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400">
                    01
                  </span>
                  {t.privacyModal.sections.whoWeAre.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {t.privacyModal.sections.whoWeAre.description}
                </p>
              </section>

              <section>
                <h3 className="mb-4 flex items-center gap-3 text-lg font-black text-[#0B2341]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400">
                    02
                  </span>
                  {t.privacyModal.sections.legislation.title}
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-slate-500">
                  {t.privacyModal.sections.legislation.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00AEEF]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="mb-4 flex items-center gap-3 text-lg font-black text-[#0B2341]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400">
                    03
                  </span>
                  {t.privacyModal.sections.dataPublication.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {t.privacyModal.sections.dataPublication.description}
                </p>
              </section>

              <section className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
                <h3 className="mb-4 text-base font-black text-[#0B2341]">
                  {t.privacyModal.sections.dpo.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">
                    <strong className="text-slate-700">
                      {t.privacyModal.sections.dpo.name}
                    </strong>{" "}
                    Victor Hugo Feitosa Lima Aragão
                  </p>
                  <p className="text-sm text-slate-500">
                    <strong className="text-slate-700">
                      {t.privacyModal.sections.dpo.phone}
                    </strong>{" "}
                    (81) 3182-8210
                  </p>
                  <p className="text-sm font-medium text-[#00AEEF]">
                    <strong className="font-bold text-slate-700">
                      {t.privacyModal.sections.dpo.email}
                    </strong>{" "}
                    victor.aragao@empetur.pe.gov.br
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center justify-between gap-4 border-t border-slate-100 bg-white p-6 md:flex-row">
          <span className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            {t.privacyModal.updated}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl bg-[#00AEEF] px-10 py-4 font-black uppercase tracking-widest text-white shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] transition-all duration-300 hover:bg-[#0B2341] hover:shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] active:scale-95 md:w-auto"
          >
            {t.privacyModal.confirm}
          </button>
        </div>
      </FadeIn>
    </div>
  );
}
