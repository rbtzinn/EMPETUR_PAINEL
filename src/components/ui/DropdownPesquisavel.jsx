import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ChevronDown, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

function DropdownPesquisavel({ label, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return options.filter((option) => {
      const optionLabel =
        typeof option === "string" ? option : option.label || option.value;
      return optionLabel.toLowerCase().includes(normalizedSearch);
    });
  }, [options, searchTerm]);

  const dropdownContent = (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-2 border-b border-slate-50 px-4 py-3 text-left text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50 hc-tabela-linha hc-text-destaque"
        onClick={() => {
          onChange("");
          setIsOpen(false);
          setSearchTerm("");
        }}
      >
        <RotateCcw
          strokeWidth={2.5}
          className="h-4 w-4 text-[#00AEEF] hc-text-destaque"
        />
        {t.common.showAll}
      </button>

      {filteredOptions.length > 0 ? (
        <div className="py-1">
          {filteredOptions.map((option) => {
            const optionLabel =
              typeof option === "string"
                ? option
                : option.label || option.value;
            const optionValue =
              typeof option === "string" ? option : option.value;

            return (
              <button
                key={String(optionValue)}
                type="button"
                className={`w-full px-4 py-3 text-left text-sm transition-colors hc-tabela-linha hc-text-destaque ${
                  value === optionValue
                    ? "bg-blue-50/50 font-black text-[#00AEEF]"
                    : "font-medium text-[#0B2341] hover:bg-slate-50"
                }`}
                onClick={() => {
                  onChange(optionValue);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-center text-sm font-medium text-slate-400 hc-text-destaque">
          <Search strokeWidth={1.5} className="h-6 w-6 text-slate-300" />
          {t.common.noResultsFor.replace("{term}", searchTerm)}
        </div>
      )}
    </>
  );

  return (
    <div
      className={`relative mb-5 w-full ${isOpen ? "z-[160]" : "z-10"}`}
      ref={wrapperRef}
    >
      <label className="block px-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 hc-text-destaque">
        {label}
      </label>

      <div
        className={`relative flex w-full items-center rounded-2xl border bg-slate-50 shadow-sm transition-all hc-card ${
          isOpen
            ? "border-[#00AEEF] bg-white ring-4 ring-[#00AEEF]/10"
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-100"
        }`}
      >
        <div className="pointer-events-none absolute left-4 text-slate-400 hc-text-destaque">
          <Search strokeWidth={2.5} className="h-4 w-4" />
        </div>

        <input
          type="text"
          className="w-full cursor-text truncate bg-transparent py-3.5 pl-12 pr-14 text-sm font-bold text-[#0B2341] outline-none placeholder-slate-400 hc-text-destaque"
          placeholder={value || t.common.searchOrSelect}
          value={isOpen ? searchTerm : value || ""}
          onClick={() => setIsOpen(true)}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setIsOpen(true);
          }}
        />

        <div className="absolute right-3 flex items-center gap-1">
          {value && !isOpen && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onChange("");
                setSearchTerm("");
              }}
              className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 hc-text-destaque"
              title={t.common.clear}
            >
              <X strokeWidth={2.5} className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            className={`rounded-full p-1.5 transition-colors hc-text-destaque ${
              isOpen
                ? "bg-blue-50 text-[#00AEEF]"
                : "text-slate-400 hover:bg-slate-100"
            }`}
            onClick={() => setIsOpen((open) => !open)}
          >
            <ChevronDown
              strokeWidth={2.5}
              className={`h-4 w-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 z-[160] mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-100 bg-white py-2 shadow-xl scrollbar-moderna hc-card"
          >
            {dropdownContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(DropdownPesquisavel);
