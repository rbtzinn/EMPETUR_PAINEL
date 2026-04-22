import { createContext, useContext, useEffect, useMemo, useState } from "react";

const VIEW_MODE_KEY = "empetur_view_mode";

// "bi" | "padrao"
const DEFAULT_MODE = "padrao";

/** Retorna true se a viewport atual é mobile (< 1024px = breakpoint lg do Tailwind). */
function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth < 1024;
}

const ViewModeContext = createContext(null);

export function ViewModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem(VIEW_MODE_KEY);
    return saved === "padrao" || saved === "bi" ? saved : DEFAULT_MODE;
  });

  // Detecta se é mobile em tempo real (resize)
  const [isMobile, setIsMobile] = useState(isMobileViewport);

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileViewport());
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, mode);
  }, [mode]);

  const value = useMemo(() => {
    // Em mobile, sempre forçar modo padrão independente da preferência salva
    const effectiveMode = isMobile ? "padrao" : mode;
    return {
      isBIMode: effectiveMode === "bi",
      isPadraoMode: effectiveMode === "padrao",
      mode: effectiveMode,
      isMobile,
      // setMode só persiste quando não é mobile (evita o usuário travar em BI no mobile)
      setMode: (newMode) => {
        if (!isMobile) setMode(newMode);
      },
      toggleMode: () => {
        if (!isMobile) setMode((current) => (current === "bi" ? "padrao" : "bi"));
      },
    };
  }, [mode, isMobile]);

  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode deve ser usado dentro de ViewModeProvider.");
  }
  return context;
}
