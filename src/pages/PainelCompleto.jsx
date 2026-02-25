import React, { useEffect, useMemo, useState } from "react";
import { Card, Title, Metric, Text, Grid } from "@tremor/react";
import { fetchAndProcessData, normalizarMunicipio } from "../utils/DataProcessor";
import TopArtistasCard from "../components/TopArtistasCard";
import TabelaHistorico from "../components/TabelaHistorico";
import Sidebar from "../components/Sidebar";
import TopMunicipiosChart from "../components/TopMunicipiosChart";
import InfoTooltip from "../components/InfoTooltip";
import MapaPernambuco from "../components/MapaPernambuco";

/* ========================================================
   1. GRÁFICO DE BARRAS NATIVO
======================================================== */
const GraficoBarrasNativo = ({ data, indice, formatador, onClick, filtroAtivo }) => {
  if (data.length === 0) return <div className="h-full flex items-center justify-center text-slate-400">Sem dados</div>;

  const maximo = Math.max(...data.map(d => d.total));

  return (
    <div className="flex items-end justify-center gap-4 h-full w-full pt-10">
      {data.map((item, idx) => {
        const altura = maximo === 0 ? 0 : (item.total / maximo) * 100;
        const selecionado = filtroAtivo === item[indice];
        const apagado = filtroAtivo !== "" && !selecionado;

        return (
          <div
            key={idx}
            onClick={() => onClick(item[indice])}
            className="relative flex flex-col justify-end h-full w-full max-w-[120px] group cursor-pointer rounded-t-xl hover:bg-slate-50 transition-all px-1"
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0B2341] text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap z-50 pointer-events-none transition-opacity shadow-xl">
              {item[indice]}
              <span className="block text-[#00AEEF] text-center mt-1">{formatador(item.total)}</span>
            </div>
            <div
              style={{ height: `${altura}%`, minHeight: item.total > 0 ? '4px' : '0' }}
              className={`w-full rounded-t-md transition-all duration-500 shadow-sm ${apagado ? 'bg-slate-200' : 'bg-[#00AEEF]'}`}
            ></div>
            <div className="text-center mt-3 text-[10px] md:text-xs font-black text-slate-500 truncate">
              {item[indice]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function PainelCompleto({ csvUrl }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [filtros, setFiltros] = useState({
    municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "",
  });

  // Dentro do componente PainelCompleto, antes do return:
  const temFiltroAtivo = useMemo(() => {
    return Object.values(filtros).some(valor => valor !== "");
  }, [filtros]);


  useEffect(() => {
    fetchAndProcessData(csvUrl).then(data => {
      setDados(data);
      setLoading(false);
    });
  }, [csvUrl]);

  // Aplicação dos Filtros
  const filtrados = useMemo(() => {
    return dados.filter((d) => {
      return (
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

  const getOpcoes = (campoCorrente) => {
    const dadosPossiveis = dados.filter(d => {
      return (
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

      return Array.from(mapa.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }

    return [...new Set(dadosPossiveis.map(d => d[campoCorrente]))]
      .filter(Boolean)
      .sort();
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#F8FAFC]"><Text className="text-2xl font-black text-[#0B2341] animate-pulse">Carregando Dashboard Oficial...</Text></div>;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">

      <style>{`
        .scrollbar-moderna::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-moderna::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-moderna::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .scrollbar-moderna::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        /* Cores do Tremor já definidas no componente isolado, mas se quiser forçar via CSS, mantenha aqui */
      `}</style>

      {/* COMPONENTE DA SIDEBAR ISOLADO */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        filtros={filtros}
        setFiltros={setFiltros}
        getOpcoes={getOpcoes}
      />

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-moderna min-w-0">

        {/* CABEÇALHO MOBILE INTEGRADO */}
        <div className={`lg:hidden fixed top-0 left-0 right-0 z-[60] flex items-center justify-between p-4 bg-[#0B2341] transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-center gap-3">
            <img src="/images/empeturlogobranca.png" alt="Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-white font-black text-xs uppercase tracking-tight">Filtros e Gestão</span>
              <span className="text-[#00AEEF] font-bold text-[9px] uppercase tracking-widest">Painel Oficial</span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="relative p-3 text-white bg-white/10 rounded-xl hover:bg-white/20 transition-all active:scale-95"
          >
            {/* Ícone de Filtro/Hambúrguer */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>

            {/* BOLINHA DE NOTIFICAÇÃO (Filtro Ativo) */}
            {temFiltroAtivo && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AEEF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00AEEF] border-2 border-[#0B2341]"></span>
              </span>
            )}
          </button>
        </div>

        {/* ESPAÇADOR MOBILE */}
        <div className="lg:hidden h-20"></div>

        {/* KPIs */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
          <Card className="flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-[#0B2341]">
            <Text className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Apresentações Encontradas</Text>
            <Metric className="text-white text-5xl font-black mt-2">{filtrados.length}</Metric>
          </Card>

          <Card className="flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white">
            <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Artistas Diferentes</Text>
            <Metric className="text-[#0B2341] text-5xl font-black mt-2">
              {[...new Set(filtrados.map(d => d.artista))].length}
            </Metric>
          </Card>

          <Card className="flex-1 w-full rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white">
            <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Municípios Atendidos</Text>
            <Metric className="text-[#00AEEF] text-5xl font-black mt-2">
              {[...new Set(filtrados.map(d => d.municipio))].length}
            </Metric>
          </Card>
        </div>

        {/* GRÁFICOS DE CIMA - Lado a Lado no Desktop */}

        <div className="w-full mt-6">
          <MapaPernambuco
            dados={filtrados}
            municipioSelecionado={filtros.municipio}
            onSelectMunicipio={(nome) =>
              setFiltros((prev) => ({ ...prev, municipio: nome }))
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          <Card className="relative rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 flex flex-col h-full">
            <Title className="text-[#0B2341] font-black mb-6">Apresentações por Ciclo</Title>

            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <InfoTooltip text="Clique nas barras para filtrar os dados por este ciclo cultural específico." />
            </div>

            <div className="flex-1 min-h-[250px]">
              <GraficoBarrasNativo
                data={registrosPorCiclo}
                indice="ciclo"
                formatador={(num) => `${num} shows`}
                onClick={(v) => setFiltros(prev => ({ ...prev, ciclo: v === filtros.ciclo ? "" : v }))}
                filtroAtivo={filtros.ciclo}
              />
            </div>
          </Card>

          {/* Card de Municípios - Ocupa 2/3 (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <TopMunicipiosChart
              data={registrosPorMunicipio}
              onFilter={(nome) =>
                setFiltros(prev => ({
                  ...prev,
                  municipio: normalizarMunicipio(nome),
                }))
              }
            />
          </div>
        </div>

        {/* TABELA ISOLADA */}
        <TabelaHistorico filtrados={filtrados} setFiltros={setFiltros} />
        {/* GRÁFICOS DE BAIXO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="relative rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 h-full flex flex-col">
              <Title className="text-[#0B2341] font-black mb-6">Apresentações por Ano</Title>

              <div className="absolute top-6 right-6 md:top-8 md:right-8">
                <InfoTooltip text="Estatísticas baseadas na data do empenho oficial emitida pela EMPETUR." />
              </div>

              <div className="flex-1 min-h-[300px]">
                <GraficoBarrasNativo
                  data={registrosPorAno}
                  indice="ano"
                  formatador={(num) => `${num} shows`}
                  onClick={(v) => setFiltros(prev => ({ ...prev, ano: v === filtros.ano ? "" : v }))}
                  filtroAtivo={filtros.ano}
                />
              </div>
            </Card>
          </div>

          <TopArtistasCard filtrados={filtrados} />
        </div>
      </main>
    </div>
  );
}