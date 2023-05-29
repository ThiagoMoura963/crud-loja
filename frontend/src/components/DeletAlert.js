import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";

const DeleteAlert = ({ show, onCancel, onConfirm }) => {

  return (
    <div>
	  <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title><FaTrash /> Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Deseja realmente deletar este cadastro?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onCancel}>
            CANCELAR
          </Button>
          <Button variant="success" onClick={onConfirm}>
            CONFIRMAR
          </Button>
        </Modal.Footer>
      </Modal>  
	</div>
  );
};

export default DeleteAlert;