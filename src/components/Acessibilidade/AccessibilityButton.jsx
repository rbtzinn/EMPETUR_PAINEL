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
        className="flex h-12 w-12 touch-none select-none items-center justify-center rounded-2xl border border-white/20 bg-[#0B2341] text-white shadow-2xl transition-colors hover:bg-[#00AEEF] cursor-grab active:cursor-grabbing"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
        </svg>
      </button>
    </div>
  );
}