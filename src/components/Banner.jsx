export default function Banner({ image }) {
    return (
        <section className="container banner" aria-label="Destaque Pernambuco">
            <div className="bannerLeft">
                <h2 className="sectionTitle">Consulta simples e direta</h2>

                <p className="sectionText">
                    Encontre rapidamente <strong>onde foi</strong>, <strong>o que foi</strong> e <strong>quando foi</strong>.
                    Use os filtros por <strong>Ano</strong>, <strong>Evento/Ciclo</strong> e <strong>Município</strong> e veja o
                    detalhamento completo na <strong>Observação do Empenho</strong>.
                </p>

                <div className="chips" aria-label="O que você encontra aqui">
                    <span className="chip">Ano</span>
                    <span className="chip">Evento/Ciclo</span>
                    <span className="chip">Município</span>
                    <span className="chip">Credor/Artista</span>
                    <span className="chip">Valor Pago</span>
                </div>
            </div>

            <div
                className="bannerRight"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 51, 153, 0.03), rgba(0, 51, 153, 0.03)), url(${image})`
                }}
                aria-hidden="true"
            />
        </section>
    );
}