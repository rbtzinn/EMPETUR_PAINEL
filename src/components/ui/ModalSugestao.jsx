import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Loader2,
  SendHorizontal,
  X,
} from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "../../contexts/LanguageContext";

const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbwM2iYw61mWk6G1K4fc06XD4GZuyMo6ahIHRnGN9pazyR_GBoZRR-jcFVgrCett-JFLEw/exec";

export default function ModalSugestao({ isOpen, onClose }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [sugestao, setSugestao] = useState("");
  const [status, setStatus] = useState("idle");
  const { t } = useLanguage();

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setNome("");
      setEmail("");
      setSugestao("");
    }, 300);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <FadeIn className="relative w-full max-w-lg">
        <div className="hc-modal-card relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl md:p-10">
          <button
            type="button"
            onClick={handleClose}
            className="hc-text-destaque absolute right-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/30 sm:right-6 sm:top-6"
          >
            <X size={20} strokeWidth={2.5} className="pointer-events-none" />
          </button>

          {status === "success" && (
            <FadeIn direction="up" className="flex flex-col items-center py-6 text-center">
              <div className="hc-icon-wrapper mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 strokeWidth={1.5} className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="hc-text-destaque mb-3 text-3xl font-black tracking-tight text-slate-900">
                {t.suggestion.successTitle}
              </h2>
              <p className="hc-text-desc mb-8 leading-relaxed text-slate-500">
                {t.suggestion.successDescription}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="hc-btn-submit w-full rounded-2xl bg-green-500 px-8 py-4 font-black uppercase tracking-wider text-white shadow-[0_8px_20px_-6px_rgba(34,197,94,0.4)] transition-all hover:bg-green-600"
              >
                {t.suggestion.successButton}
              </button>
            </FadeIn>
          )}

          {status === "error" && (
            <FadeIn direction="up" className="flex flex-col items-center py-6 text-center">
              <div className="hc-icon-wrapper mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
                <AlertTriangle strokeWidth={1.5} className="h-12 w-12 text-red-500" />
              </div>
              <h2 className="hc-text-destaque mb-3 text-3xl font-black tracking-tight text-slate-900">
                {t.suggestion.errorTitle}
              </h2>
              <p className="hc-text-desc mb-8 leading-relaxed text-slate-500">
                {t.suggestion.errorDescription}
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="hc-btn-submit w-full rounded-2xl bg-slate-900 px-8 py-4 font-black uppercase tracking-wider text-white transition-all hover:bg-black"
              >
                {t.suggestion.retry}
              </button>
            </FadeIn>
          )}

          {(status === "idle" || status === "loading") && (
            <form onSubmit={handleSubmit} className="relative z-10 flex h-full flex-col">
              <div className="mb-8 mt-2 flex flex-col items-center text-center">
                <div className="hc-icon-wrapper mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 shadow-inner">
                  <Lightbulb strokeWidth={2} className="h-8 w-8 text-[#00AEEF]" />
                </div>
                <h2 className="hc-text-destaque text-2xl font-black tracking-tight text-[#0B2341]">
                  {t.suggestion.title}
                </h2>
                <p className="hc-text-desc mt-2 text-sm text-slate-500">
                  {t.suggestion.subtitle}
                </p>
              </div>

              <div className="mb-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="hc-text-desc px-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t.suggestion.name}
                    </label>
                    <input
                      type="text"
                      placeholder={t.suggestion.namePlaceholder}
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      disabled={status === "loading"}
                      className="hc-input w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#0B2341] outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="hc-text-desc px-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t.suggestion.email}
                    </label>
                    <input
                      type="email"
                      placeholder={t.suggestion.emailPlaceholder}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      disabled={status === "loading"}
                      className="hc-input w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#0B2341] outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="hc-text-desc px-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {t.suggestion.idea}
                  </label>
                  <textarea
                    placeholder={t.suggestion.ideaPlaceholder}
                    value={sugestao}
                    onChange={(event) => setSugestao(event.target.value)}
                    required
                    rows={4}
                    disabled={status === "loading"}
                    className="hc-input w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#0B2341] outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>
              </div>

              <div className="mt-auto flex flex-col-reverse justify-end gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={status === "loading"}
                  className="hc-btn-cancel rounded-2xl bg-slate-50 px-6 py-4 font-bold text-slate-500 transition-all focus:outline-none hover:bg-slate-100"
                >
                  {t.suggestion.cancel}
                </button>
                <button
                  type="submit"
                  disabled={!sugestao || status === "loading"}
                  className={`hc-btn-submit flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-black uppercase tracking-wider transition-all duration-300 ${
                    sugestao
                      ? "cursor-pointer bg-[#00AEEF] text-white shadow-[0_8px_20px_-6px_rgba(0,174,239,0.4)] hover:bg-[#0B2341] hover:shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)]"
                      : "cursor-not-allowed bg-slate-100 text-slate-400"
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin pointer-events-none" />
                      {t.suggestion.sending}
                    </>
                  ) : (
                    <>
                      <SendHorizontal
                        strokeWidth={2.5}
                        className="h-5 w-5 pointer-events-none"
                      />
                      {t.suggestion.send}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
