import React from 'react';
import FadeIn from '../ui/FadeIn';

export default function InternalControlSection() {
  const steps = [
    {
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: "Monitoramento de Contratações",
      desc: "Monitoramos os fluxos de fomento e inexigibilidade para identificar e mitigar riscos, visando à conformidade legal das contratações artísticas perante a Lei das Estatais e demais normativos aplicáveis."
    },
    {
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      title: "Transparência Cultural",
      desc: "Orientamos os gestores na padronização de documentos e controles, promovendo a ética e a clareza na aplicação dos recursos nos eventos do estado."
    },
    {
      icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
      title: "Foco no Resultado Final",
      desc: "Monitoramos as recomendações de melhoria para fortalecer a Administração Pública, garantindo a eficiência operacional e a entrega ágil das festividades à sociedade."
    }
  ];

  return (
    <section id="gestao" className="py-24 bg-[#0B2341] text-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#00AEEF] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <FadeIn className="mb-12">
          <div className="bg-white/10 p-6 rounded-[2.5rem] backdrop-blur-md border border-white/10 shadow-2xl">
            <img src="images/controleinternologo.png" alt="AECI EMPETUR" className="h-20 md:h-24 object-contain filter brightness-0 invert" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 w-full">
          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={idx * 0.2}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full flex flex-col items-start backdrop-blur-sm group">
                <div className="w-14 h-14 rounded-2xl bg-[#00AEEF] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#00AEEF]/20 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Rodapé informativo discreto */}
        <FadeIn delay={0.8} className="mt-16 pt-8 border-t border-white/5 w-full text-center">
          <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
            Em conformidade com o Decreto Estadual nº 47.087/2019 e Lei nº 13.303/2016
          </p>
        </FadeIn>
      </div>
    </section>
  );
}