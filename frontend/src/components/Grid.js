import React from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const Grid = ({ users, setUsers }) => {
  const handleDelete = async (id) => {
    await axios 
    .delete("http://localhost:8080/cliente/" + id)
    .then(({ data }) => {
      const newArray = users.filter((user) => user.id !== id);

      setUsers(newArray);
      toast.success(data.message);
    })
    .catch(({ data }) => toast.error(data));
  };

  return (
	  <div className="d-flex justify-content-center" >
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
		      {users.map((item, i) => {
		        return(
		          <tr key={i}>
			          <td width="30%">{item.nome}</td>
			          <td width="30%">{item.endereco}</td>
			          <td width="10%">{item.compras}</td>
			          <td width="20%">{item.telefone}</td>
			          <td>
			            <FaEdit title="Editar"
                  style={{cursor: "pointer"}} 
                  />
			          </td>
			          <td>
			            <FaTrash title="Deletar"
                  onClick={() => handleDelete(item.id)}
                  style={{cursor: "pointer"}} 
                  />	
			          </td>
			        </tr>
		        );	
		      })}
        </tbody>
      </table>
	  </div>
  );
};

export default Grid;