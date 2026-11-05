import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// --- Rotas Públicas ---
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// --- Rotas Protegidas ---
// A partir desta linha, todas as rotas abaixo exigem o token JWT no Header (Authorization: Bearer <token>)
router.use(authMiddleware);

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.list);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

export { router };