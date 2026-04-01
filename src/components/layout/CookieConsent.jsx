import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [mostrarBanner, setMostrarBanner] = useState(false);

  useEffect(() => {
    const consentimento = localStorage.getItem("consentimento_cookies");
    if (!consentimento) {
      setMostrarBanner(true);
    } else if (consentimento === "aceito") {
      iniciarAnalytics();
    }
  }, []);

  const iniciarAnalytics = () => {
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
  };

  return (
    <AnimatePresence>
      {mostrarBanner && (
        <motion.div 
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-[200]"
        >
          <div className="bg-white/90 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col gap-4 relative overflow-hidden">
            
            {/* Decoração superior */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00AEEF] to-[#0B2341]"></div>

            <button onClick={recusarCookies} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors p-2 rounded-full hover:bg-slate-100">
              <X strokeWidth={2.5} size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-inner">
              <Cookie strokeWidth={2} size={24} />
            </div>

            <div>
              <h4 className="text-[#0B2341] font-black text-xl mb-2 tracking-tight">Privacidade (LGPD)</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Utilizamos cookies anônimos para entender o tráfego e melhorar este painel. Nenhum dado pessoal é rastreado ou vendido.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button 
                onClick={recusarCookies}
                className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all text-sm"
              >
                Recusar
              </button>
              <button 
                onClick={aceitarCookies}
                className="flex-[1.5] py-3 rounded-xl font-black text-white bg-[#00AEEF] hover:bg-[#0B2341] transition-all duration-300 text-sm shadow-[0_4px_14px_0_rgba(0,174,239,0.39)] active:scale-95"
              >
                Aceitar Analytics
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}