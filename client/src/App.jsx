import "./App.css";
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import { Navbar } from "./components/navbar.jsx";
import SeguimientoPedido from './pages/order_tracking/SeguimientoPedido.jsx'; 
import UploadComponent from "./pages/request_order/UploadComponent.jsx";
import Login from "./pages/login/login"; // Importas solo el componente Login
import Register from "./pages/register/registrar_usuario_general.jsx" //Importacion de pagina de registro
import UserProfile from "./pages/user_profile/user_profile.jsx"
import HistorialOrdenes from "./pages/historial_ordenes/historial_ordenes.jsx";
import logo from './assets/logo.png'; 
import { PharmacyContextProvider } from "./context/pharmacy-context";

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect( () => {
      const user = JSON.parse(localStorage.getItem("usuarioActual"));
      setCurrentUser(user);
  }, [] );

  const handleUserButton = () => {
    if(currentUser === null){
      window.location.href = "/login";
    } else {
      setIsMenuOpen( (prev) => !prev );
    }
  };

  const handleMenuOption = (option) => {
    setIsMenuOpen(false);
    if( option === "profile" ){
      window.location.href = "/user-profile";
    }else if( option === "orders" ){
      window.location.href = "/user-orders";
    } else if( option === "logout"){
      localStorage.removeItem("usuarioActual");
      setCurrentUser(null);
      window.location.href = "/";
    }
  };

  return (
    <PharmacyContextProvider>
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col w-screen items-center">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo de la Empresa" className="h-10" />
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={handleUserButton} 
              className="text-white bg-blue-500 rounded-2xl px-3 py-1 hover:bg-blue-700">
              {currentUser ? `Hola ${currentUser.name}` : 'Acceder'}
            </button>
            {isMenuOpen && currentUser && (
              <div className="absolute right-0 mt-2 w-48 bg-blue-500 border border-gray-300 rounded-lg shadow-lg z-50">
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                    onClick={()=> handleMenuOption("profile")}
                    >
                      Ver Perfil
                    </li>
                    <li
                    className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                    onClick={()=> handleMenuOption("orders")}
                    >
                      Historial de Ordenes
                    </li>
                    <li
                    className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                    onClick={()=> handleMenuOption("logout")}
                    >
                      Cerrar Sesión
                    </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <Navbar />
        <main className="flex-grow container w-screen p-4">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/cargar-receta" element={<UploadComponent />} />
            <Route path="/seguimiento-pedido" element={<SeguimientoPedido />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-orders" element={<HistorialOrdenes />} />
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