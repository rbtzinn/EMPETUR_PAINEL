import Papa from "papaparse";
import * as Utils from "./stringUtils";
import * as Extractors from "./extractors";
import { canonizarMunicipio, normalizarMunicipio } from "./pernambucoUtils";

const TIPOS_DESPESA_ACEITOS = new Set([
  "NORMAL",
  "TRANSFERÊNCIAS POR CONVÊNIOS",
]);

const TERMOS_SERVICO_MEIO = [
  "TRANSPORTE",
  "LOCAÇÃO",
  "LOCACAO",
  "HOSPEDAGEM",
  "PASSAGEM",
  "DIÁRIA",
  "DIARIA",
  "LIMPEZA",
  "COMBUSTÍVEL",
  "COMBUSTIVEL",
  "VIGILÂNCIA",
  "VIGILANCIA",
  "SEGURANÇA",
  "SEGURANCA",
  "GERADOR",
  "BUFFET",
];

const requestCache = new Map();

const temCaraDeShow = (obs = "", detalhamento = "") => {
  const texto = `${obs} ${detalhamento}`.toUpperCase();

  return (
    /APRE(?:S|SE|SENTA|SENTAÇÃO|SENTACAO)|ART[IÍ]STIC|SHOW|CACH[ÊE]|BANDA|CANTOR(?:A)?|ORQUESTRA|TRIO|GRUPO|DJ\b|DANÇA|DANCA|CIA\b|CIA\.|BLOCO/.test(
      texto
    ) ||
    /CARNAVAL|S[ÃA]O JO[ÃA]O|NATAL|RÉVEILLON|REVEILLON|PERNAMBUCO MEU PA[IÍ]S|APOIO A EVENTOS CULTURAIS/.test(
      String(detalhamento || "").toUpperCase()
    )
  );
};

const ehServicoMeio = (obs = "") => {
  const texto = String(obs || "").toUpperCase();
  const temTermoMeio = TERMOS_SERVICO_MEIO.some((t) => texto.includes(t));
  const temSinalArtistico =
    /APRESENTA|ART[IÍ]STIC|SHOW|CACH[ÊE]|BANDA|CANTOR|ORQUESTRA|TRIO|DJ\b/.test(
      texto
    );

  return temTermoMeio && !temSinalArtistico;
};

const obterValorPrincipal = (linha) => {
  const candidatos = [
    "Total Liquidado",
    "Valor Empenhado Atual",
    "Total Pago",
    "Valor Total Empenhado",
  ];

  for (const campo of candidatos) {
    const valor = Utils.extrairValor(linha[campo]);
    if (valor > 0) return valor;
  }

  return 0;
};

export const normalizeCsvUrls = (csvUrls) =>
  (Array.isArray(csvUrls) ? csvUrls : [csvUrls]).filter(Boolean);

export const getCsvUrlsKey = (csvUrls) => normalizeCsvUrls(csvUrls).join("|");

const processCsvText = (csv) =>
  new Promise((resolve) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const setUnico = new Set();

        const processed = data.reduce((acc, linha, index) => {
          const tipoDespesa = String(linha["Tipo de Despesa"] || "")
            .trim()
            .toUpperCase();
          const detalhamento = String(
            linha["Detalhamento da Despesa Gerencial"] || ""
          );
          const obs = String(linha["Observação do Empenho"] || "");
          const obsLimpa = obs.trim().toUpperCase();

          if (!TIPOS_DESPESA_ACEITOS.has(tipoDespesa)) return acc;
          if (!temCaraDeShow(obsLimpa, detalhamento)) return acc;
          if (ehServicoMeio(obsLimpa)) return acc;

          const valor = obterValorPrincipal(linha);
          const artista = Extractors.extrairArtista(obs);
          const municipioExtraido = Extractors.extrairMunicipio(obs);
          const municipio = canonizarMunicipio(municipioExtraido);
          const municipioNormalizado = normalizarMunicipio(municipio);
          const dataEvento = Extractors.extrairDataEvento(
            obs,
            linha["Data do Empenho"]
          );
          const nomeEvento = Extractors.extrairNomeEvento(obs, artista);

          if (!Extractors.municipioEhDePernambuco(municipio)) return acc;
          if (
            artista === "NÃO IDENTIFICADO" &&
            !nomeEvento &&
            dataEvento === "---"
          ) {
            return acc;
          }

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

          const numeroEmpenho = String(linha["Número do Empenho"] || "").trim();
          const chaveUnica = numeroEmpenho || `sem-empenho-${index}`;

          if (setUnico.has(chaveUnica)) return acc;
          setUnico.add(chaveUnica);

          acc.push({
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
            valorEmpenhadoAtual: Utils.extrairValor(
              linha["Valor Empenhado Atual"]
            ),
            valorPago: Utils.extrairValor(linha["Total Pago"]),
            tipoDespesa,
            documentoCredor:
              linha["CPF, CNPJ, IG ou UG/Gestão do Credor"] || "N/A",
            nomeCredor:
              linha["Nome ou Razão Social do Credor"] || "NÃO IDENTIFICADO",
          });

          return acc;
        }, []);

        resolve(processed);
      },
    });
  });

export const fetchAndProcessData = async (url) => {
  if (!requestCache.has(url)) {
    const request = fetch(url)
      .then((response) => response.text())
      .then(processCsvText)
      .catch((error) => {
        requestCache.delete(url);
        throw error;
      });

    requestCache.set(url, request);
  }

  return requestCache.get(url);
};

export const loadDashboardData = async (csvUrls) => {
  const urls = normalizeCsvUrls(csvUrls);

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        return await fetchAndProcessData(url);
      } catch (error) {
        console.error("Erro ao carregar uma das planilhas:", error);
        return [];
      }
    })
  );

  return results.flat().filter(Boolean);
};
