import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'O título da tarefa é obrigatório.'),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'O título não pode ser vazio.').optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});