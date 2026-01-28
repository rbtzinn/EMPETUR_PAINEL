export default function Hero({ heroImage, onPrimaryClickHref, onSecondaryClickHref }) {
    return (
        <section className="hero" aria-label="Introdução ao Portal">
            <div
                className="heroBg"
                style={{ backgroundImage: `url(${heroImage})` }}
                aria-hidden="true"
            />

            <div className="container heroInner">
                <div className="heroContent">
                    <div className="pill">
                        <span className="pillDot" aria-hidden="true" />
                        Painel Oficial de Contratações Artísticas EMPETUR
                    </div>

                    <h1 className="heroTitle">
                        Contratações Artísticas
                        <br />
                        <span className="highlight">de Pernambuco</span>
                    </h1>

                    <p className="heroText">
                        Visualização transparente e acessível dos Shows e Eventos Artísticos apoiados pela EMPETUR
                    </p>

                    <div className="heroCtas">
                        <a className="btn btnPrimary" href={onPrimaryClickHref}>
                            Acessar Painel Interativo
                        </a>
                        <a className="btn btnSecondary" href={onSecondaryClickHref}>
                            Conhecer a Metodologia
                        </a>
                    </div>

                    <div className="heroStats" role="list" aria-label="Estatísticas do sistema">
                        <div className="stat" role="listitem">
                            <div className="statLabel">Fonte Oficial</div>
                            <div className="statValue">Sistema eFisco</div>
                        </div>
                        <div className="stat" role="listitem">
                            <div className="statLabel">Período</div>
                            <div className="statValue">2023-2025</div>
                        </div>
                    </div>
                </div>

                <aside className="heroSide" aria-label="Instruções de uso">
                    <div className="sideCard">
                        <h3 className="sideTitle">Como usar</h3>

                        <ol className="steps">
                            <li>Escolha o <strong>Ano</strong> no filtro do topo</li>
                            <li>Selecione o <strong>Evento/Ciclo</strong> (Carnaval, São João etc.)</li>
                            <li>Filtre por <strong>Município</strong> para ver onde aconteceu</li>
                            <li>Na tabela, confira <strong>quando foi</strong>, <strong>onde foi</strong> e <strong>o que foi</strong></li>
                            <li>Use a <strong>Observação do Empenho</strong> para detalhes completos do registro</li>
                            <li>Para baixar, clique no menu do Looker Studio e use <strong>Exportar</strong></li>
                        </ol>

                        <div className="divider" />

                        <h3 className="sideTitle">Sobre os dados</h3>
                        <p className="cardText">
                            A visualização é alimentada por planilhas padronizadas do sistema oficial (eFisco),
                            organizadas para consulta pública. O painel é somente leitura: alterações e cargas
                            de dados são realizadas apenas por usuários autorizados.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
}