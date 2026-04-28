import React from "react";
import {
  X,
  Contrast,
  Type,
  Palette,
  Link2,
  ImageOff,
  RotateCcw,
  Settings2,
} from "lucide-react";
import ToggleCard from "./ToggleCard";
import ControlRow from "./ControlRow";

const controlesNumericos = [
  { id: "tamanhoFonte", label: "Tamanho da fonte", min: 80, max: 150 },
  { id: "espacamento", label: "Espacamento de letras", min: 100, max: 150 },
  { id: "alturaLinha", label: "Altura da linha", min: 100, max: 200 },
];

export default function AccessibilityPanel({
  menuAberto,
  setMenuAberto,
  config,
  atualizarConfig,
  ajustarNumero,
  redefinirTudo,
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Fechar painel de acessibilidade"
        tabIndex={menuAberto ? 0 : -1}
        className={`fixed inset-0 z-[201] cursor-default bg-[#0B2341]/35 transition-opacity duration-150 ${
          menuAberto
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuAberto(false)}
      />

      <aside
        aria-hidden={!menuAberto}
        className={`fixed right-0 top-0 z-[202] flex h-full w-[90%] max-w-sm flex-col overflow-hidden rounded-l-3xl bg-slate-50 shadow-xl transition-transform duration-150 ease-out ${
          menuAberto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative flex shrink-0 items-center justify-between overflow-hidden bg-[#0B2341] p-6 text-white">
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
              <Settings2
                size={20}
                strokeWidth={2.5}
                className="text-[#00AEEF]"
              />
            </div>
            <h2 className="text-sm font-black uppercase leading-tight tracking-widest text-white">
              Preferencias <br />
              <span className="text-[#00AEEF]">de Acessibilidade</span>
            </h2>
          </div>

          <button
            onClick={() => setMenuAberto(false)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-white/10 text-white/70 transition-colors hover:border-white/10 hover:bg-white/20 hover:text-white active:scale-95"
            aria-label="Fechar painel de acessibilidade"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="scrollbar-moderna flex-1 space-y-6 overflow-y-auto bg-white p-6">
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Ajustes Visuais
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <ToggleCard
                ativo={config.altoContraste}
                onClick={() =>
                  atualizarConfig("altoContraste", !config.altoContraste)
                }
                label="Alto Contraste"
                icon={<Contrast size={24} strokeWidth={2} />}
              />

              <ToggleCard
                ativo={config.fonteLegivel}
                onClick={() =>
                  atualizarConfig("fonteLegivel", !config.fonteLegivel)
                }
                label="Fonte Legivel"
                icon={<Type size={24} strokeWidth={2} />}
              />

              <ToggleCard
                ativo={config.escalaCinza}
                onClick={() =>
                  atualizarConfig("escalaCinza", !config.escalaCinza)
                }
                label="Escala de Cinza"
                icon={<Palette size={24} strokeWidth={2} />}
              />

              <ToggleCard
                ativo={config.destacarLinks}
                onClick={() =>
                  atualizarConfig("destacarLinks", !config.destacarLinks)
                }
                label="Destacar Links"
                icon={<Link2 size={24} strokeWidth={2} />}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Espacamento e Tamanho
            </h3>
            <div className="space-y-3">
              {controlesNumericos.map((item) => (
                <ControlRow
                  key={item.id}
                  label={item.label}
                  value={config[item.id]}
                  onDecrease={() =>
                    ajustarNumero(item.id, -10, item.min, item.max)
                  }
                  onIncrease={() =>
                    ajustarNumero(item.id, 10, item.min, item.max)
                  }
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Midia
            </h3>
            <ToggleCard
              ativo={config.ocultarImagens}
              onClick={() =>
                atualizarConfig("ocultarImagens", !config.ocultarImagens)
              }
              label="Ocultar Imagens"
              icon={<ImageOff size={24} strokeWidth={2} />}
            />
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-100 bg-slate-50 p-6">
          <button
            onClick={redefinirTudo}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-100 bg-white py-4 text-sm font-black uppercase tracking-widest text-red-500 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500/30"
          >
            <RotateCcw size={18} strokeWidth={2.5} />
            Restaurar Padroes
          </button>
        </div>
      </aside>
    </>
  );
}
