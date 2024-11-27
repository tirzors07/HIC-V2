import express from 'express';
import cors from 'cors';
import db from './database/db.js';  // Configuración de la base de datos
import userRoutes from './routes/routesUser.js';  // Importa las rutas de usuario
const app = express();

app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173'  // Asegúrate de que el frontend esté permitido
}));
app.use(express.json());  // Para manejar solicitudes JSON
app.use('/user',userRoutes);  // Esta línea conecta las rutas de usuarios con el prefijo /users

try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
} catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
}

//const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});
