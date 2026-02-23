import FadeIn from "./FadeIn";

export default function Banner({ image }) {
    return (
        <section className="py-12 bg-[#F8FAFC] px-6">
            {/* Container Principal com fundo branco base e overflow-hidden para conter os glows */}
            <div className="max-w-7xl mx-auto rounded-[32px] overflow-hidden flex flex-col md:flex-row bg-white shadow-xl shadow-gray-100/50 border border-gray-100 relative">
                
                {/* --- O "FADEZINHO" DE CORES BEM LEVE (Glows Atmosféricos) --- */}
                
                {/* Glow 1: Luz Azul Institucional (Canto Superior Esquerdo) */}
                {/* Opacidade 4% (opacity-[0.04]) e Blur altíssimo (blur-[100px]) para ficar parecendo uma nuvem suave */}
                {/* <div className="absolute top-[-30%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#003399] opacity-[0.04] blur-[120px] pointer-events-none z-0" aria-hidden="true" /> */}
                
                {/* Glow 2: Luz Ciano para complementar (Centro-Direita) */}
                {/* <div className="absolute bottom-[-20%] right-[20%] w-[60%] h-[60%] rounded-full bg-[#00AEEF] opacity-[0.05] blur-[130px] pointer-events-none z-0" aria-hidden="true" /> */}

                {/* --- Conteúdo (z-10 garante que o texto fique NÍTIDO sobre o glow) --- */}
                <div className="p-10 md:p-16 flex-1 flex flex-col justify-center relative z-10">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight relative">
                            Consulta simples e direta
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium relative">
                            Encontre rapidamente <strong className="text-[#003399]">onde foi</strong>, <strong className="text-[#003399]">o que foi</strong> e <strong className="text-[#003399]">quando foi</strong>.
                            Use os filtros por <strong className="text-[#003399]">Ano</strong>, <strong className="text-[#003399]">Evento/Ciclo</strong> e <strong className="text-[#003399]">Município</strong>
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap gap-3 relative">
                            {["Ano", "Evento/Ciclo", "Município", "Credor/Artista", "Valor Pago"].map((chip, i) => (
                                /* Chips com fundo ligeiramente azulado para combinar com o glow */
                                <span key={i} className="px-4 py-2 rounded-lg bg-[#F0F7FF]/80 backdrop-blur-sm text-[#003399] text-sm font-bold tracking-wide border border-[#E6EEFF] shadow-sm">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* Imagem */}
                <div
                    className="w-full md:w-2/5 min-h-[300px] bg-cover bg-center relative z-10"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-hidden="true"
                >
                    {/* Suavização da imagem com o fundo branco */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:bg-gradient-to-l" />
                </div>
            </div>
        </section>
    );
}