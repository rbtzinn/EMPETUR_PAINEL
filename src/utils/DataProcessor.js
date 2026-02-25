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

  // 1. REGEX DE CAPTURA MELHORADA
  // Pega o nome após DE/DA/DO e para apenas em conectores de local ou data
  const regexArtista = /(?:APRESENTAÇÃO|ART[IÍ]STIC[A-Z]*|AP\.|APRESENT)(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+NO\s+CARNAVAL|\s+NO\s+SÃO|\s+NO\s+DIA|$)/;

  const match = obs.match(regexArtista);
  let artistaRaw = "NÃO IDENTIFICADO";

  if (match?.[1]) {
    // Remove (CONVITE) e espaços extras
    artistaRaw = normalizarEspacos(match[1].replace(/\(.*?\)/g, ""));
  }

  // 2. DICIONÁRIO DE UNIFICAÇÃO (Faxina nos nomes)
  const mapaArtistas = {
    // Unificação Banda D' Romance
    "BANDA D ROMANCE": "BANDA D' ROMANCE",
    "BANDA D' ROMANCE": "BANDA D' ROMANCE",
    "D' ROMANCE": "BANDA D' ROMANCE",
    "D ROMANCE": "BANDA D' ROMANCE",
    
    // Kebrança (Apenas o nome no singular)
    "BANDA KEBRANÇAS": "BANDA KEBRANÇA",
    "BANDA KEBRANÇA": "BANDA KEBRANÇA",
    
    // Swing Novo (Garantindo espaço)
    "BANDA SWINGNOVO": "BANDA SWING NOVO",
    "BANDA SWING NOVO": "BANDA SWING NOVO",
    "SWING NOVO": "BANDA SWING NOVO",
    
    // Marília Marques (Garantindo acento)
    "MARILIA MARQUES": "MARÍLIA MARQUES",
    "MARÍLIA MARQUES": "MARÍLIA MARQUES",
    
    // Matheus Vini (Corrigindo Vinni)
    "MATHEUS VINNI": "MATHEUS VINI",
    "MATHEUS VINI": "MATHEUS VINI",
    
    // Orquestra Mexe com Tudo (Removendo o traço final)
    "ORQUESTRA DE FREVO MEXE COM TUDO -": "ORQUESTRA DE FREVO MEXE COM TUDO",
    "ORQUESTRA DE FREVO MEXE COM TUDO": "ORQUESTRA DE FREVO MEXE COM TUDO",

    // Fulô de Mandacaru
    "BFULÔ DE MANDACARÚ": "FULÔ DE MANDACARÚ",
    "BFULO DE MANDACARU": "FULÔ DE MANDACARÚ"
  };

  // Limpeza final de qualquer traço ou hifen solto no fim da string
  let artistaLimpo = artistaRaw.replace(/\s*-\s*$/, "").trim();

  return mapaArtistas[artistaLimpo] || artistaLimpo;
};

/* ======================
   MUNICÍPIO (MANTENDO AS REGRAS ANTERIORES)
====================== */
export const extrairMunicipio = (obsOriginal) => {
  if (!obsOriginal) return "NÃO IDENTIFICADO";
  let obs = obsOriginal.toUpperCase();

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
    .replace(/CARNAUBEIRA\s+DAPENHA/g, "CARNAUBEIRA DA PENHA")
    .replace(/\s+/g, " ");

  const regexCidade = /CIDADE\s*(?:DE|DO|DA)?\s+([A-ZÀ-Ú\s\.]{3,40}?)(?:\/|PE|-|,|\.|\s+NO\s+DIA|$)/;
  const match = obs.match(regexCidade);
  let resultado = match?.[1]?.trim() || "NÃO IDENTIFICADO";

  resultado = resultado.replace(/\/.*$/, "").replace(/\bPE\b$/, "").trim();

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
   PROCESSADOR PRINCIPAL (COM TRAVA DE DUPLICADOS)
====================== */
export const fetchAndProcessData = async (url) => {
  const response = await fetch(url);
  const csv = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const setUnico = new Set(); // Para rastrear combinações já vistas
        
        const processed = data.reduce((acc, linha, index) => {
          const obs = linha["Observação do Empenho"] || "";
          const dataEmpenho = linha["Data do Empenho"] || "";
          const valorBruto = linha["Total Liquidado"] || "0"; 

          // Extraímos os dados para criar a chave de comparação
          const artista = extrairArtista(obs);
          const municipio = extrairMunicipio(obs);
          const dataEvento = extrairDataEvento(obs);
          const valor = extrairValor(valorBruto);

          // Criamos a "Chave de Identidade" do registro
          // Se artista, data, cidade e valor forem iguais, a chave será a mesma
          const chaveUnica = `${artista}-${municipio}-${dataEvento}-${valor}`;

          // Se a chave já existe no Set, ignoramos este registro (é um duplicado)
          if (setUnico.has(chaveUnica)) {
            return acc;
          }

          // Se for novo, adicionamos ao Set e ao resultado final
          setUnico.add(chaveUnica);

          acc.push({
            id: `${linha["Número do Empenho"] || "emp"}-${index}`,
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