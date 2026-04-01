import React from 'react';
import FadeIn from '../ui/FadeIn';

export default function InternalControlSection() {
  const steps = [
    {
      icon: <svg className="w-8 h-8 hc-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: "Monitoramento de Contratações",
      desc: "Monitoramos os fluxos de fomento e inexigibilidade para identificar e mitigar riscos, visando à conformidade legal das contratações artísticas perante a Lei das Estatais e demais normativos aplicáveis."
    },
    {
      icon: <svg className="w-8 h-8 hc-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      title: "Transparência Cultural",
      desc: "Orientamos os gestores na padronização de documentos e controles, promovendo a ética e a clareza na aplicação dos recursos nos eventos do estado."
    },
    {
      icon: <svg className="w-8 h-8 hc-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
      title: "Foco no Resultado Final",
      desc: "Monitoramos as recomendações de melhoria para fortalecer a Administração Pública, garantindo a eficiência operacional e a entrega ágil das festividades à sociedade."
    }
  ];

  return (
    <section id="gestao" className="py-24 md:py-32 bg-[#0B2341] text-white relative overflow-hidden">
      
      <style>{`
        /* 🔴 Ocultar overlays no Alto Contraste */
        body.contraste-negativo .hc-gestao-glow { display: none !important; }
        
        /* 🔴 Cards pretos com borda amarela */
        body.contraste-negativo .hc-gestao-card { background: #000 !important; border: 2px solid #ffea00 !important; }
        
        /* 🔴 Círculos dos ícones ficam pretos com borda amarela e os SVGs ficam amarelos */
        body.contraste-negativo .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper .hc-icon { color: #ffea00 !important; }
      `}</style>

      {/* Background Glows */}
      <div className="hc-gestao-glow absolute top-0 right-0 w-[600px] h-[600px] bg-[#00AEEF] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="hc-gestao-glow absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00AEEF] rounded-full blur-[100px] opacity-10 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <FadeIn direction="down" className="mb-16">
          <div className="hc-gestao-card inline-flex items-center justify-center p-6 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md shadow-2xl mb-8">
            <img src="images/controleinternologo.png" alt="AECI EMPETUR" className="h-16 md:h-20 object-contain filter brightness-0 invert opacity-90" />
          </div>
        </FadeIn>

        <FadeIn staggerChildren={true} direction="none" className="grid md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {steps.map((step, idx) => (
            <FadeIn key={idx} direction="up" className="h-full">
              <div className="hc-gestao-card bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center text-center backdrop-blur-md group shadow-xl">
                <div className="hc-icon-wrapper w-16 h-16 rounded-2xl bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center mb-6 ring-1 ring-[#00AEEF]/50 group-hover:bg-[#00AEEF] group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <h4 className="text-xl md:text-2xl font-black mb-3 text-white tracking-tight hc-text-destaque">{step.title}</h4>
                <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base hc-text-desc">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </FadeIn>

        <FadeIn delay={0.6} className="mt-20 pt-8 border-t border-white/10 w-full max-w-3xl">
          <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold hc-text-desc">
            Em estrita conformidade com o Decreto Estadual nº 47.087/2019 e Lei nº 13.303/2016
          </p>
        </FadeIn>
      </div>
    </section>
  );
}