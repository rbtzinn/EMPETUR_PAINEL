import React, { useState, useMemo } from "react";
import { 
  Card, Title, Text, Table, TableHead, TableRow, 
  TableHeaderCell, TableBody, TableCell 
} from "@tremor/react";
import ExportModal from "./ExportModal";
import ExplicacaoBaseBrutaModal from "./ExplicacaoBaseBrutaModal"; // <-- NOVO IMPORT
import { exportarParaExcelPersonalizado } from "../utils/ExportUtils";

export default function TabelaHistorico({ filtrados, setFiltros }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExplicacaoOpen, setIsExplicacaoOpen] = useState(false); // <-- NOVO ESTADO

  // Link direto para o XLSX sem tratamento
  const baseBrutaUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?output=xlsx";

  const dadosExibidos = useMemo(() => {
    if (!termoBusca) return filtrados;
    const buscaLower = termoBusca.toLowerCase();
    return filtrados.filter((d) => (
      (d.artista && d.artista.toLowerCase().includes(buscaLower)) ||
      (d.municipio && d.municipio.toLowerCase().includes(buscaLower)) ||
      (d.ciclo && d.ciclo.toLowerCase().includes(buscaLower)) ||
      (d.numeroEmpenho && d.numeroEmpenho.toLowerCase().includes(buscaLower))
    ));
  }, [filtrados, termoBusca]);

  return (
    <div className="w-full mb-8">
      
      {/* MODAIS AQUI */}
      <ExportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => exportarParaExcelPersonalizado(dadosExibidos)}
        totalRegistros={dadosExibidos.length}
      />

      <ExplicacaoBaseBrutaModal 
        isOpen={isExplicacaoOpen}
        onClose={() => setIsExplicacaoOpen(false)}
      />

      <Card className="rounded-3xl border-none shadow-xl shadow-blue-900/5 bg-white p-0 flex flex-col h-full overflow-hidden">
        
        {/* CABEÇALHO DA TABELA */}
        <div className="p-6 border-b border-slate-50 bg-[#0B2341] shrink-0 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
          <div>
            <Title className="text-white font-black text-xl">Histórico de Apresentações</Title>
            <Text className="text-[#00AEEF] text-xs font-bold uppercase tracking-wider mt-1">
              Dados validados pelo fomento cultural
            </Text>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-start gap-4 w-full xl:w-auto">
            
            {/* BOTÃO BASE BRUTA + LINK EXPLICATIVO */}
            <div className="flex flex-col items-center w-full sm:w-auto">
              <a 
                href={baseBrutaUrl}
                download="base_bruta_empetur.xlsx"
                className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white hover:text-[#0B2341] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300"
                title="Baixar a planilha original sem filtros (Dados Abertos)"
              >
                Base Bruta (XLSX)
              </a>
              {/* LINK NOVO AQUI */}
              <span 
                onClick={() => setIsExplicacaoOpen(true)}
                className="mt-2 text-[9px] text-slate-400 hover:text-white cursor-pointer transition-colors underline decoration-slate-400/50 underline-offset-2 uppercase tracking-wider font-bold"
              >
                Por que a base tem mais dados?
              </span>
            </div>

            {/* BOTÃO EXPORTAR PAINEL */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg"
            >
              Exportar Painel
            </button>

            {/* BARRA DE PESQUISA */}
            <div className="relative w-full sm:w-64 shrink-0">
              <input
                type="text"
                placeholder="Pesquisar registro..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="block w-full pl-4 pr-4 py-2.5 border-none rounded-xl text-xs font-bold bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all"
              />
            </div>
          </div>
        </div>
        
        {/* CORPO DA TABELA (Mantido igual) */}
        <div className="overflow-auto max-h-[500px] w-full flex-1 scrollbar-moderna">
          <Table className="min-w-[900px] w-full">
            <TableHead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
              <TableRow>
                <TableHeaderCell className="text-[#0B2341] font-black text-[10px] py-5 px-6 uppercase tracking-wider">Nº Empenho</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-[10px] py-5 px-6 uppercase tracking-wider">Artista</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-[10px] py-5 px-6 uppercase tracking-wider">Município</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-[10px] py-5 px-6 uppercase tracking-wider">Ciclo</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-[10px] py-5 px-6 uppercase tracking-wider">Data</TableHeaderCell>
                <TableHeaderCell className="text-[#0B2341] font-black text-[10px] py-5 px-6 uppercase tracking-wider text-right">Valor Pago</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dadosExibidos.length > 0 ? (
                dadosExibidos.map((item) => (
                  <TableRow key={item.id} className="hover:bg-blue-50/50 transition-colors border-b border-slate-100 last:border-0 group">
                    <TableCell className="py-4 px-6 text-slate-500 font-mono text-[10px] font-bold">
                      {item.numeroEmpenho}
                    </TableCell>
                    <TableCell 
                      className="font-bold text-[#0B2341] py-4 px-6 cursor-pointer group-hover:text-[#00AEEF] transition-colors"
                      onClick={() => setFiltros(prev => ({...prev, artista: item.artista}))}
                    >
                      {item.artista}
                    </TableCell>
                    <TableCell 
                      className="text-slate-500 text-xs font-medium py-4 px-6 cursor-pointer hover:text-[#0B2341]"
                      onClick={() => setFiltros(prev => ({...prev, municipio: item.municipioNormalizado}))}
                    >
                      {item.municipio}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="bg-[#0B2341] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter">
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
                  <TableCell colSpan={6} className="text-center py-20">
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