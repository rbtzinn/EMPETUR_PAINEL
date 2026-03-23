import React, { useState } from "react";
import FadeIn from "../ui/FadeIn";

export default function ContactSection({ id }) {
  // Estado para controlar o aviso de "Copiado!" do telefone
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("(81) 3182-8000"); // Copia o número
    setCopiedPhone(true); // Ativa o aviso visual
    setTimeout(() => setCopiedPhone(false), 2500); // Volta ao normal após 2.5 segundos
  };

  const contacts = [
    { 
      id: "email", 
      label: "E-mail Oficial", 
      value: "contato@empetur.pe.gov.br", 
      subValue: "Clique para enviar um e-mail",
      color: "bg-blue-50 text-blue-600",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=contato@empetur.pe.gov.br", 
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
    { 
      id: "phone", 
      label: copiedPhone ? "Copiado!" : "Telefone", 
      value: "(81) 3182-8000", 
      subValue: copiedPhone ? "Número copiado para a área de transferência" : "Clique para copiar o número",
      color: copiedPhone ? "bg-green-100 text-green-600" : "bg-purple-50 text-purple-600",
      action: handleCopyPhone, 
      icon: copiedPhone ? (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
      )
    },
    { 
      id: "hours", 
      label: "Atendimento", 
      value: "Segunda a Sexta • 08h às 17h", 
      subValue: "Finais de semana: Fechado", 
      color: "bg-emerald-50 text-emerald-600",
      link: "https://www.empetur.pe.gov.br/", 
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    { 
      id: "location", 
      label: "Localização", 
      value: "Centro de Convenções de PE", 
      subValue: "Clique para abrir no Google Maps", 
      color: "bg-orange-50 text-orange-600",
      link: "https://maps.google.com/?q=Centro+de+Convencoes+de+Pernambuco+Salgadinho+Olinda", 
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    { 
      id: "esic", 
      label: "Acesso à Informação", 
      value: "Portal e-SIC PE", 
      subValue: "Solicite dados não disponíveis no painel", 
      color: "bg-teal-50 text-teal-600", 
      link: "https://transparencia.pe.gov.br/participacao-cidada-pe/acesso-a-informacao/servico-de-informacoes-ao-cidadao-sic/",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    { 
      id: "ouvidoria", 
      label: "Ouvidoria Geral", 
      value: "Manifestações e Denúncias", 
      subValue: "Registe a sua reclamação ou sugestão", 
      color: "bg-rose-50 text-rose-600", 
      link: "https://www.ouvidoria.pe.gov.br/",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
    },
    { 
      id: "pedados", 
      label: "Pesquisas e Estatísticas", 
      value: "PE em Dados (Turismo)", 
      subValue: "Acesse anuários e pesquisas mensais de serviços", 
      color: "bg-indigo-50 text-indigo-600", 
      link: "https://www.empetur.pe.gov.br/coluna-4/pe-em-dados", 
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    }
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-[#F8FAFC]" aria-label="Contato e informações">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <FadeIn className="hc-card bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00AEEF]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0B2341]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center mb-12 md:mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] mb-4 md:mb-6 tracking-tight">Contato e Transparência</h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Estamos à disposição para esclarecimentos. Exerça o seu direito cidadão e aceda aos canais oficiais de transparência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative z-10">
            {contacts.map((contact, index) => {
              
              // 🔴 LÓGICA MÁGICA: Deteta se é o último item E se o número total é ímpar
              const isLastOdd = index === contacts.length - 1 && contacts.length % 2 !== 0;

              const CardContent = (
                <div className={`hc-card relative group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6 p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all h-full cursor-pointer ${contact.id === 'phone' && copiedPhone ? 'ring-2 ring-green-400' : ''}`}>
                  <div className={`hc-icon-wrapper w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${contact.color}`}>
                    {contact.icon}
                  </div>
                  <div className="min-w-0 w-full flex-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{contact.label}</div>
                    <div className="text-sm md:text-base font-bold text-[#0B2341] break-words group-hover:text-[#00AEEF] transition-colors">{contact.value}</div>
                    {contact.subValue && <div className={`text-xs mt-1.5 font-medium leading-relaxed transition-colors ${contact.id === 'phone' && copiedPhone ? 'text-green-600' : 'text-slate-500'}`}>{contact.subValue}</div>}
                  </div>
                </div>
              );

              return (
                // 🔴 APLICANDO A CLASSE DINÂMICA AO FADEIN (que é o wrapper do item)
                <FadeIn 
                  key={contact.id} 
                  delay={0.1 * index}
                  className={isLastOdd ? "md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto w-full" : "w-full h-full"}
                >
                  {contact.action ? (
                    <button onClick={contact.action} className="w-full text-left block h-full outline-none focus:ring-4 focus:ring-[#00AEEF] rounded-[2rem]">
                      {CardContent}
                    </button>
                  ) : contact.link ? (
                    <a href={contact.link} target={contact.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" className="block h-full outline-none focus:ring-4 focus:ring-[#00AEEF] rounded-[2rem]">
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