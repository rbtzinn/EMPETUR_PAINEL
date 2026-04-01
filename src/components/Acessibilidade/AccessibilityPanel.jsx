import React from "react";
import { 
  X, 
  Contrast, 
  Type, 
  Palette, 
  Link2, 
  ImageOff, 
  RotateCcw,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      {menuAberto && (
        <>
          {/* Backdrop com Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[201] bg-[#0B2341]/40 backdrop-blur-sm"
            onClick={() => setMenuAberto(false)}
          />

          {/* Painel Lateral Sliding */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-[202] flex h-full w-[90%] max-w-sm flex-col bg-slate-50 shadow-2xl overflow-hidden rounded-r-[2rem]"
          >
            {/* Header do Painel */}
            <div className="flex items-center justify-between bg-[#0B2341] p-6 text-white shrink-0 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#00AEEF]/20 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                  <Settings2 size={20} strokeWidth={2.5} className="text-[#00AEEF]" />
                </div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white leading-tight">
                  Preferências <br/>
                  <span className="text-[#00AEEF]">de Acessibilidade</span>
                </h2>
              </div>

              <button
                onClick={() => setMenuAberto(false)}
                className="relative z-10 flex w-10 h-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white active:scale-95 border border-transparent hover:border-white/10"
                aria-label="Fechar painel de acessibilidade"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Corpo do Painel (Scrollável) */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6 scrollbar-moderna bg-white">
              
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ajustes Visuais</h3>
                <div className="grid grid-cols-2 gap-3">
                  <ToggleCard
                    ativo={config.altoContraste}
                    onClick={() => atualizarConfig("altoContraste", !config.altoContraste)}
                    label="Alto Contraste"
                    icon={<Contrast size={24} strokeWidth={2} />}
                  />

                  <ToggleCard
                    ativo={config.fonteLegivel}
                    onClick={() => atualizarConfig("fonteLegivel", !config.fonteLegivel)}
                    label="Fonte Legível"
                    icon={<Type size={24} strokeWidth={2} />}
                  />

                  <ToggleCard
                    ativo={config.escalaCinza}
                    onClick={() => atualizarConfig("escalaCinza", !config.escalaCinza)}
                    label="Escala de Cinza"
                    icon={<Palette size={24} strokeWidth={2} />}
                  />

                  <ToggleCard
                    ativo={config.destacarLinks}
                    onClick={() => atualizarConfig("destacarLinks", !config.destacarLinks)}
                    label="Destacar Links"
                    icon={<Link2 size={24} strokeWidth={2} />}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Espaçamento e Tamanho</h3>
                <div className="space-y-3">
                  {controlesNumericos.map((item) => (
                    <ControlRow
                      key={item.id}
                      label={item.label}
                      value={config[item.id]}
                      onDecrease={() => ajustarNumero(item.id, -10, item.min, item.max)}
                      onIncrease={() => ajustarNumero(item.id, 10, item.min, item.max)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mídia</h3>
                <ToggleCard
                  ativo={config.ocultarImagens}
                  onClick={() => atualizarConfig("ocultarImagens", !config.ocultarImagens)}
                  label="Ocultar Imagens"
                  icon={<ImageOff size={24} strokeWidth={2} />}
                />
              </div>

            </div>

            {/* Rodapé Fixo */}
            <div className="border-t border-slate-100 bg-slate-50 p-6 shrink-0">
              <button
                onClick={redefinirTudo}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-100 bg-white py-4 text-sm font-black uppercase tracking-widest text-red-500 shadow-sm transition-all hover:bg-red-50 hover:border-red-200 active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-red-500/30"
              >
                <RotateCcw size={18} strokeWidth={2.5} />
                Restaurar Padrões
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}