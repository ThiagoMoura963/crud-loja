import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createProduto(req, res) {

    try {
      const { nome, descricao, marca, fornecedor, classificacao, precoCusto, precoVenda, qtdEstoque, qtdLoja } = req.body
    
      const produto = await prisma.produto.create({
        data: {
          nome,
          descricao,
          marca,
          fornecedor,
          classificacao,
          precoCusto,
          precoVenda,
          qtdEstoque,
          qtdLoja
          },
      });
          
      return res.status(201).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },

  async findAllProdutos(_, res) {
    try {
      const produtos = await prisma.produto.findMany();
      
      return res.status(200).json(produtos)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },

  async findProduto(req, res) {
    try {
      const { id } = req.params;
      const produto = await prisma.produto.findUnique({where: { id: Number(id) }});
      
      if(!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      return res.status(200).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },

  async updateProduto(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, marca, fornecedor, classificacao, precoCusto, precoVenda, qtdEstoque, qtdLoja } = req.body
    
      const produto = await prisma.produto.update({
        where: { id: Number(id) },
        data: {
          nome,
          descricao,
          marca,
          fornecedor,
          classificacao,
          precoCusto,
          precoVenda,
          qtdEstoque,
          qtdLoja
          },
      });
          
      return res.status(200).json(produto);
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });    
    }
  },

  async deleteProduto(req, res) {
    try {
      const { id } = req.params;
      const produto = await prisma.produto.findUnique({where: { id: Number(id) }});
      
      if(!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await prisma.produto.delete({where: { id: Number(id) }});

      return res.status(200).json({ message: "Produto deletado!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
};