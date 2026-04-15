import { normalizarEspacos } from "../stringUtils";

export const extrairArtista = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";

  let obs = normalizarEspacos(obsOriginal.toUpperCase());

  const regexArtista =
    /(?:(?:\d{1,2}\s+)?(?:A?PRE[A-ZÇÃ.]*|PRESENT[A-ZÇÃ.]*)(?:\s*ART[IÍ]STIC[A-Z.]*)?|ART[IÍ]STIC[A-Z.]*|SHOW|CONTRATA[ÇC][ÃA]O|CACH[EÊ])(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+PARA\s+|\s+DURANTE\s+|\s+NO\s+DIA|\s*EVENTO|\s*-\s*|$)/;

  const match = obs.match(regexArtista);
  let artistaRaw = "NÃO IDENTIFICADO";

  if (match?.[1]) {
    artistaRaw = match[1].replace(/\(.*?\)/g, "").trim();
  } else if (/FESTIVAL|PERNAMBUCO MEU PA[IÍ]S|CARNAVAL|S[ÃA]O JO[ÃA]O|FESTA/i.test(obs)) {
    const regexFallback = /^(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+)/;
    const fallbackMatch = obs.match(regexFallback);
    if (fallbackMatch?.[1]) {
      artistaRaw = fallbackMatch[1].replace(/\(.*?\)/g, "").trim();
    }
  }

  artistaRaw = artistaRaw
    .replace(
      /^(?:UM|UMA|DOIS|DUAS|TR[EÊ]S|QUATRO)?\s*(?:\(\d{1,2}\))?\s*(?:APRESENTA[ÇC][OÕ]ES|APRESENTA[ÇC][ÃA]O|SHOWS?|ART[IÍ]STIC[A-Z.]*)*\s*(?:DE|DA|DO|DAS|DOS)?\s*/i,
      ""
    )
    .replace(/^\d{1,2}\s+/, "")
    .trim();

  const palavrasSujas = [
    "APRESENTAÇÕES",
    "APRESENTACOES",
    "APRESENTAÇÃO",
    "APRESENTACAO",
    "PRESENTAÇÃO",
    "PRESENTACAO",
    "APRESEN",
    "PRESE",
    "ARTÍSTICAS",
    "ARTISTICAS",
    "ARTÍSTICA",
    "ARTISTICA",
    "CONTRATAÇÃO",
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
    .replace(/\s*(?:FESTIVAL|PERNAMBUCO MEU PA[IÍ]S|EDI[ÇC][ÃA]O|POLO|NA CIDADE).*$/i, "")
    .trim();

  const mapaArtistas = {
    ALYSSON: "ALYSSON CANTOR",
    "BANDA D ROMANCE": "BANDA D' ROMANCE",
    "BANDA D' ROMANCE": "BANDA D' ROMANCE",
    "D' ROMANCE": "BANDA D' ROMANCE",
    "D ROMANCE": "BANDA D' ROMANCE",
    "BANDA KEBRANÇAS": "BANDA KEBRANÇA",
    "BANDA KEBRANÇA": "BANDA KEBRANÇA",
    "BANDA SWINGNOVO": "BANDA SWING NOVO",
    "BANDA SWING NOVO": "BANDA SWING NOVO",
    "SWING NOVO": "BANDA SWING NOVO",
    "MARILIA MARQUES": "MARÍLIA MARQUES",
    "MARÍLIA MARQUES": "MARÍLIA MARQUES",
    "MATHEUS VINNI": "MATHEUS VINI",
    "MATHEUS VINI": "MATHEUS VINI",
    "ORQUESTRA DE FREVO MEXE COM TUDO -": "ORQUESTRA DE FREVO MEXE COM TUDO",
    "ORQUESTRA DE FREVO MEXE COM TUDO": "ORQUESTRA DE FREVO MEXE COM TUDO",
    "ORQ DE FREVO MEXE COM TUDO": "ORQUESTRA DE FREVO MEXE COM TUDO",
    "BFULÔ DE MANDACARÚ": "FULÔ DE MANDACARÚ",
    "BFULO DE MANDACARU": "FULÔ DE MANDACARÚ",
  };

  return mapaArtistas[artistaRaw] || artistaRaw;
};
