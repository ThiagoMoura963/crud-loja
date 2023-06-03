import React, {useRef, useState, useEffect} from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { IMaskInput } from "react-imask";
import axios from 'axios';

const FormProduto = ({ getProdutos, setOnEdit, onEdit, showEditModal, setShowEditModal }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [marca, setMarca] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [precoCusto, setPrecoCusto] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [qtdEstoque, setQtdEstoque] = useState('');
  const [qtdLoja, setQtdLoja] = useState('');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
	if(onEdit) {
	  setNome(onEdit.nome);
	  setDescricao(onEdit.descricao);
	  setMarca(onEdit.marca);
	  setFornecedor(onEdit.fornecedor);
	  setClassificacao(onEdit.classificacao);
	  setPrecoCusto(onEdit.precoCusto);
	  setPrecoVenda(onEdit.precoVenda);
	  setQtdEstoque(onEdit.qtdEstoque);
	  setQtdLoja(onEdit.qtdLoja);
	} else {
	  setNome('');
	  setDescricao('');
	  setMarca('');
	  setFornecedor('');
	  setClassificacao('');
	  setPrecoCusto('');
	  setPrecoVenda('');
	  setQtdEstoque('');
	  setQtdLoja('');
	}
  }, [onEdit]);
  
  const handleCloseModal = () => {
    if(onEdit) {
	  setShowEditModal(false);
	} else
	  setShowModal(false);
  };
  
  const handleShowModal = () => {
	setOnEdit(null);
	setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

	if(
	  !nome ||	
	  !descricao ||	
	  !marca ||	
	  !fornecedor ||	
	  !classificacao ||	
	  !precoCusto ||	
	  !precoVenda ||	
	  !qtdEstoque ||	
	  !qtdLoja	
	) {
	  return toast.warn("Preencha todos os campos!");
	}

	if(onEdit) {
	  await axios
	    .put("http://localhost:8080/produto/" + onEdit.id, {
		  nome,
		  descricao,	
		  marca,	
		  fornecedor,	
		  classificacao,	
		  precoCusto: parseFloat(precoCusto),	
		  precoVenda: parseFloat(precoVenda),	
		  qtdEstoque: parseInt(qtdEstoque),	
		  qtdLoja: parseInt(qtdLoja),		
		})	
		.then(({ data }) => toast.success(data.message))
		.catch((error) => console.error(error));
	} else {
	  await	axios
	    .post("http://localhost:8080/produto", {
		  nome,
		  descricao,	
		  marca,	
		  fornecedor,	
		  classificacao,	
		  precoCusto: parseFloat(precoCusto),	
		  precoVenda: parseFloat(precoVenda),	
		  qtdEstoque: parseInt(qtdEstoque),	
		  qtdLoja: parseInt(qtdLoja),		
		})	
		.then(() => toast.success("Produto cadastrado com sucesso"))
		.catch((error) => console.error(error));
	}

	setNome('');
	setDescricao('');
	setMarca('');
	setFornecedor('');
	setClassificacao('');
	setPrecoCusto('');
	setPrecoVenda('');
	setQtdEstoque('');
	setQtdLoja('');

	handleCloseModal();
	getProdutos();

  };

  return (
    <div>
	  {/* Borão para cadastrar novo produto */}	
	  <button className='btn btn-primary ms-3' onClick={handleShowModal}>
	  <BiAddToQueue /> novo cadastro	
	  </button>

	  {/* Modal */}
	  <Modal show={onEdit ? showEditModal : showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
		  {onEdit && Object.keys(onEdit).length > 0 ? (
    	  <span>Editar Produto</span>
  	      ) : (
          <span>Cadastrar Produto</span>
  		  )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="nome" className="form-label">Nome do produto: </label>
              <input id="nome" type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label for="descricao" className="form-label">Descrição: </label>
              <textarea id="descricao" name="descricao" className="form-control" rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label for="marca" className="form-label">Marca: </label>
              <input id="marca" type="text" className="form-control" value={marca} onChange={(e) => setMarca(e.target.value)}/>
            </div>
			<div className="mb-3">
              <label for="fornecedor" className="form-label">Fornecedor: </label>
              <input id="fornecedor" type="text" className="form-control" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)}/>
            </div>
			<div className="mb-3">
              <label for="classificacao" className="form-label">classificacao: </label>
              <input id="classificacao" type="text" className="form-control" value={classificacao} onChange={(e) => setClassificacao(e.target.value)}/>
            </div>
			<div className="row mb-3">
			  <div className='col'>
                <label for="precoCusto" className="form-label">Preço de custo: </label>
                <IMaskInput mask={Number} radix="." id="precoCusto" type="text" className="form-control" value={precoCusto.toString()} onChange={(e) => setPrecoCusto(e.target.value)} onAccept={(value) => setPrecoCusto(value)}/>
			  </div>
			  <div className="col">
                <label for="precoVenda" className="form-label">Preço de venda: </label>
                <IMaskInput mask={Number} radix="." id="precoVenda" type="text" className="form-control" value={precoVenda.toString()} onChange={(e) => setPrecoVenda(e.target.value)} onAccept={(value) => setPrecoVenda(value)}/>
			  </div>
            </div>
			<div className="row mb-3">
			  <div className="col">	
                <label for="qtdEstoque" className="form-label">Unidades em estoque: </label>
                <input id="qtdEstoque" type="number" className="form-control" value={qtdEstoque} onChange={(e) => setQtdEstoque(e.target.value)}/>
			  </div>
			  <div className="col">
                <label for="qtdLoja" className="form-label">Unidades na loja: </label>
                <input id="qtdLoja" type="number" className="form-control" value={qtdLoja} onChange={(e) => setQtdLoja(e.target.value)}
				/>
			  </div>
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