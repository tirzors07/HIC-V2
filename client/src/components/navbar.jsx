import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PharmacyContext } from "../context/pharmacy-context";

export const Navbar = () => {
  const { logged, admin, logoutUser } = useContext(PharmacyContext);

  return (
    <div className="navbar">
      {!logged ? (
        <Link to="/login">Iniciar Sesión</Link>
      ) : admin ? (
        <div>
          <Link to="/editInventory">Editar Inventario</Link>
          <Link to="/editAdmin">Perfil Admin</Link>
          <button onClick={logoutUser}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <Link to="/cargar-receta">Subir Receta</Link>
          <Link to="/seguimiento-pedido">Seguimiento Pedido</Link>
          <Link to="/notificaciones">Notificaciones</Link>
          <button onClick={logoutUser}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
};
