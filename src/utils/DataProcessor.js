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
  const match = (obsOriginal || "").match(
    /([0-9]{1,2}[ \/-][0-9]{1,2}[ \/-][0-9]{4})/
  );
  return match ? match[1].replace(/[ -]/g, "/") : "---";
};

/* ======================
   ARTISTA (RIGOROSO E SEM PREFIXOS)
====================== */
export const extrairArtista = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";
  let obs = normalizarEspacos(obsOriginal.toUpperCase());

  // 1. REGEX PRINCIPAL BLINDADA
  const regexArtista = /(?:APRESENTAÇÃO|ART[IÍ]STIC[A-Z]*|AP\.|APRESENT|SHOW|CONTRATAÇÃO DE|CACH[EÊ] DE)(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+PARA\s+|\s+DURANTE\s+|\s+NO\s+DIA|$)/;

  const match = obs.match(regexArtista);
  let artistaRaw = "NÃO IDENTIFICADO";

  if (match?.[1]) {
    artistaRaw = match[1].replace(/\(.*?\)/g, "").trim();
  } else {
    // PLANO B EXTREMAMENTE RESTRITO: Só busca se for claramente um evento
    if (/FESTIVAL|PERNAMBUCO MEU PA[IÍ]S|CARNAVAL|S[AÃ]O JO[AÃ]O|FESTA/i.test(obs)) {
      const regexFallback = /^(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+)/;
      const fallbackMatch = obs.match(regexFallback);
      if (fallbackMatch?.[1]) {
        artistaRaw = fallbackMatch[1].replace(/\(.*?\)/g, "").trim();
      }
    }
  }

  // Limpeza de palavras administrativas que podem ter grudado no nome
  const palavrasSujas = ["APRESENTAÇÃO", "ARTÍSTICA", "CONTRATAÇÃO", "VALOR", "REFERENTE", "PROCESSO", "PAGAMENTO"];
  palavrasSujas.forEach(ps => {
    if (artistaRaw.startsWith(ps)) {
      artistaRaw = artistaRaw.replace(ps, "").trim();
    }
  });

  // Limpeza de preposições que sobram
  artistaRaw = artistaRaw.replace(/^(DE|DA|DO|DAS|DOS)\s+/, "").trim();

  // 🔴 A MÁGICA AQUI: Limpeza de "CANTOR", "CANTORA", "O CANTOR", "A CANTORA" ou "ARTISTA"
  artistaRaw = artistaRaw.replace(/^(?:O\s+|A\s+)?(?:CANTORA?|ARTISTA)\s+/i, "").trim();

  // Limpa traços que sobram no final
  artistaRaw = artistaRaw.replace(/\s*-\s*$/, "").trim();

  // ========================================================
  // 🔴 CORREÇÃO DO JOSÉ AUGUSTO: Corta nomes de festivais/polos que grudaram
  // ========================================================
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
    "BFULÔ DE MANDACARÚ": "FULÔ DE MANDACARÚ",
    "BFULO DE MANDACARU": "FULÔ DE MANDACARÚ"
  };

  return mapaArtistas[artistaRaw] || artistaRaw;
};

/* ======================
   MUNICÍPIO (PREPARADO PARA PERNAMBUCO MEU PAÍS)
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
    // 🔴 AQUI ESTÁ A MÁGICA PARA O SEU BUG: Limpa os nomes dos Polos
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

  // 🔴 TRAVA EXTRA DE SEGURANÇA: Se ainda sobrar algum "CIDADE DE" grudado, ele corta tudo antes e pega só a cidade
  if (resultado.includes("CIDADE DE ")) {
    resultado = resultado.split("CIDADE DE ")[1].trim();
  }

  // 4. CORREÇÕES FINAIS (Dicionário)
  const mapaCorrecoes = {
    "BELEM DE SAO FRANCISCO": "BELÉM DE SÃO FRANCISCO",
    "GLORIA DO GOITA": "GLÓRIA DO GOITÁ",
    "CARNAUBEIRA DA PENHA": "CARNAUBEIRA DA PENHA",
    "JOAQUIM NABUCO": "JOAQUIM NABUCO",
    "NAZARÉ DA MATA": "NAZARÉ DA MATA",
    "ILHA DE ITAMARACÁ": "ILHA DE ITAMARACÁ",
    "RECFE": "RECIFE"
  };

  if (resultado.includes("JABOATAO") || resultado.includes("JABOATÃO")) {
    return "JABOATÃO DOS GUARARAPES";
  }

  return mapaCorrecoes[resultado] || resultado;
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
            "APRESENTAÇÃO", "APRESENTACAO", "ARTÍSTICA", "ARTISTICA",
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

          // CICLO INTELIGENTE: Corrige "Pernambuco Meu País" se vier como "Outros"
          let ciclo = linha["Detalhamento da Despesa Gerencial"] || "Outros";
          if (obsLimpa.includes("PERNAMBUCO MEU PAÍS") || obsLimpa.includes("PERNAMBUCO MEU PAIS")) {
            ciclo = "Festival Pernambuco Meu País";
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
            dataEvento,
            dataEmpenho: dataEmpenho || "---",
            ano: extrairAno(dataEmpenho),
            valor,
            municipioNormalizado: normalizarMunicipio(municipio),
          });

          return acc;
        }, []);

        resolve(processed);
      },
    });
  });
};