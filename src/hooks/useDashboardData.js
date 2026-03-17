import { useState, useEffect, useMemo } from 'react';
import { fetchAndProcessData } from '../utils/DataProcessor';

export function useDashboardData(csvUrl) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtros, setFiltros] = useState({
    municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "",
  });

  const temFiltroAtivo = useMemo(() => {
    return Object.values(filtros).some(valor => valor !== "");
  }, [filtros]);

  useEffect(() => {
    fetchAndProcessData(csvUrl).then(data => {
      setDados(data);
      setLoading(false);
    });
  }, [csvUrl]);

  // Aplicação dos Filtros e Limpeza de Dados
  const filtrados = useMemo(() => {
    const termosProibidos = ["limpeza", "vigilância", "cota global", "manutenção", "locação", "passagens", "segurança"];

    return dados.filter((d) => {
      const cicloString = (d.ciclo || "").toLowerCase();
      const ehShowCultural = !termosProibidos.some(termo => cicloString.includes(termo));

      return (
        ehShowCultural &&
        (filtros.municipio === "" || d.municipioNormalizado === filtros.municipio) &&
        (filtros.ciclo === "" || d.ciclo === filtros.ciclo) &&
        (filtros.ano === "" || d.ano === filtros.ano) &&
        (filtros.artista === "" || d.artista === filtros.artista) &&
        (filtros.dataEvento === "" || d.dataEvento === filtros.dataEvento)
      );
    });
  }, [dados, filtros]);

  // Processamento para Gráficos
  const registrosPorCiclo = useMemo(() => {
    const mapa = {};
    filtrados.forEach((d) => { mapa[d.ciclo] = (mapa[d.ciclo] || 0) + 1; });
    return Object.entries(mapa).map(([ciclo, total]) => ({ ciclo, total })).sort((a, b) => b.total - a.total);
  }, [filtrados]);

  const registrosPorMunicipio = useMemo(() => {
    const mapa = {};
    filtrados.forEach((d) => { mapa[d.municipio] = (mapa[d.municipio] || 0) + 1; });
    return Object.entries(mapa).map(([nome, total]) => ({ nome, total })).sort((a, b) => b.total - a.total).slice(0, 8);
  }, [filtrados]);

  const registrosPorAno = useMemo(() => {
    const mapa = {};
    filtrados.forEach((d) => { mapa[d.ano] = (mapa[d.ano] || 0) + 1; });
    return Object.entries(mapa).map(([ano, total]) => ({ ano, total })).sort((a, b) => a.ano.localeCompare(b.ano));
  }, [filtrados]);

  // Cascata de Opções
  const getOpcoes = (campoCorrente) => {
    const termosProibidos = ["limpeza", "vigilância", "cota global", "manutenção", "locação", "passagens", "segurança"];

    const dadosPossiveis = dados.filter(d => {
      const cicloString = (d.ciclo || "").toLowerCase();
      const ehShowCultural = !termosProibidos.some(termo => cicloString.includes(termo));

      return (
        ehShowCultural &&
        (filtros.municipio === "" || campoCorrente === "municipio" || d.municipioNormalizado === filtros.municipio) &&
        (filtros.ciclo === "" || campoCorrente === "ciclo" || d.ciclo === filtros.ciclo) &&
        (filtros.ano === "" || campoCorrente === "ano" || d.ano === filtros.ano) &&
        (filtros.artista === "" || campoCorrente === "artista" || d.artista === filtros.artista)
      );
    });

    if (campoCorrente === "municipio") {
      const mapa = new Map();
      dadosPossiveis.forEach(d => {
        if (!mapa.has(d.municipioNormalizado)) {
          mapa.set(d.municipioNormalizado, d.municipio);
        }
      });
      return Array.from(mapa.entries()).map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));
    }

    return [...new Set(dadosPossiveis.map(d => d[campoCorrente]))].filter(Boolean).sort();
  };

  return {
    loading,
    filtros,
    setFiltros,
    temFiltroAtivo,
    filtrados,
    registrosPorCiclo,
    registrosPorMunicipio,
    registrosPorAno,
    getOpcoes
  };
}