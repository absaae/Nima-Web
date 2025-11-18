import mongoose from 'mongoose';

const directorioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String },
  telefono: { type: String },
  email: { type: String }
});

export default mongoose.model('Directorio', directorioSchema, 'directorios');