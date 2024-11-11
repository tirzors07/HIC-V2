import React from "react";
import { useNavigate } from "react-router-dom";//es para redireccionar
import axios from "axios";//es para poder hacer peticiones
import { useState, useEffect } from "react";
//import { ShopContext } from "../../context/shop-context";//se importa el contexto
import { useContext } from "react";

const URI = 'http://ip_ec2:3306/user/';//ruta para hacer las peticiones

const Login = () => {
    const navigate = useNavigate();
    const navigateRegister = () => {
        navigate('/register')
    }
}