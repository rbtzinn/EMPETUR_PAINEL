import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, X } from 'lucide-react';

export default function BotaoSugestaoFlutuante({ onOpen }) {
    const [minimizado, setMinimizado] = useState(false);

    return (
        <>
            <style>{`
        /* VISUAL ORIGINAL */
        .hc-btn-flutuante-sugestao,
        .hc-tab-flutuante-sugestao {
          background-color: #fff;
          color: #0B2341;
          border: 2px solid #e2e8f0;
          box-shadow: 0 25px 50px -12px rgba(11, 35, 65, 0.08);
        }

        .hc-btn-flutuante-sugestao:hover,
        .hc-tab-flutuante-sugestao:hover {
          border-color: #00AEEF;
          color: #00AEEF;
        }

        /* ALTO CONTRASTE */
        body.contraste-negativo .hc-btn-flutuante-sugestao,
        body.contraste-negativo .hc-tab-flutuante-sugestao {
          background-color: transparent !important;
          color: #ffea00 !important;
          border: 1px solid #ffea00 !important;
          box-shadow: none !important;
        }

        body.contraste-negativo .hc-btn-flutuante-sugestao:hover,
        body.contraste-negativo .hc-tab-flutuante-sugestao:hover {
          background-color: #111 !important;
          color: #fff !important;
        }
      `}</style>

            <div className="fixed bottom-4 right-3 sm:bottom-6 z-[140]">
                {!minimizado ? (
                    <div className="pr-4 sm:pr-6">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onOpen}
                                type="button"
                                className="hc-btn-flutuante-sugestao h-12 w-12 sm:h-auto sm:w-auto px-0 sm:px-5 py-0 sm:py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-0 sm:gap-2.5 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/50"
                                title="Enviar uma sugestão de melhoria"
                                aria-label="Enviar uma sugestão de melhoria"
                            >
                                <Lightbulb className="w-5 h-5" />
                                <span className="hidden sm:inline">Sugerir Melhoria</span>
                            </button>

                            <button
                                onClick={() => setMinimizado(true)}
                                type="button"
                                className="hc-tab-flutuante-sugestao w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/50"
                                title="Recolher botão"
                                aria-label="Recolher botão de sugestão"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="translate-x-1/2 sm:translate-x-[55%] transition-transform duration-300">
                        <button
                            onClick={() => setMinimizado(false)}
                            className="hc-tab-flutuante-sugestao w-12 h-12 rounded-full flex items-center justify-start pl-2.5 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/50"
                            title="Abrir botão de sugestão"
                            aria-label="Abrir botão de sugestão"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}