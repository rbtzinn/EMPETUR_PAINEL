import React, { useState } from "react";
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import PrivacidadeModal from "../ui/PrivacidadeModal";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Footer() {
  const [isPrivacidadeOpen, setIsPrivacidadeOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <PrivacidadeModal
        isOpen={isPrivacidadeOpen}
        onClose={() => setIsPrivacidadeOpen(false)}
      />

      <footer className="relative overflow-hidden bg-[#0B2341] px-6 pb-8 pt-20 md:pt-24">
        <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#00AEEF] opacity-20 blur-[150px]" />

        <div className="relative z-10 mx-auto mb-16 grid max-w-7xl gap-10 md:grid-cols-12 lg:gap-14">
          <div className="md:col-span-12 lg:col-span-5">
            <img
              src="/images/empeturlogobranca.png"
              alt="EMPETUR"
              className="mb-6 h-16 w-auto opacity-90"
            />
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
              <ShieldCheck size={14} className="text-[#00AEEF]" />
              {t.footer.badge}
            </div>
            <p className="mb-8 max-w-md text-sm font-light leading-7 text-slate-400">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/empetur.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-[#00AEEF] hover:bg-[#00AEEF] hover:text-white"
              >
                <Instagram size={18} strokeWidth={2} />
              </a>
              <a
                href="https://www.youtube.com/@empetur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <Youtube size={18} strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">
              {t.footer.serviceTitle}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:empetur@empetur.pe.gov.br"
                  className="group flex items-start gap-3 text-slate-400 transition-colors hover:text-[#00AEEF]"
                >
                  <Mail size={16} className="mt-0.5 group-hover:text-[#00AEEF]" />
                  <span className="text-sm">empetur@empetur.pe.gov.br</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400">
                  <Phone size={16} className="mt-0.5" />
                  <span className="text-sm">+55 (81) 3182-8000</span>
                </div>
              </li>
              <li className="pl-7">
                <span className="block text-xs text-slate-500">
                  {t.footer.hours}
                </span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">
              {t.footer.locationTitle}
            </h4>
            <div className="flex items-start gap-3 text-slate-400">
              <MapPin size={16} className="mt-1 shrink-0 text-[#00AEEF]" />
              <p className="text-sm leading-relaxed">
                Centro de Convenções de PE
                <br />
                Av. Professor Andrade Bezerra, s/n
                <br />
                <strong className="mt-1 block font-medium text-white">
                  Salgadinho, Olinda - PE
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mb-14 max-w-7xl rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-[#00AEEF]" />
            <h5 className="text-xs font-black uppercase tracking-widest text-white">
              {t.footer.teamTitle}
            </h5>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
            {t.footer.team.map((member) => (
              <div key={member.name} className="flex flex-col rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4">
                <span className="mb-1 text-sm font-bold text-white">
                  {member.name}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00AEEF] opacity-80">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs md:text-left">
            © {new Date().getFullYear()} EMPETUR. {t.footer.copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <button
              type="button"
              onClick={() => setIsPrivacidadeOpen(true)}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
            >
              {t.footer.privacy}
            </button>
            <a
              href="https://efisco.sefaz.pe.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-[#00AEEF]"
            >
              {t.footer.efisco}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
