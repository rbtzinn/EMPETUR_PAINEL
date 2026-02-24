import React from "react";
import { Card, Title, Text, Button } from "@tremor/react";
import FadeIn from "./FadeIn";

export default function ExportModal({ isOpen, onClose, onConfirm, totalRegistros }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background escurecido com blur */}
      <div 
        className="absolute inset-0 bg-[#0B2341]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Caixa do Modal */}
      <FadeIn className="relative w-full max-w-md">
        <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white p-8 md:p-10 flex flex-col items-center text-center">
          {/* Ícone de Alerta/Info */}
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-[#00AEEF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <Title className="text-2xl font-black text-[#0B2341] mb-4">
            Confirmar Exportação
          </Title>
          
          <Text className="text-slate-500 leading-relaxed mb-8">
            Você está prestes a gerar um relatório personalizado contendo <strong className="text-[#0B2341]">{totalRegistros} registros</strong>. 
            <br/><br/>
            Apenas os dados atualmente visíveis sob seus filtros serão exportados para o arquivo Excel.
          </Text>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-all active:scale-95"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-3 rounded-xl bg-[#00AEEF] text-white font-black uppercase tracking-wider shadow-lg shadow-[#00AEEF]/20 hover:bg-[#0B2341] transition-all active:scale-95"
            >
              Gerar Relatório
            </button>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}