import React from "react";
import { Card, Title, Text } from "@tremor/react";
import { BookOpen, DownloadCloud } from "lucide-react";
import FadeIn from "./FadeIn"; // Ajuste o caminho do FadeIn se necessário

export default function DownloadDictionaryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKGROUND BLUR */}
      <div 
        className="absolute inset-0 bg-[#0B2341]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <FadeIn className="relative w-full max-w-md">
        <Card className="hc-card rounded-[2.5rem] border-none shadow-2xl bg-white p-8 md:p-10 flex flex-col items-center text-center">
          
          {/* ÍCONE DO TOPO */}
          <div className="hc-icon-wrapper w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-inner relative">
            <BookOpen className="w-10 h-10 text-[#00AEEF] absolute -ml-4" />
            <DownloadCloud className="w-8 h-8 text-[#0B2341] absolute -mr-6 mt-4" />
          </div>

          <Title className="text-2xl font-black text-[#0B2341] mb-2 tracking-tight">
            Dicionário de Dados
          </Title>
          
          <Text className="text-slate-500 leading-relaxed mb-8">
            Você está prestes a baixar o documento oficial da EMPETUR contendo os <strong>metadados técnicos</strong> do painel em formato PDF. Deseja continuar?
          </Text>

          {/* ÁREA DOS BOTÕES */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            
            <button 
              onClick={onClose} 
              className="flex-1 px-4 py-3.5 rounded-xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Cancelar
            </button>
            
            {/* BOTÃO DE DOWNLOAD (Tag A estilisada como botão) */}
            <a 
              href="/docs/dicionario_dados_empetur.pdf" 
              download="Dicionario_Dados_EMPETUR.pdf" 
              onClick={onClose} 
              className="hc-botao-destaque flex-[1.2] px-4 py-3.5 rounded-xl bg-[#00AEEF] text-white font-black uppercase tracking-wider shadow-lg shadow-blue-900/20 hover:bg-[#0B2341] transition-all active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0B2341]"
            >
              Sim, Descarregar
            </a>

          </div>
        </Card>
      </FadeIn>
    </div>
  );
}