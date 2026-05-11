import { useEffect, useMemo, useState } from "react";
import {
  getDashboardLastUpdateDate,
  loadDashboardUpdateDate,
} from "../utils/dashboardUpdateDate";

export function useDashboardUpdateDate(updateDateUrl, rows = []) {
  const fallbackDate = useMemo(() => getDashboardLastUpdateDate(rows), [rows]);
  const [sheetDate, setSheetDate] = useState("");

  useEffect(() => {
    if (!updateDateUrl) {
      setSheetDate("");
      return undefined;
    }

    let isMounted = true;

    loadDashboardUpdateDate(updateDateUrl)
      .then((date) => {
        if (isMounted) setSheetDate(date);
      })
      .catch((error) => {
        console.error("Erro ao carregar a data de atualizacao:", error);
        if (isMounted) setSheetDate("");
      });

    return () => {
      isMounted = false;
    };
  }, [updateDateUrl]);

  return sheetDate || fallbackDate;
}
