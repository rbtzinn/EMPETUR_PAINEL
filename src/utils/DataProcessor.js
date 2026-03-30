import Papa from "papaparse";
import * as Utils from "./stringUtils";
import * as Extractors from "./extractors";
import { normalizarMunicipio } from "./pernambucoUtils";

const TERMOS_PROIBIDOS = ["TRANSPORTE", "LOCAÇÃO", "HOSPEDAGEM", "PASSAGEM", "DIÁRIA", "LIMPEZA", "COMBUSTÍVEL"];
const TERMOS_OBRIGATORIOS = ["APRES", "ARTÍSTIC", "SHOW", "CACHÊ", "BANDA", "CANTOR"];

export const fetchAndProcessData = async (url) => {
  const response = await fetch(url);
  const csv = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const setUnico = new Set();

        const processed = data.reduce((acc, linha, index) => {
          const tipoDespesa = (linha["Tipo de Despesa"] || "").trim().toUpperCase();
          const valor = Utils.extrairValor(linha["Total Liquidado"]);
          const obs = linha["Observação do Empenho"] || "";
          const obsLimpa = obs.trim().toUpperCase();

          if (tipoDespesa !== "NORMAL" || valor === 0) return acc;
          if (TERMOS_PROIBIDOS.some((t) => obsLimpa.includes(t))) return acc;
          if (!TERMOS_OBRIGATORIOS.some((t) => obsLimpa.includes(t))) return acc;

          const artista = Extractors.extrairArtista(obs);
          const municipio = Extractors.extrairMunicipio(obs);
          const dataEvento = Extractors.extrairDataEvento(obs);

          if (!Extractors.municipioEhDePernambuco(municipio)) return acc;
          if (artista === "NÃO IDENTIFICADO" && dataEvento === "---") return acc;

          let ciclo = linha["Detalhamento da Despesa Gerencial"] || "Outros";
          let cicloMacro = ciclo;

          if (obsLimpa.includes("PERNAMBUCO MEU PAÍS")) {
            ciclo = "Festival Pernambuco Meu País";
            cicloMacro = "Festival Pernambuco Meu País";
          } else if (ciclo.toUpperCase().includes("APOIO A EVENTOS CULTURAIS") || ciclo === "Outros") {
            const extraido = Extractors.extrairNomeEvento(obs, artista);
            cicloMacro = "Apoio a Eventos Culturais";
            ciclo = extraido || "Apoio a Eventos Culturais";
          }

          const chaveUnica = `${artista}-${municipio}-${dataEvento}-${valor}`;
          if (setUnico.has(chaveUnica)) return acc;
          setUnico.add(chaveUnica);

          acc.push({
            id: `${linha["Número do Empenho"] || "emp"}-${index}`,
            numeroEmpenho: linha["Número do Empenho"] || "N/A",
            artista,
            municipio,
            ciclo,
            cicloMacro,
            dataEvento,
            dataEmpenho: linha["Data do Empenho"] || "---",
            ano: Utils.extrairAno(linha["Data do Empenho"]),
            valor,
            documentoCredor: linha["CPF, CNPJ, IG ou UG/Gestão do Credor"] || "N/A",
            nomeCredor: linha["Nome ou Razão Social do Credor"] || "NÃO IDENTIFICADO",
            municipioNormalizado: normalizarMunicipio(municipio),
          });

          return acc;
        }, []);

        resolve(processed);
      },
    });
  });
};