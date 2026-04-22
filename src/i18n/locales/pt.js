export const pt = {
  locale: "pt-BR",
  languageSwitcher: {
    label: "Selecionar idioma",
    options: { pt: "PT", en: "EN" },
  },
  common: {
    cancel: "Cancelar",
    close: "Fechar",
    continue: "Continuar",
    back: "Voltar",
    clear: "Limpar",
    searchOrSelect: "Pesquisar ou selecionar...",
    showAll: "Exibir Todos",
    noResultsFor: 'Nenhum resultado para "{term}"',
    noData: "Sem dados",
    noResults: "Nenhum resultado",
    noDataFound: "Nenhum dado encontrado.",
    officialPortal: "Portal",
    transparency: "Transparência",
    contracts: "Contratações",
    dashboard: "Dashboard",
    consultCommitment: "Consulte o Empenho",
    pendingDefinition: "A definir",
    clearFilters: "Limpar Filtros",
    shows: "shows",
    showUpperSingular: "SHOW",
    showUpperPlural: "SHOWS",
    records: "Registros",
  },
  topbar: {
    navLinks: [
      { id: "inicio", label: "Início" },
      { id: "painel", label: "Painel" },
      { id: "gestao", label: "Gestão" },
      { id: "sobre", label: "Sobre" },
      { id: "glossario", label: "Glossário" },
      { id: "contato", label: "Contato" },
    ],
    transparency: "Transparência",
    officialPanel: "Painel Oficial",
    accessData: "Acessar Dados",
    accessPanel: "Acessar Painel",
  },
  confirmModal: {
    title: "Visitar Site Oficial?",
    description:
      "Você será redirecionado para o portal institucional da EMPETUR na mesma aba. Deseja continuar?",
    cancel: "Cancelar",
    confirm: "Continuar",
  },
  hero: {
    badge: "Transparência Ativa • Lei Estadual nº 16.790/2019",
    titlePrefix: "Painel de Pagamentos",
    titleHighlight: "de Eventos e Apresentações Artísticas",
    description:
      "Consulte, de forma clara e acessível, a execução financeira dos apoios da EMPETUR a eventos voltados ao desenvolvimento, à promoção e à comercialização do turismo em Pernambuco.",
    stats: {
      presentations: "Apresentações Lidas",
      municipalities: "Municípios Atendidos",
      artists: "Artistas Diferentes",
    },
    cta: "Explorar o Painel",
    backgroundAlt: "Imagem institucional do painel",
  },
  banner: {
    title: "Consulta simples\ne rápida.",
    description:
      "Encontre rapidamente onde foi, o que foi e quando foi através dos nossos filtros inteligentes.",
    imageAlt: "Público em evento cultural",
    chips: [
      "Ano",
      "Ciclo Festivo",
      "Município",
      "Artista/Banda",
      "Valor Pago",
    ],
  },
  panelSection: {
    title: "Consulta Rápida",
    description:
      "Filtre ou clique diretamente nos itens da tabela para refinar a busca.",
    loading: "Sincronizando base e-Fisco...",
    clear: "Limpar",
    advancedPanel: "Painel Avançado",
    filters: {
      municipio: "Municípios",
      ciclo: "Ciclos",
      ano: "Anos",
      dataEvento: "Datas",
      artista: "Artistas",
      nomeCredor: "Razão Social (Credor)",
    },
    table: {
      title: "Extrato de Empenhos",
      subtitle:
        "Lista oficial de contratações baseada nos registros do e-Fisco",
      artistHeader: "Artista / Empenho",
      contractorHeader: "PJ / PF - Contratado",
      municipalityHeader: "Município",
      cycleHeader: "Ciclo",
      dateHeader: "Data / Prazo",
      valueHeader: "Valor Pago",
      empty: "Nenhum resultado",
      ne: "NE:",
      deadline: "Limite:",
    },
  },
  internalControl: {
    steps: [
      {
        title: "Monitoramento de Contratações",
        desc: "Monitoramos os fluxos de fomento e inexigibilidade para identificar e mitigar riscos, visando à conformidade legal das contratações artísticas perante a Lei das Estatais e demais normativos aplicáveis.",
      },
      {
        title: "Transparência Cultural",
        desc: "Orientamos os gestores na padronização de documentos e controles, promovendo a ética e a clareza na aplicação dos recursos nos eventos do estado.",
      },
      {
        title: "Foco no Resultado Final",
        desc: "Monitoramos as recomendações de melhoria para fortalecer a Administração Pública, garantindo a eficiência operacional e a entrega ágil das festividades à sociedade.",
      },
    ],
    footer:
      "Em estrita conformidade com o Decreto Estadual nº 47.087/2019 e Lei nº 13.303/2016",
  },
  about: {
    aria: "Sobre o painel",
    title: "Transparência em Foco",
    description:
      "Uma plataforma projetada para o cidadão consultar as contratações artísticas cruzando dados por ano, evento e município.",
    cards: [
      {
        title: "Objetivo Central",
        desc: "Centralizar informações para responder rapidamente a três perguntas fundamentais da gestão pública: onde foi, o que foi e quando foi.",
      },
      {
        title: "Fonte de Dados",
        desc: "Extraímos os registros diretamente da base contábil oficial do Governo do Estado (e-Fisco PE), com atualizações automatizadas mensalmente.",
      },
      {
        title: "Sanidade de Dados",
        desc: "Nosso motor de governança bloqueia automaticamente empenhos cancelados, valores zerados e duplicidades antes da exibição.",
      },
    ],
    cta: "Entenda o Processo",
  },
  governanceModal: {
    title: "Motor de Governança",
    subtitle: "Como garantimos a precisão do painel",
    intro:
      "Os dados extraídos do sistema governamental (e-Fisco) contêm abreviações e empenhos cancelados. Nosso sistema aplica 4 camadas automáticas de saneamento:",
    steps: [
      {
        num: "1",
        color: "red",
        title: "Filtro de Valores",
        desc: "Notas de empenho estornadas, anuladas ou com R$ 0,00 liquidado são bloqueadas automaticamente.",
      },
      {
        num: "2",
        color: "orange",
        title: "Dicionário de Nomes",
        desc: "Corrigimos divergências de digitação. Abreviações são normalizadas para os nomes oficiais dos municípios e bandas.",
      },
      {
        num: "3",
        color: "emerald",
        title: "Inteligência de Leitura",
        desc: "Nosso algoritmo lê o texto longo do contrato e extrai cirurgicamente a data real da apresentação e o artista.",
      },
      {
        num: "4",
        color: "blue",
        title: "Trava Anti-Duplicidade",
        desc: "Gera uma Chave Única (Artista + Cidade + Data + Valor). Duas notas para o mesmo evento contabilizam apenas um show.",
      },
    ],
    acknowledge: "Entendi",
  },
  glossary: {
    aria: "Glossário e Dicionário de Dados",
    title: "Entenda o Painel",
    description:
      "Um guia rápido e oficial dos termos contábeis e culturais.",
    terms: [
      {
        title: "Ano Cultural",
        description:
          "Refere-se ao exercício financeiro em que as festividades ocorreram, permitindo analisar como o fomento à cultura se comporta ano a ano.",
      },
      {
        title: "Ciclo Cultural",
        description:
          "Os grandes momentos de celebração do nosso estado, como o Carnaval, São João e Pernambuco Meu País, eventos massivamente apoiados pela EMPETUR.",
      },
      {
        title: "Município Atendido",
        description:
          "A cidade ou localidade pernambucana oficial que sediou a apresentação artística e recebeu o fluxo turístico da festa.",
      },
      {
        title: "Artista ou Grupo",
        description:
          "A pessoa física ou jurídica (banda, cantor, grupo cultural) contratada via inexigibilidade ou edital para realizar a apresentação artística.",
      },
      {
        title: "Fomento (Valor Líquido)",
        description:
          "O investimento financeiro público efetivamente liquidado e pago para viabilizar a apresentação cultural.",
      },
      {
        title: "Data Limite de Pagamento",
        description:
          "Conforme regras de contratação pública (Leis 8.666/93 e 14.133/21), o prazo legal limite estipulado em até 30 dias corridos após a efetiva liquidação do serviço prestado.",
      },
    ],
    dictionaryTitle: "Dicionário de Dados",
    dictionaryDescription:
      "Desenvolvemos um documento técnico detalhado para auditores e desenvolvedores que desejam cruzar a Base Bruta. Entenda as tipologias, chaves e origens do e-Fisco PE.",
    dictionaryButton: "Baixar PDF Oficial",
  },
  downloadDictionaryModal: {
    title: "Dicionário de Dados",
    description:
      "Baixe o documento oficial da EMPETUR contendo os metadados técnicos do painel em formato PDF.",
    cancel: "Cancelar",
    download: "Baixar PDF",
  },
  contact: {
    aria: "Contato e informações",
    title: "Canais de Contato",
    description:
      "Exerça sua cidadania. Acesse os canais oficiais da EMPETUR para esclarecimentos, denúncias ou solicitações da Lei de Acesso à Informação.",
    contacts: [
      {
        id: "email",
        label: "E-mail Oficial",
        value: "empetur@empetur.pe.gov.br",
        subValue: "Clique para enviar e-mail",
      },
      {
        id: "phone",
        label: "Telefone",
        copiedLabel: "Copiado!",
        value: "(81) 3182-8000",
        subValue: "Clique para copiar",
        copiedSubValue: "Salvo na área de transferência",
      },
      {
        id: "hours",
        label: "Atendimento",
        value: "Segunda a Sexta • 08h às 17h",
        subValue: "Finais de semana: Fechado",
      },
      {
        id: "location",
        label: "Localização",
        value: "Sede EMPETUR - Olinda/PE",
        subValue: "Ver no Google Maps",
      },
      {
        id: "esic",
        label: "Acesso à Informação",
        value: "Portal e-SIC PE",
        subValue: "Solicite dados não disponíveis",
      },
      {
        id: "ouvidoria",
        label: "Ouvidoria Geral",
        value: "Manifestações e Denúncias",
        subValue: "Registre sua reclamação",
      },
      {
        id: "observatorio",
        label: "Dados Turísticos",
        value: "Observatório de Turismo",
        subValue: "Acesse pesquisas e boletins",
      },
    ],
  },
  footer: {
    badge: "Controle Interno",
    description:
      "Painel Oficial de Contratações Artísticas. Transparência ativa garantindo o compromisso com a cultura e o turismo de Pernambuco.",
    serviceTitle: "Atendimento",
    hours: "Segunda a Sexta • 08h às 17h",
    locationTitle: "Localização",
    teamTitle: "Equipe de Desenvolvimento e Controle",
    privacy: "Política de Privacidade",
    efisco: "Portal e-Fisco PE",
    copyright: "Todos os direitos reservados.",
    team: [
      { name: "Karla Sabino", role: "Titular AECI" },
      { name: "Monique Ferraz", role: "Adjunta AECI" },
      { name: "Renan Santos", role: "Membro AECI" },
      { name: "Roberto Gabriel", role: "Membro AECI" },
      { name: "Renata Borba", role: "Membro AECI" },
    ],
  },
  privacyModal: {
    title: "Política de Privacidade",
    subtitle: "Empresa de Turismo de Pernambuco S.A.",
    intro:
      "A Empresa de Turismo de Pernambuco Governador Eduardo Campos S.A. (EMPETUR) está comprometida com a segurança dos seus dados pessoais, com o respeito à sua privacidade e com a transparência em nossas operações. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações.",
    sections: {
      whoWeAre: {
        title: "Quem Somos",
        description:
          "A EMPETUR é uma sociedade de economia mista, vinculada à Secretaria de Turismo, Esportes e Lazer de Pernambuco. Atuamos como controladores dos seus dados pessoais, responsáveis por decidir como eles serão tratados e protegidos. Nossa sede está localizada na Avenida Professor Andrade Bezerra, S/N, Salgadinho, Olinda/PE.",
      },
      legislation: {
        title: "Legislação",
        items: [
          "Lei nº 13.709/2018: LGPD",
          "Lei nº 12.527/2011: Lei de Acesso à Informação",
          "Lei Estadual nº 14.804/2012: LAI de Pernambuco",
          "Decreto Est. nº 49.265/2020: Política de Dados",
        ],
      },
      dataPublication: {
        title: "Publicação de Dados",
        description:
          "Neste painel específico de transparência, a divulgação de dados financeiros (como nomes de credores e valores pagos) ocorre para o cumprimento de obrigação legal e execução de políticas públicas, conforme o Art. 7º da LGPD combinado com a Lei de Acesso à Informação.",
      },
      dpo: {
        title: "Contato do Encarregado (DPO)",
        name: "Nome:",
        phone: "Telefone:",
        email: "E-mail:",
      },
    },
    updated: "Atualizado em: 10 de abril de 2025",
    confirm: "Estou Ciente",
  },
  cookie: {
    title: "Privacidade (LGPD)",
    description:
      "Utilizamos cookies anônimos para entender o tráfego e melhorar este painel. Nenhum dado pessoal é rastreado ou vendido.",
    refuse: "Recusar",
    accept: "Aceitar Analytics",
  },
  suggestion: {
    floatingButton: "Sugerir Melhoria",
    title: "Sugerir Melhoria",
    subtitle: "Sua opinião ajuda a evoluir a transparência.",
    name: "Nome (Opcional)",
    namePlaceholder: "Como devemos te chamar?",
    email: "E-mail (Opcional)",
    emailPlaceholder: "Para darmos retorno",
    idea: "Sua Ideia",
    ideaPlaceholder: "O que podemos construir ou melhorar?",
    cancel: "Cancelar",
    sending: "Enviando",
    send: "Enviar",
    successTitle: "Enviado!",
    successDescription:
      "Obrigado por colaborar. Analisaremos sua ideia para melhorar o painel.",
    successButton: "Concluir",
    errorTitle: "Ops, falhou.",
    errorDescription:
      "Não conseguimos conectar ao servidor. Tente novamente em instantes.",
    retry: "Tentar Novamente",
  },
  breadcrumb: {
    aria: "Breadcrumb",
    portal: "Portal",
    transparency: "Transparência",
    contracts: "Contratações",
    dashboard: "Dashboard",
  },
  dashboard: {
    loading: "Carregando Dashboard Oficial...",
    mobileFilterButton: "Filtrar Resultados",
    backToSite: "Voltar ao Site",
    topbar: {
      title: "Filtrar Dados",
      fields: {
        municipio: "Município",
        ciclo: "Ciclo Cultural",
        ano: "Ano",
        nomeCredor: "Razão Social",
        artista: "Artista",
        dataEvento: "Data do Evento",
      },
      clear: "Limpar",
      apply: "Aplicar Filtros",
    },
    viewMode: {
      groupAria: "Alterar modo de visualização do painel",
      activePrefix: "Modo ativo:",
      switchPrefix: "Mudar para:",
      biLabel: "BI",
      biDescription: "Tela única compacta",
      defaultLabel: "Padrão",
      defaultDescription: "Layout com seções",
      biPanelAria: "Painel de dados - modo BI",
      defaultPanelAria: "Painel de dados - modo padrão",
    },
    header: {
      badge: "Painel de Transparência - e-Fisco PE",
      title: "Painel de Pagamentos de Eventos e Apresentações Artísticas",
      description:
        "Transparência sobre os pagamentos realizados para Eventos e Apresentações Artísticas apoiados pela EMPETUR, em atendimento à Lei Estadual nº 16.790/2019.",
      source: "Fonte",
      frequency: "Frequência",
      monthly: "Mensal",
      lastUpdate: "Última Atualização",
    },
    filters: {
      active: "Filtros ativos:",
      badge: "Ativo",
      none: "nenhum (visão completa)",
    },
    charts: {
      cycleTitle: "Apresentações por Ciclo",
      cycleTooltip:
        "Clique nas barras para filtrar os dados por ciclo específico.",
      yearTitle: "Apresentações por Ano",
      yearTooltip:
        "Estatísticas baseadas na data do empenho oficial emitida pela EMPETUR.",
      topMunicipiosTitle: "Top Municípios",
      topMunicipiosTooltip:
        "Clique na fatia ou no nome da cidade na legenda para filtrar o painel.",
      topArtistsTitle: "Top Artistas",
      topArtistsTooltip:
        "Ranking dos 10 artistas com o maior volume de apresentações contratadas.",
      topArtistsSubtitle: "Por Quantidade de Shows",
    },
    biExport: {
      button: "Exportar BI PDF",
      title: "Exportar BI em PDF",
      description:
        "Escolha entre um relatório estruturado com dados reais ou um snapshot visual fiel do BI atual.",
      modeGroupAria: "Escolher tipo de exportação do BI",
      modes: {
        report: {
          badge: "Recomendado",
          title: "Relatório estruturado",
          description:
            "Gera um PDF limpo com texto real, filtros ativos, indicadores, rankings e a tabela filtrada paginada.",
          bullets: [
            "Melhor para auditoria, arquivo institucional e impressão",
            "Sem depender da captura visual da tela",
            "Inclui resumo executivo e registros filtrados",
          ],
          action: "Exportar relatório PDF",
        },
        snapshot: {
          badge: "Visual",
          title: "Snapshot do painel",
          description:
            "Gera uma imagem fiel do dashboard BI exatamente como ele está sendo exibido no momento.",
          bullets: [
            "Mantém mapa, gráficos, tabela e KPIs na composição visual",
            "Oculta botões e barras de rolagem durante a captura",
            "Ideal para apresentação rápida e compartilhamento visual",
          ],
          action: "Exportar snapshot PDF",
        },
      },
      processingTitle: "Processando...",
      steps: {
        report: [
          "Organizando indicadores e filtros ativos...",
          "Montando o relatório paginado...",
          "Renderizando a tabela de registros...",
          "Finalizando o PDF...",
        ],
        snapshot: [
          "Capturando o painel...",
          "Processando imagem...",
          "Gerando PDF landscape...",
          "Finalizando...",
        ],
      },
      successTitle: {
        report: "Relatório PDF gerado com sucesso!",
        snapshot: "Snapshot PDF gerado com sucesso!",
      },
      successDescription: {
        report: "O download do relatório estruturado deve ter iniciado automaticamente.",
        snapshot: "O download do snapshot visual deve ter iniciado automaticamente.",
      },
      previewLabel: "Preview do PDF exportado",
      errorTitle: "Erro ao gerar PDF",
      errorDescription:
        "Tente novamente. Se o problema persistir, tente diminuir o zoom do navegador.",
      retry: "Tentar novamente",
      defaultError: "Não foi possível gerar o PDF do painel BI.",
      report: {
        badge: "Relatório estruturado de dados",
        generatedAt: "Gerado em",
        filters: "Filtros ativos",
        noFilters: "nenhum (visão completa)",
        recordsSubtitle: "{count} registros filtrados",
        emptyRecords: "Nenhum registro corresponde aos filtros ativos.",
        page: "Página",
        metrics: {
          presentations: "Apresentações encontradas",
          artists: "Artistas diferentes",
          municipalities: "Municípios atendidos",
          topDestination: "Top destino",
        },
        sections: {
          municipalities: "Top municípios",
          cycles: "Ciclos culturais",
          years: "Apresentações por ano",
          artists: "Top artistas",
          records: "Registros filtrados",
        },
      },
      errors: {
        missingElement: "Elemento do painel BI não encontrado para exportação.",
        notVisible: "O painel BI precisa estar visível na tela para exportar o PDF.",
        captureFailed: "Falha ao capturar o painel BI para exportação.",
        unexpected: "Falha inesperada ao exportar o PDF do BI.",
      },
    },
    kpi: {
      presentations: "Apresentações Encontradas",
      artists: "Artistas Diferentes",
      municipalities: "Municípios Atendidos",
      topDestination: "Destino Top:",
      topDestinationCard: "Top Destino",
    },
    standardLayout: {
      mapKicker: "Distribuição Territorial",
      mapTitle: "Apresentações por município - Pernambuco",
      mapDescription: "Clique em um município para filtrar o painel inteiro.",
      mappedMunicipalities: "municípios mapeados",
      rankingKicker: "Ranking Territorial",
      rankingTitle: "Top municípios por apresentações",
      rankingDescription: "Clique para filtrar o painel.",
      cycleKicker: "Distribuição por Ciclo",
      cycleDescription:
        "Comparativo entre Carnaval, São João, Apoio e Festival PE.",
      historyKicker: "Série Histórica",
      historyDescription: "Volume anual contratado pelo estado.",
    },
    table: {
      title: "Histórico de Apresentações",
      subtitle: "Filtre ou pesquise pelos fomentos e credores",
      rawDatabase: "Base Bruta Completa",
      export: "Exportar Tabela",
      searchPlaceholder: "Pesquisar registro... (mín. 3 caracteres)",
      headers: {
        artist: "Artista / Empenho",
        creditor: "Credor / Documento",
        municipality: "Município",
        cycle: "Ciclo Cultural",
        eventDeadline: "Evento / Prazo Pagamento",
        value: "Valor Pago (R$)",
      },
      commitment: "Empenho:",
      deadline: "Data limite:",
      empty: "Nenhum registro encontrado para esta busca.",
    },
    exportModal: {
      title: "Exportar Tabela",
      description:
        "Estão visíveis {count} registros. Escolha o formato de download desejado para a sua análise.",
      cancel: "Cancelar",
      csv: "CSV (Dados Abertos)",
      excel: "Excel (.XLSX)",
    },
    rawDatabaseModal: {
      title: "Aviso sobre a Base Bruta",
      description:
        "A planilha que você está prestes a acessar contém todos os registros contábeis brutos do e-Fisco.\n\nEla possui mais linhas que o painel, pois inclui notas de empenho estornadas, anuladas ou duplicidades que a nossa inteligência de dados já limpou da tela principal.",
      back: "Voltar",
      access: "Acessar Base",
    },
  },
};

