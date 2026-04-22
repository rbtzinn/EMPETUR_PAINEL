import {
  calculatePaymentDeadline,
  formatCurrency,
  maskDocument,
} from "./dashboardFormatters";

const NAVY = [11, 35, 65];
const ACCENT = [0, 174, 239];
const SLATE = [100, 116, 139];
const LIGHT = [241, 245, 249];
const BORDER = [226, 232, 240];

const replaceTemplate = (template, values) =>
  Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template
  );

const buildTopArtists = (rows) => {
  const counts = {};

  rows.forEach((item) => {
    const name = item.artista || "N/A";
    counts[name] = (counts[name] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([nome, total]) => ({ nome, total }))
    .sort((left, right) =>
      right.total !== left.total
        ? right.total - left.total
        : left.nome.localeCompare(right.nome)
    )
    .slice(0, 5);
};

const buildActiveFiltersText = (filters, fieldLabels, emptyLabel) => {
  const active = Object.entries(filters)
    .filter(([, value]) => value !== "")
    .map(([key, value]) => `${fieldLabels[key] || key}: ${value}`);

  return active.length ? active.join(" | ") : emptyLabel;
};

const splitLines = (pdf, text, width) => {
  const safeText = String(text ?? "").trim();
  return safeText ? pdf.splitTextToSize(safeText, width) : [""];
};

const drawMetricCard = (pdf, { x, y, w, h, label, value, accent = false }) => {
  pdf.setDrawColor(...BORDER);
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(x, y, w, h, 3, 3, "FD");

  pdf.setTextColor(...SLATE);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text(label.toUpperCase(), x + 4, y + 6);

  pdf.setTextColor(...(accent ? ACCENT : NAVY));
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text(String(value), x + 4, y + 16);
};

const drawListBox = (pdf, { x, y, w, h, title, items, emptyLabel }) => {
  pdf.setDrawColor(...BORDER);
  pdf.setFillColor(...LIGHT);
  pdf.roundedRect(x, y, w, h, 3, 3, "FD");

  pdf.setTextColor(...NAVY);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text(title, x + 4, y + 6);

  let cursorY = y + 12;
  const maxY = y + h - 4;

  if (!items.length) {
    pdf.setTextColor(...SLATE);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(emptyLabel, x + 4, cursorY);
    return;
  }

  items.forEach((item, index) => {
    if (cursorY > maxY) return;

    const line = item.value != null
      ? `${index + 1}. ${item.label} - ${item.value}`
      : `${index + 1}. ${item.label}`;
    const wrapped = splitLines(pdf, line, w - 8).slice(0, 2);

    pdf.setTextColor(...NAVY);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(wrapped, x + 4, cursorY);
    cursorY += wrapped.length * 3.6 + 1.2;
  });
};

const drawFooter = (pdf, {
  pageLabel,
  pageNumber,
  generatedLabel,
  generatedAt,
  pageW,
  pageH,
  margin,
}) => {
  pdf.setDrawColor(...BORDER);
  pdf.line(margin, pageH - 10, pageW - margin, pageH - 10);

  pdf.setTextColor(...SLATE);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text(`${generatedLabel}: ${generatedAt}`, margin, pageH - 5);
  pdf.text(`${pageLabel} ${pageNumber}`, pageW - margin, pageH - 5, {
    align: "right",
  });
};

const drawTableHeader = (pdf, { columns, xPositions, startY }) => {
  pdf.setFillColor(...LIGHT);
  pdf.setDrawColor(...BORDER);
  pdf.rect(xPositions[0], startY, xPositions[xPositions.length - 1] - xPositions[0], 10, "FD");

  pdf.setTextColor(...SLATE);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);

  columns.forEach((column, index) => {
    const x = xPositions[index] + (column.align === "right" ? column.width - 2 : 2);
    pdf.text(column.label.toUpperCase(), x, startY + 6, {
      align: column.align === "right" ? "right" : "left",
    });
  });
};

const buildTableRows = (rows, locale, texts) =>
  rows.map((item) => {
    const deadline = calculatePaymentDeadline(item.dataEvento, {
      pendingLabel: texts.pendingLabel,
      fallbackLabel: texts.fallbackLabel,
    });

    return {
      artist: [
        item.artista || texts.emptyValue,
        `${texts.commitmentLabel} ${item.numeroEmpenho || texts.emptyValue}`,
      ],
      creditor: [
        item.nomeCredor || texts.emptyValue,
        maskDocument(item.documentoCredor, { emptyLabel: texts.emptyValue }),
      ],
      municipality: [item.municipio || texts.emptyValue],
      cycle: [item.ciclo || texts.emptyValue],
      event: [
        item.dataEvento || texts.pendingLabel,
        `${texts.deadlineLabel} ${deadline}`,
      ],
      value: [formatCurrency(item.valor ?? item.valorPago ?? 0, locale)],
    };
  });

export async function exportarBIRelatorioPDF({
  filename = "EMPETUR_BI_Relatorio.pdf",
  rows = [],
  filters = {},
  fieldLabels = {},
  registrosPorMunicipio = [],
  registrosPorCiclo = [],
  registrosPorAno = [],
  lastUpdate = "",
  locale = "pt-BR",
  texts,
} = {}) {
  const { default: jsPDF } = await import("jspdf");

  if (!texts) {
    throw new Error("Missing PDF report texts.");
  }

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 14;
  const gap = 6;
  const generatedAt = new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  const totalArtists = new Set(rows.map((item) => item.artista)).size;
  const totalMunicipalities = new Set(rows.map((item) => item.municipio)).size;
  const topDestination = registrosPorMunicipio[0]?.nome || "-";
  const activeFiltersText = buildActiveFiltersText(
    filters,
    fieldLabels,
    texts.noFiltersLabel
  );
  const topArtists = buildTopArtists(rows);

  pdf.setFillColor(...NAVY);
  pdf.rect(0, 0, pageW, 16, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text(texts.badge, margin, 10.3);

  pdf.setTextColor(...NAVY);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  const titleLines = splitLines(pdf, texts.title, pageW - margin * 2);
  pdf.text(titleLines, margin, 28);

  let cursorY = 28 + titleLines.length * 5 + 2;

  pdf.setTextColor(...SLATE);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  const descriptionLines = splitLines(pdf, texts.description, pageW - margin * 2);
  pdf.text(descriptionLines, margin, cursorY);
  cursorY += descriptionLines.length * 4 + 4;

  pdf.setFontSize(9);
  pdf.text(
    `${texts.sourceLabel}: ${texts.sourceValue} | ${texts.frequencyLabel}: ${texts.frequencyValue} | ${texts.lastUpdateLabel}: ${lastUpdate} | ${texts.generatedLabel}: ${generatedAt}`,
    margin,
    cursorY
  );
  cursorY += 8;

  const metricY = cursorY;
  const metricW = (pageW - margin * 2 - gap * 3) / 4;
  const metricH = 22;

  drawMetricCard(pdf, {
    x: margin,
    y: metricY,
    w: metricW,
    h: metricH,
    label: texts.metrics.presentations,
    value: rows.length.toLocaleString(locale),
  });
  drawMetricCard(pdf, {
    x: margin + (metricW + gap),
    y: metricY,
    w: metricW,
    h: metricH,
    label: texts.metrics.artists,
    value: totalArtists.toLocaleString(locale),
  });
  drawMetricCard(pdf, {
    x: margin + (metricW + gap) * 2,
    y: metricY,
    w: metricW,
    h: metricH,
    label: texts.metrics.municipalities,
    value: totalMunicipalities.toLocaleString(locale),
  });
  drawMetricCard(pdf, {
    x: margin + (metricW + gap) * 3,
    y: metricY,
    w: metricW,
    h: metricH,
    label: texts.metrics.topDestination,
    value: topDestination,
    accent: true,
  });

  cursorY = metricY + metricH + 7;

  pdf.setDrawColor(...BORDER);
  pdf.setFillColor(...LIGHT);
  pdf.roundedRect(margin, cursorY, pageW - margin * 2, 16, 3, 3, "FD");
  pdf.setTextColor(...NAVY);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text(texts.filtersLabel.toUpperCase(), margin + 4, cursorY + 6);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...SLATE);
  pdf.setFontSize(8.5);
  pdf.text(splitLines(pdf, activeFiltersText, pageW - margin * 2 - 8), margin + 4, cursorY + 11);

  cursorY += 24;

  const listY = cursorY;
  const listW = (pageW - margin * 2 - gap * 3) / 4;
  const listH = 58;

  drawListBox(pdf, {
    x: margin,
    y: listY,
    w: listW,
    h: listH,
    title: texts.sections.municipalities,
    items: registrosPorMunicipio.slice(0, 5).map((item) => ({
      label: item.nome,
      value: item.total,
    })),
    emptyLabel: texts.emptyRecords,
  });
  drawListBox(pdf, {
    x: margin + (listW + gap),
    y: listY,
    w: listW,
    h: listH,
    title: texts.sections.cycles,
    items: registrosPorCiclo.slice(0, 5).map((item) => ({
      label: item.ciclo,
      value: item.total,
    })),
    emptyLabel: texts.emptyRecords,
  });
  drawListBox(pdf, {
    x: margin + (listW + gap) * 2,
    y: listY,
    w: listW,
    h: listH,
    title: texts.sections.years,
    items: registrosPorAno.slice(0, 5).map((item) => ({
      label: String(item.ano),
      value: item.total,
    })),
    emptyLabel: texts.emptyRecords,
  });
  drawListBox(pdf, {
    x: margin + (listW + gap) * 3,
    y: listY,
    w: listW,
    h: listH,
    title: texts.sections.artists,
    items: topArtists.map((item) => ({
      label: item.nome,
      value: item.total,
    })),
    emptyLabel: texts.emptyRecords,
  });

  let pageNumber = 1;
  drawFooter(pdf, {
    pageLabel: texts.pageLabel,
    pageNumber,
    generatedLabel: texts.generatedLabel,
    generatedAt,
    pageW,
    pageH,
    margin,
  });

  if (!rows.length) {
    pdf.save(filename);
    return { previewDataUrl: null };
  }

  pdf.addPage();
  pageNumber += 1;

  const columns = [
    { key: "artist", label: texts.tableHeaders.artist, width: 56, align: "left" },
    { key: "creditor", label: texts.tableHeaders.creditor, width: 58, align: "left" },
    { key: "municipality", label: texts.tableHeaders.municipality, width: 32, align: "left" },
    { key: "cycle", label: texts.tableHeaders.cycle, width: 40, align: "left" },
    { key: "event", label: texts.tableHeaders.event, width: 47, align: "left" },
    { key: "value", label: texts.tableHeaders.value, width: 36, align: "right" },
  ];
  const xPositions = columns.reduce(
    (positions, column) => {
      const nextX = positions[positions.length - 1] + column.width;
      positions.push(nextX);
      return positions;
    },
    [margin]
  );
  const tableRows = buildTableRows(rows, locale, {
    commitmentLabel: texts.commitmentLabel,
    deadlineLabel: texts.deadlineLabel,
    pendingLabel: texts.pendingLabel,
    fallbackLabel: texts.fallbackLabel,
    emptyValue: texts.emptyValue,
  });

  const drawTablePageFrame = () => {
    pdf.setFillColor(...NAVY);
    pdf.rect(0, 0, pageW, 16, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text(texts.sections.records, margin, 10.3);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(
      replaceTemplate(texts.recordsSubtitle, {
        count: rows.length.toLocaleString(locale),
      }),
      pageW - margin,
      10.3,
      { align: "right" }
    );

    pdf.setTextColor(...SLATE);
    pdf.setFontSize(8);
    const filterLines = splitLines(
      pdf,
      `${texts.filtersLabel}: ${activeFiltersText}`,
      pageW - margin * 2
    );
    pdf.text(filterLines, margin, 22);

    const headerY = 26 + Math.max(0, (filterLines.length - 1) * 3.2);
    drawTableHeader(pdf, { columns, xPositions, startY: headerY });
    return headerY + 12;
  };

  let rowY = drawTablePageFrame();

  tableRows.forEach((row, index) => {
    const cellLines = columns.map((column) => {
      const lines = row[column.key];
      return lines.flatMap((line) => splitLines(pdf, line, column.width - 4));
    });
    const rowLineCount = Math.max(...cellLines.map((lines) => lines.length));
    const rowHeight = Math.max(14, 4 + rowLineCount * 3.8);

    if (rowY + rowHeight > pageH - 16) {
      drawFooter(pdf, {
        pageLabel: texts.pageLabel,
        pageNumber,
        generatedLabel: texts.generatedLabel,
        generatedAt,
        pageW,
        pageH,
        margin,
      });
      pdf.addPage();
      pageNumber += 1;
      rowY = drawTablePageFrame();
    }

    if (index % 2 === 0) {
      pdf.setFillColor(250, 252, 255);
      pdf.rect(margin, rowY, pageW - margin * 2, rowHeight, "F");
    }

    pdf.setDrawColor(...BORDER);
    pdf.line(margin, rowY + rowHeight, pageW - margin, rowY + rowHeight);

    columns.forEach((column, columnIndex) => {
      const x = xPositions[columnIndex];
      const lines = cellLines[columnIndex];
      const textX = column.align === "right" ? x + column.width - 2 : x + 2;

      pdf.setTextColor(...(column.key === "value" ? ACCENT : NAVY));
      pdf.setFont("helvetica", column.key === "value" ? "bold" : "normal");
      pdf.setFontSize(8.5);
      pdf.text(lines, textX, rowY + 5, {
        align: column.align === "right" ? "right" : "left",
      });
    });

    rowY += rowHeight;
  });

  drawFooter(pdf, {
    pageLabel: texts.pageLabel,
    pageNumber,
    generatedLabel: texts.generatedLabel,
    generatedAt,
    pageW,
    pageH,
    margin,
  });

  pdf.save(filename);
  return { previewDataUrl: null };
}
