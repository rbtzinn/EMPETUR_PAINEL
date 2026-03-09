import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";

export default function CookieConsent() {
  const [mostrarBanner, setMostrarBanner] = useState(false);

  useEffect(() => {
    // Verifica no navegador se o usuário já escolheu antes
    const consentimento = localStorage.getItem("consentimento_cookies");
    
    if (!consentimento) {
      // Nunca respondeu, mostra o banner
      setMostrarBanner(true);
    } else if (consentimento === "aceito") {
      // Já tinha aceitado antes, inicia o Analytics em silêncio
      iniciarAnalytics();
    }
  }, []);

  const iniciarAnalytics = () => {
    // MÁGICA ACONTECENDO AQUI: Seu código oficial do Google Analytics!
    ReactGA.initialize("G-0VR0YV0757"); 
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  };

  const aceitarCookies = () => {
    localStorage.setItem("consentimento_cookies", "aceito");
    setMostrarBanner(false);
    iniciarAnalytics();
  };

  const recusarCookies = () => {
    localStorage.setItem("consentimento_cookies", "recusado");
    setMostrarBanner(false);
    // LGPD respeitada: Se recusar, o Analytics não é iniciado.
  };

  if (!mostrarBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0B2341] border-t-4 border-[#00AEEF] p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
      <div className="flex-1 text-sm text-slate-300 leading-relaxed text-center md:text-left">
        <strong className="text-white block md:inline mb-1 md:mb-0 md:mr-2">Privacidade e Transparência.</strong>
        Utilizamos cookies apenas para analisar o tráfego de forma anônima e melhorar a experiência deste painel de governança. 
        Nenhum dado pessoal é rastreado.
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
        <button 
          onClick={recusarCookies}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm"
        >
          Recusar
        </button>
        <button 
          onClick={aceitarCookies}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-black text-[#0B2341] bg-[#00AEEF] hover:bg-[#0095CC] transition-all text-sm shadow-lg shadow-[#00AEEF]/30"
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}