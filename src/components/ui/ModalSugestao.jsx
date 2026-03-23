import React, { useState } from "react";
import { Card, Title, Text, Button, TextInput, Textarea } from "@tremor/react";
import { Lightbulb, SendHorizontal, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import FadeIn from "../ui/FadeIn";

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
    const dadosFormulario = { nome, email, sugestao };

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosFormulario),
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
        .hc-input input, 
        .hc-input textarea {
          padding-left: 1.25rem !important;
          padding-right: 1.25rem !important;
        }
        .hc-input textarea {
          padding-top: 0.85rem !important;
        }

        .hc-btn-cancel { background-color: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
        .hc-btn-cancel:hover { background-color: #f1f5f9; color: #0f172a; }
        .hc-btn-submit.hc-active { background-color: #0ea5e9; color: #fff; }
        .hc-btn-submit.hc-active:hover { background-color: #0284c7; }
        .hc-btn-submit.hc-disabled { background-color: #cbd5e1; color: #fff; cursor: not-allowed; }

        body.contraste-negativo .hc-modal-card { background-color: #000 !important; border: 2px solid #ffea00 !important; }
        body.contraste-negativo .hc-text-destaque { color: #ffea00 !important; }
        body.contraste-negativo .hc-text-desc { color: #fff !important; }
        body.contraste-negativo .hc-close-btn { color: #ffea00 !important; }
        body.contraste-negativo .hc-input { background-color: #000 !important; border: 2px solid #ffea00 !important; color: #ffea00 !important; }
        body.contraste-negativo .hc-input input::placeholder,
        body.contraste-negativo .hc-input textarea::placeholder { color: rgba(255, 234, 0, 0.6) !important; }
        body.contraste-negativo .hc-btn-submit { background-color: #ffea00 !important; color: #000 !important; font-weight: bold !important; }
      `}</style>

      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={handleClose} />

      <FadeIn className="relative w-full max-w-lg">
        <Card className="hc-modal-card rounded-[2.5rem] border-none shadow-2xl bg-white p-6 md:p-10 flex flex-col relative overflow-hidden">
          
          <button onClick={handleClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-all rounded-full p-2 hover:bg-slate-100 hc-close-btn">
            <X size={22} />
          </button>

          {status === "success" && (
            <div className="text-center py-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="hc-icon-wrapper hc-success-icon mb-6 w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <Title className="text-2xl font-bold text-slate-900 mb-2 hc-text-destaque">Sugestão enviada!</Title>
              <Text className="text-slate-500 mb-8 hc-text-desc px-4">Obrigado por colaborar. Analisaremos sua ideia com carinho.</Text>
              <Button onClick={handleClose} className="w-full sm:w-auto px-12 py-3 rounded-xl shadow-lg hc-btn-submit hc-active border-none">Entendido</Button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <div className="hc-icon-wrapper hc-error-icon mb-6 w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <Title className="text-2xl font-bold text-slate-900 mb-2 hc-text-destaque">Algo deu errado</Title>
              <Text className="text-slate-500 mb-8 hc-text-desc px-4">Não conseguimos salvar sua sugestão agora. Tente novamente.</Text>
              <Button onClick={() => setStatus("idle")} className="w-full sm:w-auto px-10 py-3 rounded-xl hc-btn-submit hc-active border-none">Tentar Novamente</Button>
            </div>
          )}

          {(status === "idle" || status === "loading") && (
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="hc-icon-wrapper w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-4 shadow-sm">
                  <Lightbulb className="w-8 h-8 text-sky-500" />
                </div>
                <Title className="text-2xl font-bold text-slate-900 tracking-tight hc-text-destaque">Sugerir Melhoria</Title>
                <Text className="text-slate-500 text-sm hc-text-desc">Ajude-nos a evoluir este painel.</Text>
              </div>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase px-1 hc-text-desc">Nome (Opcional)</label>
                    <TextInput placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} className="rounded-xl border-slate-200 hc-input" disabled={status === "loading"} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase px-1 hc-text-desc">E-mail (Opcional - Para retorno)</label>
                    <TextInput type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border-slate-200 hc-input" disabled={status === "loading"} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase px-1 hc-text-desc">Sua Ideia (Obrigatório)</label>
                  <Textarea placeholder="No que podemos melhorar?" value={sugestao} onChange={(e) => setSugestao(e.target.value)} required rows={4} className="rounded-xl border-slate-200 hc-input resize-none shadow-sm" disabled={status === "loading"} />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                <Button type="button" variant="light" onClick={handleClose} className="rounded-xl px-6 py-2.5 hc-btn-cancel border-none font-medium" disabled={status === "loading"}>
                  Cancelar
                </Button>
                
                <Button type="submit" className={`rounded-xl px-8 py-3 flex items-center justify-center gap-2 transition-all shadow-md hc-btn-submit border-none font-bold ${sugestao ? 'hc-active' : 'hc-disabled'}`} disabled={!sugestao || status === "loading"}>
                  {status === "loading" ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Enviando</>
                  ) : (
                    <><SendHorizontal className="w-5 h-5" /> Enviar</>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </FadeIn>
    </div>
  );
}