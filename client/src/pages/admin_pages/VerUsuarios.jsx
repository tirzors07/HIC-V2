import React, { useState, useEffect } from "react";
import axios from "axios"; 

const VerUsuarios = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [userMsgOpen, setUserMsg] = useState(false);

  useEffect( () => {
    getUsers();
  }, [page]);

  const getUsers = async () => {
    try{
      const response = await axios.get("http://localhost:3000/user/", {
        params: {page} 
      });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch(error){
      alert("No se pudo obtener la informacion de los usuarios");
      console.log("Error al obtener usuarios");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(search){
      const foundUser = users.find(user => user.user_id.toString() === search);
      if(foundUser){
        setFoundUser(foundUser);
        setUserMsg(true);
      } else{
        alert("No se encontro un usuario con ese ID");
        setFoundUser(null);
      }
    } else{
      alert("Ingrese un ID para buscar");
      setFoundUser(null);
    }
  };

  const handleUserMsg = () => {
    setUserMsg(false);
  };

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl font-bold mb-8">Lista de Usuarios en el Sistema</h2>

        <form onSubmit={handleSearch}
          className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Ingrese una ID de usuario"
              className="p-2 border border-gray-300 rounded-md bg-white">
            </input>
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-500 text-white, rounded-md">
              Buscar
            </button>
        </form>

        <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
          {users.map((user) => (
            <li key={user.user_id} className="border-b last:border-0 p-2">
                <p><strong>ID: </strong>{user.user_id}</p>
                <p><strong>Tipo de usuario: </strong>{user.role}</p>
                <p><strong>Nombre: </strong>{user.name_}</p>
                <p><strong>Correo Electronico: </strong>{user.email}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
            disabled={page === 1}
            className="p-2 bg-gray-300 rounded-md mx-2" >
            Anterior
          </button>
          <span className="py-2">Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage(prevPage => Math.max(prevPage + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 bg-gray-300 rounded-md mx-2" >
            Siguiente
          </button>
        </div>

        {userMsgOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
          <div className="relative top-1/4 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white"> 
            <button 
              onClick={handleUserMsg} 
              className="absolute top-0 right-0 m-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Aceptar
            </button> 
            {foundUser && ( 
              <div> 
                <h3 className="text-xl font-bold mb-4">
                  Detalles del Usuario:
                </h3> 
                <p><strong>ID: </strong> {foundUser.user_id}</p> 
                <p><strong>Tipo de usuario: </strong> {foundUser.role}</p> 
                <p><strong>Nombre: </strong> {foundUser.name_}</p> 
                <p><strong>Correo Electronico: </strong> {foundUser.email}</p> 
              </div> )} 
            </div> 
          </div>
      )}
      </div>
    );
  };
  
  export default VerUsuarios;