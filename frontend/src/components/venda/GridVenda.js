import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Modal } from 'react-bootstrap';
import DeleteAlert from '../DeletAlert';
import axios from 'axios';

const GridVenda = ({ vendas, setVendas, setOnEdit, setShowEditModal, setShowModal }) => {
  const [showModalItens, setShowModalItens] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEdit = (item) => {
    setOnEdit(item);
	setShowEditModal(true);
	setShowModal(false);	
  };

  const handleDelete = async (nroVenda) => {
    await axios
	.delete("http://localhost:8080/venda/" + nroVenda)
	.then(({ data }) => {
	  const newArray = vendas.filter((venda) => venda.nroVenda !== nroVenda);
	  
	  setVendas(newArray);
	  toast.success(data.message);
	})	
	.catch((error) => console.error(error));

	setOnEdit(null);
  };

  const openDeleteAlert = (nroVenda) => {
    setSelectedUserId(nroVenda);
	setShowDeleteAlert(true);
  };

  const closeDeleteAlert = () => {
	setShowDeleteAlert(false);
  };

  const confirmDelete = () => {
	if (selectedUserId) {
	  handleDelete(selectedUserId);
	  closeDeleteAlert();
	}
  };
 
  const openModalItens = () => {
    setShowModalItens(true);
  };

  const closeModalItens = () => {
	setShowModalItens(false);
  }

  return (
    <div className="d-flex justify-content-center">
	  <DeleteAlert 
	  show={showDeleteAlert}
	  onCancel={closeDeleteAlert}
	  onConfirm={confirmDelete} 
	  />   	
	  <Modal 
	  show={showModalItens}
      onHide={closeModalItens}
	  >
		<Modal.Header closeButton>
	      <Modal.Title>
			Detalhes
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
      		{vendas.map((item) => (
        	  item.vendaItens.map((vendaItem, j) => (
                <tr key={j}>
                  <td>{vendaItem.nomeProduto}</td>
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
		<th scope="col" colSpan={2}></th>
		</tr>
	  </thead>
	  <tbody>
		{vendas.map((item, i) => (
		  <tr key={i}>
		    <td>
  			  {item.vendaItens.map((vendaItem, j) => (
    		  <div key={j}>{vendaItem.nomeCliente}</div>
  		  ))}
			</td>			
			<td>{format(new Date(item.data), 'dd/MM/yyyy')}</td> 
			<td>
  			  <a className="link-opacity-50" href="#" onClick={openModalItens}>
    			Produtos
  			  </a>
    		</td>            
			<td>R${item.valor.toFixed(2)}</td> 
            <td>{item.vendedor}</td> 
			<td>
			  <FaEdit 
			  title="Editar"
			  onClick={() => handleEdit(i)}
			  style={{cursor: "pointer"}}
			  />	
			</td>
			<td>
			  <FaTrash 
			  title="Deletar"
			  onClick={() => openDeleteAlert(item.nroVenda)}
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