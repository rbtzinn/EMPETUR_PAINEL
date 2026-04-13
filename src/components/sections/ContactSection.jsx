import React, { useMemo, useState } from "react";
import {
  BarChart3,
  Check,
  Clock,
  FileSearch,
  Mail,
  MapPin,
  MessageSquareWarning,
  Phone,
} from "lucide-react";
import FadeIn from "../ui/FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";

const CONTACT_META = {
  email: {
    color: "bg-blue-50 text-blue-600",
    link: "mailto:empetur@empetur.pe.gov.br",
    icon: Mail,
  },
  phone: {
    color: "bg-purple-50 text-purple-600",
    copiedColor: "bg-green-100 text-green-600",
    icon: Phone,
  },
  hours: {
    color: "bg-emerald-50 text-emerald-600",
    link: "https://www.empetur.pe.gov.br/",
    icon: Clock,
  },
  location: {
    color: "bg-orange-50 text-orange-600",
    link: "https://maps.google.com/?q=EMPETUR",
    icon: MapPin,
  },
  esic: {
    color: "bg-teal-50 text-teal-600",
    link: "https://transparencia.pe.gov.br/participacao-cidada-pe/acesso-a-informacao/",
    icon: FileSearch,
  },
  ouvidoria: {
    color: "bg-rose-50 text-rose-600",
    link: "https://www.ouvidoria.pe.gov.br/",
    icon: MessageSquareWarning,
  },
  observatorio: {
    color: "bg-indigo-50 text-indigo-600",
    link: "https://www.empetur.pe.gov.br/institucional/observatorio-do-turismo",
    icon: BarChart3,
  },
};

export default function ContactSection({ id }) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { t } = useLanguage();

  const contacts = useMemo(
    () =>
      t.contact.contacts.map((contact) => {
        const meta = CONTACT_META[contact.id];
        const Icon = copiedPhone && contact.id === "phone" ? Check : meta.icon;

        return {
          ...contact,
          action:
            contact.id === "phone"
              ? () => {
                  navigator.clipboard.writeText("(81) 3182-8000");
                  setCopiedPhone(true);
                  setTimeout(() => setCopiedPhone(false), 2500);
                }
              : undefined,
          color:
            copiedPhone && contact.id === "phone"
              ? meta.copiedColor
              : meta.color,
          link: meta.link,
          icon: <Icon strokeWidth={contact.id === "phone" ? 2.5 : 2} size={24} className="lucide" />,
          label:
            copiedPhone && contact.id === "phone"
              ? contact.copiedLabel
              : contact.label,
          subValue:
            copiedPhone && contact.id === "phone"
              ? contact.copiedSubValue
              : contact.subValue,
        };
      }),
    [copiedPhone, t.contact.contacts]
  );

  return (
    <section
      id={id}
      className="bg-[#F8FAFC] py-24 md:py-32"
      aria-label={t.contact.aria}
    >
      <style>{`
        body.contraste-negativo #contato .hc-icon-wrapper {
          background-color: #000 !important;
          border: 1px solid #ffea00 !important;
        }
        body.contraste-negativo #contato .hc-card .lucide {
          color: #ffea00 !important;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <FadeIn className="hc-card relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-[0_26px_70px_-52px_rgba(11,35,65,0.32)] md:p-12 lg:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#00AEEF]/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#0B2341]/5 blur-3xl" />

          <div className="relative z-10 mb-14 text-center md:mb-16">
            <h2 className="mb-5 text-2xl font-black tracking-tight text-[#0B2341] hc-text-destaque sm:text-3xl md:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto max-w-3xl text-base font-light leading-8 text-slate-500 hc-text-desc md:text-lg">
              {t.contact.description}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {contacts.map((contact, index) => {
              const isLastOdd =
                index === contacts.length - 1 && contacts.length % 3 !== 0;

              const cardContent = (
                <div
                  className={`hc-card group flex h-full flex-col items-center rounded-[1.75rem] border border-slate-100 bg-slate-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 sm:items-start sm:text-left ${
                    contact.id === "phone" && copiedPhone
                      ? "bg-white ring-2 ring-green-400"
                      : ""
                  }`}
                >
                  <div
                    className={`hc-icon-wrapper mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110 ${contact.color}`}
                  >
                    {contact.icon}
                  </div>
                  <div className="w-full">
                    <div className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hc-text-destaque">
                      {contact.label}
                    </div>
                    <div className="mb-2 text-base font-bold leading-6 text-[#0B2341] transition-colors group-hover:text-[#00AEEF] hc-text-destaque">
                      {contact.value}
                    </div>
                    {contact.subValue && (
                      <div
                        className={`text-xs font-medium hc-text-desc ${
                          contact.id === "phone" && copiedPhone
                            ? "text-green-600"
                            : "text-slate-500"
                        }`}
                      >
                        {contact.subValue}
                      </div>
                    )}
                  </div>
                </div>
              );

              return (
                <FadeIn
                  key={contact.id}
                  delay={0.1 * index}
                  className={
                    isLastOdd
                      ? "h-full md:col-span-2 lg:col-span-1 lg:w-full"
                      : "h-full w-full"
                  }
                >
                  {contact.action ? (
                    <button
                      type="button"
                      onClick={contact.action}
                      className="h-full w-full rounded-[2rem] outline-none focus:ring-4 focus:ring-[#00AEEF]/30"
                    >
                      {cardContent}
                    </button>
                  ) : contact.link ? (
                    <a
                      href={contact.link}
                      target={
                        contact.link.startsWith("http") ? "_blank" : "_self"
                      }
                      rel="noopener noreferrer"
                      className="block h-full w-full rounded-[2rem] outline-none focus:ring-4 focus:ring-[#00AEEF]/30"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div className="h-full">{cardContent}</div>
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
