import LookerEmbed from "./looker/LookerEmbed.jsx";
import Callouts from "./PanelSectionCallouts.jsx";

export default function PanelSection({ id, embedUrl, shareUrl }) {
  return (
    <section id={id} className="container panelSection" aria-label="Painel Interativo">
      <div className="sectionHead">
        <div>
          <h2 className="sectionTitle">Painel de Dados Interativo</h2>
          <p className="sectionText">
            Explore os dados de contratações artísticas com filtros dinâmicos e 
            visualizações interativas. Clique nos elementos para detalhar informações.
          </p>
        </div>

        <div className="sectionActions">
          <a className="btnGhost2" href="#glossario">
            📚 Glossário
          </a>
          <a 
            className="btnPrimary2" 
            href={shareUrl} 
            target="_blank" 
            rel="noreferrer"
          >
            🌐 Tela Cheia
          </a>
        </div>
      </div>

      <LookerEmbed 
        embedUrl={embedUrl} 
        title="Painel de Transparência - Contratações Artísticas EMPETUR" 
      />

      <Callouts />
    </section>
  );
}