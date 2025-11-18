import React, { useState, useEffect } from 'react';
import { Phone, Mail, User, Search, Filter } from 'lucide-react';
import { getDirectorios } from '../services/directoriosService';

const Directorio = () => {
  const [filterType, setFilterType] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [especialistas, setEspecialistas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDirectorios();

        const adaptados = data.map((d) => ({
          ...d,
          especializacion: d.especialidad ?? '',
          correo: d.email ?? '',
        }));
        setEspecialistas(adaptados);
      } catch (error) {
        console.error('Error al cargar directorios:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Función para determinar el tipo basado en la especialidad
  const getTipo = (esp) => {
    const spec = (esp.especializacion?.toLowerCase() || '').trim();
    if (spec.includes('psic') || spec.includes('psicología')) return 'psicologia';
    if (spec.includes('derecho') || spec.includes('abogad') || spec.includes('legal')) return 'abogadas';
    return 'otras';
  };

  // Filtrar especialistas
  const especialistasFiltrados = especialistas.filter((esp) => {
    const tipoDetectado = getTipo(esp);
    const matchTipo = filterType === 'todas' || tipoDetectado === filterType;
    const matchSearch =
      esp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (esp.especializacion?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchTipo && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-nima-teal text-xl font-semibold">
        Cargando directorio...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel Izquierdo - Información */}
          <div className="lg:col-span-1">
            <div className="bg-nima-teal text-white rounded-3xl p-8 shadow-xl sticky top-24">
              {/* Punto decorativo */}
              <div className="w-6 h-6 bg-nima-orange rounded-full mb-6"></div>

              <h1 className="text-4xl font-bold mb-6">Directorio</h1>

              <p className="text-lg leading-relaxed mb-8">
                Si necesitas ayuda profesional, aquí contamos con especialistas que pueden
                brindarte apoyo según sean tus necesidades.
              </p>

              {/* Categorías */}
              <div className="space-y-4">
                <button
                  onClick={() => setFilterType('todas')}
                  className={`w-full text-left py-3 px-4 rounded-xl transition-all ${
                    filterType === 'todas'
                      ? 'bg-white text-nima-teal font-semibold'
                      : 'bg-teal-700 hover:bg-teal-600'
                  }`}
                >
                  • Todas
                </button>

                <button
                  onClick={() => setFilterType('psicologia')}
                  className={`w-full text-left py-3 px-4 rounded-xl transition-all ${
                    filterType === 'psicologia'
                      ? 'bg-white text-nima-teal font-semibold'
                      : 'bg-teal-700 hover:bg-teal-600'
                  }`}
                >
                  • Psicología
                </button>

                <button
                  onClick={() => setFilterType('abogadas')}
                  className={`w-full text-left py-3 px-4 rounded-xl transition-all ${
                    filterType === 'abogadas'
                      ? 'bg-white text-nima-teal font-semibold'
                      : 'bg-teal-700 hover:bg-teal-600'
                  }`}
                >
                  • Abogadas
                </button>
              </div>
            </div>
          </div>

          {/* Panel Derecho - Grid de Especialistas */}
          <div className="lg:col-span-2">
            {/* Barra de búsqueda */}
            <div className="mb-8">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar por nombre o especialización..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-nima-teal focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Grid de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {especialistasFiltrados.length > 0 ? (
                especialistasFiltrados.map((especialista) => (
                  <div
                    key={especialista._id}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {/* Ícono de usuario */}
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-nima-pink to-nima-purple rounded-full flex items-center justify-center">
                        <User size={40} className="text-white" />
                      </div>
                    </div>

                    {/* Información */}
                    <div className="text-center space-y-3">
                      <h3 className="text-xl font-bold text-gray-800">{especialista.nombre}</h3>

                      <p className="text-gray-600 font-medium">{especialista.especializacion}</p>

                      {/* Separador */}
                      <div className="flex justify-center py-2">
                        <div className="w-20 h-px bg-nima-orange"></div>
                      </div>

                      {/* Contacto */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center gap-2 text-gray-700">
                          <Phone size={16} className="text-nima-teal" />
                          <a
                            href={`tel:${especialista.telefono}`}
                            className="hover:text-nima-teal transition-colors"
                          >
                            {especialista.telefono}
                          </a>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-gray-700">
                          <Mail size={16} className="text-nima-teal" />
                          <a
                            href={`mailto:${especialista.correo}`}
                            className="hover:text-nima-teal transition-colors break-all"
                          >
                            {especialista.correo}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-xl text-gray-500">
                    No se encontraron especialistas con los criterios seleccionados.
                  </p>
                </div>
              )}
            </div>

            {/* Información adicional */}
            <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg text-center">
              <p className="text-gray-700 leading-relaxed">
                Todos los profesionales listados están verificados y especializados en apoyo a
                mujeres en situaciones de violencia. No dudes en contactarlos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directorio;
