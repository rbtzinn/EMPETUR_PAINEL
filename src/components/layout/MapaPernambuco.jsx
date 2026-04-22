import React, { useMemo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import {
  normalizarMunicipio,
  canonizarMunicipio,
} from "../../utils/pernambucoUtils";

const GEO_URL = "/maps/pernambuco-municipios.json";
const DEFAULT_CENTER = [-38.0, -8.4];
const DEFAULT_ZOOM = 1;

const chaveMunicipioMapa = (nome = "") => {
  if (!nome) return "";
  const canonico = canonizarMunicipio(nome);
  if (!canonico || canonico === "NÃO IDENTIFICADO") return "";
  return normalizarMunicipio(canonico);
};

const labelMunicipioMapa = (nome = "") => {
  const canonico = canonizarMunicipio(nome);
  return canonico && canonico !== "NÃO IDENTIFICADO" ? canonico : nome;
};

export default function MapaPernambuco({
  dados = [],
  municipioSelecionado = "",
  onSelectMunicipio,
}) {
  const [hover, setHover] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [geographiesData, setGeographiesData] = useState([]);
  const [mapPosition, setMapPosition] = useState({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
  });

  const contagem = useMemo(() => {
    const map = {};

    dados.forEach((d) => {
      const chave =
        d.municipioNormalizado || chaveMunicipioMapa(d.municipio || "");
      if (!chave) return;
      map[chave] = (map[chave] || 0) + 1;
    });

    return map;
  }, [dados]);

  useEffect(() => {
    if (!municipioSelecionado) {
      setMapPosition({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
      return;
    }

    if (geographiesData.length > 0) {
      const geoEncontrada = geographiesData.find(
        (geo) => chaveMunicipioMapa(geo.properties.name) === municipioSelecionado
      );

      if (geoEncontrada) {
        setMapPosition({
          center: geoCentroid(geoEncontrada),
          zoom: 4.5,
        });
      }
    }
  }, [municipioSelecionado, geographiesData]);

  const getFillColor = (nomeMapa) => {
    const chave = chaveMunicipioMapa(nomeMapa);
    const total = contagem[chave] || 0;

    if (municipioSelecionado) {
      return chave === municipioSelecionado
        ? "var(--mapa-alvo)"
        : "var(--mapa-inativo)";
    }

    if (total === 0) return "var(--mapa-0)";
    if (total < 5) return "var(--mapa-1)";
    if (total < 15) return "var(--mapa-2)";
    if (total < 30) return "var(--mapa-3)";
    return "var(--mapa-4)";
  };

  const hoverChave = hover ? chaveMunicipioMapa(hover) : "";
  const hoverLabel = hover ? labelMunicipioMapa(hover) : "";

  return (
    <div
      onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
      className="flex w-full h-full min-h-0 bg-white rounded-xl p-2 relative flex-col items-center overflow-hidden mapa-pe hc-card focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-4"
      role="region"
      aria-label="Mapa interativo de Pernambuco mostrando a densidade de apresentações por município."
      tabIndex={0}
      style={{ boxShadow: "0 1px 4px rgba(11,35,65,0.08), 0 0 0 1px rgba(226,232,240,0.5)" }}
    >
      <div className="sr-only">
        Gráfico do mapa de Pernambuco.
        {municipioSelecionado
          ? `O município atualmente selecionado possui ${
              contagem[municipioSelecionado] || 0
            } apresentações.`
          : "Nenhum município selecionado. O mapa destaca as regiões com maior volume de contratações em tons mais escuros de azul."}
      </div>

      <style>{`
        .mapa-pe {
          --mapa-0: #dddddd;
          --mapa-1: #BAE6FD;
          --mapa-2: #7DD3FC;
          --mapa-3: #38BDF8;
          --mapa-4: #0284C7;
          --mapa-alvo: #00AEEF;
          --mapa-inativo: #E5E7EB;
          --mapa-stroke: #FFFFFF;
          --mapa-stroke-alvo: #0B2341;
        }
        body.contraste-negativo .mapa-pe {
          --mapa-0: #000000;
          --mapa-1: #333300;
          --mapa-2: #666600;
          --mapa-3: #999900;
          --mapa-4: #CCCC00;
          --mapa-alvo: #FFFF00;
          --mapa-inativo: #111111;
          --mapa-stroke: #FFFF00;
          --mapa-stroke-alvo: #FFFFFF;
          background-color: #000000 !important;
          border: 2px solid #FFFF00 !important;
        }
        body.contraste-negativo .hc-legenda { background-color: #000000 !important; border: 1px solid #FFFF00 !important; }
        body.contraste-negativo .hc-text { color: #FFFF00 !important; }
        body.contraste-negativo .hc-tooltip { background-color: #000000 !important; border: 2px solid #FFFF00 !important; }
        body.contraste-negativo .hc-tooltip * { color: #FFFF00 !important; }
      `}</style>

      <div
        className="w-full h-full"
        aria-hidden="true"
        onWheelCapture={(e) => e.stopPropagation()}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 8000 }}
          width={1000}
          height={350}
          className="w-full h-full outline-none"
        >
          <ZoomableGroup
            center={mapPosition.center}
            zoom={mapPosition.zoom}
            disablePanning
            style={{ transition: "transform 1.2s ease-in-out" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) => {
                if (geographiesData.length === 0) {
                  setGeographiesData(geographies);
                }

                return geographies.map((geo) => {
                  const nomeMapa = geo.properties.name;
                  const chave = chaveMunicipioMapa(nomeMapa);
                  const selecionado = municipioSelecionado === chave;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHover(nomeMapa)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() =>
                        onSelectMunicipio(
                          municipioSelecionado === chave ? "" : chave
                        )
                      }
                      style={{
                        default: {
                          fill: getFillColor(nomeMapa),
                          stroke: selecionado
                            ? "var(--mapa-stroke-alvo)"
                            : "var(--mapa-stroke)",
                          strokeWidth: selecionado ? 1 : 0.4,
                          outline: "none",
                          transition: "all 500ms ease",
                        },
                        hover: {
                          fill: "var(--mapa-alvo)",
                          cursor: "pointer",
                          outline: "none",
                          opacity: 1,
                        },
                        pressed: {
                          fill: "var(--mapa-alvo)",
                          outline: "none",
                        },
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <div
        className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md border border-slate-100 flex flex-col gap-1.5 z-10 pointer-events-none min-w-[140px] hc-legenda"
        aria-hidden="true"
      >
        <div className="text-slate-400 font-black uppercase tracking-widest text-[8px] mb-0.5 hc-text">
          Volume de Apresentações
        </div>

        {[
          { bg: "var(--mapa-0)", label: "0" },
          { bg: "var(--mapa-1)", label: "1 A 4" },
          { bg: "var(--mapa-2)", label: "5 A 14" },
          { bg: "var(--mapa-3)", label: "15 A 29" },
          { bg: "var(--mapa-4)", label: "30+" },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-sm border border-slate-200"
                style={{ backgroundColor: item.bg }}
              ></span>
              <span className="text-[#0B2341] font-black text-[9px] hc-text">
                {item.label}
              </span>
            </div>
            <span className="text-slate-400 font-bold text-[8px] ml-2 hc-text">
              SHOWS
            </span>
          </div>
        ))}
      </div>

      {hover && (
        <div
          className="fixed z-[9999] pointer-events-none bg-[#0B2341]/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10 transform -translate-x-1/2 -translate-y-[120%] hc-tooltip transition-opacity duration-200"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="text-[10px] font-black uppercase tracking-widest text-[#00AEEF] mb-1">
            {hoverLabel}
          </div>
          <div className="text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            {contagem[hoverChave] || 0} Apresentações
          </div>
        </div>
      )}
    </div>
  );
}