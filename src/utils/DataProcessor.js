import Papa from "papaparse";

export const normalizarMunicipio = (txt = "") =>
  txt
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toUpperCase()
    .trim();

/* ======================
   UTILITÁRIOS
====================== */
const extrairAno = (texto) => {
  if (!texto) return "---";
  const match = texto.match(/(19|20)\d{2}/);
  return match ? match[0] : "---";
};

const normalizarEspacos = (txt) =>
  txt.replace(/\s+/g, " ").trim();

const extrairValor = (valorString) => {
  if (!valorString) return 0;
  const limpo = valorString.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(limpo) || 0;
};

/* ======================
   DATA DO EVENTO
====================== */
export const extrairDataEvento = (obsOriginal) => {
  // Regex atualizada: Agora aceita anos com 2 ou 4 dígitos ([0-9]{2,4})
  const match = (obsOriginal || "").match(
    /([0-9]{1,2})[ \/-]([0-9]{1,2})[ \/-]([0-9]{2,4})/
  );

  if (match) {
    let dia = match[1].padStart(2, '0');
    let mes = match[2].padStart(2, '0');
    let ano = match[3];

    // Se o ano vier só com 2 dígitos (ex: "26"), transforma magicamente em "2026"
    if (ano.length === 2) {
      ano = `20${ano}`;
    }

    return `${dia}/${mes}/${ano}`;
  }

  return "---";
};
/* ======================
   ARTISTA (RIGOROSO E SEM PREFIXOS E NÚMEROS)
====================== */
export const extrairArtista = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";
  let obs = normalizarEspacos(obsOriginal.toUpperCase());

  // 1. REGEX MUTANTE BLINDADA CONTRA NÚMEROS E PLURAIS
  const regexArtista = /(?:(?:\d{1,2}\s+)?(?:A?PRE[A-ZÇÃ\.]*|PRESENT[A-ZÇÃ\.]*)(?:\s*ART[IÍ]STIC[A-Z\.]*)?|ART[IÍ]STIC[A-Z\.]*|SHOW|CONTRATA[ÇC][ÃA]O|CACH[EÊ])(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+PARA\s+|\s+DURANTE\s+|\s+NO\s+DIA|\s*EVENTO|\s*-\s*|$)/;

  const match = obs.match(regexArtista);
  let artistaRaw = "NÃO IDENTIFICADO";

  if (match?.[1]) {
    artistaRaw = match[1].replace(/\(.*?\)/g, "").trim();
  } else {
    // PLANO B EXTREMAMENTE RESTRITO
    if (/FESTIVAL|PERNAMBUCO MEU PA[IÍ]S|CARNAVAL|S[AÃ]O JO[AÃ]O|FESTA/i.test(obs)) {
      const regexFallback = /^(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+)/;
      const fallbackMatch = obs.match(regexFallback);
      if (fallbackMatch?.[1]) {
        artistaRaw = fallbackMatch[1].replace(/\(.*?\)/g, "").trim();
      }
    }
  }

  // 🔴 LIMPEZA EXTRA JURÍDICA: Arranca "DUAS (02) APRESENTAÇÕES DE" que pode ter vindo grudado no nome!
  artistaRaw = artistaRaw.replace(/^(?:UM|UMA|DOIS|DUAS|TR[EÊ]S|QUATRO)?\s*(?:\(\d{1,2}\))?\s*(?:APRESENTA[ÇC][OÕ]ES|APRESENTA[ÇC][ÃA]O|SHOWS?|ART[IÍ]STIC[A-Z\.]*)*\s*(?:DE|DA|DO|DAS|DOS)?\s*/i, "").trim();

  // Limpeza de lixo de quantidades numéricas no início ("02 ", "1 ")
  artistaRaw = artistaRaw.replace(/^\d{1,2}\s+/, "").trim();

  // Limpeza de palavras administrativas
  const palavrasSujas = [
    "APRESENTAÇÕES", "APRESENTACOES", "APRESENTAÇÃO", "APRESENTACAO", "PRESENTAÇÃO", "PRESENTACAO", "APRESEN",
    "PRESE", "ARTÍSTICAS", "ARTISTICAS", "ARTÍSTICA", "ARTISTICA", "CONTRATAÇÃO", "VALOR", "REFERENTE", "PROCESSO", "PAGAMENTO"
  ];
  palavrasSujas.forEach(ps => {
    if (artistaRaw.startsWith(ps)) {
      artistaRaw = artistaRaw.replace(ps, "").trim();
    }
  });

  // Limpeza de preposições que sobram no início
  artistaRaw = artistaRaw.replace(/^(DE|DA|DO|DAS|DOS)\s+/, "").trim();

  // Limpeza de "CANTOR", "CANTORA", "O CANTOR", "A CANTORA", "ARTISTA" ou "BANDA"
  artistaRaw = artistaRaw.replace(/^(?:O\s+|A\s+)?(?:CANTORA?|ARTISTA|BANDA)\s+/i, "").trim();

  // Limpa traços que sobram no final
  artistaRaw = artistaRaw.replace(/\s*-\s*$/, "").trim();

  // Corta nomes de festivais/polos que grudaram
  artistaRaw = artistaRaw.replace(/\s*(?:FESTIVAL|PERNAMBUCO MEU PA[IÍ]S|EDI[CÇ][AÃ]O|POLO|NA CIDADE).*$/i, "").trim();

  // 2. DICIONÁRIO DE UNIFICAÇÃO
  const mapaArtistas = {
    "BANDA D ROMANCE": "BANDA D' ROMANCE",
    "BANDA D' ROMANCE": "BANDA D' ROMANCE",
    "D' ROMANCE": "BANDA D' ROMANCE",
    "D ROMANCE": "BANDA D' ROMANCE",
    "BANDA KEBRANÇAS": "BANDA KEBRANÇA",
    "BANDA KEBRANÇA": "BANDA KEBRANÇA",
    "BANDA SWINGNOVO": "BANDA SWING NOVO",
    "BANDA SWING NOVO": "BANDA SWING NOVO",
    "SWING NOVO": "BANDA SWING NOVO",
    "MARILIA MARQUES": "MARÍLIA MARQUES",
    "MARÍLIA MARQUES": "MARÍLIA MARQUES",
    "MATHEUS VINNI": "MATHEUS VINI",
    "MATHEUS VINI": "MATHEUS VINI",
    "ORQUESTRA DE FREVO MEXE COM TUDO -": "ORQUESTRA DE FREVO MEXE COM TUDO",
    "ORQUESTRA DE FREVO MEXE COM TUDO": "ORQUESTRA DE FREVO MEXE COM TUDO",
    "ORQ DE FREVO MEXE COM TUDO": "ORQUESTRA DE FREVO MEXE COM TUDO",
    "BFULÔ DE MANDACARÚ": "FULÔ DE MANDACARÚ",
    "BFULO DE MANDACARU": "FULÔ DE MANDACARÚ"
  };

  return mapaArtistas[artistaRaw] || artistaRaw;
};

