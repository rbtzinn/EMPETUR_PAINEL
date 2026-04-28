import React, { memo, useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import DownloadDictionaryModal from "../ui/DownloadDictionaryModal";
import { useLanguage } from "../../contexts/LanguageContext";

const GlossaryItem = memo(function GlossaryItem({
  index,
  isOpen,
  onToggle,
  title,
  description,
}) {
  return (
    <FadeIn delay={index * 0.08}>
      <div
        className={`overflow-hidden rounded-[1.5rem] border transition-all duration-300 ${
          isOpen
            ? "border-slate-200 bg-slate-50 shadow-lg shadow-slate-200/50"
            : "border-slate-100 bg-white hover:border-slate-300"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF]/20 md:p-8"
        >
          <h3
            className={`text-lg font-bold transition-colors md:text-xl ${
              isOpen ? "text-[#00AEEF]" : "text-[#0B2341]"
            }`}
          >
            {title}
          </h3>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              isOpen
                ? "rotate-180 bg-[#00AEEF] text-white shadow-md"
                : "bg-slate-100 text-slate-400 hover:bg-slate-200"
            }`}
          >
            <ChevronDown strokeWidth={2.5} size={20} />
          </div>
        </button>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-6 pb-8 text-sm leading-relaxed text-slate-500 md:px-8 md:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
});

export default function GlossarySection({ id = "glossario" }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section
      id={id}
      className="relative bg-white py-24"
      aria-label={t.glossary.aria}
    >
      <DownloadDictionaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="mx-auto max-w-5xl px-6">
        <FadeIn className="mb-16 text-center md:mb-20">
          <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-[#00AEEF]" />
          <h2 className="mb-4 max-w-full text-2xl font-black tracking-tight text-[#0B2341] [overflow-wrap:anywhere] sm:text-3xl md:text-5xl">
            {t.glossary.title}
          </h2>
          <p className="text-base font-light leading-7 text-slate-500 sm:text-lg">
            {t.glossary.description}
          </p>
        </FadeIn>

        <div className="flex flex-col gap-5">
          {t.glossary.terms.map((term, index) => (
            <GlossaryItem
              key={term.title}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
              title={term.title}
              description={term.description}
            />
          ))}
        </div>

        <FadeIn delay={0.4} className="mt-16 md:mt-24">
          <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[2.25rem] bg-[#0B2341] p-8 shadow-[0_24px_60px_-40px_rgba(11,35,65,0.55)] md:p-10 lg:flex-row lg:items-end">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00AEEF]/10 blur-3xl" />

            <div className="relative z-10 max-w-2xl text-center lg:text-left">
              <h3 className="mb-3 max-w-full text-2xl font-black tracking-tight text-white [overflow-wrap:anywhere] md:text-3xl">
                {t.glossary.dictionaryTitle}
              </h3>
              <p className="text-sm font-light leading-7 text-slate-400 md:text-base">
                {t.glossary.dictionaryDescription}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 flex w-full shrink-0 items-center justify-center gap-3 rounded-2xl bg-[#00AEEF] px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] transition-all duration-300 hover:bg-white hover:text-[#0B2341] active:scale-95 lg:w-auto"
            >
              <FileText strokeWidth={2.5} size={18} />
              {t.glossary.dictionaryButton}
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
