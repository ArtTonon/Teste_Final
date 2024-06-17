import { Request, Response } from "express";
import { Produto } from "../models/Produto";
import { ProdutoServiceImpl } from "../services/impl/ProdutoServiceImpl";

export class ProdutoController {
  private produtoService: ProdutoServiceImpl;

  constructor(produtoService: ProdutoServiceImpl) {
    this.produtoService = produtoService;
  }

  criaProduto = async (req: Request, res: Response) => {
    const { nome, preco, imagem, descricao } = req.body;
    const produto = new Produto();
    produto.nome = nome;
    produto.descricao = descricao;
    produto.preco = preco;
    produto.imagem = imagem;

    await this.produtoService.criaProduto(produto);
    res.status(201).json(produto);
  };

  leProduto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const produto = await this.produtoService.leProduto(parseInt(id));
    if (!produto) {
      return res.status(404).send({ message: "produto nao encontrado" });
    }
    return res.status(200).json({ produto });
  };
}