/* ======================
   MUNICÍPIO (PREPARADO PARA PERNAMBUCO MEU PAÍS E ERROS DE DIGITAÇÃO)
====================== */
export const extrairMunicipio = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";
  let obs = obsOriginal.toUpperCase();

  // 1. LIMPEZA PRÉVIA (Remove ruídos e formatações estranhas)
  obs = obs
    .replace(/\bCUMBUCA\b/g, "CUMBUCÁ")
    .replace(/\bCAMBUCÁ\b/g, "CUMBUCÁ")
    .replace(/\bCAMBUCA\b/g, "CUMBUCÁ")
    .replace(/\bNAZARE\s+DE\s+MATA\b/g, "NAZARÉ DA MATA")
    .replace(/\bJOAQUIMNABUCO\b/g, "JOAQUIM NABUCO")
    .replace(/\bDEILHA DE ITAMARACÁ\b/g, "ILHA DE ITAMARACÁ")
    .replace(/\bDECATENDE\b/g, "CATENDE")
    .replace(/\bDETUPARETAMA\b/g, "TUPARETAMA")
    .replace(/\bCIDAD\s+DE\b/g, "CIDADE DE")
    .replace(/\bCIDADED\s+E\b/g, "CIDADE DE")
    .replace(/\bCDADE\s+DE\b/g, "CIDADE DE")
    .replace(/\bB\.\s+DE\s+SÃO\s+FRANCISCO\b/g, "BELEM DE SAO FRANCISCO")
    .replace(/\bB\s+DE\s+SÃO\s+FRANCISCO\b/g, "BELEM DE SAO FRANCISCO")
    .replace(/\bBEL[EÉ]M DE S[AÃ]O FCO\.?\b/g, "CIDADE DE BELÉM DE SÃO FRANCISCO")
    .replace(/CARNAUBEIRA\s+DAPENHA/g, "CARNAUBEIRA DA PENHA")
    .replace(/DA DIVERSIDADE (NA|EM) /g, "")
    .replace(/POLO DA DIVERSIDADE\s*-?\s*/g, "")
    .replace(/\s+/g, " ");

  let resultado = "NÃO IDENTIFICADO";

  // 2. EXTRAÇÃO
  const matchPMP = obs.match(/(?:MEU PA[IÍ]S EM|POLO|ETAPA)\s+([A-ZÀ-Ú\s\.]{3,40}?)(?:\/|PE\b|-|,|\.|\s+NO\s+DIA|$)/);

  if (matchPMP?.[1] && !matchPMP[1].includes("PERNAMBUCO")) {
    resultado = matchPMP[1].trim();
  } else {
    const matchCidade = obs.match(/CIDADE\s*(?:DE|DO|DA)?\s+([A-ZÀ-Ú\s\.]{3,40}?)(?:\/|PE\b|-|,|\.|\s+NO\s+DIA|$)/);
    if (matchCidade?.[1]) {
      resultado = matchCidade[1].trim();
    } else {
      const matchEm = obs.match(/\b(?:EM|NO|NA|DE)\s+([A-ZÀ-Ú\s\.]{3,40}?)\s*(?:\/|-)\s*PE\b/);
      if (matchEm?.[1]) {
        resultado = matchEm[1].trim();
      } else {
        const matchVirgula = obs.match(/,\s*([A-ZÀ-Ú\s\.]{3,40}?)\s*\/\s*PE\b/);
        if (matchVirgula?.[1]) {
          resultado = matchVirgula[1].trim();
        }
      }
    }
  }

  // 3. LIMPEZA PÓS-EXTRAÇÃO
  resultado = resultado.replace(/\/.*$/, "").replace(/\bPE\b$/, "").trim();

  // TRAVA EXTRA DE SEGURANÇA
  if (resultado.includes("CIDADE DE ")) {
    resultado = resultado.split("CIDADE DE ")[1].trim();
  }

  // 4. CORREÇÕES FINAIS (Dicionário de acentuações e grafias brutas)
  const mapaCorrecoes = {
    "BELEM DE SAO FRANCISCO": "BELÉM DE SÃO FRANCISCO",
    "GLORIA DO GOITA": "GLÓRIA DO GOITÁ",
    "CARNAUBEIRA DA PENHA": "CARNAUBEIRA DA PENHA",
    "JOAQUIM NABUCO": "JOAQUIM NABUCO",
    "NAZARÉ DA MATA": "NAZARÉ DA MATA",
    "ILHA DE ITAMARACÁ": "ILHA DE ITAMARACÁ",
    "RECFE": "RECIFE",
    "INAJA": "INAJÁ" // 🔴 Inajá sem acento corrigido!
  };

  // 🔴 MÁGICA DO JABOATÃO: Pega qualquer bizarrice (JABOATAO, JABOATÃO, JABAOTAO, JABAOTÃO)
  if (/JAB[AO]AT[AÃ]O/i.test(resultado) || resultado.includes("GUARARAPES")) {
    return "JABOATÃO DOS GUARARAPES";
  }

  return mapaCorrecoes[resultado] || resultado;
};

