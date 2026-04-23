import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

const STEP_PADDING = 12;
const TOUR_CARD_WIDTH = 460;
const TOUR_CARD_MIN_MARGIN = 16;
const TOUR_CARD_GAP = 20;
const TOUR_CARD_ESTIMATED_HEIGHT = 256;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const isElementVisible = (element) => {
  if (!element || typeof window === "undefined") return false;

  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.display !== "none"
    && style.visibility !== "hidden"
    && rect.width > 0
    && rect.height > 0
  );
};

const findTargetElement = (selector) => {
  if (typeof document === "undefined" || !selector) return null;

  const elements = [...document.querySelectorAll(selector)];
  return elements.find(isElementVisible) || null;
};

const formatProgress = (template, current, total) =>
  String(template || "")
    .replace("{current}", String(current))
    .replace("{total}", String(total));

export default function DashboardTutorialOverlay({
  isOpen,
  steps = [],
  texts,
  onClose,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState(null);
  const totalSteps = steps.length;
  const step = steps[currentStep] || null;

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setHighlightRect(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !step) return undefined;

    let rafId = 0;
    let timeoutId = 0;
    let target = null;

    const measureHighlight = () => {
      if (!target) {
        setHighlightRect(null);
        return;
      }

      const rect = target.getBoundingClientRect();
      setHighlightRect({
        top: clamp(rect.top - STEP_PADDING, 8, window.innerHeight - 24),
        left: clamp(rect.left - STEP_PADDING, 8, window.innerWidth - 24),
        width: clamp(rect.width + STEP_PADDING * 2, 48, window.innerWidth - 16),
        height: clamp(rect.height + STEP_PADDING * 2, 48, window.innerHeight - 16),
      });
    };

    const updateHighlight = () => {
      target = findTargetElement(step.target);

      if (!target) {
        setHighlightRect(null);
        return;
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      timeoutId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(() => {
          measureHighlight();
        });
      }, 180);
    };

    updateHighlight();

    window.addEventListener("resize", measureHighlight);
    window.addEventListener("scroll", measureHighlight, true);

    return () => {
      window.removeEventListener("resize", measureHighlight);
      window.removeEventListener("scroll", measureHighlight, true);
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [currentStep, isOpen, step]);

  const progressLabel = useMemo(
    () => formatProgress(texts?.progress, currentStep + 1, totalSteps),
    [currentStep, texts?.progress, totalSteps]
  );

  const overlayParts = useMemo(() => {
    if (!highlightRect) return null;

    const top = Math.max(highlightRect.top, 0);
    const left = Math.max(highlightRect.left, 0);
    const right = Math.max(window.innerWidth - (highlightRect.left + highlightRect.width), 0);
    const bottom = Math.max(window.innerHeight - (highlightRect.top + highlightRect.height), 0);

    return [
      { key: "top", style: { top: 0, left: 0, right: 0, height: top } },
      { key: "left", style: { top, left: 0, width: left, height: highlightRect.height } },
      { key: "right", style: { top, right: 0, width: right, height: highlightRect.height } },
      { key: "bottom", style: { left: 0, right: 0, bottom: 0, height: bottom } },
    ];
  }, [highlightRect]);

  const cardPosition = useMemo(() => {
    if (!highlightRect || typeof window === "undefined") {
      return {
        top: "auto",
        left: "50%",
        bottom: TOUR_CARD_MIN_MARGIN,
        transform: "translateX(-50%)",
        width: `min(calc(100vw - ${TOUR_CARD_MIN_MARGIN * 2}px), ${TOUR_CARD_WIDTH}px)`,
      };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cardWidth = Math.min(TOUR_CARD_WIDTH, viewportWidth - TOUR_CARD_MIN_MARGIN * 2);

    if (viewportWidth < 768) {
      return {
        top: "auto",
        left: "50%",
        bottom: TOUR_CARD_MIN_MARGIN,
        transform: "translateX(-50%)",
        width: `min(calc(100vw - ${TOUR_CARD_MIN_MARGIN * 2}px), ${TOUR_CARD_WIDTH}px)`,
      };
    }

    const spaceAbove = highlightRect.top;
    const spaceBelow = viewportHeight - (highlightRect.top + highlightRect.height);
    const spaceLeft = highlightRect.left;
    const spaceRight = viewportWidth - (highlightRect.left + highlightRect.width);
    const centeredLeft = clamp(
      highlightRect.left + highlightRect.width / 2 - cardWidth / 2,
      TOUR_CARD_MIN_MARGIN,
      viewportWidth - cardWidth - TOUR_CARD_MIN_MARGIN
    );

    if (spaceBelow >= TOUR_CARD_ESTIMATED_HEIGHT + TOUR_CARD_GAP) {
      return {
        top: highlightRect.top + highlightRect.height + TOUR_CARD_GAP,
        left: centeredLeft,
        bottom: "auto",
        transform: "none",
        width: cardWidth,
      };
    }

    if (spaceAbove >= TOUR_CARD_ESTIMATED_HEIGHT + TOUR_CARD_GAP) {
      return {
        top: Math.max(TOUR_CARD_MIN_MARGIN, highlightRect.top - TOUR_CARD_ESTIMATED_HEIGHT - TOUR_CARD_GAP),
        left: centeredLeft,
        bottom: "auto",
        transform: "none",
        width: cardWidth,
      };
    }

    if (spaceRight >= cardWidth + TOUR_CARD_GAP) {
      return {
        top: clamp(
          highlightRect.top + highlightRect.height / 2 - TOUR_CARD_ESTIMATED_HEIGHT / 2,
          TOUR_CARD_MIN_MARGIN,
          viewportHeight - TOUR_CARD_ESTIMATED_HEIGHT - TOUR_CARD_MIN_MARGIN
        ),
        left: highlightRect.left + highlightRect.width + TOUR_CARD_GAP,
        bottom: "auto",
        transform: "none",
        width: cardWidth,
      };
    }

    if (spaceLeft >= cardWidth + TOUR_CARD_GAP) {
      return {
        top: clamp(
          highlightRect.top + highlightRect.height / 2 - TOUR_CARD_ESTIMATED_HEIGHT / 2,
          TOUR_CARD_MIN_MARGIN,
          viewportHeight - TOUR_CARD_ESTIMATED_HEIGHT - TOUR_CARD_MIN_MARGIN
        ),
        left: Math.max(TOUR_CARD_MIN_MARGIN, highlightRect.left - cardWidth - TOUR_CARD_GAP),
        bottom: "auto",
        transform: "none",
        width: cardWidth,
      };
    }

    return {
      top: "auto",
      left: "50%",
      bottom: TOUR_CARD_MIN_MARGIN,
      transform: "translateX(-50%)",
      width: `min(calc(100vw - ${TOUR_CARD_MIN_MARGIN * 2}px), ${TOUR_CARD_WIDTH}px)`,
    };
  }, [highlightRect]);

  const handleNext = () => {
    if (currentStep >= totalSteps - 1) {
      onClose?.();
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  if (!isOpen || !step) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="dashboard-tutorial"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[220]"
        aria-modal="true"
        role="dialog"
        aria-label={texts?.dialogAriaLabel}
      >
        <style>{`
          body.contraste-negativo .hc-dashboard-tour-card {
            background: #000 !important;
            border-color: #ffea00 !important;
            box-shadow: none !important;
          }
          body.contraste-negativo .hc-dashboard-tour-title {
            color: #ffea00 !important;
          }
          body.contraste-negativo .hc-dashboard-tour-text,
          body.contraste-negativo .hc-dashboard-tour-progress {
            color: #fff !important;
          }
          body.contraste-negativo .hc-dashboard-tour-next {
            background: #ffea00 !important;
            color: #000 !important;
          }
          body.contraste-negativo .hc-dashboard-tour-close {
            background: transparent !important;
            border-color: #ffea00 !important;
            color: #ffea00 !important;
          }
          body.contraste-negativo .hc-dashboard-tour-highlight {
            border-color: #ffea00 !important;
            box-shadow: 0 0 0 2px rgba(255, 234, 0, 0.28) !important;
          }
        `}</style>

        {overlayParts
          ? overlayParts.map((part) => (
            <motion.div
              key={part.key}
              animate={{
                backgroundColor: "rgba(5, 24, 49, 0.72)",
              }}
              className="absolute overflow-hidden backdrop-blur-[2px]"
              style={part.style}
            >
              <motion.div
                animate={{
                  x: ["-8%", "6%", "-4%"],
                  y: ["-3%", "5%", "-2%"],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-[#00AEEF]/18 blur-3xl"
              />
              <motion.div
                animate={{
                  x: ["4%", "-6%", "2%"],
                  y: ["0%", "-4%", "3%"],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#0B2341]/35 blur-3xl"
              />
            </motion.div>
          ))
          : <div className="absolute inset-0 bg-[#051831]/72 backdrop-blur-[2px]" />}

        {highlightRect && (
          <motion.div
            layout
            className="hc-dashboard-tour-highlight pointer-events-none absolute rounded-[28px] border-2 border-[#73D7FF] bg-transparent shadow-[0_0_0_2px_rgba(115,215,255,0.16)]"
            style={{
              top: highlightRect.top,
              left: highlightRect.left,
              width: highlightRect.width,
              height: highlightRect.height,
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="hc-dashboard-tour-card pointer-events-auto absolute rounded-[30px] border border-white/15 bg-[#071B34]/95 p-5 text-white shadow-[0_30px_90px_-34px_rgba(5,24,49,0.95)] backdrop-blur-xl sm:p-6"
            style={cardPosition}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="hc-dashboard-tour-progress text-[11px] font-black uppercase tracking-[0.22em] text-[#73D7FF]">
                  {progressLabel}
                </p>
                <h2 className="hc-dashboard-tour-title mt-2 text-xl font-black tracking-tight text-white">
                  {step.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={texts?.close}
                className="hc-dashboard-tour-close flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#73D7FF]/35"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <p className="hc-dashboard-tour-text text-sm leading-6 text-slate-200">
              {step.description}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="hc-dashboard-tour-close min-h-12 rounded-2xl border border-white/15 bg-white/5 px-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#73D7FF]/35"
              >
                {texts?.close}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="hc-dashboard-tour-next min-h-12 flex-1 rounded-2xl bg-[#00AEEF] px-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-[#0893c9] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#73D7FF]/35"
              >
                {texts?.next}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
