import React, { useMemo } from "react";
import { MapPin, RefreshCw, Filter } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useViewMode } from "../../../contexts/ViewModeContext";
import {
  canonizarMunicipio,
  normalizarMunicipio,
} from "../../../utils/pernambucoUtils";

import MapaPernambuco from "../../layout/MapaPernambuco";
import GraficoBarrasNativo from "../../charts/GraficoBarrasNativo";
import TopArtistasCard from "../../charts/TopArtistasCard";
import TabelaHistorico from "../../ui/TabelaHistorico";

const shadow =
  "0 2px 8px rgba(11,35,65,0.08), 0 0 0 1px rgba(226,232,240,0.5)";

const Card = ({ className = "", children, ...props }) => (
  <div
    className={`hc-padrao-card rounded-2xl bg-white ${className}`}
    style={{ boxShadow: shadow }}
    {...props}
  >
    {children}
  </div>
);

function RankingRow({ index, nome, total, max, selecionado, onClick }) {
  const pct = max === 0 ? 0 : (total / max) * 100;

  return (
    <button
      type="button"
      onClick={() => onClick(nome)}
      className={`hc-padrao-ranking-row group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-all hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] ${
        selecionado ? "bg-blue-50 ring-1 ring-[#00AEEF] hc-padrao-ranking-row-active" : ""
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-black ${
          index <= 3 ? "bg-[#0B2341] text-white" : "bg-slate-100 text-slate-500"
        }`}
      >
        {index}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-[11px] font-bold ${
            selecionado ? "text-[#00AEEF]" : "text-[#0B2341] group-hover:text-[#00AEEF]"
          }`}
        >
          {nome}
        </span>
        <div className="hc-padrao-ranking-track mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`hc-padrao-ranking-fill h-full rounded-full transition-all duration-700 ${
              selecionado ? "bg-[#00AEEF]" : "bg-[#0B2341]/40 group-hover:bg-[#00AEEF]/60"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </span>

      <span
        className={`shrink-0 rounded-lg px-2 py-0.5 text-[9px] font-black ${
          selecionado ? "bg-blue-100 text-[#00AEEF]" : "bg-slate-100 text-slate-500"
        }`}
      >
        {total}
      </span>
    </button>
  );
}

export default function PainelPadraoLayout({
  filtrados,
  filtros,
  setFiltros,
  temFiltroAtivo,
  registrosPorCiclo,
  registrosPorMunicipio,
  registrosPorAno,
  dataUltimaAtualizacao,
}) {
  const { t } = useLanguage();
  const { isMobile } = useViewMode();
  const numberLocale = t.locale || "pt-BR";

  const totalApresentacoes = filtrados.length;
  const totalArtistas = new Set(filtrados.map((item) => item.artista)).size;
  const totalMunicipios = new Set(filtrados.map((item) => item.municipio)).size;

  const topMunicipio = useMemo(() => {
    if (!registrosPorMunicipio.length) return { nome: "-", total: 0 };
    return registrosPorMunicipio[0];
  }, [registrosPorMunicipio]);

  const maxMunicipio = registrosPorMunicipio[0]?.total || 1;

  const normalizarParaFiltro = (nome = "") => {
    if (!nome) return "";
    const canonico = canonizarMunicipio(nome);
    if (!canonico || canonico === "NAO IDENTIFICADO") return "";
    return normalizarMunicipio(canonico);
  };

  const toggleCiclo = (value) =>
    setFiltros((current) => ({
      ...current,
      ciclo: value === current.ciclo ? "" : value,
    }));

  const toggleAno = (value) =>
    setFiltros((current) => ({
      ...current,
      ano: value === current.ano ? "" : value,
    }));

  const toggleMunicipio = (nome) =>
    setFiltros((current) => ({
      ...current,
      municipio:
        current.municipio === normalizarParaFiltro(nome)
          ? ""
          : normalizarParaFiltro(nome),
    }));

  const filtrosAtivosTexto = useMemo(() => {
    const fieldLabels = t.dashboard.topbar.fields;
    const ativos = Object.entries(filtros)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => `${fieldLabels[key] || key}: ${value}`);

    return ativos.length === 0 ? t.dashboard.filters.none : ativos.join(" | ");
  }, [filtros, t]);

  return (
    <div
      className="hc-padrao-surface bi-scroll flex-1 overflow-y-auto bg-[#F3F7FA]"
      aria-label={t.dashboard.viewMode.defaultPanelAria}
    >
      <style>{`
        body.contraste-negativo .hc-padrao-surface,
        body.contraste-negativo .hc-padrao-page {
          background: #000 !important;
        }
        body.contraste-negativo .hc-padrao-card {
          background: #000 !important;
          border: 1px solid #ffea00 !important;
          box-shadow: none !important;
        }
        body.contraste-negativo .hc-padrao-card-title,
        body.contraste-negativo .hc-padrao-card-kicker,
        body.contraste-negativo .hc-padrao-hero-title {
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-padrao-card p,
        body.contraste-negativo .hc-padrao-card span {
          color: #fff !important;
        }
        body.contraste-negativo .hc-padrao-hero {
          background: #000 !important;
          border: 1px solid #ffea00 !important;
          box-shadow: none !important;
        }
        body.contraste-negativo .hc-padrao-hero .pointer-events-none {
          display: none !important;
        }
        body.contraste-negativo .hc-padrao-hero-badge,
        body.contraste-negativo .hc-padrao-map-chip {
          background: #111 !important;
          border: 1px solid #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-padrao-hero-title {
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-padrao-hero-text,
        body.contraste-negativo .hc-padrao-hero-meta,
        body.contraste-negativo .hc-padrao-hero-filters {
          color: #fff !important;
        }
        body.contraste-negativo .hc-padrao-kpi {
          background: #000 !important;
          border: 1px solid #ffea00 !important;
        }
        body.contraste-negativo .hc-padrao-kpi-label {
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-padrao-kpi-value {
          color: #fff !important;
        }
        body.contraste-negativo .hc-padrao-clear-btn {
          background: #111 !important;
          border: 1px solid #ffea00 !important;
          color: #ffea00 !important;
        }
        body.contraste-negativo .hc-padrao-filterbar {
          border-top-color: #ffea00 !important;
        }
        body.contraste-negativo .hc-padrao-ranking-row {
          background: transparent !important;
        }
        body.contraste-negativo .hc-padrao-ranking-row:hover,
        body.contraste-negativo .hc-padrao-ranking-row-active {
          background: #111 !important;
        }
        body.contraste-negativo .hc-padrao-ranking-track {
          background: #333 !important;
        }
        body.contraste-negativo .hc-padrao-ranking-fill {
          background: #ffea00 !important;
        }
      `}</style>

      <div className="hc-padrao-page mx-auto max-w-[1440px] space-y-4 px-4 pb-10 pt-4 sm:px-5 sm:pt-6 lg:pt-4">
        <div
          className="hc-padrao-hero relative overflow-hidden rounded-[1.75rem] px-4 py-5 sm:px-6"
          style={{
            background: "linear-gradient(135deg, #0B2341 0%, #0d2d52 60%, #093070 100%)",
            boxShadow: "0 8px 32px rgba(11,35,65,0.25)",
          }}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#00AEEF]/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-64 rounded-full bg-[#00AEEF]/5 blur-2xl" />

          <div className="relative mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 w-full flex-1 text-center sm:text-left">
              <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start">
                <span className="hc-padrao-hero-badge inline-flex max-w-full rounded-full border border-[#00AEEF]/30 bg-[#00AEEF]/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#00AEEF] sm:text-[8px]">
                  {t.dashboard.header.badge}
                </span>
              </div>

              <h1 className="hc-padrao-hero-title w-full text-center text-[2rem] font-black leading-[1.05] tracking-tight text-white sm:mx-0 sm:text-left sm:text-lg sm:leading-snug">
                {t.dashboard.header.title}
              </h1>

              <p className="hc-padrao-hero-text mt-3 w-full max-w-none text-center text-[13px] font-medium leading-6 text-slate-300 sm:mt-1 sm:max-w-[56ch] sm:text-left sm:text-[10px] sm:leading-normal sm:text-slate-400">
                {t.dashboard.header.description}
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col items-center gap-2 text-center lg:w-auto lg:items-end lg:text-right">
              <span className="hc-padrao-hero-meta w-full text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:text-[8px] sm:tracking-widest sm:text-slate-500">
                {t.dashboard.header.lastUpdate}: {dataUltimaAtualizacao}
              </span>

              {temFiltroAtivo && (
                <button
                  type="button"
                  onClick={() =>
                    setFiltros((current) => ({
                      ...current,
                      municipio: "",
                      ciclo: "",
                      ano: "",
                      artista: "",
                      dataEvento: "",
                      nomeCredor: "",
                    }))
                  }
                  className="hc-padrao-clear-btn flex min-h-10 items-center gap-1 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-2 text-[11px] font-bold text-red-300 transition-all hover:bg-red-500/20 sm:min-h-0 sm:px-2 sm:py-1 sm:text-[9px] sm:text-red-400"
                >
                  <RefreshCw className="h-2.5 w-2.5" /> {t.common.clearFilters}
                </button>
              )}
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: t.dashboard.kpi.presentations,
                valor: totalApresentacoes.toLocaleString(numberLocale),
                accent: false,
              },
              {
                label: t.dashboard.kpi.artists,
                valor: totalArtistas.toLocaleString(numberLocale),
                accent: false,
              },
              {
                label: t.dashboard.kpi.municipalities,
                valor: totalMunicipios.toLocaleString(numberLocale),
                accent: false,
              },
              {
                label: t.dashboard.kpi.topDestinationCard,
                valor: topMunicipio.nome,
                accent: true,
              },
            ].map(({ label, valor, accent }) => (
              <div
                key={label}
                className="hc-padrao-kpi flex min-h-[108px] flex-col justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm sm:min-h-0 sm:rounded-xl sm:py-2.5"
              >
                <span className="hc-padrao-kpi-label text-[10px] leading-4 font-black uppercase tracking-[0.14em] text-slate-300 sm:text-[8px] sm:tracking-widest sm:text-slate-400">
                  {label}
                </span>
                <span
                  className={`hc-padrao-kpi-value mt-2 block text-[1.9rem] font-black leading-none tracking-tight sm:mt-1.5 sm:truncate sm:text-xl ${
                    accent ? "text-[#00AEEF]" : "text-white"
                  }`}
                >
                  {valor}
                </span>
              </div>
            ))}
          </div>

          <div className="hc-padrao-filterbar relative mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-white/5 pt-3 sm:justify-start">
            <Filter className="h-2.5 w-2.5 shrink-0 text-slate-500" strokeWidth={2.5} />
            <span className="hc-padrao-hero-filters text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:text-[8px] sm:tracking-widest sm:text-slate-500">
              {t.dashboard.filters.active}
            </span>
            <span className="hc-padrao-hero-filters text-[11px] leading-5 text-slate-300 sm:text-[8px] sm:text-slate-400">
              {filtrosAtivosTexto}
            </span>
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-4 ${isMobile ? "" : "lg:grid-cols-[1fr_320px]"}`}>
          <Card className={`overflow-hidden p-0 ${isMobile ? "hidden" : ""}`}>
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <div>
                <p className="hc-padrao-card-kicker text-[8px] font-black uppercase tracking-widest text-slate-400">
                  {t.dashboard.standardLayout.mapKicker}
                </p>
                <h2 className="hc-padrao-card-title text-sm font-black text-[#0B2341]">
                  {t.dashboard.standardLayout.mapTitle}
                </h2>
                <p className="hc-padrao-card-text text-[9px] text-slate-400">
                  {t.dashboard.standardLayout.mapDescription}
                </p>
              </div>

              <div className="hc-padrao-map-chip flex items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5">
                <MapPin className="h-3 w-3 text-[#00AEEF]" strokeWidth={2.5} />
                <span className="text-[10px] font-black text-[#0B2341]">
                  {totalMunicipios.toLocaleString(numberLocale)}
                </span>
                <span className="text-[8px] text-slate-400">
                  {t.dashboard.standardLayout.mappedMunicipalities}
                </span>
              </div>
            </div>

            <div className="h-[300px]">
              <MapaPernambuco
                dados={filtrados}
                municipioSelecionado={filtros.municipio || ""}
                onSelectMunicipio={(nomeNormalizado) =>
                  setFiltros((current) => ({
                    ...current,
                    municipio: nomeNormalizado || "",
                  }))
                }
              />
            </div>
          </Card>

          <Card className="flex flex-col overflow-hidden p-0">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="hc-padrao-card-kicker text-[8px] font-black uppercase tracking-widest text-slate-400">
                {t.dashboard.standardLayout.rankingKicker}
              </p>
              <h2 className="hc-padrao-card-title text-sm font-black text-[#0B2341]">
                {t.dashboard.standardLayout.rankingTitle}
              </h2>
              <p className="hc-padrao-card-text text-[9px] text-slate-400">
                {t.dashboard.standardLayout.rankingDescription}
              </p>
            </div>

            <div className="bi-scroll flex-1 overflow-y-auto px-3 py-2">
              {registrosPorMunicipio.slice(0, 12).map((item, index) => (
                <RankingRow
                  key={item.nome}
                  index={index + 1}
                  nome={item.nome}
                  total={item.total}
                  max={maxMunicipio}
                  selecionado={filtros.municipio === normalizarParaFiltro(item.nome)}
                  onClick={toggleMunicipio}
                />
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="flex h-72 flex-col overflow-hidden p-0">
            <div className="border-b border-slate-100 px-5 py-3">
              <p className="hc-padrao-card-kicker text-[8px] font-black uppercase tracking-widest text-slate-400">
                {t.dashboard.standardLayout.cycleKicker}
              </p>
              <h2 className="hc-padrao-card-title text-base font-black text-[#0B2341]">
                {t.dashboard.charts.cycleTitle}
              </h2>
              <p className="hc-padrao-card-text text-[9px] text-slate-400">
                {t.dashboard.standardLayout.cycleDescription}
              </p>
            </div>

            <div className="flex-1 min-h-0 p-3">
              <GraficoBarrasNativo
                data={registrosPorCiclo}
                indice="ciclo"
                formatador={(num) => `${num} ${t.common.shows}`}
                onClick={toggleCiclo}
                filtroAtivo={filtros.ciclo}
              />
            </div>
          </Card>

          <Card className="flex h-72 flex-col overflow-hidden p-0">
            <div className="border-b border-slate-100 px-5 py-3">
              <p className="hc-padrao-card-kicker text-[8px] font-black uppercase tracking-widest text-slate-400">
                {t.dashboard.standardLayout.historyKicker}
              </p>
              <h2 className="hc-padrao-card-title text-base font-black text-[#0B2341]">
                {t.dashboard.charts.yearTitle}
              </h2>
              <p className="hc-padrao-card-text text-[9px] text-slate-400">
                {t.dashboard.standardLayout.historyDescription}
              </p>
            </div>

            <div className="flex-1 min-h-0 p-3">
              <GraficoBarrasNativo
                data={registrosPorAno}
                indice="ano"
                formatador={(num) => `${num} ${t.common.shows}`}
                onClick={toggleAno}
                filtroAtivo={filtros.ano}
              />
            </div>
          </Card>

          <Card className="flex h-72 flex-col overflow-hidden p-0">
            <TopArtistasCard filtrados={filtrados} />
          </Card>
        </div>

        <Card
          className="overflow-hidden p-0"
          style={{
            maxHeight: isMobile ? "920px" : "500px",
            minHeight: isMobile ? "920px" : undefined,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabelaHistorico
            filtrados={filtrados}
            setFiltros={setFiltros}
            temFiltroAtivo={temFiltroAtivo}
          />
        </Card>
      </div>
    </div>
  );
}
