import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async calcularVenda(req, res) {
    try {
      const { vendaItens } = req.body;
  
      const produtos = await prisma.produto.findMany({ where: { id: { in: vendaItens.map(item => item.produtoId) } } });
  
      if (produtos.length !== vendaItens.length) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
  
      const valor = vendaItens.reduce((total, item) => {
        const produto = produtos.find(produto => produto.id === item.produtoId);
        return total + (produto.precoVenda * item.quantidade);
      }, 0);
  
      return res.status(200).json({ valor });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
};