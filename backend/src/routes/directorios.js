import { Router } from 'express';
import { listarDirectorios } from '../controllers/directorioController.js';

const router = Router();

router.get('/', listarDirectorios);

export default router;
