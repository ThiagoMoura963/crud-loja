import React, { useEffect, useState } from "react";
import FormProduto from "./FormProduto";
import { FaShoppingBag } from 'react-icons/fa';
import axios from "axios";
import GridProduto from "./GridProduto";

const Produto = () => {	
  const [produtos, setProdutos]	= useState([]);

  const getProdutos = async () => {
    try {
	  const res = await axios.get("http://localhost:8080/produtos")	
	  setProdutos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
	} catch (error) {
	  console.error(error);	
	}
  };

  useEffect(() => {
    getProdutos();
  }, [setProdutos]);

  return (
	<div>
	  <div className="ms-4 mb-4">
	    <h2><FaShoppingBag /> Produtos</h2>
	  </div>

	  <hr className="custom-hr" />

	  <div className="mt-4 d-flex">
		<FormProduto />
	  </div>
	  <div className="mt-4">
	    <GridProduto produtos={produtos} setProdutos={setProdutos} />	
	  </div>

	</div>
  );
};
export default Produto;