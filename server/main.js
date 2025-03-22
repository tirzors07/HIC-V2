// main.js
import path from 'path';
import express from 'express';
import cors from 'cors';
import db from './database/db.js';  // Configuración de la base de datos
import userRoutes from './routes/routesUser.js';  // Importa las rutas de usuario
import orderRoutes from "./routes/orderRoutes.js" //Rutas de orden
import messageRoutes from "./routes/messageRoutes.js";
import prescriptionsRoutes from "./routes/prescriptionsRoutes.js"
import medicineRoutes from "./routes/medicamentoRoutes.js";
import './database/associations.js';
import {Server} from "socket.io";
import http from "http";
import axios from "axios";
//import UserModel  from './models/UserModel.js'
//import OrderModel from './models/OrderModel.js';  // Si usas export default


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://172.210.233.153:5173",
    }
});

app.use(cors({
    origin: "http://172.210.233.153:5173"
}));

// Middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.json());  // Para manejar solicitudes JSON
app.use('/user', userRoutes);  // Esta línea conecta las rutas de usuarios con el prefijo /users
app.use('/order', orderRoutes);
app.use("/message", messageRoutes);
app.use('/prescriptions', prescriptionsRoutes);
app.use("/medicines", medicineRoutes);

try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    await db.sync({force: false});
    console.log("Base de datos sincronizada con los modelos");
    
} catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
}

io.on("connection", (socket) => {
    console.log("Usuario conectado a socket.io");
    socket.on("userLoggedIn", async ( userID, userRole ) => {
        console.log(`userLoggedIn event recibido. userID: ${userID}, userRole: ${userRole}`);
        try {
            let filteredMessages = [];
            const response = await axios.get("http://172.210.233.153:3000/message/");
            if(userRole === "general"){
                filteredMessages = response.data.messages.filter( (msg) => msg.receiver_id === userID );
            } else if(userRole === "hic_admin"){
                filteredMessages = response.data.messages.filter( (msg) => msg.receiver_id === null );
            }
            const unseenMsgs = filteredMessages.filter(msg => msg.hasBeenSeen === "false");
            const unseenCount = unseenMsgs.length;
            console.log(`unseen msgs: ${unseenCount}`);
            socket.emit("msgCount", unseenCount);

            if(unseenCount > 0){
                socket.emit("unseenMessages", `Tienes ${unseenCount} mensajes nuevos`);
            }
        }catch(error){
            console.error("Error al obtener los mensajes");
        }
    });
    socket.on("disconnect", () => {
        console.log("Usuario desconectado de socket.io");
    })
})

//const PORT = process.env.PORT || 3000;

server.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});