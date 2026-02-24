import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

export function useDashboardData(csvUrl, filtros) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        setDados(res.data);
        setLoading(false);
      },
    });
  }, [csvUrl]);

  // ⚠️ USE AQUI OS NOMES EXATOS DA PLANILHA
  const COL = {
    municipio: "MUNICIPIO",
    ciclo: "CICLO",
    ano: "ANO",
    artista: "ARTISTA",
  };

  const filtrados = useMemo(() => {
    return dados.filter((d) => {
      return (
        (!filtros.municipio || d[COL.municipio] === filtros.municipio) &&
        (!filtros.ciclo || d[COL.ciclo] === filtros.ciclo) &&
        (!filtros.ano || d[COL.ano] === filtros.ano) &&
        (!filtros.artista || d[COL.artista] === filtros.artista)
      );
    });
  }, [dados, filtros]);

  const agrupar = (campo) => {
    const map = {};
    filtrados.forEach((d) => {
      const valor = d[campo];
      if (!valor) return;
      map[valor] = (map[valor] || 0) + 1;
    });

    return Object.entries(map).map(([k, v]) => ({
      [campo]: k,
      total: v,
    }));
  };

  const opcoes = (campo) =>
    [...new Set(dados.map((d) => d[campo]).filter(Boolean))].sort();

  return {
    loading,
    dados,
    filtrados,

    // gráficos
    porCiclo: agrupar(COL.ciclo),
    porMunicipio: agrupar(COL.municipio),
    porAno: agrupar(COL.ano),

    // filtros
    opcoesMunicipio: opcoes(COL.municipio),
    opcoesCiclo: opcoes(COL.ciclo),
    opcoesAno: opcoes(COL.ano),
    opcoesArtista: opcoes(COL.artista),
  };
}
