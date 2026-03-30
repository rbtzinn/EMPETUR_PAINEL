export const normalizarMunicipio = (txt = "") =>
  txt
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();

export const normalizarEspacos = (texto = "") => 
  texto.replace(/\s+/g, " ").trim();

export const extrairValor = (valorStr) => {
  if (!valorStr) return 0;
  const limpo = valorStr.replace(/[^\d,.-]/g, "").replace(",", ".");
  return parseFloat(limpo) || 0;
};

export const extrairAno = (dataStr) => {
  if (!dataStr) return "---";
  const match = dataStr.match(/\d{4}/);
  return match ? match[0] : "---";
};