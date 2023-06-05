import React, { useRef, useState, useEffect } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { IMaskInput } from "react-imask";
import axios from 'axios';

const Form = ({ getUsers, setOnEdit, onEdit, showEditModal, setShowEditModal }) => {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    if (onEdit) {
      setNome(onEdit.nome);
      setEndereco(onEdit.endereco);
      setTelefone(onEdit.telefone);
    } else {
      setNome('');
      setEndereco('');
      setTelefone('');
    }
  }, [onEdit]);


  /*const handleInputChange = (e) => {
    const onlyLetters = e.target.value.replace(/[^A-Za-z\s]/g, '');  
    setNome(onlyLetters);
  }; */

  const handleCloseModal = () => {
    if(onEdit) {
      setShowEditModal(false);
    } else {
      setShowModal(false);
    }
  };

  const handleShowModal = () => {
    setOnEdit(null);
    setShowModal(true);
    setNome('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !endereco || !telefone) {
      return toast.warn('Preencha todos os campos!');
    }

    if(onEdit) {
      await axios
        .put("http://localhost:8080/cliente/" + onEdit.id, {
          nome,
          endereco,
          telefone,
        })
        .then(({ data }) => toast.success(data.message))
        .catch(( error ) => console.error(error));
    } else {
      await axios
        .post("http://localhost:8080/cliente", {
          nome,
          endereco,
          telefone,
      })
      .then(() => toast.success("Cliente cadastrado com sucesso"))
      .catch((error) => console.error(error));
    }

    setNome('');
    setEndereco('');
    setTelefone('');

    handleCloseModal();
    getUsers();
  };
  return (
    <div>
      {/* Botão para cadastrar novo cliente */}
      <button className='btn btn-primary ms-3' onClick={handleShowModal}>
        <BiAddToQueue /> novo cadastro
      </button>

      {/* Modal */}
      <Modal show={onEdit ? showEditModal : showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
          {/* <BiAddToQueue /> CADASTRO */}
          {onEdit && Object.keys(onEdit).length > 0 ? 
          (<span>Editar Cliente</span>) : 
          (<span>Cadastrar Cliente</span>)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome: </label>
              <input name="nome" type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Endereço: </label>
              <input name="endereco" type="text" className="form-control" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Telefone: </label>
              <IMaskInput mask="(00)00000-0000" placeholder="Ex: (99)99999-9999" value={telefone} name="telefone" type="text" className="form-control" onAccept={(value) => setTelefone(value)} onChange={(e) => setTelefone(e.target.value)}/>
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

export default Form;