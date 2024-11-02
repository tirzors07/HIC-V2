import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import SeguimientoPedido from './components/SeguimientoPedido'; 
import UploadComponent from "./components/UploadComponent";
import OrderTracking from './components/OrderTracking'; // Nueva importación
import Notification from './components/Notification';   // Nueva importación
import logo from './assets/logo.png'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col w-screen items-center">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
          <img src={logo} alt="Logo de la Empresa" className="h-10" />
          <h1 className="text-2xl font-bold">Farmacia Online</h1>
        </header>

        <main className="flex-grow container w-screen p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cargar-receta" element={<UploadPage />} />
            <Route path="/seguimiento-pedido" element={<SeguimientoPedido />} />
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
