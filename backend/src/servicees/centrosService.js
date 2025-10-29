export const getCentros = async () => {
  const response = await fetch('/api/centros');
  return response.json();
};

import { useEffect, useState } from 'react';
import { getCentros } from '../services/centrosService';

const CentrosApoyo = () => {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const data = await getCentros();
        setCentros(data);
      } catch (error) {
        console.error('Error al cargar centros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCentros();
  }, []);

}