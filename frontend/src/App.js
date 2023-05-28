import GlobalStyle from './styles/global.js';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Form from './components/Form.js';
import Grid from './components/Grid.js';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
	
	const getUsers = async() => {
	  try {
		const res = await axios.get("http://localhost:8080/clientes");
		setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1: -1)));
	  } catch (error) {
		toast.error(error);
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
      <div className="mt-3 w-75 ">
        <Grid users={users}/>
      </div>
      <GlobalStyle/>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </div>
  );
}

export default App;
