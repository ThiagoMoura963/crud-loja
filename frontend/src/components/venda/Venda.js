import React, {useEffect, useState} from "react";
import GridVenda from './GridVenda';
import FormVenda from './FormVenda'
import { FaShoppingCart } from 'react-icons/fa'
import axios from 'axios'

const Venda = () => {
  const [vendas, setVendas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getVendas = async () => {
    try {
	  const res = await axios.get("http://localhost:8080/vendas"); 
	  setVendas(res.data.sort((a, b) => (a.valor < b.valor ? 1 : -1)));	
	  console.log(res.data);
	} catch (error) {
	  console.error(error);	
	}
  };

  useEffect(() => {
	getVendas();
  }, [setVendas]);

  return (
    <div>
	  <div className="ms-4 mb-4">	
	  <h2><FaShoppingCart /> Vendas</h2>	
	  </div>
	  <hr className="custom-hr"/>

	  <div className="mt-4 d-flex">
		<FormVenda getVendas={getVendas} onEdit={onEdit} setOnEdit={setOnEdit} showEditModal={showEditModal} setShowEditModal={setShowEditModal}
		setShowModal={setShowModal} showModal={showModal}/>
	  </div>
	  <div className="mt-4">
		<GridVenda vendas={vendas} setVendas={setVendas} onEdit={onEdit} setOnEdit={setOnEdit} showEditModal={showEditModal}
		setShowEditModal={setShowEditModal} setShowModal={setShowModal} showModal={showModal} />
	  </div>
	</div>

  );
};

export default Venda;