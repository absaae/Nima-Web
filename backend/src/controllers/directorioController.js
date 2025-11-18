import Directorio from '../models/Directorio.js';

export const listarDirectorios = async (req, res) => {
  try {
    const directorios = await Directorio.find({});
    res.json(directorios);
  } catch (error) {
    console.error('Error al obtener directorios:', error);
    res.status(500).json({ message: 'Error al obtener directorios' });
  }
};
