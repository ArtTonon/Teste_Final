import { Request, Response } from "express";
import { AuthServiceImpl } from "../services/impl/AuthServiceImpl";
import { UserRepository } from "../models/repositories/UserRepositorio";
import { getCustomRepository } from "typeorm";

const repository = getCustomRepository(UserRepository);
const authService: AuthServiceImpl = new AuthServiceImpl(repository);

export class AuthController {
  private authService: AuthServiceImpl;

  constructor(authService: AuthServiceImpl) {
    this.authService = authService;
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.authService.login(email, password);
      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Aconteceu um erro" });
      }
    }
  }

  async signUp(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      await this.authService.signUp(email, password);
      res.status(201).json({ message: "Usuario Criado com Sucesso" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Aconteceu um erro" });
      }
    }
  }
}
