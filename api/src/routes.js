import { Router } from 'express';
import ClienteController from './controllers/ClienteController';
import ProdutoController from './controllers/ProdutoController';
import VendaController from './controllers/VendaController';
import CalcularVendaController from './controllers/CalcularVendaController';

const router = Router();

router.post("/cliente", ClienteController.createCliente);
router.get("/clientes", ClienteController.findAllClientes);
router.get("/cliente/:id", ClienteController.findCliente);
router.put("/cliente/:id", ClienteController.updateCliente);
router.delete("/cliente/:id", ClienteController.deleteCliente);

router.post("/produto", ProdutoController.createProduto);
router.get("/produtos", ProdutoController.findAllProdutos);
router.get("/produto/:id", ProdutoController.findProduto);
router.put("/produto/:id", ProdutoController.updateProduto);
router.delete("/produto/:id", ProdutoController.deleteProduto);

router.post("/venda", VendaController.createVenda);
router.get("/vendas", VendaController.finAllVendas);
router.put("/venda/:nroVenda", VendaController.updateVenda);
router.delete("/venda/:nroVenda", VendaController.deleteVenda);

router.post("/venda/calcular", CalcularVendaController.calcularVenda);


router.get("/", (_, res) => {
    res.json({server: "is running"});
});
 

export default router;