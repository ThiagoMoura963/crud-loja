import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteAlert from "../DeletAlert";

const GridProduto = ({ produtos, setProdutos, setOnEdit, setShowEditModal, setShowModal }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedProdutoId, setSelectedProdutoId] = useState(null);

  const handleEdit = (item) => {
    setOnEdit(item);
	setShowEditModal(true);
	setShowModal(false);
  };

  const handleDelete = async (id) => {
    await axios
	.delete("http://localhost:8080/produto/" + id)
	.then(({ data }) => {
	  const newArray = produtos.filter((produto) => produto.id !== id);
	  
	  setProdutos(newArray);
	  toast.success(data.message);
	})
	.catch((error) => console.error(error));

	setOnEdit(null);
  };

  const openDeleteAlert = (id) => {
	setSelectedProdutoId(id);
	setShowDeleteAlert(true);
  };

  const closeDeleteAlert = () => {
    setShowDeleteAlert(false);
  };

  const ConfirmDelete = () => {
	if(selectedProdutoId) {
      handleDelete(selectedProdutoId);
	  closeDeleteAlert();
	}
  };

  return (
    <div className="d-flex justify-content-center">
	  <DeleteAlert 
	  show={showDeleteAlert}
	  onCancel={closeDeleteAlert}
	  onConfirm={ConfirmDelete}
	  />	
	  <table className="table table-hover table-striped w-75">
	    <thead>	
		  <tr className="bg-dark text-white">
			<th scope="col">Nome</th>	
		    <th scope="col">Descrição</th>	
		    <th scope="col">Marca</th>	
		    <th scope="col">Fornecedor</th>	
		    <th scope="col">Classificação</th>	
		    <th scope="col">Preço de custo</th>	
		    <th scope="col">Preço de venda</th>	
		    <th scope="col">Unidades em estoque</th>	
		    <th scope="col">Unidades na loja</th>	
		    <th scope="col"></th>
		    <th scope="col"></th>
		  </tr>	
		</thead>
		<tbody>
		  {produtos.map((item, i) => (
		    <tr key={i}> 
			  <td>{item.nome}</td>
			  <td>{item.descricao}</td>
			  <td>{item.marca}</td>
			  <td>{item.fornecedor}</td>
			  <td>{item.classificacao}</td>
			  <td>{item.precoCusto}</td>
			  <td>{item.precoVenda}</td>
			  <td>{item.qtdEstoque}</td>
			  <td>{item.qtdLoja}</td>
			  <td>
		        <FaEdit 
				title="Editar" 
				onClick={() => handleEdit(item)}
				style={{cursor: "pointer"}}/>		
			  </td>
			  <td>
				<FaTrash title="Deletar" 
				onClick={() => openDeleteAlert(item.id)}
				style={{cursor: "pointer"}}/>
			  </td>
			</tr>	
		  ))}
		</tbody>
	  </table>	
	</div>	
  );
};

export default GridProduto;