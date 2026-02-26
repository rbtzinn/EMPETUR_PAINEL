import FadeIn from "./FadeIn";

export default function ContactSection({ id }) {
  const contacts = [
    { 
      id: "email",
      label: "E-mail Oficial", 
      value: "contato@empetur.pe.gov.br", 
      icon: "✉️", 
      color: "bg-blue-50 text-blue-600" 
    },
    { 
      id: "phone",
      label: "Telefone", 
      value: "(81) 3182-8000", 
      icon: "📞", 
      color: "bg-purple-50 text-purple-600" 
    },
    { 
      id: "hours",
      label: "Atendimento", 
      value: "Segunda a Sexta • 08h às 17h", 
      subValue: "Finais de semana: Fechado",
      icon: "🕐", 
      color: "bg-emerald-50 text-emerald-600" 
    },
    { 
      id: "location",
      label: "Localização", 
      value: "Centro de Convenções de PE", 
      subValue: "Av. Prof. Andrade Bezerra, S/N - Salgadinho, Olinda - PE, 53111-970",
      icon: "📍", 
      color: "bg-orange-50 text-orange-600" 
    }
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-[#F8FAFC]" aria-label="Contato e informações">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <FadeIn className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden">
          
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
                {/* Adicionado 'relative' e 'group' para controlar o hover da imagem */}
                <div className="relative group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6 p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all h-full">
                  
                  <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform ${contact.color}`}>
                    {contact.icon}
                  </div>
                  
                  <div className="min-w-0 w-full flex-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                      {contact.label}
                    </div>
                    <div className="text-sm md:text-base font-bold text-[#0B2341] break-words">
                      {contact.value}
                    </div>
                    {/* Renderiza o subValue se existir (para o endereço longo e os dias fechados) */}
                    {contact.subValue && (
                      <div className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                        {contact.subValue}
                      </div>
                    )}
                  </div>

                  {/* MINIATURA FLUTUANTE (Aparece apenas no hover da Localização e apenas no Desktop) */}
                  {contact.id === "location" && (
                    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 hidden md:flex flex-col items-center z-50 translate-y-2 group-hover:translate-y-0">
                      
                      <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white w-full">
                        {/* Você pode trocar esse link por uma imagem local como "/images/cecon.jpg" */}
                        <img 
                          src="/images/centro-de-convencoes.png"
                          alt="Centro de Convenções de Pernambuco" 
                          className="w-full h-32 object-cover" 
                        />
                        <div className="bg-[#0B2341] text-white text-[10px] uppercase tracking-widest font-black text-center py-2">
                          Sede da Empetur
                        </div>
                      </div>
                      
                      {/* Triângulo apontando para baixo criando o efeito de balão */}
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