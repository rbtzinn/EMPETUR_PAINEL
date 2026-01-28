import Topbar from './components/Topbar';
import Hero from './components/Hero';
import Banner from './components/Banner';
import PanelSection from './components/PanelSection';
import AboutSection from './components/AboutSection';
import GlossarySection from './components/GlossarySection';
import ContactSection from './components/ContactSection';

function App() {
  const lookerShareUrl =
    "https://lookerstudio.google.com/reporting/8dd0220a-1a4f-42b8-96a6-fc591d3bdef2/page/t1bmF";

  const lookerEmbedUrl =
    "https://lookerstudio.google.com/embed/reporting/8dd0220a-1a4f-42b8-96a6-fc591d3bdef2/page/t1bmF";

  const heroImage = "/images/heroImage.jpg";
  const bannerImage = "/images/bannerImage.jpg";

  return (
    <div className="app">
      <Topbar lookerShareUrl={lookerShareUrl} />

      <main>
        <Hero
          heroImage={heroImage}
          onPrimaryClickHref="#painel"
          onSecondaryClickHref="#sobre"
        />

        <Banner image={bannerImage} />

        <PanelSection
          id="painel"
          embedUrl={lookerEmbedUrl}
          shareUrl={lookerShareUrl}
        />

        <AboutSection id="sobre" />

        <GlossarySection id="glossario" />

        <ContactSection id="contato" />
      </main>
    </div>
  );
}

export default App;