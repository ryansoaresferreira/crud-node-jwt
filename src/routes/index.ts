import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validators/authValidator';
import { createTaskSchema, updateTaskSchema } from '../validators/taskValidator';

const router = Router();

// --- Rotas Públicas com Validação Zod ---
router.post('/auth/register', validate(registerSchema), AuthController.register);
router.post('/auth/login', validate(loginSchema), AuthController.login);

// --- Rotas Protegidas ---
router.use(authMiddleware);

router.post('/tasks', validate(createTaskSchema), TaskController.create);
router.get('/tasks', TaskController.list);
router.put('/tasks/:id', validate(updateTaskSchema), TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

export { router };