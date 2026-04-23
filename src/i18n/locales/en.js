export const en = {
  locale: "en-US",
  languageSwitcher: {
    label: "Select language",
    options: { pt: "PT", en: "EN" },
  },
  common: {
    cancel: "Cancel",
    close: "Close",
    continue: "Continue",
    back: "Back",
    clear: "Clear",
    searchOrSelect: "Search or select...",
    showAll: "Show all",
    noResultsFor: 'No results for "{term}"',
    noData: "No data",
    noResults: "No results",
    noDataFound: "No data found.",
    officialPortal: "Portal",
    transparency: "Transparency",
    contracts: "Contracts",
    dashboard: "Dashboard",
    consultCommitment: "Check the commitment note",
    pendingDefinition: "To be defined",
    clearFilters: "Clear Filters",
    shows: "shows",
    showUpperSingular: "SHOW",
    showUpperPlural: "SHOWS",
    records: "Records",
  },
  topbar: {
    navLinks: [
      { id: "inicio", label: "Home" },
      { id: "painel", label: "Panel" },
      { id: "gestao", label: "Oversight" },
      { id: "sobre", label: "About" },
      { id: "glossario", label: "Glossary" },
      { id: "contato", label: "Contact" },
    ],
    transparency: "Transparency",
    officialPanel: "Official Panel",
    accessData: "Access Data",
    accessPanel: "Open Panel",
  },
  confirmModal: {
    title: "Visit the Official Website?",
    description:
      "You will be redirected to EMPETUR's institutional portal in the same tab. Do you want to continue?",
    cancel: "Cancel",
    confirm: "Continue",
  },
  hero: {
    badge: "Active Transparency â€¢ State Law No. 16.790/2019",
    titlePrefix: "Payments Panel",
    titleHighlight: "for Events and Artistic Performances",
    description:
      "Access EMPETUR's financial support for tourism-related events in Pernambuco through a clear and accessible experience.",
    stats: {
      presentations: "Performances Read",
      municipalities: "Municipalities Served",
      artists: "Distinct Artists",
    },
    cta: "Explore the Panel",
    backgroundAlt: "Institutional panel image",
  },
  banner: {
    title: "Simple and\nfast lookup.",
    description:
      "Quickly find where it happened, what happened, and when it happened with our smart filters.",
    imageAlt: "Audience at a cultural event",
    chips: [
      "Year",
      "Festive Cycle",
      "Municipality",
      "Artist/Band",
      "Amount Paid",
    ],
  },
  panelSection: {
    title: "Quick Lookup",
    description:
      "Filter or click directly on table items to refine your search.",
    loading: "Syncing e-Fisco database...",
    clear: "Clear",
    advancedPanel: "Advanced Panel",
    filters: {
      municipio: "Municipalities",
      ciclo: "Cycles",
      ano: "Years",
      dataEvento: "Dates",
      artista: "Artists",
      nomeCredor: "Business Name (Creditor)",
    },
    table: {
      title: "Commitment Extract",
      subtitle: "Official contract list based on e-Fisco records",
      artistHeader: "Artist / Commitment",
      contractorHeader: "Company / Individual - Contractor",
      municipalityHeader: "Municipality",
      cycleHeader: "Cycle",
      dateHeader: "Date / Deadline",
      valueHeader: "Amount Paid",
      empty: "No results",
      ne: "Commitment:",
      deadline: "Deadline:",
    },
  },
  internalControl: {
    steps: [
      {
        title: "Contract Monitoring",
        desc: "We monitor support and direct-award flows to identify and mitigate risks, ensuring legal compliance in artistic contracting under state-owned company rules and related regulations.",
      },
      {
        title: "Cultural Transparency",
        desc: "We guide managers in standardizing documents and controls, promoting ethics and clarity in how public resources are applied to state events.",
      },
      {
        title: "Focus on Final Delivery",
        desc: "We track improvement recommendations to strengthen public administration, ensuring operational efficiency and agile delivery of festivities to society.",
      },
    ],
    footer:
      "In strict compliance with State Decree No. 47.087/2019 and Law No. 13.303/2016",
  },
  about: {
    aria: "About the panel",
    title: "Transparency in Focus",
    description:
      "A platform designed for citizens to review artistic contracts by crossing data by year, event, and municipality.",
    cards: [
      {
        title: "Core Purpose",
        desc: "Centralize information to quickly answer three key public-management questions: where it happened, what happened, and when it happened.",
      },
      {
        title: "Data Source",
        desc: "We extract records directly from the state's official accounting database (e-Fisco PE), with automated monthly updates.",
      },
      {
        title: "Data Sanity",
        desc: "Our governance engine automatically blocks canceled commitments, zero-value entries, and duplicates before display.",
      },
    ],
    cta: "Understand the Process",
  },
  governanceModal: {
    title: "Governance Engine",
    subtitle: "How we ensure panel accuracy",
    intro:
      "Data extracted from the government system (e-Fisco) contains abbreviations and canceled commitments. Our system applies 4 automatic cleansing layers:",
    steps: [
      {
        num: "1",
        color: "red",
        title: "Value Filter",
        desc: "Reversed, canceled, or zero-liquidated commitments are automatically blocked.",
      },
      {
        num: "2",
        color: "orange",
        title: "Name Dictionary",
        desc: "We correct typing differences. Abbreviations are normalized to the official names of municipalities and bands.",
      },
      {
        num: "3",
        color: "emerald",
        title: "Reading Intelligence",
        desc: "Our algorithm reads long contract text and precisely extracts the actual performance date and artist.",
      },
      {
        num: "4",
        color: "blue",
        title: "Anti-Duplication Lock",
        desc: "It generates a unique key (Artist + City + Date + Amount). Two commitments for the same event count as only one show.",
      },
    ],
    acknowledge: "Got it",
  },
  glossary: {
    aria: "Glossary and data dictionary",
    title: "Understand the Panel",
    description:
      "A quick official guide to accounting and cultural terms.",
    terms: [
      {
        title: "Cultural Year",
        description:
          "Refers to the fiscal year in which festivities took place, allowing year-over-year analysis of cultural support.",
      },
      {
        title: "Cultural Cycle",
        description:
          "The state's major celebration periods, such as Carnival, SÃ£o JoÃ£o, and Pernambuco Meu PaÃ­s, widely supported by EMPETUR.",
      },
      {
        title: "Served Municipality",
        description:
          "The official municipality or locality in Pernambuco that hosted the artistic performance and received the tourism flow generated by the event.",
      },
      {
        title: "Artist or Group",
        description:
          "The individual or legal entity (band, singer, cultural group) hired through direct award or public call to perform.",
      },
      {
        title: "Support (Net Amount)",
        description:
          "The public financial investment effectively liquidated and paid to make the cultural performance possible.",
      },
      {
        title: "Payment Deadline",
        description:
          "Under public procurement rules (Laws 8.666/93 and 14.133/21), the legal payment deadline, up to 30 calendar days after service liquidation.",
      },
    ],
    dictionaryTitle: "Data Dictionary",
    dictionaryDescription:
      "We created a detailed technical document for auditors and developers who need to cross-check the raw database. Understand field types, keys, and e-Fisco PE origins.",
    dictionaryButton: "Download Official PDF",
  },
  downloadDictionaryModal: {
    title: "Data Dictionary",
    description:
      "Download EMPETUR's official document with the panel's technical metadata in PDF format.",
    cancel: "Cancel",
    download: "Download PDF",
  },
  contact: {
    aria: "Contact and information",
    title: "Contact Channels",
    description:
      "Exercise your citizenship. Access EMPETUR's official channels for clarifications, reports, or requests under the Access to Information Law.",
    contacts: [
      {
        id: "email",
        label: "Official Email",
        value: "empetur@empetur.pe.gov.br",
        subValue: "Click to send an email",
      },
      {
        id: "phone",
        label: "Phone",
        copiedLabel: "Copied!",
        value: "(81) 3182-8000",
        subValue: "Click to copy",
        copiedSubValue: "Saved to clipboard",
      },
      {
        id: "hours",
        label: "Hours",
        value: "Monday to Friday â€¢ 8 AM to 5 PM",
        subValue: "Weekends: Closed",
      },
      {
        id: "location",
        label: "Location",
        value: "EMPETUR Headquarters - Olinda/PE",
        subValue: "Open in Google Maps",
      },
      {
        id: "esic",
        label: "Access to Information",
        value: "e-SIC PE Portal",
        subValue: "Request unavailable data",
      },
      {
        id: "ouvidoria",
        label: "General Ombudsman",
        value: "Complaints and Reports",
        subValue: "Submit your complaint",
      },
      {
        id: "observatorio",
        label: "Tourism Data",
        value: "Tourism Observatory",
        subValue: "Access surveys and bulletins",
      },
    ],
  },
  footer: {
    badge: "Internal Control",
    description:
      "Official artistic contracts panel. Active transparency reinforcing Pernambuco's commitment to culture and tourism.",
    serviceTitle: "Support",
    hours: "Monday to Friday â€¢ 8 AM to 5 PM",
    locationTitle: "Location",
    teamTitle: "Development and Control Team",
    privacy: "Privacy Policy",
    efisco: "e-Fisco PE Portal",
    copyright: "All rights reserved.",
    team: [
      { name: "Karla Sabino", role: "AECI Head" },
      { name: "Monique Ferraz", role: "AECI Deputy" },
      { name: "Renan Santos", role: "AECI Member" },
      { name: "Roberto Gabriel", role: "AECI Member" },
      { name: "Renata Borba", role: "AECI Member" },
    ],
  },
  privacyModal: {
    title: "Privacy Policy",
    subtitle: "Pernambuco Tourism Company S.A.",
    intro:
      "Empresa de Turismo de Pernambuco Governador Eduardo Campos S.A. (EMPETUR) is committed to the security of your personal data, respect for your privacy, and transparency in our operations. This Privacy Policy explains how we collect, use, store, and protect your information.",
    sections: {
      whoWeAre: {
        title: "Who We Are",
        description:
          "EMPETUR is a mixed-capital company linked to Pernambuco's Secretariat of Tourism, Sports, and Leisure. We act as controllers of your personal data, responsible for deciding how it is processed and protected. Our headquarters is located at Avenida Professor Andrade Bezerra, S/N, Salgadinho, Olinda/PE.",
      },
      legislation: {
        title: "Legislation",
        items: [
          "Law No. 13.709/2018: LGPD",
          "Law No. 12.527/2011: Access to Information Law",
          "State Law No. 14.804/2012: Pernambuco Access to Information Law",
          "State Decree No. 49.265/2020: Data Policy",
        ],
      },
      dataPublication: {
        title: "Data Publication",
        description:
          "In this specific transparency panel, the disclosure of financial data (such as creditor names and amounts paid) takes place to comply with a legal obligation and execute public policies, under Article 7 of the LGPD combined with the Access to Information Law.",
      },
      dpo: {
        title: "Data Protection Officer Contact",
        name: "Name:",
        phone: "Phone:",
        email: "Email:",
      },
    },
    updated: "Updated on: April 10, 2025",
    confirm: "I Understand",
  },
  cookie: {
    title: "Privacy (LGPD)",
    description:
      "We use anonymous cookies to understand traffic and improve this panel. No personal data is tracked or sold.",
    refuse: "Decline",
    accept: "Accept Analytics",
  },
  suggestion: {
    floatingButton: "Suggest an Improvement",
    title: "Suggest an Improvement",
    subtitle: "Your opinion helps us improve transparency.",
    name: "Name (Optional)",
    namePlaceholder: "How should we call you?",
    email: "Email (Optional)",
    emailPlaceholder: "So we can get back to you",
    idea: "Your Idea",
    ideaPlaceholder: "What can we build or improve?",
    cancel: "Cancel",
    sending: "Sending",
    send: "Send",
    successTitle: "Sent!",
    successDescription:
      "Thanks for contributing. We will review your idea to improve the panel.",
    successButton: "Finish",
    errorTitle: "Something went wrong.",
    errorDescription:
      "We could not reach the server. Please try again shortly.",
    retry: "Try Again",
  },
  breadcrumb: {
    aria: "Breadcrumb",
    portal: "Portal",
    transparency: "Transparency",
    contracts: "Contracts",
    dashboard: "Dashboard",
  },
  dashboard: {
    loading: "Loading Official Dashboard...",
    mobileFilterButton: "Filter Results",
    backToSite: "Back to Site",
    topbar: {
      title: "Filter Data",
      fields: {
        municipio: "Municipality",
        ciclo: "Cultural Cycle",
        ano: "Year",
        nomeCredor: "Business Name",
        artista: "Artist",
        dataEvento: "Event Date",
      },
      clear: "Clear",
      apply: "Apply Filters",
    },
    viewMode: {
      groupAria: "Change dashboard view mode",
      activePrefix: "Active mode:",
      switchPrefix: "Switch to:",
      biLabel: "BI",
      biDescription: "Single-screen compact layout",
      defaultLabel: "Default",
      defaultDescription: "Sectioned layout",
      biPanelAria: "Data panel - BI mode",
      defaultPanelAria: "Data panel - default mode",
    },
    header: {
      badge: "Transparency Panel - e-Fisco PE",
      title: "Payments Panel for Events and Artistic Performances",
      description:
        "Transparency on payments made for Events and Artistic Performances supported by EMPETUR, in compliance with State Law No. 16.790/2019.",
      source: "Source",
      frequency: "Frequency",
      monthly: "Monthly",
      lastUpdate: "Last Update",
    },
    filters: {
      active: "Active filters:",
      badge: "Active",
      none: "none (full view)",
    },
    charts: {
      cycleTitle: "Performances by Cycle",
      cycleTooltip: "Click the bars to filter data by a specific cycle.",
      yearTitle: "Performances by Year",
      yearTooltip:
        "Statistics based on the official commitment issuance date provided by EMPETUR.",
      topMunicipiosTitle: "Top Municipalities",
      topMunicipiosTooltip:
        "Click a slice or a city name in the legend to filter the panel.",
      topArtistsTitle: "Top Artists",
      topArtistsTooltip:
        "Ranking of the 10 artists with the highest number of contracted performances.",
      topArtistsSubtitle: "By Number of Shows",
    },
    biExport: {
      button: "Export BI PDF",
      title: "Export BI PDF",
      description:
        "Choose between a structured PDF report with real data or a faithful visual snapshot of the current BI dashboard.",
      modeGroupAria: "Choose BI export type",
      modes: {
        report: {
          badge: "Recommended",
          title: "Structured report",
          description:
            "Generates a clean PDF with real text, active filters, KPIs, rankings, and the paginated filtered table.",
          bullets: [
            "Best for auditing, institutional archiving, and printing",
            "Does not depend on a visual screen capture",
            "Includes executive summary and filtered records",
          ],
          action: "Export report PDF",
        },
        snapshot: {
          badge: "Visual",
          title: "Dashboard snapshot",
          description:
            "Generates a faithful image-based PDF of the BI dashboard exactly as it appears on screen.",
          bullets: [
            "Preserves map, charts, table, and KPIs in the visual composition",
            "Hides floating controls and scrollbars during capture",
            "Best for quick presentations and visual sharing",
          ],
          action: "Export snapshot PDF",
        },
      },
      processingTitle: "Processing...",
      steps: {
        report: [
          "Organizing KPIs and active filters...",
          "Building the paginated report...",
          "Rendering the records table...",
          "Finalizing the PDF...",
        ],
        snapshot: [
          "Capturing dashboard...",
          "Processing image...",
          "Generating landscape PDF...",
          "Finishing...",
        ],
      },
      successTitle: {
        report: "Report PDF generated successfully!",
        snapshot: "Snapshot PDF generated successfully!",
      },
      successDescription: {
        report: "The structured report download should have started automatically.",
        snapshot: "The visual snapshot download should have started automatically.",
      },
      previewLabel: "Exported PDF preview",
      errorTitle: "Error generating PDF",
      errorDescription:
        "Try again. If the problem persists, try reducing the browser zoom.",
      retry: "Try Again",
      defaultError: "Could not generate the BI dashboard PDF.",
      report: {
        badge: "Structured data report",
        generatedAt: "Generated at",
        filters: "Active filters",
        noFilters: "none (full view)",
        recordsSubtitle: "{count} filtered records",
        emptyRecords: "No records match the active filters.",
        page: "Page",
        metrics: {
          presentations: "Performances found",
          artists: "Distinct artists",
          municipalities: "Municipalities served",
          topDestination: "Top destination",
        },
        sections: {
          municipalities: "Top municipalities",
          cycles: "Cultural cycles",
          years: "Performances by year",
          artists: "Top artists",
          records: "Filtered records",
        },
      },
      errors: {
        missingElement: "BI dashboard element not found for export.",
        notVisible: "The BI dashboard must be visible on screen to export the PDF.",
        captureFailed: "Failed to capture the BI dashboard for export.",
        unexpected: "Unexpected failure while exporting the BI PDF.",
      },
    },
    kpi: {
      presentations: "Performances Found",
      artists: "Distinct Artists",
      municipalities: "Municipalities Served",
      topDestination: "Top destination:",
      topDestinationCard: "Top Destination",
    },
    standardLayout: {
      mapKicker: "Territorial Distribution",
      mapTitle: "Performances by municipality - Pernambuco",
      mapDescription: "Click a municipality to filter the entire dashboard.",
      mappedMunicipalities: "mapped municipalities",
      rankingKicker: "Territorial Ranking",
      rankingTitle: "Top municipalities by performances",
      rankingDescription: "Click to filter the dashboard.",
      cycleKicker: "Distribution by Cycle",
      cycleDescription:
        "Comparison between Carnival, Sao Joao, Support, and Festival PE.",
      historyKicker: "Historical Series",
      historyDescription: "Annual contracted volume by the state.",
      topArtistsKicker: "Top Artists",
    },
    table: {
      title: "Performance History",
      subtitle: "Filter or search by support records and creditors",
      rawDatabase: "Full Raw Database",
      export: "Export Table",
      searchPlaceholder: "Search record... (min. 3 characters)",
      headers: {
        artist: "Artist / Commitment",
        creditor: "Creditor / Document",
        municipality: "Municipality",
        cycle: "Cultural Cycle",
        eventDeadline: "Event / Payment Deadline",
        value: "Amount Paid (BRL)",
      },
      commitment: "Commitment:",
      deadline: "Deadline:",
      empty: "No records found for this search.",
    },
    exportModal: {
      title: "Export Table",
      description:
        "{count} records are currently visible. Choose the download format that fits your analysis.",
      cancel: "Cancel",
      csv: "CSV (Open Data)",
      excel: "Excel (.XLSX)",
    },
    rawDatabaseModal: {
      title: "Raw Database Notice",
      description:
        "The spreadsheet you are about to access contains all raw accounting records from e-Fisco.\n\nIt contains more rows than the panel because it includes reversed commitments, cancellations, and duplicates that our data intelligence has already removed from the main screen.",
      back: "Back",
      access: "Access Database",
    },
  },
};
