import { Produto } from '../models/Produto';

export interface ProdutoService {
  criaProduto(p: Produto): Promise<void>;
  leProduto(id: number): Promise<Produto | null>;
  leProdutos(): Promise<Produto[]>;
}
