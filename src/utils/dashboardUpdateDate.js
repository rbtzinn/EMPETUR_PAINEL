import Papa from "papaparse";

const FALLBACK_UPDATE_DAY = 7;
const FALLBACK_UPDATE_MONTH_INDEX = 4;
const FALLBACK_UPDATE_YEAR = 2026;

const updateDateRequestCache = new Map();

const UPDATE_FIELD_NAMES = new Set([
  "ATUALIZACAO",
  "ATUALIZADO EM",
  "DATA ATUALIZACAO",
  "DATA DA ATUALIZACAO",
  "DATA DE ATUALIZACAO",
  "DATA BASE",
  "DATA DA BASE",
  "ULTIMA ATUALIZACAO",
  "ULTIMA DATA ATUALIZACAO",
]);

const normalizeKey = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const createLocalDate = (year, monthIndex, day) =>
  new Date(year, monthIndex, day, 12, 0, 0, 0);

const isValidDateParts = (day, month, year) => {
  if (year < 1900 || year > 2200 || month < 1 || month > 12 || day < 1) {
    return false;
  }

  const candidate = createLocalDate(year, month - 1, day);
  return (
    candidate.getFullYear() === year &&
    candidate.getMonth() === month - 1 &&
    candidate.getDate() === day
  );
};

export const parseDashboardDate = (value = "") => {
  const text = String(value || "").trim();
  if (!text || text === "---") return null;

  const brMatch = text.match(/\b(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})\b/);
  if (brMatch) {
    const day = Number(brMatch[1]);
    const month = Number(brMatch[2]);
    const year =
      brMatch[3].length === 2 ? Number(`20${brMatch[3]}`) : Number(brMatch[3]);

    if (isValidDateParts(day, month, year)) {
      return createLocalDate(year, month - 1, day);
    }
  }

  const isoMatch = text.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);

    if (isValidDateParts(day, month, year)) {
      return createLocalDate(year, month - 1, day);
    }
  }

  return null;
};

export const formatDashboardDate = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "---";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}/${date.getFullYear()}`;
};

const getMonthlyFallbackDate = (referenceDate = new Date()) => {
  const baseDate = createLocalDate(
    FALLBACK_UPDATE_YEAR,
    FALLBACK_UPDATE_MONTH_INDEX,
    FALLBACK_UPDATE_DAY
  );

  if (referenceDate < baseDate) return baseDate;

  const monthsSinceBase =
    (referenceDate.getFullYear() - FALLBACK_UPDATE_YEAR) * 12 +
    (referenceDate.getMonth() - FALLBACK_UPDATE_MONTH_INDEX) -
    (referenceDate.getDate() < FALLBACK_UPDATE_DAY ? 1 : 0);

  return createLocalDate(
    FALLBACK_UPDATE_YEAR,
    FALLBACK_UPDATE_MONTH_INDEX + Math.max(0, monthsSinceBase),
    FALLBACK_UPDATE_DAY
  );
};

const getRowUpdateDate = (row = {}) => {
  if (row.dataAtualizacaoBase) {
    const date = parseDashboardDate(row.dataAtualizacaoBase);
    if (date) return date;
  }

  for (const [key, value] of Object.entries(row)) {
    if (!UPDATE_FIELD_NAMES.has(normalizeKey(key))) continue;

    const date = parseDashboardDate(value);
    if (date) return date;
  }

  return null;
};

const getMaxDate = (dates) =>
  dates.reduce((latest, date) => {
    if (!date) return latest;
    if (!latest || date > latest) return date;
    return latest;
  }, null);

export const getDashboardLastUpdateDate = (rows = []) => {
  const updateDateFromSheet = getMaxDate(rows.map(getRowUpdateDate));
  if (updateDateFromSheet) return formatDashboardDate(updateDateFromSheet);

  const latestCommitmentDate = getMaxDate(
    rows.map((row) => parseDashboardDate(row.dataEmpenho))
  );
  if (latestCommitmentDate) return formatDashboardDate(latestCommitmentDate);

  return formatDashboardDate(getMonthlyFallbackDate());
};

export const extractDashboardUpdateDateFromRows = (rows = []) => {
  const date = getMaxDate(rows.map(getRowUpdateDate));
  return date ? formatDashboardDate(date) : "";
};

export const loadDashboardUpdateDate = async (url) => {
  if (!url) return "";

  if (!updateDateRequestCache.has(url)) {
    const request = fetch(url)
      .then((response) => response.text())
      .then(
        (csv) =>
          new Promise((resolve) => {
            Papa.parse(csv, {
              header: true,
              skipEmptyLines: true,
              complete: ({ data }) => {
                resolve(extractDashboardUpdateDateFromRows(data));
              },
              error: () => resolve(""),
            });
          })
      )
      .catch((error) => {
        updateDateRequestCache.delete(url);
        throw error;
      });

    updateDateRequestCache.set(url, request);
  }

  return updateDateRequestCache.get(url);
};
