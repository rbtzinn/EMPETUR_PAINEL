import React from "react";
import { Card, Title, Text } from "@tremor/react";
import FadeIn from "./FadeIn";

export default function ExplicacaoBaseBrutaModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Background escurecido com blur */}
      <div 
        className="absolute inset-0 bg-[#0B2341]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Caixa do Modal */}
      <FadeIn className="relative w-full max-w-md">
        <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white p-8 md:p-10 flex flex-col items-center text-center">
          
          {/* Ícone de Dúvida/Info */}
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-orange-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <Title className="text-xl font-black text-[#0B2341] mb-4">
            Base Bruta vs. Painel
          </Title>
          
          <Text className="text-slate-500 leading-relaxed mb-8 text-sm">
            A <strong>Base Bruta (XLSX)</strong> é o arquivo original do sistema e-Fisco sem nenhum filtro. Ela contém <strong className="text-[#0B2341]">todos os registros contábeis brutos</strong>, incluindo notas de empenho estornadas, canceladas, com valor R$ 0,00 ou processos em duplicidade administrativa.
            <br/><br/>
            Já os dados exibidos no <strong>Painel</strong> passaram pelo nosso algoritmo de saneamento, que limpa esses "ruídos" para exibir apenas a quantidade real de apresentações culturais efetivadas.
          </Text>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl bg-[#00AEEF] text-white font-black uppercase tracking-wider shadow-lg shadow-[#00AEEF]/20 hover:bg-[#0B2341] transition-all active:scale-95"
          >
            Entendi
          </button>
        </Card>
      </FadeIn>
    </div>
  );
}