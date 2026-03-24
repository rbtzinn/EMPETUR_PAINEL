import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Topbar from './components/layout/Topbar';
import Breadcrumb from './components/layout/Breadcrumb';
import Footer from './components/layout/Footer';
import CookieConsent from './components/layout/CookieConsent';
import Acessibilidade from './components/layout/Acessibilidade';
import ModalSugestao from './components/ui/ModalSugestao';
import BotaoSugestaoFlutuante from './components/ui/BotaoSugestaoFlutuante';

// Sections (Landing Page)
import Hero from './components/sections/Hero';
import Banner from './components/sections/Banner';
import PanelSection from './components/sections/PanelSection';
import InternalControlSection from './components/sections/InternalControlSection';
import AboutSection from './components/sections/AboutSection';
import GlossarySection from './components/sections/GlossarySection';
import ContactSection from './components/sections/ContactSection';

// Pages e Utils
import PainelCompleto from './pages/PainelCompleto';
import { fetchAndProcessData } from "./utils/DataProcessor";


function Home({ csvUrl }) {
  const heroImage = "/images/heroImage.jpg";
  const bannerImage = "/images/bannerImage.jpg";

  const [stats, setStats] = useState({
    apresentacoes: 0,
    municipios: 0,
    artistas: 0
  });

  useEffect(() => {
    fetchAndProcessData(csvUrl).then((data) => {
      setStats({
        apresentacoes: data.length,
        municipios: new Set(data.map(d => d.municipio)).size,
        artistas: new Set(data.map(d => d.artista)).size
      });
    });
  }, [csvUrl]);

  return (
    <div className="app bg-[#F8FAFC] min-h-screen">
      <Topbar lookerShareUrl="/dashboard" />
      <Breadcrumb />
      <main>
        <Hero
          heroImage={heroImage}
          apresentacoes={stats.apresentacoes}
          municipios={stats.municipios}
          artistas={stats.artistas}
        />
        <Banner image={bannerImage} />
        <PanelSection id="painel" csvUrl={csvUrl} lookerShareUrl="/dashboard" />
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
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?output=csv";

  const [isSugestaoOpen, setIsSugestaoOpen] = useState(false);

  return (
    <Router>
      <div id="conteudo-site">
        <Routes>
          <Route path="/" element={<Home csvUrl={csvUrl} />} />
          <Route path="/dashboard" element={<PainelCompleto csvUrl={csvUrl} />} />
        </Routes>
      </div>

      {/* COMPONENTES GLOBAIS */}
      <Acessibilidade />
      <CookieConsent />

      {/* MODAL */}
      <ModalSugestao
        isOpen={isSugestaoOpen}
        onClose={() => setIsSugestaoOpen(false)}
      />

      {/* BOTÃO FLUTUANTE SEPARADO */}
      <BotaoSugestaoFlutuante onOpen={() => setIsSugestaoOpen(true)} />
    </Router>
  );
}

export default App;