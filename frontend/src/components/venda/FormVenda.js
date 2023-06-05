import React, { useRef, useState, useEffect } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';

const FormVenda = ({ getVendas, setOnEdit, onEdit, showEditModal, setShowEditModal }) => {
  const [showModal, setShowModal] = useState(false);
  const [produtos, setProdutos] = useState([""]);
  const [clienteList, setClienteList] = useState([""]);
  const [quantidade, setQuantidade] = useState([0]);
  const [valorVenda, setValorVenda] = useState([]);
  const [data, setData] = useState("");
  const [produtoList, setProdutoList] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtoValues, setProdutoValues] = useState([]);
  const [vendedor, setVendedor] = useState("");


  console.log("ID do Cliente: " + typeof clienteList);
  console.log("ID do Produto: " + produtoList);
  


  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/clientes");
      setClientes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  const getProdutoValues = async () => {
    try {
      const res = await axios.get("http://localhost:8080/produtos");
      setProdutoValues(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProdutoValues();
  }, []);


  useEffect(() => {
    if (onEdit) {
      setClienteList(onEdit.clienteList);
      setData(onEdit.data);
      setProdutoList(onEdit.produtoList);
      setQuantidade(onEdit.quantidade);
      setVendedor(onEdit.vendedor);
    } else {
      setClienteList('');
      setData('');
      setProdutoList('');
    }
  }, [onEdit]);

  const handleChange = (selectedProductId, i) => {
    const updatedProdutoList = [...produtoList];
    updatedProdutoList[i] = selectedProductId;
    setProdutoList(updatedProdutoList);
  };

  const handleAdd = () => {
    const newProdutos = [...produtos, ""];
    const newQuantidade = [...quantidade, 0];
    setProdutos(newProdutos);
    setQuantidade(newQuantidade);
  };

  const handleDelete = (i, e) => {
    e.preventDefault();
    const values = [...produtos];
    values.splice(i, 1);
    setProdutos(values);
  };

  const handleCloseModal = () => {
    if(onEdit) {
      setShowEditModal(false);
    } else {
      setShowModal(false);
      setProdutos([""]);
      setProdutoList([]);
      setClienteList([]);
      setVendedor("");
      setData("");
    }
  };

  const handleShowModal = () => {
    setOnEdit(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const valores = produtoValues.map((produto, i) => quantidade[i] * produto.precoVenda);
    const valorTotal = valores.reduce((total, valor) => total + valor, 0);
  
    const vendaItensData = produtoList.map((produtoId, i) => {
      return {
        produtoId: parseInt(produtoId),
        quantidade: parseInt(quantidade[i]),
      };
    });
  
    await axios
      .post("http://localhost:8080/venda", {
        clienteId: parseInt(clienteList),
        vendedor,
        data,
        vendaItens: vendaItensData,
        valor: parseFloat(valorTotal),
      })
      .then(() => toast.success("Venda cadastrada com sucesso"))
      .catch((error) => console.error(error));
  
    handleCloseModal();
    getVendas();
  };

  return (
  <div>
	  {/* Botão para cadastrar nova venda */}
    <button className='btn btn-primary ms-3' onClick={handleShowModal}>
      <BiAddToQueue /> novo cadastro
    </button>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BiAddToQueue /> CADASTRO 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
          <div className="mb-3"> 
              <label className="form-label">Cliente:</label>
              <select name="cliente" className="custom-select form-select mb-3" 
                value={clienteList}
                onChange={(e) => { const selectedClientId = e.target.value;
                setClienteList(selectedClientId);}}>
                <option value="" disabled hidden>Selecione um cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="data" className="form-label">Data: </label>
              <input id="data" type="date" className="form-control" value={data} onChange={(e) => setData(e.target.value)}/>
            </div>
            {produtos.map((produto, i) => {
  return (
    <div key={i} className="row mb-3">
      <label htmlFor="produto-list" className="form-label">Produto: </label>
      <div className="input-group">
        <select
          id="produtoList"
          className="form-select"
          style={{ width: "50%" }}
          value={produtoList[i] || ""}
          onChange={(e) => {
            const selectedProductId = e.target.value;
            const updatedProdutoList = [...produtoList];
            updatedProdutoList[i] = selectedProductId;
            setProdutoList(updatedProdutoList);
          }}
        >
          <option value="" disabled hidden>Selecione um produto</option>
          {produtoValues.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nome}
            </option>
          ))}
        </select>
        <span className="input-group-text text-muted" style={{width: "25%", fontSize: "15px"}}>Quantidade: </span>
                <input
                type="number"
                id="quantidade"
                className="form-control"
                style={{ width: "15%" }}
                value={quantidade[i] || ""}
                onChange={(e) => {
                  const selectedQuantidade = e.target.value;
                  const inputQuantidade = [...quantidade];
                  inputQuantidade[i] = selectedQuantidade;
                  setQuantidade(inputQuantidade);
                }}
              />
        {i > 0 && (
          <button type="button" className="btn btn-outline-danger" onClick={(e) => handleDelete(i, e)}>
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
})}
            <div className="mb-3">
              <button onClick={handleAdd} className="btn btn-outline-primary" type="button">Adicionar</button>
            </div>
            <div className="mb-3">  
              <label className="form-label">Vendedor:</label>
              <input value={vendedor} onChange={(e) => setVendedor(e.target.value)} className="form-control" />
            </div>
            <Button variant="success" type="submit">
              SALVAR
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            FECHAR
          </Button>
        </Modal.Footer>
      </Modal>
	</div>
  );
};

export default FormVenda;