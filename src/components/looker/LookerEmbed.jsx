import { useMemo } from "react";

export default function LookerEmbed({ embedUrl, title }) {
  const sandbox = useMemo(
    () =>
      "allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox",
    []
  );

  return (
    <div className="iframeWrap" role="region" aria-label="Painel interativo de dados">
      <iframe
        className="iframe"
        src={embedUrl}
        title={title}
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        sandbox={sandbox}
        loading="lazy"
      />
      <div className="loading-note" style={{
        display: "none",
        textAlign: "center",
        padding: "20px",
        color: "var(--mut)",
        fontSize: "14px"
      }}>
        Carregando painel interativo...
      </div>
    </div>
  );
}