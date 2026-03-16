import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ isPainel = false }) {
  
  // Classes CSS reutilizáveis para manter o padrão
  const linkClass = "text-slate-400 hover:text-[#00AEEF] transition-colors cursor-pointer";
  const separatorClass = "text-slate-300";

  // ====================================================================
  // 1. ESTILO DO PAINEL (Dashboard Interno)
  // Caminho completo com 4 níveis. O nível 3 vira um botão de voltar pra Home.
  // ====================================================================
  if (isPainel) {
    return (
      <div className="w-full mb-4">
        <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
          <a href="https://www.empetur.pe.gov.br/" className={linkClass}>
            Início
          </a>
          
          <span className={separatorClass}>/</span>
          
          <span className="text-slate-400 cursor-default">
            Transparência
          </span>
          
          <span className={separatorClass}>/</span>
          
          <Link to="/" className={linkClass} title="Voltar para a página inicial">
            Portal de Contratações Artísticas
          </Link>
          
          <span className={separatorClass}>/</span>
          
          <span className="text-[#00AEEF] flex items-center gap-1.5 bg-[#00AEEF]/10 px-2.5 py-1 rounded-md">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Dashboard
          </span>
        </div>
      </div>
    );
  }

  // ====================================================================
  // 2. ESTILO DA HOME (Site Principal)
  // Caminho com 3 níveis. O "Portal de Contratações" é o destaque atual.
  // ====================================================================
  return (
    <div className="w-full bg-white pt-[5.5rem] pb-3 border-b border-slate-200 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
        
        <a href="https://www.empetur.pe.gov.br/" className={linkClass}>
          Início
        </a>
        
        <span className={separatorClass}>/</span>
        
        <span className="text-slate-400 cursor-default">
          Transparência
        </span>
        
        <span className={separatorClass}>/</span>
        
        <span className="text-[#00AEEF] flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Portal de Contratações Artísticas
        </span>

      </div>
    </div>
  );
}