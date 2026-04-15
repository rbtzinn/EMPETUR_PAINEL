export const requestCache = new Map();

export const normalizeCsvUrls = (csvUrls) =>
  (Array.isArray(csvUrls) ? csvUrls : [csvUrls]).filter(Boolean);

export const getCsvUrlsKey = (csvUrls) => normalizeCsvUrls(csvUrls).join("|");
