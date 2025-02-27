
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Normalmente, você usaria uma variável de ambiente para o token
// Para demonstração, precisaríamos substituir este token por um real
const mapboxToken = 'YOUR_MAPBOX_TOKEN';

const StationsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [tokenInput, setTokenInput] = React.useState(mapboxToken);
  const [mapLoaded, setMapLoaded] = React.useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Se não temos um token válido, não carregamos o mapa
    if (tokenInput === 'YOUR_MAPBOX_TOKEN') {
      return;
    }

    mapboxgl.accessToken = tokenInput;
    
    // Inicializar o mapa
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.935242, 40.730610], // Coordenadas de exemplo (NYC)
      zoom: 12
    });

    // Adicionar controles de navegação
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Quando o mapa carregar
    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Aqui adicionaríamos as estações como fonte de dados e camada
      // Em um caso real, esses dados viriam da sua API
      if (map.current) {
        // Adicionar fonte de dados para estações
        map.current.addSource('stations', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: generateRandomStationFeatures(1000)
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        });

        // Adicionar camada para clusters
        map.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'stations',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#DA2128',  // Cor para clusters com até 10 pontos
              10,
              '#f28cb1',  // Cor para clusters com até 30 pontos
              30,
              '#f1f1f1'   // Cor para clusters com mais de 30 pontos
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,           // Raio para clusters com até 10 pontos
              10,
              30,           // Raio para clusters com até 30 pontos
              30,
              40            // Raio para clusters com mais de 30 pontos
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        // Adicionar camada para texto do cluster
        map.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'stations',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-size': 12
          },
          paint: {
            'text-color': '#ffffff'
          }
        });

        // Adicionar camada para pontos individuais
        map.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'stations',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#DA2128',
            'circle-radius': 8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        // Adicionar interatividade ao clicar em um cluster
        map.current.on('click', 'clusters', (e) => {
          const features = map.current?.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          
          if (!features || features.length === 0) return;
          
          const clusterId = features[0].properties?.cluster_id;
          const source = map.current?.getSource('stations') as mapboxgl.GeoJSONSource;
          
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err || !map.current) return;
            
            map.current.easeTo({
              center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
              zoom: zoom
            });
          });
        });

        // Adicionar popup ao clicar em uma estação
        map.current.on('click', 'unclustered-point', (e) => {
          const features = map.current?.queryRenderedFeatures(e.point, {
            layers: ['unclustered-point']
          });
          
          if (!features || features.length === 0) return;
          
          const coordinates = (features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];
          const props = features[0].properties;
          
          // Conteúdo do popup com informações da estação
          const popupContent = `
            <div class="p-2">
              <h3 class="font-bold">${props?.name}</h3>
              <p class="text-sm">${props?.address}</p>
              <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span class="font-medium">Bikes:</span> ${props?.bikes}
                </div>
                <div>
                  <span class="font-medium">Docks:</span> ${props?.docks}
                </div>
              </div>
              <div class="mt-2">
                <span class="px-2 py-1 rounded-full text-xs font-medium ${
                  props?.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }">
                  ${props?.status === 'active' ? 'Active' : 'Maintenance'}
                </span>
              </div>
            </div>
          `;
          
          // Criar e mostrar o popup
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map.current as mapboxgl.Map);
        });

        // Mudar o cursor ao passar sobre elementos clicáveis
        map.current.on('mouseenter', 'clusters', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });
        
        map.current.on('mouseleave', 'clusters', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
        
        map.current.on('mouseenter', 'unclustered-point', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });
        
        map.current.on('mouseleave', 'unclustered-point', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [tokenInput]);

  // Função para gerar estações aleatórias para demonstração
  const generateRandomStationFeatures = (count: number) => {
    const features = [];
    const zones = ["North", "South", "East", "West", "Central"];
    const streets = ["Main St", "Oak Ave", "Park Rd", "River Blvd", "Market St", "Broadway", "Lake Dr"];
    
    // Centro do mapa (NYC como exemplo)
    const centerLng = -73.935242;
    const centerLat = 40.730610;
    
    for (let i = 0; i < count; i++) {
      // Gerar coordenadas em torno do centro
      const lngOffset = (Math.random() - 0.5) * 0.1;
      const latOffset = (Math.random() - 0.5) * 0.1;
      
      const status = Math.random() > 0.85 ? "maintenance" : "active";
      const docks = Math.floor(Math.random() * 15) + 10;
      const bikes = Math.floor(Math.random() * docks);
      
      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [centerLng + lngOffset, centerLat + latOffset]
        },
        properties: {
          id: i + 1,
          name: `Station ${i + 1}`,
          address: `${Math.floor(Math.random() * 999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`,
          bikes,
          docks,
          status,
          zone: zones[Math.floor(Math.random() * zones.length)]
        }
      });
    }
    
    return features;
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden glass-card">
      {tokenInput === 'YOUR_MAPBOX_TOKEN' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/90 z-10">
          <p className="text-neutral-800 mb-4 text-center">
            Please enter your Mapbox access token to display the map. 
            You can get a token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
          <input
            type="text"
            className="w-full max-w-md p-2 border border-neutral-300 rounded-md mb-4"
            placeholder="Enter your Mapbox token"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            onClick={() => setTokenInput(tokenInput)}
          >
            Load Map
          </button>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default StationsMap;
