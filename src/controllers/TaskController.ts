import { Request, Response } from 'express';
import { Task } from '../models/Task';

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'O título da tarefa é obrigatório.' });
      }

      const task = await Task.create({
        title,
        description,
        userId: req.userId, // Vincula ao usuário autenticado pelo JWT
      });

      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar tarefa.' });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      // Busca apenas as tarefas do usuário autenticado
      const tasks = await Task.find({ userId: req.userId });
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar tarefas.' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      // Atualiza apenas se a tarefa pertencer ao usuário logado
      const task = await Task.findOneAndUpdate(
        { _id: id, userId: req.userId },
        { title, description, completed },
        { new: true }
      );

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
      }

      return res.json(task);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Deleta apenas se a tarefa pertencer ao usuário logado
      const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
      }

      return res.status(204).send(); // Retorna 204 No Content para exclusão bem-sucedida
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar tarefa.' });
    }
  }
}