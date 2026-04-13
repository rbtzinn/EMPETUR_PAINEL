export const calculatePaymentDeadline = (
  dateString,
  { pendingLabel = "A definir", fallbackLabel = "Consulte o Empenho" } = {}
) => {
  if (!dateString) return pendingLabel;

  const dates = String(dateString).match(/(\d{2}\/\d{2}\/\d{4})/g);
  if (!dates?.length) return fallbackLabel;

  const [day, month, year] = dates[dates.length - 1].split("/");
  const date = new Date(year, Number(month) - 1, day);

  if (Number.isNaN(date.getTime())) {
    return fallbackLabel;
  }

  date.setDate(date.getDate() + 30);

  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
  ].join("/");
};

export const maskDocument = (
  documentValue,
  { emptyLabel = "---", unidentifiedLabel = "NÃO IDENTIFICADO" } = {}
) => {
  if (
    !documentValue ||
    documentValue === "N/A" ||
    documentValue === unidentifiedLabel
  ) {
    return emptyLabel;
  }

  const cleanValue = String(documentValue).replace(/[^\w\d]/g, "");

  if (cleanValue.length === 11) {
    return `***.${cleanValue.substring(3, 6)}.${cleanValue.substring(
      6,
      9
    )}-**`;
  }

  if (cleanValue.length === 14) {
    return `${cleanValue.substring(0, 2)}.${cleanValue.substring(
      2,
      5
    )}.${cleanValue.substring(5, 8)}/${cleanValue.substring(
      8,
      12
    )}-${cleanValue.substring(12, 14)}`;
  }

  return documentValue;
};

export const formatCurrency = (value, locale = "pt-BR") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
  }).format(Number(value) || 0);
