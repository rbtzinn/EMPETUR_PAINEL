import React, { useState, useMemo } from "react";
import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@tremor/react";
import { Search, Download, Layers, User, MapPin, Calendar, DollarSign, ShieldAlert } from "lucide-react";

import ExportModal from "./ExportModal";
import ExplicacaoBaseBrutaModal from "./ExplicacaoBaseBrutaModal";

export default function TabelaHistorico({ filtrados, setFiltros }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExplicacaoOpen, setIsExplicacaoOpen] = useState(false);

  const calcularDataLimite = (dataString) => {
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

  const mascararDocumento = (doc) => {
    if (!doc || doc === "N/A" || doc === "NÃO IDENTIFICADO") return "---";
    
    const limpo = doc.replace(/[^\w\d]/g, ''); 
    
    if (limpo.length === 11) {
      return `***.${limpo.substring(3, 6)}.${limpo.substring(6, 9)}-**`;
    } else if (limpo.length === 14) {
      return `${limpo.substring(0, 2)}.${limpo.substring(2, 5)}.${limpo.substring(5, 8)}/${limpo.substring(8, 12)}-${limpo.substring(12, 14)}`;
    } else {
      return doc;
    }
  };

  const dadosExibidos = useMemo(() => {
    if (!termoBusca) return filtrados;
    const buscaLower = termoBusca.toLowerCase();
    return filtrados.filter((d) => (
      (d.artista && d.artista.toLowerCase().includes(buscaLower)) ||
      (d.municipio && d.municipio.toLowerCase().includes(buscaLower)) ||
      (d.ciclo && d.ciclo.toLowerCase().includes(buscaLower)) ||
      (d.numeroEmpenho && d.numeroEmpenho.toLowerCase().includes(buscaLower)) ||
      (d.nomeCredor && d.nomeCredor.toLowerCase().includes(buscaLower)) ||
      (d.documentoCredor && d.documentoCredor.replace(/[^\w\d]/g, '').includes(buscaLower.replace(/[^\w\d]/g, '')))
    ));
  }, [filtrados, termoBusca]);

  return (
    <div className="w-full mb-8">
      <style>{`
        body.contraste-negativo .hc-tabela-card { background-color: #000 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-header th { background-color: #111 !important; color: #ffea00 !important; border-bottom: 2px solid #ffea00 !important; }
        body.contraste-negativo .hc-tabela-linha:hover { background-color: #111 !important; }
        body.contraste-negativo .hc-text-destaque { color: #ffea00 !important; }
        body.contraste-negativo .hc-pilula { background-color: transparent !important; color: #ffea00 !important; border: 1px solid #ffea00 !important; }
        body.contraste-negativo .hc-valor { color: #00ff00 !important; }
      `}</style>

      <ExportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dados={dadosExibidos} />
      <ExplicacaoBaseBrutaModal isOpen={isExplicacaoOpen} onClose={() => setIsExplicacaoOpen(false)} />

      <Card className="rounded-[2rem] border-none shadow-2xl shadow-blue-900/5 bg-white p-0 overflow-hidden hc-tabela-card flex flex-col">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 bg-[#0B2341] p-6 md:p-8 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00AEEF]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 w-full lg:w-auto">
            <Title className="text-white font-black text-2xl md:text-3xl tracking-tight mb-2 hc-text-destaque">
              Histórico de Apresentações
            </Title>
            <Text className="text-slate-400 text-sm font-medium uppercase tracking-widest hc-text-destaque">
              Filtre ou pesquise pelos fomentos e credores
            </Text>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <a 
              href="https://docs.google.com/spreadsheets/d/1P94FuVBBiScKlty_slbSVOE5N6uO5g3bzD5giKMtT3I/view" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#00AEEF] hover:text-white text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap hc-text-destaque focus:outline-none focus-visible:underline cursor-pointer"
            >
              <Download size={14} /> Base Bruta Completa
            </a>
            
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="flex items-center gap-2 bg-[#00AEEF] hover:bg-sky-400 text-[#0B2341] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-sky-900/20 hc-text-destaque focus:outline-none focus:ring-2 focus:ring-sky-300 w-full sm:w-auto justify-center"
            >
              <Layers size={16} /> Exportar Painel
            </button>
            
            <div className="relative w-full sm:w-64 mt-2 sm:mt-0">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Pesquisar registro..." 
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all text-sm hc-text-destaque"
              />
            </div>
          </div>
        </div>

        <div className="max-h-[600px] overflow-auto scrollbar-moderna bg-white">
          <Table className="w-full relative min-w-[1200px]">
            
            <TableHead className="bg-slate-50 border-b border-slate-100 hc-tabela-header sticky top-0 z-10 shadow-sm">
              <TableRow>
                <TableHeaderCell className="py-6 px-6 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50 hc-tabela-header">
                  <div className="flex items-center gap-2"><User size={14} /> Artista / Empenho</div>
                </TableHeaderCell>
                <TableHeaderCell className="py-6 px-6 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50 hc-tabela-header">
                  <div className="flex items-center gap-2" title="Nome e documento parcialmente anonimizado (LGPD)"><ShieldAlert size={14} /> Credor / Documento</div>
                </TableHeaderCell>
                <TableHeaderCell className="py-6 px-6 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50 hc-tabela-header">
                  <div className="flex items-center gap-2"><MapPin size={14} /> Município</div>
                </TableHeaderCell>
                <TableHeaderCell className="py-6 px-6 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50 hc-tabela-header">
                  <div className="flex items-center gap-2"><Layers size={14} /> Ciclo Cultural</div>
                </TableHeaderCell>
                <TableHeaderCell className="py-6 px-6 text-slate-400 font-bold uppercase tracking-wider text-[10px] bg-slate-50 hc-tabela-header">
                  <div className="flex items-center gap-2"><Calendar size={14} /> Evento / Data limite</div>
                </TableHeaderCell>
                <TableHeaderCell className="py-6 px-6 text-slate-400 font-bold uppercase tracking-wider text-[10px] text-right bg-slate-50 hc-tabela-header">
                  <div className="flex items-center justify-end gap-2"><DollarSign size={14} /> Valor Fomento (R$)</div>
                </TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dadosExibidos.length > 0 ? (
                dadosExibidos.map((item, index) => (
                  // 🔴 MÁGICA AQUI: O 'even:bg-blue-50/30' cria o efeito zebrado sutil nas linhas pares
                  <TableRow key={index} className="bg-white even:bg-blue-50/30 hover:bg-slate-100 transition-colors border-b border-slate-50 hc-tabela-linha">
                    
                    <TableCell 
                      className="py-6 px-6 max-w-[220px] cursor-pointer group align-top"
                      onClick={() => setFiltros(prev => ({ ...prev, artista: prev.artista === item.artista ? "" : item.artista }))}
                    >
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="font-bold text-[#0B2341] truncate text-sm transition-colors group-hover:text-[#00AEEF] hc-text-destaque" title={`Filtrar por ${item.artista}`}>
                          {item.artista}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 hc-text-destaque">Empenho:</span>
                          <span className="text-[10px] font-bold text-slate-500 bg-white/50 border border-slate-200 px-2 py-0.5 rounded-md hc-tabela-card">{item.numeroEmpenho}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell 
                      className="py-6 px-6 max-w-[240px] cursor-pointer group align-top"
                      onClick={() => setFiltros(prev => ({ ...prev, nomeCredor: prev.nomeCredor === item.nomeCredor ? "" : item.nomeCredor }))}
                    >
                      <div className="flex flex-col gap-2 items-start mt-1">
                        <span className="font-bold text-slate-700 truncate w-full text-xs transition-colors group-hover:text-[#00AEEF] hc-text-destaque" title={`Filtrar por ${item.nomeCredor}`}>
                          {item.nomeCredor}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-slate-500 hc-text-destaque bg-white/50 px-2 py-1 rounded-md border border-slate-200/50">
                          {mascararDocumento(item.documentoCredor)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-6 px-6 cursor-pointer align-top" onClick={() => setFiltros(prev => ({ ...prev, municipio: prev.municipio === item.municipioNormalizado ? "" : item.municipioNormalizado }))}>
                      <div className="flex items-center gap-2 group/mun mt-1">
                        <MapPin size={16} className="text-slate-300 group-hover:text-[#00AEEF] transition-colors" />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-[#00AEEF] transition-colors hc-text-destaque">{item.municipio}</span>
                      </div>
                    </TableCell>

                    <TableCell className="py-6 px-6 cursor-pointer align-top" onClick={() => setFiltros(prev => ({ ...prev, ciclo: prev.ciclo === item.ciclo ? "" : item.ciclo }))}>
                      <span className="inline-block bg-[#0B2341] text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-tight hover:bg-[#00AEEF] hc-pilula transition-colors max-w-[180px] break-words whitespace-normal text-left leading-snug mt-1">
                        {item.ciclo}
                      </span>
                    </TableCell>

                    <TableCell className="py-6 px-6 align-top">
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="text-sm font-bold text-slate-700 hc-text-destaque">{item.dataEvento}</span>
                        <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 hc-text-destaque">
                          Data limite: <span className="text-amber-500 hc-text-destaque">{calcularDataLimite(item.dataEvento)}</span>
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right py-6 px-6 align-top">
                      <div className="mt-1">
                        <span className="font-mono font-black text-[#00AEEF] text-sm hc-valor">
                          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.valor) || 0)}
                        </span>
                      </div>
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-20">
                    <Text className="text-slate-400 font-bold hc-text-destaque">Nenhum registro encontrado para esta busca.</Text>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}