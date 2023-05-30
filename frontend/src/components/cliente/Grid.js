import React from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import DeleteAlert from "../DeletAlert";
import { useState } from "react";

const Grid = ({ users, setUsers, setOnEdit, setShowEditModal, setShowModal }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEdit = (item) => {
    setOnEdit(item);
    setShowEditModal(true); 
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await axios 
    .delete("http://localhost:8080/cliente/" + id)
    .then(({ data }) => {
      const newArray = users.filter((user) => user.id !== id);

      setUsers(newArray);
      toast.success(data.message);
    })
    .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  const openDeleteAlert = (id) => {
    setSelectedUserId(id);
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

  return (
	  <div className="d-flex justify-content-center" >
      <DeleteAlert
        show={showDeleteAlert}
        onCancel={closeDeleteAlert}
        onConfirm={confirmDelete}
      />

     <table className="table table-hover table-striped w-75">
        <thead>	
          <tr className="bg-dark text-white"> 
            <th scope="col">Nome</th>
            <th scope="col">Endereço</th>
            <th scope="col">Compras</th>
            <th scope="col">Telefone</th>
			      <th scope="col"></th>
			      <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
		      {users.map((item, i) => (
		          <tr key={i}>
			          <td width="30%">{item.nome}</td>
			          <td width="30%">{item.endereco}</td>
			          <td width="10%">{item.compras}</td>
			          <td width="20%">{item.telefone}</td>
			          <td>
			            <FaEdit title="Editar"
                  onClick={() => {
                  handleEdit(item);
                  }}                  
                  style={{cursor: "pointer"}} 
                  />
			          </td>
			          <td>
			            <FaTrash title="Deletar"
                  onClick={() => openDeleteAlert(item.id)}
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

export default Grid;