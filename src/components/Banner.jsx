import FadeIn from "./FadeIn";

export default function Banner({ image }) {
    return (
        <section className="py-16 bg-[#F8FAFC] px-6">
            <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden flex flex-col md:flex-row bg-white shadow-2xl shadow-blue-900/5 border border-slate-100 relative">
                
                {/* Conteúdo */}
                <div className="p-12 md:p-20 flex-1 flex flex-col justify-center relative z-10">
                    <FadeIn>
                        <div className="w-12 h-1.5 bg-[#00AEEF] mb-8 rounded-full" />
                        <h2 className="text-4xl md:text-5xl font-black text-[#0B2341] mb-8 tracking-tight">
                            Consulta simples <br/>e direta
                        </h2>
                        <p className="text-slate-500 text-lg mb-10 leading-relaxed font-light max-w-lg">
                            Encontre rapidamente <strong className="text-[#0B2341] font-bold">onde foi</strong>, <strong className="text-[#0B2341] font-bold">o que foi</strong> e <strong className="text-[#0B2341] font-bold">quando foi</strong> através dos nossos filtros inteligentes.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap gap-3">
                            {["Ano", "Evento/Ciclo", "Município", "Credor/Artista", "Valor Pago"].map((chip, i) => (
                                <span key={i} className="px-5 py-2.5 rounded-xl bg-slate-50 text-[#0B2341] text-xs font-bold tracking-wider border border-slate-100 shadow-sm hover:bg-white hover:border-[#00AEEF]/30 transition-all cursor-default">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* Imagem com Máscara Suave */}
                <div
                    className="w-full md:w-2/5 min-h-[400px] bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    {/* Overlay para mesclar a imagem com o design lateral */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
                </div>
            </div>
        </section>
    );
}