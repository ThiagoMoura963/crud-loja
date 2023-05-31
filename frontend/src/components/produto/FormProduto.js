import React, {useRef, useState, useEffect} from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const FormProduto = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleShowModal = () => {
	setShowModal(true);
  };


  return (
    <div>
	  {/* Borão para cadastrar novo produto */}	
	  <button className='btn btn-primary ms-3' onClick={handleShowModal}>
	  <BiAddToQueue /> novo cadastro	
	  </button>

	  {/* Modal */}
	  <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Cadastrar Produto 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Nome do produto: </label>
              <input name="nome" type="text" className="form-control"/>
            </div>
            <div className="mb-3">
              <label>Descrição: </label>
              <textarea name="descricao" className="form-control" rows="3"/>
            </div>
            <div className="mb-3">
              <label>Marca: </label>
              <input name="marca" type="text" className="form-control"/>
            </div>
			<div className="mb-3">
              <label>Fornecedor: </label>
              <input name="fornecedor" type="text" className="form-control"/>
            </div>
			<div className="mb-3">
              <label>classificacao: </label>
              <input name="classificacao" type="text" className="form-control"/>
            </div>
			<div className="mb-3">
              <label>Preço de custo: </label>
              <input name="precoCusto" type="number" className="form-control"/>
            </div>
			<div className="mb-3">
              <label>Preço de venda: </label>
              <input name="precoVenda" type="number" className="form-control"/>
            </div>
			<div className="mb-3">
              <label>Unidades em estoque: </label>
              <input name="qtdEstoque" type="number" className="form-control"/>
            </div>
			<div className="mb-3">
              <label>Unidades na loja: </label>
              <input name="qtdLoja" type="number" className="form-control"/>
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

export default FormProduto;