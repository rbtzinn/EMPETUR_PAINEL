import FadeIn from "../ui/FadeIn";

export default function ContactSection({ id }) {
  const contacts = [
    { 
      id: "email",
      label: "E-mail Oficial", 
      value: "contato@empetur.pe.gov.br", 
      // SVG Limpo de E-mail
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      color: "bg-blue-50 text-blue-600" 
    },
    { 
      id: "phone",
      label: "Telefone", 
      value: "(81) 3182-8000", 
      // SVG Limpo de Telefone
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ), 
      color: "bg-purple-50 text-purple-600" 
    },
    { 
      id: "hours",
      label: "Atendimento", 
      value: "Segunda a Sexta • 08h às 17h", 
      subValue: "Finais de semana: Fechado",
      // SVG Limpo de Relógio
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: "bg-emerald-50 text-emerald-600" 
    },
    { 
      id: "location",
      label: "Localização", 
      value: "Centro de Convenções de PE", 
      subValue: "Av. Prof. Andrade Bezerra, S/N - Salgadinho, Olinda - PE, 53111-970",
      // SVG Limpo de Pino de Mapa
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      color: "bg-orange-50 text-orange-600" 
    }
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-[#F8FAFC]" aria-label="Contato e informações">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        <FadeIn className="hc-card bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00AEEF]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0B2341]/5 rounded-full blur-3xl" />
          
          <div className="text-center mb-12 md:mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] mb-4 md:mb-6 tracking-tight">
              Contato e Suporte
            </h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Estamos à disposição para esclarecimentos sobre os dados e transparência das contratações.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative z-10">
            {contacts.map((contact, index) => (
              <FadeIn key={contact.id} delay={0.1 * index}>
                
                <div className="hc-card relative group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6 p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all h-full">
                  
                  <div className={`hc-icon-wrapper w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${contact.color}`}>
                    {contact.icon}
                  </div>
                  
                  <div className="min-w-0 w-full flex-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                      {contact.label}
                    </div>
                    <div className="text-sm md:text-base font-bold text-[#0B2341] break-words">
                      {contact.value}
                    </div>
                    {contact.subValue && (
                      <div className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                        {contact.subValue}
                      </div>
                    )}
                  </div>

                  {contact.id === "location" && (
                    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 hidden md:flex flex-col items-center z-50 translate-y-2 group-hover:translate-y-0">
                      
                      <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white w-full hc-card">
                        <img 
                          src="/images/centro-de-convencoes.png"
                          alt="Centro de Convenções de Pernambuco" 
                          className="w-full h-32 object-cover hc-inverter-logo" 
                        />
                        <div className="bg-[#0B2341] text-white text-[10px] uppercase tracking-widest font-black text-center py-2">
                          Sede da Empetur
                        </div>
                      </div>
                      
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white -mt-[1px] drop-shadow-md"></div>
                      
                    </div>
                  )}

                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}