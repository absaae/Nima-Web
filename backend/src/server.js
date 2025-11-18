import mongoose from 'mongoose';
import Centro from './models/Centro.js'; 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import directoriosRouter from './routes/directorios.js';

dotenv.config();

console.log('🔍 URI de conexión:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas :D'))
  .catch(err => console.error('Error de conexión:', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'NIMA Backend is running!' });
});

app.get('/api/centros', async (req, res) => {
  try {
    const centros = await Centro.find();
    res.json(centros);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los centros' });
  }
});

app.use('/api/directorios', directoriosRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
