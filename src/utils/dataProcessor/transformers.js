import * as Utils from "../stringUtils";
import * as Extractors from "../extractors";
import { canonizarMunicipio, normalizarMunicipio } from "../pernambucoUtils";

const CAMPOS_VALOR_PRINCIPAL = [
  "Total Liquidado",
  "Valor Empenhado Atual",
  "Total Pago",
  "Valor Total Empenhado",
];

export const obterValorPrincipal = (linha) => {
  for (const campo of CAMPOS_VALOR_PRINCIPAL) {
    const valor = Utils.extrairValor(linha[campo]);
    if (valor > 0) return valor;
  }

  return 0;
};

export const resolveMunicipio = (obs = "") => {
  const municipioExtraido = Extractors.extrairMunicipio(obs);
  const municipio = canonizarMunicipio(municipioExtraido);

  return {
    municipio,
    municipioNormalizado: normalizarMunicipio(municipio),
  };
};

export const resolveCycleInfo = (detalhamento = "", obsLimpa = "", nomeEvento = null) => {
  let ciclo = detalhamento || "Outros";
  let cicloMacro = ciclo;

  if (
    obsLimpa.includes("PERNAMBUCO MEU PAÍS") ||
    obsLimpa.includes("PERNAMBUCO MEU PAIS")
  ) {
    ciclo = "Festival Pernambuco Meu País";
    cicloMacro = "Festival Pernambuco Meu País";
  } else if (
    ciclo.toUpperCase().includes("APOIO A EVENTOS CULTURAIS") ||
    ciclo === "Outros"
  ) {
    cicloMacro = "Apoio a Eventos Culturais";
    ciclo = nomeEvento || "Apoio a Eventos Culturais";
  }

  return { ciclo, cicloMacro };
};

export const createUniqueCommitmentKey = (linha, index) => {
  const numeroEmpenho = String(linha["Número do Empenho"] || "").trim();

  return {
    numeroEmpenho,
    chaveUnica: numeroEmpenho || `sem-empenho-${index}`,
  };
};

export const createProcessedRecord = ({
  linha,
  index,
  artista,
  municipio,
  municipioNormalizado,
  ciclo,
  cicloMacro,
  dataEvento,
  valor,
  tipoDespesa,
  numeroEmpenho,
}) => ({
  id: `${numeroEmpenho || "emp"}-${index}`,
  numeroEmpenho: numeroEmpenho || "N/A",
  artista,
  municipio,
  municipioNormalizado,
  ciclo,
  cicloMacro,
  dataEvento,
  dataEmpenho: linha["Data do Empenho"] || "---",
  ano: Utils.extrairAno(linha["Data do Empenho"]),
  valor,
  valorLiquidado: Utils.extrairValor(linha["Total Liquidado"]),
  valorEmpenhadoAtual: Utils.extrairValor(linha["Valor Empenhado Atual"]),
  valorPago: Utils.extrairValor(linha["Total Pago"]),
  tipoDespesa,
  documentoCredor: linha["CPF, CNPJ, IG ou UG/Gestão do Credor"] || "N/A",
  nomeCredor: linha["Nome ou Razão Social do Credor"] || "NÃO IDENTIFICADO",
});
