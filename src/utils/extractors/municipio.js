import {
  MUNICIPIOS_PERNAMBUCO,
  municipioEhDePernambuco,
  canonizarMunicipio,
} from "../pernambucoUtils";
import { escapeRegex, normalizarChaveMunicipio } from "./shared";

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
    .replace(/\bBEL[EÉ]M\s+S[ÃA]O\s+FRANCI\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bBEL[EÉ]M\s+(?:DE|DO)\s+S[ÃA]O\s+FRANC\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bB\.\s*DE\s*S[ÃA]O\s*FRANCISCO\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bB\s+DE\s+S[ÃA]O\s+FRANCISCO\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bBEL[EÉ]M\s+DE\s+S[ÃA]O\s+FCO\b/g, "BELÉM DE SÃO FRANCISCO")
    .replace(/\bS\.\s*J\.\s*DO\s*EGITO\b/g, "SÃO JOSÉ DO EGITO")
    .replace(/\bBREJO\s+DA\s+MADRE\s+DEUS\b/g, "BREJO DA MADRE DE DEUS")
    .replace(/\b(?:ILHA DE|ARQUIP[EÉ]LAGO DE)\s+FERNANDO DE NORONHA\b/g, "FERNANDO DE NORONHA")
    .replace(/\bJABOAT[ÃA]O\s+DOS\s+GUARAPES\b/g, "JABOATÃO DOS GUARARAPES")
    .replace(/\bJABAOT[ÃA]O\s+DOS\s+GUARARAPES\b/g, "JABOATÃO DOS GUARARAPES")
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

export { MUNICIPIOS_PERNAMBUCO, municipioEhDePernambuco };
