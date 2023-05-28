import React from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';

const Grid = ({ users }) => {
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
			          <td width="30%">{item.compras}</td>
			          <td width="30%">{item.telefone}</td>
			          <td>
			            <FaEdit style={{cursor: "pointer"}} />
			          </td>
			          <td>
			            <FaTrash style={{cursor: "pointer"}} />	
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