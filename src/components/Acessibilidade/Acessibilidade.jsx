import { useState } from "react";
import { useDraggableButton } from "./hooks/useDraggableButton";
import { useAccessibilityConfig } from "./hooks/useAccessibilityConfig";
import AccessibilityButton from "./AccessibilityButton";
import AccessibilityPanel from "./AccessibilityPanel";

export default function Acessibilidade() {
  const [menuAberto, setMenuAberto] = useState(false);

  const {
    botaoPos,
    ignorarCliqueRef,
    iniciarArraste,
    moverArraste,
    finalizarArraste,
  } = useDraggableButton();

  const {
    config,
    carregando,
    atualizarConfig,
    ajustarNumero,
    redefinirTudo,
  } = useAccessibilityConfig();

  return (
    <>
      {carregando && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-xl bg-white px-6 py-4 shadow-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#0B2341]">
              Aplicando...
            </span>
          </div>
        </div>
      )}

      {/* 🔴 AQUI ESTÁ A MÁGICA: O botão só renderiza se o menu estiver FECHADO */}
      {!menuAberto && (
        <AccessibilityButton
          botaoPos={botaoPos}
          menuAberto={menuAberto}
          onPointerDown={iniciarArraste}
          onPointerMove={moverArraste}
          onPointerUp={finalizarArraste}
          onPointerCancel={finalizarArraste}
          onClick={() => {
            if (ignorarCliqueRef.current) return;
            setMenuAberto((prev) => !prev);
          }}
        />
      )}

      <AccessibilityPanel
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
        config={config}
        atualizarConfig={atualizarConfig}
        ajustarNumero={ajustarNumero}
        redefinirTudo={redefinirTudo}
      />
    </>
  );
}