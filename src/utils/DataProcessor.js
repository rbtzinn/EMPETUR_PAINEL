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
   ARTISTA (VERSÃO FINAL CONSOLIDADA)
====================== */
export const extrairArtista = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";
  const obs = obsOriginal.toUpperCase();

  // 1. REGEX DE CAPTURA PRINCIPAL
  const regexArtista = /(?:APRESENTAÇÃO|ART[IÍ]STIC[A-Z]*|AP\.|APRESENT)(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+NO\s+CARNAVAL|\s+NO\s+SÃO|\s+NO\s+DIA|$)/;

  const match = obs.match(regexArtista);
  let artistaRaw = "NÃO IDENTIFICADO";

  if (match?.[1]) {
    artistaRaw = normalizarEspacos(match[1].replace(/\(.*?\)/g, ""));
  } else {
    // PLANO B (FALLBACK): NOME DIRETO NO INÍCIO
    const regexFallback = /^(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+)/;
    const fallbackMatch = obs.match(regexFallback);
    
    if (fallbackMatch?.[1]) {
      const possivelNome = fallbackMatch[1].trim();
      const palavrasIgnoradas = ["PAGAMENTO", "EMPENHO", "CONTRATAÇÃO", "CONTRATACAO", "REFERENTE", "VALOR", "PROCESSO"];
      const contemIgnorada = palavrasIgnoradas.some(p => possivelNome.includes(p));
      
      if (!contemIgnorada && possivelNome.length > 2 && possivelNome.length < 50) {
        artistaRaw = normalizarEspacos(possivelNome.replace(/\(.*?\)/g, ""));
      }
    }
  }

  // 2. DICIONÁRIO DE UNIFICAÇÃO (Faxina nos nomes)
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

  let artistaLimpo = artistaRaw.replace(/\s*-\s*$/, "").trim();
  return mapaArtistas[artistaLimpo] || artistaLimpo;
};

/* ======================
   MUNICÍPIO (AGORA COM MÚLTIPLAS CAMADAS DE BUSCA)
====================== */
export const extrairMunicipio = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";
  let obs = obsOriginal.toUpperCase();

  // Limpezas prévias e correções de digitação
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
    .replace(/\bBEL[EÉ]M DE S[AÃ]O FCO\.?\b/g, "CIDADE DE BELÉM DE SÃO FRANCISCO") // Regra de Belém adicionada antes!
    .replace(/CARNAUBEIRA\s+DAPENHA/g, "CARNAUBEIRA DA PENHA")
    .replace(/\s+/g, " ");

  let resultado = "NÃO IDENTIFICADO";

  // TENTATIVA 1: O padrão clássico "CIDADE DE XXXXX"
  const matchCidade = obs.match(/CIDADE\s*(?:DE|DO|DA)?\s+([A-ZÀ-Ú\s\.]{3,40}?)(?:\/|PE\b|-|,|\.|\s+NO\s+DIA|$)/);
  
  if (matchCidade?.[1]) {
    resultado = matchCidade[1].trim();
  } else {
    // TENTATIVA 2: Padrão com preposição (Ex: "EM RECIFE/PE" ou "NO RECIFE - PE")
    const matchEm = obs.match(/\b(?:EM|NO|NA|DE)\s+([A-ZÀ-Ú\s\.]{3,40}?)\s*(?:\/|-)\s*PE\b/);
    if (matchEm?.[1]) {
      resultado = matchEm[1].trim();
    } else {
      // TENTATIVA 3: Padrão colado após uma vírgula (Ex: "..., OLINDA/PE...")
      const matchVirgula = obs.match(/,\s*([A-ZÀ-Ú\s\.]{3,40}?)\s*\/\s*PE\b/);
      if (matchVirgula?.[1]) {
        resultado = matchVirgula[1].trim();
      }
    }
  }

  // Remove sujeiras residuais (ex: tira "/PE" ou " PE" que possa ter vindo junto)
  resultado = resultado.replace(/\/.*$/, "").replace(/\bPE\b$/, "").trim();

  // Mapa final de correções pontuais e nomes oficiais
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
   PROCESSADOR PRINCIPAL
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
          const valorBruto = linha["Total Liquidado"] || "0"; 
          const valor = extrairValor(valorBruto);

          // 1ª TRAVA: IGNORAR ITENS ZERADOS
          if (valor === 0) {
            return acc;
          }

          const obs = linha["Observação do Empenho"] || "";
          const obsLimpa = obs.trim().toUpperCase();

          // 2ª TRAVA: IGNORAR VAZIOS E TEXTOS "LIXO" CONHECIDOS
          const lixosConhecidos = [
            "CARNAUBEIRA DAPENHA", 
            "CARNAUBEIRA DA PENHA", 
            "-", 
            "NÃO IDENTIFICADO"
          ];
          
          if (!obsLimpa || lixosConhecidos.includes(obsLimpa)) {
            return acc;
          }

          const dataEmpenho = linha["Data do Empenho"] || "";

          // Extraímos os dados
          const artista = extrairArtista(obs);
          const municipio = extrairMunicipio(obs);
          const dataEvento = extrairDataEvento(obs);

          // 3ª TRAVA (A DEFINITIVA): REGISTRO INÚTIL
          // Se não tem banda e não tem data, não é um show válido, é só um texto perdido.
          if (artista === "NÃO IDENTIFICADO" && dataEvento === "---") {
            return acc;
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
            ciclo: linha["Detalhamento da Despesa Gerencial"] || "Outros",
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