import React from "react";

export default function TopbarBrand({ scrolled, onOpenModal, transparency, officialPanel }) {
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <button
        type="button"
        onClick={onOpenModal}
        className="flex items-center rounded-lg outline-none transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
      >
        <img
          src="/images/empeturlogobranca.png"
          alt="EMPETUR"
          className={`w-auto transition-all duration-300 ${
            scrolled ? "h-10 sm:h-12" : "h-12 sm:h-14"
          }`}
        />
      </button>

      <div className="hidden h-8 w-[1px] bg-white/20 sm:block" />

      <div className="hidden flex-col xs:flex hc-topbar-text">
        <span className="text-[10px] font-black uppercase leading-tight tracking-tight text-white hc-topbar-text sm:text-[11px]">
          {transparency}
        </span>
        <span className="text-[8px] font-bold uppercase leading-tight tracking-[0.2em] text-[#00AEEF] hc-topbar-text sm:text-[9px]">
          {officialPanel}
        </span>
      </div>
    </div>
  );
}
