import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BiStore, BiMenu, BiHome, BiUser } from 'react-icons/bi';
import GlobalStyle from './styles/global.js'
import Cliente from './components/Cliente.js';
import Home from './components/Home.js';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* NavBar */}
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <BiStore /> LOJA
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabIndex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                  <BiMenu /> Menu
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <BiHome /> Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/clientes">
                      <BiUser /> Clientes
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Rotas */}
        <div style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Cliente />} />
          </Routes>
        </div>
        {/* Estilos globais */}
        <GlobalStyle />

        {/* Toasts */}
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      </div>
    </BrowserRouter>
  );
}

export default App;