import React from 'react';
import Grid from './Grid';
import Form from './Form';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Cliente = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/clientes');
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <div>
	  <div className="ms-3">
		<h2>crud</h2>
	  </div>
      <div className="d-flex">
        <Form />
      </div>
      <div className="mt-3 w-75">
        <Grid users={users} />
      </div>
    </div>
  );
};

export default Cliente;