import ToggleCard from "./ToggleCard";
import ControlRow from "./ControlRow";

const controlesNumericos = [
  { id: "tamanhoFonte", label: "Tamanho da fonte", min: 80, max: 150 },
  { id: "espacamento", label: "Espaçamento de letras", min: 100, max: 150 },
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
      {menuAberto && (
        <div
          className="fixed inset-0 z-[201] bg-black/40"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 z-[202] flex h-full w-80 transform flex-col bg-slate-50 shadow-2xl transition-transform duration-300 sm:w-96 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-[#0B2341] p-5 text-white shadow-md">
          <h2 className="text-sm font-bold tracking-wide">
            Preferências de Acessibilidade
          </h2>

          <button
            onClick={() => setMenuAberto(false)}
            className="rounded-full bg-white/10 p-1.5 transition-colors hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-3">
            <ToggleCard
              ativo={config.altoContraste}
              onClick={() =>
                atualizarConfig("altoContraste", !config.altoContraste)
              }
              label="Alto Contraste"
              icon={<span className="text-lg">◐</span>}
            />

            <ToggleCard
              ativo={config.fonteLegivel}
              onClick={() =>
                atualizarConfig("fonteLegivel", !config.fonteLegivel)
              }
              label="Fonte Legível"
              icon={<span className="text-2xl font-black">T</span>}
            />

            <ToggleCard
              ativo={config.escalaCinza}
              onClick={() =>
                atualizarConfig("escalaCinza", !config.escalaCinza)
              }
              label="Escala de Cinza"
              icon={<span className="text-lg">▥</span>}
            />

            <ToggleCard
              ativo={config.destacarLinks}
              onClick={() =>
                atualizarConfig("destacarLinks", !config.destacarLinks)
              }
              label="Destacar Links"
              icon={<span className="text-lg">🔗</span>}
            />
          </div>

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

          <ToggleCard
            ativo={config.ocultarImagens}
            onClick={() =>
              atualizarConfig("ocultarImagens", !config.ocultarImagens)
            }
            label="Ocultar Imagens"
            icon={<span className="text-lg">🖼️</span>}
          />
        </div>

        <div className="border-t border-slate-200 bg-white p-5">
          <button
            onClick={redefinirTudo}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-500 py-3 font-bold text-red-600 transition-colors hover:bg-red-50"
          >
            Redefinir Padrões
          </button>
        </div>
      </div>
    </>
  );
}