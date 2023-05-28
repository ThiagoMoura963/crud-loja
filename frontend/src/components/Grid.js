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
	  <div>
      <table className="table table-hover table-striped">
        <thead>	
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Endereço</th>
            <th scope="col">Compras</th>
            <th scope="col">Telefone</th>
			      <th scope="col"></th>
			      <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
         {/*  <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
        	<td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
		  */}
		      {users.map((item, i) => {
		        return(
		          <tr key={i}>
			          <td width="30%">{item.nome}</td>
			          <td width="30%">{item.endereco}</td>
			          <td width="10%">{item.compras}</td>
			          <td width="20%">{item.telefone}</td>
			          <td>
			            <FaEdit 
                  style={{cursor: "pointer"}} 
                  />
			          </td>
			          <td>
			            <FaTrash 
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