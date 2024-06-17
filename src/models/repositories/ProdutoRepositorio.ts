import { Produto } from "../Produto";
import { Repository } from "typeorm";

export class ProdutoRepository {
  private repository: Repository<Produto>;

  constructor(repository: Repository<Produto>) {
    this.repository = repository;
  }

  async create(p: Produto): Promise<Produto> {
    const novoProduto = this.repository.create(p);
    await this.repository.save(novoProduto);
    return novoProduto;
  }

  async findOne(id: number): Promise<Produto | null> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Produto[]> {
    return this.repository.find();
  }
}
