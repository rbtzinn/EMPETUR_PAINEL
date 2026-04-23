import { normalizarEspacos } from "./stringUtils";

const CANONICAL_ARTIST_LABELS = Object.freeze({
  ALYSSON: "ALYSSON CANTOR",
  "ALYSSON CANTOR": "ALYSSON CANTOR",
  "BANDA D ROMANCE": "BANDA D' ROMANCE",
  "D ROMANCE": "BANDA D' ROMANCE",
  "BANDA KEBRANCA": "BANDA KEBRAN\u00c7A",
  "BANDA KEBRANCAS": "BANDA KEBRAN\u00c7A",
  "BANDA SWINGNOVO": "BANDA SWING NOVO",
  "BANDA SWING NOVO": "BANDA SWING NOVO",
  "SWING NOVO": "BANDA SWING NOVO",
  "MARILIA MARQUES": "MAR\u00cdLIA MARQUES",
  "MATHEUS VINNI": "MATHEUS VINI",
  "MATHEUS VINI": "MATHEUS VINI",
  "ORQUESTRA DE FREVO MEXE COM TUDO": "ORQUESTRA DE FREVO MEXE COM TUDO",
  "ORQ DE FREVO MEXE COM TUDO": "ORQUESTRA DE FREVO MEXE COM TUDO",
  "BFULO DE MANDACARU": "FUL\u00d4 DE MANDACAR\u00da",
  "ZUADOES DO FORRO": "ZUAD\u00d5ES DO FORR\u00d3",
  "WAGNHO ZUADOES": "WAGNHO ZUAD\u00d5ES",
});

export const normalizarArtista = (texto = "") =>
  normalizarEspacos(String(texto))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2019']/g, "")
    .replace(/[.,;:()[\]"]/g, " ")
    .replace(/\s*-\s*/g, " ")
    .toUpperCase()
    .trim();

export const canonizarArtista = (texto = "") => {
  const base = normalizarEspacos(String(texto).toUpperCase())
    .replace(/\s*-\s*$/, "")
    .trim();

  if (!base) return "N\u00c3O IDENTIFICADO";

  const chave = normalizarArtista(base);
  return CANONICAL_ARTIST_LABELS[chave] || base;
};
