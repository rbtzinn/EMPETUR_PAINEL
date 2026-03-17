import React, { useMemo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { normalizarMunicipio } from "../../utils/DataProcessor";

const GEO_URL = "/maps/pernambuco-municipios.json";
const DEFAULT_CENTER = [-38.0, -8.4];
const DEFAULT_ZOOM = 1;

export default function MapaPernambuco({ dados = [], municipioSelecionado, onSelectMunicipio }) {
    const [hover, setHover] = useState(null);
    const [geographiesData, setGeographiesData] = useState([]); 
    const [mapPosition, setMapPosition] = useState({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

    const contagem = useMemo(() => {
        const map = {};
        dados.forEach((d) => {
            if (!d.municipioNormalizado) return;
            map[d.municipioNormalizado] = (map[d.municipioNormalizado] || 0) + 1;
        });
        return map;
    }, [dados]);

    useEffect(() => {
        if (!municipioSelecionado) {
            setMapPosition({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
            return;
        }
        if (geographiesData.length > 0) {
            const geoEncontrada = geographiesData.find(geo => normalizarMunicipio(geo.properties.name) === municipioSelecionado);
            if (geoEncontrada) {
                setMapPosition({ center: geoCentroid(geoEncontrada), zoom: 4.5 });
            }
        }
    }, [municipioSelecionado, geographiesData]);

    const getFillColor = (nome) => {
        const total = contagem[nome] || 0;
        if (municipioSelecionado) return nome === municipioSelecionado ? "var(--mapa-alvo)" : "var(--mapa-inativo)";
        if (total === 0) return "var(--mapa-0)";
        if (total < 5) return "var(--mapa-1)";
        if (total < 15) return "var(--mapa-2)";
        if (total < 30) return "var(--mapa-3)";
        return "var(--mapa-4)";
    };

    return (
        <div className="hidden lg:flex w-full h-[300px] mb-8 bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-3 relative flex-col items-center overflow-hidden mapa-pe hc-card">
            
            <style>{`
              .mapa-pe {
                 --mapa-0: #F1F5F9; --mapa-1: #BAE6FD; --mapa-2: #7DD3FC; --mapa-3: #38BDF8; --mapa-4: #0284C7;
                 --mapa-alvo: #00AEEF; --mapa-inativo: #E5E7EB; --mapa-stroke: #FFFFFF; --mapa-stroke-alvo: #0B2341;
              }
              body.contraste-negativo .mapa-pe {
                 --mapa-0: #000000; --mapa-1: #333300; --mapa-2: #666600; --mapa-3: #999900; --mapa-4: #CCCC00;
                 --mapa-alvo: #FFFF00; --mapa-inativo: #111111; --mapa-stroke: #FFFF00; --mapa-stroke-alvo: #FFFFFF;
                 background-color: #000000 !important; border: 2px solid #FFFF00 !important;
              }
              body.contraste-negativo .hc-legenda { background-color: #000000 !important; border: 1px solid #FFFF00 !important; }
              body.contraste-negativo .hc-text { color: #FFFF00 !important; }
            `}</style>

            <div className="w-full h-full" onWheelCapture={(e) => e.stopPropagation()}>
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: 8000 }} width={1000} height={350} className="w-full h-full outline-none">
                    <ZoomableGroup center={mapPosition.center} zoom={mapPosition.zoom} disablePanning style={{ transition: "transform 1.2s ease-in-out" }}>
                        <Geographies geography={GEO_URL}>
                            {({ geographies }) => {
                                if (geographiesData.length === 0) setGeographiesData(geographies);
                                return geographies.map((geo) => {
                                    const nomeNormalizado = normalizarMunicipio(geo.properties.name);
                                    return (
                                        <Geography
                                            key={geo.rsmKey} geography={geo}
                                            onMouseEnter={() => setHover(geo.properties.name)} onMouseLeave={() => setHover(null)}
                                            onClick={() => onSelectMunicipio(municipioSelecionado === nomeNormalizado ? "" : nomeNormalizado)}
                                            style={{
                                                default: { fill: getFillColor(nomeNormalizado), stroke: municipioSelecionado === nomeNormalizado ? "var(--mapa-stroke-alvo)" : "var(--mapa-stroke)", strokeWidth: municipioSelecionado === nomeNormalizado ? 1 : 0.4, outline: "none", transition: "all 500ms ease" },
                                                hover: { fill: "var(--mapa-alvo)", cursor: "pointer", outline: "none", opacity: 1 },
                                                pressed: { fill: "var(--mapa-alvo)", outline: "none" }
                                            }}
                                        />
                                    );
                                });
                            }}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>

            {/* LEGENDA */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col gap-3 z-10 pointer-events-none min-w-[200px] hc-legenda">
                <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1 hc-text">Volume de Apresentações</div>
                {[
                    { bg: "var(--mapa-0)", label: "0" }, { bg: "var(--mapa-1)", label: "1 A 4" },
                    { bg: "var(--mapa-2)", label: "5 A 14" }, { bg: "var(--mapa-3)", label: "15 A 29" },
                    { bg: "var(--mapa-4)", label: "30+" },
                ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <span className="w-3.5 h-3.5 rounded-full shadow-sm border border-slate-200" style={{ backgroundColor: item.bg }}></span>
                            <span className="text-[#0B2341] font-black text-xs hc-text">{item.label}</span>
                        </div>
                        <span className="text-slate-400 font-bold text-[10px] ml-4 hc-text">SHOWS</span>
                    </div>
                ))}
            </div>
        </div>
    );
}