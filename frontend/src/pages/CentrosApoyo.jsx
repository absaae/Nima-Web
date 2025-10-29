import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const CentrosApoyo = () => {
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // ejemplo
  const centros = [
    {
      id: 1,
      nombre: "LUNAS - Centro de Apoyo Integral",
      tipo: "publico",
      direccion: "Av. Revolución 1234, Col. San Ángel",
      telefono: "55-1234-5678",
      horario: "Lun-Vie 9:00-18:00",
      servicios: ["Asesoría Legal", "Apoyo Psicológico", "Refugio Temporal"],
      posicion: { x: 35, y: 25 },
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
      posicion: { x: 55, y: 40 },
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
      posicion: { x: 25, y: 55 },
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
      posicion: { x: 60, y: 30 },
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
      posicion: { x: 58, y: 42 },
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
      posicion: { x: 45, y: 65 },
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
      posicion: { x: 52, y: 48 },
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
      posicion: { x: 30, y: 35 },
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
      posicion: { x: 48, y: 28 },
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
      posicion: { x: 42, y: 75 },
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
      posicion: { x: 72, y: 58 },
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
      posicion: { x: 48, y: 58 },
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
  };

  const handleMapClick = () => {
    setSelectedCenter(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Panel Izquierdo - Filtros (Sticky) */}
          <div className="lg:w-1/3 lg:sticky lg:top-8 h-fit">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              
              {/* Punto decorativo naranja */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h1 className="text-4xl font-bold text-teal-700">
                  Centros de apoyo
                </h1>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Encuentra centros de apoyo cerca de ti. Lugares seguros con atención especializada disponibles.
              </p>

              {/* Búsqueda */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Buscar por nombre o delegación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Filtros de tipo */}
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

              {/* Contador */}
              <div className="mt-6 p-4 bg-teal-50 rounded-2xl">
                <p className="text-sm text-teal-700">
                  <span className="font-bold">{centrosFiltrados.length}</span> centros disponibles
                </p>
              </div>

              {/* Información adicional */}
              <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> Haz clic en cualquier punto del mapa para ver más información del centro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho - Mapa */}
          <div className="lg:w-2/3">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
              
              {/* Header del mapa */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">Mapa de Centros</h2>
                  </div>
                  <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm">Mi ubicación</span>
                  </button>
                </div>
              </div>

              {/* Mapa con puntos */}
              <div 
                className="relative w-full h-[545px] bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
                onClick={handleMapClick}
              >
                {/* "mapa"*/}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <rect x="20%" y="15%" width="60%" height="2" fill="#94a3b8" />
                  <rect x="40%" y="5%" width="2" height="90%" fill="#94a3b8" />
                  <rect x="10%" y="40%" width="80%" height="2" fill="#94a3b8" />
                  <rect x="70%" y="10%" width="2" height="80%" fill="#94a3b8" />
                  <rect x="15%" y="60%" width="70%" height="2" fill="#94a3b8" />
                  <rect x="25%" y="20%" width="2" height="60%" fill="#94a3b8" />
                  
                  {/* Bloques/manzanas */}
                  <rect x="15%" y="20%" width="15%" height="15%" fill="#e2e8f0" rx="4" />
                  <rect x="45%" y="25%" width="20%" height="12%" fill="#e2e8f0" rx="4" />
                  <rect x="25%" y="45%" width="18%" height="20%" fill="#e2e8f0" rx="4" />
                  <rect x="60%" y="50%" width="22%" height="18%" fill="#e2e8f0" rx="4" />
                  <rect x="50%" y="70%" width="15%" height="15%" fill="#e2e8f0" rx="4" />
                  <rect x="20%" y="70%" width="20%" height="12%" fill="#e2e8f0" rx="4" />
                </svg>

                {/* Marcadores de centros */}
                {centrosFiltrados.map((centro) => (
                  <button
                    key={centro.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCenterClick(centro);
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                      selectedCenter?.id === centro.id ? 'scale-150 z-20' : 'hover:scale-125 z-10'
                    }`}
                    style={{
                      left: `${centro.posicion.x}%`,
                      top: `${centro.posicion.y}%`
                    }}
                  >
                    <div className="relative">
                      {/* Pin del marcador */}
                      <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center ${
                        centro.tipo === 'publico' 
                          ? 'bg-emerald-500 border-4 border-white' 
                          : 'bg-blue-500 border-4 border-white'
                      }`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      
                      {/* Pulso de animación */}
                      {selectedCenter?.id === centro.id && (
                        <div className={`absolute inset-0 rounded-full animate-ping ${
                          centro.tipo === 'publico' ? 'bg-emerald-400' : 'bg-blue-400'
                        }`}></div>
                      )}
                    </div>
                  </button>
                ))}

                {/* Overlay de información cuando se selecciona un centro */}
                {selectedCenter && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 z-30 animate-fade-in">
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
                        onClick={handleMapClick}
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

                      <button className="w-full mt-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Cómo llegar
                      </button>
                    </div>
                  </div>
                )}
              </div>

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

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentrosApoyo;