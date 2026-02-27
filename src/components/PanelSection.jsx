import React, { useEffect, useMemo, useState } from "react";
import { Card, Text, Badge } from "@tremor/react";
import FadeIn from "./FadeIn";
import { fetchAndProcessData } from "../utils/DataProcessor";
// NOVO IMPORT: Importando o componente isolado que criamos
import DropdownPesquisavel from "./DropdownPesquisavel"; // Ajuste o caminho se estiver em outra pasta

export default function PanelSection({ id, csvUrl, lookerShareUrl }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtros, setFiltros] = useState({
    municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "",
  });

  useEffect(() => {
    fetchAndProcessData(csvUrl).then(data => {
      setDados(data);
      setLoading(false);
    });
  }, [csvUrl]);

  const filtrados = useMemo(() => {
    return dados.filter((d) => {
      return (
        (filtros.municipio === "" || d.municipio === filtros.municipio) &&
        (filtros.ciclo === "" || d.ciclo === filtros.ciclo) &&
        (filtros.ano === "" || d.ano === filtros.ano) &&
        (filtros.artista === "" || d.artista === filtros.artista) &&
        (filtros.dataEvento === "" || d.dataEvento === filtros.dataEvento)
      );
    });
  }, [dados, filtros]);

  const getOpcoesCascata = (campoCorrente) => {
    const dadosPossiveis = dados.filter(d => {
      return (
        (filtros.municipio === "" || campoCorrente === 'municipio' || d.municipio === filtros.municipio) &&
        (filtros.ciclo === "" || campoCorrente === 'ciclo' || d.ciclo === filtros.ciclo) &&
        (filtros.ano === "" || campoCorrente === 'ano' || d.ano === filtros.ano) &&
        (filtros.artista === "" || campoCorrente === 'artista' || d.artista === filtros.artista) &&
        (filtros.dataEvento === "" || campoCorrente === 'dataEvento' || d.dataEvento === filtros.dataEvento)
      );
    });
    return [...new Set(dadosPossiveis.map(d => d[campoCorrente]))].filter(Boolean).sort();
  };

  if (loading) return (
    <div className="py-32 flex justify-center bg-[#F8FAFC]">
      <Text className="font-bold text-[#0B2341] animate-pulse text-xl">Sincronizando base eFisco...</Text>
    </div>
  );

  return (
    <section id={id} className="py-24 bg-[#F8FAFC]">
      <style>{`
        .scrollbar-moderna::-webkit-scrollbar { width: 8px; height: 8px; }
        .scrollbar-moderna::-webkit-scrollbar-track { background: #f8fafc; border-radius: 8px; }
        .scrollbar-moderna::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
        .scrollbar-moderna::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-10">

        <FadeIn className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] tracking-tight mb-2">Consulta Rápida</h2>
            <Text className="text-slate-500 font-medium text-lg">Clique nos itens da tabela para filtrar rapidamente.</Text>
          </div>

          {/* Container dos botões */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "" })}
              className="w-full sm:w-auto text-[#00AEEF] font-bold text-sm uppercase tracking-wider hover:underline bg-blue-50 px-5 py-3 rounded-xl transition-colors"
            >
              ↺ Limpar Filtros
            </button>

            <a
              href={lookerShareUrl}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer w-full sm:w-auto text-center px-6 py-3 bg-[#00AEEF] hover:bg-[#0B2341] text-white text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#00AEEF]/20 active:scale-95 flex items-center justify-center gap-2 group"
            >
              Acessar Painel
              <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </FadeIn>

        {/* BARRA DE FILTROS INTELIGENTE */}
        <FadeIn delay={0.1} className="relative z-30">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-blue-900/5 bg-white p-6 mb-8 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <DropdownPesquisavel label="Todos os Municípios" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoesCascata('municipio')} />
              <DropdownPesquisavel label="Todos os Ciclos" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoesCascata('ciclo')} />
              <DropdownPesquisavel label="Todos os Anos" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoesCascata('ano')} />
              <DropdownPesquisavel label="Todos os Artistas" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoesCascata('artista')} />
              <DropdownPesquisavel label="Todas as Datas" value={filtros.dataEvento} onChange={(v) => setFiltros({ ...filtros, dataEvento: v })} options={getOpcoesCascata('dataEvento')} />
            </div>
          </Card>
        </FadeIn>

        {/* TABELA FULL WIDTH */}
        <FadeIn delay={0.2}>
          <Card className="rounded-[2rem] border-none shadow-2xl shadow-blue-900/5 bg-white overflow-hidden p-0">
            <div className="p-6 md:p-8 border-b border-slate-50 bg-[#0B2341] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <Text className="font-bold text-white text-sm tracking-wide">DETALHAMENTO OFICIAL</Text>
              <div className="flex items-center gap-4">
                <Badge className="font-bold text-white text-sm tracking-wide">{filtrados.length} Registros</Badge>
              </div>
            </div>

            <div className="h-[600px] overflow-y-auto scrollbar-moderna">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-slate-50/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="p-6 text-xs font-black text-[#0B2341] uppercase tracking-wider whitespace-nowrap">Nº Empenho</th>
                    <th className="p-6 text-xs font-black text-[#0B2341] uppercase tracking-wider whitespace-nowrap">Artista</th>
                    <th className="p-6 text-xs font-black text-[#0B2341] uppercase tracking-wider whitespace-nowrap">Município</th>
                    <th className="p-6 text-xs font-black text-[#0B2341] uppercase tracking-wider whitespace-nowrap">Ciclo</th>
                    <th className="p-6 text-xs font-black text-[#0B2341] uppercase tracking-wider whitespace-nowrap">Data</th>
                    <th className="p-6 text-xs font-black text-[#0B2341] uppercase tracking-wider text-right whitespace-nowrap">Valor Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.length > 0 ? (
                    filtrados.map((d) => (
                      <tr key={d.id} className="hover:bg-blue-50/40 transition-colors border-b border-slate-100 last:border-0 group">
                        {/* NOVO DADO AQUI */}
                        <td className="p-6 text-slate-500 font-mono text-[10px] font-bold">
                          {d.numeroEmpenho}
                        </td>
                        <td
                          className="p-6 text-sm font-bold text-[#0B2341] cursor-pointer group-hover:text-[#00AEEF] transition-colors"
                          onClick={() => setFiltros({ ...filtros, artista: d.artista })}
                          title="Clique para filtrar apenas este artista"
                        >
                          {d.artista}
                        </td>
                        <td
                          className="p-6 text-sm text-slate-600 cursor-pointer hover:text-[#0B2341] hover:font-bold transition-all"
                          onClick={() => setFiltros({ ...filtros, municipio: d.municipio })}
                          title="Clique para filtrar apenas este município"
                        >
                          {d.municipio}
                        </td>
                        <td
                          className="p-6 text-sm cursor-pointer"
                          onClick={() => setFiltros({ ...filtros, ciclo: d.ciclo })}
                          title="Clique para filtrar apenas este ciclo"
                        >
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors">{d.ciclo}</span>
                        </td>
                        <td className="p-6 text-sm text-slate-600">{d.dataEvento}</td>
                        <td className="p-6 text-base font-mono font-black text-[#00AEEF] text-right">
                          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(d.valor) || 0)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      {/* colSpan atualizado para 6 */}
                      <td colSpan="6" className="p-12 text-center text-slate-400 font-medium">
                        Nenhum registro encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}