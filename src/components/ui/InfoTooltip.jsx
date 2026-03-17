import React, { useState, useEffect, useRef } from 'react';

const InfoTooltip = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  // Fecha o tooltip se clicar fora dele (importante para mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group relative inline-block" ref={tooltipRef}>
      {/* Botão de Informação com suporte a clique e hover */}
      <button 
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="cursor-help text-slate-300 hover:text-[#00AEEF] transition-colors duration-300 p-1 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Balão de Texto: Visível no hover (desktop) ou no click (mobile) */}
      <div className={`
        absolute top-0 right-full mr-3 w-48 p-3 bg-[#0B2341] text-white text-[10px] font-bold rounded-xl 
        transition-all duration-300 pointer-events-none z-[100] shadow-2xl text-center leading-relaxed border border-white/10
        ${isVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
      `}>
        {text}
        <div className="absolute top-2 -right-2 border-8 border-transparent border-l-[#0B2341]" />
      </div>
    </div>
  );
};

export default InfoTooltip;