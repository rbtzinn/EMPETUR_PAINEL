import React, { useEffect, useMemo, useState } from "react";
import { Card, Title, DonutChart, Metric, Text, Grid, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from "@tremor/react";
import { fetchAndProcessData } from "../utils/DataProcessor";

/* ========================================================
   1. GRÁFICO DE BARRAS NATIVO
======================================================== */
const GraficoBarrasNativo = ({ data, indice, formatador, onClick, filtroAtivo }) => {
  if (data.length === 0) return <div className="h-full flex items-center justify-center text-slate-400">Sem dados</div>;
  
  const maximo = Math.max(...data.map(d => d.total));
  
  return (
    <div className="flex items-end gap-2 h-full w-full pt-10">
      {data.map((item, idx) => {
        const altura = maximo === 0 ? 0 : (item.total / maximo) * 100;
        const selecionado = filtroAtivo === item[indice];
        const apagado = filtroAtivo !== "" && !selecionado;
        
        return (
          <div 
            key={idx}
            onClick={() => onClick(item[indice])}
            className="relative flex-1 flex flex-col justify-end h-full group cursor-pointer rounded-t-xl hover:bg-slate-100 transition-all px-1"
          >
            <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0B2341] text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap z-50 pointer-events-none transition-opacity shadow-xl">
              {item[indice]}
              <span className="block text-[#00AEEF] text-center mt-1">{formatador(item.total)}</span>
            </div>
            <div 
              style={{ height: `${altura}%`, minHeight: item.total > 0 ? '4px' : '0' }}
              className={`w-full rounded-t-md transition-all duration-500 ${apagado ? 'bg-slate-200' : 'bg-[#00AEEF]'}`}
            ></div>
            <div className="text-center mt-2 text-[10px] md:text-xs font-bold text-slate-500 truncate">
              {item[indice]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Dropdown da Sidebar
const DropdownSidebar = ({ label, value, onChange, options }) => (
  <div className="w-full mb-4">
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 border border-slate-200 text-[#0B2341] text-sm font-medium rounded-xl px-4 py-3 outline-none cursor-pointer transition-all hover:bg-slate-100"
    >
      <option value="">Todos</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default function PainelCompleto({ csvUrl }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ESTADO PARA O MENU MOBILE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [filtros, setFiltros] = useState({
    municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "",
  });

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
        (filtros.municipio === "" || d.municipio === filtros.municipio) &&
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
    return Object.entries(mapa).map(([ciclo, total]) => ({ ciclo, total })).sort((a,b) => b.total - a.total);
  }, [filtrados]);

  const registrosPorMunicipio = useMemo(() => {
    const mapa = {};
    filtrados.forEach((d) => { mapa[d.municipio] = (mapa[d.municipio] || 0) + 1; });
    return Object.entries(mapa).map(([nome, total]) => ({ nome, total })).sort((a,b) => b.total - a.total).slice(0, 8); 
  }, [filtrados]);

  const registrosPorAno = useMemo(() => {
    const mapa = {};
    filtrados.forEach((d) => { mapa[d.ano] = (mapa[d.ano] || 0) + 1; });
    return Object.entries(mapa).map(([ano, total]) => ({ ano, total })).sort((a,b) => a.ano.localeCompare(b.ano));
  }, [filtrados]);

  const getOpcoes = (campoCorrente) => {
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

  const customTooltipDonut = ({ payload, active }) => {
    if (!active || !payload || payload.length === 0) return null;
    const data = payload[0].payload;
    return (
      <div className="bg-[#0B2341] p-4 rounded-xl shadow-2xl border border-white/10 z-50">
        <p className="font-bold text-white text-sm mb-1">{data.nome}</p>
        <p className="text-[#00AEEF] font-black text-lg">{data.total} shows</p>
      </div>
    );
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#F8FAFC]"><Text className="text-2xl font-black text-[#0B2341] animate-pulse">Carregando Dashboard Oficial...</Text></div>;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">
      
      <style>{`
        .scrollbar-moderna::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-moderna::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-moderna::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .scrollbar-moderna::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        /* Força as Cores do Gráfico de Pizza ignorando o Tailwind do Tremor */
        .recharts-pie-sector:nth-child(1) path { fill: #0B2341 !important; }
        .recharts-pie-sector:nth-child(2) path { fill: #00AEEF !important; }
        .recharts-pie-sector:nth-child(3) path { fill: #38BDF8 !important; }
        .recharts-pie-sector:nth-child(4) path { fill: #7DD3FC !important; }
        .recharts-pie-sector:nth-child(5) path { fill: #E0F2FE !important; }
        .recharts-pie-sector:nth-child(6) path { fill: #94A3B8 !important; }
        .recharts-pie-sector path { stroke: #ffffff !important; stroke-width: 2px !important; }
      `}</style>

      {/* OVERLAY MOBILE: Fundo escuro quando a sidebar abre no celular */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#0B2341]/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR (Desktop = estática, Mobile = Gaveta absolute) */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-slate-200 shadow-2xl z-40 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <img src="/images/empeturlogobranca.png" alt="Logo" className="h-10 object-contain filter invert opacity-90" />
          {/* Botão X para fechar no Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="lg:hidden p-2 text-slate-400 hover:text-[#0B2341] bg-slate-50 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-1 scrollbar-moderna">
          <Text className="text-[#0B2341] font-black mb-6">Filtros Avançados</Text>
          <DropdownSidebar label="Município" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoes('municipio')} />
          <DropdownSidebar label="Ciclo Cultural" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoes('ciclo')} />
          <DropdownSidebar label="Ano" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoes('ano')} />
          <DropdownSidebar label="Artista" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoes('artista')} />
          
          <button 
            onClick={() => {
              setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "" });
              setIsMobileMenuOpen(false); // Fecha a sidebar ao limpar no mobile
            }}
            className="w-full mt-6 py-3 rounded-xl bg-blue-50 text-[#00AEEF] font-bold text-sm hover:bg-[#00AEEF] hover:text-white transition-all"
          >
            ↺ Resetar Filtros
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-moderna min-w-0">
        
        {/* CABEÇALHO MOBILE COM HAMBURGUER */}
        <div className="lg:hidden flex items-center justify-between mb-8 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col">
             <span className="text-[#0B2341] font-black text-sm uppercase tracking-tight">Dashboard</span>
             <span className="text-[#00AEEF] font-bold text-[10px] uppercase tracking-widest">Empetur</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-3 text-[#0B2341] bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

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

        <Grid numItems={1} numItemsLg={3} className="gap-6 mb-8">
          
          <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 lg:col-span-2 flex flex-col h-full">
            <Title className="text-[#0B2341] font-black">Apresentações por Ciclo</Title>
            <Text className="text-slate-400 text-xs mb-2">💡 Clique na coluna para filtrar</Text>
            <div className="flex-1 min-h-[250px]">
              <GraficoBarrasNativo 
                data={registrosPorCiclo} 
                indice="ciclo" 
                formatador={(num) => `${num} shows`} 
                onClick={(v) => setFiltros(prev => ({...prev, ciclo: v === filtros.ciclo ? "" : v}))} 
                filtroAtivo={filtros.ciclo}
              />
            </div>
          </Card>

          <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8">
            <Title className="text-[#0B2341] font-black">Top Municípios</Title>
            <Text className="text-slate-400 text-xs mb-6">💡 Clique na fatia para filtrar</Text>
            <DonutChart
              data={registrosPorMunicipio} category="total" index="nome"
              className="h-64 cursor-pointer"
              showLegend={false}
              customTooltip={customTooltipDonut}
              onValueChange={(v) => setFiltros(prev => ({...prev, municipio: v ? v.nome : ""}))}
            />
          </Card>
        </Grid>

        <Grid numItems={1} numItemsLg={3} className="gap-6">
          
          <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-6 md:p-8 h-full flex flex-col">
            <Title className="text-[#0B2341] font-black">Apresentações por Ano</Title>
            <Text className="text-slate-400 text-xs mb-2">💡 Clique na coluna para filtrar</Text>
            <div className="flex-1 min-h-[300px]">
              <GraficoBarrasNativo 
                data={registrosPorAno} 
                indice="ano" 
                formatador={(num) => `${num} shows`} 
                onClick={(v) => setFiltros(prev => ({...prev, ano: v === filtros.ano ? "" : v}))} 
                filtroAtivo={filtros.ano}
              />
            </div>
          </Card>

          {/* TABELA GIGANTE E COM SCROLL */}
          <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-0 lg:col-span-2 flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-[#0B2341] shrink-0">
              <Title className="text-white font-black">Histórico Recente</Title>
              <Text className="text-[#00AEEF] text-xs">Clique no nome do artista para filtrar a tela toda</Text>
            </div>
            
            <div className="overflow-auto max-h-[400px] w-full flex-1 scrollbar-moderna">
              <Table className="min-w-[700px]">
                <TableHead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                  <TableRow>
                    <TableHeaderCell className="text-[#0B2341] font-bold text-xs py-4 px-6">Artista</TableHeaderCell>
                    <TableHeaderCell className="text-[#0B2341] font-bold text-xs py-4 px-6">Município</TableHeaderCell>
                    <TableHeaderCell className="text-[#0B2341] font-bold text-xs py-4 px-6">Ciclo</TableHeaderCell>
                    <TableHeaderCell className="text-[#0B2341] font-bold text-xs py-4 px-6">Data</TableHeaderCell>
                    {/* NOVA COLUNA AQUI */}
                    <TableHeaderCell className="text-[#0B2341] font-bold text-xs py-4 px-6 text-right">Valor Pago</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtrados.slice(0, 100).map((d) => (
                    <TableRow 
                      key={d.id} 
                      className="hover:bg-blue-50/50 transition-colors cursor-pointer border-b border-slate-100"
                      onClick={() => setFiltros(prev => ({...prev, artista: prev.artista === d.artista ? "" : d.artista}))}
                    >
                      <TableCell className="font-bold text-[#0B2341] py-4 px-6 whitespace-normal">{d.artista}</TableCell>
                      <TableCell className="text-slate-500 text-xs py-4 px-6 whitespace-normal">{d.municipio}</TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="bg-[#0B2341] text-white px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">{d.ciclo}</span>
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs py-4 px-6 whitespace-nowrap">{d.dataEvento}</TableCell>
                      {/* NOVA CÉLULA AQUI (COM FORMATAÇÃO) */}
                      <TableCell className="text-right py-4 px-6">
                        <span className="font-mono font-black text-[#00AEEF] text-sm whitespace-nowrap">
                          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(d.valor) || 0)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </Grid>
      </main>
    </div>
  );
}