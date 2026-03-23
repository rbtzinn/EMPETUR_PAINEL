import React, { useState, useRef, useEffect } from "react";

export default function DropdownPesquisavel({ label, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);

  // Fecha o dropdown automaticamente se o usuário clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm(""); // Limpa a busca ao fechar
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtra as opções com base no que o usuário digitou
  const filteredOptions = options.filter(opt => {
    const label = typeof opt === "string" ? opt : opt.label;
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full mb-5 relative" ref={wrapperRef}>
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 hc-text-destaque">
        {label}
      </label>

      {/* Container do Input */}
      <div className="relative w-full bg-slate-50 border border-slate-200 rounded-xl transition-all hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00AEEF] focus-within:border-transparent flex items-center shadow-sm hc-card">

        {/* ÍCONE DE LUPA */}
        <div className="absolute left-4 text-slate-400 pointer-events-none hc-text-destaque">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          className="w-full bg-transparent text-[#0B2341] text-sm font-bold pl-11 pr-12 py-3 outline-none cursor-text placeholder-slate-400 hc-text-destaque"
          placeholder={value ? value : "Pesquisar ou selecionar..."}
          value={isOpen ? searchTerm : (value || "")}
          onClick={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
        />

        {/* Botão de Limpar (X) */}
        {value && !isOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setSearchTerm("");
            }}
            className="absolute right-9 text-slate-400 hover:text-red-500 p-1 rounded-full transition-colors hc-text-destaque"
            title="Limpar seleção"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Ícone de Seta animado */}
        <div
          className={`absolute right-3 cursor-pointer p-1 hc-text-destaque ${isOpen ? 'text-[#00AEEF]' : 'text-slate-400'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* 🔴 Caixa da Lista Flutuante (agora blindada com hc-card) */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto scrollbar-moderna py-2 hc-card">

          <div
            className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer font-bold border-b border-slate-50 flex items-center gap-2 hc-tabela-linha hc-text-destaque"
            onClick={() => {
              onChange("");
              setIsOpen(false);
              setSearchTerm("");
            }}
          >
            <span className="text-[#00AEEF] hc-text-destaque">↺</span> Exibir Todos
          </div>

          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => {
              const label = typeof opt === "string" ? opt : opt.label;
              const val = typeof opt === "string" ? opt : opt.value;

              // 🔴 Lógica de Cores Normal x Alto Contraste
              // Usamos hc-tabela-linha para gerenciar o hover/fundo escuro e hc-text-destaque para forçar a cor forte no texto
              return (
                <div
                  key={idx}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors hc-tabela-linha hc-text-destaque ${
                    value === val
                      ? 'bg-blue-50 text-[#00AEEF] font-black' 
                      : 'text-[#0B2341] hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    onChange(val); 
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {label}
                </div>
              );
            })

          ) : (
            <div className="px-4 py-4 text-sm text-slate-400 text-center font-medium hc-text-destaque">
              Nenhum resultado para "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}