import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, ExternalLink, AlertCircle, Download } from 'lucide-react';
import VisorPDF from '../components/common/VisorPDF';
import '../styles/contenido.css';

export default function ContenidoDinamico() {
  const { slug } = useParams();
  const [contenido, setContenido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfViewer, setPdfViewer] = useState({
    isOpen: false,
    fileUrl: '',
    fileName: ''
  });

  useEffect(() => {
    const cargarContenido = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!slug) {
          throw new Error('No se especificó el contenido');
        }
        
        let response = await fetch(`/recursos/instrucciones/${slug}.json`);
        
        if (!response.ok) {
          throw new Error('Archivo no encontrado ');
        }
        
        const data = await response.json();
        setContenido(data);
      } catch (err) {
        console.error('Error cargando contenido:', err);
        setError('No se pudo cargar el contenido solicitado.');
        setContenido(null);
      } finally {
        setLoading(false);
      }
    };

    cargarContenido();
  }, [slug]);

  const openPDF = (fileUrl, fileName) => {
    setPdfViewer({
      isOpen: true,
      fileUrl,
      fileName
    });
  };

  const closePDF = () => {
    setPdfViewer({
      isOpen: false,
      fileUrl: '',
      fileName: ''
    });
  };

  // Función para renderizar items de lista con tipos mixtos (PDF y links)
  const renderizarItemLista = (item, index) => {
    if (item.type === 'pdf' && item.file) {
      // Item es un PDF - hacer clickeable para abrir PDF
      return (
        <button
          key={index}
          onClick={() => openPDF(item.file, item.title)}
          className="contenido-list-item-button w-full text-left p-4 rounded-lg hover:bg-teal-50 hover:border-teal-200 transition-all border-2 border-transparent"
        >
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="contenido-item-title text-teal-700 mb-1">{item.title}</h3>
              {item.description && (
                <p className="contenido-item-desc text-gray-600">{item.description}</p>
              )}
              <span className="inline-block mt-2 text-xs font-semibold text-teal-600 uppercase bg-teal-100 px-2 py-1 rounded">
                PDF
              </span>
            </div>
            <Download className="w-4 h-4 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      );
    } else if (item.type === 'link' && item.url) {
      // Item es un enlace externo
      return (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="contenido-list-item-link w-full text-left p-4 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all border-2 border-transparent block"
        >
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="contenido-item-title text-blue-700 mb-1">{item.title}</h3>
              {item.description && (
                <p className="contenido-item-desc text-gray-600">{item.description}</p>
              )}
              <span className="inline-block mt-2 text-xs font-semibold text-blue-600 uppercase bg-blue-100 px-2 py-1 rounded">
                Enlace Externo
              </span>
            </div>
          </div>
        </a>
      );
    } else {
      // Item es texto simple
      return (
        <div key={index} className="contenido-card">
          <h3 className="contenido-item-title">{item.title}</h3>
          {item.description && (
            <p className="contenido-item-desc">{item.description}</p>
          )}
        </div>
      );
    }
  };

  // Función para renderizar documentos PDF
  const renderizarDocumentosPDF = (documentos) => {
    if (!documentos || !Array.isArray(documentos)) return null;

    return (
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {documentos.map((doc, index) => (
          <button
            key={index}
            onClick={() => openPDF(doc.file, doc.title)}
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors flex-shrink-0">
                <FileText className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 group-hover:text-teal-600 transition-colors mb-1">
                  {doc.title}
                </h3>
                {doc.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {doc.description}
                  </p>
                )}
                {doc.type && (
                  <span className="inline-block text-xs font-semibold text-teal-600 uppercase bg-teal-50 px-2 py-1 rounded">
                    {doc.type}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando contenido...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !contenido) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Contenido no encontrado</h2>
          <p className="text-gray-600 mb-4">{error || 'El recurso solicitado no existe.'}</p>
          <p className="text-sm text-gray-500 mb-6">
            Slug solicitado: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
          </p>
          <a 
            href="/recursos" 
            className="inline-block px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
          >
            Volver a Recursos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-12">
      <div className="contenido-wrapper">
        
        {/* Header */}
        <h1 className="contenido-title">{contenido.title}</h1>
        {contenido.description && (
          <p className="contenido-text text-center text-lg mb-8">
            {contenido.description}
          </p>
        )}

        {/* Secciones */}
        {contenido.sections && contenido.sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="contenido-section-title">{section.title}</h2>
            
            {section.content && (
              <p className="contenido-text mb-4">{section.content}</p>
            )}

            {/* Lista de items mixtos (PDFs y links) */}
            {section.list && section.list.length > 0 && (
              <div className="space-y-3">
                {section.list.map((item, idx) => renderizarItemLista(item, idx))}
              </div>
            )}
          </div>
        ))}

        {/* Documentos PDF adicionales */}
        {contenido.documents && contenido.documents.length > 0 && (
          <div className="mt-12">
            <h2 className="contenido-section-title">Documentos Adicionales</h2>
            {renderizarDocumentosPDF(contenido.documents)}
          </div>
        )}

        {/* Botón volver */}
        <div className="mt-12 text-center">
          <a 
            href="/recursos" 
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            ← Volver a Recursos
          </a>
        </div>
      </div>

      {/* Visor PDF Modal */}
      <VisorPDF
        isOpen={pdfViewer.isOpen}
        fileUrl={pdfViewer.fileUrl}
        fileName={pdfViewer.fileName}
        onClose={closePDF}
      />
    </div>
  );
}