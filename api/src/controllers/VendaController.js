import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createVenda(req, res) {
    try {
      const { clienteId, vendedor, itens } = req.body;
    
      const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });

      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      const produtos = await prisma.produto.findMany({ where: { id: { in: itens.map(item => item.id) } } });

      if (produtos.length !== itens.length) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      const valor = produtos.reduce((total, produto) => {
        const item = itens.find(item => item.id === produto.id);
        return total + (produto.precoVenda * item.quantidade);
      }, 0);

      const venda = await prisma.venda.create({
        data: {
          cliente: { connect: { id: clienteId } },
          data: new Date(),
          itens: { connect: itens.map((item) => ({ id: item.id })) },
          valor,
          vendedor,
        },
        include: { cliente: true, itens: true },
      });

      return res.status(201).json(venda);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },

  async finAllVendas(_, res) {
    try {
      const vendas = await prisma.venda.findMany({
        select: {
          nroVenda: true,
          data: true,
          valor: true,
          vendedor: true,
          cliente: {select: { nome: true }}
        }
      });
      
      return res.status(200).json(vendas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });    
    }
  },

  async updateVenda(req, res) {
    const { nroVenda } = req.params;
    const { clienteId, vendedor, itens } = req.body;
  
    try {
      const venda = await prisma.venda.findUnique({ where: { nroVenda: Number(nroVenda) } });
  
      if (!venda) {
        return res.status(404).json({ message: "Venda não encontrada" });
      }
  
      const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
  
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
  
      const produtos = await prisma.produto.findMany({ where: { id: { in: itens.map(item => item.id) } } });
  
      const valor = produtos.reduce((total, produto) => {
        const item = itens.find(item => item.id === produto.id);
        return total + (produto.precoVenda * item.quantidade);
      }, 0);
  
      await prisma.venda.update({
        where: { nroVenda: Number(nroVenda) },
        data: {
          cliente: { connect: { id: clienteId } },
          data: new Date(),
          itens: { connect: itens.map((item) => ({ id: item.id })) },
          valor,
          vendedor,
        },
        include: { cliente: true, itens: true },
      });
  
      return res.status(200).json({ message: "Venda atualizada com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },

  async deleteVenda(req, res) {
    const { nroVenda } = req.params;

    try {
      const venda = await prisma.venda.findUnique({ where: { nroVenda: Number(nroVenda) } });
      
      if(!venda) {
        return res.status(404).json({ message: "Venda não encontrada" });
      }

      await prisma.venda.delete({ where: { nroVenda: Number(nroVenda)} });

      return res.status(200).json({ message: "Venda deletada com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
};