import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createCliente(req, res) {
    try {
      const { nome, endereco, telefone } = req.body;

      await prisma.cliente.create({
        data: {
          nome,
          endereco,
          telefone,
        },
      });

      return res.status(201).json({ message: "Cliente cadastrado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async findAllClientes(_, res) {
    try {
      const clientes = await prisma.cliente.findMany({
        include: {
          vendas: true,
        }
      });

      const clientesAtualizados = clientes.map((cliente) => {
        const compras = cliente.vendas.length;
        return { ...cliente, compras };
      });
      
      return res.status(200).json(clientesAtualizados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },

  async findCliente(req, res) {
    try {
      const { id } = req.params;
      const cliente = await prisma.cliente.findUnique({
        where: 
        { id: Number(id) }, 
        include: {
          vendas: true
        }
      });
      
      if(!cliente) {
        return res.status(404).json({ error: "Não foi possível encontrar esse usuário" });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },

  async updateCliente(req, res) {
    try {
      const { id } = req.params;
      const { nome, endereco, telefone } = req.body;
  
      let cliente = await prisma.cliente.findUnique({ 
        where: { id: Number(id) },
        include: {
          vendas: true,
        } 
      });
  
      if (!cliente) {
        return res.status(404).json({ error: "Não foi possível encontrar esse cliente" });
      }
  
      cliente = await prisma.cliente.update({
        where: { id: Number(id) },
        data: {
          nome,
          endereco,
          telefone,
        },
      });
  
      return res.status(200).json({ message: "Cliente atualizado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  },

  async deleteCliente(req, res) {
    try {
      const { id } = req.params;
  
      const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) } });
  
      if (!cliente) {
        return res.status(404).json({ error: "Não foi possível encontrar esse cliente" });
      }
  
      const vendas = await prisma.venda.findMany({ where: { clienteId: Number(id) } });
      
      await Promise.all(
        vendas.map(async (venda) => {
          await prisma.venda.update({
            where: { nroVenda: venda.nroVenda },
            data: { cliente: { disconnect: true } },
          });
        })
      );
  
      await prisma.cliente.delete({
        where: { id: Number(id) },
        include: {
          vendas: true,
        } 
      });
  
      return res.status(200).json({ message: "Cliente deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
};