export default function AboutSection({ id }) {
    return (
        <section id={id} className="container" aria-label="Sobre o painel">
            <div className="sectionHead">
                <div>
                    <h2 className="sectionTitle">Sobre este painel</h2>
                    <p className="sectionText">
                        Uma página simples para consultar contratações artísticas por <strong>ano</strong>, <strong>evento</strong> e <strong>município</strong>.
                    </p>
                </div>
            </div>

            <div className="grid2">
                <div className="card">
                    <h3 className="cardTitle">O que você encontra aqui</h3>
                    <p className="cardText">
                        Este painel reúne, em um só lugar, informações para responder de forma rápida:
                        <strong> onde foi</strong>, <strong>o que foi</strong> e <strong>quando foi</strong>.
                        O detalhamento completo de cada registro está disponível na coluna
                        <strong> Observação do Empenho</strong>.
                    </p>
                </div>

                <div className="card">
                    <h3 className="cardTitle">Fonte e atualização</h3>
                    <p className="cardText">
                        Os dados são importados de planilhas padronizadas do sistema oficial (eFisco).
                        O painel é <strong>somente leitura</strong> para o público: a inclusão e manutenção
                        das informações é realizada apenas por usuários autorizados.
                    </p>
                </div>
            </div>

        </section>
    );
}