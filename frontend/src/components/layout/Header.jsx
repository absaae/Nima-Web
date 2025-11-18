import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import nimaLogo from '../../assets/images/nimaLogo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      // Si estamos en la parte superior, siempre mostrar
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Si scrolleamos hacia abajo, ocultar
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); // Cerrar menú mobile si está abierto
      }
      // Si scrolleamos hacia arriba, mostrar
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo y Nombre */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-16 h-16">
            <img src={nimaLogo} alt="logo" className="w-full h-full object-contain shadow-lg rounded-full" />
            </div>
            <span className="text-2xl font-bold text-nima-teal">NIMA</span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-nima-teal font-medium transition-colors">
              Inicio
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-nima-teal font-medium transition-colors">
              ¿Quiénes Somos?
            </Link>
            <Link to="/recursos" className="text-gray-700 hover:text-nima-teal font-medium transition-colors">
              Recursos
            </Link>
            <Link to="/directorio" className="text-gray-700 hover:text-nima-teal font-medium transition-colors">
              Directorio
            </Link>
            <Link to="/centrosapoyo" className="text-gray-700 hover:text-nima-teal font-medium transition-colors">
              Centros de Apoyo
            </Link>
            <Link 
              to="/chat" 
              className="bg-nima-teal text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-all shadow-md"
            >
              Chat
            </Link>
          </nav>

          {/* Botón Menú*/}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-nima-teal font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Inicio
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-nima-teal font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Quiénes Somos
              </Link>
              <Link 
                to="/recursos" 
                className="text-gray-700 hover:text-nima-teal font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Recursos
              </Link>
              <Link 
                to="/directorio" 
                className="text-gray-700 hover:text-nima-teal font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Directorio
              </Link>
              <Link 
                to="/centrosapoyo" 
                className="text-gray-700 hover:text-nima-teal font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Centros de Apoyo
              </Link>
              <Link 
                to="/chat" 
                className="bg-nima-teal text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-all text-center"
                onClick={toggleMenu}
              >
                Chat
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;