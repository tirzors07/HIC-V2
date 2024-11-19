import React, { useState, useEffect } from "react";
import './login.css'; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 

const URI = 'http://localhost:3000/user';  // Ruta del backend

const Login = () => {
    const navigate = useNavigate();
    
    const navigateRegister = () => {
        navigate(`/register`);
    }

    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [user, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        try {
            const res = await axios.get(URI);  // Solicitar usuarios
            console.log(res.data);
            setUsers(res.data);  // Actualizar usuarios en el estado
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    const compare = () => {
        if (user.find(e => e.email === correo && e.password_ === contraseña))
            return true;
        else
            return false;
    };

    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/login', {
                email: correo,
                password: contraseña
            });
            

            if (response.status === 200) {
                alert("Login exitoso");
                navigate('/dashboard'); // Redirige al dashboard o página principal
            }
        } catch (error) {
            alert("Correo o contraseña incorrectos!!");
            console.error(error);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                loginUser();  // Llamar a la función loginUser
            }}>
                <input
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    type="email" name="email" id="email" placeholder="Correo electrónico" />
                <input
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    type="password" name="password" id="password" placeholder="Contraseña" />
                <input type="submit" className="btn-login" value="Login" />
            </form>
            <div className="btn-register" onClick={navigateRegister}>
                Regístrate
            </div>
        </div>
    );
};

export default Login;
