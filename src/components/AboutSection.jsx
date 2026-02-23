import FadeIn from "./FadeIn";

export default function AboutSection({ id }) {
    return (
        <section id={id} className="py-24 bg-white" aria-label="Sobre o painel">
            <div className="max-w-7xl mx-auto px-6">
                <FadeIn className="max-w-2xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sobre este painel</h2>
                    <p className="text-lg text-gray-600">
                        Uma página simples para consultar contratações artísticas por <strong className="text-gray-900">ano</strong>, <strong className="text-gray-900">evento</strong> e <strong className="text-gray-900">município</strong>.
                    </p>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-8">
                    <FadeIn delay={0.1}>
                        <div className="h-full p-8 md:p-10 rounded-3xl bg-slate-50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">O que você encontra aqui</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Este painel reúne, em um só lugar, informações para responder de forma rápida:
                                <strong className="text-gray-900"> onde foi</strong>, <strong className="text-gray-900">o que foi</strong> e <strong className="text-gray-900">quando foi</strong>.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="h-full p-8 md:p-10 rounded-3xl bg-slate-50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🔄</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fonte e atualização</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Os dados são importados de planilhas padronizadas do sistema oficial (eFisco).
                                O painel é <strong className="text-gray-900">somente leitura</strong> para o público: a inclusão e manutenção
                                das informações é realizada apenas por usuários autorizados.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}