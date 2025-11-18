import mongoose from 'mongoose';

const centroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String },
  direccion: { type: String },
  alcaldia: { type: String },
  telefono: { type: String },
  horario: { type: String },
  servicios: [{ type: String }] 
});

export default mongoose.model('Centro', centroSchema, 'centros_apoyo');
