import React from "react";
import { Card, Title, Text } from "@tremor/react";
import FadeIn from "./FadeIn";

export default function ExplicacaoBaseBrutaModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const baseBrutaUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?output=xlsx";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0B2341]/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <FadeIn className="relative w-full max-w-md">
        <Card className="hc-card rounded-[2.5rem] border-none shadow-2xl bg-white p-8 md:p-10 flex flex-col items-center text-center">
          
          {/* 🔴 ADICIONADO: hc-icon-wrapper */}
          <div className="hc-icon-wrapper w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-orange-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <Title className="text-xl font-black text-[#0B2341] mb-4">Aviso sobre a Base Bruta</Title>
          <Text className="text-slate-500 leading-relaxed mb-8 text-sm">
            O arquivo que você está prestes a baixar contém <strong>todos os registros contábeis brutos</strong> do e-Fisco.<br/><br/>
            Ele possui <strong>mais linhas que o painel</strong>, pois inclui notas de empenho estornadas ou duplicidades que nosso sistema já limpou da tela.
          </Text>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button onClick={onClose} className="flex-1 px-6 py-3 rounded-xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-all active:scale-95">
              Cancelar
            </button>
            
            {/* 🔴 ADICIONADO: hc-botao-destaque */}
            <a href={baseBrutaUrl} download="base_bruta_empetur.xlsx" onClick={onClose} className="hc-botao-destaque flex-1 px-6 py-3 rounded-xl bg-[#00AEEF] text-white font-black uppercase tracking-wider shadow-lg shadow-[#00AEEF]/20 hover:bg-[#0B2341] transition-all active:scale-95 flex items-center justify-center">
              Baixar Arquivo
            </a>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}