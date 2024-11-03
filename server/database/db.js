import { Sequelize } from 'sequelize'
//se conecta a la bd usando sequelize

const db = new Sequelize('db_hic', 'master', 'admin123', {
    host: ' ',
    port:3306,
    dialect:'mariadb'
});
export default db;