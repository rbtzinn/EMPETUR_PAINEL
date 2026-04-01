import React, { useState } from "react";
import { Lightbulb, SendHorizontal, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import FadeIn from "./FadeIn";

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwM2iYw61mWk6G1K4fc06XD4GZuyMo6ahIHRnGN9pazyR_GBoZRR-jcFVgrCett-JFLEw/exec";

export default function ModalSugestao({ isOpen, onClose }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [sugestao, setSugestao] = useState("");
  const [status, setStatus] = useState("idle");

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setNome("");
      setEmail("");
      setSugestao("");
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sugestao) return;
    setStatus("loading");
    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, sugestao }),
      });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <style>{`
        body.contraste-negativo .hc-modal-card { background-color: #000 !important; border: 2px solid #ffea00 !important; }
        body.contraste-negativo .hc-text-destaque { color: #ffea00 !important; }
        body.contraste-negativo .hc-text-desc { color: #fff !important; }
        body.contraste-negativo .hc-input { background-color: #000 !important; border: 1px solid #ffea00 !important; color: #ffea00 !important; }
        body.contraste-negativo .hc-input::placeholder { color: rgba(255, 234, 0, 0.5) !important; }
        
        body.contraste-negativo .hc-icon-wrapper { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-icon-wrapper svg { color: #ffea00 !important; }
        
        body.contraste-negativo .hc-btn-cancel { background-color: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-btn-cancel:hover { background-color: #ffea00 !important; color: #000 !important; }
        
        body.contraste-negativo .hc-btn-submit { background-color: #ffea00 !important; color: #000 !important; border: none !important; box-shadow: none !important; }
        body.contraste-negativo .hc-btn-submit:disabled { background-color: transparent !important; color: rgba(255,234,0,0.5) !important; border: 1px dashed rgba(255,234,0,0.5) !important; }
      `}</style>

      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={handleClose} />

      <FadeIn className="relative w-full max-w-lg">
        <div className="hc-modal-card rounded-[2.5rem] bg-white shadow-2xl p-8 md:p-10 flex flex-col relative overflow-hidden">
          
          {/* 🔴 CORREÇÃO DO BOTÃO: z-[60], w-10, h-10 e pointer-events-none no ícone */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60] w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors bg-slate-50 hover:bg-slate-100 rounded-full hc-text-destaque focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/30"
          >
            <X size={20} strokeWidth={2.5} className="pointer-events-none" />
          </button>

          {status === "success" && (
            <FadeIn direction="up" className="text-center py-6 flex flex-col items-center">
              <div className="hc-icon-wrapper w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6">
                <CheckCircle2 strokeWidth={1.5} className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 hc-text-destaque tracking-tight">Enviado!</h2>
              <p className="text-slate-500 mb-8 hc-text-desc leading-relaxed">Obrigado por colaborar. Analisaremos sua ideia para melhorar o painel.</p>
              <button onClick={handleClose} className="hc-btn-submit w-full px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-wider transition-all shadow-[0_8px_20px_-6px_rgba(34,197,94,0.4)]">Concluir</button>
            </FadeIn>
          )}

          {status === "error" && (
            <FadeIn direction="up" className="text-center py-6 flex flex-col items-center">
              <div className="hc-icon-wrapper w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
                <AlertTriangle strokeWidth={1.5} className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-3 hc-text-destaque tracking-tight">Ops, falhou.</h2>
              <p className="text-slate-500 mb-8 hc-text-desc leading-relaxed">Não conseguimos conectar ao servidor. Tente novamente em instantes.</p>
              <button onClick={() => setStatus("idle")} className="hc-btn-submit w-full px-8 py-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-wider transition-all">Tentar Novamente</button>
            </FadeIn>
          )}

          {(status === "idle" || status === "loading") && (
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col h-full">
              <div className="flex flex-col items-center text-center mb-8 mt-2">
                <div className="hc-icon-wrapper w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-5 shadow-inner border border-sky-100">
                  <Lightbulb strokeWidth={2} className="w-8 h-8 text-[#00AEEF]" />
                </div>
                <h2 className="text-2xl font-black text-[#0B2341] tracking-tight hc-text-destaque">Sugerir Melhoria</h2>
                <p className="text-slate-500 text-sm mt-2 hc-text-desc">Sua opinião ajuda a evoluir a transparência.</p>
              </div>

              <div className="space-y-5 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 hc-text-desc">Nome (Opcional)</label>
                    <input type="text" placeholder="Como devemos te chamar?" value={nome} onChange={(e) => setNome(e.target.value)} disabled={status === "loading"} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition-all hc-input text-[#0B2341] placeholder:text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 hc-text-desc">E-mail (Opcional)</label>
                    <input type="email" placeholder="Para darmos retorno" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === "loading"} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition-all hc-input text-[#0B2341] placeholder:text-slate-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 hc-text-desc">Sua Ideia</label>
                  <textarea placeholder="O que podemos construir ou melhorar?" value={sugestao} onChange={(e) => setSugestao(e.target.value)} required rows={4} disabled={status === "loading"} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#00AEEF] focus:bg-white transition-all resize-none hc-input text-[#0B2341] placeholder:text-slate-400" />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-auto">
                <button type="button" onClick={handleClose} disabled={status === "loading"} className="hc-btn-cancel px-6 py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold transition-all focus:outline-none">
                  Cancelar
                </button>
                <button type="submit" disabled={!sugestao || status === "loading"} className={`hc-btn-submit px-8 py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-wider transition-all duration-300 ${sugestao ? 'bg-[#00AEEF] hover:bg-[#0B2341] text-white shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] hover:shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                  {status === "loading" ? <><Loader2 className="w-5 h-5 animate-spin pointer-events-none" /> Enviando</> : <><SendHorizontal strokeWidth={2.5} className="w-5 h-5 pointer-events-none" /> Enviar</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </FadeIn>
    </div>
  );
}