/* ======================
   NOME DO EVENTO (MÁGICA PARA APOIO A EVENTOS CULTURAIS)
====================== */
export const extrairNomeEvento = (obsOriginal, artista) => {
  if (!obsOriginal || !artista || artista === "NÃO IDENTIFICADO") return null;

  const obs = normalizarEspacos(obsOriginal.toUpperCase());
  const indexArtista = obs.indexOf(artista);

  if (indexArtista === -1) return null;

  // Isola o trecho que vem exatamente depois do nome do artista
  const trecho = obs.substring(indexArtista + artista.length);

  // Regex Ninja: Pega o que está entre o artista e a cidade/dia/processo
  const regex = /^(?:\s*[:,]?\s*)(?:NO EVENTO|NO|NA|O|A|EM)?\s+(.*?)\s*(?:,|NA CIDADE|NO MUNIC[IÍ]PIO|EM\s+[A-ZÀ-Ú]|NO DIA|DIA\s+\d|PROCESSO|SEI|$)/i;
  const match = trecho.match(regex);

  if (match && match[1]) {
    let evento = match[1].trim();

    // Remove palavras de introdução que sobraram
    evento = evento.replace(/^(?:EVENTO|FESTIVIDADE|CELEBRAÇÃO|FESTA DE|COMEMORAÇÃO DE)\s+/i, "");

    // 🔴 TRAVA DE SEGURANÇA: Se não tinha evento escrito e a regex pegou a cidade direto
    const lixo = ["CIDADE", "MUNIC", "DIA", "PROCESSO", "SEI", "ESTADO", "APRESENTA", "CARNAVAL", "SÃO JOÃO"];
    if (lixo.some(l => evento.startsWith(l)) || evento.length <= 3) {
      return null;
    }

    // Transformar em Title Case para ficar elegante no gráfico (ex: "Culto do Monte")
    let eventoFormatado = evento.split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

    // Arruma as preposições que ficaram maiúsculas no Title Case
    eventoFormatado = eventoFormatado.replace(/\s(De|Da|Do|Das|Dos|E|Em|Na|No|Para)\s/ig, match => match.toLowerCase());

    return eventoFormatado;
  }

  return null;
};

