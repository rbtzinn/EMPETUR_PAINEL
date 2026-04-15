import { normalizarEspacos } from "../stringUtils";
import {
  formatarTitulo,
  limparPontuacaoFinal,
  normalizarChaveEvento,
} from "./shared";

const ALIASES_EVENTOS = {
  "FESTA DE SAO SEBASTIAO DE URUCU MIRIM": "Festa de São Sebastião de Uruçu Mirim",
  "FESTA DE SAO SEBASTIAO RUA DO LIVRAMENTO": "Festa de São Sebastião Rua do Livramento",
};

const normalizarNomeEvento = (eventoOriginal, obsOriginal = "") => {
  if (!eventoOriginal) return null;

  let evento = normalizarEspacos(eventoOriginal.toUpperCase());
  const obs = normalizarEspacos((obsOriginal || "").toUpperCase());

  evento = evento
    .replace(/^[,:;\-\s]+/, "")
    .replace(/^(?:NO|NA|EM)\s+/, "")
    .replace(/^EVENTO\s+/, "")
    .replace(/^FESTIVIDADES?\s+/, "FESTA ")
    .replace(/^CELEBRA[ÇC][ÃA]O\s+/, "CELEBRAÇÃO ")
    .replace(/^COMEMORA[ÇC][ÃA]O\s+/, "COMEMORAÇÃO ")
    .replace(/REV[ÉE]ILLON/g, "RÉVEILLON")
    .replace(/CONG\.?\s*PERNAMB\.?\s*DE/g, "CONG. PERNAMB. DE")
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s+/g, " ")
    .trim();

  if (
    /^(DE|DO|DA|DOS|DAS)\s+/.test(evento) &&
    /\b(FESTA|FESTIVIDADE|FESTIVIDADES)\b/.test(obs)
  ) {
    evento = `FESTA ${evento}`;
  }

  evento = evento
    .replace(/(\d+)[°º]/g, "$1º")
    .replace(/(\d+)ª/g, "$1ª")
    .replace(/\s+/g, " ")
    .trim();

  const chave = normalizarChaveEvento(evento);
  if (ALIASES_EVENTOS[chave]) {
    return ALIASES_EVENTOS[chave];
  }

  return formatarTitulo(evento);
};

export const extrairNomeEvento = (obsOriginal, artista) => {
  if (!obsOriginal || !artista || artista === "NÃO IDENTIFICADO") return null;

  const obs = normalizarEspacos(obsOriginal.toUpperCase());
  const artistaUpper = normalizarEspacos(artista.toUpperCase());

  let trecho = obs;
  const indexArtista = obs.indexOf(artistaUpper);

  if (indexArtista !== -1) {
    trecho = obs.substring(indexArtista + artistaUpper.length);
  }

  const stop =
    "(?=,|NA\\s+CIDADE(?:\\s+DE)?|NO\\s+MUNIC[IÍ]PIO(?:\\s+DE)?|EM\\s+[A-ZÀ-Ú\\s]{3,120}\\/[A-Z]{2}\\b|NO\\s+DIA\\s+\\d|DIA\\s+\\d|PROCESSO|SEI|VALOR|$)";

  const regexes = [
    new RegExp(`(?:PARA\\s+PARTICIPA[ÇC][ÃA]O\\s+NO\\s+EVENTO|PARA\\s+PARTICIPAR\\s+DO\\s+EVENTO|PARA\\s+O\\s+EVENTO|PARA\\s+A\\s+FESTA|PARA\\s+O\\s+FESTIVAL|REFERENTE\\s+AO\\s+EVENTO|REFERENTE\\s+A\\s+FESTA|REFERENTE\\s+AO\\s+FESTIVAL)\\s+(.*?)${stop}`, "i"),
    new RegExp(`(?:,\\s*|\\s+)(?:NO|NA|EM)\\s+(.*?)${stop}`, "i"),
    new RegExp(`^(?:\\s*[:,;-]?\\s*)(.*?)${stop}`, "i"),
  ];

  let evento = null;

  for (const regex of regexes) {
    const match = trecho.match(regex);
    if (match?.[1]) {
      evento = match[1];
      break;
    }
  }

  if (!evento) return null;

  evento = limparPontuacaoFinal(evento);
  evento = normalizarNomeEvento(evento, obsOriginal);

  if (!evento || evento.length < 3) return null;

  return evento;
};
