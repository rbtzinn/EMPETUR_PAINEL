import FadeIn from "./FadeIn";

export default function ContactSection({ id }) {
  const contacts = [
    { label: "E-mail Oficial", value: "XXXXXXXXXX@empetur.pe.gov.br", icon: "✉️" },
    { label: "Horário de Atendimento", value: "Segunda a Sexta • 08h às 17h", icon: "🕐" },
    { label: "Telefone", value: "+55 (XX) XXXX-XXXX", icon: "📞" },
    { label: "Endereço", value: "Av. XXXXXX, XXXX - XXXXXX, Recife - PE", icon: "📍" }
  ];

  return (
    <section id={id} className="py-24 bg-slate-50" aria-label="Contato e informações">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-gray-200/50 border border-gray-100 text-center relative overflow-hidden">
          
          {/* Decoração sutil no fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contato e Informações</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Entre em contato para esclarecimentos, sugestões ou solicitação de 
            informações adicionais sobre os dados apresentados.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {contacts.map((contact, index) => (
              <FadeIn key={index} delay={0.1 * index} direction="up">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-gray-100 hover:border-blue-200 transition-all group">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center text-xl shadow-sm group-hover:-translate-y-1 transition-transform">
                    {contact.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">{contact.label}</div>
                    <div className="text-sm text-gray-600">{contact.value}</div>
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