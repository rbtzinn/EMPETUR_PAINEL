import Papa from "papaparse";
import { processDashboardRows } from "./dataProcessor/pipeline";
import {
  getCsvUrlsKey,
  normalizeCsvUrls,
  requestCache,
} from "./dataProcessor/requests";

export { getCsvUrlsKey, normalizeCsvUrls } from "./dataProcessor/requests";

const processCsvText = (csv) =>
  new Promise((resolve) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        resolve(processDashboardRows(data));
      },
    });
  });

export const fetchAndProcessData = async (url) => {
  if (!requestCache.has(url)) {
    const request = fetch(url)
      .then((response) => response.text())
      .then(processCsvText)
      .catch((error) => {
        requestCache.delete(url);
        throw error;
      });

    requestCache.set(url, request);
  }

  return requestCache.get(url);
};

export const loadDashboardData = async (csvUrls) => {
  const urls = normalizeCsvUrls(csvUrls);

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        return await fetchAndProcessData(url);
      } catch (error) {
        console.error("Erro ao carregar uma das planilhas:", error);
        return [];
      }
    })
  );

  return results.flat().filter(Boolean);
};
