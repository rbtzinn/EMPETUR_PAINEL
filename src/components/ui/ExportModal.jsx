import React from "react";
import { Card, Title, Text } from "@tremor/react";
import { FileSpreadsheet, FileText, DownloadCloud } from "lucide-react";
import FadeIn from "./FadeIn";
// 🔴 Import das duas funções lá do seu arquivo de Utils
import { exportarParaCSV, exportarParaExcelPersonalizado } from "../../utils/ExportUtils"; 

export default function ExportModal({ isOpen, onClose, dados }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKGROUND BLUR */}
      <div 
        className="absolute inset-0 bg-[#0B2341]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <FadeIn className="relative w-full max-w-2xl">
        <Card className="hc-card rounded-[2.5rem] border-none shadow-2xl bg-white p-8 md:p-10 flex flex-col items-center text-center">
          
          {/* ÍCONE DO TOPO */}
          <div className="hc-icon-wrapper w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-inner">
            <DownloadCloud className="w-12 h-12 text-[#00AEEF]" />
          </div>

          <Title className="text-2xl md:text-3xl font-black text-[#0B2341] mb-2 tracking-tight">
            Exportar Painel
          </Title>
          <Text className="text-slate-500 leading-relaxed mb-8 max-w-sm">
            Estão visíveis <strong className="text-[#0B2341] font-black">{dados?.length || 0} registros</strong>. Escolha o formato de download desejado para a sua análise.
          </Text>

          {/* ÁREA DOS BOTÕES */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-3.5 rounded-xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center"
            >
              Cancelar
            </button>
            
            {/* BOTÃO CSV - DADOS ABERTOS */}
            <button 
              onClick={() => { exportarParaCSV(dados); onClose(); }} 
              className="hc-botao-borda flex-[1.2] px-4 py-3.5 rounded-xl border-2 border-[#00AEEF] text-[#00AEEF] font-black uppercase tracking-wider hover:bg-[#00AEEF] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <FileText size={18} className="group-hover:scale-110 transition-transform" />
              CSV (Dados Abertos)
            </button>

            {/* BOTÃO EXCEL - O VERDÃO BONITÃO */}
            <button 
              onClick={async () => { 
                await exportarParaExcelPersonalizado(dados); 
                onClose(); 
              }} 
              className="hc-botao-destaque flex-[1.2] px-4 py-3.5 rounded-xl bg-emerald-600 text-white font-black uppercase tracking-wider shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <FileSpreadsheet size={18} className="group-hover:scale-110 transition-transform" />
              Excel (.XLSX)
            </button>

          </div>
        </Card>
      </FadeIn>
    </div>
  );
}