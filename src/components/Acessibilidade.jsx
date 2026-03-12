import { useEffect, useState } from "react";

export default function Acessibilidade() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [config, setConfig] = useState({
    altoContraste: false,
    escalaCinza: false,
    tamanhoFonte: 100,
    espacamento: 100,
    alturaLinha: 100,
    fonteLegivel: false,
    destacarLinks: false,
    ocultarImagens: false,
  });

  // useEffect para os Atalhos de Teclado
  useEffect(() => {
    const lidarComTeclado = (e) => {
      // Verifica se a tecla ALT está pressionada
      if (!e.altKey) return;

      switch (e.key) {
        case "1":
          e.preventDefault();
          // Foca no conteúdo principal (requer tabIndex="-1" no HTML)
          document.getElementById("conteudo-site")?.focus();
          break;
        case "2":
          e.preventDefault();
          // Substitua pelo ID real do seu menu principal
          document.getElementById("menu-principal")?.focus();
          break;
        case "3":
          e.preventDefault();
          // Substitua pelo ID real do seu input de busca
          document.getElementById("campo-busca")?.focus();
          break;
        case "4":
          e.preventDefault();
          // Substitua pelo ID real do seu rodapé
          document.getElementById("rodape")?.focus();
          break;
        case "5":
          e.preventDefault();
          // Alterna o Alto Contraste usando a sua função que já usa estado prévio (prev)
          atualizarConfig("altoContraste", !config.altoContraste);
          break;
        case "6":
          e.preventDefault();
          // Diminui a fonte
          ajustarNumero("tamanhoFonte", -10, 80, 150);
          break;
        case "7":
          e.preventDefault();
          // Aumenta a fonte
          ajustarNumero("tamanhoFonte", 10, 80, 150);
          break;
        case "8":
          e.preventDefault();
          // Reseta apenas a fonte
          atualizarConfig("tamanhoFonte", 100);
          break;
        case "9":
          e.preventDefault();
          // Redireciona para a Home
          window.location.href = "/";
          break;
        case "0":
          e.preventDefault();
          // Aqui você pode redirecionar para uma página de acessibilidade, 
          // ou simplesmente abrir este menu lateral que você já criou:
          setMenuAberto(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", lidarComTeclado);

    // Limpeza do evento quando o componente desmontar
    return () => {
      window.removeEventListener("keydown", lidarComTeclado);
    };
  }, [config.altoContraste]); // Dependência necessária para o toggle do contraste

  useEffect(() => {
    const body = document.body;
    const conteudo = document.getElementById("conteudo-site");

    body.classList.toggle("contraste-negativo", config.altoContraste);
    body.classList.toggle("fonte-legivel", config.fonteLegivel);
    body.classList.toggle("destacar-links", config.destacarLinks);
    body.classList.toggle("ocultar-imagens", config.ocultarImagens);
    body.classList.toggle("escala-cinza", config.escalaCinza);

    if (!conteudo) return;

    const elementosTexto = conteudo.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, a, li, label, small, strong, em, td, th, button, input, textarea, select"
    );

    elementosTexto.forEach((el) => {
      if (!el.dataset.baseFontSize) {
        el.dataset.baseFontSize = window.getComputedStyle(el).fontSize;
      }

      if (!el.dataset.baseLineHeight) {
        el.dataset.baseLineHeight = window.getComputedStyle(el).lineHeight;
      }

      if (!el.dataset.baseLetterSpacing) {
        el.dataset.baseLetterSpacing = window.getComputedStyle(el).letterSpacing;
      }

      const baseFontSize = parseFloat(el.dataset.baseFontSize);
      const escalaFonte = config.tamanhoFonte / 100;

      if (!Number.isNaN(baseFontSize)) {
        el.style.fontSize = `${baseFontSize * escalaFonte}px`;
      }

      if (config.alturaLinha > 100) {
        const computed = window.getComputedStyle(el).lineHeight;
        const lineHeightPx =
          computed === "normal" ? baseFontSize * 1.4 : parseFloat(computed);

        el.style.lineHeight = `${lineHeightPx * (config.alturaLinha / 100)}px`;
      } else {
        el.style.lineHeight = "";
      }

      if (config.espacamento > 100) {
        el.style.letterSpacing = `${(config.espacamento - 100) * 0.02}em`;
      } else {
        el.style.letterSpacing = "";
      }
    });
  }, [config]);

  const executarComLoading = (acao) => {
    setCarregando(true);
    setTimeout(() => {
      acao();
      setTimeout(() => setCarregando(false), 250);
    }, 50);
  };

  const atualizarConfig = (chave, valor) => {
    executarComLoading(() =>
      setConfig((prev) => ({ ...prev, [chave]: valor }))
    );
  };

  const ajustarNumero = (chave, delta, min, max) => {
    executarComLoading(() =>
      setConfig((prev) => ({
        ...prev,
        [chave]: Math.max(min, Math.min(max, prev[chave] + delta)),
      }))
    );
  };

  const redefinirTudo = () => {
    executarComLoading(() => {
      setConfig({
        altoContraste: false,
        escalaCinza: false,
        tamanhoFonte: 100,
        espacamento: 100,
        alturaLinha: 100,
        fonteLegivel: false,
        destacarLinks: false,
        ocultarImagens: false,
      });

      const conteudo = document.getElementById("conteudo-site");
      if (!conteudo) return;

      const elementosTexto = conteudo.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, span, a, li, label, small, strong, em, td, th, button, input, textarea, select"
      );

      elementosTexto.forEach((el) => {
        el.style.fontSize = "";
        el.style.lineHeight = "";
        el.style.letterSpacing = "";
      });
    });
  };

  return (
    <>
      {carregando && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-2xl">
            <svg
              className="h-8 w-8 animate-spin text-[#00AEEF]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="animate-pulse text-xs font-black uppercase tracking-widest text-[#0B2341]">
              Aplicando...
            </span>
          </div>
        </div>
      )}

      <div className="fixed left-0 top-[50%] z-[200] -translate-y-1/2">
        <button
          onClick={() => setMenuAberto(true)}
          className="flex h-12 w-12 items-center justify-center rounded-r-xl border border-l-0 border-white/20 bg-[#0B2341] text-white shadow-2xl transition-all hover:bg-[#00AEEF]"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
          </svg>
        </button>
      </div>

      {menuAberto && (
        <div
          className="fixed inset-0 z-[201] bg-black/40"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 z-[202] flex h-full w-80 transform flex-col bg-slate-50 shadow-2xl transition-transform duration-300 sm:w-96 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-[#0B2341] p-5 text-white shadow-md">
          <h2 className="text-sm font-bold tracking-wide">
            Preferências de Acessibilidade
          </h2>
          <button
            onClick={() => setMenuAberto(false)}
            className="rounded-full bg-white/10 p-1.5 transition-colors hover:bg-white/20"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="scrollbar-moderna flex-1 space-y-4 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
                atualizarConfig("altoContraste", !config.altoContraste)
              }
              className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
                config.altoContraste
                  ? "border-[#00AEEF] bg-[#00AEEF]/10 text-[#0B2341]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <svg className="mb-2 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2V4a8 8 0 100 16z" />
              </svg>
              <span className="text-center text-xs font-bold">Alto Contraste</span>
            </button>

            <button
              onClick={() =>
                atualizarConfig("fonteLegivel", !config.fonteLegivel)
              }
              className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
                config.fonteLegivel
                  ? "border-[#00AEEF] bg-[#00AEEF]/10 text-[#0B2341]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="mb-1 text-2xl font-black font-sans">T</span>
              <span className="text-center text-xs font-bold">Fonte Legível</span>
            </button>

            <button
              onClick={() =>
                atualizarConfig("escalaCinza", !config.escalaCinza)
              }
              className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
                config.escalaCinza
                  ? "border-[#00AEEF] bg-[#00AEEF]/10 text-[#0B2341]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <svg className="mb-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 5h16v14H4zM8 7h2v10H8zm6 0h2v10h-2z" />
              </svg>
              <span className="text-center text-xs font-bold">Escala de Cinza</span>
            </button>
          </div>

          <div className="space-y-3">
            {[
              { id: "tamanhoFonte", label: "Tamanho da fonte", min: 80, max: 150 },
              { id: "espacamento", label: "Espaçamento de letras", min: 100, max: 150 },
              { id: "alturaLinha", label: "Altura da linha", min: 100, max: 200 },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-white p-3 shadow-sm"
              >
                <span className="text-xs font-bold text-slate-600">
                  {item.label}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      ajustarNumero(item.id, -10, item.min, item.max)
                    }
                    className="h-7 w-7 rounded-full bg-slate-100 font-bold text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-black">
                    {config[item.id]}%
                  </span>
                  <button
                    onClick={() =>
                      ajustarNumero(item.id, 10, item.min, item.max)
                    }
                    className="h-7 w-7 rounded-full bg-[#0B2341] font-bold text-white transition-colors hover:bg-[#00AEEF]"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                atualizarConfig("destacarLinks", !config.destacarLinks)
              }
              className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
                config.destacarLinks
                  ? "border-[#00AEEF] bg-[#00AEEF]/10 text-[#0B2341]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <svg
                className="mb-2 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span className="text-center text-xs font-bold">Destacar Links</span>
            </button>

            <button
              onClick={() =>
                atualizarConfig("ocultarImagens", !config.ocultarImagens)
              }
              className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
                config.ocultarImagens
                  ? "border-[#00AEEF] bg-[#00AEEF]/10 text-[#0B2341]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <svg
                className="mb-2 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="line-clamp-1 text-center text-xs font-bold">
                Ocultar Imagens
              </span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white p-5">
          <button
            onClick={redefinirTudo}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-500 py-3 font-bold text-red-600 transition-colors hover:bg-red-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Redefinir Padrões
          </button>
        </div>
      </div>
    </>
  );
}