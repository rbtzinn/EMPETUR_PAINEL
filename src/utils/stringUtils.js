export const normalizarEspacos = (txt = "") =>
  txt.replace(/\s+/g, " ").trim();

export const extrairAno = (texto = "") => {
  if (!texto) return "---";
  const match = texto.match(/(19|20)\d{2}/);
  return match ? match[0] : "---";
};

export const extrairValor = (valorString) => {
  if (!valorString) return 0;
  const limpo = valorString.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(limpo) || 0;
};

export const normalizarMunicipio = (txt = "") =>
  txt
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();

// Formatação de Título (Camel Case inteligente para eventos)
export const formatarTituloEvento = (texto = "") => {
  if (!texto) return "";
  let formatado = texto.toLowerCase().split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Mantém conectivos em minúsculo
  const conectivos = ["De", "Da", "Do", "Das", "Dos", "E", "Em", "Na", "No", "Para"];
  conectivos.forEach(c => {
    const regex = new RegExp(`\\s${c}\\s`, 'ig');
    formatado = formatado.replace(regex, match => match.toLowerCase());
  });
  return formatado;
};