import React, { useEffect, useRef, useState } from "react";

const InfoTooltip = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible]);

  return (
    <div className="group relative inline-block" ref={tooltipRef}>
      <button
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        className="cursor-help p-1 text-slate-300 transition-colors duration-300 hover:text-[#00AEEF] focus:outline-none"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <div
        className={`pointer-events-none absolute right-full top-0 mr-3 w-48 rounded-xl border border-white/10 bg-[#0B2341] p-3 text-center text-[10px] font-bold leading-relaxed text-white shadow-2xl transition-all duration-300 z-[100] ${
          isVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {text}
        <div className="absolute top-2 -right-2 border-8 border-transparent border-l-[#0B2341]" />
      </div>
    </div>
  );
};

export default InfoTooltip;
