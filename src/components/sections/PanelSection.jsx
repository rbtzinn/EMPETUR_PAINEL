import React, { useEffect, useMemo, useState } from "react";
import { Card, Text, Badge } from "@tremor/react";
import { Link } from "react-router-dom";
import { User, MapPin, Layers, Calendar, DollarSign, FileDigit, RefreshCw, ExternalLink } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import { fetchAndProcessData } from "../../utils/DataProcessor";
import DropdownPesquisavel from "../ui/DropdownPesquisavel";

export default function PanelSection({ id, csvUrl, lookerShareUrl }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtros, setFiltros] = useState({
    municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "",
  });

  useEffect(() => {
    fetchAndProcessData(csvUrl).then((data) => { setDados(data); setLoading(false); });
  }, [csvUrl]);

  // 🔴 FUNÇÃO INTELIGENTE PARA CALCULAR O PRAZO LEGAL
  const calcularPrazoPagamento = (dataString) => {
    if (!dataString) return "A definir";
    const datas = dataString.match(/(\d{2}\/\d{2}\/\d{4})/g);
    if (datas && datas.length > 0) {
      const ultimaData = datas[datas.length - 1];
      const partes = ultimaData.split('/');
      const data = new Date(partes[2], partes[1] - 1, partes[0]);
      if (!isNaN(data.getTime())) {
        data.setDate(data.getDate() + 30);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
      }
    }
    return "Consulte o Empenho";
  };

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
    const dadosPossiveis = dados.filter((d) => {
      return (
        (filtros.municipio === "" || campoCorrente === "municipio" || d.municipio === filtros.municipio) &&
        (filtros.ciclo === "" || campoCorrente === "ciclo" || d.ciclo === filtros.ciclo) &&
        (filtros.ano === "" || campoCorrente === "ano" || d.ano === filtros.ano) &&
        (filtros.artista === "" || campoCorrente === "artista" || d.artista === filtros.artista) &&
        (filtros.dataEvento === "" || campoCorrente === "dataEvento" || d.dataEvento === filtros.dataEvento)
      );
    });
    return [...new Set(dadosPossiveis.map((d) => d[campoCorrente]))].filter(Boolean).sort();
  };

  if (loading) {
    return (
      <div className="py-32 flex justify-center bg-[#F8FAFC]">
        <Text className="font-bold text-[#0B2341] animate-pulse text-xl">Sincronizando base eFisco...</Text>
      </div>
    );
  }

  return (
    <section id={id} className="py-24 bg-[#F8FAFC]">
      <style>{`
        body.contraste-negativo .hc-tabela-card { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-header th { background-color: #111 !important; color: #ffea00 !important; border-bottom: 2px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-linha:hover { background-color: #111 !important; }
        body.contraste-negativo .hc-text-destaque { color: #ffea00 !important; }
        body.contraste-negativo .hc-pilula { background-color: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-valor { color: #00ff00 !important; }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-10">
        
        {/* CABEÇALHO DA SEÇÃO */}
        <FadeIn className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] tracking-tight mb-2 hc-text-destaque">
              Consulta Rápida
            </h2>
            <Text className="text-slate-500 font-medium text-lg hc-text-destaque">
              Clique nos itens da tabela para filtrar rapidamente.
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "" })} 
              className="flex items-center justify-center gap-2 w-full sm:w-auto text-[#00AEEF] font-bold text-sm uppercase tracking-wider hover:text-[#0B2341] hover:bg-blue-100 bg-blue-50 px-5 py-3 rounded-xl transition-colors hc-text-destaque"
            >
              <RefreshCw size={16} /> Limpar Filtros
            </button>

            <Link 
              to={lookerShareUrl} 
              className="hc-botao-destaque cursor-pointer w-full sm:w-auto px-6 py-3 bg-[#00AEEF] hover:bg-[#0B2341] text-[#0B2341] hover:text-white text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-sky-900/20 flex items-center justify-center gap-2 group"
            >
              Acessar Painel
              <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        {/* ÁREA DOS FILTROS (DROPDOWNS) */}
        <FadeIn delay={0.1} className="relative z-30">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-blue-900/5 bg-white p-6 mb-8 overflow-visible hc-tabela-card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <DropdownPesquisavel label="Todos os Municípios" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoesCascata("municipio")} />
              <DropdownPesquisavel label="Todos os Ciclos" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoesCascata("ciclo")} />
              <DropdownPesquisavel label="Todos os Anos" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoesCascata("ano")} />
              <DropdownPesquisavel label="Todos os Artistas" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoesCascata("artista")} />
              <DropdownPesquisavel label="Todas as Datas" value={filtros.dataEvento} onChange={(v) => setFiltros({ ...filtros, dataEvento: v })} options={getOpcoesCascata("dataEvento")} />
            </div>
          </Card>
        </FadeIn>

        {/* ÁREA DA TABELA */}
        <FadeIn delay={0.2}>
          <Card className="rounded-[2rem] border-none shadow-2xl shadow-blue-900/5 bg-white p-0 flex flex-col hc-tabela-card">
            
            {/* TÍTULO INTERNO DA TABELA */}
            <div className="p-6 md:px-8 md:pt-8 md:pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100">
              <div>
                <h3 className="font-black text-[#0B2341] text-xl hc-text-destaque">Detalhamento dos Fomentos</h3>
                <Text className="text-slate-400 text-sm hc-text-destaque">Lista oficial de contratações baseada no e-Fisco</Text>
              </div>
              <Badge className="font-black bg-blue-50 text-[#00AEEF] px-4 py-1.5 rounded-lg border border-blue-100 uppercase tracking-widest text-[10px] hc-text-destaque hc-tabela-card">
                {filtrados.length} Registros
              </Badge>
            </div>

            {/* TABELA EM SI */}
            <div className="h-[600px] overflow-y-auto scrollbar-moderna rounded-b-[2rem]">
              <table className="w-full text-left border-collapse min-w-[900px]">
                
                <thead className="bg-slate-50/95 backdrop-blur-md sticky top-0 z-10 shadow-sm hc-tabela-header">
                  <tr>
                    <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap bg-slate-50 hc-tabela-header">
                      <div className="flex items-center gap-2"><FileDigit size={14} /> Nº Empenho</div>
                    </th>
                    <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap bg-slate-50 hc-tabela-header">
                      <div className="flex items-center gap-2"><User size={14} /> Artista</div>
                    </th>
                    <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap bg-slate-50 hc-tabela-header">
                      <div className="flex items-center gap-2"><MapPin size={14} /> Município</div>
                    </th>
                    <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap bg-slate-50 hc-tabela-header">
                      <div className="flex items-center gap-2"><Layers size={14} /> Ciclo</div>
                    </th>
                    <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap bg-slate-50 hc-tabela-header">
                      <div className="flex items-center gap-2"><Calendar size={14} /> Apresentação / Data Limite</div>
                    </th>
                    <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap text-right bg-slate-50 hc-tabela-header">
                      <div className="flex items-center justify-end gap-2"><DollarSign size={14} /> Valor Pago</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtrados.length > 0 ? (
                    filtrados.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group hc-tabela-linha">
                        
                        <td className="py-4 px-6 text-slate-500 font-mono text-xs font-bold hc-text-destaque">
                          <span className="bg-slate-100 px-2 py-1 rounded-md hc-tabela-card">{d.numeroEmpenho}</span>
                        </td>

                        <td
                          className="py-4 px-6 text-sm font-bold text-[#0B2341] cursor-pointer group-hover:text-[#00AEEF] transition-colors hc-text-destaque"
                          onClick={() => setFiltros(prev => ({ ...prev, artista: prev.artista === d.artista ? "" : d.artista }))}
                        >
                          {d.artista}
                        </td>

                        <td
                          className="py-4 px-6 cursor-pointer"
                          onClick={() => setFiltros(prev => ({ ...prev, municipio: prev.municipio === d.municipio ? "" : d.municipio }))}
                        >
                          <div className="flex items-center gap-2 group/mun">
                            <MapPin size={16} className="text-slate-300 group-hover/mun:text-[#00AEEF] transition-colors" />
                            <span className="text-sm font-bold text-slate-600 group-hover/mun:text-[#00AEEF] transition-colors hc-text-destaque">
                              {d.municipio}
                            </span>
                          </div>
                        </td>

                        <td
                          className="py-4 px-6 cursor-pointer"
                          onClick={() => setFiltros(prev => ({ ...prev, ciclo: prev.ciclo === d.ciclo ? "" : d.ciclo }))}
                        >
                          <span className="inline-block whitespace-nowrap bg-[#0B2341] text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter hover:bg-[#00AEEF] hc-pilula transition-colors">
                            {d.ciclo}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-slate-700 hc-text-destaque">{d.dataEvento}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 hc-text-destaque" title="Data máxima legal estipulada para o pagamento (30 dias após o serviço)">
                              Data limite para pagamento: <span className="text-amber-500 hc-text-destaque">{calcularPrazoPagamento(d.dataEvento)}</span>
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-sm font-mono font-black text-[#00AEEF] text-right hc-valor">
                          {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(d.valor) || 0)}
                        </td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-20 text-center">
                        <Text className="text-slate-400 font-bold hc-text-destaque">Nenhum registro encontrado para estes filtros.</Text>
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