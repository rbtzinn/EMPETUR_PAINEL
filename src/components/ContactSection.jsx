import FadeIn from "./FadeIn";

export default function ContactSection({ id }) {
  const contacts = [
    { label: "E-mail Oficial", value: "contato@empetur.pe.gov.br", icon: "✉️", color: "bg-blue-50 text-blue-600" },
    { label: "Atendimento", value: "Segunda a Sexta • 08h às 17h", icon: "🕐", color: "bg-emerald-50 text-emerald-600" },
    { label: "Telefone", value: "+55 (81) 3182-8000", icon: "📞", color: "bg-purple-50 text-purple-600" },
    { label: "Localização", value: "Olinda - Pernambuco", icon: "📍", color: "bg-orange-50 text-orange-600" }
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-[#F8FAFC]" aria-label="Contato e informações">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Reduzi o rounded no mobile para ganhar espaço interno */}
        <FadeIn className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00AEEF]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0B2341]/5 rounded-full blur-3xl" />
          
          <div className="text-center mb-12 md:mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] mb-4 md:mb-6 tracking-tight">Contato e Suporte</h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Estamos à disposição para esclarecimentos sobre os dados e transparência das contratações.
            </p>
          </div>

          {/* Grid ajustado: 1 coluna no mobile, 2 no desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative z-10">
            {contacts.map((contact, index) => (
              <FadeIn key={index} delay={0.1 * index}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6 p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                  <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform ${contact.color}`}>
                    {contact.icon}
                  </div>
                  <div className="min-w-0 w-full">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{contact.label}</div>
                    {/* break-words é melhor que break-all para e-mails longos */}
                    <div className="text-sm md:text-base font-bold text-[#0B2341] break-words">
                      {contact.value}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}