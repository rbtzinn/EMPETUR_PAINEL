import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, FileSearch, MessageSquareWarning, BarChart3, Check } from "lucide-react";
import FadeIn from "../ui/FadeIn";

export default function ContactSection({ id }) {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("(81) 3182-8000");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const contacts = [
    {
      id: "email", label: "E-mail Oficial", value: "empetur@empetur.pe.gov.br", subValue: "Clique para enviar e-mail",
      color: "bg-blue-50 text-blue-600", link: "mailto:empetur@empetur.pe.gov.br", icon: <Mail strokeWidth={2} size={24} className="lucide" />
    },
    {
      id: "phone", label: copiedPhone ? "Copiado!" : "Telefone", value: "(81) 3182-8000", subValue: copiedPhone ? "Salvo na área de transferência" : "Clique para copiar",
      color: copiedPhone ? "bg-green-100 text-green-600" : "bg-purple-50 text-purple-600", action: handleCopyPhone, icon: copiedPhone ? <Check strokeWidth={2.5} size={24} className="lucide" /> : <Phone strokeWidth={2} size={24} className="lucide" />
    },
    {
      id: "hours", label: "Atendimento", value: "Segunda a Sexta • 08h às 17h", subValue: "Finais de semana: Fechado",
      color: "bg-emerald-50 text-emerald-600", link: "https://www.empetur.pe.gov.br/", icon: <Clock strokeWidth={2} size={24} className="lucide" />
    },
    {
      id: "location", label: "Localização", value: "Sede EMPETUR - Olinda/PE", subValue: "Ver no Google Maps",
      color: "bg-orange-50 text-orange-600", link: "https://maps.google.com/?q=EMPETUR", icon: <MapPin strokeWidth={2} size={24} className="lucide" />
    },
    {
      id: "esic", label: "Acesso à Informação", value: "Portal e-SIC PE", subValue: "Solicite dados não disponíveis",
      color: "bg-teal-50 text-teal-600", link: "https://transparencia.pe.gov.br/participacao-cidada-pe/acesso-a-informacao/", icon: <FileSearch strokeWidth={2} size={24} className="lucide" />
    },
    {
      id: "ouvidoria", label: "Ouvidoria Geral", value: "Manifestações e Denúncias", subValue: "Registre sua reclamação",
      color: "bg-rose-50 text-rose-600", link: "https://www.ouvidoria.pe.gov.br/", icon: <MessageSquareWarning strokeWidth={2} size={24} className="lucide" />
    },
    {
      id: "observatorio", label: "Dados Turísticos", value: "Observatório de Turismo", subValue: "Acesse pesquisas e boletins",
      color: "bg-indigo-50 text-indigo-600", link: "https://www.empetur.pe.gov.br/institucional/observatorio-do-turismo", icon: <BarChart3 strokeWidth={2} size={24} className="lucide" />
    }
  ];

  return (
    <section id={id} className="py-24 md:py-32 bg-[#F8FAFC]" aria-label="Contato e informações">
      <style>{`
        /* 🔴 Ícones amarelos com FUNDO PRETO no contraste negativo */
        body.contraste-negativo #contato .hc-icon-wrapper {
          background-color: #000 !important;
          border: 1px solid #ffea00 !important;
        }
        body.contraste-negativo #contato .hc-card .lucide {
          color: #ffea00 !important;
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <FadeIn className="hc-card bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 lg:p-24 shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">

          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00AEEF]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#0B2341]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-16 md:mb-20 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] mb-5 tracking-tight hc-text-destaque">Canais de Contato</h2>
            <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed hc-text-desc">
              Exerça sua cidadania. Acesse os canais oficiais da EMPETUR para esclarecimentos, denúncias ou solicitações da Lei de Acesso à Informação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 relative z-10">
            {contacts.map((contact, index) => {
              const isLastOdd = index === contacts.length - 1 && contacts.length % 3 !== 0;

              // 🔴 Comentário alterado para JS padrão fora dos parênteses
              // Tailwind: items-center text-center no mobile, sm:items-start sm:text-left no desktop
              const CardContent = (
                <div className={`hc-card group flex flex-col p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 h-full items-center text-center sm:items-start sm:text-left ${contact.id === 'phone' && copiedPhone ? 'ring-2 ring-green-400 bg-white' : ''}`}>
                  <div className={`hc-icon-wrapper w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform ${contact.color}`}>
                    {contact.icon}
                  </div>
                  <div className="w-full">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 hc-text-destaque">{contact.label}</div>
                    <div className="text-base font-bold text-[#0B2341] group-hover:text-[#00AEEF] transition-colors mb-1 hc-text-destaque">{contact.value}</div>
                    {contact.subValue && <div className={`text-xs font-medium ${contact.id === 'phone' && copiedPhone ? 'text-green-600' : 'text-slate-500'} hc-text-desc`}>{contact.subValue}</div>}
                  </div>
                </div>
              );

              return (
                <FadeIn key={contact.id} delay={0.1 * index} className={isLastOdd ? "md:col-span-2 lg:col-span-1 lg:w-full h-full" : "w-full h-full"}>
                  {contact.action ? (
                    <button onClick={contact.action} className="w-full h-full outline-none focus:ring-4 focus:ring-[#00AEEF]/30 rounded-[2rem]">
                      {CardContent}
                    </button>
                  ) : contact.link ? (
                    <a href={contact.link} target={contact.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" className="block w-full h-full outline-none focus:ring-4 focus:ring-[#00AEEF]/30 rounded-[2rem]">
                      {CardContent}
                    </a>
                  ) : (
                    <div className="h-full">{CardContent}</div>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}