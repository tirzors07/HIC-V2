import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import { Navbar } from "./components/navbar.jsx";
import SeguimientoPedido from './pages/order_tracking/SeguimientoPedido.jsx'; 
import UploadComponent from "./pages/request_order/UploadComponent.jsx";
import Login from "./pages/login/login"; // Importas solo el componente Login
import Register from "./pages/register/registrar_usuario_general.jsx" //Importacion de pagina de registro
import UserProfile from "./pages/user_profile/user_profile.jsx"
import logo from './assets/logo.png'; 
import { PharmacyContextProvider } from "./context/pharmacy-context";

function App() {
  return (
    <PharmacyContextProvider>
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col w-screen items-center">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center w-full rounded-3xl">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo de la Empresa" className="h-20" />
            </Link>
          </div>
          <Link 
            to="/login" 
            className="text-black bg-green-500 rounded-2xl px-4 py-1 hover:bg-yellow-400 motion-safe:hover:scale-110 transform transition-transform duration-300">
            Acceder
          </Link>
        </header>
      
        <main className="flex-grow container w-screen p-4">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/cargar-receta" element={<UploadComponent />} />
            <Route path="/seguimiento-pedido" element={<SeguimientoPedido />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<UserProfile />} />  
          </Routes>
        </main>

        <footer className="bg-gray-200 text-center p-4 w-screen">
          <p>&copy; 2024 Farmacia Online. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
    </PharmacyContextProvider>
  );
};
export default App;