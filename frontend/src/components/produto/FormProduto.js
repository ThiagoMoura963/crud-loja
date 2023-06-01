import React, {useRef, useState, useEffect} from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { IMaskInput } from "react-imask";
import axios from 'axios';

const FormProduto = ({ getProdutos, setOnEdit, onEdit, showEditModal, setShowEditModal }) => {
  const nomeRef = useRef(null);
  const descricaoRef = useRef(null);
  const marcaRef = useRef(null);
  const fornecedorRef = useRef(null);
  const classificacaoRef = useRef(null);
  const precoCustoRef = useRef(null);
  const precoVendaRef = useRef(null);
  const qtdEstoqueRef = useRef(null);
  const qtdLojaRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
	if(onEdit) {
		nomeRef.current.value = onEdit.nome;
		descricaoRef.current.value = onEdit.descricao;
		marcaRef.current.value = onEdit.marca;
		fornecedorRef.current.value = onEdit.fornecedor;
		classificacaoRef.current.value = onEdit.classificacao;
		precoCustoRef.current.value = onEdit.precoCusto;
		precoVendaRef.current.value = onEdit.precoVenda;
		qtdEstoqueRef.current.value = onEdit.qtdEstoque;
		qtdLojaRef.current.value = onEdit.qtdLoja;
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
	  !nomeRef.current.value ||	
	  !descricaoRef.current.value ||	
	  !marcaRef.current.value ||	
	  !fornecedorRef.current.value ||	
	  !classificacaoRef.current.value ||	
	  !precoCustoRef.current.value ||	
	  !precoVendaRef.current.value ||	
	  !qtdEstoqueRef.current.value ||	
	  !qtdLojaRef.current.value 	
	) {
	  return toast.warn("Preencha todos os campos!");
	}

	if(onEdit) {
	  await axios
	    .put("http://localhost:8080/produto/" + onEdit.id, {
		  nome: nomeRef.current.value,
		  descricao: descricaoRef.current.value,	
		  marca: marcaRef.current.value,	
		  fornecedor: fornecedorRef.current.value,	
		  classificacao: classificacaoRef.current.value,	
		  precoCusto: parseFloat(precoCustoRef.current.value),	
		  precoVenda: parseFloat(precoVendaRef.current.value),	
		  qtdEstoque: parseInt(qtdEstoqueRef.current.value),	
		  qtdLoja: parseInt(qtdLojaRef.current.value),		
		})	
		.then(({ data }) => toast.success(data.message))
		.catch((error) => console.error(error));
	} else {
	  await	axios
	    .post("http://localhost:8080/produto", {
		  nome: nomeRef.current.value,
		  descricao: descricaoRef.current.value,	
		  marca: marcaRef.current.value,	
		  fornecedor: fornecedorRef.current.value,	
		  classificacao: classificacaoRef.current.value,	
		  precoCusto: parseFloat(precoCustoRef.current.value),	
		  precoVenda: parseFloat(precoVendaRef.current.value),	
		  qtdEstoque: parseInt(qtdEstoqueRef.current.value),	
		  qtdLoja: parseInt(qtdLojaRef.current.value),		
		})	
		.then(() => toast.success("Produto cadastrado com sucesso"))
		.catch((error) => console.error(error));
	}

	nomeRef.current.value = ""
	descricaoRef.current.value = ""
	marcaRef.current.value = ""
	fornecedorRef.current.value = ""
	classificacaoRef.current.value = ""
	precoCustoRef.current.value = ""
	precoVendaRef.current.value = ""
	qtdEstoqueRef.current.value = ""
	qtdLojaRef.current.value = ""

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
		  {onEdit && Object.keys(onEdit).length > 0 ? 
          (<span>Editar Cliente</span>) : 
          (<span>Cadastrar Cliente</span>)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="nome" className="form-label">Nome do produto: </label>
              <input id="nome" type="text" className="form-control" ref={nomeRef}/>
            </div>
            <div className="mb-3">
              <label for="descricao" className="form-label">Descrição: </label>
              <textarea id="descricao" name="descricao" className="form-control" rows="3" ref={descricaoRef}/>
            </div>
            <div className="mb-3">
              <label for="marca" className="form-label">Marca: </label>
              <input id="marca" type="text" className="form-control" ref={marcaRef}/>
            </div>
			<div className="mb-3">
              <label for="fornecedor" className="form-label">Fornecedor: </label>
              <input id="fornecedor" type="text" className="form-control" ref={fornecedorRef}/>
            </div>
			<div className="mb-3">
              <label for="classificacao" className="form-label">classificacao: </label>
              <input id="classificacao" type="text" className="form-control" ref={classificacaoRef}/>
            </div>
			<div className="row mb-3">
			  <div className='col'>
                <label for="precoCusto" className="form-label">Preço de custo: </label>
                <IMaskInput mask={Number} radix="." id="precoCusto" type="text" className="form-control" inputRef={precoCustoRef}/>
			  </div>
			  <div className="col">
                <label for="precoVenda" className="form-label">Preço de venda: </label>
                <IMaskInput mask={Number} radix="." id="precoVenda" type="text" className="form-control" inputRef={precoVendaRef}/>
			  </div>
            </div>
			<div className="row mb-3">
			  <div className="col">	
                <label for="qtdEstoque" className="form-label">Unidades em estoque: </label>
                <input id="qtdEstoque" type="number" className="form-control" ref={qtdEstoqueRef}/>
			  </div>
			  <div className="col">
                <label for="qtdLoja" className="form-label">Unidades na loja: </label>
                <input id="qtdLoja" type="number" className="form-control" ref={qtdLojaRef}
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