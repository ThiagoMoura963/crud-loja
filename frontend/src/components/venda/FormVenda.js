import React, { useRef, useState, useEffect } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';

const FormVenda = () => {
  const [showModal, setShowModal] = useState(false);
  const [produtos, setProdutos] = useState([""]);

  const handleChange = (onChangeValue, i) => {
    const inputData=[...produtos];
    inputData[i] = onChangeValue.target.value;  
    setProdutos(inputData);
  };

  const handleAdd = () => {
    const values = [...produtos, []];
    setProdutos(values);
  };

  const handleDelete = (i, e) => {
    e.preventDefault();
    const values = [...produtos];
    values.splice(i, 1);
    setProdutos(values);
  };

  const handleShowModal = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
      setShowModal(false);
      setProdutos([""]);
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
          <form>
          <div className="mb-3">
              <label className="form-label">Cliente:</label>
              <select name="cliente" className="custom-select form-select mb-3">
                <option value="" disabled selected hidden>Selecione um cliente</option>
                <option value="opcao1">Opção 1</option>
                <option value="opcao2">Opção 2</option>
                <option value="opcao3">Opção 3</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="data" className="form-label">Data: </label>
              <input id="data" type="date" className="form-control" />
            </div>
            {produtos.map((produto, i) => { 
              return (
            <div key={i} className="row mb-3" onChange={(e) => handleChange(e, i)}>
              <label htmlFor="produto" className="form-label">Produto: </label>
              <div className="input-group">
                <select id="produto" class="form-select" style={{width: "50%"}}>
                  <option value="" disabled selected hidden>Selecione um produto</option>
                  <option value="produto1">Produto 1</option>
                  <option value="produto2">Produto 2</option>
                  <option value="produto3">Produto 3</option>
                </select>
                <span className="input-group-text text-muted" style={{width: "25%", fontSize: "15px"}}>Quantidade: </span>
                <input type="number" className="form-control" style={{width: "15%"}} />
                {i > 0 && (
                  <button type="button" className="btn btn-outline-danger" onClick={(e) => handleDelete(i, e)}><FaTrash /></button> 
                )}
              </div>
              <div className="mt-2">
              </div>
            </div> 
              )
            })}
            <div className="mb-3">
              <button onClick={handleAdd} className="btn btn-outline-primary" type="button">Adicionar</button>
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