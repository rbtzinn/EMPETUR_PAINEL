import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes da página inicial
import Topbar from './components/Topbar';
import Breadcrumb from './components/Breadcrumb'; // 🔴 IMPORT ADICIONADO AQUI
import Hero from './components/Hero';
import Banner from './components/Banner';
import PanelSection from './components/PanelSection';
import AboutSection from './components/AboutSection';
import GlossarySection from './components/GlossarySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Páginas e componentes extras
import PainelCompleto from './pages/PainelCompleto';
import InternalControlSection from './components/InternalControlSection';
import Acessibilidade from './components/Acessibilidade';
import { fetchAndProcessData } from "./utils/DataProcessor";
import CookieConsent from './components/CookieConsent';

function Home({ csvUrl, shareUrl }) {
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
      
      {/* 🔴 BREADCRUMB COLOCADO AQUI, LOGO ABAIXO DA TOPBAR */}
      <Breadcrumb />

      <main>
        <Hero
          heroImage={heroImage}
          apresentacoes={stats.apresentacoes}
          municipios={stats.municipios}
          artistas={stats.artistas}
          onPrimaryClickHref="#painel"
          onSecondaryClickHref="#sobre"
        />
        <Banner image={bannerImage} />
        
        <PanelSection
          id="painel"
          csvUrl={csvUrl}
          shareUrl={shareUrl}
          lookerShareUrl="/dashboard"
        />
        <InternalControlSection />
        <AboutSection id="sobre" />
        <GlossarySection id="glossario" />
        <ContactSection id="contato" />
        <CookieConsent />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?output=csv";

  const shareUrl =
    "https://docs.google.com/spreadsheets/d/1P94FuVBBiScKlty_slbSVOE5N6uO5g3bzD5giKMtT3I/edit";

  return (
    <Router>
      <div id="conteudo-site">
        <Routes>
          <Route path="/" element={<Home csvUrl={csvUrl} shareUrl={shareUrl} />} />
          <Route path="/dashboard" element={<PainelCompleto csvUrl={csvUrl} />} />
        </Routes>
      </div>

      <Acessibilidade />
    </Router>
  );
}

export default App;