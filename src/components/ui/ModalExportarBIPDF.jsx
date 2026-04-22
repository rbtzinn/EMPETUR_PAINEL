import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  FileDown,
  FileImage,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import FadeIn from "./FadeIn";

const MODE_ICONS = {
  report: FileText,
  snapshot: FileImage,
};

export default function ModalExportarBIPDF({ isOpen, onClose, onConfirm }) {
  const { t } = useLanguage();
  const exportTexts = t.dashboard.biExport;
  const [selectedMode, setSelectedMode] = useState("report");
  const [status, setStatus] = useState("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedConfig = exportTexts.modes[selectedMode];
  const steps = exportTexts.steps[selectedMode];

  const successTitle = useMemo(
    () => exportTexts.successTitle[selectedMode],
    [exportTexts.successTitle, selectedMode]
  );
  const successDescription = useMemo(
    () => exportTexts.successDescription[selectedMode],
    [exportTexts.successDescription, selectedMode]
  );

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSelectedMode("report");
      setStatus("idle");
      setStepIdx(0);
      setPreview(null);
      setErrorMessage("");
    }, 400);
  };

  const handleExport = async () => {
    setStatus("loading");
    setStepIdx(0);
    setErrorMessage("");
    setPreview(null);

    const stepInterval = setInterval(() => {
      setStepIdx((prev) => Math.min(prev + 1, steps.length - 1));
    }, 700);

    try {
      const result = await onConfirm(selectedMode);
      const previewDataUrl =
        typeof result === "string"
          ? result
          : result?.previewDataUrl || null;

      clearInterval(stepInterval);
      setStepIdx(steps.length - 1);
      setPreview(previewDataUrl);
      setStatus("done");
    } catch (err) {
      clearInterval(stepInterval);
      console.error("[ModalExportarBIPDF]", err);
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : exportTexts.defaultError
      );
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" data-pdf-modal="true">
      <style>{`
        body.contraste-negativo .hc-bi-export-modal {
          background-color: #000 !important;
          border: 1px solid #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-export-title,
        body.contraste-negativo .hc-bi-export-body,
        body.contraste-negativo .hc-bi-export-status {
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-export-soft {
          background-color: #111 !important;
          border-color: #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-export-errorbox {
          background-color: #111 !important;
          border: 1px solid #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-export-primary {
          background-color: #ffea00 !important;
          color: #000 !important;
        }
        body.contraste-negativo .hc-bi-export-primary:hover {
          background-color: #fff27a !important;
        }
        body.contraste-negativo .hc-bi-export-iconwrap {
          background-color: #111 !important;
          border-color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-export-close {
          background-color: #111 !important;
          border: 1px solid #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-export-option {
          background-color: #111 !important;
          border-color: #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-bi-export-option[data-selected="true"] {
          background-color: #ffea00 !important;
          color: #000 !important;
        }
        body.contraste-negativo .hc-bi-export-option[data-selected="true"] .hc-bi-export-option-icon,
        body.contraste-negativo .hc-bi-export-option[data-selected="true"] .hc-bi-export-option-badge,
        body.contraste-negativo .hc-bi-export-option[data-selected="true"] .hc-bi-export-option-title,
        body.contraste-negativo .hc-bi-export-option[data-selected="true"] .hc-bi-export-option-desc {
          color: #000 !important;
          border-color: #000 !important;
        }
        body.contraste-negativo .hc-bi-export-option-badge {
          border-color: #ffea00 !important;
          color: #ffea00 !important;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={status === "loading" ? undefined : handleClose}
      />

      <FadeIn className="relative w-full max-w-2xl">
        <div className="hc-bi-export-modal relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          {status !== "loading" && (
            <button
              type="button"
              onClick={handleClose}
              className="hc-bi-export-close absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          )}

          {status === "idle" && (
            <div className="flex flex-col p-8">
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="hc-bi-export-iconwrap mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50">
                  <FileDown className="h-8 w-8 text-[#00AEEF]" />
                </div>
                <h2 className="hc-bi-export-title text-2xl font-black tracking-tight text-[#0B2341]">
                  {exportTexts.title}
                </h2>
                <p className="hc-bi-export-body mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  {exportTexts.description}
                </p>
              </div>

              <div
                className="mb-6 grid gap-3 md:grid-cols-2"
                role="group"
                aria-label={exportTexts.modeGroupAria}
              >
                {Object.entries(exportTexts.modes).map(([mode, config]) => {
                  const Icon = MODE_ICONS[mode] || FileDown;
                  const isSelected = selectedMode === mode;

                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSelectedMode(mode)}
                      aria-pressed={isSelected}
                      data-selected={isSelected ? "true" : "false"}
                      className={`hc-bi-export-option flex flex-col items-start rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 ${
                        isSelected
                          ? "border-[#00AEEF] bg-[#0B2341] text-white shadow-lg shadow-[#0B2341]/10"
                          : "border-slate-200 bg-white text-[#0B2341] hover:border-[#00AEEF]/40 hover:bg-slate-50"
                      }`}
                    >
                      <div className="mb-3 flex w-full items-center justify-between gap-3">
                        <span className="hc-bi-export-option-icon flex h-10 w-10 items-center justify-center rounded-xl bg-[#00AEEF]/10 text-[#00AEEF]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span
                          className={`hc-bi-export-option-badge rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
                            isSelected
                              ? "border-white/30 text-white"
                              : "border-[#00AEEF]/20 text-[#00AEEF]"
                          }`}
                        >
                          {config.badge}
                        </span>
                      </div>
                      <span className={`hc-bi-export-option-title text-sm font-black ${isSelected ? "text-white" : "text-[#0B2341]"}`}>
                        {config.title}
                      </span>
                      <span className={`hc-bi-export-option-desc mt-2 text-xs leading-relaxed ${isSelected ? "text-white/80" : "text-slate-500"}`}>
                        {config.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="hc-bi-export-soft mb-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <ul className="space-y-2 text-xs text-slate-500">
                  {selectedConfig.bullets.map((bullet) => (
                    <li key={bullet} className="hc-bi-export-body flex items-start gap-2">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00AEEF]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="hc-bi-export-soft flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:bg-slate-100"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="hc-bi-export-primary flex flex-[2] items-center justify-center gap-2 rounded-xl bg-[#0B2341] px-4 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-[#00AEEF] active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  {selectedConfig.action}
                </button>
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center px-8 py-12 text-center">
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke="#00AEEF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: (stepIdx + 1) / steps.length }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    strokeDasharray="213.6"
                    strokeDashoffset="0"
                    style={{ pathLength: (stepIdx + 1) / steps.length }}
                  />
                </svg>
                <Loader2 className="h-8 w-8 animate-spin text-[#00AEEF]" />
              </div>

              <h2 className="hc-bi-export-title mb-1 text-lg font-black text-[#0B2341]">
                {exportTexts.processingTitle}
              </h2>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${selectedMode}-${stepIdx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="hc-bi-export-status text-sm text-slate-500"
                >
                  {steps[stepIdx]}
                </motion.p>
              </AnimatePresence>

              <div className="mt-6 flex gap-2">
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 rounded-full bg-slate-200"
                    animate={{
                      backgroundColor: i <= stepIdx ? "#00AEEF" : "#e2e8f0",
                      width: i === stepIdx ? 24 : 8,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          )}

          {status === "done" && (
            <div className="flex flex-col items-center p-8 text-center">
              <div className="hc-bi-export-iconwrap mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="h-9 w-9 text-green-500" />
              </div>
              <h2 className="hc-bi-export-title mb-1 text-xl font-black text-[#0B2341]">
                {successTitle}
              </h2>
              <p className="hc-bi-export-body mb-5 text-sm text-slate-500">
                {successDescription}
              </p>

              {preview && (
                <div className="mb-5 w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                  <div className="hc-bi-export-soft border-b border-slate-100 bg-slate-50 px-3 py-1.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      {exportTexts.previewLabel}
                    </span>
                  </div>
                  <img src={preview} alt={exportTexts.previewLabel} className="w-full object-contain" />
                </div>
              )}

              <button
                type="button"
                onClick={handleClose}
                className="hc-bi-export-primary w-full rounded-xl bg-green-500 px-6 py-3 font-black uppercase tracking-wider text-white transition-all hover:bg-green-600"
              >
                {t.common.close}
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center p-8 text-center">
              <div className="hc-bi-export-iconwrap mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <X className="h-9 w-9 text-red-500" />
              </div>
              <h2 className="hc-bi-export-title mb-1 text-xl font-black text-[#0B2341]">
                {exportTexts.errorTitle}
              </h2>
              <p className="hc-bi-export-body mb-5 text-sm text-slate-500">
                {exportTexts.errorDescription}
              </p>
              {errorMessage && (
                <div className="hc-bi-export-errorbox mb-5 w-full overflow-x-auto rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left text-xs text-red-600">
                  <code className="whitespace-pre-wrap break-all font-mono">{errorMessage}</code>
                </div>
              )}
              <div className="flex w-full gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="hc-bi-export-soft flex-1 rounded-xl border border-slate-200 bg-slate-50 py-3 font-bold text-slate-500 hover:bg-slate-100"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  className="hc-bi-export-primary flex-[2] rounded-xl bg-[#0B2341] py-3 font-black uppercase text-white hover:bg-[#00AEEF]"
                >
                  {exportTexts.retry}
                </button>
              </div>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
