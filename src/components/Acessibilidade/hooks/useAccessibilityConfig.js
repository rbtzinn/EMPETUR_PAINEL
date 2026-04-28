import { useEffect, useState } from "react";

const configInicial = {
  altoContraste: false,
  escalaCinza: false,
  tamanhoFonte: 100,
  espacamento: 100,
  alturaLinha: 100,
  fonteLegivel: false,
  destacarLinks: false,
  ocultarImagens: false,
};

const TEXT_SELECTOR =
  "h1, h2, h3, h4, h5, h6, p, span, a, li, label, small, strong, em, td, th, button, input, textarea, select";

const limparAjustesTexto = (conteudo) => {
  if (!conteudo) return;

  conteudo.querySelectorAll(TEXT_SELECTOR).forEach((el) => {
    el.style.fontSize = "";
    el.style.lineHeight = "";
    el.style.letterSpacing = "";
    delete el.dataset.baseFontSize;
  });
};

export function useAccessibilityConfig() {
  const [carregando, setCarregando] = useState(false);
  const [config, setConfig] = useState(configInicial);

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
      setConfig(configInicial);

      const conteudo = document.getElementById("conteudo-site");
      limparAjustesTexto(conteudo);
    });
  };

  useEffect(() => {
    const body = document.body;
    const conteudo = document.getElementById("conteudo-site");

    body.classList.toggle("contraste-negativo", config.altoContraste);
    body.classList.toggle("fonte-legivel", config.fonteLegivel);
    body.classList.toggle("destacar-links", config.destacarLinks);
    body.classList.toggle("ocultar-imagens", config.ocultarImagens);
    body.classList.toggle("escala-cinza", config.escalaCinza);

    if (!conteudo) return;

    const usarAjusteTexto =
      config.tamanhoFonte !== 100 ||
      config.alturaLinha !== 100 ||
      config.espacamento !== 100;

    if (!usarAjusteTexto) {
      limparAjustesTexto(conteudo);
      return;
    }

    const elementosTexto = conteudo.querySelectorAll(TEXT_SELECTOR);

    elementosTexto.forEach((el) => {
      if (!el.dataset.baseFontSize) {
        el.dataset.baseFontSize = window.getComputedStyle(el).fontSize;
      }

      const baseFontSize = parseFloat(el.dataset.baseFontSize);
      const escalaFonte = config.tamanhoFonte / 100;

      if (!Number.isNaN(baseFontSize)) {
        el.style.fontSize = `${baseFontSize * escalaFonte}px`;
      }

      el.style.lineHeight =
        config.alturaLinha > 100 ? `${config.alturaLinha / 100 + 0.4}` : "";

      el.style.letterSpacing =
        config.espacamento > 100
          ? `${(config.espacamento - 100) * 0.02}em`
          : "";
    });
  }, [config]);

  return {
    config,
    carregando,
    atualizarConfig,
    ajustarNumero,
    redefinirTudo,
  };
}
