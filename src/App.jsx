import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes da página inicial
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Banner from './components/Banner';
import PanelSection from './components/PanelSection';
import AboutSection from './components/AboutSection';
import GlossarySection from './components/GlossarySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// O novo Painel Avançado que criamos
import PainelCompleto from './pages/PainelCompleto'; // Verifique se o caminho está correto

// 1. Isolamos a sua página principal inteira em um componente "Home"
function Home({ csvUrl, shareUrl }) {
  const heroImage = "/images/heroImage.jpg";
  const bannerImage = "/images/bannerImage.jpg";

  return (
    <div className="app bg-[#F8FAFC]">
      {/* O Topbar agora recebe a rota /dashboard para o botão "Acessar Painel" */}
      <Topbar lookerShareUrl="/dashboard" />

      <main>
        <Hero
          heroImage={heroImage}
          onPrimaryClickHref="#painel"
          onSecondaryClickHref="#sobre"
        />

        <Banner image={bannerImage} />

        {/* O painel resumido (só com a tabela e filtros em cascata) */}
        <PanelSection
          id="painel"
          csvUrl={csvUrl}
          shareUrl={shareUrl}
          lookerShareUrl="/dashboard"
        />

        <AboutSection id="sobre" />
        <GlossarySection id="glossario" />
        <ContactSection id="contato" />
      </main>
      
      <Footer />
    </div>
  );
}

// 2. O App agora apenas gerencia as Rotas (Qual tela mostrar)
function App() {
  // Seus links de dados
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRbCY3xmn0T8KAH-c9jA7-HIUlHHTIEgo0TqjS3-y7mYSACBhpcwrOwief4MCzfG8001m-k6P4u4JyY/pub?output=csv";
  const shareUrl = "https://docs.google.com/spreadsheets/d/1P94FuVBBiScKlty_slbSVOE5N6uO5g3bzD5giKMtT3I/edit";

  return (
    <Router>
      <Routes>
        {/* Rota Padrão: Quando o usuário acessa seusite.com/ */}
        <Route path="/" element={<Home csvUrl={csvUrl} shareUrl={shareUrl} />} />
        
        {/* Rota do Dashboard: Quando o usuário acessa seusite.com/dashboard */}
        <Route path="/dashboard" element={<PainelCompleto csvUrl={csvUrl} />} />
      </Routes>
    </Router>
  );
}

export default App;