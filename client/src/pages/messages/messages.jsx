import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 

const Messages = () => {

    const [writingMsg, setWriting] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [receiverName, setReceiver] = useState("");
    const [receiverID, setReceiverID] = useState(null);
    const [msgContent, setContent] = useState("");
    const maxLength = 200;
  
    useEffect( () => {
        const user = JSON.parse(localStorage.getItem("usuarioActual"));
        setCurrentUser(user);
    }, []);

    const handleNewMessage = () => {
        setWriting(true);
    };

    const handleSendMsg = async() => {
        try{
            const response = await axios.post('http://localhost:3000/message/new_msg', {
                sender_id: currentUser.user_id,
                receiver_id: receiverID,
                msg_content: msgContent,
            });
            if (response.data.success){
                alert("Mensaje Enviado");
            }
        } catch(error){
            alert("El mensaje no pudo ser enviado");
        }
        setWriting(false);
    };

    return (
        <div className="login-form max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Mensajes</h2>
            <button
                onClick={handleNewMessage}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                Escribir Nuevo Mensaje
            </button>

            {writingMsg && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto flex justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mx-auto h-auto max-h-screen my-48">
                        <h2 className="text-2xl font-bold mb-4">Nuevo Mensaje</h2>
                        <p>
                            <strong>De: </strong>
                            {currentUser.role === "general" ? (
                                currentUser.name_
                            ) : (
                                "Administrador"
                            )}
                        </p>
                        <p>
                            <strong>Para: </strong>
                            {currentUser.role === "general" ? (
                                "Administrador"
                            ) : (
                                <input
                                    type="text"
                                    value={receiverName}
                                    onChange={ (e) => setReceiver(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md bg-white"
                                    placeholder="Ingrese el nombre del destinatario">
                                </input>
                            )}
                        </p>
                        <textarea
                            value={msgContent}
                            onChange={ (e) => setContent(e.target.value) }
                            maxLength={maxLength}
                            placeholder="Escriba su mensaje"
                            className="w-full max-w-lg p-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 bg-white my-2"
                            rows="10">
                        </textarea>
                        <div className="mt-2 text-gray-500">
                            {msgContent.length}/{maxLength} caracteres
                        </div>
                        <button
                            onClick={handleSendMsg}
                            className="ml-2 p-2 bg-green-500 text-white rounded-md my-2">
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;