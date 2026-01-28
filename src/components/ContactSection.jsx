export default function ContactSection({ id }) {
  const contacts = [
    {
      label: "E-mail Oficial",
      value: "XXXXXXXXXX@empetur.pe.gov.br",
      icon: "✉️"
    },
    {
      label: "Horário de Atendimento",
      value: "Segunda a Sexta • 08h às 17h",
      icon: "🕐"
    },
    {
      label: "Telefone",
      value: "+55 (XX) XXXX-XXXX",
      icon: "📞"
    },
    {
      label: "Endereço",
      value: "Av. XXXXXX, XXXX - XXXXXX, Recife - PE",
      icon: "📍"
    }
  ];

  return (
    <section id={id} className="container contact" aria-label="Contato e informações">
      <div className="contactCard">
        <h2 className="sectionTitle">Contato e Informações</h2>
        <p className="sectionText">
          Entre em contato para esclarecimentos, sugestões ou solicitação de 
          informações adicionais sobre os dados apresentados.
        </p>

        <div className="contactGrid">
          {contacts.map((contact, index) => (
            <div key={index} className="contactItem">
              <div className="contactLabel">
                <span style={{ marginRight: "8px" }}>{contact.icon}</span>
                {contact.label}
              </div>
              <div className="contactValue">{contact.value}</div>
            </div>
          ))}
        </div>

        {/* <div className="contactFooter">
          <span className="muted">
            © {new Date().getFullYear()} • EMPETUR - Empresa de Turismo de Pernambuco
            <br />
            Portal de Transparência • Versão 2.0
          </span>
          <a className="btnGhost2" href="#painel">
            ↑ Voltar ao painel principal
          </a>
        </div> */}
      </div>
    </section>
  );
}