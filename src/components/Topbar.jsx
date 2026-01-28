export default function Topbar({ lookerShareUrl }) {
  return (
    <header className="topbar">
      <div className="container topbarInner">
        <a className="brand" href="#" aria-label="Voltar ao início">
          <span className="brandMark" aria-hidden="true">
            PE
          </span>
          <div className="brandText">
            <div className="brandTitle">EMPETUR</div>
            <div className="brandSub">Painel de shows e eventos artísticos</div>
          </div>
        </a>

        <nav className="nav" aria-label="Navegação principal">
          <a className="navLink" href="#painel">
            Painel
          </a>
          <a className="navLink" href="#sobre">
            Sobre
          </a>
          <a className="navLink" href="#glossario">
            Glossário
          </a>
          <a className="navLink" href="#contato">
            Contato
          </a>
        </nav>

        <div className="actions">
          <a 
            className="btn btnGhost" 
            href={lookerShareUrl} 
            target="_blank" 
            rel="noreferrer"
          >
            Abrir no Looker ↗
          </a>
        </div>
      </div>
    </header>
  );
}