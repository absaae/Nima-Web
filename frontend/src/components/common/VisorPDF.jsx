import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import './VisorPDF.css';

export default function VisorPDF({ fileUrl, fileName, onClose, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="visor-overlay" onClick={onClose}>
      <div className="visor-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header del visor */}
        <div className="visor-header">
          <div className="visor-title">
            <h3>{fileName || 'Documento'}</h3>
          </div>
          <div className="visor-actions">
            <a 
              href={fileUrl} 
              download 
              className="visor-button visor-button-download"
              title="Descargar PDF"
            >
              <Download className="w-5 h-5" />
            </a>
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="visor-button visor-button-external"
              title="Abrir en nueva pestaña"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <button 
              onClick={onClose} 
              className="visor-button visor-button-close"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe del PDF */}
        <div className="visor-content">
          {!fileUrl ? (
            <div className="visor-empty">
              <p>No se proporcionó ningún archivo para visualizar.</p>
            </div>
          ) : (
            <iframe
              src={fileUrl}
              title={fileName || "Visor PDF"}
              className="visor-iframe"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
        window.addEventListener('keydown', handleEsc);
    }
    
    return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);
}