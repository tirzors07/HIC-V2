
/*import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar.jsx";
import Login from "./pages/login/login.jsx";
import UploadPrescription from "./pages/uploadPrescription/uploadPrescription";
import OrderTracking from "./pages/orderTracking/orderTracking";
import Notifications from "./pages/notifications/notifications";
import { PharmacyContextProvider } from "./context/pharmacy-context";

function App() {
  return (
    <div className="App">
      <PharmacyContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cargar-receta" element={<UploadPrescription />} />
            <Route path="/seguimiento-pedido" element={<OrderTracking />} />
            <Route path="/notificaciones" element={<Notifications />} />
          </Routes>
        </Router>
      </PharmacyContextProvider>
    </div>
  );
}

export default App;*/
/*import React from "react";
import Login from "./pages/login/login.jsx"; // Importas solo el componente Login

const App = () => {
  return (
    <Login />  
  );
};

export default App;*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import SeguimientoPedido from './components/SeguimientoPedido'; 
import UploadComponent from "./components/UploadComponent";
import Login from "./pages/login/login"; // Importas solo el componente Login
import logo from './assets/logo.png'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col w-screen items-center">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo de la Empresa" className="h-10" />
            </Link>
          </div>
          <Link to="/login" className="text-white bg-blue-500 rounded-2xl px-3 py-1 hover:bg-blue-700">Acceder</Link>
        </header>

        <main className="flex-grow container w-screen p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cargar-receta" element={<UploadPage />} />
            <Route path="/seguimiento-pedido" element={<SeguimientoPedido />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <footer className="bg-gray-200 text-center p-4 w-screen">
          <p>&copy; 2024 Farmacia Online. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

// Componente para la página de carga de recetas
const UploadPage = () => {
  return (
    <div style={styles.appContainer}>
      <UploadComponent />  {/* Componente de carga */}
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    width: '100%',
    textAlign: 'center',
    marginTop: '20px',
  },
  title: {
    margin: '10px 0',
  },
};

export default App;