/* ======================
   PROCESSADOR PRINCIPAL E TRAVAS DE SEGURANÇA
====================== */
export const fetchAndProcessData = async (url) => {
  const response = await fetch(url);
  const csv = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const setUnico = new Set();

        const processed = data.reduce((acc, linha, index) => {

          // 0ª TRAVA: TIPO DE DESPESA (Só aceita "NORMAL")
          const tipoDespesa = (linha["Tipo de Despesa"] || "").trim().toUpperCase();
          if (tipoDespesa !== "NORMAL") {
            return acc;
          }

          const valorBruto = linha["Total Liquidado"] || "0";
          const valor = extrairValor(valorBruto);

          if (valor === 0) return acc;

          const obs = linha["Observação do Empenho"] || "";
          const obsLimpa = obs.trim().toUpperCase();

          // 1ª TRAVA (O CÃO DE GUARDA): BLACKLIST ADMINISTRATIVA
          const termosProibidos = [
            "TRANSPORTE", "LOCAÇÃO", "LOCACAO", "HOSPEDAGEM", "PASSAGEM", "PASSAGENS",
            "DIÁRIA", "DIARIA", "DIÁRIAS", "DIARIAS", "DIÁRIAS CIVIL", "DIARIAS CIVIL",
            "CIVIL", "INFORMATICA", "INFORMÁTICA", "AQUISIÇÃO", "AQUISICAO",
            "MANUTENÇÃO", "MANUTENCAO", "VIGILÂNCIA", "LIMPEZA", "COMBUSTÍVEL", "COMBUSTIVEL",
            "MATERIAL", "TELEFONIA", "ÁGUA", "LUZ", "SERVIÇO DE", "SERVICO DE", "SONORIZAÇÃO",
            "ILUMINAÇÃO", "GERADOR", "ESTRUTURA", "PALCO", "TENDAS", "TRIO ELÉTRICO",
            "BANHEIRO", "CONSERVAÇÃO", "SEGURANÇA"
          ];

          const ehLixoAdministrativo = termosProibidos.some(termo => obsLimpa.includes(termo));
          if (ehLixoAdministrativo) return acc;

          // 2ª TRAVA: WHITELIST ARTÍSTICA
          const termosObrigatorios = [
            "APRES", "APRE.", "PRESE", "PRESENTA", "AP.", "AP ", "ARTÍSTIC", "ARTISTIC",
            "SHOW", "CACHÊ", "CACHE", "BANDA", "CANTOR", "ORQUESTRA", "GRUPO MUSICAL"
          ];

          const ehShow = termosObrigatorios.some(termo => obsLimpa.includes(termo));
          if (!ehShow) return acc;

          const dataEmpenho = linha["Data do Empenho"] || "";
          const artista = extrairArtista(obs);
          const municipio = extrairMunicipio(obs);
          const dataEvento = extrairDataEvento(obs);

          if (artista === "NÃO IDENTIFICADO" && dataEvento === "---") {
            return acc;
          }

          // CICLO INTELIGENTE E EVENTOS ESPECÍFICOS
          let ciclo = linha["Detalhamento da Despesa Gerencial"] || "Outros";
          let cicloMacro = ciclo; 

          if (obsLimpa.includes("PERNAMBUCO MEU PAÍS") || obsLimpa.includes("PERNAMBUCO MEU PAIS")) {
            ciclo = "Festival Pernambuco Meu País";
            cicloMacro = "Festival Pernambuco Meu País";
          }
          else if (ciclo.toUpperCase().includes("APOIO A EVENTOS CULTURAIS") || ciclo === "Outros") {
            const extraido = extrairNomeEvento(obs, artista);

            cicloMacro = "Apoio a Eventos Culturais"; 

            if (extraido) {
              ciclo = extraido; 
            } else {
              ciclo = "Apoio a Eventos Culturais";
            }
          }

          const chaveUnica = `${artista}-${municipio}-${dataEvento}-${valor}`;

          if (setUnico.has(chaveUnica)) {
            return acc;
          }

          setUnico.add(chaveUnica);

          acc.push({
            id: `${linha["Número do Empenho"] || "emp"}-${index}`,
            numeroEmpenho: linha["Número do Empenho"] || "N/A",
            artista,
            municipio,
            ciclo, 
            cicloMacro,
            dataEvento,
            dataEmpenho: dataEmpenho || "---",
            ano: extrairAno(dataEmpenho),
            valor,
            documentoCredor: linha["CPF, CNPJ, IG ou UG/Gestão do Credor"] || "N/A",
            nomeCredor: linha["Nome ou Razão Social do Credor"] || "NÃO IDENTIFICADO",
            municipioNormalizado: normalizarMunicipio(municipio),
          });

          return acc;
        }, []);

        resolve(processed);
      },
    });
  });
};