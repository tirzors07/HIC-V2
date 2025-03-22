import { Sequelize } from 'sequelize';

const db = new Sequelize('hic_db', 'mr_robot', 'admin123', {
    host: '172.210.233.153', // o la dirección IP del servidor
    dialect: 'mariadb',
    port: 3306, // Asegúrate de que el puerto sea correcto
    dialectOptions: {
        connectTimeout: 30000 // Tiempo de espera en milisegundos
    }
});

export default db;
