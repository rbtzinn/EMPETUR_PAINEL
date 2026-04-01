import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { User, MapPin, Layers, Calendar, DollarSign, RefreshCw, ExternalLink, ShieldAlert, SearchX } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import DropdownPesquisavel from "../ui/DropdownPesquisavel";
import { fetchAndProcessData } from "../../utils/DataProcessor"; 

export default function PanelSection({ id, csvUrls, lookerShareUrl }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtros, setFiltros] = useState({
    municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "", nomeCredor: ""
  });

  useEffect(() => {
    const urls = Array.isArray(csvUrls) ? csvUrls : [csvUrls];
    Promise.all(urls.map(url => fetchAndProcessData(url)))
      .then(resultados => {
        setDados(resultados.flat());
        setLoading(false);
      });
  }, [csvUrls]);

  const calcularPrazoPagamento = (dataString) => {
    if (!dataString) return "A definir";
    const datas = dataString.match(/(\d{2}\/\d{2}\/\d{4})/g);
    if (datas && datas.length > 0) {
      const ultimaData = datas[datas.length - 1];
      const partes = ultimaData.split('/');
      const data = new Date(partes[2], partes[1] - 1, partes[0]);
      if (!isNaN(data.getTime())) {
        data.setDate(data.getDate() + 30);
        return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
      }
    }
    return "Consulte o Empenho";
  };

  const mascararDocumento = (doc) => {
    if (!doc || doc === "N/A" || doc === "NÃO IDENTIFICADO") return "---";
    const limpo = doc.replace(/[^\w\d]/g, '');
    if (limpo.length === 11) {
      return `***.${limpo.substring(3, 6)}.${limpo.substring(6, 9)}-**`;
    } else if (limpo.length === 14) {
      return `${limpo.substring(0, 2)}.${limpo.substring(2, 5)}.${limpo.substring(5, 8)}/${limpo.substring(8, 12)}-${limpo.substring(12, 14)}`;
    }
    return doc;
  };

  const filtrados = useMemo(() => {
    return dados.filter((d) => {
      return (
        (filtros.municipio === "" || d.municipio === filtros.municipio) &&
        (filtros.ciclo === "" || d.ciclo === filtros.ciclo) &&
        (filtros.ano === "" || d.ano === filtros.ano) &&
        (filtros.artista === "" || d.artista === filtros.artista) &&
        (filtros.dataEvento === "" || d.dataEvento === filtros.dataEvento) &&
        (filtros.nomeCredor === "" || d.nomeCredor === filtros.nomeCredor)
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
        (filtros.dataEvento === "" || campoCorrente === "dataEvento" || d.dataEvento === filtros.dataEvento) &&
        (filtros.nomeCredor === "" || campoCorrente === "nomeCredor" || d.nomeCredor === filtros.nomeCredor)
      );
    });
    return [...new Set(dadosPossiveis.map((d) => d[campoCorrente]))].filter(Boolean).sort();
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="w-16 h-16 border-4 border-[#00AEEF]/20 border-t-[#00AEEF] rounded-full animate-spin mb-6"></div>
        <p className="font-bold text-[#0B2341] tracking-widest uppercase text-sm animate-pulse hc-text-destaque">Sincronizando base e-Fisco...</p>
      </div>
    );
  }

  return (
    <section id={id} className="py-24 bg-[#F8FAFC]">
      <style>{`
        /* GARANTIA DE ALTO CONTRASTE NA TABELA */
        body.contraste-negativo .hc-tabela-card { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-header th { background-color: #111 !important; color: #ffea00 !important; border-bottom: 2px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-linha:hover { background-color: #111 !important; }
        body.contraste-negativo .hc-text-destaque { color: #ffea00 !important; }
        body.contraste-negativo .hc-pilula { background-color: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-valor { color: #00ff00 !important; }
        
        /* 🔴 NOVO: Ícones amarelos no contraste negativo */
        body.contraste-negativo .hc-tabela-header th .lucide,
        body.contraste-negativo .hc-tabela-linha .lucide {
          color: #ffea00 !important;
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-10">
        
        <FadeIn className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B2341] tracking-tight mb-3 hc-text-destaque">
              Consulta Rápida
            </h2>
            <p className="text-slate-500 font-medium text-base md:text-lg hc-text-destaque">
              Filtre ou clique diretamente nos itens da tabela para refinar a busca.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <button
              onClick={() => setFiltros({ municipio: "", ciclo: "", ano: "", artista: "", dataEvento: "", nomeCredor: "" })}
              className="flex items-center justify-center gap-2 w-full sm:w-auto text-[#00AEEF] font-bold text-sm uppercase tracking-wider hover:text-[#0B2341] hover:bg-slate-200 bg-slate-100 px-6 py-4 rounded-2xl transition-all hc-text-destaque active:scale-95"
            >
              <RefreshCw strokeWidth={2.5} size={16} /> Limpar
            </button>

            <Link
              to={lookerShareUrl}
              className="hc-botao-destaque cursor-pointer w-full sm:w-auto px-8 py-4 bg-[#0B2341] hover:bg-[#00AEEF] text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(11,35,65,0.4)] flex items-center justify-center gap-3 group active:scale-95"
            >
              Painel Avançado
              <ExternalLink strokeWidth={2.5} size={18} />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="relative z-30 mb-8">
          <div className="rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 hc-tabela-card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <DropdownPesquisavel label="Municípios" value={filtros.municipio} onChange={(v) => setFiltros({ ...filtros, municipio: v })} options={getOpcoesCascata("municipio")} />
              <DropdownPesquisavel label="Ciclos" value={filtros.ciclo} onChange={(v) => setFiltros({ ...filtros, ciclo: v })} options={getOpcoesCascata("ciclo")} />
              <DropdownPesquisavel label="Anos" value={filtros.ano} onChange={(v) => setFiltros({ ...filtros, ano: v })} options={getOpcoesCascata("ano")} />
              <DropdownPesquisavel label="Datas" value={filtros.dataEvento} onChange={(v) => setFiltros({ ...filtros, dataEvento: v })} options={getOpcoesCascata("dataEvento")} />
              <DropdownPesquisavel label="Artistas" value={filtros.artista} onChange={(v) => setFiltros({ ...filtros, artista: v })} options={getOpcoesCascata("artista")} />
              <DropdownPesquisavel label="Razão Social (Credor)" value={filtros.nomeCredor} onChange={(v) => setFiltros({ ...filtros, nomeCredor: v })} options={getOpcoesCascata("nomeCredor")} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col hc-tabela-card">
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100/80">
              <div>
                <h3 className="font-black text-[#0B2341] text-2xl tracking-tight hc-text-destaque mb-1">Extrato de Empenhos</h3>
                <p className="text-slate-400 text-sm font-medium hc-text-destaque">Lista oficial de contratações baseada nos registros do e-Fisco</p>
              </div>
              <div className="bg-blue-50/80 text-[#00AEEF] px-5 py-2.5 rounded-xl border border-blue-100 flex items-center gap-3 hc-tabela-card">
                <span className="font-black uppercase tracking-widest text-xs hc-text-destaque">{filtrados.length} Registros</span>
              </div>
            </div>

            <div className="h-[650px] overflow-y-auto scrollbar-moderna bg-slate-50/30">
              <table className="w-full text-left border-collapse min-w-[1050px]">
                <thead className="bg-white/95 backdrop-blur-md sticky top-0 z-10 shadow-sm shadow-slate-100 hc-tabela-header">
                  <tr>
                    {[
                      { icon: <User size={14} />, label: "Artista / Empenho" },
                      { icon: <ShieldAlert size={14} />, label: "PJ / PF - Contratado", title: "Documento anonimizado (LGPD)" },
                      { icon: <MapPin size={14} />, label: "Município" },
                      { icon: <Layers size={14} />, label: "Ciclo" },
                      { icon: <Calendar size={14} />, label: "Data / Prazo" },
                    ].map((th, i) => (
                      <th key={i} className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap hc-tabela-header" title={th.title}>
                        <div className="flex items-center gap-2">{th.icon} {th.label}</div>
                      </th>
                    ))}
                    <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right hc-tabela-header">
                      <div className="flex items-center justify-end gap-2"><DollarSign size={14} /> Valor Líquido</div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtrados.length > 0 ? (
                    filtrados.map((d) => (
                      <tr key={d.id} className="hover:bg-blue-50/40 transition-colors border-b border-slate-100/60 last:border-0 group hc-tabela-linha bg-white">
                        <td className="py-5 px-6 max-w-[200px] cursor-pointer" onClick={() => setFiltros(prev => ({ ...prev, artista: prev.artista === d.artista ? "" : d.artista }))}>
                          <div className="flex flex-col gap-1.5">
                            <span className="font-bold text-[#0B2341] truncate text-sm transition-colors group-hover:text-[#00AEEF] hc-text-destaque">{d.artista}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 hc-text-destaque">NE:</span>
                              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-mono tracking-wide hc-tabela-card">{d.numeroEmpenho}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6 max-w-[220px] cursor-pointer" onClick={() => setFiltros(prev => ({ ...prev, nomeCredor: prev.nomeCredor === d.nomeCredor ? "" : d.nomeCredor }))}>
                          <div className="flex flex-col gap-1.5 items-start">
                            <span className="font-bold text-slate-600 truncate w-full text-xs transition-colors group-hover:text-[#00AEEF] hc-text-destaque">{d.nomeCredor}</span>
                            <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded tracking-wider hc-tabela-card hc-text-destaque">
                              {mascararDocumento(d.documentoCredor)}
                            </span>
                          </div>
                        </td>

                        <td className="py-5 px-6 cursor-pointer" onClick={() => setFiltros(prev => ({ ...prev, municipio: prev.municipio === d.municipio ? "" : d.municipio }))}>
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm font-bold text-slate-600 group-hover:text-[#0B2341] transition-colors hc-text-destaque">{d.municipio}</span>
                          </div>
                        </td>

                        <td className="py-5 px-6 cursor-pointer align-middle" onClick={() => setFiltros(prev => ({ ...prev, ciclo: prev.ciclo === d.ciclo ? "" : d.ciclo }))}>
                          <span className="hc-pilula inline-flex items-center justify-center bg-slate-100 text-[#0B2341] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all max-w-[160px] truncate">
                            {d.ciclo}
                          </span>
                        </td>

                        <td className="py-5 px-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-bold text-[#0B2341] hc-text-destaque">{d.dataEvento}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 hc-text-destaque">
                              Limite: <span className="text-amber-600 ml-1 hc-text-destaque">{calcularPrazoPagamento(d.dataEvento)}</span>
                            </span>
                          </div>
                        </td>

                        <td className="py-5 px-6 text-right">
                          <span className="text-[15px] font-mono font-black text-[#00AEEF] hc-valor">
                            {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(d.valor) || 0)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-32">
                        <div className="flex flex-col items-center justify-center text-center px-4">
                          <h4 className="text-lg font-bold text-[#0B2341] mb-2 hc-text-destaque">Nenhum resultado</h4>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}