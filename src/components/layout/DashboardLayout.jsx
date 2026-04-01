import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#00AEEF] selection:text-white relative flex flex-col overflow-x-hidden">
      {/* Padrão sutil de fundo para dar textura premium ao site todo */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwQjIzNDEiLz48L3N2Zz4=')]"></div>
      
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {children}
      </div>
    </div>
  );
}