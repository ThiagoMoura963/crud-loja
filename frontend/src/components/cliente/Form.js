import React, { useRef, useState } from 'react';
import { BiAddToQueue } from "react-icons/bi";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const Form = ({ getUsers }) => {
  const ref = useRef();

  const [nome, setNome] = useState('');

  const handleInputChange = (e) => {
  const onlyLetters = e.target.value.replace(/[^A-Za-z]/g, '');

  setNome(onlyLetters);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.endereco.value ||
      !user.compras.value ||
      !user.telefone.value
    ) {
      return toast.warn("Preencha todos os campos!");
    } else {
      try {
        await axios.post("http://localhost:8080/cliente", {
          nome: user.nome.value,
          endereco: user.endereco.value,
          compras: parseInt(user.compras.value),
          telefone: user.telefone.value,
        });

        toast.success("Cliente cadastrado com sucesso");

        user.nome.value = "";
        user.endereco.value = "";
        user.compras.value = "";
        user.telefone.value = "";

        handleCloseModal();

        getUsers();
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <div>
      {/* Botão para cadastrar novo cliente */}
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
          <form ref={ref} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome:</label>
              <input name="nome" type="text" className="form-control" value={nome} onChange={handleInputChange}/>
            </div>
            <div className="mb-3">
              <label>Endereço:</label>
              <input name="endereco" type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Compras:</label>
              <input name="compras" type="number" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Telefone:</label>
              <InputMask mask="(99)99999-9999" name="telefone" type="text" className="form-control"/>
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