export default function GlossarySection({ id }) {
  const glossaryItems = [
    {
      term: "Ano",
      definition:
        "Período de referência utilizado nos filtros e nas consultas (ex.: 2025, 2026).",
    },
    {
      term: "Evento/Ciclo",
      definition:
        "Classificação do tipo de realização (ex.: Carnaval, São João, festividades, ações culturais).",
    },
    {
      term: "Município",
      definition:
        "Cidade onde ocorreu a apresentação/ação. No painel, pode ser extraído do texto da Observação do Empenho.",
    },
    {
      term: "Credor/Artista",
      definition:
        "Pessoa física ou jurídica contratada/beneficiária do pagamento (artista, banda, produtora etc.).",
    },
    {
      term: "Valor Pago",
      definition:
        "Valor efetivamente pago ao credor, conforme registros da execução financeira.",
    },
    {
      term: "Observação do Empenho",
      definition:
        "Descrição detalhada do registro: o que foi contratado, local, data e referências administrativas (processo/SEI).",
    },
  ];

  return (
    <section id={id} className="container" aria-label="Glossário">
      <div className="sectionHead">
        <div>
          <h2 className="sectionTitle">Glossário</h2>
          <p className="sectionText">
            Termos usados no painel para facilitar a leitura rápida de
            <strong> onde foi</strong>, <strong>o que foi</strong> e <strong>quando foi</strong>.
          </p>
        </div>
      </div>

      <div className="grid3">
        {glossaryItems.map((item, index) => (
          <div key={index} className="mini">
            <div className="miniTitle">{item.term}</div>
            <div className="miniText">{item.definition}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
