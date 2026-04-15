import { formatarDataPartes } from "./shared";

const extrairDataFallbackEmpenho = (dataEmpenho = "") => {
  const match = String(dataEmpenho || "").match(
    /\b(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})\b/
  );

  if (!match) return "---";
  return formatarDataPartes(match[1], match[2], match[3]);
};

export const extrairDataEvento = (obsOriginal, dataEmpenho = "") => {
  const fallback = extrairDataFallbackEmpenho(dataEmpenho);

  if (!obsOriginal) return fallback;

  let obs = String(obsOriginal)
    .toUpperCase()
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  obs = obs
    .replace(/\b(\d{1,2})\s+(\d{1,2})\s+(\d{4})\b/g, "$1/$2/$3")
    .replace(/\b(\d{1,2})\/(\d{2})(\d{4})\b/g, "$1/$2/$3")
    .replace(/\b(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})\b/g, "$1/$2/$3")
    .replace(/\b(\d{1,2}\/\d{1,2}\/\d{4})\d+\b/g, "$1")
    .replace(/\b(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{2,4})\b/g, "$1.$2.$3");

  const matchNum = obs.match(
    /\b(\d{1,2})\s*[\/.-]\s*(\d{1,2})\s*[\/.-]\s*(\d{2,4})(?:\d+)?\b/
  );

  if (matchNum) {
    const data = formatarDataPartes(matchNum[1], matchNum[2], matchNum[3]);
    if (data !== "---") return data;
  }

  const meses = {
    JANEIRO: "01",
    FEVEREIRO: "02",
    MARÇO: "03",
    MARCO: "03",
    ABRIL: "04",
    MAIO: "05",
    JUNHO: "06",
    JULHO: "07",
    AGOSTO: "08",
    SETEMBRO: "09",
    OUTUBRO: "10",
    NOVEMBRO: "11",
    DEZEMBRO: "12",
  };

  const regexExtenso = new RegExp(
    `(?:DIA\\s+)?([0-9]{1,2})\\s+DE\\s+(${Object.keys(meses).join("|")})\\s+(?:DE\\s+)?([0-9]{4})`
  );

  const matchExtenso = obs.match(regexExtenso);
  if (matchExtenso) {
    return formatarDataPartes(
      matchExtenso[1],
      meses[matchExtenso[2]],
      matchExtenso[3]
    );
  }

  return fallback;
};
