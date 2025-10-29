import React, { useState, useRef, useEffect } from 'react';
import { FileText, Users, Heart, BookOpen, AlertCircle, Phone, Shield } from 'lucide-react';

const Recursos = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedCard && contentRef.current) {
      setTimeout(() => {
        contentRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [selectedCard]);

  const handleCardClick = (cardType) => {
    if (selectedCard === cardType) {
      setSelectedCard(null);
    } else {
      setSelectedCard(cardType);
    }
  };

  // Contenido db
  const recursosSections = {
    clasificacion: {
      titulo: "Clasificación",
      icono: <FileText className="w-8 h-8" />,
      color: "teal",
      contenido: [
        { tipo: "Violencia Física", ejemplos: "Golpes, empujones, jalones de cabello" },
        { tipo: "Violencia Psicológica", ejemplos: "Insultos, humillaciones, manipulación" },
        { tipo: "Violencia Sexual", ejemplos: "Acoso, violación, contacto no deseado" },
        { tipo: "Violencia Económica", ejemplos: "Control del dinero, impedir trabajar" },
        { tipo: "Violencia Patrimonial", ejemplos: "Destrucción de documentos, robo" }
      ]
    },
    conocesAlguien: {
      titulo: "¿Conoces a alguien?",
      icono: <Users className="w-8 h-8" />,
      color: "pink",
      contenido: [
        "Escucha sin juzgar y brinda un espacio seguro",
        "Cree en su palabra y valida sus sentimientos",
        "Ofrece información sin presionar",
        "Apoya respetando su proceso y autonomía"
      ]
    },
    recomendaciones: {
      titulo: "Recomendaciones",
      icono: <Shield className="w-8 h-8" />,
      color: "teal",
      contenido: [
        "Identifica lugares seguros y ten números de emergencia",
        "Prepara documentos importantes en un lugar seguro",
        "911 - Emergencias | 089 - Denuncia | 800-108-4053 - Línea de la Mujer"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header  */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <h1 className="text-5xl font-bold text-teal-700">Recursos</h1>
          </div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8">
            Encontrarás herramientas y materiales diseñados para orientarte y protegerte en situaciones de violencia.
          </p>

          {/* Carpetas animadas */}
          <div className="relative h-56 flex items-center justify-center my-12">
            {/* Carpeta Amarilla (atrás) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-44 h-28 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl shadow-lg rotate-[-5deg] transition-transform hover:rotate-[-3deg] hover:scale-105 cursor-pointer">
              <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-yellow-600 opacity-30" />
              </div>
            </div>

            {/* Carpeta Rosa (medio) */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-44 h-28 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl shadow-xl rotate-[2deg] transition-transform hover:rotate-[4deg] hover:scale-105 z-10 cursor-pointer">
              <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-10 h-10 text-pink-600 opacity-30" />
              </div>
            </div>

            {/* Carpeta Morada (adelante) */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-44 h-28 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl shadow-2xl rotate-[-3deg] transition-transform hover:rotate-[-1deg] hover:scale-105 z-20 cursor-pointer">
              <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-10 h-10 text-purple-600 opacity-30" />
              </div>
            </div>
          </div>


        </div>

        {/* Tarjetas principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Clasificación */}
          <button
            onClick={() => handleCardClick('clasificacion')}
            className={`bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl p-8 transition-all duration-300 ${
              selectedCard === 'clasificacion' 
                ? 'scale-105 shadow-2xl' 
                : 'hover:scale-105 hover:shadow-xl'
            }`}
          >
            <div className="mb-4">{recursosSections.clasificacion.icono}</div>
            <h3 className="text-2xl font-bold">Clasificación</h3>
          </button>

          {/* ¿Conoces a alguien? */}
          <button
            onClick={() => handleCardClick('conocesAlguien')}
            className={`bg-white text-gray-800 rounded-2xl p-8 transition-all duration-300 border-2 border-pink-200 ${
              selectedCard === 'conocesAlguien' 
                ? 'scale-105 shadow-2xl border-pink-400' 
                : 'hover:scale-105 hover:shadow-xl'
            }`}
          >
            <div className="mb-4 text-pink-600">{recursosSections.conocesAlguien.icono}</div>
            <h3 className="text-2xl font-bold">¿Conoces a alguien?</h3>
          </button>

          {/* Recomendaciones */}
          <button
            onClick={() => handleCardClick('recomendaciones')}
            className={`bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl p-8 transition-all duration-300 ${
              selectedCard === 'recomendaciones' 
                ? 'scale-105 shadow-2xl' 
                : 'hover:scale-105 hover:shadow-xl'
            }`}
          >
            <div className="mb-4">{recursosSections.recomendaciones.icono}</div>
            <h3 className="text-2xl font-bold">Recomendaciones</h3>
          </button>
        </div>

        {/* Contenido expandido - Clasificación */}
        {selectedCard === 'clasificacion' && (
          <div ref={contentRef} className="bg-white rounded-2xl p-8 shadow-xl animate-fade-in scroll-mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-teal-600" />
              Tipos de Violencia
            </h2>
            <div className="space-y-4">
              {recursosSections.clasificacion.contenido.map((item, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4 py-2">
                  <h3 className="font-bold text-gray-800 mb-1">{item.tipo}</h3>
                  <p className="text-gray-600">{item.ejemplos}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-orange-50 rounded-xl border-l-4 border-orange-400">
              <p className="text-gray-700 text-sm">
                <strong>Importante:</strong> La violencia puede presentarse en múltiples formas. 
                Si reconoces alguna situación, busca ayuda profesional.
              </p>
            </div>
          </div>
        )}

        {/* Contenido expandido - ¿Conoces a alguien? */}
        {selectedCard === 'conocesAlguien' && (
          <div ref={contentRef} className="bg-white rounded-2xl p-8 shadow-xl animate-fade-in scroll-mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-pink-600" />
              Cómo Ayudar
            </h2>
            <div className="space-y-4">
              {recursosSections.conocesAlguien.contenido.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-pink-50 rounded-xl">
                  <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-teal-50 rounded-xl border-l-4 border-teal-400">
              <p className="text-gray-700 text-sm">
                <strong>Recuerda:</strong> Tu apoyo es fundamental, pero también cuida tu propia salud emocional.
              </p>
            </div>
          </div>
        )}

        {/* Contenido expandido - Recomendaciones */}
        {selectedCard === 'recomendaciones' && (
          <div ref={contentRef} className="bg-white rounded-2xl p-8 shadow-xl animate-fade-in scroll-mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-teal-600" />
              Medidas de Seguridad
            </h2>
            <div className="space-y-4">
              {recursosSections.recomendaciones.contenido.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-semibold mb-2">Emergencia Inmediata</p>
                  <p className="text-gray-700 text-sm mb-3">
                    Si estás en peligro, llama al 911. No esperes.
                  </p>
                  <div className="flex gap-4 text-sm">
                    <a href="tel:911" className="text-red-600 font-semibold hover:text-red-700">
                      911 - Emergencias
                    </a>
                    <a href="tel:089" className="text-red-600 font-semibold hover:text-red-700">
                      089 - Denuncia
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Recursos;