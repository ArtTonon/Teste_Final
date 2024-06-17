import { Produto } from "../../models/Produto";
import { ProdutoService } from "../ProdutoService";
import { ProdutoRepository } from "../../models/repositories/ProdutoRepositorio";

export class ProdutoServiceImpl implements ProdutoService {
  private produtoRepository: ProdutoRepository;

  constructor(produtoRepository: ProdutoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async criaProduto(p: Produto): Promise<void> {
    await this.produtoRepository.create(p);
  }

  async leProduto(id: number): Promise<Produto | null> {
    const produto = await this.produtoRepository.findOne(id);
    return produto || null;
  }

  async leProdutos(): Promise<Produto[]> {
    return this.produtoRepository.findAll();
  }
}
