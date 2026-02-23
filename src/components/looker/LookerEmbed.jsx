import React, { useMemo } from 'react';

export default function LookerEmbed({ embedUrl, title }) {
  const sandbox = useMemo(
    () => "allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox",
    []
  );

  return (
    <div className="relative w-full bg-gray-100 rounded-2xl overflow-hidden min-h-[600px] md:min-h-[800px]">
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-0">
        <span className="text-gray-500 font-medium">Carregando painel de dados...</span>
      </div>
      <iframe
        className="w-full h-[600px] md:h-[800px] relative z-10"
        src={embedUrl || "https://lookerstudio.google.com/embed/reporting/00000000-0000-0000-0000-000000000000/page/1M"}
        title={title || "Painel Empetur"}
        frameBorder="0"
        allowFullScreen
        sandbox={sandbox}
        loading="lazy"
      />
    </div>
  );
}