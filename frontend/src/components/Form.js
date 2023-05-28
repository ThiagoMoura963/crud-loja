import React, { useRef } from 'react';
import { BiAddToQueue } from "react-icons/bi";

const Form = () => {
  const ref = useRef();
  return (
    <div>
      {/* Botão para cadastrar novo cliente */}
      <button className='btn btn-primary btn-sm ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal"> 
	  <BiAddToQueue /> novo cadastro
      </button>
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> 
			    <BiAddToQueue /> 
			    CADASTRO
			  </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form ref={ref}>
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
                  <input name="fone" type="text" className="form-control"/>
                </div>
              </form>
              <button type="submit" className="btn btn-success">SALVAR</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
              {/*<button type="button" className="btn btn-primary">Save changes</button>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;