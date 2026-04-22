/**
 * exportarBIPDF.js
 * Exporta o painel BI para PDF usando html-to-image + jsPDF.
 * Troca o html2canvas porque ele falhava com oklab/oklch
 * e estava distorcendo o layout do painel.
 */

const HIDE_SELECTORS = [
  ".bi-export-btn",
  "[vw]",
  "[vw-access-button]",
  ".vw-plugin-top-wrapper",
  ".vw-plugin-wrapper",
  "[data-pdf-ignore]",
  ".hc-btn-sugestao",
];

const HIDE_ARIA_LABELS = [
  "Abrir painel de acessibilidade",
  "Open accessibility panel",
];

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function shouldIgnoreNode(node) {
  if (!node) return false;

  const matches = (selector) => {
    try {
      return node.matches?.(selector);
    } catch (_) {
      return false;
    }
  };

  const aria = node.getAttribute?.("aria-label");

  return (
    HIDE_SELECTORS.some((selector) => matches(selector)) ||
    HIDE_ARIA_LABELS.includes(aria) ||
    node.getAttribute?.("data-pdf-ignore") != null
  );
}

export async function exportarBIPDF({
  elementId = "bi-dashboard-root",
  filename = "EMPETUR_BI.pdf",
  messages = {},
} = {}) {
  const { toCanvas } = await import("html-to-image");
  const { default: jsPDF } = await import("jspdf");
  const isEnglish = document.documentElement.lang?.toLowerCase().startsWith("en");
  const fallbackMessages = isEnglish
    ? {
        missingElement: "BI dashboard element not found for export.",
        notVisible: "The BI dashboard must be visible on screen to export the PDF.",
        captureFailed: "Failed to capture the BI dashboard for export.",
        unexpected: "Unexpected failure while exporting the BI PDF.",
      }
    : {
        missingElement: "Elemento do painel BI nao encontrado para exportacao.",
        notVisible: "O painel BI precisa estar visivel na tela para exportar o PDF.",
        captureFailed: "Falha ao capturar o painel BI para exportacao.",
        unexpected: "Falha inesperada ao exportar o PDF do BI.",
      };
  const {
    missingElement,
    notVisible,
    captureFailed,
    unexpected,
  } = { ...fallbackMessages, ...messages };

  const el = document.getElementById(elementId);
  if (!el) {
    throw new Error(missingElement);
  }

  const computed = window.getComputedStyle(el);
  if (computed.display === "none" || computed.visibility === "hidden") {
    throw new Error(notVisible);
  }

  const hidden = [];
  const scrollContainers = [];
  const styleEl = document.createElement("style");

  const hideEl = (node) => {
    if (!node || hidden.includes(node)) return;
    node.dataset._pdfWasVisible = node.style.visibility || "";
    node.style.visibility = "hidden";
    hidden.push(node);
  };

  styleEl.setAttribute("data-pdf-scrollbar-style", "true");
  styleEl.textContent = `
    [data-pdf-hide-scrollbar="true"]::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      display: none !important;
      background: transparent !important;
    }
  `;
  document.head.appendChild(styleEl);

  el.querySelectorAll(".bi-scroll, .scrollbar-moderna").forEach((node) => {
    scrollContainers.push({
      node,
      overflow: node.style.overflow,
      overflowX: node.style.overflowX,
      overflowY: node.style.overflowY,
      scrollbarWidth: node.style.scrollbarWidth,
      msOverflowStyle: node.style.msOverflowStyle,
      dataset: node.getAttribute("data-pdf-hide-scrollbar"),
    });

    node.setAttribute("data-pdf-hide-scrollbar", "true");
    node.style.overflow = "hidden";
    node.style.overflowX = "hidden";
    node.style.overflowY = "hidden";
    node.style.scrollbarWidth = "none";
    node.style.msOverflowStyle = "none";
  });

  HIDE_SELECTORS.forEach((selector) => {
    try {
      document.querySelectorAll(selector).forEach(hideEl);
    } catch (_) {
      // noop
    }
  });

  HIDE_ARIA_LABELS.forEach((label) => {
    document.querySelectorAll(`[aria-label="${label}"]`).forEach((node) => {
      hideEl(node.closest(".fixed") || node);
    });
  });

  document.querySelectorAll(".fixed, [style*='position: fixed']").forEach((node) => {
    if (!el.contains(node) && !node.closest("[data-pdf-modal]")) {
      hideEl(node);
    }
  });

  await nextFrame();
  await nextFrame();
  await wait(120);

  try {
    const rect = el.getBoundingClientRect();
    const elWidth = Math.round(rect.width) || el.offsetWidth || 1280;
    const elHeight = Math.round(rect.height) || el.offsetHeight || 720;
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1.5;

    const canvas = await toCanvas(el, {
      cacheBust: true,
      pixelRatio,
      backgroundColor: "#EEF4F8",
      width: elWidth,
      height: elHeight,
      canvasWidth: Math.round(elWidth * pixelRatio),
      canvasHeight: Math.round(elHeight * pixelRatio),
      skipAutoScale: true,
      filter: (node) => !shouldIgnoreNode(node),
      style: {
        margin: "0",
        transform: "none",
      },
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error(captureFailed);
    }

    let imgData;
    let imageFormat = "JPEG";

    try {
      imgData = canvas.toDataURL("image/jpeg", 0.95);
    } catch (_) {
      imgData = canvas.toDataURL("image/png");
      imageFormat = "PNG";
    }

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const ratio = canvas.width / canvas.height;

    let imgW = pageW;
    let imgH = pageW / ratio;

    if (imgH > pageH) {
      imgH = pageH;
      imgW = pageH * ratio;
    }

    const xOffset = (pageW - imgW) / 2;
    const yOffset = (pageH - imgH) / 2;

    pdf.addImage(imgData, imageFormat, xOffset, yOffset, imgW, imgH);
    pdf.save(filename);

    try {
      return canvas.toDataURL("image/jpeg", 0.4);
    } catch (_) {
      return canvas.toDataURL("image/png");
    }
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : unexpected;
    throw new Error(message);
  } finally {
    if (styleEl.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }

    scrollContainers.forEach(
      ({ node, overflow, overflowX, overflowY, scrollbarWidth, msOverflowStyle, dataset }) => {
        node.style.overflow = overflow;
        node.style.overflowX = overflowX;
        node.style.overflowY = overflowY;
        node.style.scrollbarWidth = scrollbarWidth;
        node.style.msOverflowStyle = msOverflowStyle;
        if (dataset == null) {
          node.removeAttribute("data-pdf-hide-scrollbar");
        } else {
          node.setAttribute("data-pdf-hide-scrollbar", dataset);
        }
      }
    );

    hidden.forEach((node) => {
      node.style.visibility = node.dataset._pdfWasVisible || "";
      delete node.dataset._pdfWasVisible;
    });
  }
}
