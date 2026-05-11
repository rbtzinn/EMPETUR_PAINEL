import { useMemo, useState } from "react";
import {
  createDefaultFilters,
  hasActiveFilters,
} from "../constants/dashboard";
import { useProcessedData } from "./useProcessedData";
import {
  buildFilterOptions,
  filterRows,
} from "../utils/dashboardFilters";
import { useDashboardUpdateDate } from "./useDashboardUpdateDate";

export function useDashboardData(csvUrls, updateDateUrl) {
  const { data: dados, loading } = useProcessedData(csvUrls);
  const dataUltimaAtualizacao = useDashboardUpdateDate(updateDateUrl, dados);
  const [filtros, setFiltros] = useState(createDefaultFilters);

  const temFiltroAtivo = useMemo(
    () => hasActiveFilters(filtros),
    [filtros]
  );

  const filtrados = useMemo(
    () =>
      filterRows(dados, filtros, {
        allowMacroCycle: true,
        useNormalizedMunicipio: true,
        excludeBlockedTerms: true,
      }),
    [dados, filtros]
  );

  const opcoes = useMemo(
    () =>
      buildFilterOptions(dados, filtros, {
        allowMacroCycle: true,
        useNormalizedMunicipio: true,
        excludeBlockedTerms: true,
      }),
    [dados, filtros]
  );

  const registrosPorCiclo = useMemo(() => {
    const mapa = {};

    filtrados.forEach((dado) => {
      mapa[dado.cicloMacro] = (mapa[dado.cicloMacro] || 0) + 1;
    });

    return Object.entries(mapa)
      .map(([ciclo, total]) => ({ ciclo, total }))
      .sort((a, b) => b.total - a.total);
  }, [filtrados]);

  const registrosPorMunicipio = useMemo(() => {
    const mapa = {};

    filtrados.forEach((dado) => {
      const chave = dado.municipioNormalizado || "NÃO IDENTIFICADA";
      mapa[chave] = (mapa[chave] || 0) + 1;
    });

    return Object.entries(mapa)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  }, [filtrados]);

  const registrosPorAno = useMemo(() => {
    const mapa = {};

    filtrados.forEach((dado) => {
      mapa[dado.ano] = (mapa[dado.ano] || 0) + 1;
    });

    return Object.entries(mapa)
      .map(([ano, total]) => ({ ano, total }))
      .sort((a, b) => a.ano.localeCompare(b.ano));
  }, [filtrados]);

  const getOpcoes = (campoCorrente) => opcoes[campoCorrente] || [];

  return {
    loading,
    filtros,
    setFiltros,
    temFiltroAtivo,
    filtrados,
    registrosPorCiclo,
    registrosPorMunicipio,
    registrosPorAno,
    dataUltimaAtualizacao,
    getOpcoes,
  };
}
