import React from "react";

export default function AccessibilityButton({
  botaoPos,
  menuAberto,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClick,
}) {
  return (
    <div
      className="fixed z-[260]"
      style={{
        left: `${botaoPos.x}px`,
        top: `${botaoPos.y}px`,
      }}
    >
      <button
        type="button"
        aria-label="Abrir painel de acessibilidade"
        aria-expanded={menuAberto}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClick={onClick}
        // 🔴 Ajuste: h-10 w-10 no mobile, h-12 w-12 a partir do sm (tablet/desktop)
        className="flex h-10 w-10 sm:h-12 sm:w-12 touch-none select-none items-center justify-center rounded-xl sm:rounded-2xl border border-white/20 bg-[#0B2341] text-white shadow-2xl transition-colors hover:bg-[#00AEEF] cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/50"
      >
        {/* 🔴 Ajuste: Ícone menor no mobile (h-5 w-5) */}
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
        </svg>
      </button>
    </div>
  );
}