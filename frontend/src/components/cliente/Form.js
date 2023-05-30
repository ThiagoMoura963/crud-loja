import React, { useRef, useState, useEffect } from 'react';
import { BiAddToQueue } from "react-icons/bi";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';

const Form = ({ getUsers, setOnEdit, onEdit, showEditModal, setShowEditModal }) => {
  const ref = useRef();
  const telefoneRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (onEdit) {
      console.log(onEdit);
      const user = ref.current;
      if (user) {
        user.nome.value = onEdit.nome;
        user.endereco.value = onEdit.endereco;
        user.compras.value = onEdit.compras;
        telefoneRef.current.value = onEdit.telefone;
      }
    }
  }, [onEdit]);

  const handleInputChange = (e) => {
    const onlyLetters = e.target.value.replace(/[^A-Za-z\s]/g, '');  
    setNome(onlyLetters);
  };

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

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.endereco.value ||
      !user.compras.value ||
      !user.telefone.value
    ) {
      return toast.warn("Preencha todos os campos!");
    } 

    if(onEdit) {
      await axios
        .put("http://localhost:8080/cliente/" + onEdit.id, {
          nome: user.nome.value,
          endereco: user.endereco.value,
          compras: parseInt(user.compras.value),
          telefone: user.telefone.value,
        })
        .then(({ data }) => toast.success(data.message))
        .catch(( error ) => console.error(error));
    } else {
        await axios.post("http://localhost:8080/cliente", {
          nome: user.nome.value,
          endereco: user.endereco.value,
          compras: parseInt(user.compras.value),
          telefone: user.telefone.value,
        })
        .then(() => toast.success("Cliente cadastrado com sucesso"))
        .catch(( error ) => console.error(error));
    }

        user.nome.value = "";
        user.endereco.value = "";
        user.compras.value = "";
        user.telefone.value = "";

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
              <InputMask mask="(99)99999-9999" name="telefone" type="text" className="form-control" ref={telefoneRef}/>
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