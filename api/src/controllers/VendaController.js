import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createVenda(req, res) {
    try {
      const { clienteId, vendedor, data, vendaItens } = req.body;
  
      const cliente = await prisma.cliente.findUnique({ where: { id: Number(clienteId) } });
  
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
  
      const produtos = await prisma.produto.findMany({ where: { id: { in: vendaItens.map(item => item.produtoId) } } });
  
      if (produtos.length !== vendaItens.length) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
  
      const valor = vendaItens.reduce((total, item) => {
        const produto = produtos.find(produto => produto.id === item.produtoId);
        return total + (produto.precoVenda * item.quantidade);
      }, 0);
  
      const vendaItensData = [];
  
      for (const item of vendaItens) {
        const produto = await prisma.produto.findUnique({ where: { id: item.produtoId } });
        const nomeProduto = produto ? produto.nome : null;
  
        vendaItensData.push({
          produto: { connect: { id: item.produtoId } },
          quantidade: item.quantidade,
          nomeProduto: nomeProduto,
          nomeCliente: cliente.nome,
        });
      }
  
      const venda = await prisma.venda.create({
        data: {
          cliente: { connect: { id: Number(clienteId) } },
          data: new Date(data),
          vendaItens: {
            create: vendaItensData,
          },
          valor,
          vendedor,
          nomeCliente: cliente.nome,
        },
        include: { cliente: true, vendaItens: true },
      });

      for (const item of vendaItens) {
        const produto = await prisma.produto.findUnique({ where: { id: item.produtoId } });
        const novaQuantidade = produto.qtdLoja - item.quantidade;
      
        await prisma.produto.update({
          where: { id: item.produtoId },
          data: { qtdLoja: novaQuantidade },
        });
      }
  
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
          cliente: {
            select: {
              nome: true
            }
          },
          vendaItens: {
            select: {
              quantidade: true,
              nomeProduto: true,
              nomeCliente: true
            }
          }
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
    const { clienteId, vendedor, data, vendaItens } = req.body;
  
    try {
      const venda = await prisma.venda.findUnique({ where: { nroVenda: Number(nroVenda) } });
  
      if (!venda) {
        return res.status(404).json({ message: "Venda não encontrada" });
      }
  
      const cliente = await prisma.cliente.findUnique({ where: { id: Number(clienteId) } });
  
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
  
      const produtos = await prisma.produto.findMany({ where: { id: { in: vendaItens.map(item => item.produtoId) } } });
  
      const valor = vendaItens.reduce((total, item) => {
        const produto = produtos.find(produto => produto.id === item.produtoId);
        return total + (produto.precoVenda * item.quantidade);
      }, 0);
  
      await prisma.venda.update({
        where: { nroVenda: Number(nroVenda) },
        data: {
          cliente: { connect: { id: Number(clienteId) } },
          vendedor,
          valor,
          data,
          vendaItens: {
            updateMany: vendaItens.map((item) => ({
              where: { id: item.id },
              data: { quantidade: item.quantidade, produtoId: item.produtoId },
            })),
          },
        },
        include: {
          cliente: true,
          vendaItens: {
            select: {
              quantidade: true,
              produto: {
                select: {
                  nome: true,
                },
              },
            },
          },
        },
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
      const venda = await prisma.venda.findUnique({
        where: { nroVenda: Number(nroVenda) }
      });
  
      if (!venda) {
        return res.status(404).json({ message: "Venda não encontrada" });
      }

      await prisma.vendaItem.deleteMany({
        where: { vendaId: Number(nroVenda) }
      });
  
      await prisma.venda.delete({ where: { nroVenda: Number(nroVenda) } });
  
      return res.status(200).json({ message: "Venda deletada com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
};