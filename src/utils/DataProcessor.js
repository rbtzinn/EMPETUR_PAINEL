import Papa from "papaparse";

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

// NOVA FUNÇÃO: Transforma "R$ 25.000,00" em 25000.00 numérico
const extrairValor = (valorString) => {
  if (!valorString) return 0;
  // Remove tudo que não for dígito ou vírgula, e troca a vírgula por ponto
  const limpo = valorString.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(limpo) || 0;
};

/* ======================
   ARTISTA
====================== */
export const extrairArtista = (obsOriginal) => {
  const obs = (obsOriginal || "").toUpperCase();

  const regex1 =
    /(?:APRESENTAÇÃO|ART[IÍ]STIC[A-Z]*|AP\.|APRESENT)(?:.*?)\s+(?:DE|DA|DO|DAS|DOS)\s+(.+?)(?:,|\s+NO\s+|\s+NA\s+|\s+EM\s+|\s+-|$)/;

  const match1 = obs.match(regex1);
  if (match1?.[1]) return normalizarEspacos(match1[1]);

  const regex2 = /^([^,]{3,80})(?:,|$)/;
  const match2 = obs.match(regex2);
  if (match2?.[1]) return normalizarEspacos(match2[1]);

  return "NÃO IDENTIFICADO";
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
   MUNICÍPIO
====================== */
export const extrairMunicipio = (obsOriginal) => {
  let obs = (obsOriginal || "").toUpperCase();

  obs = obs
    .replace(/NACIDADE/g, "CIDADE")
    .replace(/DECATENDE/g, "DE CATENDE")
    .replace(/B\. DE SÃO FRANCISCO/g, "BELEM DE SÃO FRANCISCO")
    .replace(/B DE SÃO FRANCISCO/g, "BELEM DE SÃO FRANCISCO")
    .replace(/JABAOTÃO/g, "JABOATÃO")
    .replace(/JABOATÃO DOS GUARAPES/g, "JABOATÃO DOS GUARARAPES")
    .replace(/JOAQUIMNABUCO/g, "JOAQUIM NABUCO")
    .replace(/RECFE/g, "RECIFE")
    .replace(/\bCDADE\b|\bCIDAD\b/g, "CIDADE")
    .replace(/\s+/g, " ");

  const regex =
    /(?:CIDADE\s*(?:DE|DO|DA)?|\bEM\b)\s+([A-ZÀ-Ú .]+?)(?:\s*\/\s*[A-Z]{2}|\s+PE\b|\s*-|,|$)/;

  const match = obs.match(regex);
  return match?.[1]?.trim() || "NÃO IDENTIFICADO";
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
        const processed = data.map((linha, index) => {
          const obs = linha["Observação do Empenho"] || "";
          const dataEmpenho = linha["Data do Empenho"] || "";
          
          // CAPTURANDO A COLUNA DE VALOR DA PLANILHA DO EFISCO
          const valorBruto = linha["Total Liquidado"] || "0"; 

          return {
            id: `${linha["Número do Empenho"] || "emp"}-${index}`,

            artista: extrairArtista(obs),
            municipio: extrairMunicipio(obs),
            ciclo: linha["Detalhamento da Despesa Gerencial"] || "Outros",

            dataEvento: extrairDataEvento(obs),
            dataEmpenho: dataEmpenho || "---",
            ano: extrairAno(dataEmpenho),
            
            // INJETANDO O VALOR LIMPO NO OBJETO FINAL
            valor: extrairValor(valorBruto), 
          };
        });

        resolve(processed);
      },
    });
  });
};