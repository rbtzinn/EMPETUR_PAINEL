import { useEffect, useMemo, useState } from "react";
import { getCsvUrlsKey, loadDashboardData } from "../utils/DataProcessor";

export function useProcessedData(csvUrls) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const cacheKey = useMemo(() => getCsvUrlsKey(csvUrls), [csvUrls]);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    loadDashboardData(csvUrls)
      .then((rows) => {
        if (!isMounted) return;
        setData(rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar a base do painel:", error);
        if (!isMounted) return;
        setData([]);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [cacheKey, csvUrls]);

  return { data, loading };
}
