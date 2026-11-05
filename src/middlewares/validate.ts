import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export function validate(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Erro de validação.',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  };
}