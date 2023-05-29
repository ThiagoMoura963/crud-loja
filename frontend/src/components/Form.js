import axios from 'axios';
import React, { useRef } from 'react';
import { BiAddToQueue } from "react-icons/bi";
import { toast } from 'react-toastify';
import { useState } from 'react';


const Form = ({ getUsers }) => {
  const ref = useRef();

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

    await axios
      .post("http://localhost:8080/cliente", {
        nome: user.nome.value,
        endereco: user.endereco.value,
        compras: parseInt(user.compras.value),
        telefone: user.telefone.value,
      })
      .then(({ data }) => toast.success(data.message))
      .catch((error) =>  toast.error(error.response.data.error));
    }

    user.nome.value = "";
    user.endereco.value = "";
    user.compras.value = "";
    user.telefone.value = "";

      
      getUsers();
  };
  

  return (
    <div>
      {/* Botão para cadastrar novo cliente */}
      <button className='btn btn-primary ms-3' onClick={handleShowModal} data-bs-toggle="modal" data-bs-target="#exampleModal"> 
	  <BiAddToQueue /> novo cadastro
      </button>
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> 
			          <BiAddToQueue /> CADASTRO
			        </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form ref={ref} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nome:</label>
                  <input name="nome" type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label>Endereço:</label>
                  <input name="endereco" type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label>Compras:</label>
                  <input name="compras" type="number" className="form-control"/>
                </div>
				        <div className="mb-3">
                  <label>Telefone:</label>
                  <input name="telefone" type="text" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-success">SALVAR</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">FECHAR</button>
              {/*<button type="button" className="btn btn-primary">Save changes</button>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;