import FadeIn from "./FadeIn";
import LookerEmbed from "./looker/LookerEmbed.jsx"; // Ajuste o caminho se necessário

export default function PanelSection({ id, embedUrl, shareUrl }) {
  return (
    <section id={id} className="py-24 bg-[#F8FAFC]" aria-label="Painel Interativo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Painel de Dados Interativo</h2>
            <p className="text-lg text-gray-600 font-medium">
              Explore os dados de contratações artísticas com filtros dinâmicos e 
              visualizações interativas. Clique nos elementos para detalhar informações.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} direction="left" className="flex flex-wrap gap-4">
            <a className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm text-sm" href="#glossario">
              📚 Glossário
            </a>
            <a 
              className="px-6 py-3 rounded-xl bg-[#003399] text-white font-bold hover:bg-[#002266] transition-colors shadow-md text-sm" 
              href={shareUrl} 
              target="_blank" 
              rel="noreferrer"
            >
              🌐 Tela Cheia
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <LookerEmbed 
            embedUrl={embedUrl} 
            title="Painel de Dados Interativo - Contratações Artísticas EMPETUR" 
          />
        </FadeIn>
      </div>
    </section>
  );
}