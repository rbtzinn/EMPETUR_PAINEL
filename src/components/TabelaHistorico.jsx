import React, { useState, useMemo } from "react";
import { 
  Card, 
  Title, 
  Text, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell, 
  TableBody, 
  TableCell 
} from "@tremor/react";
import ExportModal from "./ExportModal";
import { exportarParaExcelPersonalizado } from "../utils/ExportUtils";

export default function TabelaHistorico({ filtrados, setFiltros }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dadosExibidos = useMemo(() => {
    if (!termoBusca) return filtrados;
    const buscaLower = termoBusca.toLowerCase();
    return filtrados.filter((d) => (
      (d.artista && d.artista.toLowerCase().includes(buscaLower)) ||
      (d.municipio && d.municipio.toLowerCase().includes(buscaLower)) ||
      (d.ciclo && d.ciclo.toLowerCase().includes(buscaLower))
    ));
  }, [filtrados, termoBusca]);

  return (
    <div className="w-full mb-8">
      <ExportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => exportarParaExcelPersonalizado(dadosExibidos)}
        totalRegistros={dadosExibidos.length}
      />

      <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-0 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-[#0B2341] shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <Title className="text-white font-black">Histórico de Apresentações</Title>
            <Text className="text-[#00AEEF] text-xs font-bold uppercase tracking-wider">
              Dados validados pelo fomento cultural
            </Text>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 ">
            <button 
              onClick={() => setIsModalOpen(true)}
              className=" cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-white hover:text-emerald-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/20 active:scale-95 group"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar XLSX
            </button>

            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Pesquisar nesta lista..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="block w-full pl-9 pr-4 py-2 border-none rounded-xl text-xs font-bold bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-auto max-h-[500px] w-full flex-1 scrollbar-moderna">
          <Table className="min-w-[800px] w-full">
            <TableHead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
              <TableRow>
                <TableHeaderCell className="text-[#0B2341] font-black text-xs py-5 px-6 uppercase tracking-wider">Artista</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-xs py-5 px-6 uppercase tracking-wider">Município</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-xs py-5 px-6 uppercase tracking-wider">Ciclo</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-xs py-5 px-6 uppercase tracking-wider">Data</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-xs py-5 px-6 uppercase tracking-wider text-right">Valor Pago</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dadosExibidos.length > 0 ? (
                dadosExibidos.map((item) => (
                  <TableRow key={item.id} className="hover:bg-blue-50/50 transition-colors border-b border-slate-100 last:border-0 group">
                    <TableCell 
                      className="font-bold text-[#0B2341] py-4 px-6 cursor-pointer group-hover:text-[#00AEEF] transition-colors"
                      onClick={() => setFiltros(prev => ({...prev, artista: item.artista}))}
                    >
                      {item.artista}
                    </TableCell>
                    <TableCell 
                      className="text-slate-500 text-xs font-medium py-4 px-6 cursor-pointer hover:text-[#0B2341]"
                      onClick={() => setFiltros(prev => ({...prev, municipio: item.municipio}))}
                    >
                      {item.municipio}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="bg-[#0B2341] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {item.ciclo}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs py-4 px-6 font-medium">
                      {item.dataEvento}
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <span className="font-mono font-black text-[#00AEEF] text-sm">
                        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.valor) || 0)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <Text className="text-slate-400 font-bold">Nenhum registro encontrado para esta busca.</Text>
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