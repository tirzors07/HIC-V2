// main.js
import Express from 'express';
import cors from 'cors';
import db from './database/db.js'; // Importa db
import testConnection from './database/testConnection.js'; // Importa la función de prueba
const app = Express();
app.use(cors());
app.use(Express.json());
// Probar la conexión a la base de datos
const startApp = async () => {
    await testConnection(); // Llama a la función para probar la conexión
    // Aquí puedes continuar con la configuración del servidor y otras funcionalidades

    const PORT = process.env.PORT || 3001; // Puerto para el servidor backend
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
};
startApp(); // Inicia la aplicación