import React, { createContext, useState } from "react";
import axios from "axios";

export const PharmacyContext = createContext(null);

export const PharmacyContextProvider = (props) => {
  const [logged, setLogged] = useState(false); // Estado para saber si el usuario está logeado
  const [admin, setAdmin] = useState(false); // Estado para saber si el usuario es administrador

  // Función para iniciar sesión
  const loginUser = async (credentials) => {
    try {
      const { data } = await axios.post("http://localhost:3000/login", credentials);

      // Actualizamos estados basados en el rol del usuario
      setLogged(true);
      setAdmin(data.user.role === "hic_admin");

      // Guardamos token (opcional) para solicitudes autenticadas
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    setLogged(false);
    setAdmin(false);
    localStorage.removeItem("token");
  };

  const contextValue = {
    logged,
    admin,
    loginUser,
    logoutUser,
  };

  return (
    <PharmacyContext.Provider value={contextValue}>
      {props.children}
    </PharmacyContext.Provider>
  );
};
