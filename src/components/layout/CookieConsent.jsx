import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Cookie, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

export default function CookieConsent() {
  const [mostrarBanner, setMostrarBanner] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consentimento = localStorage.getItem("consentimento_cookies");

    if (!consentimento) {
      setMostrarBanner(true);
    } else if (consentimento === "aceito") {
      ReactGA.initialize("G-0VR0YV0757");
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
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
          className="fixed bottom-6 left-6 right-6 z-[200] md:left-auto md:right-6 md:max-w-sm"
        >
          <div className="relative flex flex-col gap-4 overflow-hidden rounded-[2rem] border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#00AEEF] to-[#0B2341]" />

            <button
              type="button"
              onClick={recusarCookies}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              <X strokeWidth={2.5} size={18} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 shadow-inner">
              <Cookie strokeWidth={2} size={24} />
            </div>

            <div>
              <h4 className="mb-2 text-xl font-black tracking-tight text-[#0B2341]">
                {t.cookie.title}
              </h4>
              <p className="text-sm font-medium leading-relaxed text-slate-500">
                {t.cookie.description}
              </p>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={recusarCookies}
                className="flex-1 rounded-xl py-3 text-sm font-bold text-slate-500 transition-all hover:bg-slate-100"
              >
                {t.cookie.refuse}
              </button>
              <button
                type="button"
                onClick={aceitarCookies}
                className="flex-[1.5] rounded-xl bg-[#00AEEF] py-3 text-sm font-black text-white shadow-[0_4px_14px_0_rgba(0,174,239,0.39)] transition-all duration-300 hover:bg-[#0B2341] active:scale-95"
              >
                {t.cookie.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
