import { normalizarEspacos } from "./stringUtils";
import {
  MUNICIPIOS_PERNAMBUCO,
  municipioEhDePernambuco,
  canonizarMunicipio,
} from "./pernambucoUtils";

const normalizarChaveMunicipio = (texto = "") =>
  texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const escapeRegex = (texto = "") =>
  texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const limparPontuacaoFinal = (texto = "") =>
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

const formatarTitulo = (texto = "") => {
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

const formatarDataPartes = (dia, mes, ano) => {
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

  // Normalizações para datas quebradas/sujas
  obs = obs
    // "04 03 2025" -> "04/03/2025"
    .replace(/\b(\d{1,2})\s+(\d{1,2})\s+(\d{4})\b/g, "$1/$2/$3")

    // "22/092023" -> "22/09/2023"
    .replace(/\b(\d{1,2})\/(\d{2})(\d{4})\b/g, "$1/$2/$3")

    // "12/10 /2024" -> "12/10/2024"
    .replace(/\b(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})\b/g, "$1/$2/$3")

    // "16/03/20255", "16/02/2025360", "17/03/20240625" -> corta lixo após o ano
    .replace(/\b(\d{1,2}\/\d{1,2}\/\d{4})\d+\b/g, "$1")

    // "10.11.2025" -> continua válido
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

export const extrairArtista = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";

  let obs = normalizarEspacos(obsOriginal.toUpperCase());

  const regexArtista =
    /(?:(?:\d{1,2}\s+)?(?:A?PRE[A-ZÇÃ\.]*|PRESENT[A-ZÇÃ\.]*)(?:\s*ART[IÍ]STIC[A-Z\.]*)?|ART[IÍ]STIC[A-Z\.]*|SHOW|CONTRATA[ÇC][ÃA]O|CACH[EÊ])(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+PARA\s+|\s+DURANTE\s+|\s+NO\s+DIA|\s*EVENTO|\s*-\s*|$)/;

  const match = obs.match(regexArtista);
  let artistaRaw = "NÃO IDENTIFICADO";

  if (match?.[1]) {
    artistaRaw = match[1].replace(/\(.*?\)/g, "").trim();
  } else if (/FESTIVAL|PERNAMBUCO MEU PA[IÍ]S|CARNAVAL|S[AÃ]O JO[AÃ]O|FESTA/i.test(obs)) {
    const regexFallback = /^(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+)/;
    const fallbackMatch = obs.match(regexFallback);
    if (fallbackMatch?.[1]) {
      artistaRaw = fallbackMatch[1].replace(/\(.*?\)/g, "").trim();
    }
  }

  artistaRaw = artistaRaw
    .replace(
      /^(?:UM|UMA|DOIS|DUAS|TR[EÊ]S|QUATRO)?\s*(?:\(\d{1,2}\))?\s*(?:APRESENTA[ÇC][OÕ]ES|APRESENTA[ÇC][ÃA]O|SHOWS?|ART[IÍ]STIC[A-Z\.]*)*\s*(?:DE|DA|DO|DAS|DOS)?\s*/i,
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
    .replace(/\s*(?:FESTIVAL|PERNAMBUCO MEU PA[IÍ]S|EDI[CÇ][AÃ]O|POLO|NA CIDADE).*$/i, "")
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

const MUNICIPIOS_VALIDOS_EXTRACAO = new Set([...MUNICIPIOS_PERNAMBUCO]);

const MUNICIPIOS_INDEXADOS = new Map(
  [...MUNICIPIOS_VALIDOS_EXTRACAO].map((m) => [normalizarChaveMunicipio(m), m])
);

const ALIASES_MUNICIPIOS_BRUTOS = {
  "ITAMARACÁ": "ILHA DE ITAMARACÁ",
  ITAMARACA: "ILHA DE ITAMARACÁ",
  RIBEIRAO: "RIBEIRÃO",
  IGUARACY: "IGUARACI",
  INAJA: "INAJÁ",
  RECFE: "RECIFE",
  "LAGOA DE ITAENGA": "LAGOA DO ITAENGA",
  "VITORA DE SANTO ANTAO": "VITÓRIA DE SANTO ANTÃO",
  "VITORIA DE SANTO ANTAO": "VITÓRIA DE SANTO ANTÃO",
  "AFOGADOS DA INGAZEIRAS": "AFOGADOS DA INGAZEIRA",
  "SANTA MARIA DO CUMBUCA": "SANTA MARIA DO CAMBUCÁ",
  "BELEM DO SAO FRANCISCO": "BELÉM DE SÃO FRANCISCO",
  "BELEM DE SAO FRANCISCO": "BELÉM DE SÃO FRANCISCO",
  "BELEM SAO FRANCISCO": "BELÉM DE SÃO FRANCISCO",
  "BREJO DA MADRE DEUS": "BREJO DA MADRE DE DEUS",
  "CARNAUBEIRA DAPENHA": "CARNAUBEIRA DA PENHA",
  JOAQUIMNABUCO: "JOAQUIM NABUCO",
  "BARRADE GUABIRABA": "BARRA DE GUABIRABA",
  "GLORIADO GOITA": "GLÓRIA DO GOITÁ",
  "NAZARE DE MATA": "NAZARÉ DA MATA",
  "SAO CAETANO": "SÃO CAITANO",
  "JABOATAO DOS GUARAPES": "JABOATÃO DOS GUARARAPES",
  "JABAOTAO DOS GUARARAPES": "JABOATÃO DOS GUARARAPES",
  "JABOATAO DOS GUARARAPES": "JABOATÃO DOS GUARARAPES",
  "JABOATAO DOS GUARAPES PE": "JABOATÃO DOS GUARARAPES",
  "JABAOTAO DOS GUARARAPES PE": "JABOATÃO DOS GUARARAPES",
};

const MAPA_BUSCA_MUNICIPIOS = new Map();

for (const [chaveNormalizada, nomeOficial] of MUNICIPIOS_INDEXADOS.entries()) {
  MAPA_BUSCA_MUNICIPIOS.set(chaveNormalizada, nomeOficial);
}

for (const [alias, nomeOficial] of Object.entries(ALIASES_MUNICIPIOS_BRUTOS)) {
  MAPA_BUSCA_MUNICIPIOS.set(normalizarChaveMunicipio(alias), nomeOficial);
}

const CHAVES_BUSCA_MUNICIPIOS = [...MAPA_BUSCA_MUNICIPIOS.keys()].sort(
  (a, b) => b.length - a.length
);

const procurarMunicipioNoTexto = (textoNormalizado) => {
  if (!textoNormalizado) return null;

  let melhorMatch = null;

  for (const chave of CHAVES_BUSCA_MUNICIPIOS) {
    const regex = new RegExp(`(?:^|\\s)${escapeRegex(chave)}(?:\\s|$)`);
    const match = regex.exec(textoNormalizado);

    if (match) {
      const indice = match.index;

      if (
        !melhorMatch ||
        indice < melhorMatch.indice ||
        (indice === melhorMatch.indice && chave.length > melhorMatch.chave.length)
      ) {
        melhorMatch = { indice, chave };
      }
    }
  }

  return melhorMatch ? MAPA_BUSCA_MUNICIPIOS.get(melhorMatch.chave) : null;
};

const coletarTrechosCandidatosMunicipio = (textoNormalizado) => {
  const trechos = [];

  const regexTrechos = [
    /\bNA\s+CIDADE(?:\s+DE)?\s+([A-Z0-9\s]{3,120})(?=\/[A-Z]{2}\b|,|\.|;|:|\s+NO\s+DIA|\s+DIA\s+\d|\s+PROCESSO|\s+SEI\b|$)/g,
    /\bNO\s+MUNICIPIO(?:\s+DE)?\s+([A-Z0-9\s]{3,120})(?=\/[A-Z]{2}\b|,|\.|;|:|\s+NO\s+DIA|\s+DIA\s+\d|\s+PROCESSO|\s+SEI\b|$)/g,
    /\bMUNICIPIO(?:\s+DE)?\s+([A-Z0-9\s]{3,120})(?=\/[A-Z]{2}\b|,|\.|;|:|\s+NO\s+DIA|\s+DIA\s+\d|\s+PROCESSO|\s+SEI\b|$)/g,
    /\bCIDADE(?:\s+DE|\s+DO|\s+DA)?\s+([A-Z0-9\s]{3,120})(?=\/[A-Z]{2}\b|,|\.|;|:|\s+NO\s+DIA|\s+DIA\s+\d|\s+PROCESSO|\s+SEI\b|$)/g,
    /\b(?:EM|NO|NA)\s+([A-Z0-9\s]{3,120})\s*\/\s*[A-Z]{2}\b/g,
    /\bDISTRITO\s+DE\s+([A-Z0-9\s]{3,120})(?=\/[A-Z]{2}\b|,|\.|;|:|\s+NO\s+DIA|\s+DIA\s+\d|$)/g,
    /\bPOLO\s+([A-Z0-9\s]{3,120})(?=\/[A-Z]{2}\b|,|\.|;|:|\s+NO\s+DIA|\s+DIA\s+\d|$)/g,
    /\bETAPA\s+([A-Z0-9\s]{3,120})(?=\/[A-Z]{2}\b|,|\.|;|:|\s+NO\s+DIA|\s+DIA\s+\d|$)/g,
    /\bMEU\s+PAIS(?:\s+EM)?\s+([A-Z0-9\s]{3,120})(?=\/[A-Z]{2}\b|,|\.|;|:|\s+NO\s+DIA|\s+DIA\s+\d|$)/g,
  ];

  for (const regex of regexTrechos) {
    let match;
    while ((match = regex.exec(textoNormalizado)) !== null) {
      const trecho = match[1]?.trim();
      if (trecho) trechos.push(trecho);
    }
  }

  return trechos;
};

export const extrairMunicipio = (obsOriginal) => {
  if (!obsOriginal || typeof obsOriginal !== "string") {
    return "NÃO IDENTIFICADO";
  }

  let obs = obsOriginal.toUpperCase();

  obs = obs
    .replace(/\bCIDA\s+DE\s+DE\b/g, "CIDADE DE")
    .replace(/\bCIDADED\s+E\b/g, "CIDADE DE")
    .replace(/\bCIDADEDE\b/g, "CIDADE DE")
    .replace(/\bCIDAD\b/g, "CIDADE")
    .replace(/\bCDADE\b/g, "CIDADE")
    .replace(/\bDECATENDE\b/g, "CATENDE")
    .replace(/\bDEIGARASSU\b/g, "IGARASSU")
    .replace(/\bDEILHA\b/g, "ILHA")
    .replace(/\bDETUPARETAMA\b/g, "TUPARETAMA")
    .replace(/\bDEBREJO\b/g, "BREJO")
    .replace(/\bJOAQUIMNABUCO\b/g, "JOAQUIM NABUCO")
    .replace(/CARNAUBEIRA\s+DAPENHA/g, "CARNAUBEIRA DA PENHA")
    .replace(/\bNAZAR[EÉ]\s+DE\s+MATA\b/g, "NAZARÉ DA MATA")
    .replace(/\bBARRADE\b/g, "BARRA DE")
    .replace(/\bGL[ÓO]RIADO\b/g, "GLÓRIA DO")
    .replace(/\bBEL[EÉ]M\s+S[AÃ]O\s+FRANCI\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bBEL[EÉ]M\s+(?:DE|DO)\s+S[AÃ]O\s+FRANC\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bB\.\s*DE\s*S[AÃ]O\s*FRANCISCO\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bB\s+DE\s+S[AÃ]O\s+FRANCISCO\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bBEL[EÉ]M\s+DE\s+S[AÃ]O\s+FCO\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bS\.\s*J\.\s*DO\s*EGITO\b/g, "SÃO JOSÉ DO EGITO")
    .replace(/\bBREJO\s+DA\s+MADRE\s+DEUS\b/g, "BREJO DA MADRE DE DEUS")
    .replace(/\b(?:ILHA DE|ARQUIP[EÉ]LAGO DE)\s+FERNANDO DE NORONHA\b/g, "FERNANDO DE NORONHA")
    .replace(/\bJABOAT[AÃ]O\s+DOS\s+GUARAPES\b/g, "JABOATÃO DOS GUARARAPES")
    .replace(/\bJABAOT[AÃ]O\s+DOS\s+GUARARAPES\b/g, "JABOATÃO DOS GUARARAPES")
    .replace(/\s+/g, " ")
    .trim();

  const textoNormalizado = normalizarChaveMunicipio(obs);

  let municipioEncontrado = null;

  const trechosPrioritarios = coletarTrechosCandidatosMunicipio(textoNormalizado);

  for (const trecho of trechosPrioritarios) {
    municipioEncontrado = procurarMunicipioNoTexto(trecho);
    if (municipioEncontrado) break;
  }

  if (!municipioEncontrado) {
    municipioEncontrado = procurarMunicipioNoTexto(textoNormalizado);
  }

  if (
    municipioEncontrado &&
    (/JABOATAO/.test(normalizarChaveMunicipio(municipioEncontrado)) ||
      /GUARARAPES/.test(textoNormalizado) ||
      /GUARAPES/.test(textoNormalizado))
  ) {
    municipioEncontrado = "JABOATÃO DOS GUARARAPES";
  }

  if (municipioEncontrado) {
    const canonico = canonizarMunicipio(municipioEncontrado);
    if (canonico !== "NÃO IDENTIFICADO") {
      return canonico;
    }
  }

  return "NÃO IDENTIFICADO";
};

export const deveIncluirNoPainelPernambuco = (obsOriginal) => {
  const municipio = extrairMunicipio(obsOriginal);
  return municipioEhDePernambuco(municipio);
};

export const filtrarRegistrosDePernambuco = (registros = []) =>
  registros.filter((item) =>
    municipioEhDePernambuco(item?.municipioNormalizado || item?.municipio)
  );

const normalizarChaveEvento = (texto = "") =>
  texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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
    .replace(/^CELEBRA[CÇ][AÃ]O\s+/, "CELEBRAÇÃO ")
    .replace(/^COMEMORA[CÇ][AÃ]O\s+/, "COMEMORAÇÃO ")
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

export { MUNICIPIOS_PERNAMBUCO, municipioEhDePernambuco };