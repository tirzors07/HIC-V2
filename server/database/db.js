import { Sequelize } from 'sequelize';

const db = new Sequelize('db_name', 'user', 'password', {
    host: '', //ip server
    dialect: 'mariadb',
    port: 3306, // port number
    dialectOptions: {
        connectTimeout: 30000 // Tiempo de espera en milisegundos
    }
});

export default db;
