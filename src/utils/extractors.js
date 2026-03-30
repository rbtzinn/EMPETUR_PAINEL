import { MUNICIPIOS_PERNAMBUCO, municipioEhDePernambuco } from "./pernambucoUtils";
import { normalizarEspacos } from "./stringUtils";

const normalizarChaveMunicipio = (texto = "") =>
  texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const escapeRegex = (texto = "") => texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const limparPontuacaoFinal = (texto = "") =>
  texto.replace(/\s+/g, " ").replace(/\s*[-,:;/.]+\s*$/g, "").trim();

const PALAVRAS_MINUSCULAS_TITULO = new Set([
  "de", "da", "do", "das", "dos", "e", "em", "na", "no", "nas", "nos", "para", "com", "por",
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

      const palavraSemAcento = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (index > 0 && PALAVRAS_MINUSCULAS_TITULO.has(palavraSemAcento)) return palavra;

      return palavra
        .split(/([-'])/)
        .map((parte) => (parte === "-" || parte === "'" ? parte : parte.charAt(0).toUpperCase() + parte.slice(1)))
        .join("");
    })
    .join(" ")
    .replace(/\s+([,.:;!?])/g, "$1")
    .trim();
};

const ALIASES_MUNICIPIOS = {
  "ILHA DE ITAMARACA": "ITAMARACÁ", "ITAMARACA": "ITAMARACÁ", "RIBEIRAO": "RIBEIRÃO",
  "IGUARACY": "IGUARACI", "INAJA": "INAJÁ", "RECFE": "RECIFE", "LAGOA DE ITAENGA": "LAGOA DO ITAENGA",
  "VITORA DE SANTO ANTAO": "VITÓRIA DE SANTO ANTÃO", "VITORIA DE SANTO ANTAO": "VITÓRIA DE SANTO ANTÃO",
  "AFOGADOS DA INGAZEIRAS": "AFOGADOS DA INGAZEIRA", "SANTA MARIA DO CUMBUCA": "SANTA MARIA DO CAMBUCÁ",
  "BELEM DO SAO FRANCISCO": "BELÉM DE SÃO FRANCISCO", "BELEM DE SAO FRANCISCO": "BELÉM DE SÃO FRANCISCO",
  "BELEM SAO FRANCISCO": "BELÉM DE SÃO FRANCISCO", "BREJO DA MADRE DEUS": "BREJO DA MADRE DE DEUS",
  "CARNAUBEIRA DAPENHA": "CARNAUBEIRA DA PENHA", "JOAQUIMNABUCO": "JOAQUIM NABUCO",
  "BARRADE GUABIRABA": "BARRA DE GUABIRABA", "GLORIADO GOITA": "GLÓRIA DO GOITÁ",
  "NAZARE DE MATA": "NAZARÉ DA MATA", "SAO CAETANO": "SÃO CAITANO",
  "JABOATAO DOS GUARAPES": "JABOATÃO DOS GUARARAPES", "JABAOTAO DOS GUARARAPES": "JABOATÃO DOS GUARARAPES",
};

const MAPA_BUSCA_MUNICIPIOS = new Map();
[...MUNICIPIOS_PERNAMBUCO].forEach(m => MAPA_BUSCA_MUNICIPIOS.set(normalizarChaveMunicipio(m), m));
Object.entries(ALIASES_MUNICIPIOS).forEach(([alias, oficial]) => MAPA_BUSCA_MUNICIPIOS.set(alias, oficial));

const CHAVES_BUSCA_MUNICIPIOS = [...MAPA_BUSCA_MUNICIPIOS.keys()].sort((a, b) => b.length - a.length);

const procurarMunicipioNoTexto = (textoNormalizado) => {
  if (!textoNormalizado) return null;
  let melhorMatch = null;
  for (const chave of CHAVES_BUSCA_MUNICIPIOS) {
    const regex = new RegExp(`(?:^|\\s)${escapeRegex(chave)}(?:\\s|$)`);
    const match = regex.exec(textoNormalizado);
    if (match) {
      const indice = match.index;
      if (!melhorMatch || indice < melhorMatch.indice || (indice === melhorMatch.indice && chave.length > melhorMatch.chave.length)) {
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
      if (match[1]?.trim()) trechos.push(match[1].trim());
    }
  }
  return trechos;
};

export const extrairMunicipio = (obsOriginal) => {
  if (!obsOriginal || typeof obsOriginal !== "string") return "NÃO IDENTIFICADO";
  let obs = obsOriginal.toUpperCase().replace(/\bCIDA\s+DE\s+DE\b/g, "CIDADE DE").replace(/\bCIDADED\s+E\b/g, "CIDADE DE").replace(/\s+/g, " ").trim();
  const textoNormalizado = normalizarChaveMunicipio(obs);
  let municipioEncontrado = null;
  const trechosPrioritarios = coletarTrechosCandidatosMunicipio(textoNormalizado);
  for (const trecho of trechosPrioritarios) {
    municipioEncontrado = procurarMunicipioNoTexto(trecho);
    if (municipioEncontrado) break;
  }
  if (!municipioEncontrado) municipioEncontrado = procurarMunicipioNoTexto(textoNormalizado);
  return (municipioEncontrado && MUNICIPIOS_PERNAMBUCO.has(municipioEncontrado)) ? municipioEncontrado : "NÃO IDENTIFICADO";
};

export const extrairDataEvento = (obsOriginal) => {
  if (!obsOriginal) return "---";
  const obs = obsOriginal.toUpperCase();
  const matchNum = obs.match(/([0-9]{1,2})[ \/-]([0-9]{1,2})[ \/-]([0-9]{2,4})/);
  if (matchNum) {
    const dia = matchNum[1].padStart(2, "0"), mes = matchNum[2].padStart(2, "0");
    const ano = matchNum[3].length === 2 ? `20${matchNum[3]}` : matchNum[3];
    return `${dia}/${mes}/${ano}`;
  }
  const meses = { JANEIRO: "01", FEVEREIRO: "02", MARÇO: "03", MARCO: "03", ABRIL: "04", MAIO: "05", JUNHO: "06", JULHO: "07", AGOSTO: "08", SETEMBRO: "09", OUTUBRO: "10", NOVEMBRO: "11", DEZEMBRO: "12" };
  const regexExtenso = new RegExp(`([0-9]{1,2})\\s+DE\\s+(${Object.keys(meses).join("|")})\\s+DE\\s+([0-9]{4})`);
  const matchExtenso = obs.match(regexExtenso);
  return matchExtenso ? `${matchExtenso[1].padStart(2, "0")}/${meses[matchExtenso[2]]}/${matchExtenso[3]}` : "---";
};

export const extrairArtista = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";
  let obs = normalizarEspacos(obsOriginal.toUpperCase());
  const regexArtista = /(?:(?:\d{1,2}\s+)?(?:A?PRE[A-ZÇÃ\.]*|PRESENT[A-ZÇÃ\.]*)(?:\s*ART[IÍ]STIC[A-Z\.]*)?|ART[IÍ]STIC[A-Z\.]*|SHOW|CONTRATA[ÇC][ÃA]O|CACH[EÊ])(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+PARA\s+|\s+DURANTE\s+|\s+NO\s+DIA|\s*EVENTO|\s*-\s*|$)/;
  const match = obs.match(regexArtista);
  let artistaRaw = match?.[1] ? match[1].replace(/\(.*?\)/g, "").trim() : "NÃO IDENTIFICADO";
  
  const palavrasSujas = ["APRESENTAÇÕES", "APRESENTAÇÃO", "ARTÍSTICA", "CONTRATAÇÃO", "VALOR", "REFERENTE"];
  palavrasSujas.forEach(ps => { if (artistaRaw.startsWith(ps)) artistaRaw = artistaRaw.replace(ps, "").trim(); });

  const mapaArtistas = { "ALYSSON": "ALYSSON CANTOR", "BANDA D ROMANCE": "BANDA D' ROMANCE", "SWING NOVO": "BANDA SWING NOVO" };
  return mapaArtistas[artistaRaw] || artistaRaw;
};

export const extrairNomeEvento = (obsOriginal, artista) => {
  if (!obsOriginal || !artista || artista === "NÃO IDENTIFICADO") return null;
  const obs = normalizarEspacos(obsOriginal.toUpperCase());
  const artistaUpper = normalizarEspacos(artista.toUpperCase());
  let trecho = obs.includes(artistaUpper) ? obs.substring(obs.indexOf(artistaUpper) + artistaUpper.length) : obs;

  const regexes = [/(?:PARA\s+PARTICIPA[ÇC][ÃA]O\s+NO\s+EVENTO|NO\s+EVENTO|NA\s+FESTA|NO\s+FESTIVAL)\s+(.*?)(?=,|NA\s+CIDADE|NO\s+MUNIC[IÍ]PIO|$)/i];
  let evento = null;
  for (const regex of regexes) {
    const match = trecho.match(regex);
    if (match?.[1]) { evento = match[1]; break; }
  }
  return evento ? formatarTitulo(evento) : null;
};

export { municipioEhDePernambuco };