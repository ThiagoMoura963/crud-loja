import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';
import DeleteAlert from '../DeletAlert';
import axios from 'axios';

const GridVenda = ({ vendas, setVendas }) => {
  const [showModalItens, setShowModalItens] = useState(false);

  const openModalItens = () => {
    setShowModalItens(true);
  };

  const closeModalItens = () => {
	setShowModalItens(false);
  }

  return (
    <div className="d-flex justify-content-center">
	  <DeleteAlert />   	
	  <Modal 
	  show={showModalItens}
      onHide={closeModalItens}
	  >
		<Modal.Header closeButton>
	      <Modal.Title>
			Itens
		  </Modal.Title>	
		</Modal.Header>
		<Modal.Body>
		<table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
      		  </tr>
    	  </thead>
    	  <tbody>
      		{vendas.map((item, i) => (
        	  item.vendaItens.map((vendaItem, j) => (
                <tr key={j}>
                  <td>{vendaItem.produto.nome}</td>
                  <td>{vendaItem.quantidade}</td>
                </tr>
             ))
           ))}
         </tbody>
       </table>		
	  </Modal.Body>
    </Modal>
	<table className='table table-hover table-striped w-75'>
	  <thead>
		<tr className='bg-dark text-white'>
        <th scope="col">Cliente</th>
		<th scope="col">Data</th>
		<th scope="col">Itens</th>
		<th scope="col">Valor</th>
		<th scope="col">Vendedor</th>
		<th scope="col"></th>
		<th scope="col"></th>
		<th scope="col"></th>
		</tr>
	  </thead>
	  <tbody>
		{vendas.map((item, i) => (
		  <tr key={i}>
            <td>{item.cliente.nome}</td> 
			<td>{format(new Date(item.data), 'dd/MM/yyyy')}</td> 
			<td>
  			  <a className="link-opacity-50" href="#" onClick={openModalItens}>
    			Detalhes
  			  </a>
    		</td>            
			<td>R${item.valor.toFixed(2)}</td> 
            <td>{item.vendedor}</td> 
			<td>
			  <FaEdit 
			  title="Editar"
			  style={{cursor: "pointer"}}
			  />	
			</td>
			<td>
			  <FaTrash 
			  title="Deletar"
			  style={{cursor: "pointer"}}
			  />	
			</td>
		  </tr>	
		))}
	  </tbody>	
	</table>
	</div>
  );	
};

export default GridVenda;