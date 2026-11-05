import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// Rotas públicas de autenticação
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

export { router };