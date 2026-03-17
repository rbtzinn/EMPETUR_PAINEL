import React, { useState } from "react";
import FadeIn from "../ui/FadeIn";
import GovernancaModal from "../ui/GovernancaModal";

export default function AboutSection({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id={id} className="py-24 bg-white relative" aria-label="Sobre o painel">
            <GovernancaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="max-w-7xl mx-auto px-6">
                <FadeIn className="max-w-2xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0B2341] mb-4">Sobre este painel</h2>
                    <p className="text-lg text-slate-500">
                        Uma página simples e direta para consultar as contratações artísticas de Pernambuco por <strong className="text-[#0B2341]">ano</strong>, <strong className="text-[#0B2341]">evento</strong> e <strong className="text-[#0B2341]">município</strong>.
                    </p>
                </FadeIn>

                <div className="grid lg:grid-cols-3 gap-8">
                    <FadeIn delay={0.1} className="h-full">
                        <div className="h-full p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col hc-card">
                            <div className="hc-icon-wrapper w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {/* SVG Alvo */}
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                                    <circle cx="12" cy="12" r="6" strokeWidth={2} />
                                    <circle cx="12" cy="12" r="2" strokeWidth={2} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#0B2341] mb-4">O que você encontra aqui</h3>
                            <p className="text-slate-600 leading-relaxed text-sm flex-1">
                                Este painel reúne, em um só lugar, informações para responder de forma rápida:
                                <strong className="text-[#0B2341]"> onde foi</strong>, <strong className="text-[#0B2341]">o que foi</strong> e <strong className="text-[#0B2341]">quando foi</strong>.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2} className="h-full">
                        <div className="h-full p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col hc-card">
                            <div className="hc-icon-wrapper w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {/* SVG Sincronização */}
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#0B2341] mb-4">Fonte e atualização</h3>
                            <p className="text-slate-600 leading-relaxed text-sm flex-1">
                                Os dados são extraídos diretamente do sistema oficial do Governo (<strong className="text-[#0B2341]">e-Fisco PE</strong>) 
                                e passam por uma <strong className="text-[#0B2341]">atualização mensal</strong>.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3} className="h-full">
                        <div className="h-full p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group flex flex-col hc-card">
                            <div className="hc-icon-wrapper w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {/* SVG Escudo */}
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#0B2341] mb-4">Sanidade dos Dados</h3>
                            <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-1">
                                Nosso sistema utiliza um algoritmo que automaticamente ignora empenhos zerados e consolida nomes.
                            </p>
                            
                            <button onClick={() => setIsModalOpen(true)} className="hc-botao-borda mt-auto w-full py-3 px-4 rounded-xl border-2 border-[#0B2341] text-[#0B2341] font-bold text-xs uppercase tracking-widest hover:bg-[#0B2341] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2">
                                Entenda o Processo
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}