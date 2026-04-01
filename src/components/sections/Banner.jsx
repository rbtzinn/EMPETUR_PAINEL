import React from "react";
import FadeIn from "../ui/FadeIn";

export default function Banner({ image }) {
    return (
        <section className="py-10 sm:py-16 bg-[#F8FAFC] px-4 md:px-6">
            <style>{`
                /* BLINDAGEM ALTO CONTRASTE */
                body.contraste-negativo .hc-banner-container { background: #000 !important; border: 2px solid #ffea00 !important; box-shadow: none !important; }
                body.contraste-negativo .hc-banner-gradient { display: none !important; }
                body.contraste-negativo .hc-banner-chip { background: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
            `}</style>

            <div className="hc-banner-container max-w-7xl mx-auto rounded-3xl sm:rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row bg-[#0B2341] shadow-2xl relative">
                
                <div className="hc-banner-gradient absolute inset-y-0 right-0 w-full md:w-2/3 lg:w-3/4 z-0">
                    <img 
                        src={image} 
                        alt="Público em evento cultural" 
                        className="w-full h-full object-cover object-center opacity-40 sm:opacity-60 md:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B2341] via-[#0B2341]/90 to-[#0B2341]/0"></div>
                </div>

                <div className="p-6 sm:p-10 md:p-16 lg:p-20 md:pr-0 w-full md:w-[65%] lg:w-1/2 flex flex-col justify-center relative z-20">
                    <FadeIn>
                        <div className="hc-banner-gradient w-8 sm:w-12 h-1 sm:h-1.5 bg-[#00AEEF] mb-4 sm:mb-6 md:mb-8 rounded-full shadow-[0_0_15px_rgba(0,174,239,0.5)]" />
                        
                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-6 md:mb-8 tracking-tight leading-[1.1] hc-text-destaque">
                            Consulta simples <br/>e rápida.
                        </h2>
                        
                        <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed font-light max-w-md hc-text-desc">
                           Encontre rapidamente <strong className="text-white font-bold">onde foi</strong>, <strong className="text-white font-bold">o que foi</strong> e <strong className="text-white font-bold">quando foi</strong> através dos nossos filtros inteligentes.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                            {["Ano", "Ciclo Festivo", "Município", "Artista/Banda", "Valor Pago"].map((chip, i) => (
                                <span 
                                    key={i} 
                                    className="hc-banner-chip px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md text-white text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest uppercase border border-white/10 hover:bg-white/20 transition-all cursor-default"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}