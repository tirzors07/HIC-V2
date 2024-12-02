import React, { useState, useEffect } from "react";
import axios from "axios"; 

const VerUsuarios = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect( () => {
    getUsers();
  }, [page, searchTerm]);

  const getUsers = async () => {
    try{
      const response = await axios.get("http://localhost:3000/user/");
    } catch(error){
      
    }
  };

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl font-bold mb-8">Ver Lista de Usuarios del Sistema</h2>

      </div>
    );
  };
  
  export default VerUsuarios;