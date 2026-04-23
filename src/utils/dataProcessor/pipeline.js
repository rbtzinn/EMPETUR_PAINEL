import * as Extractors from "../extractors";
import { canonizarArtista } from "../artistUtils";
import {
  createProcessedRecord,
  createUniqueCommitmentKey,
  obterValorPrincipal,
  resolveCycleInfo,
  resolveMunicipio,
} from "./transformers";
import { ehServicoMeio, hasAcceptedExpenseType, temCaraDeShow } from "./filters";

export const processDashboardRows = (rows = []) => {
  const chavesUnicas = new Set();

  return rows.reduce((acc, linha, index) => {
    const tipoDespesa = String(linha["Tipo de Despesa"] || "")
      .trim()
      .toUpperCase();
    const detalhamento = String(linha["Detalhamento da Despesa Gerencial"] || "");
    const obs = String(linha["Observação do Empenho"] || "");
    const obsLimpa = obs.trim().toUpperCase();

    if (!hasAcceptedExpenseType(tipoDespesa)) return acc;
    if (!temCaraDeShow(obsLimpa, detalhamento)) return acc;
    if (ehServicoMeio(obsLimpa)) return acc;

    const valor = obterValorPrincipal(linha);
    const artista = canonizarArtista(Extractors.extrairArtista(obs));
    const { municipio, municipioNormalizado } = resolveMunicipio(obs);
    const dataEvento = Extractors.extrairDataEvento(obs, linha["Data do Empenho"]);
    const nomeEvento = Extractors.extrairNomeEvento(obs, artista);

    if (!Extractors.municipioEhDePernambuco(municipio)) return acc;
    if (artista === "NÃO IDENTIFICADO" && !nomeEvento && dataEvento === "---") {
      return acc;
    }

    const { ciclo, cicloMacro } = resolveCycleInfo(detalhamento, obsLimpa, nomeEvento);
    const { numeroEmpenho, chaveUnica } = createUniqueCommitmentKey(linha, index);

    if (chavesUnicas.has(chaveUnica)) return acc;
    chavesUnicas.add(chaveUnica);

    acc.push(
      createProcessedRecord({
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
      })
    );

    return acc;
  }, []);
};
