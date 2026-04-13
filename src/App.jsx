import React, { Suspense, lazy, useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Topbar from "./components/layout/Topbar";
import Breadcrumb from "./components/layout/Breadcrumb";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/layout/CookieConsent";
import Acessibilidade from "./components/Acessibilidade/Acessibilidade";
import ModalSugestao from "./components/ui/ModalSugestao";
import BotaoSugestaoFlutuante from "./components/ui/BotaoSugestaoFlutuante";

import Hero from "./components/sections/Hero";
import Banner from "./components/sections/Banner";
import PanelSection from "./components/sections/PanelSection";
import InternalControlSection from "./components/sections/InternalControlSection";
import AboutSection from "./components/sections/AboutSection";
import GlossarySection from "./components/sections/GlossarySection";
import ContactSection from "./components/sections/ContactSection";

import { useProcessedData } from "./hooks/useProcessedData";
import { useLanguage } from "./contexts/LanguageContext";

const PainelCompleto = lazy(() => import("./pages/PainelCompleto"));

const CSV_URLS = Object.freeze([
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?gid=317201990&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?gid=2040999458&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?gid=1046008747&single=true&output=csv",
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?gid=325255945&single=true&output=csv",
]);

function Home({ csvUrls }) {
  const { data } = useProcessedData(csvUrls);

  const stats = useMemo(
    () => ({
      apresentacoes: data.length,
      municipios: new Set(data.map((item) => item.municipio)).size,
      artistas: new Set(data.map((item) => item.artista)).size,
    }),
    [data]
  );

  return (
    <div className="app min-h-screen bg-[#F8FAFC]">
      <Topbar lookerShareUrl="/dashboard" />
      <Breadcrumb />
      <main>
        <Hero
          apresentacoes={stats.apresentacoes}
          municipios={stats.municipios}
          artistas={stats.artistas}
        />
        <Banner image="/images/bannerImage.jpg" />
        <PanelSection
          id="painel"
          csvUrls={csvUrls}
          lookerShareUrl="/dashboard"
        />
        <InternalControlSection />
        <AboutSection id="sobre" />
        <GlossarySection id="glossario" />
        <ContactSection id="contato" />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [isSugestaoOpen, setIsSugestaoOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <Router>
      <div id="conteudo-site">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
              <span className="text-lg font-black text-[#0B2341]">
                {t.dashboard.loading}
              </span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home csvUrls={CSV_URLS} />} />
            <Route
              path="/dashboard"
              element={<PainelCompleto csvUrls={CSV_URLS} />}
            />
          </Routes>
        </Suspense>
      </div>

      <Acessibilidade />
      <CookieConsent />

      <ModalSugestao
        isOpen={isSugestaoOpen}
        onClose={() => setIsSugestaoOpen(false)}
      />

      <BotaoSugestaoFlutuante onOpen={() => setIsSugestaoOpen(true)} />
    </Router>
  );
}

export default App;
