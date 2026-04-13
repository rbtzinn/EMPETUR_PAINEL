import React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const LANGUAGES = ["pt", "en"];

export default function LanguageSwitcher({
  className = "",
  theme = "dark",
}) {
  const { language, setLanguage, t } = useLanguage();

  const containerClass =
    theme === "light"
      ? "bg-slate-100 text-slate-600 border-slate-200"
      : "bg-white/10 text-white/80 border-white/10";

  const activeClass =
    theme === "light"
      ? "bg-white text-[#0B2341] shadow-sm"
      : "bg-[#00AEEF] text-white shadow-[0_4px_14px_0_rgba(0,174,239,0.3)]";

  const inactiveClass =
    theme === "light"
      ? "hover:bg-white/80 hover:text-[#0B2341]"
      : "hover:bg-white/10 hover:text-white";

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border p-1 ${containerClass} ${className}`}
      role="group"
      aria-label={t.languageSwitcher.label}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full">
        <Languages size={15} strokeWidth={2.3} />
      </span>

      {LANGUAGES.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
            language === option ? activeClass : inactiveClass
          }`}
          aria-pressed={language === option}
        >
          {t.languageSwitcher.options[option]}
        </button>
      ))}
    </div>
  );
}
