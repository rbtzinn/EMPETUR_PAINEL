import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations } from "../i18n/translations";

const LANGUAGE_STORAGE_KEY = "empetur_language";
const DEFAULT_LANGUAGE = "pt";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return translations[savedLanguage] ? savedLanguage : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de LanguageProvider.");
  }

  return context;
}
