import React, { useMemo, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { normalizarMunicipio } from "../utils/DataProcessor";

const GEO_URL = "/maps/pernambuco-municipios.json";

// Ajustado para o centro geográfico exato de Pernambuco
const DEFAULT_CENTER = [-38.0, -8.4];
const DEFAULT_ZOOM = 1;

export default function MapaPernambuco({
    dados = [],
    municipioSelecionado,
    onSelectMunicipio
}) {
    const [hover, setHover] = useState(null);
    const [mapPosition, setMapPosition] = useState({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM
    });

    const contagem = useMemo(() => {
        const map = {};
        dados.forEach((d) => {
            if (!d.municipioNormalizado) return;
            map[d.municipioNormalizado] =
                (map[d.municipioNormalizado] || 0) + 1;
        });
        return map;
    }, [dados]);

    const getFillColor = (nome) => {
        const total = contagem[nome] || 0;

        if (municipioSelecionado) {
            return nome === municipioSelecionado ? "#00AEEF" : "#E5E7EB";
        }

        if (total === 0) return "#F1F5F9";
        if (total < 5) return "#BAE6FD";
        if (total < 15) return "#7DD3FC";
        if (total < 30) return "#38BDF8";
        return "#0284C7";
    };

    const handleSelect = (geo, nomeNormalizado) => {
        // Se clicar no mesmo município → reset
        if (municipioSelecionado === nomeNormalizado) {
            onSelectMunicipio("");
            setMapPosition({
                center: DEFAULT_CENTER,
                zoom: DEFAULT_ZOOM
            });
            return;
        }

        const centroid = geoCentroid(geo);

        onSelectMunicipio(nomeNormalizado);
        setMapPosition({
            center: centroid,
            zoom: 4.5 // <-- Zoom bem mais forte (efeito lupa)
        });
    };

    return (
        <div className="w-full h-[300px] mb-8 bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-3 relative flex flex-col items-center overflow-hidden">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 8000 // Aumentamos bastante a escala para o mapa preencher a tela
                }}
                width={1000} // Força o SVG a ser horizontal
                height={300} // Força o SVG a ser curtinho em altura
                className="w-full h-full outline-none"
            >
                <ZoomableGroup
                    center={mapPosition.center}
                    zoom={mapPosition.zoom}
                    // É ESTA LINHA AQUI QUE FAZ A MÁGICA DO ZOOM SUAVE:
                    style={{ transition: "transform 1.2s ease-in-out" }}
                >

                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const nomeOriginal = geo.properties.name;
                                const nomeNormalizado = normalizarMunicipio(nomeOriginal);

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => setHover(nomeOriginal)}
                                        onMouseLeave={() => setHover(null)}
                                        onClick={() => handleSelect(geo, nomeNormalizado)}
                                        style={{
                                            default: {
                                                fill: getFillColor(nomeNormalizado),
                                                // Destaca a borda se estiver selecionado
                                                stroke: municipioSelecionado === nomeNormalizado ? "#0B2341" : "#FFFFFF",
                                                strokeWidth: municipioSelecionado === nomeNormalizado ? 1 : 0.4,
                                                outline: "none",
                                                // EFEITO LUPA: Se tem algum selecionado e NÃO for este, fica quase transparente
                                                opacity: municipioSelecionado && municipioSelecionado !== nomeNormalizado ? 0.3 : 1,
                                                // Deixa a troca de cores e opacidade suave
                                                transition: "all 500ms ease-in-out"
                                            },
                                            hover: {
                                                fill: "#00AEEF",
                                                cursor: "pointer",
                                                outline: "none",
                                                opacity: 1,
                                                transition: "all 200ms ease"
                                            },
                                            pressed: {
                                                fill: "#0369A1",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            {/* LEGENDA DE CORES */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col gap-3 z-10 pointer-events-none min-w-[200px]">

                <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">
                    Volume de Apresentações
                </div>

                {/* Mapeamento dinâmico para o código ficar mais limpo */}
                {[
                    { cor: "#F1F5F9", label: "0" },
                    { cor: "#BAE6FD", label: "1 A 4" },
                    { cor: "#7DD3FC", label: "5 A 14" },
                    { cor: "#38BDF8", label: "15 A 29" },
                    { cor: "#0284C7", label: "30+" },
                ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: item.cor }}></span>
                            <span className="text-[#0B2341] font-black text-xs">{item.label}</span>
                        </div>
                        <span className="text-slate-400 font-bold text-[10px] ml-4">SHOWS</span>
                    </div>
                ))}

                {/* Indicador de Município Selecionado */}
                {municipioSelecionado && (
                    <div className="flex items-center justify-between w-full mt-2 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#0B2341] animate-pulse shadow-sm"></span>
                            <span className="text-[#0B2341] font-black text-xs uppercase truncate max-w-[100px]" title={municipioSelecionado}>
                                {municipioSelecionado}
                            </span>
                        </div>
                        <span className="text-slate-400 font-bold text-[10px]">ALVO</span>
                    </div>
                )}
            </div>

            {/* TOOLTIP DE HOVER */}
            {hover && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0B2341] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-2xl z-20 pointer-events-none">
                    {hover}
                </div>
            )}
        </div>
    );
}