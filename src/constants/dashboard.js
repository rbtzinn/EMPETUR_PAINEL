export const DEFAULT_FILTERS = Object.freeze({
  municipio: "",
  ciclo: "",
  ano: "",
  artista: "",
  dataEvento: "",
  nomeCredor: "",
});

export const FILTER_FIELDS = Object.freeze(Object.keys(DEFAULT_FILTERS));
export const INITIAL_QUICK_TABLE_ROWS = 80;
export const INITIAL_DASHBOARD_TABLE_ROWS = 120;

export const BLOCKED_CYCLE_TERMS = Object.freeze([
  "limpeza",
  "vigilância",
  "cota global",
  "manutenção",
  "locação",
  "passagens",
  "segurança",
]);

export const createDefaultFilters = () => ({ ...DEFAULT_FILTERS });

export const hasActiveFilters = (filters) =>
  FILTER_FIELDS.some((field) => filters[field] !== "");
