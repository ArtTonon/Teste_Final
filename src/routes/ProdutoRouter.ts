import { Router } from "express";
import { DataSource } from "typeorm";
import { ProdutoRepository } from "../models/repositories/ProdutoRepositorio";
import { Produto } from "../models/Produto";
import { ProdutoServiceImpl } from "../services/impl/ProdutoServiceImpl";
import { ProdutoController } from "../controllers/ProdutoController";

export class ProdutoRouter {
  public router: Router;

  constructor(dataSource: DataSource) {
    this.router = Router();
    this.iniciar(dataSource);
  }

  iniciar(dataSource: DataSource) {
    console.log("iniciando rota produtos");
    const repository = new ProdutoRepository(dataSource.getRepository(Produto));
    const service = new ProdutoServiceImpl(repository);
    const controller = new ProdutoController(service);
    this.router.get("/:id", controller.leProduto);
    this.router.post("/", controller.criaProduto);
  }
}
