import { normalizarEspacos } from "../stringUtils";
import { canonizarArtista } from "../artistUtils";

export const extrairArtista = (obsOriginal) => {
  if (!obsOriginal) return "NÃƒO IDENTIFICADO";

  let obs = normalizarEspacos(obsOriginal.toUpperCase());

  const regexArtista =
    /(?:(?:\d{1,2}\s+)?(?:A?PRE[A-ZÃ‡Ãƒ.]*|PRESENT[A-ZÃ‡Ãƒ.]*)(?:\s*ART[IÃ]STIC[A-Z.]*)?|ART[IÃ]STIC[A-Z.]*|SHOW|CONTRATA[Ã‡C][ÃƒA]O|CACH[EÃŠ])(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+PARA\s+|\s+DURANTE\s+|\s+NO\s+DIA|\s*EVENTO|\s*-\s*|$)/;

  const match = obs.match(regexArtista);
  let artistaRaw = "NÃƒO IDENTIFICADO";

  if (match?.[1]) {
    artistaRaw = match[1].replace(/\(.*?\)/g, "").trim();
  } else if (/FESTIVAL|PERNAMBUCO MEU PA[IÃ]S|CARNAVAL|S[ÃƒA]O JO[ÃƒA]O|FESTA/i.test(obs)) {
    const regexFallback = /^(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+)/;
    const fallbackMatch = obs.match(regexFallback);
    if (fallbackMatch?.[1]) {
      artistaRaw = fallbackMatch[1].replace(/\(.*?\)/g, "").trim();
    }
  }

  artistaRaw = artistaRaw
    .replace(
      /^(?:UM|UMA|DOIS|DUAS|TR[EÃŠ]S|QUATRO)?\s*(?:\(\d{1,2}\))?\s*(?:APRESENTA[Ã‡C][OÃ•]ES|APRESENTA[Ã‡C][ÃƒA]O|SHOWS?|ART[IÃ]STIC[A-Z.]*)*\s*(?:DE|DA|DO|DAS|DOS)?\s*/i,
      ""
    )
    .replace(/^\d{1,2}\s+/, "")
    .trim();

  const palavrasSujas = [
    "APRESENTAÃ‡Ã•ES",
    "APRESENTACOES",
    "APRESENTAÃ‡ÃƒO",
    "APRESENTACAO",
    "PRESENTAÃ‡ÃƒO",
    "PRESENTACAO",
    "APRESEN",
    "PRESE",
    "ARTÃSTICAS",
    "ARTISTICAS",
    "ARTÃSTICA",
    "ARTISTICA",
    "CONTRATAÃ‡ÃƒO",
    "VALOR",
    "REFERENTE",
    "PROCESSO",
    "PAGAMENTO",
  ];

  palavrasSujas.forEach((ps) => {
    if (artistaRaw.startsWith(ps)) {
      artistaRaw = artistaRaw.replace(ps, "").trim();
    }
  });

  artistaRaw = artistaRaw
    .replace(/^(DE|DA|DO|DAS|DOS)\s+/, "")
    .replace(/^(?:O\s+|A\s+)?(?:CANTORA?|ARTISTA|BANDA)\s+/i, "")
    .replace(/\s*-\s*$/, "")
    .replace(/\s*(?:FESTIVAL|PERNAMBUCO MEU PA[IÃ]S|EDI[Ã‡C][ÃƒA]O|POLO|NA CIDADE).*$/i, "")
    .trim();

  return canonizarArtista(artistaRaw);
};
