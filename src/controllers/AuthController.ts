import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Verifica se o usuário já existe
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      // Criptografa a senha com bcrypt
      const passwordHash = await bcrypt.hash(password, 8);

      // Cria o usuário no banco
      const user = await User.create({
        name,
        email,
        passwordHash,
      });

      return res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Busca o usuário pelo e-mail
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Usuário ou senha inválidos.' });
      }

      // Compara a senha enviada com o hash do banco
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Usuário ou senha inválidos.' });
      }

      // Gera o Token JWT usando o segredo do .env
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'segredo_padrao',
        { expiresIn: '1d' }
      );

      return res.json({
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }
}