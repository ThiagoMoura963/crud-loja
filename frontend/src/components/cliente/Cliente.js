import React from 'react';
import Grid from './Grid';
import Form from './Form';
import { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';

const Cliente = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);


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
	  <div className="ms-4 mb-4">
		  <h2><FaUserAlt /> Clientes</h2>
	  </div>
	  
	  <hr className="custom-hr" />

      <div className=" mt-4 d-flex">
        <Form  getUsers={getUsers} onEdit={onEdit} setOnEdit={setOnEdit
        } showEditModal={showEditModal} setShowEditModal={setShowEditModal} 
         />
      </div>
      <div className="mt-4">
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}showEditModal={showEditModal}
        setShowEditModal={setShowEditModal} setShowModal={setShowModal} showModal={showModal} />
      </div>
    </div>
  );
};

export default Cliente;