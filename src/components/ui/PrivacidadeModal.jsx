import React from "react";
import { ShieldCheck, X } from "lucide-react";
import FadeIn from "./FadeIn";

export default function PrivacidadeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={onClose} />

      <FadeIn className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-[#0B2341] to-[#1a4275] p-6 md:p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm hidden sm:flex">
              <ShieldCheck className="text-[#00AEEF] w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">Política de Privacidade</h2>
              <p className="text-[#00AEEF] text-[10px] md:text-xs font-bold uppercase tracking-widest">Empresa de Turismo de Pernambuco S.A.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-3 rounded-full transition-all">
            <X strokeWidth={2.5} size={20} />
          </button>
        </div>

        <div className="p-6 md:p-10 overflow-y-auto scrollbar-moderna text-slate-600 space-y-10">
          <div className="bg-blue-50/80 p-6 md:p-8 rounded-3xl border border-blue-100/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#00AEEF]"></div>
            <p className="text-sm md:text-base leading-relaxed text-[#0B2341]">
              A <strong className="font-black">Empresa de Turismo de Pernambuco Governador Eduardo Campos S.A. (EMPETUR)</strong> está comprometida com a segurança dos seus dados pessoais, com o respeito à sua privacidade e com a transparência em nossas operações. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-10">
              <section>
                <h3 className="font-black text-[#0B2341] text-lg mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center text-sm">01</span> Quem Somos
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  A EMPETUR é uma sociedade de economia mista, vinculada à Secretaria de Turismo, Esportes e Lazer de Pernambuco. Atuamos como controladores dos seus dados pessoais, responsáveis por decidir como eles serão tratados e protegidos. Nossa sede está localizada na <strong>Avenida Professor Andrade Bezerra, S/N, Salgadinho, Olinda/PE</strong>.
                </p>
              </section>

              <section>
                <h3 className="font-black text-[#0B2341] text-lg mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center text-sm">02</span> Legislação
                </h3>
                <ul className="text-sm leading-relaxed space-y-3 text-slate-500">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] mt-1.5 shrink-0"></div><strong>Lei nº 13.709/2018:</strong> LGPD</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] mt-1.5 shrink-0"></div><strong>Lei nº 12.527/2011:</strong> Lei de Acesso à Informação</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] mt-1.5 shrink-0"></div><strong>Lei Estadual nº 14.804/2012:</strong> LAI de Pernambuco</li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] mt-1.5 shrink-0"></div><strong>Decreto Est. nº 49.265/2020:</strong> Política de Dados</li>
                </ul>
              </section>
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="font-black text-[#0B2341] text-lg mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center text-sm">03</span> Publicação de Dados
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  Neste painel específico de transparência, a divulgação de dados financeiros (como nomes de credores e valores pagos) ocorre para o cumprimento de obrigação legal e execução de políticas públicas, conforme o Art. 7º da LGPD combinado com a Lei de Acesso à Informação.
                </p>
              </section>

              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-black text-[#0B2341] text-base mb-4">Contato do Encarregado (DPO)</h3>
                <div className="space-y-2">
                  <p className="text-sm text-slate-500"><strong className="text-slate-700">Nome:</strong> Victor Hugo Feitosa Lima Aragão</p>
                  <p className="text-sm text-slate-500"><strong className="text-slate-700">Telefone:</strong> (81) 3182-8210</p>
                  <p className="text-sm text-[#00AEEF] font-medium"><strong className="text-slate-700 font-bold">E-mail:</strong> victor.aragao@empetur.pe.gov.br</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border-t border-slate-100 shrink-0 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
            Atualizado em: 10 de abril de 2025
          </span>
          <button onClick={onClose} className="w-full md:w-auto px-10 py-4 rounded-2xl bg-[#00AEEF] hover:bg-[#0B2341] text-white font-black uppercase tracking-widest transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] hover:shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] active:scale-95">
            Estou Ciente
          </button>
        </div>
      </FadeIn>
    </div>
  );
}