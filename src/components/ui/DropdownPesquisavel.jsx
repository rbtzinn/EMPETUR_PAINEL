import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DropdownPesquisavel({ label, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm(""); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => {
    const label = typeof opt === "string" ? opt : opt.label;
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full mb-5 relative" ref={wrapperRef}>
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 hc-text-destaque">
        {label}
      </label>

      <div className={`relative w-full bg-slate-50 border transition-all rounded-2xl flex items-center shadow-sm hc-card ${isOpen ? 'border-[#00AEEF] ring-4 ring-[#00AEEF]/10 bg-white' : 'border-slate-200 hover:bg-slate-100 hover:border-slate-300'}`}>
        
        <div className="absolute left-4 text-slate-400 pointer-events-none hc-text-destaque">
          <Search strokeWidth={2.5} className="w-4 h-4" />
        </div>

        <input
          type="text"
          className="w-full bg-transparent text-[#0B2341] text-sm font-bold pl-12 pr-14 py-3.5 outline-none cursor-text placeholder-slate-400 hc-text-destaque truncate"
          placeholder={value ? value : "Pesquisar ou selecionar..."}
          value={isOpen ? searchTerm : (value || "")}
          onClick={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
        />

        <div className="absolute right-3 flex items-center gap-1">
          {value && !isOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setSearchTerm("");
              }}
              className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors hc-text-destaque"
              title="Limpar seleção"
            >
              <X strokeWidth={2.5} className="w-4 h-4" />
            </button>
          )}

          <div
            className={`cursor-pointer p-1.5 rounded-full transition-colors hc-text-destaque ${isOpen ? 'text-[#00AEEF] bg-blue-50' : 'text-slate-400 hover:bg-slate-100'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDown strokeWidth={2.5} className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl max-h-64 overflow-y-auto scrollbar-moderna py-2 hc-card"
          >
            <div
              className="px-4 py-3 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer font-bold border-b border-slate-50 flex items-center gap-2 hc-tabela-linha hc-text-destaque transition-colors"
              onClick={() => {
                onChange("");
                setIsOpen(false);
                setSearchTerm("");
              }}
            >
              <RotateCcw strokeWidth={2.5} className="w-4 h-4 text-[#00AEEF] hc-text-destaque" />
              Exibir Todos
            </div>

            {filteredOptions.length > 0 ? (
              <div className="py-1">
                {filteredOptions.map((opt, idx) => {
                  const optLabel = typeof opt === "string" ? opt : opt.label;
                  const val = typeof opt === "string" ? opt : opt.value;

                  return (
                    <div
                      key={idx}
                      className={`px-4 py-3 text-sm cursor-pointer transition-colors hc-tabela-linha hc-text-destaque ${
                        value === val
                          ? 'bg-blue-50/50 text-[#00AEEF] font-black' 
                          : 'text-[#0B2341] hover:bg-slate-50 font-medium'
                      }`}
                      onClick={() => {
                        onChange(val); 
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      {optLabel}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-6 text-sm text-slate-400 text-center font-medium flex flex-col items-center justify-center gap-2 hc-text-destaque">
                <Search strokeWidth={1.5} className="w-6 h-6 text-slate-300" />
                Nenhum resultado para "{searchTerm}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}