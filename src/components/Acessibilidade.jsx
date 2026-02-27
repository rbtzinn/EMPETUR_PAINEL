import { useEffect, useState } from "react";

export default function Acessibilidade() {
  const [altoContraste, setAltoContraste] = useState(false);

  // 🔹 Alto contraste (sem quebrar cores críticas)
  useEffect(() => {
    document.documentElement.classList.toggle(
      "modo-alto-contraste",
      altoContraste
    );
  }, [altoContraste]);

  // 🔹 Carrega o VLibras uma única vez
  useEffect(() => {
    if (document.getElementById("vlibras-script")) return;

    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* 🔹 VLibras */}
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      {/* 🔹 Botão de Alto Contraste */}
      <div className="fixed top-[60%] right-0 -translate-y-1/2 z-[200]">
        <button
          onClick={() => setAltoContraste(!altoContraste)}
          title="Ativar / Desativar alto contraste"
          className="w-11 h-11 rounded-l-xl bg-[#0B2341] text-white hover:bg-[#00AEEF] transition-all shadow-xl"
        >
          <svg
            className="w-5 h-5 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3a9 9 0 000 18 9 9 0 000-18z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}