import { normalizarEspacos } from "../stringUtils";

export const normalizarChaveMunicipio = (texto = "") =>
  texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const escapeRegex = (texto = "") =>
  texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const limparPontuacaoFinal = (texto = "") =>
  texto.replace(/\s+/g, " ").replace(/\s*[-,:;/.]+\s*$/g, "").trim();

const PALAVRAS_MINUSCULAS_TITULO = new Set([
  "de",
  "da",
  "do",
  "das",
  "dos",
  "e",
  "em",
  "na",
  "no",
  "nas",
  "nos",
  "para",
  "com",
  "por",
]);

export const formatarTitulo = (texto = "") => {
  const textoLimpo = limparPontuacaoFinal(normalizarEspacos(texto));
  if (!textoLimpo) return textoLimpo;

  return textoLimpo
    .toLowerCase()
    .split(" ")
    .map((palavra, index) => {
      if (!palavra) return palavra;

      if (/^\d+$/.test(palavra)) return palavra;
      if (/^[ivxlcdm]+$/i.test(palavra) && palavra.length <= 5) return palavra.toUpperCase();
      if (/^[a-z]\.[a-z]$/i.test(palavra)) return palavra.toUpperCase();
      if (/^[a-z]{2,4}\/[a-z]{2,4}$/i.test(palavra)) return palavra.toUpperCase();

      const palavraSemAcento = palavra
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (index > 0 && PALAVRAS_MINUSCULAS_TITULO.has(palavraSemAcento)) {
        return palavra;
      }

      return palavra
        .split(/([-'])/)
        .map((parte) =>
          parte === "-" || parte === "'"
            ? parte
            : parte.charAt(0).toUpperCase() + parte.slice(1)
        )
        .join("");
    })
    .join(" ")
    .replace(/\s+([,.:;!?])/g, "$1")
    .trim();
};

export const formatarDataPartes = (dia, mes, ano) => {
  const d = String(dia).padStart(2, "0");
  const m = String(mes).padStart(2, "0");
  let a = String(ano);

  if (a.length === 2) a = `20${a}`;
  if (a.length > 4) a = a.slice(0, 4);

  const diaNum = Number(d);
  const mesNum = Number(m);
  const anoNum = Number(a);

  if (
    Number.isNaN(diaNum) ||
    Number.isNaN(mesNum) ||
    Number.isNaN(anoNum) ||
    diaNum < 1 ||
    diaNum > 31 ||
    mesNum < 1 ||
    mesNum > 12
  ) {
    return "---";
  }

  return `${d}/${m}/${a}`;
};

export const normalizarChaveEvento = (texto = "") =>
  texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
