import React from "react";
import { Card, Title, Text } from "@tremor/react";
import FadeIn from "./FadeIn";

export default function ExplicacaoBaseBrutaModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  // O link agora leva para a planilha web para o usuário ver/copiar/baixar como quiser
  const baseBrutaUrl = "https://docs.google.com/spreadsheets/d/1P94FuVBBiScKlty_slbSVOE5N6uO5g3bzD5giKMtT3I/view";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0B2341]/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <FadeIn className="relative w-full max-w-md">
        <Card className="hc-card rounded-[2.5rem] border-none shadow-2xl bg-white p-8 md:p-10 flex flex-col items-center text-center">
          
          <div className="hc-icon-wrapper w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-orange-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <Title className="text-xl font-black text-[#0B2341] mb-4">Aviso sobre a Base Bruta</Title>
          <Text className="text-slate-500 leading-relaxed mb-8 text-sm">
            A planilha que você está prestes a acessar contém <strong>todos os registros contábeis brutos</strong> do e-Fisco.<br/><br/>
            Ela possui <strong>mais linhas que o painel</strong>, pois inclui notas de empenho estornadas, anuladas ou duplicidades que a nossa inteligência já limpou da tela principal.
          </Text>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button onClick={onClose} className="flex-1 px-6 py-3 rounded-xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-all active:scale-95">
              Voltar
            </button>
            
            {/* 🔴 AQUI: Botão abre uma nova aba pro Google Sheets */}
            <a 
              href={baseBrutaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={onClose} 
              className="hc-botao-destaque flex-1 px-6 py-3 rounded-xl bg-[#00AEEF] text-white font-black uppercase tracking-wider shadow-lg shadow-[#00AEEF]/20 hover:bg-[#0B2341] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Acessar Base
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}