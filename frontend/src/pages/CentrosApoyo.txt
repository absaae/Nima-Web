import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// para centrar el mapa cuando se selecciona un centro
const MapController = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

const CentrosApoyo = () => {
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mapCenter, setMapCenter] = useState([19.4326, -99.1332]); // Centro de CDMX

  const publicoIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#10b981" stroke="white" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="white"></circle>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const privadoIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="white"></circle>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const centros = [
    {
      id: 1,
      nombre: "LUNAS - Centro de Apoyo Integral",
      tipo: "publico",
      direccion: "Av. Revolución 1234, Col. San Ángel",
      telefono: "55-1234-5678",
      horario: "Lun-Vie 9:00-18:00",
      servicios: ["Asesoría Legal", "Apoyo Psicológico", "Refugio Temporal"],
      lat: 19.3467,
      lng: -99.1895,
      delegacion: "Álvaro Obregón"
    },
    {
      id: 2,
      nombre: "Centro de Justicia para las Mujeres",
      tipo: "publico",
      direccion: "Calle Hidalgo 567, Col. Centro",
      telefono: "55-2345-6789",
      horario: "24 horas",
      servicios: ["Atención Médica", "Asesoría Legal", "Denuncia"],
      lat: 19.4342,
      lng: -99.1376,
      delegacion: "Cuauhtémoc"
    },
    {
      id: 3,
      nombre: "Fundación Origen",
      tipo: "privado",
      direccion: "Blvd. Adolfo López Mateos 890, Col. Las Águilas",
      telefono: "55-3456-7890",
      horario: "Lun-Sab 10:00-20:00",
      servicios: ["Terapia Individual", "Grupos de Apoyo"],
      lat: 19.3544,
      lng: -99.2245,
      delegacion: "Álvaro Obregón"
    },
    {
      id: 4,
      nombre: "Instituto de la Mujer CDMX",
      tipo: "publico",
      direccion: "Tacuba 76, Col. Centro",
      telefono: "55-4567-8901",
      horario: "Lun-Vie 9:00-17:00",
      servicios: ["Orientación", "Capacitación", "Asesoría Legal"],
      lat: 19.4355,
      lng: -99.1425,
      delegacion: "Cuauhtémoc"
    },
    {
      id: 5,
      nombre: "Casa de la Mujer Indígena",
      tipo: "publico",
      direccion: "Calle Moneda 16, Col. Centro Histórico",
      telefono: "55-5678-9012",
      horario: "Lun-Vie 8:00-16:00",
      servicios: ["Traducción", "Asesoría Cultural", "Apoyo Legal"],
      lat: 19.4326,
      lng: -99.1311,
      delegacion: "Cuauhtémoc"
    },
    {
      id: 6,
      nombre: "Centro Comunitario Esperanza",
      tipo: "privado",
      direccion: "Av. Insurgentes Sur 1500, Col. San José Insurgentes",
      telefono: "55-6789-0123",
      horario: "Lun-Vie 10:00-19:00",
      servicios: ["Talleres", "Apoyo Psicológico", "Asesoría"],
      lat: 19.3745,
      lng: -99.1723,
      delegacion: "Benito Juárez"
    },
    {
      id: 7,
      nombre: "Red Nacional de Refugios",
      tipo: "privado",
      direccion: "Av. Chapultepec 234, Col. Roma",
      telefono: "800-822-4460",
      horario: "24 horas",
      servicios: ["Refugio", "Atención de Emergencia", "Asesoría"],
      lat: 19.4194,
      lng: -99.1638,
      delegacion: "Cuauhtémoc"
    },
    {
      id: 8,
      nombre: "CAVI - Centro de Atención a la Violencia",
      tipo: "publico",
      direccion: "Av. Constituyentes 567, Col. Daniel Garza",
      telefono: "55-7890-1234",
      horario: "Lun-Vie 9:00-18:00",
      servicios: ["Denuncia", "Atención Psicológica", "Trabajo Social"],
      lat: 19.4098,
      lng: -99.2021,
      delegacion: "Miguel Hidalgo"
    },
    {
      id: 9,
      nombre: "Colectivo Atabal",
      tipo: "privado",
      direccion: "Calle Mina 89, Col. Guerrero",
      telefono: "55-8901-2345",
      horario: "Lun-Jue 11:00-18:00",
      servicios: ["Grupos de Apoyo", "Talleres", "Asesoría"],
      lat: 19.4445,
      lng: -99.1489,
      delegacion: "Cuauhtémoc"
    },
    {
      id: 10,
      nombre: "Unidad de Atención UNAM",
      tipo: "publico",
      direccion: "Ciudad Universitaria, Coyoacán",
      telefono: "55-5622-2222",
      horario: "Lun-Vie 8:00-20:00",
      servicios: ["Atención Psicológica", "Asesoría Legal", "Orientación"],
      lat: 19.3244,
      lng: -99.1794,
      delegacion: "Coyoacán"
    },
    {
      id: 11,
      nombre: "Centro de Apoyo Municipal Iztapalapa",
      tipo: "publico",
      direccion: "Av. Ermita Iztapalapa 123, Col. Barrio San Lucas",
      telefono: "55-9012-3456",
      horario: "Lun-Vie 9:00-17:00",
      servicios: ["Asesoría Legal", "Trabajo Social", "Denuncia"],
      lat: 19.3565,
      lng: -99.0641,
      delegacion: "Iztapalapa"
    },
    {
      id: 12,
      nombre: "Fundación para la Equidad",
      tipo: "privado",
      direccion: "Av. Universidad 456, Col. Del Valle",
      telefono: "55-0123-4567",
      horario: "Lun-Vie 10:00-18:00",
      servicios: ["Capacitación", "Empoderamiento", "Asesoría"],
      lat: 19.3789,
      lng: -99.1656,
      delegacion: "Benito Juárez"
    }
  ];

  // Filtrar centros
  const centrosFiltrados = centros.filter(centro => {
    const matchType = selectedType === 'todos' || centro.tipo === selectedType;
    const matchSearch = centro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       centro.delegacion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const handleCenterClick = (centro) => {
    setSelectedCenter(centro);
    setMapCenter([centro.lat, centro.lng]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Panel Izquierdo */}
          <div className="lg:w-1/3 lg:sticky lg:top-8 h-fit">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h1 className="text-4xl font-bold text-teal-700">
                  Centros de apoyo
                </h1>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Encuentra centros de apoyo cerca de ti. Lugares seguros con atención especializada disponibles.
              </p>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Buscar por nombre o delegación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  FILTRAR POR TIPO
                </p>
                
                <button
                  onClick={() => setSelectedType('todos')}
                  className={`w-full text-left px-6 py-3 rounded-full transition-all ${
                    selectedType === 'todos'
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todos los centros
                </button>

                <button
                  onClick={() => setSelectedType('publico')}
                  className={`w-full text-left px-6 py-3 rounded-full transition-all flex items-center gap-2 ${
                    selectedType === 'publico'
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                  Centros Públicos
                </button>

                <button
                  onClick={() => setSelectedType('privado')}
                  className={`w-full text-left px-6 py-3 rounded-full transition-all flex items-center gap-2 ${
                    selectedType === 'privado'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></div>
                  Centros Privados
                </button>
              </div>

              <div className="mt-6 p-4 bg-teal-50 rounded-2xl">
                <p className="text-sm text-teal-700">
                  <span className="font-bold">{centrosFiltrados.length}</span> centros disponibles
                </p>
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> Haz clic en cualquier marcador del mapa para ver más información del centro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho */}
          <div className="lg:w-2/3">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
              
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">Mapa de Centros</h2>
                  </div>
                </div>
              </div>

              {/* Mapa de Leaflet */}
              <div className="h-[545px]">
                <MapContainer 
                  center={mapCenter} 
                  zoom={12} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  <MapController center={mapCenter} zoom={selectedCenter ? 15 : 12} />
                  
                  {centrosFiltrados.map((centro) => (
                    <Marker 
                      key={centro.id}
                      position={[centro.lat, centro.lng]}
                      icon={centro.tipo === 'publico' ? publicoIcon : privadoIcon}
                      eventHandlers={{
                        click: () => handleCenterClick(centro)
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-gray-800 mb-2">{centro.nombre}</h3>
                          <p className="text-sm text-gray-600 mb-1">{centro.direccion}</p>
                          <p className="text-sm text-teal-600 font-medium">{centro.telefono}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* Información del centro seleccionado */}
              {selectedCenter && (
                <div className="p-6 bg-white border-t border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${
                        selectedCenter.tipo === 'publico' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {selectedCenter.nombre}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          Centro {selectedCenter.tipo}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCenter(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700">{selectedCenter.direccion}</p>
                        <p className="text-xs text-gray-500">{selectedCenter.delegacion}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <a 
                        href={`tel:${selectedCenter.telefono}`}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        {selectedCenter.telefono}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{selectedCenter.horario}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">SERVICIOS:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCenter.servicios.map((servicio, index) => (
                          <span 
                            key={index}
                            className="text-xs px-3 py-1 bg-teal-50 text-teal-700 rounded-full"
                          >
                            {servicio}
                          </span>
                        ))}
                      </div>
                    </div>

                    
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCenter.lat},${selectedCenter.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full mt-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    <a>
                      <Navigation className="w-4 h-4" />
                      Cómo llegar
                    </a>
                  </div>
                </div>
              )}

              {/* Leyenda del mapa */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow"></div>
                    <span className="text-sm text-gray-700">Centros Públicos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                    <span className="text-sm text-gray-700">Centros Privados</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de centros */}
            <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Lista de Centros ({centrosFiltrados.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {centrosFiltrados.map((centro) => (
                  <button
                    key={centro.id}
                    onClick={() => handleCenterClick(centro)}
                    className={`w-full text-left p-4 rounded-xl transition-all border-2 ${
                      selectedCenter?.id === centro.id
                        ? 'bg-teal-50 border-teal-500'
                        : 'bg-white border-gray-200 hover:border-teal-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                        centro.tipo === 'publico' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {centro.nombre}
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">{centro.delegacion}</p>
                        <p className="text-xs text-gray-500">{centro.telefono}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentrosApoyo;